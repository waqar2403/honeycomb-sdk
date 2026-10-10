package core

import (
	"encoding/json"
	"fmt"
	"strings"

	vs "github.com/waqar2403/honeycomb-sdk/go/utility/struct"
)

type HoneycombSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewHoneycombSDK(options map[string]any) *HoneycombSDK {
	sdk := &HoneycombSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := SharedConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath(sdk.options, []any{"feature", "test", "active"}) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath(sdk.options, []any{"__derived__", "featureorder"}).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

// The client holds the credential in its options, so a print or a JSON dump
// carries the name alone. Value receivers: a dereferenced client prints the
// same way.
func (sdk HoneycombSDK) String() string {
	return "Honeycomb " + vs.Jsonify(map[string]any{"name": "Honeycomb"},
		map[string]any{"indent": 0})
}

func (sdk HoneycombSDK) GoString() string {
	return sdk.String()
}

func (sdk HoneycombSDK) MarshalJSON() ([]byte, error) {
	return json.Marshal(map[string]any{"name": "Honeycomb"})
}

func (sdk *HoneycombSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *HoneycombSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *HoneycombSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *HoneycombSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}
	method = strings.ToUpper(method)

	allowMethodVal := vs.GetPath(options, []any{"allow", "method"})
	if !Allowed(allowMethodVal, method) {
		allowMethod, _ := allowMethodVal.(string)
		return nil, ctx.MakeError("spec_method_allow",
			"Method \""+method+"\" not allowed by SDK option allow.method value: \""+allowMethod+"\"")
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *HoneycombSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *HoneycombSDK) opAllowed(op string) bool {
	return Allowed(vs.GetPath(sdk.options, []any{"allow", "op"}), op)
}

func (sdk *HoneycombSDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("HoneycombSDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *HoneycombSDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": sdk.cleanErr(sdk.rootctx, err)}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": sdk.cleanErr(ctx, fetchErr)}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		var bodyErr error
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					jsonData = f()
				}
			}
			if unreadable, _ := vs.GetProp(fm, "unreadable").(bool); unreadable {
				var failed error
				if status < 200 || status >= 300 {
					failed = ctx.MakeError("request_status",
						fmt.Sprintf("request: %d: %v", status, vs.GetProp(fm, "statusText")))
				}
				bodyErr = UnreadableBody(ctx, status, headers, vs.GetProp(fm, "body"),
					fetchdef["headers"], failed)
			}
		}

		out := map[string]any{
			"ok":      bodyErr == nil && status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}
		if bodyErr != nil {
			out["err"] = sdk.cleanErr(ctx, bodyErr)
		}
		return out, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

// A raw request returns its error rather than passing it through MakeError.
func (sdk *HoneycombSDK) cleanErr(ctx *Context, err error) error {
	if cleaned, ok := sdk.utility.Clean(ctx, err).(error); ok {
		return cleaned
	}
	return err
}

func (sdk *HoneycombSDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath(res, []any{"data", "errors"}).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("HoneycombSDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// ApiKey returns a ApiKey entity bound to this client.
// Idiomatic usage: client.ApiKey(nil).List(nil, nil) or
// client.ApiKey(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) ApiKey(data map[string]any) HoneycombEntity {
	return NewApiKeyEntityFunc(sdk, data)
}


// Auth returns a Auth entity bound to this client.
// Idiomatic usage: client.Auth(nil).List(nil, nil) or
// client.Auth(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) Auth(data map[string]any) HoneycombEntity {
	return NewAuthEntityFunc(sdk, data)
}


// Board returns a Board entity bound to this client.
// Idiomatic usage: client.Board(nil).List(nil, nil) or
// client.Board(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) Board(data map[string]any) HoneycombEntity {
	return NewBoardEntityFunc(sdk, data)
}


// BoardView returns a BoardView entity bound to this client.
// Idiomatic usage: client.BoardView(nil).List(nil, nil) or
// client.BoardView(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) BoardView(data map[string]any) HoneycombEntity {
	return NewBoardViewEntityFunc(sdk, data)
}


// BulkSignalRecipientAssignment returns a BulkSignalRecipientAssignment entity bound to this client.
// Idiomatic usage: client.BulkSignalRecipientAssignment(nil).List(nil, nil) or
// client.BulkSignalRecipientAssignment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) BulkSignalRecipientAssignment(data map[string]any) HoneycombEntity {
	return NewBulkSignalRecipientAssignmentEntityFunc(sdk, data)
}


// BurnAlert returns a BurnAlert entity bound to this client.
// Idiomatic usage: client.BurnAlert(nil).List(nil, nil) or
// client.BurnAlert(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) BurnAlert(data map[string]any) HoneycombEntity {
	return NewBurnAlertEntityFunc(sdk, data)
}


// CalculatedField returns a CalculatedField entity bound to this client.
// Idiomatic usage: client.CalculatedField(nil).List(nil, nil) or
// client.CalculatedField(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) CalculatedField(data map[string]any) HoneycombEntity {
	return NewCalculatedFieldEntityFunc(sdk, data)
}


// Column returns a Column entity bound to this client.
// Idiomatic usage: client.Column(nil).List(nil, nil) or
// client.Column(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) Column(data map[string]any) HoneycombEntity {
	return NewColumnEntityFunc(sdk, data)
}


// Dataset returns a Dataset entity bound to this client.
// Idiomatic usage: client.Dataset(nil).List(nil, nil) or
// client.Dataset(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) Dataset(data map[string]any) HoneycombEntity {
	return NewDatasetEntityFunc(sdk, data)
}


// DatasetDefinition returns a DatasetDefinition entity bound to this client.
// Idiomatic usage: client.DatasetDefinition(nil).List(nil, nil) or
// client.DatasetDefinition(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) DatasetDefinition(data map[string]any) HoneycombEntity {
	return NewDatasetDefinitionEntityFunc(sdk, data)
}


// Environment returns a Environment entity bound to this client.
// Idiomatic usage: client.Environment(nil).List(nil, nil) or
// client.Environment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) Environment(data map[string]any) HoneycombEntity {
	return NewEnvironmentEntityFunc(sdk, data)
}


// Event returns a Event entity bound to this client.
// Idiomatic usage: client.Event(nil).List(nil, nil) or
// client.Event(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) Event(data map[string]any) HoneycombEntity {
	return NewEventEntityFunc(sdk, data)
}


// HistoricalAnomaly returns a HistoricalAnomaly entity bound to this client.
// Idiomatic usage: client.HistoricalAnomaly(nil).List(nil, nil) or
// client.HistoricalAnomaly(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) HistoricalAnomaly(data map[string]any) HoneycombEntity {
	return NewHistoricalAnomalyEntityFunc(sdk, data)
}


// KinesisEvent returns a KinesisEvent entity bound to this client.
// Idiomatic usage: client.KinesisEvent(nil).List(nil, nil) or
// client.KinesisEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) KinesisEvent(data map[string]any) HoneycombEntity {
	return NewKinesisEventEntityFunc(sdk, data)
}


// ManagementAuth returns a ManagementAuth entity bound to this client.
// Idiomatic usage: client.ManagementAuth(nil).List(nil, nil) or
// client.ManagementAuth(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) ManagementAuth(data map[string]any) HoneycombEntity {
	return NewManagementAuthEntityFunc(sdk, data)
}


// MapDependency returns a MapDependency entity bound to this client.
// Idiomatic usage: client.MapDependency(nil).List(nil, nil) or
// client.MapDependency(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) MapDependency(data map[string]any) HoneycombEntity {
	return NewMapDependencyEntityFunc(sdk, data)
}


// Marker returns a Marker entity bound to this client.
// Idiomatic usage: client.Marker(nil).List(nil, nil) or
// client.Marker(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) Marker(data map[string]any) HoneycombEntity {
	return NewMarkerEntityFunc(sdk, data)
}


// MarkerSetting returns a MarkerSetting entity bound to this client.
// Idiomatic usage: client.MarkerSetting(nil).List(nil, nil) or
// client.MarkerSetting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) MarkerSetting(data map[string]any) HoneycombEntity {
	return NewMarkerSettingEntityFunc(sdk, data)
}


// Query returns a Query entity bound to this client.
// Idiomatic usage: client.Query(nil).List(nil, nil) or
// client.Query(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) Query(data map[string]any) HoneycombEntity {
	return NewQueryEntityFunc(sdk, data)
}


// QueryAnnotation returns a QueryAnnotation entity bound to this client.
// Idiomatic usage: client.QueryAnnotation(nil).List(nil, nil) or
// client.QueryAnnotation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) QueryAnnotation(data map[string]any) HoneycombEntity {
	return NewQueryAnnotationEntityFunc(sdk, data)
}


// QueryResult returns a QueryResult entity bound to this client.
// Idiomatic usage: client.QueryResult(nil).List(nil, nil) or
// client.QueryResult(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) QueryResult(data map[string]any) HoneycombEntity {
	return NewQueryResultEntityFunc(sdk, data)
}


// Recipient returns a Recipient entity bound to this client.
// Idiomatic usage: client.Recipient(nil).List(nil, nil) or
// client.Recipient(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) Recipient(data map[string]any) HoneycombEntity {
	return NewRecipientEntityFunc(sdk, data)
}


// Signal returns a Signal entity bound to this client.
// Idiomatic usage: client.Signal(nil).List(nil, nil) or
// client.Signal(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) Signal(data map[string]any) HoneycombEntity {
	return NewSignalEntityFunc(sdk, data)
}


// Slo returns a Slo entity bound to this client.
// Idiomatic usage: client.Slo(nil).List(nil, nil) or
// client.Slo(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) Slo(data map[string]any) HoneycombEntity {
	return NewSloEntityFunc(sdk, data)
}


// SloCount returns a SloCount entity bound to this client.
// Idiomatic usage: client.SloCount(nil).List(nil, nil) or
// client.SloCount(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) SloCount(data map[string]any) HoneycombEntity {
	return NewSloCountEntityFunc(sdk, data)
}


// SloHistory returns a SloHistory entity bound to this client.
// Idiomatic usage: client.SloHistory(nil).List(nil, nil) or
// client.SloHistory(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) SloHistory(data map[string]any) HoneycombEntity {
	return NewSloHistoryEntityFunc(sdk, data)
}


// SloHourlyCount returns a SloHourlyCount entity bound to this client.
// Idiomatic usage: client.SloHourlyCount(nil).List(nil, nil) or
// client.SloHourlyCount(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) SloHourlyCount(data map[string]any) HoneycombEntity {
	return NewSloHourlyCountEntityFunc(sdk, data)
}


// Trigger returns a Trigger entity bound to this client.
// Idiomatic usage: client.Trigger(nil).List(nil, nil) or
// client.Trigger(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HoneycombSDK) Trigger(data map[string]any) HoneycombEntity {
	return NewTriggerEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *HoneycombSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewHoneycombSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}

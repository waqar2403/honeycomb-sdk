package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/honeycomb-sdk/go"
	"github.com/voxgig-sdk/honeycomb-sdk/go/core"

	vs "github.com/voxgig-sdk/honeycomb-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const slo_countEntityLiveStrict = true


func TestSloCountEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SloCount(nil)
		if ent == nil {
			t.Fatal("expected non-nil SloCountEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SloCount(nil).List(map[string]any{"dataset_slug": 1, "slo_id": "x", "end_time": 1, "start_time": 1}, nil)
		if sdkerr, ok := err.(*core.HoneycombError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := slo_countBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "slo_count." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"dataset_slug01", "slo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, slo_countEntityLiveStrict, "Live entity test blocked: needs %s via HONEYCOMB_TEST_SLO_COUNT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		sloCountRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.slo_count")))
		var sloCountRef01Data map[string]any
		if len(sloCountRef01DataRaw) > 0 {
			sloCountRef01Data = core.ToMapAny(sloCountRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = sloCountRef01Data

		// LIST
		sloCountRef01Ent := client.SloCount(nil)
		sloCountRef01Match := map[string]any{
			"dataset_slug": setup.idmap["dataset_slug01"],
			"slo_id": setup.idmap["slo01"],
		}

		sloCountRef01ListResult, err := sloCountRef01Ent.List(sloCountRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, sloCountRef01ListOk := sloCountRef01ListResult.([]any)
		if !sloCountRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", sloCountRef01ListResult)
		}

	})
}

func slo_countBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "slo_count", "SloCountTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read slo_count test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse slo_count test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"slo_count01", "slo_count02", "slo_count03", "slo01", "slo02", "slo03", "dataset_slug01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HONEYCOMB_TEST_SLO_COUNT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HONEYCOMB_TEST_SLO_COUNT_ENTID": idmap,
		"HONEYCOMB_TEST_LIVE":      "FALSE",
		"HONEYCOMB_TEST_EXPLAIN":   "FALSE",
		"HONEYCOMB_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HONEYCOMB_TEST_SLO_COUNT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["HONEYCOMB_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["HONEYCOMB_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewHoneycombSDK(core.ToMapAny(mergedOpts))
	}

	live := env["HONEYCOMB_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["HONEYCOMB_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}

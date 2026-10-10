package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/waqar2403/honeycomb-sdk/go"
	"github.com/waqar2403/honeycomb-sdk/go/core"

	vs "github.com/waqar2403/honeycomb-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const api_keyEntityLiveStrict = true


func TestApiKeyEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ApiKey(nil)
		if ent == nil {
			t.Fatal("expected non-nil ApiKeyEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ApiKey(nil).List(map[string]any{"team_slug": 1}, nil)
		if sdkerr, ok := err.(*core.HoneycombError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := api_keyBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "api_key." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"team_slug01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, api_keyEntityLiveStrict, "Live entity test blocked: needs %s via HONEYCOMB_TEST_API_KEY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		apiKeyRef01Ent := client.ApiKey(nil)
		apiKeyRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "api_key"}), "api_key_ref01"))
		apiKeyRef01Data["team_slug"] = setup.idmap["team_slug01"]

		apiKeyRef01DataResult, err := apiKeyRef01Ent.Create(apiKeyRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		apiKeyRef01Data = core.ToMapAny(entityData(apiKeyRef01DataResult))
		if apiKeyRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if apiKeyRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		apiKeyRef01Match := map[string]any{
			"team_slug": setup.idmap["team_slug01"],
		}

		apiKeyRef01ListResult, err := apiKeyRef01Ent.List(apiKeyRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		apiKeyRef01List, apiKeyRef01ListOk := apiKeyRef01ListResult.([]any)
		if !apiKeyRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", apiKeyRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(apiKeyRef01List), map[string]any{"id": apiKeyRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		apiKeyRef01DataUp0Up := map[string]any{
			"id": apiKeyRef01Data["id"],
			"team_slug": setup.idmap["team_slug"],
		}

		apiKeyRef01ResdataUp0Result, err := apiKeyRef01Ent.Update(apiKeyRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		apiKeyRef01ResdataUp0 := core.ToMapAny(entityData(apiKeyRef01ResdataUp0Result))
		if apiKeyRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if apiKeyRef01ResdataUp0["id"] != apiKeyRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}

		// LOAD
		apiKeyRef01MatchDt0 := map[string]any{
			"id": apiKeyRef01Data["id"],
		}
		if v := setup.idmap["team_slug"]; v != nil {
			apiKeyRef01MatchDt0["team_slug"] = v
		} else {
			apiKeyRef01MatchDt0["team_slug"] = setup.idmap["team_slug01"]
		}
		apiKeyRef01DataDt0Loaded, err := apiKeyRef01Ent.Load(apiKeyRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		apiKeyRef01DataDt0LoadResult := core.ToMapAny(entityData(apiKeyRef01DataDt0Loaded))
		if apiKeyRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if apiKeyRef01DataDt0LoadResult["id"] != apiKeyRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		apiKeyRef01MatchRm0 := map[string]any{
			"id": apiKeyRef01Data["id"],
		}
		if v := setup.idmap["team_slug"]; v != nil {
			apiKeyRef01MatchRm0["team_slug"] = v
		} else {
			apiKeyRef01MatchRm0["team_slug"] = setup.idmap["team_slug01"]
		}
		_, err = apiKeyRef01Ent.Remove(apiKeyRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		apiKeyRef01MatchRt0 := map[string]any{
			"team_slug": setup.idmap["team_slug01"],
		}

		apiKeyRef01ListRt0Result, err := apiKeyRef01Ent.List(apiKeyRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		apiKeyRef01ListRt0, apiKeyRef01ListRt0Ok := apiKeyRef01ListRt0Result.([]any)
		if !apiKeyRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", apiKeyRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(apiKeyRef01ListRt0), map[string]any{"id": apiKeyRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func api_keyBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "api_key", "ApiKeyTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read api_key test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse api_key test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"api_key01", "api_key02", "api_key03", "team_slug01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HONEYCOMB_TEST_API_KEY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HONEYCOMB_TEST_API_KEY_ENTID": idmap,
		"HONEYCOMB_TEST_LIVE":      "FALSE",
		"HONEYCOMB_TEST_EXPLAIN":   "FALSE",
		"HONEYCOMB_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HONEYCOMB_TEST_API_KEY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add team_slug alias for update test.
	if idmapResolved["team_slug"] == nil {
		idmapResolved["team_slug"] = idmapResolved["team_slug01"]
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

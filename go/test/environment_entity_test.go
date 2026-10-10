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
const environmentEntityLiveStrict = true


func TestEnvironmentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Environment(nil)
		if ent == nil {
			t.Fatal("expected non-nil EnvironmentEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Environment(nil).Load(map[string]any{"id": 1, "team_slug": "x"}, nil)
		if sdkerr, ok := err.(*core.HoneycombError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := environmentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "environment." + _op, _mode); _shouldSkip {
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
					liveMiss(t, environmentEntityLiveStrict, "Live entity test blocked: needs %s via HONEYCOMB_TEST_ENVIRONMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		environmentRef01Ent := client.Environment(nil)
		environmentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "environment"}), "environment_ref01"))
		environmentRef01Data["team_slug"] = setup.idmap["team_slug01"]

		environmentRef01DataResult, err := environmentRef01Ent.Create(environmentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		environmentRef01Data = core.ToMapAny(entityData(environmentRef01DataResult))
		if environmentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if environmentRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		environmentRef01DataUp0Up := map[string]any{
			"id": environmentRef01Data["id"],
			"team_slug": setup.idmap["team_slug"],
		}

		environmentRef01ResdataUp0Result, err := environmentRef01Ent.Update(environmentRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		environmentRef01ResdataUp0 := core.ToMapAny(entityData(environmentRef01ResdataUp0Result))
		if environmentRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if environmentRef01ResdataUp0["id"] != environmentRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}

		// LOAD
		environmentRef01MatchDt0 := map[string]any{
			"id": environmentRef01Data["id"],
		}
		environmentRef01DataDt0Loaded, err := environmentRef01Ent.Load(environmentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		environmentRef01DataDt0LoadResult := core.ToMapAny(entityData(environmentRef01DataDt0Loaded))
		if environmentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if environmentRef01DataDt0LoadResult["id"] != environmentRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		environmentRef01MatchRm0 := map[string]any{
			"id": environmentRef01Data["id"],
		}
		if v := setup.idmap["team_slug"]; v != nil {
			environmentRef01MatchRm0["team_slug"] = v
		} else {
			environmentRef01MatchRm0["team_slug"] = setup.idmap["team_slug01"]
		}
		_, err = environmentRef01Ent.Remove(environmentRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func environmentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "environment", "EnvironmentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read environment test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse environment test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"environment01", "environment02", "environment03", "team_slug01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HONEYCOMB_TEST_ENVIRONMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HONEYCOMB_TEST_ENVIRONMENT_ENTID": idmap,
		"HONEYCOMB_TEST_LIVE":      "FALSE",
		"HONEYCOMB_TEST_EXPLAIN":   "FALSE",
		"HONEYCOMB_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HONEYCOMB_TEST_ENVIRONMENT_ENTID"])
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

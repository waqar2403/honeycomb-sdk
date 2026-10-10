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
const key_managementEntityLiveStrict = true


func TestKeyManagementEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.KeyManagement(nil)
		if ent == nil {
			t.Fatal("expected non-nil KeyManagementEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.KeyManagement(nil).Load(map[string]any{"id": 1, "team_slug": "x"}, nil)
		if sdkerr, ok := err.(*core.HoneycombError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := key_managementBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "key_management." + _op, _mode); _shouldSkip {
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
					liveMiss(t, key_managementEntityLiveStrict, "Live entity test blocked: needs %s via HONEYCOMB_TEST_KEY_MANAGEMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		keyManagementRef01Ent := client.KeyManagement(nil)
		keyManagementRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "key_management"}), "key_management_ref01"))
		keyManagementRef01Data["team_slug"] = setup.idmap["team_slug01"]

		keyManagementRef01DataResult, err := keyManagementRef01Ent.Create(keyManagementRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		keyManagementRef01Data = core.ToMapAny(entityData(keyManagementRef01DataResult))
		if keyManagementRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if keyManagementRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		keyManagementRef01DataUp0Up := map[string]any{
			"id": keyManagementRef01Data["id"],
			"team_slug": setup.idmap["team_slug"],
		}

		keyManagementRef01ResdataUp0Result, err := keyManagementRef01Ent.Update(keyManagementRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		keyManagementRef01ResdataUp0 := core.ToMapAny(entityData(keyManagementRef01ResdataUp0Result))
		if keyManagementRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if keyManagementRef01ResdataUp0["id"] != keyManagementRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}

		// LOAD
		keyManagementRef01MatchDt0 := map[string]any{
			"id": keyManagementRef01Data["id"],
		}
		keyManagementRef01DataDt0Loaded, err := keyManagementRef01Ent.Load(keyManagementRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		keyManagementRef01DataDt0LoadResult := core.ToMapAny(entityData(keyManagementRef01DataDt0Loaded))
		if keyManagementRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if keyManagementRef01DataDt0LoadResult["id"] != keyManagementRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		keyManagementRef01MatchRm0 := map[string]any{
			"id": keyManagementRef01Data["id"],
		}
		if v := setup.idmap["team_slug"]; v != nil {
			keyManagementRef01MatchRm0["team_slug"] = v
		} else {
			keyManagementRef01MatchRm0["team_slug"] = setup.idmap["team_slug01"]
		}
		_, err = keyManagementRef01Ent.Remove(keyManagementRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func key_managementBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "key_management", "KeyManagementTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read key_management test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse key_management test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"key_management01", "key_management02", "key_management03", "team_slug01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HONEYCOMB_TEST_KEY_MANAGEMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HONEYCOMB_TEST_KEY_MANAGEMENT_ENTID": idmap,
		"HONEYCOMB_TEST_LIVE":      "FALSE",
		"HONEYCOMB_TEST_EXPLAIN":   "FALSE",
		"HONEYCOMB_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HONEYCOMB_TEST_KEY_MANAGEMENT_ENTID"])
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

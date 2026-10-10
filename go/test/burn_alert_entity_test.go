package sdktest

import (
	"encoding/json"
	"fmt"
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
const burn_alertEntityLiveStrict = true


func TestBurnAlertEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BurnAlert(nil)
		if ent == nil {
			t.Fatal("expected non-nil BurnAlertEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.BurnAlert(nil).List(map[string]any{"dataset_slug": 1, "slo_id": "x"}, nil)
		if sdkerr, ok := err.(*core.HoneycombError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := burn_alertBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "burn_alert." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"dataset_slug01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, burn_alertEntityLiveStrict, "Live entity test blocked: needs %s via HONEYCOMB_TEST_BURN_ALERT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		burnAlertRef01Ent := client.BurnAlert(nil)
		burnAlertRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "burn_alert"}), "burn_alert_ref01"))
		burnAlertRef01Data["dataset_slug"] = setup.idmap["dataset_slug01"]

		burnAlertRef01DataResult, err := burnAlertRef01Ent.Create(burnAlertRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		burnAlertRef01Data = core.ToMapAny(entityData(burnAlertRef01DataResult))
		if burnAlertRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if burnAlertRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		burnAlertRef01Match := map[string]any{
			"dataset_slug": setup.idmap["dataset_slug01"],
		}

		burnAlertRef01ListResult, err := burnAlertRef01Ent.List(burnAlertRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		burnAlertRef01List, burnAlertRef01ListOk := burnAlertRef01ListResult.([]any)
		if !burnAlertRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", burnAlertRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(burnAlertRef01List), map[string]any{"id": burnAlertRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		burnAlertRef01DataUp0Up := map[string]any{
			"id": burnAlertRef01Data["id"],
			"dataset_slug": setup.idmap["dataset_slug"],
		}

		burnAlertRef01MarkdefUp0Name := "alert_type"
		burnAlertRef01MarkdefUp0Value := fmt.Sprintf("Mark01-burn_alert_ref01_%d", setup.now)
		burnAlertRef01DataUp0Up[burnAlertRef01MarkdefUp0Name] = burnAlertRef01MarkdefUp0Value

		burnAlertRef01ResdataUp0Result, err := burnAlertRef01Ent.Update(burnAlertRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		burnAlertRef01ResdataUp0 := core.ToMapAny(entityData(burnAlertRef01ResdataUp0Result))
		if burnAlertRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if burnAlertRef01ResdataUp0["id"] != burnAlertRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if burnAlertRef01ResdataUp0[burnAlertRef01MarkdefUp0Name] != burnAlertRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", burnAlertRef01MarkdefUp0Name, burnAlertRef01ResdataUp0[burnAlertRef01MarkdefUp0Name])
		}

		// LOAD
		burnAlertRef01MatchDt0 := map[string]any{
			"id": burnAlertRef01Data["id"],
		}
		if v := setup.idmap["dataset_slug"]; v != nil {
			burnAlertRef01MatchDt0["dataset_slug"] = v
		} else {
			burnAlertRef01MatchDt0["dataset_slug"] = setup.idmap["dataset_slug01"]
		}
		burnAlertRef01DataDt0Loaded, err := burnAlertRef01Ent.Load(burnAlertRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		burnAlertRef01DataDt0LoadResult := core.ToMapAny(entityData(burnAlertRef01DataDt0Loaded))
		if burnAlertRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if burnAlertRef01DataDt0LoadResult["id"] != burnAlertRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		burnAlertRef01MatchRm0 := map[string]any{
			"id": burnAlertRef01Data["id"],
		}
		if v := setup.idmap["dataset_slug"]; v != nil {
			burnAlertRef01MatchRm0["dataset_slug"] = v
		} else {
			burnAlertRef01MatchRm0["dataset_slug"] = setup.idmap["dataset_slug01"]
		}
		_, err = burnAlertRef01Ent.Remove(burnAlertRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		burnAlertRef01MatchRt0 := map[string]any{
			"dataset_slug": setup.idmap["dataset_slug01"],
		}

		burnAlertRef01ListRt0Result, err := burnAlertRef01Ent.List(burnAlertRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		burnAlertRef01ListRt0, burnAlertRef01ListRt0Ok := burnAlertRef01ListRt0Result.([]any)
		if !burnAlertRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", burnAlertRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(burnAlertRef01ListRt0), map[string]any{"id": burnAlertRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func burn_alertBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "burn_alert", "BurnAlertTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read burn_alert test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse burn_alert test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"burn_alert01", "burn_alert02", "burn_alert03", "dataset_slug01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HONEYCOMB_TEST_BURN_ALERT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HONEYCOMB_TEST_BURN_ALERT_ENTID": idmap,
		"HONEYCOMB_TEST_LIVE":      "FALSE",
		"HONEYCOMB_TEST_EXPLAIN":   "FALSE",
		"HONEYCOMB_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HONEYCOMB_TEST_BURN_ALERT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add dataset_slug alias for update test.
	if idmapResolved["dataset_slug"] == nil {
		idmapResolved["dataset_slug"] = idmapResolved["dataset_slug01"]
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

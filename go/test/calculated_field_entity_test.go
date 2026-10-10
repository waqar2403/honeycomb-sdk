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
const calculated_fieldEntityLiveStrict = true


func TestCalculatedFieldEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CalculatedField(nil)
		if ent == nil {
			t.Fatal("expected non-nil CalculatedFieldEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.CalculatedField(nil).List(map[string]any{"dataset_slug": 1}, nil)
		if sdkerr, ok := err.(*core.HoneycombError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := calculated_fieldBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "calculated_field." + _op, _mode); _shouldSkip {
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
					liveMiss(t, calculated_fieldEntityLiveStrict, "Live entity test blocked: needs %s via HONEYCOMB_TEST_CALCULATED_FIELD_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		calculatedFieldRef01Ent := client.CalculatedField(nil)
		calculatedFieldRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "calculated_field"}), "calculated_field_ref01"))
		calculatedFieldRef01Data["dataset_slug"] = setup.idmap["dataset_slug01"]

		calculatedFieldRef01DataResult, err := calculatedFieldRef01Ent.Create(calculatedFieldRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		calculatedFieldRef01Data = core.ToMapAny(entityData(calculatedFieldRef01DataResult))
		if calculatedFieldRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if calculatedFieldRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		calculatedFieldRef01Match := map[string]any{
			"dataset_slug": setup.idmap["dataset_slug01"],
		}

		calculatedFieldRef01ListResult, err := calculatedFieldRef01Ent.List(calculatedFieldRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		calculatedFieldRef01List, calculatedFieldRef01ListOk := calculatedFieldRef01ListResult.([]any)
		if !calculatedFieldRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", calculatedFieldRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(calculatedFieldRef01List), map[string]any{"id": calculatedFieldRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		calculatedFieldRef01DataUp0Up := map[string]any{
			"id": calculatedFieldRef01Data["id"],
			"dataset_slug": setup.idmap["dataset_slug"],
		}

		calculatedFieldRef01MarkdefUp0Name := "alias"
		calculatedFieldRef01MarkdefUp0Value := fmt.Sprintf("Mark01-calculated_field_ref01_%d", setup.now)
		calculatedFieldRef01DataUp0Up[calculatedFieldRef01MarkdefUp0Name] = calculatedFieldRef01MarkdefUp0Value

		calculatedFieldRef01ResdataUp0Result, err := calculatedFieldRef01Ent.Update(calculatedFieldRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		calculatedFieldRef01ResdataUp0 := core.ToMapAny(entityData(calculatedFieldRef01ResdataUp0Result))
		if calculatedFieldRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if calculatedFieldRef01ResdataUp0["id"] != calculatedFieldRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if calculatedFieldRef01ResdataUp0[calculatedFieldRef01MarkdefUp0Name] != calculatedFieldRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", calculatedFieldRef01MarkdefUp0Name, calculatedFieldRef01ResdataUp0[calculatedFieldRef01MarkdefUp0Name])
		}

		// LOAD
		calculatedFieldRef01MatchDt0 := map[string]any{
			"id": calculatedFieldRef01Data["id"],
		}
		if v := setup.idmap["dataset_slug"]; v != nil {
			calculatedFieldRef01MatchDt0["dataset_slug"] = v
		} else {
			calculatedFieldRef01MatchDt0["dataset_slug"] = setup.idmap["dataset_slug01"]
		}
		calculatedFieldRef01DataDt0Loaded, err := calculatedFieldRef01Ent.Load(calculatedFieldRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		calculatedFieldRef01DataDt0LoadResult := core.ToMapAny(entityData(calculatedFieldRef01DataDt0Loaded))
		if calculatedFieldRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if calculatedFieldRef01DataDt0LoadResult["id"] != calculatedFieldRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		calculatedFieldRef01MatchRm0 := map[string]any{
			"id": calculatedFieldRef01Data["id"],
		}
		if v := setup.idmap["dataset_slug"]; v != nil {
			calculatedFieldRef01MatchRm0["dataset_slug"] = v
		} else {
			calculatedFieldRef01MatchRm0["dataset_slug"] = setup.idmap["dataset_slug01"]
		}
		_, err = calculatedFieldRef01Ent.Remove(calculatedFieldRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		calculatedFieldRef01MatchRt0 := map[string]any{
			"dataset_slug": setup.idmap["dataset_slug01"],
		}

		calculatedFieldRef01ListRt0Result, err := calculatedFieldRef01Ent.List(calculatedFieldRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		calculatedFieldRef01ListRt0, calculatedFieldRef01ListRt0Ok := calculatedFieldRef01ListRt0Result.([]any)
		if !calculatedFieldRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", calculatedFieldRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(calculatedFieldRef01ListRt0), map[string]any{"id": calculatedFieldRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func calculated_fieldBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "calculated_field", "CalculatedFieldTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read calculated_field test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse calculated_field test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"calculated_field01", "calculated_field02", "calculated_field03", "dataset_slug01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HONEYCOMB_TEST_CALCULATED_FIELD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HONEYCOMB_TEST_CALCULATED_FIELD_ENTID": idmap,
		"HONEYCOMB_TEST_LIVE":      "FALSE",
		"HONEYCOMB_TEST_EXPLAIN":   "FALSE",
		"HONEYCOMB_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HONEYCOMB_TEST_CALCULATED_FIELD_ENTID"])
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

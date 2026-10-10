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
const columnEntityLiveStrict = true


func TestColumnEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Column(nil)
		if ent == nil {
			t.Fatal("expected non-nil ColumnEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Column(nil).List(map[string]any{"dataset_slug": 1}, nil)
		if sdkerr, ok := err.(*core.HoneycombError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := columnBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "column." + _op, _mode); _shouldSkip {
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
					liveMiss(t, columnEntityLiveStrict, "Live entity test blocked: needs %s via HONEYCOMB_TEST_COLUMN_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		columnRef01Ent := client.Column(nil)
		columnRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "column"}), "column_ref01"))
		columnRef01Data["dataset_slug"] = setup.idmap["dataset_slug01"]

		columnRef01DataResult, err := columnRef01Ent.Create(columnRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		columnRef01Data = core.ToMapAny(entityData(columnRef01DataResult))
		if columnRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if columnRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		columnRef01Match := map[string]any{
			"dataset_slug": setup.idmap["dataset_slug01"],
		}

		columnRef01ListResult, err := columnRef01Ent.List(columnRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		columnRef01List, columnRef01ListOk := columnRef01ListResult.([]any)
		if !columnRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", columnRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(columnRef01List), map[string]any{"id": columnRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		columnRef01DataUp0Up := map[string]any{
			"id": columnRef01Data["id"],
			"dataset_slug": setup.idmap["dataset_slug"],
		}

		columnRef01MarkdefUp0Name := "description"
		columnRef01MarkdefUp0Value := fmt.Sprintf("Mark01-column_ref01_%d", setup.now)
		columnRef01DataUp0Up[columnRef01MarkdefUp0Name] = columnRef01MarkdefUp0Value

		columnRef01ResdataUp0Result, err := columnRef01Ent.Update(columnRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		columnRef01ResdataUp0 := core.ToMapAny(entityData(columnRef01ResdataUp0Result))
		if columnRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if columnRef01ResdataUp0["id"] != columnRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if columnRef01ResdataUp0[columnRef01MarkdefUp0Name] != columnRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", columnRef01MarkdefUp0Name, columnRef01ResdataUp0[columnRef01MarkdefUp0Name])
		}

		// LOAD
		columnRef01MatchDt0 := map[string]any{
			"id": columnRef01Data["id"],
		}
		if v := setup.idmap["dataset_slug"]; v != nil {
			columnRef01MatchDt0["dataset_slug"] = v
		} else {
			columnRef01MatchDt0["dataset_slug"] = setup.idmap["dataset_slug01"]
		}
		columnRef01DataDt0Loaded, err := columnRef01Ent.Load(columnRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		columnRef01DataDt0LoadResult := core.ToMapAny(entityData(columnRef01DataDt0Loaded))
		if columnRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if columnRef01DataDt0LoadResult["id"] != columnRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		columnRef01MatchRm0 := map[string]any{
			"id": columnRef01Data["id"],
		}
		if v := setup.idmap["dataset_slug"]; v != nil {
			columnRef01MatchRm0["dataset_slug"] = v
		} else {
			columnRef01MatchRm0["dataset_slug"] = setup.idmap["dataset_slug01"]
		}
		_, err = columnRef01Ent.Remove(columnRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		columnRef01MatchRt0 := map[string]any{
			"dataset_slug": setup.idmap["dataset_slug01"],
		}

		columnRef01ListRt0Result, err := columnRef01Ent.List(columnRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		columnRef01ListRt0, columnRef01ListRt0Ok := columnRef01ListRt0Result.([]any)
		if !columnRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", columnRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(columnRef01ListRt0), map[string]any{"id": columnRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func columnBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "column", "ColumnTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read column test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse column test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"column01", "column02", "column03", "dataset_slug01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HONEYCOMB_TEST_COLUMN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HONEYCOMB_TEST_COLUMN_ENTID": idmap,
		"HONEYCOMB_TEST_LIVE":      "FALSE",
		"HONEYCOMB_TEST_EXPLAIN":   "FALSE",
		"HONEYCOMB_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HONEYCOMB_TEST_COLUMN_ENTID"])
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

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
const markerEntityLiveStrict = true


func TestMarkerEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Marker(nil)
		if ent == nil {
			t.Fatal("expected non-nil MarkerEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Marker(nil).List(map[string]any{"dataset_slug": 1}, nil)
		if sdkerr, ok := err.(*core.HoneycombError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := markerBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "marker." + _op, _mode); _shouldSkip {
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
					liveMiss(t, markerEntityLiveStrict, "Live entity test blocked: needs %s via HONEYCOMB_TEST_MARKER_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		markerRef01Ent := client.Marker(nil)
		markerRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "marker"}), "marker_ref01"))
		markerRef01Data["dataset_slug"] = setup.idmap["dataset_slug01"]

		markerRef01DataResult, err := markerRef01Ent.Create(markerRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		markerRef01Data = core.ToMapAny(entityData(markerRef01DataResult))
		if markerRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if markerRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		markerRef01Match := map[string]any{
			"dataset_slug": setup.idmap["dataset_slug01"],
		}

		markerRef01ListResult, err := markerRef01Ent.List(markerRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		markerRef01List, markerRef01ListOk := markerRef01ListResult.([]any)
		if !markerRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", markerRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(markerRef01List), map[string]any{"id": markerRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		markerRef01DataUp0Up := map[string]any{
			"id": markerRef01Data["id"],
			"dataset_slug": setup.idmap["dataset_slug"],
		}

		markerRef01MarkdefUp0Name := "message"
		markerRef01MarkdefUp0Value := fmt.Sprintf("Mark01-marker_ref01_%d", setup.now)
		markerRef01DataUp0Up[markerRef01MarkdefUp0Name] = markerRef01MarkdefUp0Value

		markerRef01ResdataUp0Result, err := markerRef01Ent.Update(markerRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		markerRef01ResdataUp0 := core.ToMapAny(entityData(markerRef01ResdataUp0Result))
		if markerRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if markerRef01ResdataUp0["id"] != markerRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if markerRef01ResdataUp0[markerRef01MarkdefUp0Name] != markerRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", markerRef01MarkdefUp0Name, markerRef01ResdataUp0[markerRef01MarkdefUp0Name])
		}

		// REMOVE
		markerRef01MatchRm0 := map[string]any{
			"id": markerRef01Data["id"],
		}
		if v := setup.idmap["dataset_slug"]; v != nil {
			markerRef01MatchRm0["dataset_slug"] = v
		} else {
			markerRef01MatchRm0["dataset_slug"] = setup.idmap["dataset_slug01"]
		}
		_, err = markerRef01Ent.Remove(markerRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		markerRef01MatchRt0 := map[string]any{
			"dataset_slug": setup.idmap["dataset_slug01"],
		}

		markerRef01ListRt0Result, err := markerRef01Ent.List(markerRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		markerRef01ListRt0, markerRef01ListRt0Ok := markerRef01ListRt0Result.([]any)
		if !markerRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", markerRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(markerRef01ListRt0), map[string]any{"id": markerRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func markerBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "marker", "MarkerTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read marker test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse marker test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"marker01", "marker02", "marker03", "dataset_slug01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HONEYCOMB_TEST_MARKER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HONEYCOMB_TEST_MARKER_ENTID": idmap,
		"HONEYCOMB_TEST_LIVE":      "FALSE",
		"HONEYCOMB_TEST_EXPLAIN":   "FALSE",
		"HONEYCOMB_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HONEYCOMB_TEST_MARKER_ENTID"])
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

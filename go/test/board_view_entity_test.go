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
const board_viewEntityLiveStrict = true


func TestBoardViewEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BoardView(nil)
		if ent == nil {
			t.Fatal("expected non-nil BoardViewEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.BoardView(nil).List(map[string]any{"board_id": 1}, nil)
		if sdkerr, ok := err.(*core.HoneycombError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := board_viewBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "board_view." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"board01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, board_viewEntityLiveStrict, "Live entity test blocked: needs %s via HONEYCOMB_TEST_BOARD_VIEW_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		boardViewRef01Ent := client.BoardView(nil)
		boardViewRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "board_view"}), "board_view_ref01"))
		boardViewRef01Data["board_id"] = setup.idmap["board01"]

		boardViewRef01DataResult, err := boardViewRef01Ent.Create(boardViewRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		boardViewRef01Data = core.ToMapAny(entityData(boardViewRef01DataResult))
		if boardViewRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if boardViewRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		boardViewRef01Match := map[string]any{
			"board_id": setup.idmap["board01"],
		}

		boardViewRef01ListResult, err := boardViewRef01Ent.List(boardViewRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		boardViewRef01List, boardViewRef01ListOk := boardViewRef01ListResult.([]any)
		if !boardViewRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", boardViewRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(boardViewRef01List), map[string]any{"id": boardViewRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		boardViewRef01DataUp0Up := map[string]any{
			"id": boardViewRef01Data["id"],
			"board_id": setup.idmap["board_id"],
		}

		boardViewRef01MarkdefUp0Name := "name"
		boardViewRef01MarkdefUp0Value := fmt.Sprintf("Mark01-board_view_ref01_%d", setup.now)
		boardViewRef01DataUp0Up[boardViewRef01MarkdefUp0Name] = boardViewRef01MarkdefUp0Value

		boardViewRef01ResdataUp0Result, err := boardViewRef01Ent.Update(boardViewRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		boardViewRef01ResdataUp0 := core.ToMapAny(entityData(boardViewRef01ResdataUp0Result))
		if boardViewRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if boardViewRef01ResdataUp0["id"] != boardViewRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if boardViewRef01ResdataUp0[boardViewRef01MarkdefUp0Name] != boardViewRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", boardViewRef01MarkdefUp0Name, boardViewRef01ResdataUp0[boardViewRef01MarkdefUp0Name])
		}

		// LOAD
		boardViewRef01MatchDt0 := map[string]any{
			"id": boardViewRef01Data["id"],
		}
		if v := setup.idmap["board_id"]; v != nil {
			boardViewRef01MatchDt0["board_id"] = v
		} else {
			boardViewRef01MatchDt0["board_id"] = setup.idmap["board01"]
		}
		boardViewRef01DataDt0Loaded, err := boardViewRef01Ent.Load(boardViewRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		boardViewRef01DataDt0LoadResult := core.ToMapAny(entityData(boardViewRef01DataDt0Loaded))
		if boardViewRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if boardViewRef01DataDt0LoadResult["id"] != boardViewRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		boardViewRef01MatchRm0 := map[string]any{
			"id": boardViewRef01Data["id"],
		}
		if v := setup.idmap["board_id"]; v != nil {
			boardViewRef01MatchRm0["board_id"] = v
		} else {
			boardViewRef01MatchRm0["board_id"] = setup.idmap["board01"]
		}
		_, err = boardViewRef01Ent.Remove(boardViewRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		boardViewRef01MatchRt0 := map[string]any{
			"board_id": setup.idmap["board01"],
		}

		boardViewRef01ListRt0Result, err := boardViewRef01Ent.List(boardViewRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		boardViewRef01ListRt0, boardViewRef01ListRt0Ok := boardViewRef01ListRt0Result.([]any)
		if !boardViewRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", boardViewRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(boardViewRef01ListRt0), map[string]any{"id": boardViewRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func board_viewBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "board_view", "BoardViewTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read board_view test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse board_view test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"board_view01", "board_view02", "board_view03", "board01", "board02", "board03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HONEYCOMB_TEST_BOARD_VIEW_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HONEYCOMB_TEST_BOARD_VIEW_ENTID": idmap,
		"HONEYCOMB_TEST_LIVE":      "FALSE",
		"HONEYCOMB_TEST_EXPLAIN":   "FALSE",
		"HONEYCOMB_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HONEYCOMB_TEST_BOARD_VIEW_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add board_id alias for update test.
	if idmapResolved["board_id"] == nil {
		idmapResolved["board_id"] = idmapResolved["board01"]
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

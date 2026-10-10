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
const dataset_definitionEntityLiveStrict = true


func TestDatasetDefinitionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.DatasetDefinition(nil)
		if ent == nil {
			t.Fatal("expected non-nil DatasetDefinitionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.DatasetDefinition(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.HoneycombError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := dataset_definitionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "dataset_definition." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			liveMiss(t, dataset_definitionEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a dataset_definition record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		datasetDefinitionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.dataset_definition")))
		var datasetDefinitionRef01Data map[string]any
		if len(datasetDefinitionRef01DataRaw) > 0 {
			datasetDefinitionRef01Data = core.ToMapAny(datasetDefinitionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = datasetDefinitionRef01Data

		// UPDATE
		datasetDefinitionRef01Ent := client.DatasetDefinition(nil)
		datasetDefinitionRef01DataUp0Up := map[string]any{
			"id": datasetDefinitionRef01Data["id"],
		}

		datasetDefinitionRef01MarkdefUp0Name := "link_span_id"
		datasetDefinitionRef01MarkdefUp0Value := fmt.Sprintf("Mark01-dataset_definition_ref01_%d", setup.now)
		datasetDefinitionRef01DataUp0Up[datasetDefinitionRef01MarkdefUp0Name] = datasetDefinitionRef01MarkdefUp0Value

		datasetDefinitionRef01ResdataUp0Result, err := datasetDefinitionRef01Ent.Update(datasetDefinitionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		datasetDefinitionRef01ResdataUp0 := core.ToMapAny(entityData(datasetDefinitionRef01ResdataUp0Result))
		if datasetDefinitionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if datasetDefinitionRef01ResdataUp0["id"] != datasetDefinitionRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if datasetDefinitionRef01ResdataUp0[datasetDefinitionRef01MarkdefUp0Name] != datasetDefinitionRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", datasetDefinitionRef01MarkdefUp0Name, datasetDefinitionRef01ResdataUp0[datasetDefinitionRef01MarkdefUp0Name])
		}

		// LOAD
		datasetDefinitionRef01MatchDt0 := map[string]any{
			"id": datasetDefinitionRef01Data["id"],
		}
		datasetDefinitionRef01DataDt0Loaded, err := datasetDefinitionRef01Ent.Load(datasetDefinitionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		datasetDefinitionRef01DataDt0LoadResult := core.ToMapAny(entityData(datasetDefinitionRef01DataDt0Loaded))
		if datasetDefinitionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if datasetDefinitionRef01DataDt0LoadResult["id"] != datasetDefinitionRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func dataset_definitionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "dataset_definition", "DatasetDefinitionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read dataset_definition test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse dataset_definition test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"dataset_definition01", "dataset_definition02", "dataset_definition03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HONEYCOMB_TEST_DATASET_DEFINITION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HONEYCOMB_TEST_DATASET_DEFINITION_ENTID": idmap,
		"HONEYCOMB_TEST_LIVE":      "FALSE",
		"HONEYCOMB_TEST_EXPLAIN":   "FALSE",
		"HONEYCOMB_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HONEYCOMB_TEST_DATASET_DEFINITION_ENTID"])
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

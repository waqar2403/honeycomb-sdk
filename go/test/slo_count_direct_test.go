package sdktest

import (
	"encoding/json"
	"os"
	"strings"
	"testing"

	sdk "github.com/waqar2403/honeycomb-sdk/go"
	"github.com/waqar2403/honeycomb-sdk/go/core"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const slo_countDirectLiveStrict = true

func TestSloCountDirect(t *testing.T) {
	t.Run("direct-list-slo_count", func(t *testing.T) {
		setup := slo_countDirectSetup([]any{
			map[string]any{"id": "direct01"},
			map[string]any{"id": "direct02"},
		})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-list-slo_count", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		if setup.live {
			for _, _liveKey := range []string{"dataset_slug01", "slo01"} {
				if v := setup.idmap[_liveKey]; v == nil {
					liveMiss(t, slo_countDirectLiveStrict, "Live test blocked: needs %s via HONEYCOMB_TEST_SLO_COUNT_ENTID", _liveKey)
					return
				}
			}
		}
		client := setup.client

		params := map[string]any{}
		if setup.live {
			params["dataset_slug"] = setup.idmap["dataset_slug01"]
		} else {
			params["dataset_slug"] = "direct01"
		}
		if setup.live {
			params["slo_id"] = setup.idmap["slo01"]
		} else {
			params["slo_id"] = "direct02"
		}

		result, err := client.Direct(map[string]any{
			"path":   "1/slos/{dataset_slug}/{slo_id}/counts",
			"method": "GET",
			"params": params,
		})
		if setup.live {
			if err != nil {
				liveMiss(t, slo_countDirectLiveStrict, "Live list failed: %v", err)
			}
			if status := core.ToInt(result["status"]); result["ok"] != true || status < 200 || status >= 300 {
				liveMiss(t, slo_countDirectLiveStrict, "Live list failed: %s", liveDescribe(result))
			}
			if _, ok := liveList(result["data"]); !ok {
				liveMiss(t, slo_countDirectLiveStrict, "Live list returned no list: %s", liveDescribe(result))
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
		}

		if !setup.live {
			if dataList, ok := result["data"].([]any); ok {
				if len(dataList) != 2 {
					t.Fatalf("expected 2 items, got %d", len(dataList))
				}
			} else {
				t.Fatalf("expected data to be an array, got %T", result["data"])
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
			call := (*setup.calls)[0]
			if initMap, ok := call["init"].(map[string]any); ok {
				if initMap["method"] != "GET" {
					t.Fatalf("expected method GET, got %v", initMap["method"])
				}
			}
			if url, ok := call["url"].(string); ok {
				if !strings.Contains(url, "direct01") {
					t.Fatalf("expected url to contain direct01, got %v", url)
				}
				if !strings.Contains(url, "direct02") {
					t.Fatalf("expected url to contain direct02, got %v", url)
				}
			}
		}
	})

}

type slo_countDirectSetupResult struct {
	client *sdk.HoneycombSDK
	calls  *[]map[string]any
	live   bool
	idmap  map[string]any
}

func slo_countDirectSetup(mockres any) *slo_countDirectSetupResult {
	loadEnvLocal()

	calls := &[]map[string]any{}

	env := envOverride(map[string]any{
		"HONEYCOMB_TEST_SLO_COUNT_ENTID": map[string]any{},
		"HONEYCOMB_TEST_LIVE":    "FALSE",
		"HONEYCOMB_APIKEY":       "",
	})

	live := env["HONEYCOMB_TEST_LIVE"] == "TRUE"

	if live {
		// sdk-test-control.json's test.client.options seeds the live
		// client; the generated fields below overwrite anything they name.
		mergedOpts := map[string]any{}
		for k, v := range liveClientOptions() {
			mergedOpts[k] = v
		}
		for k, v := range map[string]any{
			"apikey": env["HONEYCOMB_APIKEY"],
		} {
			mergedOpts[k] = v
		}
		client := sdk.NewHoneycombSDK(mergedOpts)

		idmap := map[string]any{}
		if entidRaw, ok := env["HONEYCOMB_TEST_SLO_COUNT_ENTID"]; ok {
			if entidStr, ok := entidRaw.(string); ok && strings.HasPrefix(entidStr, "{") {
				json.Unmarshal([]byte(entidStr), &idmap)
			} else if entidMap, ok := entidRaw.(map[string]any); ok {
				idmap = entidMap
			}
		}

		return &slo_countDirectSetupResult{client: client, calls: calls, live: true, idmap: idmap}
	}

	mockFetch := func(url string, init map[string]any) (map[string]any, error) {
		*calls = append(*calls, map[string]any{"url": url, "init": init})
		return map[string]any{
			"status":     200,
			"statusText": "OK",
			"headers":    map[string]any{},
			"json": (func() any)(func() any {
				if mockres != nil {
					return mockres
				}
				return map[string]any{"id": "direct01"}
			}),
		}, nil
	}

	client := sdk.NewHoneycombSDK(map[string]any{
		"base": "http://localhost:8080",
		"system": map[string]any{
			"fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
		},
	})

	return &slo_countDirectSetupResult{client: client, calls: calls, live: false, idmap: map[string]any{}}
}

var _ = os.Getenv
var _ = json.Unmarshal

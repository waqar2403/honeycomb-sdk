# Environment direct test

import json
import pytest

from honeycomb_sdk.utility.voxgig_struct import voxgig_struct as vs
from honeycomb_sdk import HoneycombSDK
from honeycomb_sdk.core import helpers
from test import runner


# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


def _live_ok(result):
    status = helpers.to_int(result.get("status"))
    return result.get("err") is None and bool(result.get("ok")) and 200 <= status < 300


class TestEnvironmentDirect:

    def test_should_direct_list_environment(self):
        setup = _environment_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-environment", "live" if setup["live"] else "unit")
        if _skip:
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            for _live_key in ["team_slug01"]:
                if setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live test blocked: needs {_live_key} via HONEYCOMB_TEST_ENVIRONMENT_ENTID")

        client = setup["client"]

        params = {}
        if setup["live"]:
            params["team_slug"] = setup["idmap"].get("team_slug01")
        else:
            params["team_slug"] = "direct01"

        result = client.direct({
            "path": "2/teams/{team_slug}/environments",
            "method": "GET",
            "params": params,
        })
        if setup["live"]:
            if not _live_ok(result):
                runner.live_miss(LIVE_STRICT, "Live list failed: " + runner.live_describe(result))
            if runner.live_list(result.get("data")) is None:
                runner.live_miss(LIVE_STRICT, "Live list returned no list: " + runner.live_describe(result))
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1

    def test_should_direct_load_environment(self):
        setup = _environment_direct_setup({"id": "direct01"})
        _skip, _reason = runner.is_control_skipped("direct", "direct-load-environment", "live" if setup["live"] else "unit")
        if _skip:
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            for _live_key in ["team_slug01"]:
                if setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live test blocked: needs {_live_key} via HONEYCOMB_TEST_ENVIRONMENT_ENTID")

        client = setup["client"]

        params = {}
        query = {}
        if setup["live"]:
            list_result = client.direct({
                "path": "2/teams/{team_slug}/environments",
                "method": "GET",
                "params": {"team_slug": setup["idmap"].get("team_slug01")},
            })
            if not _live_ok(list_result):
                runner.live_miss(LIVE_STRICT, "Live list discovery failed: " + runner.live_describe(list_result))
            records = runner.live_list(list_result.get("data"))
            if records is None:
                runner.live_miss(LIVE_STRICT, "Live list discovery returned no list: " + runner.live_describe(list_result))
            if 0 == len(records):
                runner.live_empty("The account has no environment record to load")
            first = records[0] if isinstance(records[0], dict) else {}
            if first.get("id", first.get("id")) is None:
                runner.live_miss(LIVE_STRICT, "Live load blocked: discovery returned no usable identity")
            params["id"] = first.get("id", first.get("id"))
            params["team_slug"] = setup["idmap"].get("team_slug01")
            pass
        else:
            params["id"] = "direct01"
            params["team_slug"] = "direct02"
            pass

        result = client.direct({
            "path": "2/teams/{team_slug}/environments/{id}",
            "method": "GET",
            "params": params,
            "query": query,
        })
        if setup["live"]:
            if not _live_ok(result):
                runner.live_miss(LIVE_STRICT, "Live load failed: " + runner.live_describe(result))
            if result.get("data") is None:
                runner.live_miss(LIVE_STRICT, "Live load returned no data: " + runner.live_describe(result))
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert result["data"] is not None
            if isinstance(result["data"], dict):
                assert result["data"]["id"] == "direct01"
            assert len(setup["calls"]) == 1



def _environment_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "HONEYCOMB_TEST_ENVIRONMENT_ENTID": {},
        "HONEYCOMB_TEST_LIVE": "FALSE",
        "HONEYCOMB_APIKEY": "",
    })

    live = env.get("HONEYCOMB_TEST_LIVE") == "TRUE"

    if live:
        # sdk-test-control.json's test.client.options seeds the live
        # client; the generated fields below overwrite anything they name.
        merged_opts = dict(runner.live_client_options())
        merged_opts.update({
            "apikey": env.get("HONEYCOMB_APIKEY"),
        })
        client = HoneycombSDK(merged_opts)
        idmap = env.get("HONEYCOMB_TEST_ENVIRONMENT_ENTID")
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": idmap if isinstance(idmap, dict) else {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = HoneycombSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }

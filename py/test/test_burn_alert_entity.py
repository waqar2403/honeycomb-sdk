# BurnAlert entity test

import json
import os
import time

import pytest

from honeycomb_sdk.utility.voxgig_struct import voxgig_struct as vs
from honeycomb_sdk import HoneycombSDK
from honeycomb_sdk.core import helpers
from honeycomb_sdk.config import shared_config
from honeycomb_sdk.feature.base_feature import HoneycombBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestBurnAlertEntity:

    def test_should_create_instance(self):
        testsdk = HoneycombSDK.test(None, None)
        ent = testsdk.BurnAlert(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = HoneycombSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.BurnAlert(None).list({"dataset_slug": 1, "slo_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _burn_alert_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "burn_alert." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key in ["dataset_slug01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via HONEYCOMB_TEST_BURN_ALERT_ENTID")
        client = setup["client"]

        # CREATE
        burn_alert_ref01_ent = client.BurnAlert(None)
        burn_alert_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.burn_alert"), "burn_alert_ref01"))
        burn_alert_ref01_data["dataset_slug"] = setup["idmap"]["dataset_slug01"]

        burn_alert_ref01_data = helpers.to_map(runner.entity_data(burn_alert_ref01_ent.create(burn_alert_ref01_data, None)))
        assert burn_alert_ref01_data is not None
        assert burn_alert_ref01_data["id"] is not None

        # LIST
        burn_alert_ref01_match = {
            "dataset_slug": setup["idmap"]["dataset_slug01"],
        }

        burn_alert_ref01_list_result = burn_alert_ref01_ent.list(burn_alert_ref01_match, None)
        assert isinstance(burn_alert_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(burn_alert_ref01_list_result),
            {"id": burn_alert_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # UPDATE
        burn_alert_ref01_data_up0_up = {
            "id": burn_alert_ref01_data["id"],
            "dataset_slug": setup["idmap"]["dataset_slug"],
        }

        burn_alert_ref01_markdef_up0_name = "alert_type"
        burn_alert_ref01_markdef_up0_value = "Mark01-burn_alert_ref01_" + str(setup["now"])
        burn_alert_ref01_data_up0_up[burn_alert_ref01_markdef_up0_name] = burn_alert_ref01_markdef_up0_value

        burn_alert_ref01_resdata_up0 = helpers.to_map(runner.entity_data(burn_alert_ref01_ent.update(burn_alert_ref01_data_up0_up, None)))
        assert burn_alert_ref01_resdata_up0 is not None
        assert burn_alert_ref01_resdata_up0["id"] == burn_alert_ref01_data_up0_up["id"]
        assert burn_alert_ref01_resdata_up0[burn_alert_ref01_markdef_up0_name] == burn_alert_ref01_markdef_up0_value

        # LOAD
        burn_alert_ref01_match_dt0 = {
            "id": burn_alert_ref01_data["id"],
        }
        burn_alert_ref01_match_dt0["dataset_slug"] = setup["idmap"].get("dataset_slug") or setup["idmap"].get("dataset_slug01")
        burn_alert_ref01_data_dt0_loaded = burn_alert_ref01_ent.load(burn_alert_ref01_match_dt0, None)
        burn_alert_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(burn_alert_ref01_data_dt0_loaded))
        assert burn_alert_ref01_data_dt0_load_result is not None
        assert burn_alert_ref01_data_dt0_load_result["id"] == burn_alert_ref01_data["id"]

        # REMOVE
        burn_alert_ref01_match_rm0 = {
            "id": burn_alert_ref01_data["id"],
        }
        burn_alert_ref01_match_rm0["dataset_slug"] = setup["idmap"].get("dataset_slug") or setup["idmap"].get("dataset_slug01")
        burn_alert_ref01_ent.remove(burn_alert_ref01_match_rm0, None)

        # LIST
        burn_alert_ref01_match_rt0 = {
            "dataset_slug": setup["idmap"]["dataset_slug01"],
        }

        burn_alert_ref01_list_rt0_result = burn_alert_ref01_ent.list(burn_alert_ref01_match_rt0, None)
        assert isinstance(burn_alert_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(burn_alert_ref01_list_rt0_result),
            {"id": burn_alert_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _burn_alert_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/burn_alert/BurnAlertTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = HoneycombSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["burn_alert01", "burn_alert02", "burn_alert03", "dataset_slug01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "HONEYCOMB_TEST_BURN_ALERT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HONEYCOMB_TEST_BURN_ALERT_ENTID": idmap,
        "HONEYCOMB_TEST_LIVE": "FALSE",
        "HONEYCOMB_TEST_EXPLAIN": "FALSE",
        "HONEYCOMB_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("HONEYCOMB_TEST_BURN_ALERT_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("dataset_slug") is None:
        idmap_resolved["dataset_slug"] = idmap_resolved.get("dataset_slug01")

    if env.get("HONEYCOMB_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("HONEYCOMB_APIKEY"),
            },
            extra or {},
        ])
        client = HoneycombSDK(helpers.to_map(merged_opts))

    _live = env.get("HONEYCOMB_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("HONEYCOMB_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }

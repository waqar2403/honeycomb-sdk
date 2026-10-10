# DatasetDefinition entity test

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


class TestDatasetDefinitionEntity:

    def test_should_create_instance(self):
        testsdk = HoneycombSDK.test(None, None)
        ent = testsdk.DatasetDefinition(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = HoneycombSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.DatasetDefinition(None).load({"id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _dataset_definition_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "dataset_definition." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a dataset_definition record it did not create")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        dataset_definition_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.dataset_definition")))
        dataset_definition_ref01_data = None
        if len(dataset_definition_ref01_data_raw) > 0:
            dataset_definition_ref01_data = helpers.to_map(dataset_definition_ref01_data_raw[0][1])

        # UPDATE
        dataset_definition_ref01_ent = client.DatasetDefinition(None)
        dataset_definition_ref01_data_up0_up = {
            "id": dataset_definition_ref01_data["id"],
        }

        dataset_definition_ref01_markdef_up0_name = "link_span_id"
        dataset_definition_ref01_markdef_up0_value = "Mark01-dataset_definition_ref01_" + str(setup["now"])
        dataset_definition_ref01_data_up0_up[dataset_definition_ref01_markdef_up0_name] = dataset_definition_ref01_markdef_up0_value

        dataset_definition_ref01_resdata_up0 = helpers.to_map(runner.entity_data(dataset_definition_ref01_ent.update(dataset_definition_ref01_data_up0_up, None)))
        assert dataset_definition_ref01_resdata_up0 is not None
        assert dataset_definition_ref01_resdata_up0["id"] == dataset_definition_ref01_data_up0_up["id"]
        assert dataset_definition_ref01_resdata_up0[dataset_definition_ref01_markdef_up0_name] == dataset_definition_ref01_markdef_up0_value

        # LOAD
        dataset_definition_ref01_match_dt0 = {
            "id": dataset_definition_ref01_data["id"],
        }
        dataset_definition_ref01_data_dt0_loaded = dataset_definition_ref01_ent.load(dataset_definition_ref01_match_dt0, None)
        dataset_definition_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(dataset_definition_ref01_data_dt0_loaded))
        assert dataset_definition_ref01_data_dt0_load_result is not None
        assert dataset_definition_ref01_data_dt0_load_result["id"] == dataset_definition_ref01_data["id"]



def _dataset_definition_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/dataset_definition/DatasetDefinitionTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = HoneycombSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["dataset_definition01", "dataset_definition02", "dataset_definition03"],
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
        "HONEYCOMB_TEST_DATASET_DEFINITION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HONEYCOMB_TEST_DATASET_DEFINITION_ENTID": idmap,
        "HONEYCOMB_TEST_LIVE": "FALSE",
        "HONEYCOMB_TEST_EXPLAIN": "FALSE",
        "HONEYCOMB_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("HONEYCOMB_TEST_DATASET_DEFINITION_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

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

# Signal entity test

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


class _FailHook(HoneycombBaseFeature):
    def __init__(self):
        super().__init__()
        self.name = "failhook"
        self.unexpected = 0

    def init(self, ctx, options):
        pass

    def PreSpec(self, ctx):
        raise RuntimeError("signal hook failed")

    def PreUnexpected(self, ctx):
        self.unexpected += 1



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestSignalEntity:

    def test_should_create_instance(self):
        testsdk = HoneycombSDK.test(None, None)
        ent = testsdk.Signal(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "signal": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = HoneycombSDK.test(seed, None)
        seen = list(base.Signal(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from honeycomb_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = HoneycombSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Signal(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_report_a_failed_stream(self):
        offline = {"net": {"offline": True}}
        with pytest.raises(Exception, match="offline"):
            list(HoneycombSDK.test(offline, None).Signal(None).stream("list", None, None))

        quiet = {"ctrl": {"throw": False}}
        list(HoneycombSDK.test(offline, None).Signal(None).stream("list", None, quiet))

        if "rbac" in (shared_config().get("feature") or {}):
            denied = HoneycombSDK.test(
                None, {"feature": {"rbac": {"active": True, "deny": True}}})
            with pytest.raises(Exception) as err:
                list(denied.Signal(None).stream("list", None, None))
            assert "rbac_denied" == getattr(err.value, "code", None)

    def test_should_leave_the_callers_ctrl(self):
        explain = {}
        ctrl = {"explain": explain}
        list(HoneycombSDK.test(None, None).Signal(None).stream("list", None, {"ctrl": ctrl}))
        assert ["explain"] == list(ctrl.keys())
        assert explain is ctrl["explain"] and 0 < len(explain)

    def test_should_fire_pre_unexpected(self):
        hook = _FailHook()
        client = HoneycombSDK({"feature": {"test": {"active": True}}, "extend": [hook]})
        with pytest.raises(Exception, match="hook failed"):
            client.Signal(None).list(None, None)
        assert 0 < hook.unexpected

        fired = hook.unexpected
        assert client.Signal(None).list(None, {"throw": False}) is None
        assert fired < hook.unexpected

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = HoneycombSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Signal(None).list({"currently_anomalous": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _signal_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "signal." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a signal record it did not create")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        signal_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.signal")))
        signal_ref01_data = None
        if len(signal_ref01_data_raw) > 0:
            signal_ref01_data = helpers.to_map(signal_ref01_data_raw[0][1])

        # LIST
        signal_ref01_ent = client.Signal(None)
        signal_ref01_match = {}

        signal_ref01_list_result = signal_ref01_ent.list(signal_ref01_match, None)
        assert isinstance(signal_ref01_list_result, list)

        # UPDATE
        signal_ref01_data_up0_up = {
            "id": signal_ref01_data["id"],
        }

        signal_ref01_resdata_up0 = helpers.to_map(runner.entity_data(signal_ref01_ent.update(signal_ref01_data_up0_up, None)))
        assert signal_ref01_resdata_up0 is not None
        assert signal_ref01_resdata_up0["id"] == signal_ref01_data_up0_up["id"]

        # LOAD
        signal_ref01_match_dt0 = {
            "id": signal_ref01_data["id"],
        }
        signal_ref01_data_dt0_loaded = signal_ref01_ent.load(signal_ref01_match_dt0, None)
        signal_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(signal_ref01_data_dt0_loaded))
        assert signal_ref01_data_dt0_load_result is not None
        assert signal_ref01_data_dt0_load_result["id"] == signal_ref01_data["id"]



def _signal_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/signal/SignalTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = HoneycombSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["signal01", "signal02", "signal03"],
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
        "HONEYCOMB_TEST_SIGNAL_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HONEYCOMB_TEST_SIGNAL_ENTID": idmap,
        "HONEYCOMB_TEST_LIVE": "FALSE",
        "HONEYCOMB_TEST_EXPLAIN": "FALSE",
        "HONEYCOMB_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("HONEYCOMB_TEST_SIGNAL_ENTID"))
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

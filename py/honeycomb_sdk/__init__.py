# Honeycomb SDK

from honeycomb_sdk.utility.voxgig_struct import voxgig_struct as vs
from honeycomb_sdk.core.utility_type import HoneycombUtility
from honeycomb_sdk.core.spec import HoneycombSpec
from honeycomb_sdk.core import helpers
from honeycomb_sdk.utility.prepare_method import allowed
from honeycomb_sdk.utility.result_body import unreadable_body

# Load utility registration (populates Utility._registrar)
from honeycomb_sdk.utility import register

# Load features
from honeycomb_sdk.feature.base_feature import HoneycombBaseFeature
from honeycomb_sdk.features import _has_feature, _make_feature


class HoneycombSDK:
    # The options hold the credential. A slot keeps them reachable as
    # `client.options` and out of `vars(client)` and every attribute dump;
    # the dict entry keeps the instance open for everything else.
    __slots__ = ("_options", "__dict__")

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self._options = None

        utility = HoneycombUtility()
        self._utility = utility

        from honeycomb_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    @property
    def options(self):
        return self._options

    @options.setter
    def options(self, value):
        self._options = value

    def __repr__(self):
        return "HoneycombSDK(mode=" + repr(self.mode) + ")"

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return HoneycombUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"
        method = method.upper()

        allow_method = vs.getpath(options, "allow.method")
        if not allowed(allow_method, method):
            raise ctx.make_error("spec_method_allow",
                'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + str(allow_method) + '"')

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = HoneycombSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        return allowed(vs.getpath(self.options, "allow.op"), op)

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "HoneycombSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            # That error never passes through make_error, so it is cleaned.
            return {"ok": False, "err": utility.clean(self._rootctx, err)}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": utility.clean(ctx, fetch_err)}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            body_err = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None
                if vs.getprop(fetched, "unreadable") is True:
                    failed = None if 200 <= status < 300 else ctx.make_error(
                        "request_status",
                        "request: " + str(status) + ": " + str(vs.getprop(fetched, "statusText")))
                    body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
                                               fetchdef.get("headers"), failed)

            out = {
                "ok": body_err is None and status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }
            if body_err is not None:
                out["err"] = utility.clean(ctx, body_err)
            return out

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("HoneycombSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def Auth(self, data=None) -> "AuthEntity":
        """Entity factory: client.Auth().list() / client.Auth().load({"id": ...})."""
        from honeycomb_sdk.entity.auth_entity import AuthEntity
        return AuthEntity(self, data)


    def Board(self, data=None) -> "BoardEntity":
        """Entity factory: client.Board().list() / client.Board().load({"id": ...})."""
        from honeycomb_sdk.entity.board_entity import BoardEntity
        return BoardEntity(self, data)


    def BoardView(self, data=None) -> "BoardViewEntity":
        """Entity factory: client.BoardView().list() / client.BoardView().load({"id": ...})."""
        from honeycomb_sdk.entity.board_view_entity import BoardViewEntity
        return BoardViewEntity(self, data)


    def BulkSignalRecipientAssignment(self, data=None) -> "BulkSignalRecipientAssignmentEntity":
        """Entity factory: client.BulkSignalRecipientAssignment().list() / client.BulkSignalRecipientAssignment().load({"id": ...})."""
        from honeycomb_sdk.entity.bulk_signal_recipient_assignment_entity import BulkSignalRecipientAssignmentEntity
        return BulkSignalRecipientAssignmentEntity(self, data)


    def BurnAlert(self, data=None) -> "BurnAlertEntity":
        """Entity factory: client.BurnAlert().list() / client.BurnAlert().load({"id": ...})."""
        from honeycomb_sdk.entity.burn_alert_entity import BurnAlertEntity
        return BurnAlertEntity(self, data)


    def CalculatedField(self, data=None) -> "CalculatedFieldEntity":
        """Entity factory: client.CalculatedField().list() / client.CalculatedField().load({"id": ...})."""
        from honeycomb_sdk.entity.calculated_field_entity import CalculatedFieldEntity
        return CalculatedFieldEntity(self, data)


    def Column(self, data=None) -> "ColumnEntity":
        """Entity factory: client.Column().list() / client.Column().load({"id": ...})."""
        from honeycomb_sdk.entity.column_entity import ColumnEntity
        return ColumnEntity(self, data)


    def Dataset(self, data=None) -> "DatasetEntity":
        """Entity factory: client.Dataset().list() / client.Dataset().load({"id": ...})."""
        from honeycomb_sdk.entity.dataset_entity import DatasetEntity
        return DatasetEntity(self, data)


    def DatasetDefinition(self, data=None) -> "DatasetDefinitionEntity":
        """Entity factory: client.DatasetDefinition().list() / client.DatasetDefinition().load({"id": ...})."""
        from honeycomb_sdk.entity.dataset_definition_entity import DatasetDefinitionEntity
        return DatasetDefinitionEntity(self, data)


    def Environment(self, data=None) -> "EnvironmentEntity":
        """Entity factory: client.Environment().list() / client.Environment().load({"id": ...})."""
        from honeycomb_sdk.entity.environment_entity import EnvironmentEntity
        return EnvironmentEntity(self, data)


    def Event(self, data=None) -> "EventEntity":
        """Entity factory: client.Event().list() / client.Event().load({"id": ...})."""
        from honeycomb_sdk.entity.event_entity import EventEntity
        return EventEntity(self, data)


    def HistoricalAnomaly(self, data=None) -> "HistoricalAnomalyEntity":
        """Entity factory: client.HistoricalAnomaly().list() / client.HistoricalAnomaly().load({"id": ...})."""
        from honeycomb_sdk.entity.historical_anomaly_entity import HistoricalAnomalyEntity
        return HistoricalAnomalyEntity(self, data)


    def KeyManagement(self, data=None) -> "KeyManagementEntity":
        """Entity factory: client.KeyManagement().list() / client.KeyManagement().load({"id": ...})."""
        from honeycomb_sdk.entity.key_management_entity import KeyManagementEntity
        return KeyManagementEntity(self, data)


    def KinesisEvent(self, data=None) -> "KinesisEventEntity":
        """Entity factory: client.KinesisEvent().list() / client.KinesisEvent().load({"id": ...})."""
        from honeycomb_sdk.entity.kinesis_event_entity import KinesisEventEntity
        return KinesisEventEntity(self, data)


    def ManagementAuth(self, data=None) -> "ManagementAuthEntity":
        """Entity factory: client.ManagementAuth().list() / client.ManagementAuth().load({"id": ...})."""
        from honeycomb_sdk.entity.management_auth_entity import ManagementAuthEntity
        return ManagementAuthEntity(self, data)


    def MapDependency(self, data=None) -> "MapDependencyEntity":
        """Entity factory: client.MapDependency().list() / client.MapDependency().load({"id": ...})."""
        from honeycomb_sdk.entity.map_dependency_entity import MapDependencyEntity
        return MapDependencyEntity(self, data)


    def Marker(self, data=None) -> "MarkerEntity":
        """Entity factory: client.Marker().list() / client.Marker().load({"id": ...})."""
        from honeycomb_sdk.entity.marker_entity import MarkerEntity
        return MarkerEntity(self, data)


    def MarkerSetting(self, data=None) -> "MarkerSettingEntity":
        """Entity factory: client.MarkerSetting().list() / client.MarkerSetting().load({"id": ...})."""
        from honeycomb_sdk.entity.marker_setting_entity import MarkerSettingEntity
        return MarkerSettingEntity(self, data)


    def Query(self, data=None) -> "QueryEntity":
        """Entity factory: client.Query().list() / client.Query().load({"id": ...})."""
        from honeycomb_sdk.entity.query_entity import QueryEntity
        return QueryEntity(self, data)


    def QueryAnnotation(self, data=None) -> "QueryAnnotationEntity":
        """Entity factory: client.QueryAnnotation().list() / client.QueryAnnotation().load({"id": ...})."""
        from honeycomb_sdk.entity.query_annotation_entity import QueryAnnotationEntity
        return QueryAnnotationEntity(self, data)


    def QueryResult(self, data=None) -> "QueryResultEntity":
        """Entity factory: client.QueryResult().list() / client.QueryResult().load({"id": ...})."""
        from honeycomb_sdk.entity.query_result_entity import QueryResultEntity
        return QueryResultEntity(self, data)


    def Recipient(self, data=None) -> "RecipientEntity":
        """Entity factory: client.Recipient().list() / client.Recipient().load({"id": ...})."""
        from honeycomb_sdk.entity.recipient_entity import RecipientEntity
        return RecipientEntity(self, data)


    def Signal(self, data=None) -> "SignalEntity":
        """Entity factory: client.Signal().list() / client.Signal().load({"id": ...})."""
        from honeycomb_sdk.entity.signal_entity import SignalEntity
        return SignalEntity(self, data)


    def Slo(self, data=None) -> "SloEntity":
        """Entity factory: client.Slo().list() / client.Slo().load({"id": ...})."""
        from honeycomb_sdk.entity.slo_entity import SloEntity
        return SloEntity(self, data)


    def SloCount(self, data=None) -> "SloCountEntity":
        """Entity factory: client.SloCount().list() / client.SloCount().load({"id": ...})."""
        from honeycomb_sdk.entity.slo_count_entity import SloCountEntity
        return SloCountEntity(self, data)


    def SloHistory(self, data=None) -> "SloHistoryEntity":
        """Entity factory: client.SloHistory().list() / client.SloHistory().load({"id": ...})."""
        from honeycomb_sdk.entity.slo_history_entity import SloHistoryEntity
        return SloHistoryEntity(self, data)


    def SloHourlyCount(self, data=None) -> "SloHourlyCountEntity":
        """Entity factory: client.SloHourlyCount().list() / client.SloHourlyCount().load({"id": ...})."""
        from honeycomb_sdk.entity.slo_hourly_count_entity import SloHourlyCountEntity
        return SloHourlyCountEntity(self, data)


    def Trigger(self, data=None) -> "TriggerEntity":
        """Entity factory: client.Trigger().list() / client.Trigger().load({"id": ...})."""
        from honeycomb_sdk.entity.trigger_entity import TriggerEntity
        return TriggerEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "HoneycombSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from honeycomb_sdk.entity.auth_entity import AuthEntity
    from honeycomb_sdk.entity.board_entity import BoardEntity
    from honeycomb_sdk.entity.board_view_entity import BoardViewEntity
    from honeycomb_sdk.entity.bulk_signal_recipient_assignment_entity import BulkSignalRecipientAssignmentEntity
    from honeycomb_sdk.entity.burn_alert_entity import BurnAlertEntity
    from honeycomb_sdk.entity.calculated_field_entity import CalculatedFieldEntity
    from honeycomb_sdk.entity.column_entity import ColumnEntity
    from honeycomb_sdk.entity.dataset_entity import DatasetEntity
    from honeycomb_sdk.entity.dataset_definition_entity import DatasetDefinitionEntity
    from honeycomb_sdk.entity.environment_entity import EnvironmentEntity
    from honeycomb_sdk.entity.event_entity import EventEntity
    from honeycomb_sdk.entity.historical_anomaly_entity import HistoricalAnomalyEntity
    from honeycomb_sdk.entity.key_management_entity import KeyManagementEntity
    from honeycomb_sdk.entity.kinesis_event_entity import KinesisEventEntity
    from honeycomb_sdk.entity.management_auth_entity import ManagementAuthEntity
    from honeycomb_sdk.entity.map_dependency_entity import MapDependencyEntity
    from honeycomb_sdk.entity.marker_entity import MarkerEntity
    from honeycomb_sdk.entity.marker_setting_entity import MarkerSettingEntity
    from honeycomb_sdk.entity.query_entity import QueryEntity
    from honeycomb_sdk.entity.query_annotation_entity import QueryAnnotationEntity
    from honeycomb_sdk.entity.query_result_entity import QueryResultEntity
    from honeycomb_sdk.entity.recipient_entity import RecipientEntity
    from honeycomb_sdk.entity.signal_entity import SignalEntity
    from honeycomb_sdk.entity.slo_entity import SloEntity
    from honeycomb_sdk.entity.slo_count_entity import SloCountEntity
    from honeycomb_sdk.entity.slo_history_entity import SloHistoryEntity
    from honeycomb_sdk.entity.slo_hourly_count_entity import SloHourlyCountEntity
    from honeycomb_sdk.entity.trigger_entity import TriggerEntity

"use strict";
// Honeycomb Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.HoneycombSDK = exports.HoneycombEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const AuthEntity_1 = require("./entity/AuthEntity");
const BoardEntity_1 = require("./entity/BoardEntity");
const BoardViewEntity_1 = require("./entity/BoardViewEntity");
const BulkSignalRecipientAssignmentEntity_1 = require("./entity/BulkSignalRecipientAssignmentEntity");
const BurnAlertEntity_1 = require("./entity/BurnAlertEntity");
const CalculatedFieldEntity_1 = require("./entity/CalculatedFieldEntity");
const ColumnEntity_1 = require("./entity/ColumnEntity");
const DatasetEntity_1 = require("./entity/DatasetEntity");
const DatasetDefinitionEntity_1 = require("./entity/DatasetDefinitionEntity");
const EnvironmentEntity_1 = require("./entity/EnvironmentEntity");
const EventEntity_1 = require("./entity/EventEntity");
const HistoricalAnomalyEntity_1 = require("./entity/HistoricalAnomalyEntity");
const KeyManagementEntity_1 = require("./entity/KeyManagementEntity");
const KinesiEntity_1 = require("./entity/KinesiEntity");
const MapDependencyEntity_1 = require("./entity/MapDependencyEntity");
const MarkerEntity_1 = require("./entity/MarkerEntity");
const MarkerSettingEntity_1 = require("./entity/MarkerSettingEntity");
const QueryEntity_1 = require("./entity/QueryEntity");
const QueryAnnotationEntity_1 = require("./entity/QueryAnnotationEntity");
const QueryResultEntity_1 = require("./entity/QueryResultEntity");
const RecipientEntity_1 = require("./entity/RecipientEntity");
const SignalEntity_1 = require("./entity/SignalEntity");
const SloEntity_1 = require("./entity/SloEntity");
const SloCountEntity_1 = require("./entity/SloCountEntity");
const SloHistoryEntity_1 = require("./entity/SloHistoryEntity");
const SloHourlyCountEntity_1 = require("./entity/SloHourlyCountEntity");
const TriggerEntity_1 = require("./entity/TriggerEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const HoneycombEntityBase_1 = require("./HoneycombEntityBase");
Object.defineProperty(exports, "HoneycombEntityBase", { enumerable: true, get: function () { return HoneycombEntityBase_1.HoneycombEntityBase; } });
const Utility_1 = require("./utility/Utility");
const ResultBodyUtility_1 = require("./utility/ResultBodyUtility");
const MakeRequestUtility_1 = require("./utility/MakeRequestUtility");
const PrepareMethodUtility_1 = require("./utility/PrepareMethodUtility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class HoneycombSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        for (const key of ['_options', '_rootctx', '_features']) {
            Object.defineProperty(this, key, {
                value: this[key], enumerable: false, writable: true, configurable: true
            });
        }
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const method = String(fetchargs.method || 'GET').toUpperCase();
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.method, method)) {
            return ctx.error('spec_method_allow', 'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + options.allow.method + '"');
        }
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method,
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!(0, PrepareMethodUtility_1.allowed)(this._options.allow.op, 'direct')) {
            return {
                ok: false,
                err: new Error('HoneycombSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return { ok: false, err: utility.clean(this._rootctx, fetchdef) };
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            if (true === fetchdef.signal?.aborted) {
                throw fetchdef.signal.reason;
            }
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, fetched)) };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            let err = undefined;
            if (!noBody) {
                let text = undefined;
                try {
                    const raw = fetched;
                    if ('function' === typeof raw.text) {
                        text = await raw.text();
                        json = '' === text.trim() ? undefined : JSON.parse(text);
                    }
                    else {
                        json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                    }
                }
                catch (parseErr) {
                    if ('SyntaxError' !== parseErr?.name) {
                        throw parseErr;
                    }
                    err = (0, ResultBodyUtility_1.unreadableBody)(ctx, {
                        status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
                        failed: 200 <= status && status < 300 ? undefined :
                            ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
                    });
                }
            }
            return {
                ok: null == err && status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
                ...(null == err ? {} : { err: utility.clean(ctx, err) }),
            };
        }
        catch (err) {
            return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, err)) };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.op, 'graphql')) {
            return {
                ok: false,
                err: new Error('HoneycombSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('HoneycombSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.Auth().list()` / `client.Auth().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Auth(entopts) {
        const self = this;
        return new AuthEntity_1.AuthEntity(self, entopts);
    }
    // Entity access: `client.Board().list()` / `client.Board().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Board(entopts) {
        const self = this;
        return new BoardEntity_1.BoardEntity(self, entopts);
    }
    // Entity access: `client.BoardView().list()` / `client.BoardView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BoardView(entopts) {
        const self = this;
        return new BoardViewEntity_1.BoardViewEntity(self, entopts);
    }
    // Entity access: `client.BulkSignalRecipientAssignment().list()` / `client.BulkSignalRecipientAssignment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BulkSignalRecipientAssignment(entopts) {
        const self = this;
        return new BulkSignalRecipientAssignmentEntity_1.BulkSignalRecipientAssignmentEntity(self, entopts);
    }
    // Entity access: `client.BurnAlert().list()` / `client.BurnAlert().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BurnAlert(entopts) {
        const self = this;
        return new BurnAlertEntity_1.BurnAlertEntity(self, entopts);
    }
    // Entity access: `client.CalculatedField().list()` / `client.CalculatedField().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CalculatedField(entopts) {
        const self = this;
        return new CalculatedFieldEntity_1.CalculatedFieldEntity(self, entopts);
    }
    // Entity access: `client.Column().list()` / `client.Column().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Column(entopts) {
        const self = this;
        return new ColumnEntity_1.ColumnEntity(self, entopts);
    }
    // Entity access: `client.Dataset().list()` / `client.Dataset().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Dataset(entopts) {
        const self = this;
        return new DatasetEntity_1.DatasetEntity(self, entopts);
    }
    // Entity access: `client.DatasetDefinition().list()` / `client.DatasetDefinition().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DatasetDefinition(entopts) {
        const self = this;
        return new DatasetDefinitionEntity_1.DatasetDefinitionEntity(self, entopts);
    }
    // Entity access: `client.Environment().list()` / `client.Environment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Environment(entopts) {
        const self = this;
        return new EnvironmentEntity_1.EnvironmentEntity(self, entopts);
    }
    // Entity access: `client.Event().list()` / `client.Event().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Event(entopts) {
        const self = this;
        return new EventEntity_1.EventEntity(self, entopts);
    }
    // Entity access: `client.HistoricalAnomaly().list()` / `client.HistoricalAnomaly().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    HistoricalAnomaly(entopts) {
        const self = this;
        return new HistoricalAnomalyEntity_1.HistoricalAnomalyEntity(self, entopts);
    }
    // Entity access: `client.KeyManagement().list()` / `client.KeyManagement().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    KeyManagement(entopts) {
        const self = this;
        return new KeyManagementEntity_1.KeyManagementEntity(self, entopts);
    }
    // Entity access: `client.Kinesi().list()` / `client.Kinesi().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Kinesi(entopts) {
        const self = this;
        return new KinesiEntity_1.KinesiEntity(self, entopts);
    }
    // Entity access: `client.MapDependency().list()` / `client.MapDependency().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MapDependency(entopts) {
        const self = this;
        return new MapDependencyEntity_1.MapDependencyEntity(self, entopts);
    }
    // Entity access: `client.Marker().list()` / `client.Marker().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Marker(entopts) {
        const self = this;
        return new MarkerEntity_1.MarkerEntity(self, entopts);
    }
    // Entity access: `client.MarkerSetting().list()` / `client.MarkerSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MarkerSetting(entopts) {
        const self = this;
        return new MarkerSettingEntity_1.MarkerSettingEntity(self, entopts);
    }
    // Entity access: `client.Query().list()` / `client.Query().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Query(entopts) {
        const self = this;
        return new QueryEntity_1.QueryEntity(self, entopts);
    }
    // Entity access: `client.QueryAnnotation().list()` / `client.QueryAnnotation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    QueryAnnotation(entopts) {
        const self = this;
        return new QueryAnnotationEntity_1.QueryAnnotationEntity(self, entopts);
    }
    // Entity access: `client.QueryResult().list()` / `client.QueryResult().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    QueryResult(entopts) {
        const self = this;
        return new QueryResultEntity_1.QueryResultEntity(self, entopts);
    }
    // Entity access: `client.Recipient().list()` / `client.Recipient().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Recipient(entopts) {
        const self = this;
        return new RecipientEntity_1.RecipientEntity(self, entopts);
    }
    // Entity access: `client.Signal().list()` / `client.Signal().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Signal(entopts) {
        const self = this;
        return new SignalEntity_1.SignalEntity(self, entopts);
    }
    // Entity access: `client.Slo().list()` / `client.Slo().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Slo(entopts) {
        const self = this;
        return new SloEntity_1.SloEntity(self, entopts);
    }
    // Entity access: `client.SloCount().list()` / `client.SloCount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SloCount(entopts) {
        const self = this;
        return new SloCountEntity_1.SloCountEntity(self, entopts);
    }
    // Entity access: `client.SloHistory().list()` / `client.SloHistory().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SloHistory(entopts) {
        const self = this;
        return new SloHistoryEntity_1.SloHistoryEntity(self, entopts);
    }
    // Entity access: `client.SloHourlyCount().list()` / `client.SloHourlyCount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SloHourlyCount(entopts) {
        const self = this;
        return new SloHourlyCountEntity_1.SloHourlyCountEntity(self, entopts);
    }
    // Entity access: `client.Trigger().list()` / `client.Trigger().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Trigger(entopts) {
        const self = this;
        return new TriggerEntity_1.TriggerEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new HoneycombSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return HoneycombSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'Honeycomb' };
    }
    toString() {
        return 'Honeycomb ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.HoneycombSDK = HoneycombSDK;
const SDK = HoneycombSDK;
exports.SDK = SDK;
//# sourceMappingURL=HoneycombSDK.js.map
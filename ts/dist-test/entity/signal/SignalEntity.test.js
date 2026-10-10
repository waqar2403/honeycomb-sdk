"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('SignalEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.Signal();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('signal hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.HoneycombSDK.test(offline).Signal().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.HoneycombSDK.test(offline).Signal()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.HoneycombSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Signal().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.HoneycombSDK.test().Signal().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.HoneycombSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Signal().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Signal().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Signal().list({ "currently_anomalous": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'signal.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "auto_investigate": { "a": true, "h": "Auto Investigate", "n": "auto_investigate", "r": true, "ro": true, "sh": "When `true`, Honeycomb will automatically start an investigation when this Signal fires.", "t": "`$BOOLEAN`", "key$": "auto_investigate", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "ro": true, "sh": "The ISO8601-formatted time when the Signal was created.", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "currently_anomalous": { "a": true, "h": "Currently Anomalous", "n": "currently_anomalous", "r": true, "ro": true, "sh": "Whether the Signal is currently in an anomalous state.", "t": "`$BOOLEAN`", "key$": "currently_anomalous", "index$": 2 }, "dataset_slug": { "a": true, "h": "Dataset Slug", "n": "dataset_slug", "r": true, "ro": true, "sh": "The slug of the dataset the Signal's service reports to.", "t": "`$STRING`", "key$": "dataset_slug", "index$": 3 }, "enabled": { "a": true, "h": "Enabled", "n": "enabled", "op": { "update": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "sh": "Whether the Signal is currently enabled.", "t": "`$BOOLEAN`", "key$": "enabled", "index$": 4 }, "environment_slug": { "a": true, "h": "Environment Slug", "n": "environment_slug", "r": true, "ro": true, "sh": "The slug of the environment the Signal belongs to.", "t": "`$STRING`", "key$": "environment_slug", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "ro": true, "sh": "Unique identifier (ID) of the Signal.", "t": "`$STRING`", "key$": "id", "index$": 6 }, "last_anomaly_ended_at": { "a": true, "h": "Last Anomaly Ended At", "n": "last_anomaly_ended_at", "r": true, "ro": true, "sh": "The end time of the most recent anomaly, in seconds since UNIX epoch.", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "last_anomaly_ended_at", "index$": 7 }, "last_anomaly_started_at": { "a": true, "h": "Last Anomaly Started At", "n": "last_anomaly_started_at", "r": true, "ro": true, "sh": "The start time of the most recent anomaly, in seconds since UNIX epoch.", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "last_anomaly_started_at", "index$": 8 }, "measured_signal": { "a": true, "h": "Measured Signal", "n": "measured_signal", "r": true, "ro": true, "sh": "The kind of measurement the Signal is trained on.", "t": "`$STRING`", "key$": "measured_signal", "index$": 9 }, "recipients": { "a": true, "h": "Recipients", "n": "recipients", "op": { "update": { "req": false, "type": "`$ARRAY`" } }, "r": true, "sh": "The Recipients notified when this Signal fires.", "t": "`$ARRAY`", "key$": "recipients", "index$": 10 }, "sensitivity": { "a": true, "h": "Sensitivity", "n": "sensitivity", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "How far a measurement must deviate from the trained normal band before the Signal fires.", "t": "`$ANY`", "key$": "sensitivity", "index$": 11 }, "service_name": { "a": true, "h": "Service Name", "n": "service_name", "r": true, "ro": true, "sh": "The name of the service the Signal monitors.", "t": "`$STRING`", "key$": "service_name", "index$": 12 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "ro": true, "sh": "The lifecycle status of the Signal.", "t": "`$STRING`", "key$": "status", "index$": 13 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "ro": true, "sh": "The ISO8601-formatted time when the Signal was last updated.", "t": "`$STRING`", "key$": "updated_at", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "signal", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /1/signals", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "currently_anomalous", "or": "currently_anomalous", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "ex": "checkout-api", "k": "query", "n": "dataset_slug", "or": "dataset_slug", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "error_rate", "k": "query", "n": "measured_signal", "or": "measured_signal", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "eyxJjcmAVhdGVkX", "k": "query", "n": "page_after", "or": "page[after]", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": 10, "k": "query", "n": "page_size", "or": "page[size]", "r": false, "t": "`$NUMBER`", "index$": 4 }, { "a": true, "ex": "checkout-api", "k": "query", "n": "service_name", "or": "service_name", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/1/signals", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "signals" }], "t": { "req": "`reqdata`", "res": "`body.signals`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /1/signals/{signalId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "signalId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/1/signals/{signalId}", "q": { "exist": ["id"] }, "r": { "param": { "signalId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "signals" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["enabled", "recipients", "sensitivity"], "co": { "id": "PUT /1/signals/{signalId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "signalId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/1/signals/{signalId}", "q": { "exist": ["id"] }, "r": { "param": { "signalId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "signals" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "signal", "name__orig": "signal", "Name": "Signal", "name_": "signal", "name-": "signal", "NAME": "SIGNAL", "index$": 21 }, { "active": true, "entity": "signal", "key$": "BasicSignalFlow", "kind": "basic", "name": "BasicSignalFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "signal_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "signal_ref01", "srcdatavar": "signal_ref01_data", "suffix": "_up0" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-signal_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "signal_ref01", "srcdatavar": "signal_ref01_data", "suffix": "_dt0" }, "m": { "id": "signal01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-signal_ref01" } }], "index$": 2 }] }, 'Signal', { "GET /1/signals": { "protocol": "http", "parameters": [{ "name": "page[after]", "description": "The string value of the `next` attribute from a previous result page.\nThe cursor value must be empty or omitted for the first request of a cursor-paginated query.\n", "in": "query", "schema": { "type": "string" }, "example": "eyxJjcmAVhdGVkX", "x-ref": "#/components/parameters/PaginationCursor", "index$": 0 }, { "name": "page[size]", "description": "The number of entries to include per response. Maximum value is 100.", "in": "query", "schema": { "type": "number", "minimum": 1, "maximum": 100, "default": 20 }, "example": 10, "x-ref": "#/components/parameters/PaginationSize", "index$": 1 }, { "in": "query", "name": "service_name", "description": "Restrict results to Signals for a single service.", "schema": { "type": "string" }, "example": "checkout-api", "index$": 2 }, { "in": "query", "name": "dataset_slug", "description": "Restrict results to Signals in a single dataset.", "schema": { "type": "string" }, "example": "checkout-api", "index$": 3 }, { "in": "query", "name": "measured_signal", "description": "Restrict results to Signals of the given kind.", "schema": { "type": "string", "description": "The kind of measurement the Signal is trained on.\n\n- `error_rate`: The fraction of erroring requests for the service.\n- `presence`: Whether the service is producing spans.\n", "enum": ["error_rate", "presence"], "example": "error_rate", "x-ref": "#/components/schemas/AnomalySignal" }, "index$": 4 }, { "in": "query", "name": "status", "description": "Restrict results to Signals in the given status.\n\nWhen `status` is provided, it takes precedence over `currently_anomalous`.\n", "schema": { "type": "string", "enum": ["onboarding", "normal", "anomalous", "ineligible", "off"] }, "index$": 5 }, { "in": "query", "name": "currently_anomalous", "description": "When `true`, only return Signals that are currently in an anomalous state.\n\nThis parameter is ignored when `status` is provided (use `status=anomalous` instead).\n", "schema": { "type": "boolean" }, "index$": 6 }] }, "GET /1/signals/{signalId}": { "protocol": "http", "parameters": [{ "name": "signalId", "description": "The unique identifier (ID) of a Signal.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /1/signals/{signalId}": { "protocol": "http", "requestBody": { "description": "Fields to update on the Signal. All fields are optional.", "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "Fields to update on a Signal. All fields are optional and only supplied fields are applied.", "properties": { "enabled": { "type": "boolean", "description": "Turn the Signal on (`true`) or off (`false`).", "example": true, "key$": "enabled" }, "sensitivity": { "allOf": [{ "type": "string", "description": "How far a measurement must deviate from the trained normal band before the Signal fires.\n\nHigher sensitivity narrows the normal band and catches smaller deviations.\n`sensitivity` is always `null` for `presence` Signals.\n", "enum": ["low", "medium", "high"], "example": "medium", "x-ref": "#/components/schemas/AnomalySignalSensitivity" }], "description": "Set the sensitivity bucket for `error_rate` Signals. Cannot be set on `presence` Signals or on Signals that have not yet trained.\n", "key$": "sensitivity" }, "recipients": { "type": "array", "description": "Replace the Signal's Recipient set with the given list. An empty array clears all Recipients. Each Recipient must be referenced by its `id` from the [Recipients API](/api/recipients/). Requires the **Manage Recipients** permission in addition to **Manage Signals**.\n", "items": { "type": "object", "required": ["id"], "description": "A Recipient assigned to a Signal.", "properties": { "id": { "type": "string", "description": "The unique identifier of an existing Recipient. Create Recipients via the [Recipients API](/api/recipients/).", "example": "hcar_01jak3ymk8s5cpc2xz3q7d8v9r" }, "details": { "type": "object", "description": "Per-assignment settings for how this Recipient receives notifications for this Signal.", "properties": {} } }, "x-ref": "#/components/schemas/SignalRecipient" }, "key$": "recipients" } }, "x-ref": "#/components/schemas/UpdateSignalRequest", "index$": 1 } } } }, "parameters": [{ "name": "signalId", "description": "The unique identifier (ID) of a Signal.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let signal_ref01_data = Object.values(setup.data.existing.signal)[0];
        // LIST
        const signal_ref01_ent = client.Signal();
        const signal_ref01_match = {};
        const signal_ref01_list = (await signal_ref01_ent.list(signal_ref01_match)).map((e) => e.data());
        // UPDATE
        const signal_ref01_data_up0 = {};
        signal_ref01_data_up0.id = signal_ref01_data.id;
        const signal_ref01_resdata_up0 = (await signal_ref01_ent.update(signal_ref01_data_up0)).data();
        (0, node_assert_1.default)(signal_ref01_resdata_up0.id === signal_ref01_data_up0.id);
        // LOAD
        const signal_ref01_match_dt0 = {};
        signal_ref01_match_dt0.id = signal_ref01_data.id;
        const signal_ref01_data_dt0 = (await signal_ref01_ent.load(signal_ref01_match_dt0)).data();
        (0, node_assert_1.default)(signal_ref01_data_dt0.id === signal_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/signal/SignalTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['signal01', 'signal02', 'signal03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_SIGNAL_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_SIGNAL_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_SIGNAL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.HoneycombSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.HONEYCOMB_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.HONEYCOMB_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=SignalEntity.test.js.map
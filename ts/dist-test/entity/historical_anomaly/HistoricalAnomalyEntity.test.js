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
(0, node_test_1.describe)('HistoricalAnomalyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.HistoricalAnomaly();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.HistoricalAnomaly().list({ "signal_id": 1, "end_time": 1, "start_time": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'historical_anomaly.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "ended_at": { "a": true, "h": "Ended At", "n": "ended_at", "r": true, "ro": true, "sh": "The time the anomaly ended, in seconds since UNIX epoch.", "t": "`$INTEGER`", "key$": "ended_at", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "ro": true, "sh": "A deterministic identifier for the anomaly, derived from the Signal, its measured kind, and the anomaly's start time.", "t": "`$STRING`", "key$": "id", "index$": 1 }, "measurement": { "a": true, "h": "Measurement", "n": "measurement", "r": true, "ro": true, "sh": "The measured value that triggered the anomaly.", "t": "`$NUMBER`", "key$": "measurement", "index$": 2 }, "normal_range": { "a": true, "h": "Normal Range", "n": "normal_range", "r": true, "sh": "The trained normal band the measurement exceeded.", "t": "`$ANY`", "key$": "normal_range", "index$": 3 }, "started_at": { "a": true, "h": "Started At", "n": "started_at", "r": true, "ro": true, "sh": "The time the anomaly started, in seconds since UNIX epoch.", "t": "`$INTEGER`", "key$": "started_at", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "historical_anomaly", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /1/signals/{signalId}/historical_anomalies", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "signal_id", "or": "signalId", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1741392000, "k": "query", "n": "end_time", "or": "end_time", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "eyxJjcmAVhdGVkX", "k": "query", "n": "page_after", "or": "page[after]", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 10, "k": "query", "n": "page_size", "or": "page[size]", "r": false, "t": "`$NUMBER`", "index$": 2 }, { "a": true, "ex": 1740787200, "k": "query", "n": "start_time", "or": "start_time", "r": true, "t": "`$INTEGER`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/1/signals/{signalId}/historical_anomalies", "q": { "exist": ["end_time", "signal_id", "start_time"] }, "r": { "param": { "signalId": "signal_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "signals" }, { "var": "signal_id" }, { "lit": "historical_anomalies" }], "t": { "req": "`reqdata`", "res": "`body.historical_anomalies`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.signal"]] }, "key$": "historical_anomaly", "name__orig": "historical_anomaly", "Name": "HistoricalAnomaly", "name_": "historical_anomaly", "name-": "historical-anomaly", "NAME": "HISTORICAL_ANOMALY", "index$": 12 }, { "active": true, "entity": "historical_anomaly", "key$": "BasicHistoricalAnomalyFlow", "kind": "basic", "name": "BasicHistoricalAnomalyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "signal_id": "signal01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "historical_anomaly_ref01" } }], "index$": 0 }] }, 'HistoricalAnomaly', { "GET /1/signals/{signalId}/historical_anomalies": { "protocol": "http", "parameters": [{ "name": "signalId", "description": "The unique identifier (ID) of a Signal.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "in": "query", "name": "start_time", "required": true, "description": "Start of the query window, in seconds since UNIX epoch.", "schema": { "type": "integer" }, "example": 1740787200, "index$": 1 }, { "in": "query", "name": "end_time", "required": true, "description": "End of the query window, in seconds since UNIX epoch. Must be after `start_time` and within 30 days of it.", "schema": { "type": "integer" }, "example": 1741392000, "index$": 2 }, { "name": "page[after]", "description": "The string value of the `next` attribute from a previous result page.\nThe cursor value must be empty or omitted for the first request of a cursor-paginated query.\n", "in": "query", "schema": { "type": "string" }, "example": "eyxJjcmAVhdGVkX", "x-ref": "#/components/parameters/PaginationCursor", "index$": 3 }, { "name": "page[size]", "description": "The number of entries to include per response. Maximum value is 100.", "in": "query", "schema": { "type": "number", "minimum": 1, "maximum": 100, "default": 20 }, "example": 10, "x-ref": "#/components/parameters/PaginationSize", "index$": 4 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let historical_anomaly_ref01_data = Object.values(setup.data.existing.historical_anomaly)[0];
        // LIST
        const historical_anomaly_ref01_ent = client.HistoricalAnomaly();
        const historical_anomaly_ref01_match = {};
        historical_anomaly_ref01_match['signal_id'] = setup.idmap['signal01'];
        const historical_anomaly_ref01_list = (await historical_anomaly_ref01_ent.list(historical_anomaly_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/historical_anomaly/HistoricalAnomalyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['historical_anomaly01', 'historical_anomaly02', 'historical_anomaly03', 'signal01', 'signal02', 'signal03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_HISTORICAL_ANOMALY_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_HISTORICAL_ANOMALY_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_HISTORICAL_ANOMALY_ENTID'];
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
//# sourceMappingURL=HistoricalAnomalyEntity.test.js.map
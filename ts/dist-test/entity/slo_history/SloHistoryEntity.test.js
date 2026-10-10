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
(0, node_test_1.describe)('SloHistoryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.SloHistory();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.SloHistory().create({ "end_time": "x", "ids": "x", "start_time": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'slo_history.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "end_time": { "a": true, "h": "End Time", "n": "end_time", "r": true, "sh": "The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for.", "t": "`$INTEGER`", "key$": "end_time", "index$": 0 }, "ids": { "a": true, "h": "Ids", "n": "ids", "r": true, "sh": "A list of SLO IDs to retrieve history for.", "t": "`$ARRAY`", "key$": "ids", "index$": 1 }, "start_time": { "a": true, "h": "Start Time", "n": "start_time", "r": true, "sh": "The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for.", "t": "`$INTEGER`", "key$": "start_time", "index$": 2 } }, "name": "slo_history", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["end_time", "ids", "start_time"], "co": { "id": "POST /1/reporting/slos/historical", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/1/reporting/slos/historical", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "reporting" }, { "lit": "slos" }, { "lit": "historical" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "slo_history", "name__orig": "slo_history", "Name": "SloHistory", "name_": "slo_history", "name-": "slo-history", "NAME": "SLO_HISTORY", "index$": 24 }, { "active": true, "entity": "slo_history", "key$": "BasicSloHistoryFlow", "kind": "basic", "name": "BasicSloHistoryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "slo_history_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'SloHistory', { "POST /1/reporting/slos/historical": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "required": ["ids", "start_time", "end_time"], "properties": { "ids": { "type": "array", "description": "A list of SLO IDs to retrieve history for. Cannot be an empty array or more than 24 in length.\n", "minItems": 1, "maxItems": 24, "example": ["2LBq9LckbcA", "CzcpPs7cJ4d"], "key$": "ids" }, "start_time": { "type": "integer", "description": "The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for. Cannot be more than a year in the past.", "example": 1742230800, "key$": "start_time" }, "end_time": { "type": "integer", "description": "The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for. Must be greater than `start_time`. Cannot be a future timestamp.", "example": 1745254800, "key$": "end_time" } }, "x-ref": "#/components/schemas/SLOHistoryRequest", "index$": 1 } } }, "required": true }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const slo_history_ref01_ent = client.SloHistory();
        let slo_history_ref01_data = setup.data.new.slo_history['slo_history_ref01'];
        slo_history_ref01_data = (await slo_history_ref01_ent.create(slo_history_ref01_data)).data();
        (0, node_assert_1.default)(null != slo_history_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/slo_history/SloHistoryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['slo_history01', 'slo_history02', 'slo_history03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_SLO_HISTORY_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_SLO_HISTORY_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_SLO_HISTORY_ENTID'];
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
//# sourceMappingURL=SloHistoryEntity.test.js.map
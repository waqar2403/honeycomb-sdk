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
(0, node_test_1.describe)('KinesiEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.Kinesi();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Kinesi().create({ "dataset_slug": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'kinesi.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "errorMessage": { "a": true, "h": "Error Message", "n": "errorMessage", "r": false, "t": "`$STRING`", "key$": "errorMessage", "index$": 0 }, "records": { "a": true, "h": "Records", "n": "records", "r": false, "t": "`$ARRAY`", "key$": "records", "index$": 1 }, "requestId": { "a": true, "h": "Request Id", "n": "requestId", "r": false, "t": "`$STRING`", "key$": "requestId", "index$": 2 }, "timestamp": { "a": true, "h": "Timestamp", "n": "timestamp", "r": false, "t": "`$INTEGER`", "key$": "timestamp", "index$": 3 } }, "name": "kinesi", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["records", "requestId", "timestamp"], "co": { "id": "POST /1/kinesis_events/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "33658b45-a8f1-4007-92e8-f601ae33db14", "k": "header", "n": "x_amz_firehose_request_id", "or": "X-Amz-Firehose-Request-Id", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/1/kinesis_events/{datasetSlug}", "q": { "exist": ["dataset_slug", "x_amz_firehose_request_id"] }, "r": { "param": { "datasetSlug": "dataset_slug" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "kinesis_events" }, { "var": "dataset_slug" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "kinesi", "name__orig": "kinesi", "Name": "Kinesi", "name_": "kinesi", "name-": "kinesi", "NAME": "KINESI", "index$": 13 }, { "active": true, "entity": "kinesi", "key$": "BasicKinesiFlow", "kind": "basic", "name": "BasicKinesiFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "kinesi_ref01" }, "m": { "dataset_slug": "dataset_slug01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Kinesi', { "POST /1/kinesis_events/{datasetSlug}": { "protocol": "http", "requestBody": { "description": "The request body expected from Amazon Kinesis Firehose. Events and metrics have the same shape but the base64 encoded data blob for metrics is expected to be Protowire-encoded as well. CloudWatch Logs data coming through Amazon Kinesis Firehose is expected to have a gzip Content-Encoding.\n", "content": { "application/json": { "schema": { "type": "object", "properties": { "requestId": { "type": "string", "key$": "requestId" }, "timestamp": { "type": "integer", "key$": "timestamp" }, "records": { "type": "array", "items": { "type": "object", "properties": { "data": { "type": "string", "description": "Base64 encoded Kinesis record from AWS" } }, "x-ref": "#/components/schemas/KinesisEventRecord" }, "key$": "records" } }, "x-ref": "#/components/schemas/KinesisEvent", "index$": 1 } } }, "required": true }, "parameters": [{ "in": "header", "name": "X-Amz-Firehose-Request-Id", "description": "AWS Request ID associated with the Kinesis Firehose.\n", "schema": { "type": "string" }, "required": true, "example": "33658b45-a8f1-4007-92e8-f601ae33db14", "index$": 0 }, { "name": "datasetSlug", "description": "The dataset slug.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlug", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const kinesi_ref01_ent = client.Kinesi();
        let kinesi_ref01_data = setup.data.new.kinesi['kinesi_ref01'];
        kinesi_ref01_data['dataset_slug'] = setup.idmap['dataset_slug01'];
        kinesi_ref01_data = (await kinesi_ref01_ent.create(kinesi_ref01_data)).data();
        (0, node_assert_1.default)(null != kinesi_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/kinesi/KinesiTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['kinesi01', 'kinesi02', 'kinesi03', 'dataset_slug01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_KINESI_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_KINESI_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_KINESI_ENTID'];
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
//# sourceMappingURL=KinesiEntity.test.js.map
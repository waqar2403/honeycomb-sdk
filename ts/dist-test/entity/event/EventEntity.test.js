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
(0, node_test_1.describe)('EventEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.Event();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Event().create({ "dataset_slug": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'event.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "batch_events": { "a": true, "h": "Batch Events", "n": "batch_events", "r": false, "sh": "The array should contain one or more JSON objects representing Events.", "t": "`$ARRAY`", "key$": "batch_events", "index$": 0 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$INTEGER`", "key$": "status", "index$": 1 } }, "name": "event", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["batch_events"], "co": { "id": "POST /1/batch/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "plaintext", "k": "header", "n": "content_encoding", "or": "Content-Encoding", "r": false, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/1/batch/{datasetSlug}", "q": { "exist": ["batch_events", "dataset_slug"] }, "r": { "param": { "datasetSlug": "dataset_slug" } }, "rb": { "alternatives": [{ "binary": true, "kind": "raw", "media": "application/octet-stream" }], "kind": "json", "media": "application/json" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "batch" }, { "var": "dataset_slug" }], "t": { "req": "`reqdata.batch_events`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /1/events/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "x_honeycomb_event_time", "or": "X-Honeycomb-Event-Time", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "header", "n": "x_honeycomb_samplerate", "or": "X-Honeycomb-Samplerate", "r": false, "t": "`$INTEGER`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/1/events/{datasetSlug}", "q": { "exist": ["dataset_slug"] }, "r": { "param": { "datasetSlug": "dataset_slug" } }, "s": [{ "lit": "1" }, { "lit": "events" }, { "var": "dataset_slug" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "event", "name__orig": "event", "Name": "Event", "name_": "event", "name-": "event", "NAME": "EVENT", "index$": 11 }, { "active": true, "entity": "event", "key$": "BasicEventFlow", "kind": "basic", "name": "BasicEventFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "event_ref01" }, "m": { "dataset_slug": "dataset_slug01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Event', { "POST /1/batch/{datasetSlug}": { "protocol": "http", "requestBody": { "required": true, "description": "The array should contain one or more JSON objects representing Events. Each Event contains its payload under the `data` key. Values of `time` and/or `samplerate` can be included as well.\n\nThe JSON payload should have the structure:\n\n  `[{ \"data\": { \"key1\": \"value1\", \"key2\": 2.0 } }, ... ]`\n\nSize limitations may be addressed by compressing request bodies with `gzip` or `zstd` compression.\n\nAn empty `202` response indicates that the event has been queued for processing.\n", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "data": { "type": "object", "allOf": [{ "type": "object", "minProperties": 1, "maxProperties": 2000, "additionalProperties": {}, "x-ref": "#/components/schemas/Event" }] }, "time": { "type": "string", "description": "Should be in RFC3339 high precision format (for example, YYYY-MM-DDTHH:MM:SS.mmmZ). May be a Unix epoch (seconds since 1970) with second or greater precision (for example, 1452759330927). Optional. If not set, defaults to the time that the API receives the event.\n" }, "samplerate": { "type": "integer", "description": "An integer representing the denominator in the fraction 1/n when client-side sampling has been applied. Optional. If not set, defaults to `1`, meaning \"not sampled\". Refer to [Sampling](https://docs.honeycomb.io/manage-data-volume/sample/sampled-data-in-honeycomb/) for more detail.\n" } }, "x-ref": "#/components/schemas/BatchEvent" }, "index$": 1 }, "example": [{ "time": "2006-01-02T15:04:05.99Z", "samplerate": 1, "data": { "method": "GET", "endpoint": "/foo", "shard": "users", "duration_ms": 32 } }, { "time": "2006-01-02T15:04:05.99Z", "data": { "some_other_key": "value", "duration_ms": 40 } }] }, "application/octet-stream": { "schema": { "type": "string", "format": "binary" } } } }, "parameters": [{ "name": "datasetSlug", "description": "The dataset slug.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlug", "index$": 0 }, { "in": "header", "name": "Content-Encoding", "description": "Included when sending events in a file. Size limitations may be addressed by compressing request bodies with gzip or zstd compression. Be sure to set the Content-Encoding to `gzip` or `zstd` when compressing the request body. If sending plaintext, omit this header; \"plaintext\" is included to simplify the example with curl.\n", "schema": { "type": "string", "enum": ["gzip", "zstd"] }, "example": "plaintext", "index$": 1 }] }, "POST /1/events/{datasetSlug}": { "protocol": "http", "requestBody": { "description": "The request body is limited to raw (potentially compressed) size of 1MB.\n\nThe maximum number of distinct columns (fields) allowed in an event is `2000`.\n", "content": { "application/json": { "schema": { "type": "object", "minProperties": 1, "maxProperties": 2000, "additionalProperties": { "description": "A collection of key-value properties that represent the Event. Honeycomb supports basic data types for the values of each Event attribute.\n\n### Limits\n- 2,000 fields per event. The entire event must be less than 1 MB of uncompressed JSON.\n- String Fields: Each string field has a maximum length of 64KB.\n- Number Fields: Integers and Floats are both 64-bit.\n", "type": ["string", "number", "boolean"] }, "x-ref": "#/components/schemas/Event", "index$": 1 }, "example": { "method": "GET", "endpoint": "/foo", "shard": "users", "duration_ms": 32 } } }, "required": true }, "parameters": [{ "name": "datasetSlug", "description": "The dataset slug.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlug", "index$": 0 }, { "in": "header", "name": "X-Honeycomb-Event-Time", "description": "The Event's timestamp. Optional. Defaults to server time.", "schema": { "type": "integer" }, "index$": 1 }, { "in": "header", "name": "X-Honeycomb-Samplerate", "description": "Optional. Defaults to 1.", "schema": { "type": "integer" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const event_ref01_ent = client.Event();
        let event_ref01_data = setup.data.new.event['event_ref01'];
        event_ref01_data['dataset_slug'] = setup.idmap['dataset_slug01'];
        event_ref01_data = (await event_ref01_ent.create(event_ref01_data)).data();
        (0, node_assert_1.default)(null != event_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/event/EventTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['event01', 'event02', 'event03', 'dataset_slug01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_EVENT_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_EVENT_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_EVENT_ENTID'];
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
//# sourceMappingURL=EventEntity.test.js.map
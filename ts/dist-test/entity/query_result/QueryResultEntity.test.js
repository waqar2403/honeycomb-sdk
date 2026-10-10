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
(0, node_test_1.describe)('QueryResultEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.QueryResult();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.QueryResult().load({ "dataset_slug": 1, "id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'query_result.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "complete": { "a": true, "h": "Complete", "n": "complete", "r": false, "ro": true, "sh": "Indicates if the query results are available yet or not.", "t": "`$BOOLEAN`", "key$": "complete", "index$": 0 }, "data": { "a": true, "h": "Data", "n": "data", "r": false, "sh": "An object containing the query result data", "t": "`$OBJECT`", "key$": "data", "index$": 1 }, "disable_other_by_aggregate": { "a": true, "h": "Disable Other By Aggregate", "n": "disable_other_by_aggregate", "r": false, "sh": "If true, the \"other_by_aggregate\" data is excluded from the query result.", "t": "`$BOOLEAN`", "wo": true, "key$": "disable_other_by_aggregate", "index$": 2 }, "disable_series": { "a": true, "h": "Disable Series", "n": "disable_series", "r": false, "sh": "If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field.", "t": "`$BOOLEAN`", "wo": true, "key$": "disable_series", "index$": 3 }, "disable_total_by_aggregate": { "a": true, "h": "Disable Total By Aggregate", "n": "disable_total_by_aggregate", "r": false, "sh": "If `true`, data representing each aggregate in the query's total value will not be returned.", "t": "`$BOOLEAN`", "wo": true, "key$": "disable_total_by_aggregate", "index$": 4 }, "error": { "a": true, "h": "Error", "n": "error", "r": false, "ro": true, "sh": "Only present if the query failed to run.", "t": "`$STRING`", "key$": "error", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "ro": true, "sh": "The unique identifier (ID) of a Query Result", "t": "`$STRING`", "key$": "id", "index$": 6 }, "limit": { "a": true, "h": "Limit", "n": "limit", "r": false, "sh": "If `disable_series` is `true`, a limit may be optionally given.", "t": "`$INTEGER`", "wo": true, "key$": "limit", "index$": 7 }, "links": { "a": true, "h": "Links", "n": "links", "r": false, "sh": "An object containing UI links to the query result and query result graph", "t": "`$OBJECT`", "key$": "links", "index$": 8 }, "query": { "a": true, "h": "Query", "n": "query", "r": false, "ro": true, "t": "`$ANY`", "union": { "branches": 5, "count": 2, "depth": 10 }, "key$": "query", "index$": 9 }, "query_id": { "a": true, "h": "Query Id", "n": "query_id", "r": true, "sh": "The ID of a query returned from the [Queries endpoint](/api/queries/).", "t": "`$STRING`", "wo": true, "key$": "query_id", "index$": 10 } }, "id": { "field": "id", "from": { "id": "id" }, "name": "id", "parts": ["dataset_slug", "id"], "sep": "/" }, "name": "query_result", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["disable_other_by_aggregate", "disable_series", "disable_total_by_aggregate", "limit", "query_id"], "co": { "id": "POST /1/query_results/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/1/query_results/{datasetSlug}", "q": { "exist": ["dataset_slug"] }, "r": { "param": { "datasetSlug": "dataset_slug" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "query_results" }, { "var": "dataset_slug" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /1/query_results/{datasetSlug}/{queryResultId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "queryResultId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/1/query_results/{datasetSlug}/{queryResultId}", "q": { "exist": ["dataset_slug", "id"] }, "r": { "param": { "datasetSlug": "dataset_slug", "queryResultId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "query_results" }, { "var": "dataset_slug" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "query_result", "name__orig": "query_result", "Name": "QueryResult", "name_": "query_result", "name-": "query-result", "NAME": "QUERY_RESULT", "index$": 20 }, { "active": true, "entity": "query_result", "key$": "BasicQueryResultFlow", "kind": "basic", "name": "BasicQueryResultFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "query_result_ref01" }, "m": { "dataset_slug": "dataset_slug01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "query_result_ref01", "srcdatavar": "query_result_ref01_data", "suffix": "_dt0" }, "m": { "dataset_slug": "dataset_slug01", "id": "query_result01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-query_result_ref01" } }], "index$": 1 }] }, 'QueryResult', { "POST /1/query_results/{datasetSlug}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "description": "A Query Result is created with the Query ID.", "required": ["query_id"], "properties": { "query_id": { "type": "string", "writeOnly": true, "description": "The ID of a query returned from the [Queries endpoint](/api/queries/).\n", "example": "mabAMpSPDjH", "key$": "query_id" }, "disable_series": { "type": "boolean", "writeOnly": true, "description": "If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field.\n", "default": false, "key$": "disable_series" }, "disable_total_by_aggregate": { "type": "boolean", "writeOnly": true, "description": "If `true`, data representing each aggregate in the query's total value will not be returned. Ensure `disable_series` is false to return the timeseries data.\n", "default": true, "key$": "disable_total_by_aggregate" }, "disable_other_by_aggregate": { "type": "boolean", "default": true, "writeOnly": true, "description": "If true, the \"other_by_aggregate\" data is excluded from the query result.\n", "key$": "disable_other_by_aggregate" }, "limit": { "type": "integer", "writeOnly": true, "maximum": 10000, "description": "If `disable_series` is `true`, a limit may be optionally given. The limit will override the default limit of 1_000 results with a maximum available limit of 10_000. If `disable_series` is `false`, this field will be ignored.\n", "key$": "limit" } }, "x-ref": "#/components/schemas/CreateQueryResultRequest", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }] }, "GET /1/query_results/{datasetSlug}/{queryResultId}": { "protocol": "http", "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }, { "name": "queryResultId", "description": "The unique identifier (ID) of the query result.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const query_result_ref01_ent = client.QueryResult();
        let query_result_ref01_data = setup.data.new.query_result['query_result_ref01'];
        query_result_ref01_data['dataset_slug'] = setup.idmap['dataset_slug01'];
        query_result_ref01_data = (await query_result_ref01_ent.create(query_result_ref01_data)).data();
        (0, node_assert_1.default)(null != query_result_ref01_data.id);
        // LOAD
        const query_result_ref01_match_dt0 = {};
        query_result_ref01_match_dt0.id = query_result_ref01_data.id;
        query_result_ref01_match_dt0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01'];
        const query_result_ref01_data_dt0 = (await query_result_ref01_ent.load(query_result_ref01_match_dt0)).data();
        (0, node_assert_1.default)(query_result_ref01_data_dt0.id === query_result_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/query_result/QueryResultTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['query_result01', 'query_result02', 'query_result03', 'dataset_slug01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_QUERY_RESULT_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_QUERY_RESULT_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_QUERY_RESULT_ENTID'];
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
//# sourceMappingURL=QueryResultEntity.test.js.map
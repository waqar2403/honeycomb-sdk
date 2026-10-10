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
(0, node_test_1.describe)('MapDependencyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.MapDependency();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.MapDependency().load({ "request_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'map_dependency.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "dependencies": { "a": true, "h": "Dependencies", "n": "dependencies", "r": false, "sh": "Array of service dependencies.", "t": "`$ANY`", "key$": "dependencies", "index$": 0 }, "end_time": { "a": true, "h": "End Time", "n": "end_time", "r": false, "sh": "Absolute end time to evaluate dependencies, in seconds since UNIX epoch.", "t": "`$INTEGER`", "key$": "end_time", "index$": 1 }, "filters": { "a": true, "h": "Filters", "n": "filters", "r": false, "sh": "Optional list of service nodes to filter dependencies by.", "t": "`$ARRAY`", "key$": "filters", "index$": 2 }, "links": { "a": true, "h": "Links", "n": "links", "r": true, "sh": "Links to iterate through the pages of results.", "t": "`$OBJECT`", "key$": "links", "index$": 3 }, "request_id": { "a": true, "h": "Request Id", "n": "request_id", "r": false, "sh": "Unique identifier for the Map Dependency Request.", "t": "`$STRING`", "key$": "request_id", "index$": 4 }, "start_time": { "a": true, "h": "Start Time", "n": "start_time", "r": false, "sh": "Absolute start time to evaluate dependencies, in seconds since UNIX epoch.", "t": "`$INTEGER`", "key$": "start_time", "index$": 5 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Status of the Map Dependency Request.", "t": "`$STRING`", "key$": "status", "index$": 6 }, "time_range": { "a": true, "h": "Time Range", "n": "time_range", "r": false, "sh": "Time range in seconds (minimum 1).", "t": "`$INTEGER`", "key$": "time_range", "index$": 7 } }, "name": "map_dependency", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["end_time", "filters", "start_time", "time_range"], "co": { "id": "POST /1/maps/dependencies/requests", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 5000, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/1/maps/dependencies/requests", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "maps" }, { "lit": "dependencies" }, { "lit": "requests" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /1/maps/dependencies/requests/{requestId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "request_id", "or": "requestId", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "eyxJjcmAVhdGVkX", "k": "query", "n": "page_after", "or": "page[after]", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 10, "k": "query", "n": "page_size", "or": "page[size]", "r": false, "t": "`$NUMBER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/1/maps/dependencies/requests/{requestId}", "q": { "exist": ["request_id"] }, "r": { "param": { "requestId": "request_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "maps" }, { "lit": "dependencies" }, { "lit": "requests" }, { "var": "request_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "map_dependency", "name__orig": "map_dependency", "Name": "MapDependency", "name_": "map_dependency", "name-": "map-dependency", "NAME": "MAP_DEPENDENCY", "index$": 15 }, { "active": true, "entity": "map_dependency", "key$": "BasicMapDependencyFlow", "kind": "basic", "name": "BasicMapDependencyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "map_dependency_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "map_dependency_ref01", "srcdatavar": "map_dependency_ref01_data", "suffix": "_dt0" }, "m": { "id": "map_dependency01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-map_dependency_ref01" } }], "index$": 1 }] }, 'MapDependency', { "POST /1/maps/dependencies/requests": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "description": "Create a Map Dependency Request.", "properties": { "start_time": { "type": "integer", "description": "Absolute start time to evaluate dependencies, in seconds since UNIX epoch. Must be <= `end_time` (when `time_range` is not provided).\n", "example": 1622548800, "key$": "start_time" }, "end_time": { "type": "integer", "description": "Absolute end time to evaluate dependencies, in seconds since UNIX epoch. Must be >= `start_time` (when `time_range` is not provided).\n", "example": 1622635200, "key$": "end_time" }, "time_range": { "type": "integer", "default": 7200, "minimum": 1, "description": "Time range in seconds (minimum 1). Can be used with either `start_time` (seconds after `start_time`), `end_time` (seconds before `end_time`), or without either (seconds before now).\n", "example": 7200, "key$": "time_range" }, "filters": { "type": "array", "description": "Optional list of service nodes to filter dependencies by. Only dependencies involving these nodes will be returned.\n", "items": { "type": "object", "description": "A node in the service map (typically a service).", "required": ["name"], "properties": { "name": { "type": "string", "description": "Name of the service or node.\n", "example": "user-service" }, "type": { "type": "string", "description": "Type of the node. Currently only \"service\" is supported. Defaults to \"service\" if not specified.\n", "enum": [], "example": "service" } }, "x-ref": "#/components/schemas/MapNode" }, "key$": "filters" } }, "x-ref": "#/components/schemas/CreateMapDependenciesRequest", "index$": 1 }, "examples": { "Get all depenedencies for last 2 hours for the user-service": { "value": { "time_range": 7200, "filters": [{ "name": "user-service", "type": "service" }] } }, "Get dependencies for last 1 day starting from 2025-07-01": { "value": { "time_range": 86400, "start_time": 1751328000 } } } } }, "required": false }, "parameters": [{ "name": "limit", "in": "query", "required": false, "description": "Maximum number of dependencies to return. Default is 10000, maximum is 64000.\n", "schema": { "type": "integer", "minimum": 1, "maximum": 64000, "default": 10000 }, "example": 5000, "index$": 0 }] }, "GET /1/maps/dependencies/requests/{requestId}": { "protocol": "http", "parameters": [{ "name": "requestId", "description": "The unique identifier (ID) of a Map Dependencies Request.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "page[after]", "description": "The string value of the `next` attribute from a previous result page.\nThe cursor value must be empty or omitted for the first request of a cursor-paginated query.\n", "in": "query", "schema": { "type": "string" }, "example": "eyxJjcmAVhdGVkX", "x-ref": "#/components/parameters/PaginationCursor", "index$": 1 }, { "name": "page[size]", "description": "The number of entries to include per response. Maximum value is 100.", "in": "query", "schema": { "type": "number", "minimum": 1, "maximum": 100, "default": 20 }, "example": 10, "x-ref": "#/components/parameters/PaginationSize", "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const map_dependency_ref01_ent = client.MapDependency();
        let map_dependency_ref01_data = setup.data.new.map_dependency['map_dependency_ref01'];
        map_dependency_ref01_data = (await map_dependency_ref01_ent.create(map_dependency_ref01_data)).data();
        (0, node_assert_1.default)(null != map_dependency_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/map_dependency/MapDependencyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['map_dependency01', 'map_dependency02', 'map_dependency03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_MAP_DEPENDENCY_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_MAP_DEPENDENCY_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_MAP_DEPENDENCY_ENTID'];
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
//# sourceMappingURL=MapDependencyEntity.test.js.map
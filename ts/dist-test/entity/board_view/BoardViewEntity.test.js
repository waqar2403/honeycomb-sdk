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
(0, node_test_1.describe)('BoardViewEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.BoardView();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.BoardView().list({ "board_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'board_view.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "filters": { "a": true, "h": "Filters", "n": "filters", "op": { "create": { "req": true, "type": "`$ARRAY`" }, "update": { "req": true, "type": "`$ARRAY`" } }, "r": false, "sh": "The filters to apply to this view.", "t": "`$ARRAY`", "key$": "filters", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the board view.", "t": "`$STRING`", "key$": "id", "index$": 1 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The name of the view.", "t": "`$STRING`", "key$": "name", "index$": 2 } }, "id": { "field": "id", "name": "id" }, "name": "board_view", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["filters", "name"], "co": { "id": "POST /1/boards/{boardId}/views", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "board_id", "or": "boardId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/1/boards/{boardId}/views", "q": { "exist": ["board_id"] }, "r": { "param": { "boardId": "board_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "boards" }, { "var": "board_id" }, { "lit": "views" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /1/boards/{boardId}/views", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "board_id", "or": "boardId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/1/boards/{boardId}/views", "q": { "exist": ["board_id"] }, "r": { "param": { "boardId": "board_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "boards" }, { "var": "board_id" }, { "lit": "views" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /1/boards/{boardId}/views/{viewId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "board_id", "or": "boardId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "viewId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/1/boards/{boardId}/views/{viewId}", "q": { "exist": ["board_id", "id"] }, "r": { "param": { "boardId": "board_id", "viewId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "boards" }, { "var": "board_id" }, { "lit": "views" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /1/boards/{boardId}/views/{viewId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "board_id", "or": "boardId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "viewId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/1/boards/{boardId}/views/{viewId}", "q": { "exist": ["board_id", "id"] }, "r": { "param": { "boardId": "board_id", "viewId": "id" } }, "s": [{ "lit": "1" }, { "lit": "boards" }, { "var": "board_id" }, { "lit": "views" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["filters", "id", "name"], "co": { "id": "PUT /1/boards/{boardId}/views/{viewId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "board_id", "or": "boardId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "viewId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/1/boards/{boardId}/views/{viewId}", "q": { "exist": ["board_id", "id"] }, "r": { "param": { "boardId": "board_id", "viewId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "boards" }, { "var": "board_id" }, { "lit": "views" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.board"]] }, "key$": "board_view", "name__orig": "board_view", "Name": "BoardView", "name_": "board_view", "name-": "board-view", "NAME": "BOARD_VIEW", "index$": 3 }, { "active": true, "entity": "board_view", "key$": "BasicBoardViewFlow", "kind": "basic", "name": "BasicBoardViewFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "board_view_ref01" }, "m": { "board_id": "board01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "board_id": "board01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "board_view_ref01" } }], "index$": 1 }, { "a": true, "d": { "board_id": "board01" }, "i": { "ref": "board_view_ref01", "srcdatavar": "board_view_ref01_data", "suffix": "_up0", "textfield": "name" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-board_view_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "board_view_ref01", "srcdatavar": "board_view_ref01_data", "suffix": "_dt0" }, "m": { "board_id": "board01", "id": "board_view01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-board_view_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "board_view_ref01", "suffix": "_rm0" }, "m": { "board_id": "board01", "id": "board_view01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "board_id": "board01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "board_view_ref01" } }], "index$": 5 }] }, 'BoardView', { "POST /1/boards/{boardId}/views": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["name", "filters"], "properties": { "name": { "type": "string", "description": "The name of the view.", "minLength": 1, "maxLength": 255, "example": "My View", "key$": "name" }, "filters": { "type": "array", "description": "The filters to apply to this view.", "minItems": 1, "items": { "type": "object", "required": ["column", "operation"], "properties": { "column": { "type": "string", "description": "The column name to filter on.", "example": "status" }, "operation": { "type": "string", "description": "The filter operation.", "enum": [], "example": "=" }, "value": { "description": "The value to filter by.", "example": "error" } }, "x-ref": "#/components/schemas/BoardViewFilter" }, "key$": "filters" } }, "x-ref": "#/components/schemas/CreateBoardViewRequest", "index$": 1 }, "examples": { "Create board view for error statuses": { "value": { "name": "Errors View", "filters": [{ "column": "status", "operation": "=", "value": "error" }] } } } } } }, "parameters": [{ "name": "boardId", "description": "The unique identifier (ID) of a Board.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /1/boards/{boardId}/views": { "protocol": "http", "parameters": [{ "name": "boardId", "description": "The unique identifier (ID) of a Board.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /1/boards/{boardId}/views/{viewId}": { "protocol": "http", "parameters": [{ "name": "boardId", "description": "The unique identifier (ID) of a Board.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "viewId", "description": "The unique identifier (ID) of a Board View.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /1/boards/{boardId}/views/{viewId}": { "protocol": "http", "parameters": [{ "name": "boardId", "description": "The unique identifier (ID) of a Board.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "viewId", "description": "The unique identifier (ID) of a Board View.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /1/boards/{boardId}/views/{viewId}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["name", "filters"], "properties": { "id": { "type": "string", "description": "Unique identifier for the board view.", "example": "eC_abc123", "key$": "id" }, "name": { "type": "string", "description": "The name of the view.", "minLength": 1, "maxLength": 255, "example": "My View", "key$": "name" }, "filters": { "type": "array", "description": "The filters to apply to this view.", "minItems": 1, "items": { "type": "object", "required": ["column", "operation"], "properties": { "column": { "type": "string", "description": "The column name to filter on.", "example": "status" }, "operation": { "type": "string", "description": "The filter operation.", "enum": [], "example": "=" }, "value": { "description": "The value to filter by.", "example": "error" } }, "x-ref": "#/components/schemas/BoardViewFilter" }, "key$": "filters" } }, "x-ref": "#/components/schemas/UpdateBoardViewRequest", "index$": 1 }, "examples": { "Update board view for error statuses": { "value": { "name": "Errors View", "filters": [{ "column": "status", "operation": "=", "value": "error" }] } } } } } }, "parameters": [{ "name": "boardId", "description": "The unique identifier (ID) of a Board.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "viewId", "description": "The unique identifier (ID) of a Board View.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const board_view_ref01_ent = client.BoardView();
        let board_view_ref01_data = setup.data.new.board_view['board_view_ref01'];
        board_view_ref01_data['board_id'] = setup.idmap['board01'];
        board_view_ref01_data = (await board_view_ref01_ent.create(board_view_ref01_data)).data();
        (0, node_assert_1.default)(null != board_view_ref01_data.id);
        // LIST
        const board_view_ref01_match = {};
        board_view_ref01_match['board_id'] = setup.idmap['board01'];
        const board_view_ref01_list = (await board_view_ref01_ent.list(board_view_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(board_view_ref01_list, { id: board_view_ref01_data.id })));
        // UPDATE
        const board_view_ref01_data_up0 = {};
        board_view_ref01_data_up0.id = board_view_ref01_data.id;
        board_view_ref01_data_up0['board_id'] = setup.idmap['board_id'] ?? setup.idmap['board01'];
        const board_view_ref01_markdef_up0 = { name: 'name', value: 'Mark01-board_view_ref01_' + setup.now };
        board_view_ref01_data_up0[board_view_ref01_markdef_up0.name] = board_view_ref01_markdef_up0.value;
        const board_view_ref01_resdata_up0 = (await board_view_ref01_ent.update(board_view_ref01_data_up0)).data();
        (0, node_assert_1.default)(board_view_ref01_resdata_up0.id === board_view_ref01_data_up0.id);
        (0, node_assert_1.default)(board_view_ref01_resdata_up0[board_view_ref01_markdef_up0.name] === board_view_ref01_markdef_up0.value);
        // LOAD
        const board_view_ref01_match_dt0 = {};
        board_view_ref01_match_dt0.id = board_view_ref01_data.id;
        board_view_ref01_match_dt0['board_id'] = setup.idmap['board_id'] ?? setup.idmap['board01'];
        const board_view_ref01_data_dt0 = (await board_view_ref01_ent.load(board_view_ref01_match_dt0)).data();
        (0, node_assert_1.default)(board_view_ref01_data_dt0.id === board_view_ref01_data.id);
        // REMOVE
        const board_view_ref01_match_rm0 = { id: board_view_ref01_data.id };
        board_view_ref01_match_rm0['board_id'] = setup.idmap['board_id'] ?? setup.idmap['board01'];
        await board_view_ref01_ent.remove(board_view_ref01_match_rm0);
        // LIST
        const board_view_ref01_match_rt0 = {};
        board_view_ref01_match_rt0['board_id'] = setup.idmap['board01'];
        const board_view_ref01_list_rt0 = (await board_view_ref01_ent.list(board_view_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(board_view_ref01_list_rt0, { id: board_view_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/board_view/BoardViewTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['board_view01', 'board_view02', 'board_view03', 'board01', 'board02', 'board03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_BOARD_VIEW_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_BOARD_VIEW_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_BOARD_VIEW_ENTID'];
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
//# sourceMappingURL=BoardViewEntity.test.js.map
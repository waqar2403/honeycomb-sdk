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
(0, node_test_1.describe)('BoardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.Board();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('board hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.HoneycombSDK.test(offline).Board().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.HoneycombSDK.test(offline).Board()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.HoneycombSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Board().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.HoneycombSDK.test().Board().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.HoneycombSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Board().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Board().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Board().list({ "description": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'board.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "A description of the Board.", "t": "`$STRING`", "key$": "description", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "ro": true, "sh": "Unique identifier (ID), returned in response bodies.", "t": "`$STRING`", "key$": "id", "index$": 1 }, "layout_generation": { "a": true, "h": "Layout Generation", "n": "layout_generation", "r": false, "sh": "The layout generation mode for the board.", "t": "`$STRING`", "wo": true, "key$": "layout_generation", "index$": 2 }, "links": { "a": true, "h": "Links", "n": "links", "r": false, "ro": true, "t": "`$OBJECT`", "key$": "links", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "The name of the Board.", "t": "`$STRING`", "key$": "name", "index$": 4 }, "panels": { "a": true, "h": "Panels", "n": "panels", "r": false, "t": "`$ARRAY`", "key$": "panels", "index$": 5 }, "preset_filters": { "a": true, "h": "Preset Filters", "n": "preset_filters", "r": false, "sh": "A list of preset filters to apply to the board.", "t": "`$ARRAY`", "key$": "preset_filters", "index$": 6 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "A list of key-value pairs to help identify the Trigger.", "t": "`$ARRAY`", "key$": "tags", "index$": 7 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "sh": "The type of the board.", "t": "`$STRING`", "key$": "type", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "board", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["description", "id", "layout_generation", "links", "name", "panels", "preset_filters", "tags", "type"], "co": { "id": "POST /1/boards", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/1/boards", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "boards" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /1/boards", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/1/boards", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "boards" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /1/boards/{boardId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "boardId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/1/boards/{boardId}", "q": { "exist": ["id"] }, "r": { "param": { "boardId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "boards" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /1/boards/{boardId}/views/{viewId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "boardId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "view_id", "or": "viewId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/1/boards/{boardId}/views/{viewId}", "q": { "exist": ["id", "view_id"] }, "r": { "param": { "boardId": "id", "viewId": "view_id" } }, "s": [{ "lit": "1" }, { "lit": "boards" }, { "var": "id" }, { "lit": "views" }, { "var": "view_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /1/boards/{boardId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "boardId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/1/boards/{boardId}", "q": { "exist": ["id"] }, "r": { "param": { "boardId": "id" } }, "s": [{ "lit": "1" }, { "lit": "boards" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["description", "id", "layout_generation", "links", "name", "panels", "preset_filters", "tags", "type"], "co": { "id": "PUT /1/boards/{boardId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "boardId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/1/boards/{boardId}", "q": { "exist": ["id"] }, "r": { "param": { "boardId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "boards" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "board", "name__orig": "board", "Name": "Board", "name_": "board", "name-": "board", "NAME": "BOARD", "index$": 1 }, { "active": true, "entity": "board", "key$": "BasicBoardFlow", "kind": "basic", "name": "BasicBoardFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "board_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "board_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "board_ref01", "srcdatavar": "board_ref01_data", "suffix": "_up0", "textfield": "description" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-board_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "board_ref01", "srcdatavar": "board_ref01_data", "suffix": "_dt0" }, "m": { "id": "board01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-board_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "board_ref01", "suffix": "_rm0" }, "m": { "id": "board01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "board_ref01" } }], "index$": 5 }] }, 'Board', { "POST /1/boards": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "required": ["type", "name"], "properties": { "name": { "type": "string", "description": "The name of the Board.", "minLength": 1, "maxLength": 255, "example": "My Board", "key$": "name" }, "description": { "type": "string", "description": "A description of the Board.", "minLength": 0, "maxLength": 1024, "example": "A board created via the API", "key$": "description" }, "type": { "type": "string", "description": "The type of the board. Only flexible boards are supported.", "enum": ["flexible"], "x-ref": "#/components/schemas/BoardType", "key$": "type" }, "links": { "type": "object", "readOnly": true, "properties": { "board_url": { "type": "string", "example": "https://ui.honeycomb.io/myteam/environments/myenvironment/board/2NeeaE9bBLd" } }, "key$": "links" }, "id": { "type": "string", "readOnly": true, "description": "Unique identifier (ID), returned in response bodies.", "example": "2NeeaE9bBLd", "key$": "id" }, "panels": { "type": "array", "items": { "type": "object", "oneOf": [{ "title": "Query Panel", "type": "object", "required": [], "properties": {}, "x-ref": "#/components/schemas/QueryPanel" }, { "title": "SLO Panel", "type": "object", "required": [], "properties": {}, "x-ref": "#/components/schemas/SLOPanel" }, { "title": "Text Panel", "type": "object", "required": [], "properties": {}, "x-ref": "#/components/schemas/TextPanel" }], "discriminator": { "propertyName": "type", "mapping": { "query": "#/components/schemas/QueryPanel", "slo": "#/components/schemas/SLOPanel", "text": "#/components/schemas/TextPanel" } }, "x-ref": "#/components/schemas/BoardPanel" }, "key$": "panels" }, "layout_generation": { "type": "string", "description": "The layout generation mode for the board. When set to \"auto\", the board will be automatically laid out based on the panels. When set to \"manual\", the board will be laid out manually by the user.\n", "enum": ["auto", "manual"], "default": "manual", "writeOnly": true, "key$": "layout_generation" }, "tags": { "type": "array", "description": "A list of key-value pairs to help identify the Trigger.", "maxItems": 10, "items": { "type": "object", "required": ["key", "value"], "properties": { "key": { "type": "string", "description": "A key to identify the tag, lowercase letters only.", "maxLength": 32 }, "value": { "type": "string", "description": "A value for the tag, must begin with a lowercase letter, contain only alphanumeric characters (all letters lowercase) and special characters of `/` and `-` allowed.", "maxLength": 128 } }, "x-ref": "#/components/schemas/Tag" }, "example": [{ "key": "team", "value": "blue" }], "key$": "tags" }, "preset_filters": { "description": "A list of preset filters to apply to the board. For backwards compatibility, if no preset filters are provided, the existing preset filters will be preserved. If an empty array is provided, all preset filters will be deleted.\n**Note**: Each board is limited to a maximum of 5 preset filters. Attempting to create or update a board with more than 5 preset filters will result in an error.\n", "type": "array", "maxItems": 5, "items": { "type": "object", "required": ["column", "alias"], "properties": { "column": { "type": "string", "description": "Original name of the column to alias." }, "alias": { "type": "string", "description": "The alias of the preset filter. Maximum length is 50 characters." } }, "x-ref": "#/components/schemas/PresetFilter" }, "example": [{ "column": "app.Service", "alias": "Service" }], "key$": "preset_filters" } }, "x-ref": "#/components/schemas/Board", "index$": 1 }, "examples": { "Simple Flexible Board with Query and Text Panels": { "value": { "name": "My API Board", "description": "A board created via the API with mixed panel types", "type": "flexible", "panels": [{ "type": "query", "query_panel": { "query_id": "abc1234e", "query_annotation_id": "e4c24a35" }, "position": { "x_coordinate": 0, "y_coordinate": 0, "height": 6, "width": 8 } }, { "type": "text", "text_panel": { "content": "# Welcome to our API Dashboard\n\nThis board shows key metrics for our services." }, "position": { "x_coordinate": 8, "y_coordinate": 0, "height": 3, "width": 4 } }], "layout_generation": "manual", "tags": [{ "key": "team", "value": "backend" }, { "key": "environment", "value": "production" }] } }, "Auto-Layout Board with Multiple Panel Types": { "value": { "name": "Service Health Overview", "description": "Comprehensive service monitoring dashboard", "type": "flexible", "panels": [{ "type": "query", "query_panel": { "query_id": "def5678f", "query_annotation_id": "a1b2c3d4", "dataset": "frontend-logs" } }, { "type": "slo", "slo_panel": { "slo_id": "BGfyxhFto" } }, { "type": "text", "text_panel": { "content": "## Service Status\n\n⚠️ **Note**: All services are currently operational" } }], "layout_generation": "auto", "tags": [{ "key": "service", "value": "user-service" }] } } } } }, "required": true }, "parameters": [] }, "GET /1/boards": { "protocol": "http", "parameters": [] }, "GET /1/boards/{boardId}": { "protocol": "http", "parameters": [{ "name": "boardId", "description": "The unique identifier (ID) of a Board.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /1/boards/{boardId}/views/{viewId}": { "protocol": "http", "parameters": [{ "name": "boardId", "description": "The unique identifier (ID) of a Board.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "viewId", "description": "The unique identifier (ID) of a Board View.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /1/boards/{boardId}": { "protocol": "http", "parameters": [{ "name": "boardId", "description": "The unique identifier (ID) of a Board.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /1/boards/{boardId}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "required": ["type", "name"], "properties": { "name": { "type": "string", "description": "The name of the Board.", "minLength": 1, "maxLength": 255, "example": "My Board", "key$": "name" }, "description": { "type": "string", "description": "A description of the Board.", "minLength": 0, "maxLength": 1024, "example": "A board created via the API", "key$": "description" }, "type": { "type": "string", "description": "The type of the board. Only flexible boards are supported.", "enum": ["flexible"], "x-ref": "#/components/schemas/BoardType", "key$": "type" }, "links": { "type": "object", "readOnly": true, "properties": { "board_url": { "type": "string", "example": "https://ui.honeycomb.io/myteam/environments/myenvironment/board/2NeeaE9bBLd" } }, "key$": "links" }, "id": { "type": "string", "readOnly": true, "description": "Unique identifier (ID), returned in response bodies.", "example": "2NeeaE9bBLd", "key$": "id" }, "panels": { "type": "array", "items": { "type": "object", "oneOf": [{ "title": "Query Panel", "type": "object", "required": [], "properties": {}, "x-ref": "#/components/schemas/QueryPanel" }, { "title": "SLO Panel", "type": "object", "required": [], "properties": {}, "x-ref": "#/components/schemas/SLOPanel" }, { "title": "Text Panel", "type": "object", "required": [], "properties": {}, "x-ref": "#/components/schemas/TextPanel" }], "discriminator": { "propertyName": "type", "mapping": { "query": "#/components/schemas/QueryPanel", "slo": "#/components/schemas/SLOPanel", "text": "#/components/schemas/TextPanel" } }, "x-ref": "#/components/schemas/BoardPanel" }, "key$": "panels" }, "layout_generation": { "type": "string", "description": "The layout generation mode for the board. When set to \"auto\", the board will be automatically laid out based on the panels. When set to \"manual\", the board will be laid out manually by the user.\n", "enum": ["auto", "manual"], "default": "manual", "writeOnly": true, "key$": "layout_generation" }, "tags": { "type": "array", "description": "A list of key-value pairs to help identify the Trigger.", "maxItems": 10, "items": { "type": "object", "required": ["key", "value"], "properties": { "key": { "type": "string", "description": "A key to identify the tag, lowercase letters only.", "maxLength": 32 }, "value": { "type": "string", "description": "A value for the tag, must begin with a lowercase letter, contain only alphanumeric characters (all letters lowercase) and special characters of `/` and `-` allowed.", "maxLength": 128 } }, "x-ref": "#/components/schemas/Tag" }, "example": [{ "key": "team", "value": "blue" }], "key$": "tags" }, "preset_filters": { "description": "A list of preset filters to apply to the board. For backwards compatibility, if no preset filters are provided, the existing preset filters will be preserved. If an empty array is provided, all preset filters will be deleted.\n**Note**: Each board is limited to a maximum of 5 preset filters. Attempting to create or update a board with more than 5 preset filters will result in an error.\n", "type": "array", "maxItems": 5, "items": { "type": "object", "required": ["column", "alias"], "properties": { "column": { "type": "string", "description": "Original name of the column to alias." }, "alias": { "type": "string", "description": "The alias of the preset filter. Maximum length is 50 characters." } }, "x-ref": "#/components/schemas/PresetFilter" }, "example": [{ "column": "app.Service", "alias": "Service" }], "key$": "preset_filters" } }, "x-ref": "#/components/schemas/Board", "index$": 1 }, "examples": { "Add New Panel to Existing Board": { "value": { "id": "board456", "name": "Updated Production Dashboard", "description": "Production monitoring with additional SLO panel", "type": "flexible", "panels": [{ "type": "query", "query_panel": { "query_id": "cdef7890", "query_annotation_id": "h9i8j7k6" }, "position": { "x_coordinate": 0, "y_coordinate": 0, "height": 6, "width": 6 } }, { "type": "slo", "slo_panel": { "slo_id": "BGfyxhFto" }, "position": { "x_coordinate": 6, "y_coordinate": 0, "height": 6, "width": 6 } }, { "type": "text", "text_panel": { "content": "## Recent Changes\n\n- Added SLO monitoring\n- Updated query filters" }, "position": { "x_coordinate": 0, "y_coordinate": 6, "height": 3, "width": 12 } }], "layout_generation": "manual", "tags": [{ "key": "environment", "value": "production" }, { "key": "updated_by", "value": "api" }] } }, "Reorganize Panel Layout": { "value": { "id": "board789", "name": "Service Metrics Reorganized", "description": "Restructured layout for better visibility", "type": "flexible", "panels": [{ "type": "query", "query_panel": { "query_id": "ghij1234", "query_annotation_id": "i1j2k3l4", "dataset": "service-metrics" } }, { "type": "query", "query_panel": { "query_id": "klmn5678", "query_annotation_id": "j5k6l7m8", "dataset": "error-logs" } }, { "type": "text", "text_panel": { "content": "# Service Health Overview\n\nMonitoring key performance indicators" } }], "layout_generation": "auto", "tags": [{ "key": "team", "value": "backend" }] } } } } }, "required": true }, "parameters": [{ "name": "boardId", "description": "The unique identifier (ID) of a Board.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const board_ref01_ent = client.Board();
        let board_ref01_data = setup.data.new.board['board_ref01'];
        board_ref01_data = (await board_ref01_ent.create(board_ref01_data)).data();
        (0, node_assert_1.default)(null != board_ref01_data.id);
        // LIST
        const board_ref01_match = {};
        const board_ref01_list = (await board_ref01_ent.list(board_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(board_ref01_list, { id: board_ref01_data.id })));
        // UPDATE
        const board_ref01_data_up0 = {};
        board_ref01_data_up0.id = board_ref01_data.id;
        const board_ref01_markdef_up0 = { name: 'description', value: 'Mark01-board_ref01_' + setup.now };
        board_ref01_data_up0[board_ref01_markdef_up0.name] = board_ref01_markdef_up0.value;
        const board_ref01_resdata_up0 = (await board_ref01_ent.update(board_ref01_data_up0)).data();
        (0, node_assert_1.default)(board_ref01_resdata_up0.id === board_ref01_data_up0.id);
        (0, node_assert_1.default)(board_ref01_resdata_up0[board_ref01_markdef_up0.name] === board_ref01_markdef_up0.value);
        // LOAD
        const board_ref01_match_dt0 = {};
        board_ref01_match_dt0.id = board_ref01_data.id;
        const board_ref01_data_dt0 = (await board_ref01_ent.load(board_ref01_match_dt0)).data();
        (0, node_assert_1.default)(board_ref01_data_dt0.id === board_ref01_data.id);
        // REMOVE
        const board_ref01_match_rm0 = { id: board_ref01_data.id };
        await board_ref01_ent.remove(board_ref01_match_rm0);
        // LIST
        const board_ref01_match_rt0 = {};
        const board_ref01_list_rt0 = (await board_ref01_ent.list(board_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(board_ref01_list_rt0, { id: board_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/board/BoardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['board01', 'board02', 'board03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_BOARD_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_BOARD_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_BOARD_ENTID'];
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
//# sourceMappingURL=BoardEntity.test.js.map
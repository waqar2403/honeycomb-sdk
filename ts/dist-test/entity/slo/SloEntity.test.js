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
(0, node_test_1.describe)('SloEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.Slo();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Slo().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'slo.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "ro": true, "sh": "The ISO8601-formatted time when the SLO was created.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "dataset_slugs": { "a": true, "h": "Dataset Slugs", "n": "dataset_slugs", "r": false, "ro": true, "sh": "The dataset(s) the SLO will be evaluated against.", "t": "`$ARRAY`", "key$": "dataset_slugs", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "A nice description of the SLO's intent and context.", "t": "`$STRING`", "key$": "description", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "ro": true, "t": "`$STRING`", "key$": "id", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": true, "type": "`$STRING`" }, "load": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The name of the SLO.", "t": "`$STRING`", "key$": "name", "index$": 4 }, "reset_at": { "a": true, "fo": "date-time", "h": "Reset At", "n": "reset_at", "r": false, "ro": true, "sh": "The ISO8601-formatted time the SLO was last reset.", "t": "`$STRING`", "key$": "reset_at", "index$": 5 }, "sli": { "a": true, "h": "Sli", "n": "sli", "op": { "create": { "req": true, "type": "`$OBJECT`" }, "load": { "req": true, "type": "`$OBJECT`" }, "update": { "req": true, "type": "`$OBJECT`" } }, "r": false, "sh": "Reference to the [Calculated Field](/api/calculated-fields/) used as the indicator of event success.", "t": "`$OBJECT`", "key$": "sli", "index$": 6 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "A list of key-value pairs to help identify the SLO.", "t": "`$ARRAY`", "key$": "tags", "index$": 7 }, "target_per_million": { "a": true, "h": "Target Per Million", "n": "target_per_million", "op": { "create": { "req": true, "type": "`$INTEGER`" }, "load": { "req": true, "type": "`$INTEGER`" }, "update": { "req": true, "type": "`$INTEGER`" } }, "r": false, "sh": "The number of events out of one million (1,000,000) that you expected qualified events to succeed.", "t": "`$INTEGER`", "key$": "target_per_million", "index$": 8 }, "time_period_days": { "a": true, "h": "Time Period Days", "n": "time_period_days", "op": { "create": { "req": true, "type": "`$INTEGER`" }, "load": { "req": true, "type": "`$INTEGER`" }, "update": { "req": true, "type": "`$INTEGER`" } }, "r": false, "sh": "The time period, in days, over which the SLO will be evaluated.", "t": "`$INTEGER`", "key$": "time_period_days", "index$": 9 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "ro": true, "sh": "The ISO8601-formatted time when the SLO was updated.", "t": "`$STRING`", "key$": "updated_at", "index$": 10 } }, "id": { "field": "id", "name": "id", "parts": ["dataset_slug", "slo_id"], "sep": "/" }, "name": "slo", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["created_at", "dataset_slugs", "description", "id", "name", "reset_at", "sli", "tags", "target_per_million", "time_period_days", "updated_at"], "co": { "id": "POST /1/slos/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/1/slos/{datasetSlug}", "q": { "exist": ["id"] }, "r": { "param": { "datasetSlug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "slos" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /1/slos/{datasetSlug}/{sloId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "slo_id", "or": "sloId", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "ex": "", "k": "query", "n": "detailed", "or": "detailed", "r": false, "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/1/slos/{datasetSlug}/{sloId}", "q": { "exist": ["dataset_slug", "slo_id"] }, "r": { "param": { "datasetSlug": "dataset_slug", "sloId": "slo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "slos" }, { "var": "dataset_slug" }, { "var": "slo_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /1/slos/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/1/slos/{datasetSlug}", "q": { "exist": ["id"] }, "r": { "param": { "datasetSlug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "slos" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /1/slos/{datasetSlug}/{sloId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "slo_id", "or": "sloId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/1/slos/{datasetSlug}/{sloId}", "q": { "exist": ["dataset_slug", "slo_id"] }, "r": { "param": { "datasetSlug": "dataset_slug", "sloId": "slo_id" } }, "s": [{ "lit": "1" }, { "lit": "slos" }, { "var": "dataset_slug" }, { "var": "slo_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["created_at", "dataset_slugs", "description", "id", "name", "reset_at", "sli", "tags", "target_per_million", "time_period_days", "updated_at"], "co": { "id": "PUT /1/slos/{datasetSlug}/{sloId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "slo_id", "or": "sloId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/1/slos/{datasetSlug}/{sloId}", "q": { "exist": ["dataset_slug", "slo_id"] }, "r": { "param": { "datasetSlug": "dataset_slug", "sloId": "slo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "slos" }, { "var": "dataset_slug" }, { "var": "slo_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "slo", "name__orig": "slo", "Name": "Slo", "name_": "slo", "name-": "slo", "NAME": "SLO", "index$": 22 }, { "active": true, "entity": "slo", "key$": "BasicSloFlow", "kind": "basic", "name": "BasicSloFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "slo_ref01" }, "m": { "dataset_slug": "dataset_slug01" }, "o": "create", "s": [], "v": [], "unreachable": true }, { "a": false, "d": { "dataset_slug": "dataset_slug01" }, "i": { "ref": "slo_ref01", "srcdatavar": "slo_ref01_data", "suffix": "_up0", "textfield": "description" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-slo_ref01" } }], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "slo_ref01", "srcdatavar": "slo_ref01_data", "suffix": "_dt0" }, "m": { "id": "slo01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-slo_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "slo_ref01", "suffix": "_rm0" }, "m": { "dataset_slug": "dataset_slug01", "id": "slo01" }, "o": "remove", "s": [], "v": [], "unreachable": true }] }, 'Slo', { "POST /1/slos/{datasetSlug}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "required": ["name", "time_period_days", "target_per_million", "sli"], "properties": { "id": { "type": "string", "readOnly": true, "key$": "id" }, "name": { "type": "string", "description": "The name of the SLO.", "minLength": 1, "maxLength": 120, "example": "My SLO", "key$": "name" }, "description": { "type": "string", "description": "A nice description of the SLO's intent and context.", "minLength": 0, "maxLength": 1023, "example": "SLO to ensure requests succeed and are fast", "key$": "description" }, "sli": { "type": "object", "description": "Reference to the [Calculated Field (also called Derived Column)](/api/calculated-fields/) used as the indicator of event success.", "required": ["alias"], "properties": { "alias": { "type": "string", "description": "The alias of the Calculated Field (also called Derived Column).", "minLength": 1, "maxLength": 255 } }, "example": { "alias": "error_sli" }, "key$": "sli" }, "time_period_days": { "type": "integer", "description": "The time period, in days, over which the SLO will be evaluated.", "minimum": 1, "example": 30, "key$": "time_period_days" }, "target_per_million": { "type": "integer", "description": "The number of events out of one million (1,000,000) that you expected qualified events to succeed.", "minimum": 0, "maximum": 999999, "example": 990000, "key$": "target_per_million" }, "tags": { "type": "array", "description": "A list of key-value pairs to help identify the SLO.", "maxItems": 10, "items": { "type": "object", "required": ["key", "value"], "properties": { "key": { "type": "string", "description": "A key to identify the tag, lowercase letters only.", "maxLength": 32 }, "value": { "type": "string", "description": "A value for the tag, must begin with a lowercase letter, contain only alphanumeric characters (all letters lowercase) and special characters of `/` and `-` allowed.", "maxLength": 128 } }, "x-ref": "#/components/schemas/Tag" }, "example": [{ "key": "team", "value": "blue" }], "key$": "tags" }, "reset_at": { "type": ["null", "string"], "format": "date-time", "description": "The ISO8601-formatted time the SLO was last reset. The value will be `null` if the SLO has not yet been reset.", "readOnly": true, "example": "2022-011-11T09:53:04Z", "key$": "reset_at" }, "created_at": { "type": "string", "description": "The ISO8601-formatted time when the SLO was created.", "format": "date-time", "readOnly": true, "example": "2022-09-22T17:32:11Z", "key$": "created_at" }, "updated_at": { "type": "string", "format": "date-time", "description": "The ISO8601-formatted time when the SLO was updated.", "readOnly": true, "example": "2022-10-31T15:08:11Z", "key$": "updated_at" }, "dataset_slugs": { "type": "array", "description": "The dataset(s) the SLO will be evaluated against. Required if using `__all__` in the path.", "minItems": 1, "maxItems": 10, "example": ["mydataset1", "mydataset2"], "key$": "dataset_slugs" } }, "x-ref": "#/components/schemas/SLOCreate", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }] }, "GET /1/slos/{datasetSlug}/{sloId}": { "protocol": "http", "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }, { "name": "sloId", "description": "Unique identifier (ID) of the SLO.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "in": "query", "name": "detailed", "schema": { "type": "boolean" }, "description": "Allows SLO reporting data (`status`, `burn_rate`, `budget_remaining` and `compliance`) to be returned when retrieving a single SLO.\n\nThis feature is available as part of the [Honeycomb Enterprise plan](https://www.honeycomb.io/pricing/).\n\n**Note:** `burn_rate` is calculated based on the last 4 hours of data.\n", "required": false, "allowEmptyValue": true, "example": "", "index$": 2 }] }, "GET /1/slos/{datasetSlug}": { "protocol": "http", "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }] }, "DELETE /1/slos/{datasetSlug}/{sloId}": { "protocol": "http", "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }, { "name": "sloId", "description": "Unique identifier (ID) of the SLO.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /1/slos/{datasetSlug}/{sloId}": { "protocol": "http", "requestBody": { "description": "Partial updates are not supported.\n", "content": { "application/json": { "schema": { "type": "object", "required": ["name", "time_period_days", "target_per_million", "sli"], "properties": { "id": { "type": "string", "readOnly": true, "key$": "id" }, "name": { "type": "string", "description": "The name of the SLO.", "minLength": 1, "maxLength": 120, "example": "My SLO", "key$": "name" }, "description": { "type": "string", "description": "A nice description of the SLO's intent and context.", "minLength": 0, "maxLength": 1023, "example": "SLO to ensure requests succeed and are fast", "key$": "description" }, "sli": { "type": "object", "description": "Reference to the [Calculated Field](/api/calculated-fields/) used as the indicator of event success.", "required": ["alias"], "properties": { "alias": { "type": "string", "description": "The alias of the Calculated Field (also called Derived Column).", "minLength": 1, "maxLength": 255 } }, "example": { "alias": "error_sli" }, "key$": "sli" }, "time_period_days": { "type": "integer", "description": "The time period, in days, over which the SLO will be evaluated.", "minimum": 1, "example": 30, "key$": "time_period_days" }, "target_per_million": { "type": "integer", "description": "The number of events out of one million (1,000,000) that you expected qualified events to succeed.", "minimum": 0, "maximum": 999999, "example": 990000, "key$": "target_per_million" }, "tags": { "type": "array", "description": "A list of key-value pairs to help identify the SLO.", "maxItems": 10, "items": { "type": "object", "required": ["key", "value"], "properties": { "key": { "type": "string", "description": "A key to identify the tag, lowercase letters only.", "maxLength": 32 }, "value": { "type": "string", "description": "A value for the tag, must begin with a lowercase letter, contain only alphanumeric characters (all letters lowercase) and special characters of `/` and `-` allowed.", "maxLength": 128 } }, "x-ref": "#/components/schemas/Tag" }, "example": [{ "key": "team", "value": "blue" }], "key$": "tags" }, "reset_at": { "type": ["null", "string"], "format": "date-time", "description": "The ISO8601-formatted time the SLO was last reset. The value will be `null` if the SLO has not yet been reset.", "readOnly": true, "example": "2022-011-11T09:53:04Z", "key$": "reset_at" }, "created_at": { "type": "string", "description": "The ISO8601-formatted time when the SLO was created.", "format": "date-time", "readOnly": true, "example": "2022-09-22T17:32:11Z", "key$": "created_at" }, "updated_at": { "type": "string", "format": "date-time", "description": "The ISO8601-formatted time when the SLO was updated.", "readOnly": true, "example": "2022-10-31T15:08:11Z", "key$": "updated_at" }, "dataset_slugs": { "type": "array", "description": "The dataset(s) the SLO will be evaluated against. Required if using `__all__` in the path.", "readOnly": true, "minItems": 1, "maxItems": 10, "example": ["mydataset1", "mydataset2"], "key$": "dataset_slugs" } }, "x-ref": "#/components/schemas/SLO", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }, { "name": "sloId", "description": "Unique identifier (ID) of the SLO.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let slo_ref01_data = Object.values(setup.data.existing.slo)[0];
        // LOAD
        const slo_ref01_ent = client.Slo();
        const slo_ref01_match_dt0 = {};
        slo_ref01_match_dt0.id = slo_ref01_data.id;
        const slo_ref01_data_dt0 = (await slo_ref01_ent.load(slo_ref01_match_dt0)).data();
        (0, node_assert_1.default)(slo_ref01_data_dt0.id === slo_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/slo/SloTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['slo01', 'slo02', 'slo03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_SLO_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_SLO_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_SLO_ENTID'];
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
//# sourceMappingURL=SloEntity.test.js.map
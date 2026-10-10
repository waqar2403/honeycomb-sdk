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
(0, node_test_1.describe)('DatasetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.Dataset();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('dataset hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.HoneycombSDK.test(offline).Dataset().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.HoneycombSDK.test(offline).Dataset()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.HoneycombSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Dataset().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.HoneycombSDK.test().Dataset().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.HoneycombSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Dataset().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Dataset().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Dataset().list({ "created_at": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'dataset.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "ro": true, "sh": "The ISO8601-formatted time when the dataset was created.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "dataset_type": { "a": true, "h": "Dataset Type", "n": "dataset_type", "r": false, "ro": true, "sh": "The type of data contained in the dataset.", "t": "`$STRING`", "key$": "dataset_type", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "op": { "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "A description for the dataset.", "t": "`$STRING`", "key$": "description", "index$": 2 }, "expand_json_depth": { "a": true, "h": "Expand Json Depth", "n": "expand_json_depth", "op": { "update": { "req": true, "type": "`$INTEGER`" } }, "r": false, "sh": "The maximum unpacking depth of nested JSON fields.", "t": "`$INTEGER`", "key$": "expand_json_depth", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 4 }, "last_written_at": { "a": true, "h": "Last Written At", "n": "last_written_at", "r": false, "ro": true, "sh": "The ISO8601-formatted time when the dataset last received event data.", "t": ["`$ONE`", ["`$NULL`", "`$STRING`"]], "key$": "last_written_at", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "The name of the dataset.", "t": "`$STRING`", "key$": "name", "index$": 6 }, "regular_columns_count": { "a": true, "h": "Regular Columns Count", "n": "regular_columns_count", "r": false, "ro": true, "sh": "The total number of unique fields for this Dataset.", "t": ["`$ONE`", ["`$NULL`", "`$INTEGER`"]], "key$": "regular_columns_count", "index$": 7 }, "settings": { "a": true, "h": "Settings", "n": "settings", "r": false, "t": "`$OBJECT`", "key$": "settings", "index$": 8 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": false, "ro": true, "sh": "The 'slug' of the dataset to be used in URLs.", "t": "`$STRING`", "key$": "slug", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "dataset", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["description", "expand_json_depth", "name"], "co": { "id": "POST /1/datasets", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/1/datasets", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "datasets" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /1/datasets", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/1/datasets", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "datasets" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /1/datasets/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/1/datasets/{datasetSlug}", "q": { "exist": ["id"] }, "r": { "param": { "datasetSlug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "datasets" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /1/datasets/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/1/datasets/{datasetSlug}", "q": { "exist": ["id"] }, "r": { "param": { "datasetSlug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "datasets" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["description", "expand_json_depth", "settings"], "co": { "id": "PUT /1/datasets/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/1/datasets/{datasetSlug}", "q": { "exist": ["id"] }, "r": { "param": { "datasetSlug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "datasets" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "dataset", "name__orig": "dataset", "Name": "Dataset", "name_": "dataset", "name-": "dataset", "NAME": "DATASET", "index$": 8 }, { "active": true, "entity": "dataset", "key$": "BasicDatasetFlow", "kind": "basic", "name": "BasicDatasetFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "dataset_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "dataset_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "dataset_ref01", "srcdatavar": "dataset_ref01_data", "suffix": "_up0", "textfield": "description" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-dataset_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "dataset_ref01", "srcdatavar": "dataset_ref01_data", "suffix": "_dt0" }, "m": { "id": "dataset01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-dataset_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "dataset_ref01", "suffix": "_rm0" }, "m": { "id": "dataset01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "dataset_ref01" } }], "index$": 5 }] }, 'Dataset', { "POST /1/datasets": { "protocol": "http", "requestBody": { "description": "The dataset will be created within the environment associated with your API key.\n", "content": { "application/json": { "schema": { "type": "object", "description": "an object to send to the Dataset API via PUT", "required": ["name"], "properties": { "name": { "type": "string", "description": "The name of the dataset.", "minLength": 1, "maxLength": 255, "key$": "name" }, "description": { "type": "string", "default": "", "description": "A description for the dataset.", "example": "A nice description of my dataset", "minLength": 0, "maxLength": 1024, "key$": "description" }, "expand_json_depth": { "type": "integer", "description": "The maximum unpacking depth of nested JSON fields.", "example": 3, "default": 0, "minimum": 0, "maximum": 10, "key$": "expand_json_depth" } }, "x-ref": "#/components/schemas/DatasetCreationPayload", "index$": 1 } } }, "required": true }, "parameters": [] }, "GET /1/datasets": { "protocol": "http", "parameters": [] }, "GET /1/datasets/{datasetSlug}": { "protocol": "http", "parameters": [{ "name": "datasetSlug", "description": "The dataset slug.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlug", "index$": 0 }] }, "DELETE /1/datasets/{datasetSlug}": { "protocol": "http", "parameters": [{ "name": "datasetSlug", "description": "The dataset slug.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlug", "index$": 0 }] }, "PUT /1/datasets/{datasetSlug}": { "protocol": "http", "requestBody": { "description": "Update a Dataset's settings.\nAll fields must be specified, as omitting one will have the effect of reverting the setting to the default.\n", "content": { "application/json": { "schema": { "type": "object", "description": "an object to send to the Dataset API via PUT", "required": ["description", "expand_json_depth"], "properties": { "description": { "type": "string", "default": "", "description": "A description for the dataset.", "example": "A nice description of my dataset", "minLength": 0, "maxLength": 1024, "key$": "description" }, "expand_json_depth": { "type": "integer", "description": "The maximum unpacking depth of nested JSON fields.", "example": 3, "default": 0, "minimum": 0, "maximum": 10, "key$": "expand_json_depth" }, "settings": { "type": "object", "properties": { "delete_protected": { "type": "boolean", "description": "If true, the dataset cannot be deleted." } }, "key$": "settings" } }, "x-ref": "#/components/schemas/DatasetUpdatePayload", "index$": 1 }, "example": { "expand_json_depth": 3, "description": "my updated description", "settings": { "delete_protected": false } } } } }, "parameters": [{ "name": "datasetSlug", "description": "The dataset slug.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlug", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const dataset_ref01_ent = client.Dataset();
        let dataset_ref01_data = setup.data.new.dataset['dataset_ref01'];
        dataset_ref01_data = (await dataset_ref01_ent.create(dataset_ref01_data)).data();
        (0, node_assert_1.default)(null != dataset_ref01_data.id);
        // LIST
        const dataset_ref01_match = {};
        const dataset_ref01_list = (await dataset_ref01_ent.list(dataset_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(dataset_ref01_list, { id: dataset_ref01_data.id })));
        // UPDATE
        const dataset_ref01_data_up0 = {};
        dataset_ref01_data_up0.id = dataset_ref01_data.id;
        const dataset_ref01_markdef_up0 = { name: 'description', value: 'Mark01-dataset_ref01_' + setup.now };
        dataset_ref01_data_up0[dataset_ref01_markdef_up0.name] = dataset_ref01_markdef_up0.value;
        const dataset_ref01_resdata_up0 = (await dataset_ref01_ent.update(dataset_ref01_data_up0)).data();
        (0, node_assert_1.default)(dataset_ref01_resdata_up0.id === dataset_ref01_data_up0.id);
        (0, node_assert_1.default)(dataset_ref01_resdata_up0[dataset_ref01_markdef_up0.name] === dataset_ref01_markdef_up0.value);
        // LOAD
        const dataset_ref01_match_dt0 = {};
        dataset_ref01_match_dt0.id = dataset_ref01_data.id;
        const dataset_ref01_data_dt0 = (await dataset_ref01_ent.load(dataset_ref01_match_dt0)).data();
        (0, node_assert_1.default)(dataset_ref01_data_dt0.id === dataset_ref01_data.id);
        // REMOVE
        const dataset_ref01_match_rm0 = { id: dataset_ref01_data.id };
        await dataset_ref01_ent.remove(dataset_ref01_match_rm0);
        // LIST
        const dataset_ref01_match_rt0 = {};
        const dataset_ref01_list_rt0 = (await dataset_ref01_ent.list(dataset_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(dataset_ref01_list_rt0, { id: dataset_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/dataset/DatasetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['dataset01', 'dataset02', 'dataset03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_DATASET_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_DATASET_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_DATASET_ENTID'];
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
//# sourceMappingURL=DatasetEntity.test.js.map
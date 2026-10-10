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
(0, node_test_1.describe)('MarkerSettingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.MarkerSetting();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.MarkerSetting().list({ "dataset_slug": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'marker_setting.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "color": { "a": true, "h": "Color", "n": "color", "r": true, "sh": "Color to use for display of this marker type.", "t": "`$STRING`", "key$": "color", "index$": 0 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "ro": true, "sh": "The ISO8601-formatted time when the Marker Setting was created.", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "ro": true, "sh": "The unique identifier (ID) for the Marker Setting.", "t": "`$STRING`", "key$": "id", "index$": 2 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "sh": "Groups similar Markers.", "t": "`$STRING`", "key$": "type", "index$": 3 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": false, "ro": true, "sh": "The ISO8601-formatted time when the Marker Setting was updated.", "t": ["`$ONE`", ["`$NULL`", "`$STRING`"]], "key$": "updated_at", "index$": 4 } }, "id": { "field": "id", "from": { "id": "id" }, "name": "id", "parts": ["dataset_slug", "id"], "sep": "/" }, "name": "marker_setting", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["color", "created_at", "id", "type", "updated_at"], "co": { "id": "POST /1/marker_settings/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/1/marker_settings/{datasetSlug}", "q": { "exist": ["dataset_slug"] }, "r": { "param": { "datasetSlug": "dataset_slug" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "marker_settings" }, { "var": "dataset_slug" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /1/marker_settings/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/1/marker_settings/{datasetSlug}", "q": { "exist": ["dataset_slug"] }, "r": { "param": { "datasetSlug": "dataset_slug" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "marker_settings" }, { "var": "dataset_slug" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /1/marker_settings/{datasetSlug}/{markerSettingId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "markerSettingId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/1/marker_settings/{datasetSlug}/{markerSettingId}", "q": { "exist": ["dataset_slug", "id"] }, "r": { "param": { "datasetSlug": "dataset_slug", "markerSettingId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "marker_settings" }, { "var": "dataset_slug" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["color", "created_at", "id", "type", "updated_at"], "co": { "id": "PUT /1/marker_settings/{datasetSlug}/{markerSettingId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "markerSettingId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/1/marker_settings/{datasetSlug}/{markerSettingId}", "q": { "exist": ["dataset_slug", "id"] }, "r": { "param": { "datasetSlug": "dataset_slug", "markerSettingId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "marker_settings" }, { "var": "dataset_slug" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "marker_setting", "name__orig": "marker_setting", "Name": "MarkerSetting", "name_": "marker_setting", "name-": "marker-setting", "NAME": "MARKER_SETTING", "index$": 17 }, { "active": true, "entity": "marker_setting", "key$": "BasicMarkerSettingFlow", "kind": "basic", "name": "BasicMarkerSettingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "marker_setting_ref01" }, "m": { "dataset_slug": "dataset_slug01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "dataset_slug": "dataset_slug01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "marker_setting_ref01" } }], "index$": 1 }, { "a": true, "d": { "dataset_slug": "dataset_slug01" }, "i": { "ref": "marker_setting_ref01", "srcdatavar": "marker_setting_ref01_data", "suffix": "_up0", "textfield": "color" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-marker_setting_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "marker_setting_ref01", "suffix": "_rm0" }, "m": { "dataset_slug": "dataset_slug01", "id": "marker_setting01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "dataset_slug": "dataset_slug01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "marker_setting_ref01" } }], "index$": 4 }] }, 'MarkerSetting', { "POST /1/marker_settings/{datasetSlug}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "required": ["type", "color"], "properties": { "type": { "type": "string", "description": "Groups similar Markers. For example, 'deploys'. All Markers of the same type appears with the same color on the graph.\n", "example": "deploy", "key$": "type" }, "color": { "type": "string", "description": "Color to use for display of this marker type. Specified as hexadecimal RGB. For example, \"#F96E11\".\n", "example": "#7b1fa2", "key$": "color" }, "id": { "type": "string", "description": "The unique identifier (ID) for the Marker Setting.", "readOnly": true, "example": "gwAHiE5TS4j", "key$": "id" }, "created_at": { "type": "string", "description": "The ISO8601-formatted time when the Marker Setting was created.", "readOnly": true, "example": "2022-09-15T05:39:42Z", "key$": "created_at" }, "updated_at": { "type": ["null", "string"], "description": "The ISO8601-formatted time when the Marker Setting was updated.", "readOnly": true, "example": "2022-12-15T04:25:14Z", "key$": "updated_at" } }, "x-ref": "#/components/schemas/MarkerSetting", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }] }, "GET /1/marker_settings/{datasetSlug}": { "protocol": "http", "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }] }, "DELETE /1/marker_settings/{datasetSlug}/{markerSettingId}": { "protocol": "http", "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }, { "name": "markerSettingId", "description": "The unique identifier (ID) of a marker setting.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /1/marker_settings/{datasetSlug}/{markerSettingId}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "required": ["type", "color"], "properties": { "type": { "type": "string", "description": "Groups similar Markers. For example, 'deploys'. All Markers of the same type appears with the same color on the graph.\n", "example": "deploy", "key$": "type" }, "color": { "type": "string", "description": "Color to use for display of this marker type. Specified as hexadecimal RGB. For example, \"#F96E11\".\n", "example": "#7b1fa2", "key$": "color" }, "id": { "type": "string", "description": "The unique identifier (ID) for the Marker Setting.", "readOnly": true, "example": "gwAHiE5TS4j", "key$": "id" }, "created_at": { "type": "string", "description": "The ISO8601-formatted time when the Marker Setting was created.", "readOnly": true, "example": "2022-09-15T05:39:42Z", "key$": "created_at" }, "updated_at": { "type": ["null", "string"], "description": "The ISO8601-formatted time when the Marker Setting was updated.", "readOnly": true, "example": "2022-12-15T04:25:14Z", "key$": "updated_at" } }, "x-ref": "#/components/schemas/MarkerSetting", "index$": 1 }, "example": { "type": "deploy", "color": "#1fa297" } } }, "required": true }, "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }, { "name": "markerSettingId", "description": "The unique identifier (ID) of a marker setting.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const marker_setting_ref01_ent = client.MarkerSetting();
        let marker_setting_ref01_data = setup.data.new.marker_setting['marker_setting_ref01'];
        marker_setting_ref01_data['dataset_slug'] = setup.idmap['dataset_slug01'];
        marker_setting_ref01_data = (await marker_setting_ref01_ent.create(marker_setting_ref01_data)).data();
        (0, node_assert_1.default)(null != marker_setting_ref01_data.id);
        // LIST
        const marker_setting_ref01_match = {};
        marker_setting_ref01_match['dataset_slug'] = setup.idmap['dataset_slug01'];
        const marker_setting_ref01_list = (await marker_setting_ref01_ent.list(marker_setting_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(marker_setting_ref01_list, { id: marker_setting_ref01_data.id })));
        // UPDATE
        const marker_setting_ref01_data_up0 = {};
        marker_setting_ref01_data_up0.id = marker_setting_ref01_data.id;
        marker_setting_ref01_data_up0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01'];
        const marker_setting_ref01_markdef_up0 = { name: 'color', value: 'Mark01-marker_setting_ref01_' + setup.now };
        marker_setting_ref01_data_up0[marker_setting_ref01_markdef_up0.name] = marker_setting_ref01_markdef_up0.value;
        const marker_setting_ref01_resdata_up0 = (await marker_setting_ref01_ent.update(marker_setting_ref01_data_up0)).data();
        (0, node_assert_1.default)(marker_setting_ref01_resdata_up0.id === marker_setting_ref01_data_up0.id);
        (0, node_assert_1.default)(marker_setting_ref01_resdata_up0[marker_setting_ref01_markdef_up0.name] === marker_setting_ref01_markdef_up0.value);
        // REMOVE
        const marker_setting_ref01_match_rm0 = { id: marker_setting_ref01_data.id };
        marker_setting_ref01_match_rm0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01'];
        await marker_setting_ref01_ent.remove(marker_setting_ref01_match_rm0);
        // LIST
        const marker_setting_ref01_match_rt0 = {};
        marker_setting_ref01_match_rt0['dataset_slug'] = setup.idmap['dataset_slug01'];
        const marker_setting_ref01_list_rt0 = (await marker_setting_ref01_ent.list(marker_setting_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(marker_setting_ref01_list_rt0, { id: marker_setting_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/marker_setting/MarkerSettingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['marker_setting01', 'marker_setting02', 'marker_setting03', 'dataset_slug01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_MARKER_SETTING_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_MARKER_SETTING_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_MARKER_SETTING_ENTID'];
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
//# sourceMappingURL=MarkerSettingEntity.test.js.map
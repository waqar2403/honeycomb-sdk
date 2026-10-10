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
(0, node_test_1.describe)('ApiKeyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.ApiKey();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiKey().list({ "team_slug": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_key.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "data": { "a": true, "h": "Data", "n": "data", "r": true, "t": "`$OBJECT`", "key$": "data", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 1 } }, "id": { "field": "id", "name": "id" }, "name": "api_key", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["data"], "co": { "id": "POST /2/teams/{teamSlug}/api-keys", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "team_slug", "or": "teamSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/2/teams/{teamSlug}/api-keys", "q": { "exist": ["team_slug"] }, "r": { "param": { "teamSlug": "team_slug" } }, "rb": { "kind": "json", "media": "application/vnd.api+json" }, "rs": { "kind": "json", "media": "application/vnd.api+json" }, "s": [{ "lit": "2" }, { "lit": "teams" }, { "var": "team_slug" }, { "lit": "api-keys" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /2/teams/{teamSlug}/api-keys", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "team_slug", "or": "teamSlug", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "filter_type", "or": "filter[type]", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "eyxJjcmAVhdGVkX", "k": "query", "n": "page_after", "or": "page[after]", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 10, "k": "query", "n": "page_size", "or": "page[size]", "r": false, "t": "`$NUMBER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/2/teams/{teamSlug}/api-keys", "q": { "exist": ["team_slug"] }, "r": { "param": { "teamSlug": "team_slug" } }, "rs": { "kind": "json", "media": "application/vnd.api+json" }, "s": [{ "lit": "2" }, { "lit": "teams" }, { "var": "team_slug" }, { "lit": "api-keys" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /2/teams/{teamSlug}/api-keys/{ID}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "ID", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "team_slug", "or": "teamSlug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/2/teams/{teamSlug}/api-keys/{ID}", "q": { "exist": ["id", "team_slug"] }, "r": { "param": { "ID": "id", "teamSlug": "team_slug" } }, "rs": { "kind": "json", "media": "application/vnd.api+json" }, "s": [{ "lit": "2" }, { "lit": "teams" }, { "var": "team_slug" }, { "lit": "api-keys" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /2/teams/{teamSlug}/api-keys/{ID}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "ID", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "team_slug", "or": "teamSlug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/2/teams/{teamSlug}/api-keys/{ID}", "q": { "exist": ["id", "team_slug"] }, "r": { "param": { "ID": "id", "teamSlug": "team_slug" } }, "s": [{ "lit": "2" }, { "lit": "teams" }, { "var": "team_slug" }, { "lit": "api-keys" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["data"], "co": { "id": "PATCH /2/teams/{teamSlug}/api-keys/{ID}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "ID", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "team_slug", "or": "teamSlug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/2/teams/{teamSlug}/api-keys/{ID}", "q": { "exist": ["id", "team_slug"] }, "r": { "param": { "ID": "id", "teamSlug": "team_slug" } }, "rb": { "kind": "json", "media": "application/vnd.api+json" }, "rs": { "kind": "json", "media": "application/vnd.api+json" }, "s": [{ "lit": "2" }, { "lit": "teams" }, { "var": "team_slug" }, { "lit": "api-keys" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "api_key", "name__orig": "api_key", "Name": "ApiKey", "name_": "api_key", "name-": "api-key", "NAME": "API_KEY", "index$": 0 }, { "active": true, "entity": "api_key", "key$": "BasicApiKeyFlow", "kind": "basic", "name": "BasicApiKeyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "api_key_ref01" }, "m": { "team_slug": "team_slug01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "team_slug": "team_slug01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_key_ref01" } }], "index$": 1 }, { "a": true, "d": { "team_slug": "team_slug01" }, "i": { "ref": "api_key_ref01", "srcdatavar": "api_key_ref01_data", "suffix": "_up0" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_key_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "api_key_ref01", "srcdatavar": "api_key_ref01_data", "suffix": "_dt0" }, "m": { "id": "api_key01", "team_slug": "team_slug01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_key_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "api_key_ref01", "suffix": "_rm0" }, "m": { "id": "api_key01", "team_slug": "team_slug01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "team_slug": "team_slug01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "api_key_ref01" } }], "index$": 5 }] }, 'ApiKey', { "POST /2/teams/{teamSlug}/api-keys": { "protocol": "http", "requestBody": { "required": true, "content": { "application/vnd.api+json": { "schema": { "type": "object", "required": ["data"], "properties": { "data": { "type": "object", "required": ["type", "attributes", "relationships"], "properties": { "type": { "type": "string", "enum": ["api-keys"] }, "attributes": { "type": "object", "oneOf": [{}, {}], "discriminator": { "propertyName": "key_type", "mapping": {} }, "x-ref": "#/components/schemas/ApiKeyAttributes" }, "relationships": { "type": "object", "required": ["environment"], "properties": { "environment": {} } } }, "key$": "data" } }, "x-ref": "#/components/schemas/ApiKeyCreateRequest", "index$": 1 } } } }, "parameters": [{ "name": "teamSlug", "description": "The slug of the Team", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/teamSlug", "index$": 0 }] }, "GET /2/teams/{teamSlug}/api-keys": { "protocol": "http", "parameters": [{ "name": "teamSlug", "description": "The slug of the Team", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/teamSlug", "index$": 0 }, { "name": "page[after]", "description": "The string value of the `next` attribute from a previous result page.\nThe cursor value must be empty or omitted for the first request of a cursor-paginated query.\n", "in": "query", "schema": { "type": "string" }, "example": "eyxJjcmAVhdGVkX", "x-ref": "#/components/parameters/PaginationCursor", "index$": 1 }, { "name": "page[size]", "description": "The number of entries to include per response. Maximum value is 100.", "in": "query", "schema": { "type": "number", "minimum": 1, "maximum": 100, "default": 20 }, "example": 10, "x-ref": "#/components/parameters/PaginationSize", "index$": 2 }, { "name": "filter[type]", "in": "query", "schema": { "type": "string", "enum": ["configuration", "ingest"] }, "description": "Specifies the type of API key to return. This parameter accepts the following values:\n  - `ingest`: Returns only ingest API keys.\n  - `configuration`:  Returns only configuration API keys.\n\nThe endpoint will default to fetching all API keys regardless of type if this filter is omitted.\n", "required": false, "index$": 3 }] }, "GET /2/teams/{teamSlug}/api-keys/{ID}": { "protocol": "http", "parameters": [{ "name": "teamSlug", "description": "The slug of the Team", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/teamSlug", "index$": 0 }, { "name": "ID", "description": "A unique identifier", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/ID", "index$": 1 }] }, "DELETE /2/teams/{teamSlug}/api-keys/{ID}": { "protocol": "http", "parameters": [{ "name": "teamSlug", "description": "The slug of the Team", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/teamSlug", "index$": 0 }, { "name": "ID", "description": "A unique identifier", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/ID", "index$": 1 }] }, "PATCH /2/teams/{teamSlug}/api-keys/{ID}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/vnd.api+json": { "schema": { "type": "object", "required": ["data"], "properties": { "data": { "oneOf": [{ "type": "object", "title": "Ingest Key", "required": ["id", "type", "attributes"], "properties": { "id": {}, "type": {}, "attributes": {} }, "x-ref": "#/components/schemas/IngestKeyRequest" }, { "type": "object", "title": "Configuration Key", "required": ["id", "type", "attributes"], "properties": { "id": {}, "type": {}, "attributes": {} }, "x-ref": "#/components/schemas/ConfigurationKeyRequest" }], "key$": "data" } }, "x-ref": "#/components/schemas/ApiKeyUpdateRequest", "index$": 1 }, "examples": { "ingestKey": { "summary": "Update an Ingest Key", "value": { "data": { "id": "hcxik_12345678901234567890123456", "type": "api-keys", "attributes": { "name": "updated name", "disabled": false } } } }, "configurationKey": { "summary": "Update a Configuration Key", "value": { "data": { "id": "hcxlk_12345678901234567890123456", "type": "api-keys", "attributes": { "name": "updated name", "disabled": false, "permissions": { "create_datasets": true, "send_events": true, "manage_markers": true, "manage_triggers": true, "manage_boards": true, "run_queries": true, "manage_columns": true, "manage_slos": true, "manage_recipients": true, "manage_privateBoards": false, "read_service_maps": true, "visible_team_members": true } } } } } } } } }, "parameters": [{ "name": "teamSlug", "description": "The slug of the Team", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/teamSlug", "index$": 0 }, { "name": "ID", "description": "A unique identifier", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/ID", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const api_key_ref01_ent = client.ApiKey();
        let api_key_ref01_data = setup.data.new.api_key['api_key_ref01'];
        api_key_ref01_data['team_slug'] = setup.idmap['team_slug01'];
        api_key_ref01_data = (await api_key_ref01_ent.create(api_key_ref01_data)).data();
        (0, node_assert_1.default)(null != api_key_ref01_data.id);
        // LIST
        const api_key_ref01_match = {};
        api_key_ref01_match['team_slug'] = setup.idmap['team_slug01'];
        const api_key_ref01_list = (await api_key_ref01_ent.list(api_key_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(api_key_ref01_list, { id: api_key_ref01_data.id })));
        // UPDATE
        const api_key_ref01_data_up0 = {};
        api_key_ref01_data_up0.id = api_key_ref01_data.id;
        api_key_ref01_data_up0['team_slug'] = setup.idmap['team_slug'] ?? setup.idmap['team_slug01'];
        const api_key_ref01_resdata_up0 = (await api_key_ref01_ent.update(api_key_ref01_data_up0)).data();
        (0, node_assert_1.default)(api_key_ref01_resdata_up0.id === api_key_ref01_data_up0.id);
        // LOAD
        const api_key_ref01_match_dt0 = {};
        api_key_ref01_match_dt0.id = api_key_ref01_data.id;
        api_key_ref01_match_dt0['team_slug'] = setup.idmap['team_slug'] ?? setup.idmap['team_slug01'];
        const api_key_ref01_data_dt0 = (await api_key_ref01_ent.load(api_key_ref01_match_dt0)).data();
        (0, node_assert_1.default)(api_key_ref01_data_dt0.id === api_key_ref01_data.id);
        // REMOVE
        const api_key_ref01_match_rm0 = { id: api_key_ref01_data.id };
        api_key_ref01_match_rm0['team_slug'] = setup.idmap['team_slug'] ?? setup.idmap['team_slug01'];
        await api_key_ref01_ent.remove(api_key_ref01_match_rm0);
        // LIST
        const api_key_ref01_match_rt0 = {};
        api_key_ref01_match_rt0['team_slug'] = setup.idmap['team_slug01'];
        const api_key_ref01_list_rt0 = (await api_key_ref01_ent.list(api_key_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(api_key_ref01_list_rt0, { id: api_key_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_key/ApiKeyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_key01', 'api_key02', 'api_key03', 'team_slug01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_API_KEY_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_API_KEY_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_API_KEY_ENTID'];
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
//# sourceMappingURL=ApiKeyEntity.test.js.map
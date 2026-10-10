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
(0, node_test_1.describe)('RecipientEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.Recipient();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('recipient hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.HoneycombSDK.test(offline).Recipient().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.HoneycombSDK.test(offline).Recipient()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.HoneycombSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Recipient().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.HoneycombSDK.test().Recipient().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.HoneycombSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Recipient().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Recipient().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Recipient().list({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'recipient.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "t": "`$STRING`", "key$": "type", "index$": 1 } }, "id": { "field": "id", "name": "id" }, "name": "recipient", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["created_at", "details", "id", "type", "updated_at"], "co": { "id": "POST /1/recipients", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/1/recipients", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "recipients" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /1/recipients", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/1/recipients", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "recipients" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /1/recipients/{recipientId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "recipientId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/1/recipients/{recipientId}", "q": { "exist": ["id"] }, "r": { "param": { "recipientId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "recipients" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /1/recipients/{recipientId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "recipientId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/1/recipients/{recipientId}", "q": { "exist": ["id"] }, "r": { "param": { "recipientId": "id" } }, "s": [{ "lit": "1" }, { "lit": "recipients" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["created_at", "details", "id", "type", "updated_at"], "co": { "id": "PUT /1/recipients/{recipientId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "recipientId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/1/recipients/{recipientId}", "q": { "exist": ["id"] }, "r": { "param": { "recipientId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "recipients" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "recipient", "name__orig": "recipient", "Name": "Recipient", "name_": "recipient", "name-": "recipient", "NAME": "RECIPIENT", "index$": 21 }, { "active": true, "entity": "recipient", "key$": "BasicRecipientFlow", "kind": "basic", "name": "BasicRecipientFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "recipient_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "recipient_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "recipient_ref01", "srcdatavar": "recipient_ref01_data", "suffix": "_up0", "textfield": "type" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-recipient_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "recipient_ref01", "srcdatavar": "recipient_ref01_data", "suffix": "_dt0" }, "m": { "id": "recipient01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-recipient_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "recipient_ref01", "suffix": "_rm0" }, "m": { "id": "recipient01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "recipient_ref01" } }], "index$": 5 }] }, 'Recipient', { "POST /1/recipients": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "required": ["type"], "properties": { "type": { "type": "string", "key$": "type" } }, "discriminator": { "propertyName": "type", "mapping": { "pagerduty": "#/components/schemas/PagerDutyRecipient", "email": "#/components/schemas/EmailRecipient", "slack": "#/components/schemas/SlackRecipient", "webhook": "#/components/schemas/WebhookRecipient", "msteams": "#/components/schemas/MSTeamsRecipient", "msteams_workflow": "#/components/schemas/MSTeamsWorkflowRecipient" } }, "oneOf": [{ "allOf": [{ "type": "object", "properties": { "id": {}, "created_at": {}, "updated_at": {}, "type": {} }, "x-ref": "#/components/schemas/RecipientProperties" }, { "type": "object", "properties": { "type": {} } }, { "type": "object", "properties": { "details": {} } }], "x-ref": "#/components/schemas/PagerDutyRecipient" }, { "allOf": [{ "type": "object", "properties": { "id": {}, "created_at": {}, "updated_at": {}, "type": {} }, "x-ref": "#/components/schemas/RecipientProperties" }, { "type": "object", "properties": { "type": {} } }, { "type": "object", "properties": { "details": {} } }], "x-ref": "#/components/schemas/EmailRecipient" }, { "allOf": [{ "type": "object", "properties": { "id": {}, "created_at": {}, "updated_at": {}, "type": {} }, "x-ref": "#/components/schemas/RecipientProperties" }, { "type": "object", "properties": { "type": {} } }, { "type": "object", "properties": { "details": {} } }], "x-ref": "#/components/schemas/SlackRecipient" }, { "allOf": [{ "type": "object", "properties": { "id": {}, "created_at": {}, "updated_at": {}, "type": {} }, "x-ref": "#/components/schemas/RecipientProperties" }, { "type": "object", "properties": { "type": {} } }, { "type": "object", "properties": { "details": {} } }], "x-ref": "#/components/schemas/WebhookRecipient" }, { "allOf": [{ "type": "object", "properties": { "id": {}, "created_at": {}, "updated_at": {}, "type": {} }, "x-ref": "#/components/schemas/RecipientProperties" }, { "type": "object", "properties": { "type": {} } }, { "type": "object", "deprecated": true, "properties": { "details": {} } }], "x-ref": "#/components/schemas/MSTeamsRecipient" }, { "allOf": [{ "type": "object", "properties": { "id": {}, "created_at": {}, "updated_at": {}, "type": {} }, "x-ref": "#/components/schemas/RecipientProperties" }, { "type": "object", "properties": { "type": {} } }, { "type": "object", "properties": { "details": {} } }], "x-ref": "#/components/schemas/MSTeamsWorkflowRecipient" }], "x-ref": "#/components/schemas/Recipient", "index$": 1 } } }, "required": true }, "parameters": [] }, "GET /1/recipients": { "protocol": "http", "parameters": [] }, "GET /1/recipients/{recipientId}": { "protocol": "http", "parameters": [{ "name": "recipientId", "description": "Unique identifier (ID) of a Recipient.", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/recipientId", "index$": 0 }] }, "DELETE /1/recipients/{recipientId}": { "protocol": "http", "parameters": [{ "name": "recipientId", "description": "Unique identifier (ID) of a Recipient.", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/recipientId", "index$": 0 }] }, "PUT /1/recipients/{recipientId}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "required": ["type"], "properties": { "type": { "type": "string", "key$": "type" } }, "discriminator": { "propertyName": "type", "mapping": { "pagerduty": "#/components/schemas/PagerDutyRecipient", "email": "#/components/schemas/EmailRecipient", "slack": "#/components/schemas/SlackRecipient", "webhook": "#/components/schemas/WebhookRecipient", "msteams": "#/components/schemas/MSTeamsRecipient", "msteams_workflow": "#/components/schemas/MSTeamsWorkflowRecipient" } }, "oneOf": [{ "allOf": [{ "type": "object", "properties": { "id": {}, "created_at": {}, "updated_at": {}, "type": {} }, "x-ref": "#/components/schemas/RecipientProperties" }, { "type": "object", "properties": { "type": {} } }, { "type": "object", "properties": { "details": {} } }], "x-ref": "#/components/schemas/PagerDutyRecipient" }, { "allOf": [{ "type": "object", "properties": { "id": {}, "created_at": {}, "updated_at": {}, "type": {} }, "x-ref": "#/components/schemas/RecipientProperties" }, { "type": "object", "properties": { "type": {} } }, { "type": "object", "properties": { "details": {} } }], "x-ref": "#/components/schemas/EmailRecipient" }, { "allOf": [{ "type": "object", "properties": { "id": {}, "created_at": {}, "updated_at": {}, "type": {} }, "x-ref": "#/components/schemas/RecipientProperties" }, { "type": "object", "properties": { "type": {} } }, { "type": "object", "properties": { "details": {} } }], "x-ref": "#/components/schemas/SlackRecipient" }, { "allOf": [{ "type": "object", "properties": { "id": {}, "created_at": {}, "updated_at": {}, "type": {} }, "x-ref": "#/components/schemas/RecipientProperties" }, { "type": "object", "properties": { "type": {} } }, { "type": "object", "properties": { "details": {} } }], "x-ref": "#/components/schemas/WebhookRecipient" }, { "allOf": [{ "type": "object", "properties": { "id": {}, "created_at": {}, "updated_at": {}, "type": {} }, "x-ref": "#/components/schemas/RecipientProperties" }, { "type": "object", "properties": { "type": {} } }, { "type": "object", "deprecated": true, "properties": { "details": {} } }], "x-ref": "#/components/schemas/MSTeamsRecipient" }, { "allOf": [{ "type": "object", "properties": { "id": {}, "created_at": {}, "updated_at": {}, "type": {} }, "x-ref": "#/components/schemas/RecipientProperties" }, { "type": "object", "properties": { "type": {} } }, { "type": "object", "properties": { "details": {} } }], "x-ref": "#/components/schemas/MSTeamsWorkflowRecipient" }], "x-ref": "#/components/schemas/Recipient", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "recipientId", "description": "Unique identifier (ID) of a Recipient.", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/recipientId", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const recipient_ref01_ent = client.Recipient();
        let recipient_ref01_data = setup.data.new.recipient['recipient_ref01'];
        recipient_ref01_data = (await recipient_ref01_ent.create(recipient_ref01_data)).data();
        (0, node_assert_1.default)(null != recipient_ref01_data.id);
        // LIST
        const recipient_ref01_match = {};
        const recipient_ref01_list = (await recipient_ref01_ent.list(recipient_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(recipient_ref01_list, { id: recipient_ref01_data.id })));
        // UPDATE
        const recipient_ref01_data_up0 = {};
        recipient_ref01_data_up0.id = recipient_ref01_data.id;
        const recipient_ref01_markdef_up0 = { name: 'type', value: 'Mark01-recipient_ref01_' + setup.now };
        recipient_ref01_data_up0[recipient_ref01_markdef_up0.name] = recipient_ref01_markdef_up0.value;
        const recipient_ref01_resdata_up0 = (await recipient_ref01_ent.update(recipient_ref01_data_up0)).data();
        (0, node_assert_1.default)(recipient_ref01_resdata_up0.id === recipient_ref01_data_up0.id);
        (0, node_assert_1.default)(recipient_ref01_resdata_up0[recipient_ref01_markdef_up0.name] === recipient_ref01_markdef_up0.value);
        // LOAD
        const recipient_ref01_match_dt0 = {};
        recipient_ref01_match_dt0.id = recipient_ref01_data.id;
        const recipient_ref01_data_dt0 = (await recipient_ref01_ent.load(recipient_ref01_match_dt0)).data();
        (0, node_assert_1.default)(recipient_ref01_data_dt0.id === recipient_ref01_data.id);
        // REMOVE
        const recipient_ref01_match_rm0 = { id: recipient_ref01_data.id };
        await recipient_ref01_ent.remove(recipient_ref01_match_rm0);
        // LIST
        const recipient_ref01_match_rt0 = {};
        const recipient_ref01_list_rt0 = (await recipient_ref01_ent.list(recipient_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(recipient_ref01_list_rt0, { id: recipient_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/recipient/RecipientTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['recipient01', 'recipient02', 'recipient03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_RECIPIENT_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_RECIPIENT_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_RECIPIENT_ENTID'];
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
//# sourceMappingURL=RecipientEntity.test.js.map
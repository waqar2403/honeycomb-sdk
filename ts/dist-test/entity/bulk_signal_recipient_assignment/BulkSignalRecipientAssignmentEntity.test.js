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
(0, node_test_1.describe)('BulkSignalRecipientAssignmentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.BulkSignalRecipientAssignment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'bulk_signal_recipient_assignment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "failed": { "a": true, "h": "Failed", "n": "failed", "r": true, "sh": "The Signals that were not updated, each with the reason.", "t": "`$ARRAY`", "key$": "failed", "index$": 0 }, "recipients": { "a": true, "h": "Recipients", "n": "recipients", "r": true, "sh": "The Recipients to assign to every selected Signal.", "t": "`$ARRAY`", "key$": "recipients", "index$": 1 }, "selector": { "a": true, "h": "Selector", "n": "selector", "r": true, "sh": "Chooses which Signals to act on.", "t": "`$OBJECT`", "key$": "selector", "index$": 2 }, "succeeded": { "a": true, "h": "Succeeded", "n": "succeeded", "r": true, "sh": "The Signals whose Recipient set was updated.", "t": "`$ARRAY`", "key$": "succeeded", "index$": 3 }, "unchanged": { "a": true, "h": "Unchanged", "n": "unchanged", "r": true, "sh": "The Signals that already had every requested Recipient.", "t": "`$ARRAY`", "key$": "unchanged", "index$": 4 } }, "name": "bulk_signal_recipient_assignment", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["recipients", "selector"], "co": { "id": "POST /1/signals/recipient_assignments", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/1/signals/recipient_assignments", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "signals" }, { "lit": "recipient_assignments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "bulk_signal_recipient_assignment", "name__orig": "bulk_signal_recipient_assignment", "Name": "BulkSignalRecipientAssignment", "name_": "bulk_signal_recipient_assignment", "name-": "bulk-signal-recipient-assignment", "NAME": "BULK_SIGNAL_RECIPIENT_ASSIGNMENT", "index$": 3 }, { "active": true, "entity": "bulk_signal_recipient_assignment", "key$": "BasicBulkSignalRecipientAssignmentFlow", "kind": "basic", "name": "BasicBulkSignalRecipientAssignmentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "bulk_signal_recipient_assignment_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'BulkSignalRecipientAssignment', { "POST /1/signals/recipient_assignments": { "protocol": "http", "requestBody": { "description": "The Signals to update and the Recipients to assign to them.", "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "Select the Signals with `selector.signal_ids`, using IDs from [List All Signals](/api/signals/list/).\n- Problems with the `recipients` list will reject the whole request before anything is written.\n- One bad Signal ID does not discard the batch.\n- Recipients are added to each Signal's existing set. A Recipient the Signal already has is skipped, and left untouched.", "required": ["selector", "recipients"], "properties": { "selector": { "type": "object", "description": "Chooses which Signals to act on.", "required": ["signal_ids"], "properties": { "signal_ids": { "type": "array", "description": "The IDs of the Signals to update.", "minItems": 1, "maxItems": 100, "items": { "type": "string" }, "example": ["hcaip_01jak3ymk8s5cpc2xz3q7d8v9r"] } }, "x-ref": "#/components/schemas/BulkSignalSelector", "key$": "selector" }, "recipients": { "type": "array", "description": "The Recipients to assign to every selected Signal. Each must be referenced by its `id` from the [Recipients API](/api/recipients/).\n", "minItems": 1, "maxItems": 10, "items": { "type": "object", "required": ["id"], "description": "A Recipient assigned to a Signal.", "properties": { "id": { "type": "string", "description": "The unique identifier of an existing Recipient. Create Recipients via the [Recipients API](/api/recipients/).", "example": "hcar_01jak3ymk8s5cpc2xz3q7d8v9r" }, "details": { "type": "object", "description": "Per-assignment settings for how this Recipient receives notifications for this Signal.", "properties": {} } }, "x-ref": "#/components/schemas/SignalRecipient" }, "key$": "recipients" } }, "x-ref": "#/components/schemas/BulkSignalRecipientAssignmentRequest", "index$": 1 } } } }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const bulk_signal_recipient_assignment_ref01_ent = client.BulkSignalRecipientAssignment();
        let bulk_signal_recipient_assignment_ref01_data = setup.data.new.bulk_signal_recipient_assignment['bulk_signal_recipient_assignment_ref01'];
        bulk_signal_recipient_assignment_ref01_data = (await bulk_signal_recipient_assignment_ref01_ent.create(bulk_signal_recipient_assignment_ref01_data)).data();
        (0, node_assert_1.default)(null != bulk_signal_recipient_assignment_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/bulk_signal_recipient_assignment/BulkSignalRecipientAssignmentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['bulk_signal_recipient_assignment01', 'bulk_signal_recipient_assignment02', 'bulk_signal_recipient_assignment03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_BULK_SIGNAL_RECIPIENT_ASSIGNMENT_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_BULK_SIGNAL_RECIPIENT_ASSIGNMENT_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_BULK_SIGNAL_RECIPIENT_ASSIGNMENT_ENTID'];
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
//# sourceMappingURL=BulkSignalRecipientAssignmentEntity.test.js.map
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
(0, node_test_1.describe)('DatasetDefinitionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.DatasetDefinition();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DatasetDefinition().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'dataset_definition.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "annotation_type": { "a": true, "h": "Annotation Type", "n": "annotation_type", "r": false, "sh": "Metadata: Annotation Type - The type of span annotation.", "t": "`$ANY`", "key$": "annotation_type", "index$": 0 }, "duration_ms": { "a": true, "h": "Duration Ms", "n": "duration_ms", "r": false, "sh": "Span Duration - How much time the span took, in milliseconds.", "t": "`$ANY`", "key$": "duration_ms", "index$": 1 }, "error": { "a": true, "h": "Error", "n": "error", "r": false, "sh": "Use a Boolean or String to indicate error.", "t": "`$ANY`", "key$": "error", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 3 }, "link_span_id": { "a": true, "h": "Link Span Id", "n": "link_span_id", "r": false, "sh": "Metadata: Link Span ID - Links let you tie traces and spans to one another.", "t": "`$STRING`", "key$": "link_span_id", "index$": 4 }, "link_trace_id": { "a": true, "h": "Link Trace Id", "n": "link_trace_id", "r": false, "sh": "Metadata: Link Trace ID - Links let you tie traces and spans to one another.", "t": "`$STRING`", "key$": "link_trace_id", "index$": 5 }, "log_message": { "a": true, "h": "Log Message", "n": "log_message", "r": false, "sh": "A value containing the log event message.", "t": "`$ANY`", "key$": "log_message", "index$": 6 }, "log_severity": { "a": true, "h": "Log Severity", "n": "log_severity", "r": false, "sh": "Severity level of the event (also known as log level).", "t": "`$ANY`", "key$": "log_severity", "index$": 7 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The name of the function or method where the span was created.", "t": "`$STRING`", "key$": "name", "index$": 8 }, "parent_id": { "a": true, "h": "Parent Id", "n": "parent_id", "r": false, "sh": "The Parent Span ID - The ID of this span's parent span, the call location the current span was called from.", "t": "`$STRING`", "key$": "parent_id", "index$": 9 }, "route": { "a": true, "h": "Route", "n": "route", "r": false, "sh": "The HTTP URL or equivalent route processed by the request.", "t": "`$ANY`", "key$": "route", "index$": 10 }, "service_name": { "a": true, "h": "Service Name", "n": "service_name", "r": false, "sh": "The name of the instrumented service.", "t": "`$ANY`", "key$": "service_name", "index$": 11 }, "span_id": { "a": true, "h": "Span Id", "n": "span_id", "r": false, "sh": "The unique identifier (ID) for each span.", "t": "`$STRING`", "key$": "span_id", "index$": 12 }, "span_kind": { "a": true, "h": "Span Kind", "n": "span_kind", "r": false, "sh": "Metadata: Kind - The kind of Span.", "t": "`$ANY`", "key$": "span_kind", "index$": 13 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Indicates the success, failure, or other status of a request.", "t": "`$ANY`", "key$": "status", "index$": 14 }, "trace_id": { "a": true, "h": "Trace Id", "n": "trace_id", "r": false, "sh": "The ID of the trace this span belongs to.", "t": "`$STRING`", "key$": "trace_id", "index$": 15 }, "user": { "a": true, "h": "User", "n": "user", "r": false, "sh": "The user making the request in the system.", "t": "`$ANY`", "key$": "user", "index$": 16 } }, "id": { "field": "id", "name": "id" }, "name": "dataset_definition", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /1/dataset_definitions/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/1/dataset_definitions/{datasetSlug}", "q": { "exist": ["id"] }, "r": { "param": { "datasetSlug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "dataset_definitions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["annotation_type", "duration_ms", "error", "link_span_id", "link_trace_id", "log_message", "log_severity", "name", "parent_id", "route", "service_name", "span_id", "span_kind", "status", "trace_id", "user"], "co": { "id": "PATCH /1/dataset_definitions/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/1/dataset_definitions/{datasetSlug}", "q": { "exist": ["id"] }, "r": { "param": { "datasetSlug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "dataset_definitions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "dataset_definition", "name__orig": "dataset_definition", "Name": "DatasetDefinition", "name_": "dataset_definition", "name-": "dataset-definition", "NAME": "DATASET_DEFINITION", "index$": 9 }, { "active": true, "entity": "dataset_definition", "key$": "BasicDatasetDefinitionFlow", "kind": "basic", "name": "BasicDatasetDefinitionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "dataset_definition_ref01", "srcdatavar": "dataset_definition_ref01_data", "suffix": "_up0", "textfield": "link_span_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-dataset_definition_ref01" } }], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "dataset_definition_ref01", "srcdatavar": "dataset_definition_ref01_data", "suffix": "_dt0" }, "m": { "id": "dataset_definition01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-dataset_definition_ref01" } }], "index$": 1 }] }, 'DatasetDefinition', { "GET /1/dataset_definitions/{datasetSlug}": { "protocol": "http", "parameters": [{ "name": "datasetSlug", "description": "The dataset slug.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlug", "index$": 0 }] }, "PATCH /1/dataset_definitions/{datasetSlug}": { "protocol": "http", "requestBody": { "description": "The PATCH payload takes a map of Dataset definition type to Dataset definition. Fields not defined in the request are not modified on the server.\n**Note**: In order to **CLEAR** a column of a Dataset definition set the column’s name field to an empty string.\n", "content": { "application/json": { "schema": { "type": "object", "description": "Dataset Definitions describe the fields with special meaning in the Dataset.\n", "properties": { "span_id": { "description": "The unique identifier (ID) for each span.", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "span_id" }, "trace_id": { "description": "The ID of the trace this span belongs to.", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "trace_id" }, "parent_id": { "description": "The Parent Span ID - The ID of this span's parent span, the call location the current span was called from.", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "parent_id" }, "name": { "description": "The name of the function or method where the span was created.", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "name" }, "service_name": { "description": "The name of the instrumented service.", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "service_name" }, "duration_ms": { "description": "Span Duration - How much time the span took, in milliseconds.", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "duration_ms" }, "span_kind": { "description": "Metadata: Kind - The kind of Span. For example, `client` or `server`. The use of this field to identify Span Events and Links is deprecated. Use the field Metadata: Annotation Type.", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "span_kind" }, "annotation_type": { "description": "Metadata: Annotation Type - The type of span annotation. For example, `span_event` or `link`. This lets Honeycomb visualize this type of event differently in a trace. Do not use this field for other purposes.", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "annotation_type" }, "link_span_id": { "description": "Metadata: Link Span ID - Links let you tie traces and spans to one another. The Link Span ID lets you link to a different span (when used with Link Trace ID).", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "link_span_id" }, "link_trace_id": { "description": "Metadata: Link Trace ID - Links let you tie traces and spans to one another. The Link Trace Id lets you link to a different trace or a different span in the same trace (when used with Link Span ID).", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "link_trace_id" }, "error": { "description": "Use a Boolean or String to indicate error.", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "error" }, "status": { "description": "Indicates the success, failure, or other status of a request.", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "status" }, "route": { "description": "The HTTP URL or equivalent route processed by the request.", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "route" }, "user": { "description": "The user making the request in the system.", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "user" }, "log_severity": { "description": "Severity level of the event (also known as log level). Supported values: trace, debug, info, warn, error, fatal, unspecified.", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "log_severity" }, "log_message": { "description": "A value containing the log event message. Can be a human-readable string message (including multi-line) describing the event in a free form.", "allOf": [{ "type": ["null", "object"], "required": ["name"], "properties": { "name": {}, "column_type": {} }, "x-ref": "#/components/schemas/DatasetDefinition" }], "key$": "log_message" } }, "x-ref": "#/components/schemas/DatasetDefinitions", "index$": 1 }, "examples": { "setting": { "description": "Set the duration_ms definition.", "value": { "duration_ms": { "name": "duration_we_send", "column_type": "derived_column" } } }, "clearing": { "description": "Clear the definitions.", "value": { "error": { "name": "" }, "link_trace_id": { "name": "" } } } } } }, "required": true }, "parameters": [{ "name": "datasetSlug", "description": "The dataset slug.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlug", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let dataset_definition_ref01_data = Object.values(setup.data.existing.dataset_definition)[0];
        // UPDATE
        const dataset_definition_ref01_ent = client.DatasetDefinition();
        const dataset_definition_ref01_data_up0 = {};
        dataset_definition_ref01_data_up0.id = dataset_definition_ref01_data.id;
        const dataset_definition_ref01_markdef_up0 = { name: 'link_span_id', value: 'Mark01-dataset_definition_ref01_' + setup.now };
        dataset_definition_ref01_data_up0[dataset_definition_ref01_markdef_up0.name] = dataset_definition_ref01_markdef_up0.value;
        const dataset_definition_ref01_resdata_up0 = (await dataset_definition_ref01_ent.update(dataset_definition_ref01_data_up0)).data();
        (0, node_assert_1.default)(dataset_definition_ref01_resdata_up0.id === dataset_definition_ref01_data_up0.id);
        (0, node_assert_1.default)(dataset_definition_ref01_resdata_up0[dataset_definition_ref01_markdef_up0.name] === dataset_definition_ref01_markdef_up0.value);
        // LOAD
        const dataset_definition_ref01_match_dt0 = {};
        dataset_definition_ref01_match_dt0.id = dataset_definition_ref01_data.id;
        const dataset_definition_ref01_data_dt0 = (await dataset_definition_ref01_ent.load(dataset_definition_ref01_match_dt0)).data();
        (0, node_assert_1.default)(dataset_definition_ref01_data_dt0.id === dataset_definition_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/dataset_definition/DatasetDefinitionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['dataset_definition01', 'dataset_definition02', 'dataset_definition03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_DATASET_DEFINITION_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_DATASET_DEFINITION_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_DATASET_DEFINITION_ENTID'];
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
//# sourceMappingURL=DatasetDefinitionEntity.test.js.map
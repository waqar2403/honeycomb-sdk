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
(0, node_test_1.describe)('QueryAnnotationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HONEYCOMB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HoneycombSDK.test();
        const ent = testsdk.QueryAnnotation();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HoneycombSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.QueryAnnotation().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'query_annotation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "ro": true, "sh": "ISO8601 formatted time when the Query Annotation was created.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "A description of the Query.", "t": "`$STRING`", "key$": "description", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "ro": true, "sh": "The unique identifier (ID) of a Query Annotation.", "t": "`$STRING`", "key$": "id", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "A name for the Query.", "t": "`$STRING`", "key$": "name", "index$": 3 }, "query_id": { "a": true, "h": "Query Id", "n": "query_id", "r": true, "sh": "The ID of the Query that the annotation describes.", "t": "`$STRING`", "key$": "query_id", "index$": 4 }, "source": { "a": true, "h": "Source", "n": "source", "r": false, "ro": true, "sh": "The source of the Query Annotation.", "t": "`$STRING`", "key$": "source", "index$": 5 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "ro": true, "sh": "ISO8601 formatted time when the Query Annotation was updated.", "t": "`$STRING`", "key$": "updated_at", "index$": 6 } }, "id": { "field": "id", "name": "id", "parts": ["dataset_slug", "query_annotation_id"], "sep": "/" }, "name": "query_annotation", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["created_at", "description", "id", "name", "query_id", "source", "updated_at"], "co": { "id": "POST /1/query_annotations/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/1/query_annotations/{datasetSlug}", "q": { "exist": ["id"] }, "r": { "param": { "datasetSlug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "query_annotations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /1/query_annotations/{datasetSlug}/{queryAnnotationId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "query_annotation_id", "or": "queryAnnotationId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/1/query_annotations/{datasetSlug}/{queryAnnotationId}", "q": { "exist": ["dataset_slug", "query_annotation_id"] }, "r": { "param": { "datasetSlug": "dataset_slug", "queryAnnotationId": "query_annotation_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "query_annotations" }, { "var": "dataset_slug" }, { "var": "query_annotation_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /1/query_annotations/{datasetSlug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": false, "k": "query", "n": "include_board_annotation", "or": "include_board_annotations", "r": false, "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/1/query_annotations/{datasetSlug}", "q": { "exist": ["id"] }, "r": { "param": { "datasetSlug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "query_annotations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /1/query_annotations/{datasetSlug}/{queryAnnotationId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "query_annotation_id", "or": "queryAnnotationId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/1/query_annotations/{datasetSlug}/{queryAnnotationId}", "q": { "exist": ["dataset_slug", "query_annotation_id"] }, "r": { "param": { "datasetSlug": "dataset_slug", "queryAnnotationId": "query_annotation_id" } }, "s": [{ "lit": "1" }, { "lit": "query_annotations" }, { "var": "dataset_slug" }, { "var": "query_annotation_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["created_at", "description", "id", "name", "query_id", "source", "updated_at"], "co": { "id": "PUT /1/query_annotations/{datasetSlug}/{queryAnnotationId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "dataset_slug", "or": "datasetSlug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "query_annotation_id", "or": "queryAnnotationId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/1/query_annotations/{datasetSlug}/{queryAnnotationId}", "q": { "exist": ["dataset_slug", "query_annotation_id"] }, "r": { "param": { "datasetSlug": "dataset_slug", "queryAnnotationId": "query_annotation_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "1" }, { "lit": "query_annotations" }, { "var": "dataset_slug" }, { "var": "query_annotation_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "query_annotation", "name__orig": "query_annotation", "Name": "QueryAnnotation", "name_": "query_annotation", "name-": "query-annotation", "NAME": "QUERY_ANNOTATION", "index$": 18 }, { "active": true, "entity": "query_annotation", "key$": "BasicQueryAnnotationFlow", "kind": "basic", "name": "BasicQueryAnnotationFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "query_annotation_ref01" }, "m": { "dataset_slug": "dataset_slug01" }, "o": "create", "s": [], "v": [], "unreachable": true }, { "a": false, "d": { "dataset_slug": "dataset_slug01" }, "i": { "ref": "query_annotation_ref01", "srcdatavar": "query_annotation_ref01_data", "suffix": "_up0", "textfield": "description" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-query_annotation_ref01" } }], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "query_annotation_ref01", "srcdatavar": "query_annotation_ref01_data", "suffix": "_dt0" }, "m": { "id": "query_annotation01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-query_annotation_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "query_annotation_ref01", "suffix": "_rm0" }, "m": { "dataset_slug": "dataset_slug01", "id": "query_annotation01" }, "o": "remove", "s": [], "v": [], "unreachable": true }] }, 'QueryAnnotation', { "POST /1/query_annotations/{datasetSlug}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "description": "A Query Annotation consists of a name and description associated with a query to add context when collaborating.", "required": ["name", "query_id"], "properties": { "name": { "type": "string", "description": "A name for the Query.", "example": "My Named Query", "minLength": 1, "maxLength": 320, "key$": "name" }, "description": { "type": "string", "description": "A description of the Query.", "example": "A nice description of My Named Query", "maxLength": 1023, "key$": "description" }, "query_id": { "type": "string", "description": "The ID of the Query that the annotation describes. **Note**: Once created, it is NOT possible to change the query ID associated with an annotation. It is possible to have multiple annotations associated with a Query.\n", "example": "mabAMpSPDjH", "key$": "query_id" }, "id": { "type": "string", "description": "The unique identifier (ID) of a Query Annotation.", "readOnly": true, "example": "sGUnkBHgRFN", "key$": "id" }, "created_at": { "type": "string", "format": "date-time", "description": "ISO8601 formatted time when the Query Annotation was created.", "example": "2022-10-26T21:36:04Z", "readOnly": true, "key$": "created_at" }, "updated_at": { "type": "string", "format": "date-time", "description": "ISO8601 formatted time when the Query Annotation was updated.", "example": "2022-12-04T08:14:26Z", "readOnly": true, "key$": "updated_at" }, "source": { "type": "string", "description": "The source of the Query Annotation.", "example": "query", "enum": ["query", "board"], "readOnly": true, "key$": "source" } }, "x-ref": "#/components/schemas/QueryAnnotation", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }] }, "GET /1/query_annotations/{datasetSlug}/{queryAnnotationId}": { "protocol": "http", "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }, { "name": "queryAnnotationId", "description": "The unique identifier (ID) of the annotation.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /1/query_annotations/{datasetSlug}": { "protocol": "http", "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }, { "name": "include_board_annotations", "in": "query", "description": "Whether to include Query Annotations that were created from boards. By default, only Query Annotations created directly from queries are returned.\n", "schema": { "type": "boolean", "default": false }, "required": false, "index$": 1 }] }, "DELETE /1/query_annotations/{datasetSlug}/{queryAnnotationId}": { "protocol": "http", "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }, { "name": "queryAnnotationId", "description": "The unique identifier (ID) of the annotation.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /1/query_annotations/{datasetSlug}/{queryAnnotationId}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "description": "A Query Annotation consists of a name and description associated with a query to add context when collaborating.", "required": ["name", "query_id"], "properties": { "name": { "type": "string", "description": "A name for the Query.", "example": "My Named Query", "minLength": 1, "maxLength": 320, "key$": "name" }, "description": { "type": "string", "description": "A description of the Query.", "example": "A nice description of My Named Query", "maxLength": 1023, "key$": "description" }, "query_id": { "type": "string", "description": "The ID of the Query that the annotation describes. **Note**: Once created, it is NOT possible to change the query ID associated with an annotation. It is possible to have multiple annotations associated with a Query.\n", "example": "mabAMpSPDjH", "key$": "query_id" }, "id": { "type": "string", "description": "The unique identifier (ID) of a Query Annotation.", "readOnly": true, "example": "sGUnkBHgRFN", "key$": "id" }, "created_at": { "type": "string", "format": "date-time", "description": "ISO8601 formatted time when the Query Annotation was created.", "example": "2022-10-26T21:36:04Z", "readOnly": true, "key$": "created_at" }, "updated_at": { "type": "string", "format": "date-time", "description": "ISO8601 formatted time when the Query Annotation was updated.", "example": "2022-12-04T08:14:26Z", "readOnly": true, "key$": "updated_at" }, "source": { "type": "string", "description": "The source of the Query Annotation.", "example": "query", "enum": ["query", "board"], "readOnly": true, "key$": "source" } }, "x-ref": "#/components/schemas/QueryAnnotation", "index$": 1 }, "example": { "name": "My Updated Annotation", "description": "A nice description of My Update Annotation", "query_id": "mabAMpSPDjH", "id": "sGUnkBHgRFN", "created_at": "2022-10-26T21:36:04Z", "updated_at": "2022-12-16T10:44:08Z" } } }, "required": true }, "parameters": [{ "name": "datasetSlug", "description": "The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/datasetSlugOrAll", "index$": 0 }, { "name": "queryAnnotationId", "description": "The unique identifier (ID) of the annotation.", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let query_annotation_ref01_data = Object.values(setup.data.existing.query_annotation)[0];
        // LOAD
        const query_annotation_ref01_ent = client.QueryAnnotation();
        const query_annotation_ref01_match_dt0 = {};
        query_annotation_ref01_match_dt0.id = query_annotation_ref01_data.id;
        const query_annotation_ref01_data_dt0 = (await query_annotation_ref01_ent.load(query_annotation_ref01_match_dt0)).data();
        (0, node_assert_1.default)(query_annotation_ref01_data_dt0.id === query_annotation_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/query_annotation/QueryAnnotationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HoneycombSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['query_annotation01', 'query_annotation02', 'query_annotation03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HONEYCOMB_TEST_QUERY_ANNOTATION_ENTID': idmap,
        'HONEYCOMB_TEST_LIVE': 'FALSE',
        'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
        'HONEYCOMB_APIKEY': '',
    });
    idmap = env['HONEYCOMB_TEST_QUERY_ANNOTATION_ENTID'];
    const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HONEYCOMB_TEST_QUERY_ANNOTATION_ENTID'];
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
//# sourceMappingURL=QueryAnnotationEntity.test.js.map
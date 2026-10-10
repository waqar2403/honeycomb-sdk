

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HoneycombSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ColumnEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HONEYCOMB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HoneycombSDK.test()
    const ent = testsdk.Column()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HoneycombSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Column().list({"dataset_slug":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'column.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"h":"Created At","n":"created_at","r":false,"ro":true,"sh":"ISO8601 formatted time the column was created.","t":"`$STRING`","key$":"created_at","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Column description.","t":"`$STRING`","key$":"description","index$":1},"hidden":{"a":true,"h":"Hidden","n":"hidden","r":false,"sh":"If `true`, the column is excluded from autocomplete and raw data field lists.","t":"`$BOOLEAN`","key$":"hidden","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"ro":true,"sh":"Unique identifier (ID), returned in response bodies.","t":"`$STRING`","key$":"id","index$":3},"key_name":{"a":true,"h":"Key Name","n":"key_name","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"ro":true,"sh":"Name of the Column.","t":"`$STRING`","key$":"key_name","index$":4},"last_written":{"a":true,"h":"Last Written","n":"last_written","r":false,"ro":true,"sh":"ISO8601 formatted time the column was last written to (received event data).","t":"`$STRING`","key$":"last_written","index$":5},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Type of data that the Column will contain.","t":"`$STRING`","key$":"type","index$":6},"updated_at":{"a":true,"h":"Updated At","n":"updated_at","r":false,"ro":true,"sh":"ISO8601 formatted time the column was updated.","t":"`$STRING`","key$":"updated_at","index$":7}},"id":{"field":"id","from":{"id":"id"},"name":"id","parts":["dataset_slug","id"],"sep":"/"},"name":"column","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["created_at","description","hidden","id","key_name","last_written","type","updated_at"],"co":{"id":"POST /1/columns/{datasetSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/1/columns/{datasetSlug}","q":{"exist":["dataset_slug"]},"r":{"param":{"datasetSlug":"dataset_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"columns"},{"var":"dataset_slug"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /1/columns/{datasetSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"key_name","or":"key_name","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/1/columns/{datasetSlug}","q":{"exist":["dataset_slug"]},"r":{"param":{"datasetSlug":"dataset_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"columns"},{"var":"dataset_slug"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /1/columns/{datasetSlug}/{columnId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"columnId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/1/columns/{datasetSlug}/{columnId}","q":{"exist":["dataset_slug","id"]},"r":{"param":{"columnId":"id","datasetSlug":"dataset_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"columns"},{"var":"dataset_slug"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /1/columns/{datasetSlug}/{columnId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"columnId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/1/columns/{datasetSlug}/{columnId}","q":{"exist":["dataset_slug","id"]},"r":{"param":{"columnId":"id","datasetSlug":"dataset_slug"}},"s":[{"lit":"1"},{"lit":"columns"},{"var":"dataset_slug"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["created_at","description","hidden","id","key_name","last_written","type","updated_at"],"co":{"id":"PUT /1/columns/{datasetSlug}/{columnId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"columnId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/1/columns/{datasetSlug}/{columnId}","q":{"exist":["dataset_slug","id"]},"r":{"param":{"columnId":"id","datasetSlug":"dataset_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"columns"},{"var":"dataset_slug"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"column","name__orig":"column","Name":"Column","name_":"column","name-":"column","NAME":"COLUMN","index$":7}, {"active":true,"entity":"column","key$":"BasicColumnFlow","kind":"basic","name":"BasicColumnFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"column_ref01"},"m":{"dataset_slug":"dataset_slug01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"dataset_slug":"dataset_slug01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"column_ref01"}}],"index$":1},{"a":true,"d":{"dataset_slug":"dataset_slug01"},"i":{"ref":"column_ref01","srcdatavar":"column_ref01_data","suffix":"_up0","textfield":"description"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-column_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"column_ref01","srcdatavar":"column_ref01_data","suffix":"_dt0"},"m":{"dataset_slug":"dataset_slug01","id":"column01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-column_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"column_ref01","suffix":"_rm0"},"m":{"dataset_slug":"dataset_slug01","id":"column01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"dataset_slug":"dataset_slug01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"column_ref01"}}],"index$":5}]}, 'Column', {"POST /1/columns/{datasetSlug}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","required":["key_name"],"properties":{"key_name":{"type":"string","description":"Name of the Column.","example":"my_column","minLength":1,"maxLength":255,"key$":"key_name"},"type":{"type":"string","default":"string","enum":["string","float","integer","boolean","histogram"],"description":"Type of data that the Column will contain. Histogram is in beta and only works in your Metrics dataset.","example":"integer","key$":"type"},"description":{"type":"string","description":"Column description.","maxLength":255,"example":"An integer column","key$":"description"},"hidden":{"type":"boolean","default":false,"description":"If `true`, the column is excluded from autocomplete and raw data field lists.","key$":"hidden"},"id":{"type":"string","readOnly":true,"description":"Unique identifier (ID), returned in response bodies.","key$":"id"},"last_written":{"type":"string","readOnly":true,"description":"ISO8601 formatted time the column was last written to (received event data).","key$":"last_written"},"created_at":{"type":"string","readOnly":true,"description":"ISO8601 formatted time the column was created.","key$":"created_at"},"updated_at":{"type":"string","readOnly":true,"description":"ISO8601 formatted time the column was updated.","key$":"updated_at"}},"x-ref":"#/components/schemas/CreateColumn","index$":1}}},"required":true},"parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0}]},"GET /1/columns/{datasetSlug}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"key_name","description":"the column key name","in":"query","schema":{"type":"string"},"index$":1}]},"GET /1/columns/{datasetSlug}/{columnId}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlug","index$":0},{"name":"columnId","description":"Unique identifier (ID) of a column.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /1/columns/{datasetSlug}/{columnId}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlug","index$":0},{"name":"columnId","description":"Unique identifier (ID) of a column.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /1/columns/{datasetSlug}/{columnId}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"allOf":[{"type":"object","required":["key_name"],"properties":{"key_name":{"type":"string","description":"Name of the Column.","example":"my_column","minLength":1,"maxLength":255,"key$":"key_name"},"type":{"type":"string","default":"string","enum":["string","float","integer","boolean","histogram"],"description":"Type of data that the Column will contain. Histogram is in beta and only works in your Metrics dataset.","example":"integer","key$":"type"},"description":{"type":"string","description":"Column description.","maxLength":255,"example":"An integer column","key$":"description"},"hidden":{"type":"boolean","default":false,"description":"If `true`, the column is excluded from autocomplete and raw data field lists.","key$":"hidden"},"id":{"type":"string","readOnly":true,"description":"Unique identifier (ID), returned in response bodies.","key$":"id"},"last_written":{"type":"string","readOnly":true,"description":"ISO8601 formatted time the column was last written to (received event data).","key$":"last_written"},"created_at":{"type":"string","readOnly":true,"description":"ISO8601 formatted time the column was created.","key$":"created_at"},"updated_at":{"type":"string","readOnly":true,"description":"ISO8601 formatted time the column was updated.","key$":"updated_at"}},"x-ref":"#/components/schemas/CreateColumn"}],"properties":{"key_name":{"readOnly":true,"key$":"key_name"}},"x-ref":"#/components/schemas/Column","index$":1}}},"required":true},"parameters":[{"name":"datasetSlug","description":"The dataset slug.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlug","index$":0},{"name":"columnId","description":"Unique identifier (ID) of a column.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const column_ref01_ent = client.Column()
    let column_ref01_data = setup.data.new.column['column_ref01']
    column_ref01_data['dataset_slug'] = setup.idmap['dataset_slug01']

    column_ref01_data = (await column_ref01_ent.create(column_ref01_data)).data()
    assert(null != column_ref01_data.id)


    // LIST
    const column_ref01_match: any = {}
    column_ref01_match['dataset_slug'] = setup.idmap['dataset_slug01']

    const column_ref01_list = (await column_ref01_ent.list(column_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(column_ref01_list, { id: column_ref01_data.id })))


    // UPDATE
    const column_ref01_data_up0: any = {}
    column_ref01_data_up0.id = column_ref01_data.id
    column_ref01_data_up0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01']

    const column_ref01_markdef_up0 = { name: 'description', value: 'Mark01-column_ref01_' + setup.now }
    ;(column_ref01_data_up0 as any)[column_ref01_markdef_up0.name] = column_ref01_markdef_up0.value

    const column_ref01_resdata_up0 = (await column_ref01_ent.update(column_ref01_data_up0)).data()
    assert(column_ref01_resdata_up0.id === column_ref01_data_up0.id)

    assert((column_ref01_resdata_up0 as any)[column_ref01_markdef_up0.name] === column_ref01_markdef_up0.value)


    // LOAD
    const column_ref01_match_dt0: any = {}
    column_ref01_match_dt0.id = column_ref01_data.id
    column_ref01_match_dt0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01']
    const column_ref01_data_dt0 = (await column_ref01_ent.load(column_ref01_match_dt0)).data()
    assert(column_ref01_data_dt0.id === column_ref01_data.id)


    // REMOVE
    const column_ref01_match_rm0: any = { id: column_ref01_data.id }
    column_ref01_match_rm0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01']
    await column_ref01_ent.remove(column_ref01_match_rm0)
  

    // LIST
    const column_ref01_match_rt0: any = {}
    column_ref01_match_rt0['dataset_slug'] = setup.idmap['dataset_slug01']

    const column_ref01_list_rt0 = (await column_ref01_ent.list(column_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(column_ref01_list_rt0, { id: column_ref01_data.id })))


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/column/ColumnTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = HoneycombSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['column01','column02','column03','dataset_slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HONEYCOMB_TEST_COLUMN_ENTID': idmap,
    'HONEYCOMB_TEST_LIVE': 'FALSE',
    'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
    'HONEYCOMB_APIKEY': '',
  })

  idmap = env['HONEYCOMB_TEST_COLUMN_ENTID']

  const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HONEYCOMB_TEST_COLUMN_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new HoneycombSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  



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


describe('CalculatedFieldEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HONEYCOMB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HoneycombSDK.test()
    const ent = testsdk.CalculatedField()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HoneycombSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CalculatedField().list({"dataset_slug":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'calculated_field.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"alias":{"a":true,"h":"Alias","n":"alias","r":true,"sh":"The human-readable name of the Calculated Field (also called Derived Column), as it will be referenced when building queries.","t":"`$STRING`","key$":"alias","index$":0},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"ro":true,"sh":"ISO8601 formatted time when the field was created.","t":"`$STRING`","key$":"created_at","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"A human-readable description for the Calculated Field that displays in the UI.","t":"`$STRING`","key$":"description","index$":2},"expression":{"a":true,"h":"Expression","n":"expression","r":true,"sh":"The expression to evaluate to construct this Calculated Field's value.","t":"`$STRING`","key$":"expression","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"ro":true,"sh":"Unique identifier (ID), returned in response bodies.","t":"`$STRING`","key$":"id","index$":4},"updated_at":{"a":true,"h":"Updated At","n":"updated_at","r":true,"ro":true,"sh":"ISO8601 formatted time when the field was updated.","t":"`$STRING`","key$":"updated_at","index$":5}},"id":{"field":"id","from":{"id":"id"},"name":"id","parts":["dataset_slug","id"],"sep":"/"},"name":"calculated_field","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["alias","created_at","description","expression","id","updated_at"],"co":{"id":"POST /1/derived_columns/{datasetSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/1/derived_columns/{datasetSlug}","q":{"exist":["dataset_slug"]},"r":{"param":{"datasetSlug":"dataset_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"derived_columns"},{"var":"dataset_slug"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /1/derived_columns/{datasetSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"alia","or":"alias","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/1/derived_columns/{datasetSlug}","q":{"exist":["dataset_slug"]},"r":{"param":{"datasetSlug":"dataset_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"derived_columns"},{"var":"dataset_slug"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /1/derived_columns/{datasetSlug}/{derivedColumnId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"derivedColumnId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/1/derived_columns/{datasetSlug}/{derivedColumnId}","q":{"exist":["dataset_slug","id"]},"r":{"param":{"datasetSlug":"dataset_slug","derivedColumnId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"derived_columns"},{"var":"dataset_slug"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /1/derived_columns/{datasetSlug}/{derivedColumnId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"derivedColumnId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/1/derived_columns/{datasetSlug}/{derivedColumnId}","q":{"exist":["dataset_slug","id"]},"r":{"param":{"datasetSlug":"dataset_slug","derivedColumnId":"id"}},"s":[{"lit":"1"},{"lit":"derived_columns"},{"var":"dataset_slug"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["alias","created_at","description","expression","id","updated_at"],"co":{"id":"PUT /1/derived_columns/{datasetSlug}/{derivedColumnId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"derivedColumnId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/1/derived_columns/{datasetSlug}/{derivedColumnId}","q":{"exist":["dataset_slug","id"]},"r":{"param":{"datasetSlug":"dataset_slug","derivedColumnId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"derived_columns"},{"var":"dataset_slug"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"calculated_field","name__orig":"calculated_field","Name":"CalculatedField","name_":"calculated_field","name-":"calculated-field","NAME":"CALCULATED_FIELD","index$":5}, {"active":true,"entity":"calculated_field","key$":"BasicCalculatedFieldFlow","kind":"basic","name":"BasicCalculatedFieldFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"calculated_field_ref01"},"m":{"dataset_slug":"dataset_slug01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"dataset_slug":"dataset_slug01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"calculated_field_ref01"}}],"index$":1},{"a":true,"d":{"dataset_slug":"dataset_slug01"},"i":{"ref":"calculated_field_ref01","srcdatavar":"calculated_field_ref01_data","suffix":"_up0","textfield":"alias"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-calculated_field_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"calculated_field_ref01","srcdatavar":"calculated_field_ref01_data","suffix":"_dt0"},"m":{"dataset_slug":"dataset_slug01","id":"calculated_field01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-calculated_field_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"calculated_field_ref01","suffix":"_rm0"},"m":{"dataset_slug":"dataset_slug01","id":"calculated_field01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"dataset_slug":"dataset_slug01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"calculated_field_ref01"}}],"index$":5}]}, 'CalculatedField', {"POST /1/derived_columns/{datasetSlug}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","required":["id","alias","expression","created_at","updated_at"],"properties":{"id":{"type":"string","readOnly":true,"description":"Unique identifier (ID), returned in response bodies.","key$":"id"},"alias":{"type":"string","description":"The human-readable name of the Calculated Field (also called Derived Column), as it will be referenced when building queries.","minLength":1,"maxLength":255,"key$":"alias"},"expression":{"type":"string","description":"The expression to evaluate to construct this Calculated Field's value. (Calculated Field is also called Derived Column.) Refer to the [Calculated Field Reference](https://docs.honeycomb.io/reference/derived-column-formula/).\n","minLength":1,"maxLength":4095,"key$":"expression"},"description":{"type":"string","description":"A human-readable description for the Calculated Field that displays in the UI.","default":"","maxLength":255,"key$":"description"},"created_at":{"type":"string","readOnly":true,"description":"ISO8601 formatted time when the field was created.","key$":"created_at"},"updated_at":{"type":"string","readOnly":true,"description":"ISO8601 formatted time when the field was updated.","key$":"updated_at"}},"x-ref":"#/components/schemas/CalculatedField","index$":1}}},"required":true},"parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0}]},"GET /1/derived_columns/{datasetSlug}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"alias","description":"The Calculated Field `alias`.","in":"query","schema":{"type":"string"},"index$":1}]},"GET /1/derived_columns/{datasetSlug}/{derivedColumnId}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"derivedColumnId","description":"Unique identifier (ID) of a Calculated Field (also called a Derived Column).","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /1/derived_columns/{datasetSlug}/{derivedColumnId}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"derivedColumnId","description":"Unique identifier (ID) of a Calculated Field (also called a Derived Column).","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /1/derived_columns/{datasetSlug}/{derivedColumnId}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","required":["id","alias","expression","created_at","updated_at"],"properties":{"id":{"type":"string","readOnly":true,"description":"Unique identifier (ID), returned in response bodies.","key$":"id"},"alias":{"type":"string","description":"The human-readable name of the Calculated Field (also called Derived Column), as it will be referenced when building queries.","minLength":1,"maxLength":255,"key$":"alias"},"expression":{"type":"string","description":"The expression to evaluate to construct this Calculated Field's value. (Calculated Field is also called Derived Column.) Refer to the [Calculated Field Reference](https://docs.honeycomb.io/reference/derived-column-formula/).\n","minLength":1,"maxLength":4095,"key$":"expression"},"description":{"type":"string","description":"A human-readable description for the Calculated Field that displays in the UI.","default":"","maxLength":255,"key$":"description"},"created_at":{"type":"string","readOnly":true,"description":"ISO8601 formatted time when the field was created.","key$":"created_at"},"updated_at":{"type":"string","readOnly":true,"description":"ISO8601 formatted time when the field was updated.","key$":"updated_at"}},"x-ref":"#/components/schemas/CalculatedField","index$":1}}},"required":true},"parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"derivedColumnId","description":"Unique identifier (ID) of a Calculated Field (also called a Derived Column).","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const calculated_field_ref01_ent = client.CalculatedField()
    let calculated_field_ref01_data = setup.data.new.calculated_field['calculated_field_ref01']
    calculated_field_ref01_data['dataset_slug'] = setup.idmap['dataset_slug01']

    calculated_field_ref01_data = (await calculated_field_ref01_ent.create(calculated_field_ref01_data)).data()
    assert(null != calculated_field_ref01_data.id)


    // LIST
    const calculated_field_ref01_match: any = {}
    calculated_field_ref01_match['dataset_slug'] = setup.idmap['dataset_slug01']

    const calculated_field_ref01_list = (await calculated_field_ref01_ent.list(calculated_field_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(calculated_field_ref01_list, { id: calculated_field_ref01_data.id })))


    // UPDATE
    const calculated_field_ref01_data_up0: any = {}
    calculated_field_ref01_data_up0.id = calculated_field_ref01_data.id
    calculated_field_ref01_data_up0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01']

    const calculated_field_ref01_markdef_up0 = { name: 'alias', value: 'Mark01-calculated_field_ref01_' + setup.now }
    ;(calculated_field_ref01_data_up0 as any)[calculated_field_ref01_markdef_up0.name] = calculated_field_ref01_markdef_up0.value

    const calculated_field_ref01_resdata_up0 = (await calculated_field_ref01_ent.update(calculated_field_ref01_data_up0)).data()
    assert(calculated_field_ref01_resdata_up0.id === calculated_field_ref01_data_up0.id)

    assert((calculated_field_ref01_resdata_up0 as any)[calculated_field_ref01_markdef_up0.name] === calculated_field_ref01_markdef_up0.value)


    // LOAD
    const calculated_field_ref01_match_dt0: any = {}
    calculated_field_ref01_match_dt0.id = calculated_field_ref01_data.id
    calculated_field_ref01_match_dt0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01']
    const calculated_field_ref01_data_dt0 = (await calculated_field_ref01_ent.load(calculated_field_ref01_match_dt0)).data()
    assert(calculated_field_ref01_data_dt0.id === calculated_field_ref01_data.id)


    // REMOVE
    const calculated_field_ref01_match_rm0: any = { id: calculated_field_ref01_data.id }
    calculated_field_ref01_match_rm0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01']
    await calculated_field_ref01_ent.remove(calculated_field_ref01_match_rm0)
  

    // LIST
    const calculated_field_ref01_match_rt0: any = {}
    calculated_field_ref01_match_rt0['dataset_slug'] = setup.idmap['dataset_slug01']

    const calculated_field_ref01_list_rt0 = (await calculated_field_ref01_ent.list(calculated_field_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(calculated_field_ref01_list_rt0, { id: calculated_field_ref01_data.id })))


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
      '../../../../.sdk/test/entity/calculated_field/CalculatedFieldTestData.json')

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
    ['calculated_field01','calculated_field02','calculated_field03','dataset_slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HONEYCOMB_TEST_CALCULATED_FIELD_ENTID': idmap,
    'HONEYCOMB_TEST_LIVE': 'FALSE',
    'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
    'HONEYCOMB_APIKEY': '',
  })

  idmap = env['HONEYCOMB_TEST_CALCULATED_FIELD_ENTID']

  const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HONEYCOMB_TEST_CALCULATED_FIELD_ENTID']
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
  

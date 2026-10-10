

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


describe('SloEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HONEYCOMB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HoneycombSDK.test()
    const ent = testsdk.Slo()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HoneycombSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Slo().list({"dataset_slug":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'slo.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"ro":true,"sh":"The ISO8601-formatted time when the SLO was created.","t":"`$STRING`","key$":"created_at","index$":0},"dataset_slugs":{"a":true,"h":"Dataset Slugs","n":"dataset_slugs","r":false,"ro":true,"sh":"The dataset(s) the SLO will be evaluated against.","t":"`$ARRAY`","key$":"dataset_slugs","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"A nice description of the SLO's intent and context.","t":"`$STRING`","key$":"description","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"ro":true,"t":"`$STRING`","key$":"id","index$":3},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":true,"type":"`$STRING`"},"list":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The name of the SLO.","t":"`$STRING`","key$":"name","index$":4},"reset_at":{"a":true,"fo":"date-time","h":"Reset At","n":"reset_at","r":false,"ro":true,"sh":"The ISO8601-formatted time the SLO was last reset.","t":"`$STRING`","key$":"reset_at","index$":5},"sli":{"a":true,"h":"Sli","n":"sli","op":{"create":{"req":true,"type":"`$OBJECT`"},"list":{"req":true,"type":"`$OBJECT`"},"update":{"req":true,"type":"`$OBJECT`"}},"r":false,"sh":"Reference to the [Calculated Field (also called Derived Column)](/api/calculated-fields/) used as the indicator of event success.","t":"`$OBJECT`","key$":"sli","index$":6},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"A list of key-value pairs to help identify the SLO.","t":"`$ARRAY`","key$":"tags","index$":7},"target_per_million":{"a":true,"h":"Target Per Million","n":"target_per_million","op":{"create":{"req":true,"type":"`$INTEGER`"},"list":{"req":true,"type":"`$INTEGER`"},"update":{"req":true,"type":"`$INTEGER`"}},"r":false,"sh":"The number of events out of one million (1,000,000) that you expected qualified events to succeed.","t":"`$INTEGER`","key$":"target_per_million","index$":8},"time_period_days":{"a":true,"h":"Time Period Days","n":"time_period_days","op":{"create":{"req":true,"type":"`$INTEGER`"},"list":{"req":true,"type":"`$INTEGER`"},"update":{"req":true,"type":"`$INTEGER`"}},"r":false,"sh":"The time period, in days, over which the SLO will be evaluated.","t":"`$INTEGER`","key$":"time_period_days","index$":9},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"ro":true,"sh":"The ISO8601-formatted time when the SLO was updated.","t":"`$STRING`","key$":"updated_at","index$":10}},"id":{"field":"id","from":{"id":"id"},"name":"id","parts":["dataset_slug","id"],"sep":"/"},"name":"slo","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["created_at","dataset_slugs","description","id","name","reset_at","sli","tags","target_per_million","time_period_days","updated_at"],"co":{"id":"POST /1/slos/{datasetSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/1/slos/{datasetSlug}","q":{"exist":["dataset_slug"]},"r":{"param":{"datasetSlug":"dataset_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"slos"},{"var":"dataset_slug"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /1/slos/{datasetSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/1/slos/{datasetSlug}","q":{"exist":["dataset_slug"]},"r":{"param":{"datasetSlug":"dataset_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"slos"},{"var":"dataset_slug"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /1/slos/{datasetSlug}/{sloId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"sloId","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":"","k":"query","n":"detailed","or":"detailed","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/1/slos/{datasetSlug}/{sloId}","q":{"exist":["dataset_slug","id"]},"r":{"param":{"datasetSlug":"dataset_slug","sloId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"slos"},{"var":"dataset_slug"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /1/slos/{datasetSlug}/{sloId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"sloId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/1/slos/{datasetSlug}/{sloId}","q":{"exist":["dataset_slug","id"]},"r":{"param":{"datasetSlug":"dataset_slug","sloId":"id"}},"s":[{"lit":"1"},{"lit":"slos"},{"var":"dataset_slug"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["created_at","dataset_slugs","description","id","name","reset_at","sli","tags","target_per_million","time_period_days","updated_at"],"co":{"id":"PUT /1/slos/{datasetSlug}/{sloId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"sloId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/1/slos/{datasetSlug}/{sloId}","q":{"exist":["dataset_slug","id"]},"r":{"param":{"datasetSlug":"dataset_slug","sloId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"slos"},{"var":"dataset_slug"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"slo","name__orig":"slo","Name":"Slo","name_":"slo","name-":"slo","NAME":"SLO","index$":23}, {"active":true,"entity":"slo","key$":"BasicSloFlow","kind":"basic","name":"BasicSloFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"slo_ref01"},"m":{"dataset_slug":"dataset_slug01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"dataset_slug":"dataset_slug01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"slo_ref01"}}],"index$":1},{"a":true,"d":{"dataset_slug":"dataset_slug01"},"i":{"ref":"slo_ref01","srcdatavar":"slo_ref01_data","suffix":"_up0","textfield":"description"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-slo_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"slo_ref01","srcdatavar":"slo_ref01_data","suffix":"_dt0"},"m":{"dataset_slug":"dataset_slug01","id":"slo01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-slo_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"slo_ref01","suffix":"_rm0"},"m":{"dataset_slug":"dataset_slug01","id":"slo01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"dataset_slug":"dataset_slug01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"slo_ref01"}}],"index$":5}]}, 'Slo', {"POST /1/slos/{datasetSlug}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","required":["name","time_period_days","target_per_million","sli"],"properties":{"id":{"type":"string","readOnly":true,"key$":"id"},"name":{"type":"string","description":"The name of the SLO.","minLength":1,"maxLength":120,"example":"My SLO","key$":"name"},"description":{"type":"string","description":"A nice description of the SLO's intent and context.","minLength":0,"maxLength":1023,"example":"SLO to ensure requests succeed and are fast","key$":"description"},"sli":{"type":"object","description":"Reference to the [Calculated Field (also called Derived Column)](/api/calculated-fields/) used as the indicator of event success.","required":["alias"],"properties":{"alias":{"type":"string","description":"The alias of the Calculated Field (also called Derived Column).","minLength":1,"maxLength":255}},"example":{"alias":"error_sli"},"key$":"sli"},"time_period_days":{"type":"integer","description":"The time period, in days, over which the SLO will be evaluated.","minimum":1,"example":30,"key$":"time_period_days"},"target_per_million":{"type":"integer","description":"The number of events out of one million (1,000,000) that you expected qualified events to succeed.","minimum":0,"maximum":999999,"example":990000,"key$":"target_per_million"},"tags":{"type":"array","description":"A list of key-value pairs to help identify the SLO.","maxItems":10,"items":{"type":"object","required":["key","value"],"properties":{"key":{"type":"string","description":"A key to identify the tag, lowercase letters only.","maxLength":32},"value":{"type":"string","description":"A value for the tag, must begin with a lowercase letter, contain only alphanumeric characters (all letters lowercase) and special characters of `/` and `-` allowed.","maxLength":128}},"x-ref":"#/components/schemas/Tag"},"example":[{"key":"team","value":"blue"}],"key$":"tags"},"reset_at":{"type":["null","string"],"format":"date-time","description":"The ISO8601-formatted time the SLO was last reset. The value will be `null` if the SLO has not yet been reset.","readOnly":true,"example":"2022-011-11T09:53:04Z","key$":"reset_at"},"created_at":{"type":"string","description":"The ISO8601-formatted time when the SLO was created.","format":"date-time","readOnly":true,"example":"2022-09-22T17:32:11Z","key$":"created_at"},"updated_at":{"type":"string","format":"date-time","description":"The ISO8601-formatted time when the SLO was updated.","readOnly":true,"example":"2022-10-31T15:08:11Z","key$":"updated_at"},"dataset_slugs":{"type":"array","description":"The dataset(s) the SLO will be evaluated against. Required if using `__all__` in the path.","minItems":1,"maxItems":10,"example":["mydataset1","mydataset2"],"key$":"dataset_slugs"}},"x-ref":"#/components/schemas/SLOCreate","index$":1}}},"required":true},"parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0}]},"GET /1/slos/{datasetSlug}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0}]},"GET /1/slos/{datasetSlug}/{sloId}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"sloId","description":"Unique identifier (ID) of the SLO.","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"in":"query","name":"detailed","schema":{"type":"boolean"},"description":"Allows SLO reporting data (`status`, `burn_rate`, `budget_remaining` and `compliance`) to be returned when retrieving a single SLO.\n\nThis feature is available as part of the [Honeycomb Enterprise plan](https://www.honeycomb.io/pricing/).\n\n**Note:** `burn_rate` is calculated based on the last 4 hours of data.\n","required":false,"allowEmptyValue":true,"example":"","index$":2}]},"DELETE /1/slos/{datasetSlug}/{sloId}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"sloId","description":"Unique identifier (ID) of the SLO.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /1/slos/{datasetSlug}/{sloId}":{"protocol":"http","requestBody":{"description":"Partial updates are not supported.\n","content":{"application/json":{"schema":{"type":"object","required":["name","time_period_days","target_per_million","sli"],"properties":{"id":{"type":"string","readOnly":true,"key$":"id"},"name":{"type":"string","description":"The name of the SLO.","minLength":1,"maxLength":120,"example":"My SLO","key$":"name"},"description":{"type":"string","description":"A nice description of the SLO's intent and context.","minLength":0,"maxLength":1023,"example":"SLO to ensure requests succeed and are fast","key$":"description"},"sli":{"type":"object","description":"Reference to the [Calculated Field](/api/calculated-fields/) used as the indicator of event success.","required":["alias"],"properties":{"alias":{"type":"string","description":"The alias of the Calculated Field (also called Derived Column).","minLength":1,"maxLength":255}},"example":{"alias":"error_sli"},"key$":"sli"},"time_period_days":{"type":"integer","description":"The time period, in days, over which the SLO will be evaluated.","minimum":1,"example":30,"key$":"time_period_days"},"target_per_million":{"type":"integer","description":"The number of events out of one million (1,000,000) that you expected qualified events to succeed.","minimum":0,"maximum":999999,"example":990000,"key$":"target_per_million"},"tags":{"type":"array","description":"A list of key-value pairs to help identify the SLO.","maxItems":10,"items":{"type":"object","required":["key","value"],"properties":{"key":{"type":"string","description":"A key to identify the tag, lowercase letters only.","maxLength":32},"value":{"type":"string","description":"A value for the tag, must begin with a lowercase letter, contain only alphanumeric characters (all letters lowercase) and special characters of `/` and `-` allowed.","maxLength":128}},"x-ref":"#/components/schemas/Tag"},"example":[{"key":"team","value":"blue"}],"key$":"tags"},"reset_at":{"type":["null","string"],"format":"date-time","description":"The ISO8601-formatted time the SLO was last reset. The value will be `null` if the SLO has not yet been reset.","readOnly":true,"example":"2022-011-11T09:53:04Z","key$":"reset_at"},"created_at":{"type":"string","description":"The ISO8601-formatted time when the SLO was created.","format":"date-time","readOnly":true,"example":"2022-09-22T17:32:11Z","key$":"created_at"},"updated_at":{"type":"string","format":"date-time","description":"The ISO8601-formatted time when the SLO was updated.","readOnly":true,"example":"2022-10-31T15:08:11Z","key$":"updated_at"},"dataset_slugs":{"type":"array","description":"The dataset(s) the SLO will be evaluated against. Required if using `__all__` in the path.","readOnly":true,"minItems":1,"maxItems":10,"example":["mydataset1","mydataset2"],"key$":"dataset_slugs"}},"x-ref":"#/components/schemas/SLO","index$":1}}},"required":true},"parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"sloId","description":"Unique identifier (ID) of the SLO.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const slo_ref01_ent = client.Slo()
    let slo_ref01_data = setup.data.new.slo['slo_ref01']
    slo_ref01_data['dataset_slug'] = setup.idmap['dataset_slug01']

    slo_ref01_data = (await slo_ref01_ent.create(slo_ref01_data)).data()
    assert(null != slo_ref01_data.id)


    // LIST
    const slo_ref01_match: any = {}
    slo_ref01_match['dataset_slug'] = setup.idmap['dataset_slug01']

    const slo_ref01_list = (await slo_ref01_ent.list(slo_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(slo_ref01_list, { id: slo_ref01_data.id })))


    // UPDATE
    const slo_ref01_data_up0: any = {}
    slo_ref01_data_up0.id = slo_ref01_data.id
    slo_ref01_data_up0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01']

    const slo_ref01_markdef_up0 = { name: 'description', value: 'Mark01-slo_ref01_' + setup.now }
    ;(slo_ref01_data_up0 as any)[slo_ref01_markdef_up0.name] = slo_ref01_markdef_up0.value

    const slo_ref01_resdata_up0 = (await slo_ref01_ent.update(slo_ref01_data_up0)).data()
    assert(slo_ref01_resdata_up0.id === slo_ref01_data_up0.id)

    assert((slo_ref01_resdata_up0 as any)[slo_ref01_markdef_up0.name] === slo_ref01_markdef_up0.value)


    // LOAD
    const slo_ref01_match_dt0: any = {}
    slo_ref01_match_dt0.id = slo_ref01_data.id
    slo_ref01_match_dt0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01']
    const slo_ref01_data_dt0 = (await slo_ref01_ent.load(slo_ref01_match_dt0)).data()
    assert(slo_ref01_data_dt0.id === slo_ref01_data.id)


    // REMOVE
    const slo_ref01_match_rm0: any = { id: slo_ref01_data.id }
    slo_ref01_match_rm0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01']
    await slo_ref01_ent.remove(slo_ref01_match_rm0)
  

    // LIST
    const slo_ref01_match_rt0: any = {}
    slo_ref01_match_rt0['dataset_slug'] = setup.idmap['dataset_slug01']

    const slo_ref01_list_rt0 = (await slo_ref01_ent.list(slo_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(slo_ref01_list_rt0, { id: slo_ref01_data.id })))


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
      '../../../../.sdk/test/entity/slo/SloTestData.json')

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
    ['slo01','slo02','slo03','dataset_slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HONEYCOMB_TEST_SLO_ENTID': idmap,
    'HONEYCOMB_TEST_LIVE': 'FALSE',
    'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
    'HONEYCOMB_APIKEY': '',
  })

  idmap = env['HONEYCOMB_TEST_SLO_ENTID']

  const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HONEYCOMB_TEST_SLO_ENTID']
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
  

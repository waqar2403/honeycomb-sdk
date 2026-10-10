

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


describe('BurnAlertEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HONEYCOMB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HoneycombSDK.test()
    const ent = testsdk.BurnAlert()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HoneycombSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BurnAlert().list({"dataset_slug":1,"slo_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'burn_alert.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"alert_type":{"a":true,"h":"Alert Type","n":"alert_type","r":true,"t":"`$STRING`","key$":"alert_type","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1}},"id":{"field":"id","name":"id","parts":["dataset_slug","id"],"sep":"/"},"name":"burn_alert","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["alert_type","auto_investigate","budget_rate_decrease_threshold_per_million","budget_rate_window_minutes","created_at","description","exhaustion_minutes","id","recipients","slo","triggered","updated_at"],"co":{"id":"POST /1/burn_alerts/{datasetSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/1/burn_alerts/{datasetSlug}","q":{"exist":["dataset_slug"]},"r":{"param":{"datasetSlug":"dataset_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"burn_alerts"},{"var":"dataset_slug"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /1/burn_alerts/{datasetSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"slo_id","or":"slo_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/1/burn_alerts/{datasetSlug}","q":{"exist":["dataset_slug","slo_id"]},"r":{"param":{"datasetSlug":"dataset_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"burn_alerts"},{"var":"dataset_slug"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /1/burn_alerts/{datasetSlug}/{burnAlertId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"burnAlertId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/1/burn_alerts/{datasetSlug}/{burnAlertId}","q":{"exist":["dataset_slug","id"]},"r":{"param":{"burnAlertId":"id","datasetSlug":"dataset_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"burn_alerts"},{"var":"dataset_slug"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /1/burn_alerts/{datasetSlug}/{burnAlertId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"burnAlertId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/1/burn_alerts/{datasetSlug}/{burnAlertId}","q":{"exist":["dataset_slug","id"]},"r":{"param":{"burnAlertId":"id","datasetSlug":"dataset_slug"}},"s":[{"lit":"1"},{"lit":"burn_alerts"},{"var":"dataset_slug"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["alert_type","auto_investigate","budget_rate_decrease_threshold_per_million","budget_rate_window_minutes","created_at","description","exhaustion_minutes","id","recipients","triggered","updated_at"],"co":{"id":"PUT /1/burn_alerts/{datasetSlug}/{burnAlertId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"burnAlertId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/1/burn_alerts/{datasetSlug}/{burnAlertId}","q":{"exist":["dataset_slug","id"]},"r":{"param":{"burnAlertId":"id","datasetSlug":"dataset_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"burn_alerts"},{"var":"dataset_slug"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"burn_alert","name__orig":"burn_alert","Name":"BurnAlert","name_":"burn_alert","name-":"burn-alert","NAME":"BURN_ALERT","index$":4}, {"active":true,"entity":"burn_alert","key$":"BasicBurnAlertFlow","kind":"basic","name":"BasicBurnAlertFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"burn_alert_ref01"},"m":{"dataset_slug":"dataset_slug01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"dataset_slug":"dataset_slug01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"burn_alert_ref01"}}],"index$":1},{"a":true,"d":{"dataset_slug":"dataset_slug01"},"i":{"ref":"burn_alert_ref01","srcdatavar":"burn_alert_ref01_data","suffix":"_up0","textfield":"alert_type"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-burn_alert_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"burn_alert_ref01","srcdatavar":"burn_alert_ref01_data","suffix":"_dt0"},"m":{"dataset_slug":"dataset_slug01","id":"burn_alert01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-burn_alert_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"burn_alert_ref01","suffix":"_rm0"},"m":{"dataset_slug":"dataset_slug01","id":"burn_alert01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"dataset_slug":"dataset_slug01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"burn_alert_ref01"}}],"index$":5}]}, 'BurnAlert', {"POST /1/burn_alerts/{datasetSlug}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","required":["alert_type"],"properties":{"alert_type":{"type":"string","key$":"alert_type"}},"oneOf":[{"allOf":[{"title":"Exhaustion Time","allOf":[{},{}],"x-ref":"#/components/schemas/ExhaustionTimeBurnAlert"},{"type":"object","required":["slo","recipients"],"properties":{"slo":{},"recipients":{}}}],"x-ref":"#/components/schemas/CreateExhaustionTimeBurnAlertRequest"},{"allOf":[{"title":"Budget Rate","allOf":[{},{}],"x-ref":"#/components/schemas/BudgetRateBurnAlert"},{"type":"object","required":["slo","recipients"],"properties":{"slo":{},"recipients":{}}}],"x-ref":"#/components/schemas/CreateBudgetRateBurnAlertRequest"}],"discriminator":{"propertyName":"alert_type","mapping":{"exhaustion_time":"#/components/schemas/CreateExhaustionTimeBurnAlertRequest","budget_rate":"#/components/schemas/CreateBudgetRateBurnAlertRequest"}},"x-ref":"#/components/schemas/CreateBurnAlertRequest","index$":1}}},"required":true},"parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0}]},"GET /1/burn_alerts/{datasetSlug}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"in":"query","name":"slo_id","schema":{"type":"string"},"description":"For use with the list endpoint to retrieve all burn alerts for a specified SLO.","required":true,"index$":1}]},"GET /1/burn_alerts/{datasetSlug}/{burnAlertId}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"burnAlertId","description":"The unique identifier (ID) of a Burn Alert.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /1/burn_alerts/{datasetSlug}/{burnAlertId}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"burnAlertId","description":"The unique identifier (ID) of a Burn Alert.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /1/burn_alerts/{datasetSlug}/{burnAlertId}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","required":["alert_type"],"properties":{"alert_type":{"type":"string","key$":"alert_type"}},"oneOf":[{"allOf":[{"title":"Exhaustion Time","allOf":[{},{}],"x-ref":"#/components/schemas/ExhaustionTimeBurnAlert"},{"type":"object","required":["recipients"],"properties":{"recipients":{}}}],"x-ref":"#/components/schemas/UpdateExhaustionTimeBurnAlertRequest"},{"title":"Budget Rate","allOf":[{"title":"Budget Rate","allOf":[{},{}],"x-ref":"#/components/schemas/BudgetRateBurnAlert"},{"type":"object","required":["recipients"],"properties":{"recipients":{}}}],"x-ref":"#/components/schemas/UpdateBudgetRateBurnAlertRequest"}],"discriminator":{"propertyName":"alert_type","mapping":{"exhaustion_time":"#/components/schemas/UpdateExhaustionTimeBurnAlertRequest","budget_rate":"#/components/schemas/UpdateBudgetRateBurnAlertRequest"}},"x-ref":"#/components/schemas/UpdateBurnAlertRequest","index$":1}}}},"parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"burnAlertId","description":"The unique identifier (ID) of a Burn Alert.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const burn_alert_ref01_ent = client.BurnAlert()
    let burn_alert_ref01_data = setup.data.new.burn_alert['burn_alert_ref01']
    burn_alert_ref01_data['dataset_slug'] = setup.idmap['dataset_slug01']

    burn_alert_ref01_data = (await burn_alert_ref01_ent.create(burn_alert_ref01_data)).data()
    assert(null != burn_alert_ref01_data.id)


    // LIST
    const burn_alert_ref01_match: any = {}
    burn_alert_ref01_match['dataset_slug'] = setup.idmap['dataset_slug01']

    const burn_alert_ref01_list = (await burn_alert_ref01_ent.list(burn_alert_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(burn_alert_ref01_list, { id: burn_alert_ref01_data.id })))


    // UPDATE
    const burn_alert_ref01_data_up0: any = {}
    burn_alert_ref01_data_up0.id = burn_alert_ref01_data.id
    burn_alert_ref01_data_up0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01']

    const burn_alert_ref01_markdef_up0 = { name: 'alert_type', value: 'Mark01-burn_alert_ref01_' + setup.now }
    ;(burn_alert_ref01_data_up0 as any)[burn_alert_ref01_markdef_up0.name] = burn_alert_ref01_markdef_up0.value

    const burn_alert_ref01_resdata_up0 = (await burn_alert_ref01_ent.update(burn_alert_ref01_data_up0)).data()
    assert(burn_alert_ref01_resdata_up0.id === burn_alert_ref01_data_up0.id)

    assert((burn_alert_ref01_resdata_up0 as any)[burn_alert_ref01_markdef_up0.name] === burn_alert_ref01_markdef_up0.value)


    // LOAD
    const burn_alert_ref01_match_dt0: any = {}
    burn_alert_ref01_match_dt0.id = burn_alert_ref01_data.id
    burn_alert_ref01_match_dt0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01']
    const burn_alert_ref01_data_dt0 = (await burn_alert_ref01_ent.load(burn_alert_ref01_match_dt0)).data()
    assert(burn_alert_ref01_data_dt0.id === burn_alert_ref01_data.id)


    // REMOVE
    const burn_alert_ref01_match_rm0: any = { id: burn_alert_ref01_data.id }
    burn_alert_ref01_match_rm0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01']
    await burn_alert_ref01_ent.remove(burn_alert_ref01_match_rm0)
  

    // LIST
    const burn_alert_ref01_match_rt0: any = {}
    burn_alert_ref01_match_rt0['dataset_slug'] = setup.idmap['dataset_slug01']

    const burn_alert_ref01_list_rt0 = (await burn_alert_ref01_ent.list(burn_alert_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(burn_alert_ref01_list_rt0, { id: burn_alert_ref01_data.id })))


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
      '../../../../.sdk/test/entity/burn_alert/BurnAlertTestData.json')

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
    ['burn_alert01','burn_alert02','burn_alert03','dataset_slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HONEYCOMB_TEST_BURN_ALERT_ENTID': idmap,
    'HONEYCOMB_TEST_LIVE': 'FALSE',
    'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
    'HONEYCOMB_APIKEY': '',
  })

  idmap = env['HONEYCOMB_TEST_BURN_ALERT_ENTID']

  const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HONEYCOMB_TEST_BURN_ALERT_ENTID']
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
  

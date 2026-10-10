

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


describe('TriggerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HONEYCOMB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HoneycombSDK.test()
    const ent = testsdk.Trigger()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HoneycombSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Trigger().list({"recipient_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'trigger.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"alert_type":{"a":true,"h":"Alert Type","n":"alert_type","r":false,"sh":"How often to fire an alert when a trigger threshold is crossed.","t":"`$STRING`","key$":"alert_type","index$":0},"auto_investigate":{"a":true,"h":"Auto Investigate","n":"auto_investigate","r":false,"sh":"When true, Honeycomb will automatically start an investigation when this Trigger fires.","t":"`$BOOLEAN`","key$":"auto_investigate","index$":1},"baseline_details":{"a":true,"h":"Baseline Details","n":"baseline_details","r":false,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":0},"key$":"baseline_details","index$":2},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"ro":true,"t":"`$STRING`","key$":"created_at","index$":3},"dataset_slug":{"a":true,"h":"Dataset Slug","n":"dataset_slug","r":false,"ro":true,"sh":"The slug of the dataset this trigger belongs to.","t":"`$STRING`","key$":"dataset_slug","index$":4},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"A longer description, displayed on the Trigger's detail page.","t":"`$STRING`","key$":"description","index$":5},"disabled":{"a":true,"h":"Disabled","n":"disabled","r":false,"sh":"If true, the trigger will not be evaluated and alerts will not be sent.","t":"`$BOOLEAN`","key$":"disabled","index$":6},"evaluation_schedule":{"a":true,"h":"Evaluation Schedule","n":"evaluation_schedule","r":true,"sh":"A schedule that determines when the trigger is run.","t":"`$OBJECT`","key$":"evaluation_schedule","index$":7},"evaluation_schedule_type":{"a":true,"h":"Evaluation Schedule Type","n":"evaluation_schedule_type","r":false,"sh":"The schedule type used by the trigger.","t":"`$STRING`","key$":"evaluation_schedule_type","index$":8},"frequency":{"a":true,"h":"Frequency","n":"frequency","r":false,"sh":"The interval in seconds in which to check the results of the query’s calculation against the threshold.","t":"`$INTEGER`","key$":"frequency","index$":9},"id":{"a":true,"h":"Id","n":"id","r":false,"ro":true,"sh":"The unique identifier (ID) for this Trigger.","t":"`$STRING`","key$":"id","index$":10},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"A short, human-readable name for this Trigger, which will be displayed in the UI and when the trigger fires.","t":"`$STRING`","key$":"name","index$":11},"query":{"a":true,"h":"Query","n":"query","r":false,"sh":"An inline query specification that is a strict subset of the standard Query Specification.","t":"`$OBJECT`","key$":"query","index$":12},"query_id":{"a":true,"h":"Query Id","n":"query_id","r":false,"sh":"The ID of an existing saved Query that meets the trigger query requirements.","t":"`$STRING`","key$":"query_id","index$":13},"recipients":{"a":true,"h":"Recipients","n":"recipients","r":false,"sh":"A list of [Recipients](/api/recipients/) to notify when the Trigger fires.","t":"`$ARRAY`","key$":"recipients","index$":14},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"A list of key-value pairs to help identify the Trigger.","t":"`$ARRAY`","key$":"tags","index$":15},"threshold":{"a":true,"h":"Threshold","n":"threshold","r":true,"sh":"The threshold over which the trigger will fire, specified as both an operator and a value.","t":"`$OBJECT`","key$":"threshold","index$":16},"triggered":{"a":true,"h":"Triggered","n":"triggered","r":false,"ro":true,"sh":"If true, the trigger has crossed its specified threshold without resolving.","t":"`$BOOLEAN`","key$":"triggered","index$":17},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"ro":true,"t":"`$STRING`","key$":"updated_at","index$":18}},"id":{"field":"id","from":{"dataset_slug":"dataset_slug"},"name":"id","parts":["dataset_slug","trigger_id"],"sep":"/"},"name":"trigger","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["alert_type","auto_investigate","baseline_details","created_at","dataset_slug","description","disabled","evaluation_schedule","evaluation_schedule_type","frequency","id","name","query","query_id","recipients","tags","threshold","triggered","updated_at"],"co":{"id":"POST /1/triggers/{datasetSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/1/triggers/{datasetSlug}","q":{"exist":["id"]},"r":{"param":{"datasetSlug":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"triggers"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /1/recipients/{recipientId}/triggers","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"recipient_id","or":"recipientId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/1/recipients/{recipientId}/triggers","q":{"exist":["recipient_id"]},"r":{"param":{"recipientId":"recipient_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"recipients"},{"var":"recipient_id"},{"lit":"triggers"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /1/triggers/{datasetSlug}/{triggerId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"trigger_id","or":"triggerId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/1/triggers/{datasetSlug}/{triggerId}","q":{"exist":["dataset_slug","trigger_id"]},"r":{"param":{"datasetSlug":"dataset_slug","triggerId":"trigger_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"triggers"},{"var":"dataset_slug"},{"var":"trigger_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /1/triggers/{datasetSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/1/triggers/{datasetSlug}","q":{"exist":["id"]},"r":{"param":{"datasetSlug":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"triggers"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /1/triggers/{datasetSlug}/{triggerId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"trigger_id","or":"triggerId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/1/triggers/{datasetSlug}/{triggerId}","q":{"exist":["dataset_slug","trigger_id"]},"r":{"param":{"datasetSlug":"dataset_slug","triggerId":"trigger_id"}},"s":[{"lit":"1"},{"lit":"triggers"},{"var":"dataset_slug"},{"var":"trigger_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["alert_type","auto_investigate","baseline_details","created_at","dataset_slug","description","disabled","evaluation_schedule","evaluation_schedule_type","frequency","id","name","query","query_id","recipients","tags","threshold","triggered","updated_at"],"co":{"id":"PUT /1/triggers/{datasetSlug}/{triggerId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"trigger_id","or":"triggerId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/1/triggers/{datasetSlug}/{triggerId}","q":{"exist":["dataset_slug","trigger_id"]},"r":{"param":{"datasetSlug":"dataset_slug","triggerId":"trigger_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"triggers"},{"var":"dataset_slug"},{"var":"trigger_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.recipient"]]},"key$":"trigger","name__orig":"trigger","Name":"Trigger","name_":"trigger","name-":"trigger","NAME":"TRIGGER","index$":26}, {"active":true,"entity":"trigger","key$":"BasicTriggerFlow","kind":"basic","name":"BasicTriggerFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"trigger_ref01"},"m":{"dataset_slug":"dataset_slug01","recipient_id":"recipient01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{},"m":{"recipient_id":"recipient01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"trigger_ref01"}}],"index$":0},{"a":false,"d":{"dataset_slug":"dataset_slug01"},"i":{"ref":"trigger_ref01","srcdatavar":"trigger_ref01_data","suffix":"_up0","textfield":"alert_type"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-trigger_ref01"}}],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"ref":"trigger_ref01","srcdatavar":"trigger_ref01_data","suffix":"_dt0"},"m":{"id":"trigger01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-trigger_ref01"}}],"index$":1},{"a":false,"d":{},"i":{"ref":"trigger_ref01","suffix":"_rm0"},"m":{"dataset_slug":"dataset_slug01","id":"trigger01"},"o":"remove","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"recipient_id":"recipient01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"trigger_ref01"}}],"index$":2}]}, 'Trigger', {"POST /1/triggers/{datasetSlug}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"oneOf":[{"allOf":[{"type":"object","properties":{"id":{},"dataset_slug":{},"name":{},"description":{},"tags":{},"threshold":{},"frequency":{},"alert_type":{},"disabled":{},"triggered":{},"recipients":{},"evaluation_schedule_type":{},"evaluation_schedule":{},"created_at":{},"updated_at":{},"baseline_details":{},"auto_investigate":{}},"x-ref":"#/components/schemas/BaseTrigger"},{"type":"object","properties":{"query":{}}}],"x-ref":"#/components/schemas/TriggerWithInlineQuery"},{"allOf":[{"type":"object","properties":{"id":{},"dataset_slug":{},"name":{},"description":{},"tags":{},"threshold":{},"frequency":{},"alert_type":{},"disabled":{},"triggered":{},"recipients":{},"evaluation_schedule_type":{},"evaluation_schedule":{},"created_at":{},"updated_at":{},"baseline_details":{},"auto_investigate":{}},"x-ref":"#/components/schemas/BaseTrigger"},{"type":"object","properties":{"query_id":{}}}],"x-ref":"#/components/schemas/TriggerWithQueryReference"}],"x-ref":"#/components/schemas/CreateTriggerRequest","index$":1}}},"required":true},"parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0}]},"GET /1/recipients/{recipientId}/triggers":{"protocol":"http","parameters":[{"name":"recipientId","description":"Unique identifier (ID) of a Recipient.","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/recipientId","index$":0}]},"GET /1/triggers/{datasetSlug}/{triggerId}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"triggerId","description":"The unique identifier (ID) of a Trigger.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /1/triggers/{datasetSlug}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0}]},"DELETE /1/triggers/{datasetSlug}/{triggerId}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"triggerId","description":"The unique identifier (ID) of a Trigger.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /1/triggers/{datasetSlug}/{triggerId}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"allOf":[{"allOf":[{"type":"object","properties":{"id":{},"dataset_slug":{},"name":{},"description":{},"tags":{},"threshold":{},"frequency":{},"alert_type":{},"disabled":{},"triggered":{},"recipients":{},"evaluation_schedule_type":{},"evaluation_schedule":{},"created_at":{},"updated_at":{},"baseline_details":{},"auto_investigate":{}},"x-ref":"#/components/schemas/BaseTrigger"},{"type":"object","properties":{"query":{}}}],"x-ref":"#/components/schemas/TriggerWithInlineQuery"},{"allOf":[{"type":"object","properties":{"id":{},"dataset_slug":{},"name":{},"description":{},"tags":{},"threshold":{},"frequency":{},"alert_type":{},"disabled":{},"triggered":{},"recipients":{},"evaluation_schedule_type":{},"evaluation_schedule":{},"created_at":{},"updated_at":{},"baseline_details":{},"auto_investigate":{}},"x-ref":"#/components/schemas/BaseTrigger"},{"type":"object","properties":{"query_id":{}}}],"x-ref":"#/components/schemas/TriggerWithQueryReference"}],"x-ref":"#/components/schemas/TriggerResponse","index$":1}}},"required":true},"parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"triggerId","description":"The unique identifier (ID) of a Trigger.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let trigger_ref01_data = Object.values(setup.data.existing.trigger)[0] as any

    // LIST
    const trigger_ref01_ent = client.Trigger()
    const trigger_ref01_match: any = {}
    trigger_ref01_match['recipient_id'] = setup.idmap['recipient01']

    const trigger_ref01_list = (await trigger_ref01_ent.list(trigger_ref01_match)).map((e: any) => e.data())


    // LOAD
    const trigger_ref01_match_dt0: any = {}
    trigger_ref01_match_dt0.id = trigger_ref01_data.id
    const trigger_ref01_data_dt0 = (await trigger_ref01_ent.load(trigger_ref01_match_dt0)).data()
    assert(trigger_ref01_data_dt0.id === trigger_ref01_data.id)


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
      '../../../../.sdk/test/entity/trigger/TriggerTestData.json')

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
    ['trigger01','trigger02','trigger03','recipient01','recipient02','recipient03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HONEYCOMB_TEST_TRIGGER_ENTID': idmap,
    'HONEYCOMB_TEST_LIVE': 'FALSE',
    'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
    'HONEYCOMB_APIKEY': '',
  })

  idmap = env['HONEYCOMB_TEST_TRIGGER_ENTID']

  const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HONEYCOMB_TEST_TRIGGER_ENTID']
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
  

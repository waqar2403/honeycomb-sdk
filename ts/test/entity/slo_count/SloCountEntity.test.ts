

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


describe('SloCountEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HONEYCOMB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HoneycombSDK.test()
    const ent = testsdk.SloCount()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HoneycombSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SloCount().list({"dataset_slug":1,"slo_id":"x","end_time":1,"start_time":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'slo_count.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"error_count":{"a":true,"h":"Error Count","n":"error_count","r":false,"ro":true,"sh":"Number of failed (bad) events in this window.","t":"`$INTEGER`","key$":"error_count","index$":0},"is_partial":{"a":true,"h":"Is Partial","n":"is_partial","r":false,"ro":true,"sh":"When `true`, the data for this window may be incomplete.","t":"`$BOOLEAN`","key$":"is_partial","index$":1},"total_count":{"a":true,"h":"Total Count","n":"total_count","r":false,"ro":true,"sh":"Total number of events (good + bad) in this window.","t":"`$INTEGER`","key$":"total_count","index$":2},"window_end":{"a":true,"h":"Window End","n":"window_end","r":false,"ro":true,"sh":"End of the window as a Unix timestamp (seconds).","t":"`$INTEGER`","key$":"window_end","index$":3},"window_start":{"a":true,"h":"Window Start","n":"window_start","r":false,"ro":true,"sh":"Start of the window as a Unix timestamp (seconds).","t":"`$INTEGER`","key$":"window_start","index$":4}},"name":"slo_count","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /1/slos/{datasetSlug}/{sloId}/counts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"slo_id","or":"sloId","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":1745254740,"k":"query","n":"end_time","or":"end_time","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1745251200,"k":"query","n":"start_time","or":"start_time","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/1/slos/{datasetSlug}/{sloId}/counts","q":{"exist":["dataset_slug","end_time","slo_id","start_time"]},"r":{"param":{"datasetSlug":"dataset_slug","sloId":"slo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"slos"},{"var":"dataset_slug"},{"var":"slo_id"},{"lit":"counts"}],"t":{"req":"`reqdata`","res":"`body.windows`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.slo"]]},"key$":"slo_count","name__orig":"slo_count","Name":"SloCount","name_":"slo_count","name-":"slo-count","NAME":"SLO_COUNT","index$":24}, {"active":true,"entity":"slo_count","key$":"BasicSloCountFlow","kind":"basic","name":"BasicSloCountFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"dataset_slug":"dataset_slug01","slo_id":"slo01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"slo_count_ref01"}}],"index$":0}]}, 'SloCount', {"GET /1/slos/{datasetSlug}/{sloId}/counts":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"sloId","description":"Unique identifier (ID) of the SLO.","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"in":"query","name":"start_time","required":true,"schema":{"type":"integer"},"description":"Start of the time range as a Unix timestamp (seconds). Must be within the last 24 hours and no later than `end_time`.\n","example":1745251200,"index$":2},{"in":"query","name":"end_time","required":true,"schema":{"type":"integer"},"description":"End of the time range as a Unix timestamp (seconds). Must be greater than `start_time` and within the same clock hour as `start_time`. Realtime counts accumulate from the start of each hour and reset at hour boundaries; use the [Get SLO Hourly Counts History endpoint](/api/slos/get-slo-hourly-counts-history) for completed hours.\n","example":1745254740,"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let slo_count_ref01_data = Object.values(setup.data.existing.slo_count)[0] as any

    // LIST
    const slo_count_ref01_ent = client.SloCount()
    const slo_count_ref01_match: any = {}
    slo_count_ref01_match['dataset_slug'] = setup.idmap['dataset_slug01']
    slo_count_ref01_match['slo_id'] = setup.idmap['slo01']

    const slo_count_ref01_list = (await slo_count_ref01_ent.list(slo_count_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/slo_count/SloCountTestData.json')

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
    ['slo_count01','slo_count02','slo_count03','slo01','slo02','slo03','dataset_slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HONEYCOMB_TEST_SLO_COUNT_ENTID': idmap,
    'HONEYCOMB_TEST_LIVE': 'FALSE',
    'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
    'HONEYCOMB_APIKEY': '',
  })

  idmap = env['HONEYCOMB_TEST_SLO_COUNT_ENTID']

  const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HONEYCOMB_TEST_SLO_COUNT_ENTID']
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
  

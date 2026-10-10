

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


describe('SloHistoryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HONEYCOMB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HoneycombSDK.test()
    const ent = testsdk.SloHistory()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HoneycombSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SloHistory().create({"end_time":"x","ids":"x","start_time":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'slo_history.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"end_time":{"a":true,"h":"End Time","n":"end_time","r":true,"sh":"The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for.","t":"`$INTEGER`","key$":"end_time","index$":0},"ids":{"a":true,"h":"Ids","n":"ids","r":true,"sh":"A list of SLO IDs to retrieve history for.","t":"`$ARRAY`","key$":"ids","index$":1},"start_time":{"a":true,"h":"Start Time","n":"start_time","r":true,"sh":"The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for.","t":"`$INTEGER`","key$":"start_time","index$":2}},"name":"slo_history","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["end_time","ids","start_time"],"co":{"id":"POST /1/reporting/slos/historical","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/1/reporting/slos/historical","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"reporting"},{"lit":"slos"},{"lit":"historical"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"slo_history","name__orig":"slo_history","Name":"SloHistory","name_":"slo_history","name-":"slo-history","NAME":"SLO_HISTORY","index$":25}, {"active":true,"entity":"slo_history","key$":"BasicSloHistoryFlow","kind":"basic","name":"BasicSloHistoryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"slo_history_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'SloHistory', {"POST /1/reporting/slos/historical":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","required":["ids","start_time","end_time"],"properties":{"ids":{"type":"array","description":"A list of SLO IDs to retrieve history for. Cannot be an empty array or more than 24 in length.\n","minItems":1,"maxItems":24,"example":["2LBq9LckbcA","CzcpPs7cJ4d"],"key$":"ids"},"start_time":{"type":"integer","description":"The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for. Cannot be more than a year in the past.","example":1742230800,"key$":"start_time"},"end_time":{"type":"integer","description":"The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for. Must be greater than `start_time`. Cannot be a future timestamp.","example":1745254800,"key$":"end_time"}},"x-ref":"#/components/schemas/SLOHistoryRequest","index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const slo_history_ref01_ent = client.SloHistory()
    let slo_history_ref01_data = setup.data.new.slo_history['slo_history_ref01']

    slo_history_ref01_data = (await slo_history_ref01_ent.create(slo_history_ref01_data)).data()
    assert(null != slo_history_ref01_data)


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
      '../../../../.sdk/test/entity/slo_history/SloHistoryTestData.json')

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
    ['slo_history01','slo_history02','slo_history03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HONEYCOMB_TEST_SLO_HISTORY_ENTID': idmap,
    'HONEYCOMB_TEST_LIVE': 'FALSE',
    'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
    'HONEYCOMB_APIKEY': '',
  })

  idmap = env['HONEYCOMB_TEST_SLO_HISTORY_ENTID']

  const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HONEYCOMB_TEST_SLO_HISTORY_ENTID']
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
  

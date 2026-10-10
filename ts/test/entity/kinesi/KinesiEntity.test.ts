

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


describe('KinesiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HONEYCOMB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HoneycombSDK.test()
    const ent = testsdk.Kinesi()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HoneycombSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Kinesi().create({"dataset_slug":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'kinesi.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"errorMessage":{"a":true,"h":"Error Message","n":"errorMessage","r":false,"t":"`$STRING`","key$":"errorMessage","index$":0},"records":{"a":true,"h":"Records","n":"records","r":false,"t":"`$ARRAY`","key$":"records","index$":1},"requestId":{"a":true,"h":"Request Id","n":"requestId","r":false,"t":"`$STRING`","key$":"requestId","index$":2},"timestamp":{"a":true,"h":"Timestamp","n":"timestamp","r":false,"t":"`$INTEGER`","key$":"timestamp","index$":3}},"name":"kinesi","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["records","requestId","timestamp"],"co":{"id":"POST /1/kinesis_events/{datasetSlug}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"33658b45-a8f1-4007-92e8-f601ae33db14","k":"header","n":"x_amz_firehose_request_id","or":"X-Amz-Firehose-Request-Id","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/1/kinesis_events/{datasetSlug}","q":{"exist":["dataset_slug","x_amz_firehose_request_id"]},"r":{"param":{"datasetSlug":"dataset_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"kinesis_events"},{"var":"dataset_slug"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"kinesi","name__orig":"kinesi","Name":"Kinesi","name_":"kinesi","name-":"kinesi","NAME":"KINESI","index$":13}, {"active":true,"entity":"kinesi","key$":"BasicKinesiFlow","kind":"basic","name":"BasicKinesiFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"kinesi_ref01"},"m":{"dataset_slug":"dataset_slug01"},"o":"create","s":[],"v":[],"index$":0}]}, 'Kinesi', {"POST /1/kinesis_events/{datasetSlug}":{"protocol":"http","requestBody":{"description":"The request body expected from Amazon Kinesis Firehose. Events and metrics have the same shape but the base64 encoded data blob for metrics is expected to be Protowire-encoded as well. CloudWatch Logs data coming through Amazon Kinesis Firehose is expected to have a gzip Content-Encoding.\n","content":{"application/json":{"schema":{"type":"object","properties":{"requestId":{"type":"string","key$":"requestId"},"timestamp":{"type":"integer","key$":"timestamp"},"records":{"type":"array","items":{"type":"object","properties":{"data":{"type":"string","description":"Base64 encoded Kinesis record from AWS"}},"x-ref":"#/components/schemas/KinesisEventRecord"},"key$":"records"}},"x-ref":"#/components/schemas/KinesisEvent","index$":1}}},"required":true},"parameters":[{"in":"header","name":"X-Amz-Firehose-Request-Id","description":"AWS Request ID associated with the Kinesis Firehose.\n","schema":{"type":"string"},"required":true,"example":"33658b45-a8f1-4007-92e8-f601ae33db14","index$":0},{"name":"datasetSlug","description":"The dataset slug.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlug","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const kinesi_ref01_ent = client.Kinesi()
    let kinesi_ref01_data = setup.data.new.kinesi['kinesi_ref01']
    kinesi_ref01_data['dataset_slug'] = setup.idmap['dataset_slug01']

    kinesi_ref01_data = (await kinesi_ref01_ent.create(kinesi_ref01_data)).data()
    assert(null != kinesi_ref01_data)


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
      '../../../../.sdk/test/entity/kinesi/KinesiTestData.json')

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
    ['kinesi01','kinesi02','kinesi03','dataset_slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HONEYCOMB_TEST_KINESI_ENTID': idmap,
    'HONEYCOMB_TEST_LIVE': 'FALSE',
    'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
    'HONEYCOMB_APIKEY': '',
  })

  idmap = env['HONEYCOMB_TEST_KINESI_ENTID']

  const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HONEYCOMB_TEST_KINESI_ENTID']
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
  

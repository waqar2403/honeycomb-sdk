

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


describe('AuthEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HONEYCOMB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HoneycombSDK.test()
    const ent = testsdk.Auth()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HoneycombSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Auth().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'auth.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"api_key_access":{"a":true,"h":"Api Key Access","n":"api_key_access","r":true,"t":"`$OBJECT`","key$":"api_key_access","index$":0},"environment":{"a":true,"h":"Environment","n":"environment","r":true,"t":"`$OBJECT`","key$":"environment","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Unique identifier (ID) of the API Key.","t":"`$STRING`","key$":"id","index$":2},"team":{"a":true,"h":"Team","n":"team","r":true,"t":"`$OBJECT`","key$":"team","index$":3},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"The type of API Key.","t":"`$STRING`","key$":"type","index$":4}},"id":{"field":"id","name":"id"},"name":"auth","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /1/auth","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/1/auth","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"auth"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /2/auth","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/2/auth","q":{},"r":{},"rs":{"kind":"json","media":"application/vnd.api+json"},"s":[{"lit":"2"},{"lit":"auth"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"auth","name__orig":"auth","Name":"Auth","name_":"auth","name-":"auth","NAME":"AUTH","index$":0}, {"active":true,"entity":"auth","key$":"BasicAuthFlow","kind":"basic","name":"BasicAuthFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"auth_ref01","srcdatavar":"auth_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-auth_ref01"}}],"index$":0}]}, 'Auth', {"GET /1/auth":{"protocol":"http","parameters":[]},"GET /2/auth":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let auth_ref01_data = Object.values(setup.data.existing.auth)[0] as any

    // LOAD
    const auth_ref01_ent = client.Auth()
    const auth_ref01_match_dt0: any = {}
    auth_ref01_match_dt0.id = auth_ref01_data.id
    const auth_ref01_data_dt0 = (await auth_ref01_ent.load(auth_ref01_match_dt0)).data()
    assert(auth_ref01_data_dt0.id === auth_ref01_data.id)


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
      '../../../../.sdk/test/entity/auth/AuthTestData.json')

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
    ['auth01','auth02','auth03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HONEYCOMB_TEST_AUTH_ENTID': idmap,
    'HONEYCOMB_TEST_LIVE': 'FALSE',
    'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
    'HONEYCOMB_APIKEY': '',
  })

  idmap = env['HONEYCOMB_TEST_AUTH_ENTID']

  const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HONEYCOMB_TEST_AUTH_ENTID']
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
  

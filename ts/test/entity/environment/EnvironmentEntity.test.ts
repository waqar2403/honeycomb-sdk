

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


describe('EnvironmentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HONEYCOMB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HoneycombSDK.test()
    const ent = testsdk.Environment()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HoneycombSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Environment().load({"id":1,"team_slug":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'environment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":true,"t":"`$OBJECT`","key$":"data","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1}},"id":{"field":"id","name":"id"},"name":"environment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["data"],"co":{"id":"POST /2/teams/{teamSlug}/environments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"team_slug","or":"teamSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/2/teams/{teamSlug}/environments","q":{"exist":["team_slug"]},"r":{"param":{"teamSlug":"team_slug"}},"rb":{"kind":"json","media":"application/vnd.api+json"},"rs":{"kind":"json","media":"application/vnd.api+json"},"s":[{"lit":"2"},{"lit":"teams"},{"var":"team_slug"},{"lit":"environments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /2/teams/{teamSlug}/environments/{ID}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"ID","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"team_slug","or":"teamSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/2/teams/{teamSlug}/environments/{ID}","q":{"exist":["id","team_slug"]},"r":{"param":{"ID":"id","teamSlug":"team_slug"}},"rs":{"kind":"json","media":"application/vnd.api+json"},"s":[{"lit":"2"},{"lit":"teams"},{"var":"team_slug"},{"lit":"environments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /2/teams/{teamSlug}/environments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"team_slug","or":"teamSlug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"eyxJjcmAVhdGVkX","k":"query","n":"page_after","or":"page[after]","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":10,"k":"query","n":"page_size","or":"page[size]","r":false,"t":"`$NUMBER`","index$":1}]},"k":"http","m":"GET","o":"/2/teams/{teamSlug}/environments","q":{"exist":["team_slug"]},"r":{"param":{"teamSlug":"team_slug"}},"rs":{"kind":"json","media":"application/vnd.api+json"},"s":[{"lit":"2"},{"lit":"teams"},{"var":"team_slug"},{"lit":"environments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /2/teams/{teamSlug}/environments/{ID}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"ID","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"team_slug","or":"teamSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/2/teams/{teamSlug}/environments/{ID}","q":{"exist":["id","team_slug"]},"r":{"param":{"ID":"id","teamSlug":"team_slug"}},"s":[{"lit":"2"},{"lit":"teams"},{"var":"team_slug"},{"lit":"environments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["data"],"co":{"id":"PATCH /2/teams/{teamSlug}/environments/{ID}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"ID","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"team_slug","or":"teamSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/2/teams/{teamSlug}/environments/{ID}","q":{"exist":["id","team_slug"]},"r":{"param":{"ID":"id","teamSlug":"team_slug"}},"rb":{"kind":"json","media":"application/vnd.api+json"},"rs":{"kind":"json","media":"application/vnd.api+json"},"s":[{"lit":"2"},{"lit":"teams"},{"var":"team_slug"},{"lit":"environments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"environment","name__orig":"environment","Name":"Environment","name_":"environment","name-":"environment","NAME":"ENVIRONMENT","index$":9}, {"active":true,"entity":"environment","key$":"BasicEnvironmentFlow","kind":"basic","name":"BasicEnvironmentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"environment_ref01"},"m":{"team_slug":"team_slug01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{"team_slug":"team_slug01"},"i":{"ref":"environment_ref01","srcdatavar":"environment_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-environment_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"environment_ref01","srcdatavar":"environment_ref01_data","suffix":"_dt0"},"m":{"id":"environment01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-environment_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"environment_ref01","suffix":"_rm0"},"m":{"id":"environment01","team_slug":"team_slug01"},"o":"remove","s":[],"v":[],"index$":3}]}, 'Environment', {"POST /2/teams/{teamSlug}/environments":{"protocol":"http","requestBody":{"required":true,"content":{"application/vnd.api+json":{"schema":{"type":"object","required":["data"],"properties":{"data":{"type":"object","required":["type","attributes"],"properties":{"type":{"type":"string","enum":["environments"]},"attributes":{"type":"object","required":["name"],"properties":{"name":{},"description":{},"color":{}}}},"key$":"data"}},"x-ref":"#/components/schemas/CreateEnvironmentRequest","index$":1}}}},"parameters":[{"name":"teamSlug","description":"The slug of the Team","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/teamSlug","index$":0}]},"GET /2/teams/{teamSlug}/environments/{ID}":{"protocol":"http","parameters":[{"name":"teamSlug","description":"The slug of the Team","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/teamSlug","index$":0},{"name":"ID","description":"A unique identifier","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/ID","index$":1}]},"GET /2/teams/{teamSlug}/environments":{"protocol":"http","parameters":[{"name":"teamSlug","description":"The slug of the Team","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/teamSlug","index$":0},{"name":"page[after]","description":"The string value of the `next` attribute from a previous result page.\nThe cursor value must be empty or omitted for the first request of a cursor-paginated query.\n","in":"query","schema":{"type":"string"},"example":"eyxJjcmAVhdGVkX","x-ref":"#/components/parameters/PaginationCursor","index$":1},{"name":"page[size]","description":"The number of entries to include per response. Maximum value is 100.","in":"query","schema":{"type":"number","minimum":1,"maximum":100,"default":20},"example":10,"x-ref":"#/components/parameters/PaginationSize","index$":2}]},"DELETE /2/teams/{teamSlug}/environments/{ID}":{"protocol":"http","parameters":[{"name":"teamSlug","description":"The slug of the Team","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/teamSlug","index$":0},{"name":"ID","description":"A unique identifier","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/ID","index$":1}]},"PATCH /2/teams/{teamSlug}/environments/{ID}":{"protocol":"http","requestBody":{"required":true,"content":{"application/vnd.api+json":{"schema":{"type":"object","required":["data"],"properties":{"data":{"type":"object","required":["id","type","attributes"],"properties":{"id":{"type":"string"},"type":{"type":"string","enum":["environments"]},"attributes":{"type":"object","properties":{"description":{},"color":{},"settings":{}}}},"key$":"data"}},"x-ref":"#/components/schemas/UpdateEnvironmentRequest","index$":1}}}},"parameters":[{"name":"teamSlug","description":"The slug of the Team","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/teamSlug","index$":0},{"name":"ID","description":"A unique identifier","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/ID","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const environment_ref01_ent = client.Environment()
    let environment_ref01_data = setup.data.new.environment['environment_ref01']
    environment_ref01_data['team_slug'] = setup.idmap['team_slug01']

    environment_ref01_data = (await environment_ref01_ent.create(environment_ref01_data)).data()
    assert(null != environment_ref01_data.id)


    // UPDATE
    const environment_ref01_data_up0: any = {}
    environment_ref01_data_up0.id = environment_ref01_data.id
    environment_ref01_data_up0['team_slug'] = setup.idmap['team_slug'] ?? setup.idmap['team_slug01']

    const environment_ref01_resdata_up0 = (await environment_ref01_ent.update(environment_ref01_data_up0)).data()
    assert(environment_ref01_resdata_up0.id === environment_ref01_data_up0.id)


    // LOAD
    const environment_ref01_match_dt0: any = {}
    environment_ref01_match_dt0.id = environment_ref01_data.id
    const environment_ref01_data_dt0 = (await environment_ref01_ent.load(environment_ref01_match_dt0)).data()
    assert(environment_ref01_data_dt0.id === environment_ref01_data.id)


    // REMOVE
    const environment_ref01_match_rm0: any = { id: environment_ref01_data.id }
    environment_ref01_match_rm0['team_slug'] = setup.idmap['team_slug'] ?? setup.idmap['team_slug01']
    await environment_ref01_ent.remove(environment_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/environment/EnvironmentTestData.json')

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
    ['environment01','environment02','environment03','team_slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HONEYCOMB_TEST_ENVIRONMENT_ENTID': idmap,
    'HONEYCOMB_TEST_LIVE': 'FALSE',
    'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
    'HONEYCOMB_APIKEY': '',
  })

  idmap = env['HONEYCOMB_TEST_ENVIRONMENT_ENTID']

  const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HONEYCOMB_TEST_ENVIRONMENT_ENTID']
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
  

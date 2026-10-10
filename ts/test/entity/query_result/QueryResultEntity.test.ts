

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


describe('QueryResultEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HONEYCOMB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HoneycombSDK.test()
    const ent = testsdk.QueryResult()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HoneycombSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.QueryResult().load({"dataset_slug":1,"query_result_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'query_result.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"complete":{"a":true,"h":"Complete","n":"complete","r":false,"ro":true,"sh":"Indicates if the query results are available yet or not.","t":"`$BOOLEAN`","key$":"complete","index$":0},"data":{"a":true,"h":"Data","n":"data","r":false,"sh":"An object containing the query result data","t":"`$OBJECT`","key$":"data","index$":1},"disable_other_by_aggregate":{"a":true,"h":"Disable Other By Aggregate","n":"disable_other_by_aggregate","r":false,"sh":"If true, the \"other_by_aggregate\" data is excluded from the query result.","t":"`$BOOLEAN`","wo":true,"key$":"disable_other_by_aggregate","index$":2},"disable_series":{"a":true,"h":"Disable Series","n":"disable_series","r":false,"sh":"If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field.","t":"`$BOOLEAN`","wo":true,"key$":"disable_series","index$":3},"disable_total_by_aggregate":{"a":true,"h":"Disable Total By Aggregate","n":"disable_total_by_aggregate","r":false,"sh":"If `true`, data representing each aggregate in the query's total value will not be returned.","t":"`$BOOLEAN`","wo":true,"key$":"disable_total_by_aggregate","index$":4},"error":{"a":true,"h":"Error","n":"error","r":false,"ro":true,"sh":"Only present if the query failed to run.","t":"`$STRING`","key$":"error","index$":5},"id":{"a":true,"h":"Id","n":"id","r":false,"ro":true,"sh":"The unique identifier (ID) of a Query Result","t":"`$STRING`","key$":"id","index$":6},"limit":{"a":true,"h":"Limit","n":"limit","r":false,"sh":"If `disable_series` is `true`, a limit may be optionally given.","t":"`$INTEGER`","wo":true,"key$":"limit","index$":7},"links":{"a":true,"h":"Links","n":"links","r":false,"sh":"An object containing UI links to the query result and query result graph","t":"`$OBJECT`","key$":"links","index$":8},"query":{"a":true,"h":"Query","n":"query","r":false,"ro":true,"t":"`$ANY`","union":{"branches":5,"count":2,"depth":10},"key$":"query","index$":9},"query_id":{"a":true,"h":"Query Id","n":"query_id","r":true,"sh":"The ID of a query returned from the [Queries endpoint](/api/queries/).","t":"`$STRING`","wo":true,"key$":"query_id","index$":10}},"id":{"field":"id","name":"id","parts":["dataset_slug","query_result_id"],"sep":"/"},"name":"query_result","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["disable_other_by_aggregate","disable_series","disable_total_by_aggregate","limit","query_id"],"co":{"id":"POST /1/query_results/{datasetSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/1/query_results/{datasetSlug}","q":{"exist":["id"]},"r":{"param":{"datasetSlug":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"query_results"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /1/query_results/{datasetSlug}/{queryResultId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"query_result_id","or":"queryResultId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/1/query_results/{datasetSlug}/{queryResultId}","q":{"exist":["dataset_slug","query_result_id"]},"r":{"param":{"datasetSlug":"dataset_slug","queryResultId":"query_result_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"query_results"},{"var":"dataset_slug"},{"var":"query_result_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"query_result","name__orig":"query_result","Name":"QueryResult","name_":"query_result","name-":"query-result","NAME":"QUERY_RESULT","index$":19}, {"active":true,"entity":"query_result","key$":"BasicQueryResultFlow","kind":"basic","name":"BasicQueryResultFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"query_result_ref01"},"m":{"dataset_slug":"dataset_slug01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"query_result_ref01","srcdatavar":"query_result_ref01_data","suffix":"_dt0"},"m":{"dataset_slug":"dataset_slug01","id":"query_result01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-query_result_ref01"}}],"unreachable":true}]}, 'QueryResult', {"POST /1/query_results/{datasetSlug}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","description":"A Query Result is created with the Query ID.","required":["query_id"],"properties":{"query_id":{"type":"string","writeOnly":true,"description":"The ID of a query returned from the [Queries endpoint](/api/queries/).\n","example":"mabAMpSPDjH","key$":"query_id"},"disable_series":{"type":"boolean","writeOnly":true,"description":"If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field.\n","default":false,"key$":"disable_series"},"disable_total_by_aggregate":{"type":"boolean","writeOnly":true,"description":"If `true`, data representing each aggregate in the query's total value will not be returned. Ensure `disable_series` is false to return the timeseries data.\n","default":true,"key$":"disable_total_by_aggregate"},"disable_other_by_aggregate":{"type":"boolean","default":true,"writeOnly":true,"description":"If true, the \"other_by_aggregate\" data is excluded from the query result.\n","key$":"disable_other_by_aggregate"},"limit":{"type":"integer","writeOnly":true,"maximum":10000,"description":"If `disable_series` is `true`, a limit may be optionally given. The limit will override the default limit of 1_000 results with a maximum available limit of 10_000. If `disable_series` is `false`, this field will be ignored.\n","key$":"limit"}},"x-ref":"#/components/schemas/CreateQueryResultRequest","index$":1}}},"required":true},"parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0}]},"GET /1/query_results/{datasetSlug}/{queryResultId}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"queryResultId","description":"The unique identifier (ID) of the query result.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let query_result_ref01_data = Object.values(setup.data.existing.query_result)[0] as any

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
      '../../../../.sdk/test/entity/query_result/QueryResultTestData.json')

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
    ['query_result01','query_result02','query_result03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HONEYCOMB_TEST_QUERY_RESULT_ENTID': idmap,
    'HONEYCOMB_TEST_LIVE': 'FALSE',
    'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
    'HONEYCOMB_APIKEY': '',
  })

  idmap = env['HONEYCOMB_TEST_QUERY_RESULT_ENTID']

  const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HONEYCOMB_TEST_QUERY_RESULT_ENTID']
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
  



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


describe('QueryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HONEYCOMB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HoneycombSDK.test()
    const ent = testsdk.Query()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HoneycombSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Query().load({"dataset_slug":1,"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'query.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"breakdowns":{"a":true,"h":"Breakdowns","n":"breakdowns","r":false,"sh":"the columns by which to break events down into groups","t":"`$ARRAY`","key$":"breakdowns","index$":0},"calculated_fields":{"a":true,"h":"Calculated Fields","n":"calculated_fields","r":false,"sh":"Computed properties that are calculated by a formula.","t":"`$ARRAY`","key$":"calculated_fields","index$":1},"calculations":{"a":true,"h":"Calculations","n":"calculations","r":false,"sh":"the calculations to return as a time series and summary table","t":"`$ARRAY`","union":{"branches":5,"count":1,"depth":6},"key$":"calculations","index$":2},"compare_time_offset_seconds":{"a":true,"h":"Compare Time Offset Seconds","n":"compare_time_offset_seconds","r":false,"sh":"When set, offsets the query's time range by this number of seconds into the past, allowing comparison with historical data from an earlier time period.","t":"`$INTEGER`","key$":"compare_time_offset_seconds","index$":3},"end_time":{"a":true,"h":"End Time","n":"end_time","r":false,"sh":"Absolute end time of query, in seconds since UNIX epoch.","t":"`$INTEGER`","key$":"end_time","index$":4},"filter_combination":{"a":true,"h":"Filter Combination","n":"filter_combination","r":false,"sh":"Set to \"OR\" to match ANY filter in the filter list","t":"`$STRING`","key$":"filter_combination","index$":5},"filters":{"a":true,"h":"Filters","n":"filters","r":false,"sh":"The filters with which to restrict the considered events","t":"`$ARRAY`","union":{"branches":5,"count":1,"depth":3},"key$":"filters","index$":6},"formulas":{"a":true,"h":"Formulas","n":"formulas","r":false,"sh":"Mathematical formulas to be returned as a time series and summary table.","t":"`$ARRAY`","key$":"formulas","index$":7},"granularity":{"a":true,"h":"Granularity","n":"granularity","r":false,"sh":"The time resolution of the query's graph, in seconds.","t":"`$INTEGER`","key$":"granularity","index$":8},"havings":{"a":true,"h":"Havings","n":"havings","r":false,"sh":"The Having clause allows you to filter on the results table.","t":"`$ARRAY`","key$":"havings","index$":9},"id":{"a":true,"h":"Id","n":"id","r":false,"ro":true,"t":"`$STRING`","key$":"id","index$":10},"limit":{"a":true,"h":"Limit","n":"limit","r":false,"sh":"The maximum number of unique groups returned in 'results'.","t":"`$INTEGER`","key$":"limit","index$":11},"orders":{"a":true,"h":"Orders","n":"orders","r":false,"sh":"The terms on which to order the query results.","t":"`$ARRAY`","key$":"orders","index$":12},"start_time":{"a":true,"h":"Start Time","n":"start_time","r":false,"sh":"Absolute start time of query, in seconds since UNIX epoch.","t":"`$INTEGER`","key$":"start_time","index$":13},"time_range":{"a":true,"h":"Time Range","n":"time_range","r":false,"sh":"Time range of query in seconds.","t":"`$INTEGER`","key$":"time_range","index$":14},"usage_mode":{"a":true,"h":"Usage Mode","n":"usage_mode","r":false,"sh":"If `true`, query results will return aggregates without correcting for sample rates.","t":"`$BOOLEAN`","key$":"usage_mode","index$":15}},"id":{"field":"id","from":{"id":"id"},"name":"id","parts":["dataset_slug","id"],"sep":"/"},"name":"query","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["breakdowns","calculated_fields","calculations","compare_time_offset_seconds","end_time","filter_combination","filters","formulas","granularity","havings","id","limit","orders","start_time","time_range","usage_mode"],"co":{"id":"POST /1/queries/{datasetSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/1/queries/{datasetSlug}","q":{"exist":["dataset_slug"]},"r":{"param":{"datasetSlug":"dataset_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"queries"},{"var":"dataset_slug"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /1/queries/{datasetSlug}/{queryId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"dataset_slug","or":"datasetSlug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"queryId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/1/queries/{datasetSlug}/{queryId}","q":{"exist":["dataset_slug","id"]},"r":{"param":{"datasetSlug":"dataset_slug","queryId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"queries"},{"var":"dataset_slug"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"query","name__orig":"query","Name":"Query","name_":"query","name-":"query","NAME":"QUERY","index$":18}, {"active":true,"entity":"query","key$":"BasicQueryFlow","kind":"basic","name":"BasicQueryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"query_ref01"},"m":{"dataset_slug":"dataset_slug01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"query_ref01","srcdatavar":"query_ref01_data","suffix":"_dt0"},"m":{"dataset_slug":"dataset_slug01","id":"query01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-query_ref01"}}],"index$":1}]}, 'Query', {"POST /1/queries/{datasetSlug}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","readOnly":true,"key$":"id"},"breakdowns":{"type":"array","default":["user_agent"],"maxItems":100,"items":{"type":"string"},"description":"the columns by which to break events down into groups","key$":"breakdowns"},"calculations":{"type":"array","description":"the calculations to return as a time series and summary table","maxItems":100,"items":{"type":"object","required":["op"],"properties":{"op":{"allOf":[]},"column":{"type":[],"description":"The name of the column"},"name":{"type":[],"description":"The name of the calculation. This is required if using calculation filters. Only available in Metrics Beta."},"filters":{"type":"array","maxItems":100,"items":{},"description":"The filters with which to restrict the results of this particular calculation. Does not support relational fields. Only available in Metrics Beta."},"filter_combination":{"type":"string","default":"AND","enum":[],"description":"Set to \"OR\" to match ANY filter in the filter list","x-ref":"#/components/schemas/FilterCombination"}}},"key$":"calculations"},"filters":{"type":"array","maxItems":100,"items":{"type":"object","required":["column","op"],"properties":{"op":{"type":"string","enum":[],"x-ref":"#/components/schemas/FilterOp"},"column":{"type":[],"x-ref":"#/components/schemas/FilterColumn"},"value":{"anyOf":[],"x-ref":"#/components/schemas/FilterValue"}}},"description":"The filters with which to restrict the considered events","key$":"filters"},"filter_combination":{"type":"string","default":"AND","enum":["AND","OR"],"description":"Set to \"OR\" to match ANY filter in the filter list","x-ref":"#/components/schemas/FilterCombination","key$":"filter_combination"},"formulas":{"type":"array","description":"Mathematical formulas to be returned as a time series and summary table. Formulas operate on the results of calculations and are returned in query results instead of calculations. Only available in Metrics Beta.","maxItems":100,"items":{"type":"object","required":["name","expression"],"properties":{"name":{"type":[],"description":"The name of the formula"},"expression":{"type":[],"description":"An expression that follows the same syntax as calculated field expressions, but uses the names of items in the calculations list in place of column names."}}},"key$":"formulas"},"granularity":{"type":"integer","minimum":1,"description":"The time resolution of the query's graph, in seconds. Given a query time range T, valid values (T/1000...T/1). If left blank, granularity may be set to a sub-second value for queries with short time ranges.\n","key$":"granularity"},"orders":{"type":"array","maxItems":100,"items":{"type":"object","properties":{"column":{"type":"string"},"op":{"type":"string","enum":[],"x-ref":"#/components/schemas/QueryOp"},"order":{"type":"string","default":"ascending","enum":[]}}},"description":"The terms on which to order the query results. Each term must appear in the `breakdowns` field, the `calculations` field, or the `formulas` field. Formulas and calculations with name properties can be referenced by putting the name in the column property.\n","key$":"orders"},"limit":{"type":"integer","default":100,"minimum":1,"maximum":10000,"description":"The maximum number of unique groups returned in 'results'. Aggregating many unique groups across a large time range is computationally expensive, and too high a limit with too many unique groups may cause queries to fail completely. Limiting the results to only the needed values can significantly speed up queries.\nThe normal allowed maximum value when creating a query is 1_000. When running 'disable_series' queries, this can be overridden to be up to 10_000, so the maximum value returned from the API when fetching a query may be up to 10_000.\n","key$":"limit"},"start_time":{"type":"integer","minimum":1,"default":1676399428,"description":"Absolute start time of query, in seconds since UNIX epoch. Must be <= `end_time`.\n","key$":"start_time"},"end_time":{"type":"integer","minimum":1,"default":1676467828,"description":"Absolute end time of query, in seconds since UNIX epoch.","key$":"end_time"},"time_range":{"type":"integer","minimum":1,"default":7200,"description":"Time range of query in seconds. Can be used with either `start_time` (seconds after `start_time`), `end_time` (seconds before `end_time`), or without either (seconds before now).\n","key$":"time_range"},"havings":{"type":"array","description":"The Having clause allows you to filter on the results table. This operation is distinct from the Where clause, which filters the underlying events. Order By allows you to order the results, and Having filters them. Formulas and calculations with name properties can be referenced by putting the name in the column property.\n","maxItems":100,"items":{"type":"object","required":["calculate_op"],"properties":{"calculate_op":{"allOf":[]},"column":{"type":[],"description":"The name of the column to filter against. This can also be a calculation or formula name."},"op":{"allOf":[]},"value":{"type":"number","default":10}}},"key$":"havings"},"calculated_fields":{"type":"array","description":"Computed properties that are calculated by a formula.\n","maxItems":100,"items":{"type":"object","required":["name","expression"],"properties":{"name":{"type":"string","description":"The field name"},"expression":{"type":"string","description":"The formula for your Calculated Field. To learn more about syntax and available functions, and to explore some example formulas, visit [Calculated Field Formula Reference](https://docs.honeycomb.io/reference/derived-column-formula/)."}}},"key$":"calculated_fields"},"compare_time_offset_seconds":{"type":"integer","enum":[1800,3600,7200,28800,86400,604800,2419200,15724800],"description":"When set, offsets the query's time range by this number of seconds into the past, allowing comparison with historical data from an earlier time period. For example, setting this to 86400 (24 hours) will compare current results against data from 24 hours ago.\n##### Note\n  - The offset must be greater than or equal to the query's time range duration.\n\n##### Allowed values\n- same time range as query time range\n- `1800` - 30 minutes\n- `3600` - 1 hour\n- `7200` - 2 hours\n- `28800` - 8 hours\n- `86400` - 24 hours\n- `604800` - 7 days\n- `2419200` - 28 days\n- `15724800` - 6 months\n","key$":"compare_time_offset_seconds"},"usage_mode":{"type":"boolean","description":"If `true`, query results will return aggregates without correcting for sample rates. This is useful for understanding the actual volume of data stored rather than the estimated original event counts. By default, aggregates are adjusted to reflect the estimated original event volume based on sample rates. Note: This field is not supported for triggers.\n","default":false,"key$":"usage_mode"}},"x-ref":"#/components/schemas/Query","index$":1},"examples":{"Simple Query":{"value":{"calculations":[{"op":"COUNT"}],"orders":[{"op":"COUNT","order":"descending"}],"time_range":7200}},"Query With Filter and Group By":{"value":{"calculations":[{"op":"COUNT"}],"breakdowns":["user_agent"],"filters":[{"op":">=","column":"response.status_code","value":400}],"orders":[{"op":"COUNT","order":"descending"}],"time_range":7200}},"Query With Filter and Calculated Fields":{"value":{"calculations":[{"op":"COUNT"}],"breakdowns":["response.status_code"],"filters":[{"op":"=","column":"adhoc_check","value":true}],"calculated_fields":[{"name":"adhoc_check","expression":"GT($response.status_code, 200)"}],"orders":[{"op":"COUNT","order":"descending"}],"time_range":7200}},"Query With Relational Fields":{"value":{"calculations":[{"op":"COUNT"}],"breakdowns":["name","root.response.status_code"],"filters":[{"op":"=","column":"child.response.status_code","value":400}],"orders":[{"op":"COUNT","order":"descending"}],"time_range":3600,"compare_time_offset_seconds":86400}}}}},"required":true},"parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0}]},"GET /1/queries/{datasetSlug}/{queryId}":{"protocol":"http","parameters":[{"name":"datasetSlug","description":"The dataset slug or use `__all__` for endpoints that support environment-wide operations.\n","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/datasetSlugOrAll","index$":0},{"name":"queryId","description":"The unique identifier (ID) of a query.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const query_ref01_ent = client.Query()
    let query_ref01_data = setup.data.new.query['query_ref01']
    query_ref01_data['dataset_slug'] = setup.idmap['dataset_slug01']

    query_ref01_data = (await query_ref01_ent.create(query_ref01_data)).data()
    assert(null != query_ref01_data.id)


    // LOAD
    const query_ref01_match_dt0: any = {}
    query_ref01_match_dt0.id = query_ref01_data.id
    query_ref01_match_dt0['dataset_slug'] = setup.idmap['dataset_slug'] ?? setup.idmap['dataset_slug01']
    const query_ref01_data_dt0 = (await query_ref01_ent.load(query_ref01_match_dt0)).data()
    assert(query_ref01_data_dt0.id === query_ref01_data.id)


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
      '../../../../.sdk/test/entity/query/QueryTestData.json')

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
    ['query01','query02','query03','dataset_slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HONEYCOMB_TEST_QUERY_ENTID': idmap,
    'HONEYCOMB_TEST_LIVE': 'FALSE',
    'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
    'HONEYCOMB_APIKEY': '',
  })

  idmap = env['HONEYCOMB_TEST_QUERY_ENTID']

  const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HONEYCOMB_TEST_QUERY_ENTID']
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
  

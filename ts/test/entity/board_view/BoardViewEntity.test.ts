

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


describe('BoardViewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HONEYCOMB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HONEYCOMB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HoneycombSDK.test()
    const ent = testsdk.BoardView()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HoneycombSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BoardView().list({"board_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HONEYCOMB_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'board_view.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"filters":{"a":true,"h":"Filters","n":"filters","op":{"create":{"req":true,"type":"`$ARRAY`"},"update":{"req":true,"type":"`$ARRAY`"}},"r":false,"sh":"The filters to apply to this view.","t":"`$ARRAY`","key$":"filters","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the board view.","t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The name of the view.","t":"`$STRING`","key$":"name","index$":2}},"id":{"field":"id","name":"id"},"name":"board_view","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["filters","name"],"co":{"id":"POST /1/boards/{boardId}/views","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"board_id","or":"boardId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/1/boards/{boardId}/views","q":{"exist":["board_id"]},"r":{"param":{"boardId":"board_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"boards"},{"var":"board_id"},{"lit":"views"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /1/boards/{boardId}/views","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"board_id","or":"boardId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/1/boards/{boardId}/views","q":{"exist":["board_id"]},"r":{"param":{"boardId":"board_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"boards"},{"var":"board_id"},{"lit":"views"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /1/boards/{boardId}/views/{viewId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"board_id","or":"boardId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"viewId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/1/boards/{boardId}/views/{viewId}","q":{"exist":["board_id","id"]},"r":{"param":{"boardId":"board_id","viewId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"boards"},{"var":"board_id"},{"lit":"views"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /1/boards/{boardId}/views/{viewId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"board_id","or":"boardId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"viewId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/1/boards/{boardId}/views/{viewId}","q":{"exist":["board_id","id"]},"r":{"param":{"boardId":"board_id","viewId":"id"}},"s":[{"lit":"1"},{"lit":"boards"},{"var":"board_id"},{"lit":"views"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["filters","id","name"],"co":{"id":"PUT /1/boards/{boardId}/views/{viewId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"board_id","or":"boardId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"viewId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/1/boards/{boardId}/views/{viewId}","q":{"exist":["board_id","id"]},"r":{"param":{"boardId":"board_id","viewId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"1"},{"lit":"boards"},{"var":"board_id"},{"lit":"views"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.board"]]},"key$":"board_view","name__orig":"board_view","Name":"BoardView","name_":"board_view","name-":"board-view","NAME":"BOARD_VIEW","index$":3}, {"active":true,"entity":"board_view","key$":"BasicBoardViewFlow","kind":"basic","name":"BasicBoardViewFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"board_view_ref01"},"m":{"board_id":"board01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"board_id":"board01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"board_view_ref01"}}],"index$":1},{"a":true,"d":{"board_id":"board01"},"i":{"ref":"board_view_ref01","srcdatavar":"board_view_ref01_data","suffix":"_up0","textfield":"name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-board_view_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"board_view_ref01","srcdatavar":"board_view_ref01_data","suffix":"_dt0"},"m":{"board_id":"board01","id":"board_view01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-board_view_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"board_view_ref01","suffix":"_rm0"},"m":{"board_id":"board01","id":"board_view01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"board_id":"board01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"board_view_ref01"}}],"index$":5}]}, 'BoardView', {"POST /1/boards/{boardId}/views":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name","filters"],"properties":{"name":{"type":"string","description":"The name of the view.","minLength":1,"maxLength":255,"example":"My View","key$":"name"},"filters":{"type":"array","description":"The filters to apply to this view.","minItems":1,"items":{"type":"object","required":["column","operation"],"properties":{"column":{"type":"string","description":"The column name to filter on.","example":"status"},"operation":{"type":"string","description":"The filter operation.","enum":[],"example":"="},"value":{"description":"The value to filter by.","example":"error"}},"x-ref":"#/components/schemas/BoardViewFilter"},"key$":"filters"}},"x-ref":"#/components/schemas/CreateBoardViewRequest","index$":1},"examples":{"Create board view for error statuses":{"value":{"name":"Errors View","filters":[{"column":"status","operation":"=","value":"error"}]}}}}}},"parameters":[{"name":"boardId","description":"The unique identifier (ID) of a Board.","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /1/boards/{boardId}/views":{"protocol":"http","parameters":[{"name":"boardId","description":"The unique identifier (ID) of a Board.","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /1/boards/{boardId}/views/{viewId}":{"protocol":"http","parameters":[{"name":"boardId","description":"The unique identifier (ID) of a Board.","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"viewId","description":"The unique identifier (ID) of a Board View.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /1/boards/{boardId}/views/{viewId}":{"protocol":"http","parameters":[{"name":"boardId","description":"The unique identifier (ID) of a Board.","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"viewId","description":"The unique identifier (ID) of a Board View.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /1/boards/{boardId}/views/{viewId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name","filters"],"properties":{"id":{"type":"string","description":"Unique identifier for the board view.","example":"eC_abc123","key$":"id"},"name":{"type":"string","description":"The name of the view.","minLength":1,"maxLength":255,"example":"My View","key$":"name"},"filters":{"type":"array","description":"The filters to apply to this view.","minItems":1,"items":{"type":"object","required":["column","operation"],"properties":{"column":{"type":"string","description":"The column name to filter on.","example":"status"},"operation":{"type":"string","description":"The filter operation.","enum":[],"example":"="},"value":{"description":"The value to filter by.","example":"error"}},"x-ref":"#/components/schemas/BoardViewFilter"},"key$":"filters"}},"x-ref":"#/components/schemas/UpdateBoardViewRequest","index$":1},"examples":{"Update board view for error statuses":{"value":{"name":"Errors View","filters":[{"column":"status","operation":"=","value":"error"}]}}}}}},"parameters":[{"name":"boardId","description":"The unique identifier (ID) of a Board.","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"viewId","description":"The unique identifier (ID) of a Board View.","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const board_view_ref01_ent = client.BoardView()
    let board_view_ref01_data = setup.data.new.board_view['board_view_ref01']
    board_view_ref01_data['board_id'] = setup.idmap['board01']

    board_view_ref01_data = (await board_view_ref01_ent.create(board_view_ref01_data)).data()
    assert(null != board_view_ref01_data.id)


    // LIST
    const board_view_ref01_match: any = {}
    board_view_ref01_match['board_id'] = setup.idmap['board01']

    const board_view_ref01_list = (await board_view_ref01_ent.list(board_view_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(board_view_ref01_list, { id: board_view_ref01_data.id })))


    // UPDATE
    const board_view_ref01_data_up0: any = {}
    board_view_ref01_data_up0.id = board_view_ref01_data.id
    board_view_ref01_data_up0['board_id'] = setup.idmap['board_id'] ?? setup.idmap['board01']

    const board_view_ref01_markdef_up0 = { name: 'name', value: 'Mark01-board_view_ref01_' + setup.now }
    ;(board_view_ref01_data_up0 as any)[board_view_ref01_markdef_up0.name] = board_view_ref01_markdef_up0.value

    const board_view_ref01_resdata_up0 = (await board_view_ref01_ent.update(board_view_ref01_data_up0)).data()
    assert(board_view_ref01_resdata_up0.id === board_view_ref01_data_up0.id)

    assert((board_view_ref01_resdata_up0 as any)[board_view_ref01_markdef_up0.name] === board_view_ref01_markdef_up0.value)


    // LOAD
    const board_view_ref01_match_dt0: any = {}
    board_view_ref01_match_dt0.id = board_view_ref01_data.id
    board_view_ref01_match_dt0['board_id'] = setup.idmap['board_id'] ?? setup.idmap['board01']
    const board_view_ref01_data_dt0 = (await board_view_ref01_ent.load(board_view_ref01_match_dt0)).data()
    assert(board_view_ref01_data_dt0.id === board_view_ref01_data.id)


    // REMOVE
    const board_view_ref01_match_rm0: any = { id: board_view_ref01_data.id }
    board_view_ref01_match_rm0['board_id'] = setup.idmap['board_id'] ?? setup.idmap['board01']
    await board_view_ref01_ent.remove(board_view_ref01_match_rm0)
  

    // LIST
    const board_view_ref01_match_rt0: any = {}
    board_view_ref01_match_rt0['board_id'] = setup.idmap['board01']

    const board_view_ref01_list_rt0 = (await board_view_ref01_ent.list(board_view_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(board_view_ref01_list_rt0, { id: board_view_ref01_data.id })))


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
      '../../../../.sdk/test/entity/board_view/BoardViewTestData.json')

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
    ['board_view01','board_view02','board_view03','board01','board02','board03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HONEYCOMB_TEST_BOARD_VIEW_ENTID': idmap,
    'HONEYCOMB_TEST_LIVE': 'FALSE',
    'HONEYCOMB_TEST_EXPLAIN': 'FALSE',
    'HONEYCOMB_APIKEY': '',
  })

  idmap = env['HONEYCOMB_TEST_BOARD_VIEW_ENTID']

  const live = 'TRUE' === env.HONEYCOMB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HONEYCOMB_TEST_BOARD_VIEW_ENTID']
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
  

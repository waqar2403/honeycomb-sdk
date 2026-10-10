// Honeycomb Ts SDK

import { ApiKeyEntity } from './entity/ApiKeyEntity'
import { AuthEntity } from './entity/AuthEntity'
import { BoardEntity } from './entity/BoardEntity'
import { BoardViewEntity } from './entity/BoardViewEntity'
import { BulkSignalRecipientAssignmentEntity } from './entity/BulkSignalRecipientAssignmentEntity'
import { BurnAlertEntity } from './entity/BurnAlertEntity'
import { CalculatedFieldEntity } from './entity/CalculatedFieldEntity'
import { ColumnEntity } from './entity/ColumnEntity'
import { DatasetEntity } from './entity/DatasetEntity'
import { DatasetDefinitionEntity } from './entity/DatasetDefinitionEntity'
import { EnvironmentEntity } from './entity/EnvironmentEntity'
import { EventEntity } from './entity/EventEntity'
import { HistoricalAnomalyEntity } from './entity/HistoricalAnomalyEntity'
import { KinesisEventEntity } from './entity/KinesisEventEntity'
import { ManagementAuthEntity } from './entity/ManagementAuthEntity'
import { MapDependencyEntity } from './entity/MapDependencyEntity'
import { MarkerEntity } from './entity/MarkerEntity'
import { MarkerSettingEntity } from './entity/MarkerSettingEntity'
import { QueryEntity } from './entity/QueryEntity'
import { QueryAnnotationEntity } from './entity/QueryAnnotationEntity'
import { QueryResultEntity } from './entity/QueryResultEntity'
import { RecipientEntity } from './entity/RecipientEntity'
import { SignalEntity } from './entity/SignalEntity'
import { SloEntity } from './entity/SloEntity'
import { SloCountEntity } from './entity/SloCountEntity'
import { SloHistoryEntity } from './entity/SloHistoryEntity'
import { SloHourlyCountEntity } from './entity/SloHourlyCountEntity'
import { TriggerEntity } from './entity/TriggerEntity'

export type * from './HoneycombTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { HoneycombEntityBase } from './HoneycombEntityBase'
import { Utility } from './utility/Utility'
import { unreadableBody } from './utility/ResultBodyUtility'
import { abortError } from './utility/MakeRequestUtility'
import { allowed } from './utility/PrepareMethodUtility'


import { BaseFeature } from './feature/base/BaseFeature'



const stdutil = new Utility()


// A request's outcome: ok is false alone on an error with no response, so a
// caller narrowing on it reaches the status and the data.
type DirectResult =
  | { ok: false, err: any, status?: undefined, headers?: undefined, data?: undefined }
  | { ok: boolean, status: number, headers: any, data: any, err?: any }


class HoneycombSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    for (const key of ['_options', '_rootctx', '_features']) {
      Object.defineProperty(this, key, {
        value: (this as any)[key], enumerable: false, writable: true, configurable: true
      })
    }

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options
    const method = String(fetchargs.method || 'GET').toUpperCase()

    if (!allowed(options.allow.method, method)) {
      return ctx.error('spec_method_allow', 'Method "' + method +
        '" not allowed by SDK option allow.method value: "' + options.allow.method + '"')
    }

    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method,
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    

    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any): Promise<DirectResult> {
    if (!allowed(this._options.allow.op, 'direct')) {
      return {
        ok: false,
        err: new Error('HoneycombSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any): Promise<DirectResult> {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return { ok: false, err: utility.clean(this._rootctx, fetchdef) }
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      if (true === fetchdef.signal?.aborted) {
        throw fetchdef.signal.reason
      }

      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: utility.clean(ctx, abortError(ctx, fetched)) }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      let err: any = undefined
      if (!noBody) {
        let text: any = undefined
        try {
          const raw: any = fetched
          if ('function' === typeof raw.text) {
            text = await raw.text()
            json = '' === text.trim() ? undefined : JSON.parse(text)
          }
          else {
            json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
          }
        }
        catch (parseErr: any) {
          if ('SyntaxError' !== parseErr?.name) {
            throw parseErr
          }
          err = unreadableBody(ctx, {
            status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
            failed: 200 <= status && status < 300 ? undefined :
              ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
          })
        }
      }

      return {
        ok: null == err && status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
        ...(null == err ? {} : { err: utility.clean(ctx, err) }),
      }
    }
    catch (err: any) {
      return { ok: false, err: utility.clean(ctx, abortError(ctx, err)) }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!allowed(options.allow.op, 'graphql')) {
      return {
        ok: false,
        err: new Error('HoneycombSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('HoneycombSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.ApiKey().list()` / `client.ApiKey().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiKey(entopts?: Record<string, any>) {
    const self = this
    return new ApiKeyEntity(self, entopts)
  }


  // Entity access: `client.Auth().list()` / `client.Auth().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Auth(entopts?: Record<string, any>) {
    const self = this
    return new AuthEntity(self, entopts)
  }


  // Entity access: `client.Board().list()` / `client.Board().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Board(entopts?: Record<string, any>) {
    const self = this
    return new BoardEntity(self, entopts)
  }


  // Entity access: `client.BoardView().list()` / `client.BoardView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BoardView(entopts?: Record<string, any>) {
    const self = this
    return new BoardViewEntity(self, entopts)
  }


  // Entity access: `client.BulkSignalRecipientAssignment().list()` / `client.BulkSignalRecipientAssignment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BulkSignalRecipientAssignment(entopts?: Record<string, any>) {
    const self = this
    return new BulkSignalRecipientAssignmentEntity(self, entopts)
  }


  // Entity access: `client.BurnAlert().list()` / `client.BurnAlert().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BurnAlert(entopts?: Record<string, any>) {
    const self = this
    return new BurnAlertEntity(self, entopts)
  }


  // Entity access: `client.CalculatedField().list()` / `client.CalculatedField().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CalculatedField(entopts?: Record<string, any>) {
    const self = this
    return new CalculatedFieldEntity(self, entopts)
  }


  // Entity access: `client.Column().list()` / `client.Column().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Column(entopts?: Record<string, any>) {
    const self = this
    return new ColumnEntity(self, entopts)
  }


  // Entity access: `client.Dataset().list()` / `client.Dataset().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Dataset(entopts?: Record<string, any>) {
    const self = this
    return new DatasetEntity(self, entopts)
  }


  // Entity access: `client.DatasetDefinition().list()` / `client.DatasetDefinition().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DatasetDefinition(entopts?: Record<string, any>) {
    const self = this
    return new DatasetDefinitionEntity(self, entopts)
  }


  // Entity access: `client.Environment().list()` / `client.Environment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Environment(entopts?: Record<string, any>) {
    const self = this
    return new EnvironmentEntity(self, entopts)
  }


  // Entity access: `client.Event().list()` / `client.Event().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Event(entopts?: Record<string, any>) {
    const self = this
    return new EventEntity(self, entopts)
  }


  // Entity access: `client.HistoricalAnomaly().list()` / `client.HistoricalAnomaly().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  HistoricalAnomaly(entopts?: Record<string, any>) {
    const self = this
    return new HistoricalAnomalyEntity(self, entopts)
  }


  // Entity access: `client.KinesisEvent().list()` / `client.KinesisEvent().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  KinesisEvent(entopts?: Record<string, any>) {
    const self = this
    return new KinesisEventEntity(self, entopts)
  }


  // Entity access: `client.ManagementAuth().list()` / `client.ManagementAuth().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ManagementAuth(entopts?: Record<string, any>) {
    const self = this
    return new ManagementAuthEntity(self, entopts)
  }


  // Entity access: `client.MapDependency().list()` / `client.MapDependency().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MapDependency(entopts?: Record<string, any>) {
    const self = this
    return new MapDependencyEntity(self, entopts)
  }


  // Entity access: `client.Marker().list()` / `client.Marker().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Marker(entopts?: Record<string, any>) {
    const self = this
    return new MarkerEntity(self, entopts)
  }


  // Entity access: `client.MarkerSetting().list()` / `client.MarkerSetting().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MarkerSetting(entopts?: Record<string, any>) {
    const self = this
    return new MarkerSettingEntity(self, entopts)
  }


  // Entity access: `client.Query().list()` / `client.Query().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Query(entopts?: Record<string, any>) {
    const self = this
    return new QueryEntity(self, entopts)
  }


  // Entity access: `client.QueryAnnotation().list()` / `client.QueryAnnotation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  QueryAnnotation(entopts?: Record<string, any>) {
    const self = this
    return new QueryAnnotationEntity(self, entopts)
  }


  // Entity access: `client.QueryResult().list()` / `client.QueryResult().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  QueryResult(entopts?: Record<string, any>) {
    const self = this
    return new QueryResultEntity(self, entopts)
  }


  // Entity access: `client.Recipient().list()` / `client.Recipient().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Recipient(entopts?: Record<string, any>) {
    const self = this
    return new RecipientEntity(self, entopts)
  }


  // Entity access: `client.Signal().list()` / `client.Signal().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Signal(entopts?: Record<string, any>) {
    const self = this
    return new SignalEntity(self, entopts)
  }


  // Entity access: `client.Slo().list()` / `client.Slo().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Slo(entopts?: Record<string, any>) {
    const self = this
    return new SloEntity(self, entopts)
  }


  // Entity access: `client.SloCount().list()` / `client.SloCount().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SloCount(entopts?: Record<string, any>) {
    const self = this
    return new SloCountEntity(self, entopts)
  }


  // Entity access: `client.SloHistory().list()` / `client.SloHistory().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SloHistory(entopts?: Record<string, any>) {
    const self = this
    return new SloHistoryEntity(self, entopts)
  }


  // Entity access: `client.SloHourlyCount().list()` / `client.SloHourlyCount().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SloHourlyCount(entopts?: Record<string, any>) {
    const self = this
    return new SloHourlyCountEntity(self, entopts)
  }


  // Entity access: `client.Trigger().list()` / `client.Trigger().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Trigger(entopts?: Record<string, any>) {
    const self = this
    return new TriggerEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new HoneycombSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return HoneycombSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Honeycomb' }
  }

  toString() {
    return 'Honeycomb ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = HoneycombSDK


export {
  stdutil,
  config,
  

  BaseFeature,
  HoneycombEntityBase,

  HoneycombSDK,
  SDK,
}


export type { DirectResult }

# Honeycomb TypeScript SDK



The TypeScript SDK for the Honeycomb API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.ApiKey()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `py` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/waqar2403/honeycomb-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/waqar2403/honeycomb-sdk
npm install ./honeycomb-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record. The client sends the API key in the `X-Honeycomb-Team` header.

### 1. Create a client

```ts
import { HoneycombSDK } from '@waqar2403/honeycomb-sdk'

const client = new HoneycombSDK({
  apikey: process.env.HONEYCOMB_APIKEY,
})
```

### 2. List apikey records

`list()` resolves to an array of ApiKey ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const apikeys = await client.ApiKey().list({ team_slug: "example" })

for (const apikey of apikeys) {
  console.log(apikey.data())
}
```

### 3. Load a boardview

BoardView is nested under board, so provide the `board_id`.
`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const boardview = await client.BoardView().load({
    board_id: 'example_board_id',
    id: 'example_id',
  })
  console.log(boardview.data())
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created ApiKey ENTITY (.data() for the record)
const created = await client.ApiKey().create({
  team_slug: 'example_team_slug',
  data: {},
})

// Update — the id comes off the returned entity's data()
const updated = await client.ApiKey().update({
  id: created.data().id!,
  team_slug: 'example_team_slug',
  data: {},
})

// Remove
await client.ApiKey().remove({
  id: created.data().id!,
  team_slug: 'example_team_slug',
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const datasets = await client.Dataset().list()
  console.log(datasets.map((item) => item.data()))
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = HoneycombSDK.test()

const datasets = await client.Dataset().list()
// datasets is an array of Dataset entities, one per mock record
console.log(datasets.map((dataset) => dataset.data()))
```

You can also use the instance method:

```ts
const client = new HoneycombSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Dataset()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new HoneycombSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
HONEYCOMB_TEST_LIVE=TRUE
HONEYCOMB_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### HoneycombSDK

#### Constructor

```ts
new HoneycombSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `ApiKey(data?)` | `ApiKeyEntity` | Create an ApiKey entity instance. |
| `Auth(data?)` | `AuthEntity` | Create an Auth entity instance. |
| `Board(data?)` | `BoardEntity` | Create a Board entity instance. |
| `BoardView(data?)` | `BoardViewEntity` | Create a BoardView entity instance. |
| `BulkSignalRecipientAssignment(data?)` | `BulkSignalRecipientAssignmentEntity` | Create a BulkSignalRecipientAssignment entity instance. |
| `BurnAlert(data?)` | `BurnAlertEntity` | Create a BurnAlert entity instance. |
| `CalculatedField(data?)` | `CalculatedFieldEntity` | Create a CalculatedField entity instance. |
| `Column(data?)` | `ColumnEntity` | Create a Column entity instance. |
| `Dataset(data?)` | `DatasetEntity` | Create a Dataset entity instance. |
| `DatasetDefinition(data?)` | `DatasetDefinitionEntity` | Create a DatasetDefinition entity instance. |
| `Environment(data?)` | `EnvironmentEntity` | Create an Environment entity instance. |
| `Event(data?)` | `EventEntity` | Create an Event entity instance. |
| `HistoricalAnomaly(data?)` | `HistoricalAnomalyEntity` | Create a HistoricalAnomaly entity instance. |
| `KinesisEvent(data?)` | `KinesisEventEntity` | Create a KinesisEvent entity instance. |
| `ManagementAuth(data?)` | `ManagementAuthEntity` | Create a ManagementAuth entity instance. |
| `MapDependency(data?)` | `MapDependencyEntity` | Create a MapDependency entity instance. |
| `Marker(data?)` | `MarkerEntity` | Create a Marker entity instance. |
| `MarkerSetting(data?)` | `MarkerSettingEntity` | Create a MarkerSetting entity instance. |
| `Query(data?)` | `QueryEntity` | Create a Query entity instance. |
| `QueryAnnotation(data?)` | `QueryAnnotationEntity` | Create a QueryAnnotation entity instance. |
| `QueryResult(data?)` | `QueryResultEntity` | Create a QueryResult entity instance. |
| `Recipient(data?)` | `RecipientEntity` | Create a Recipient entity instance. |
| `Signal(data?)` | `SignalEntity` | Create a Signal entity instance. |
| `Slo(data?)` | `SloEntity` | Create a Slo entity instance. |
| `SloCount(data?)` | `SloCountEntity` | Create a SloCount entity instance. |
| `SloHistory(data?)` | `SloHistoryEntity` | Create a SloHistory entity instance. |
| `SloHourlyCount(data?)` | `SloHourlyCountEntity` | Create a SloHourlyCount entity instance. |
| `Trigger(data?)` | `TriggerEntity` | Create a Trigger entity instance. |
| `tester(testopts?, sdkopts?)` | `HoneycombSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `HoneycombSDK.test(testopts?, sdkopts?)` | `HoneycombSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity, and return it. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Entity>` | Remove an entity, and return it marked as deleted. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): HoneycombSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to the entity, marked as deleted.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### ApiKey

| Field | Description |
| --- | --- |
| `data` |  |
| `id` |  |

Operations: create, list, load, remove, update.

API path: `/2/teams/{teamSlug}/api-keys`

#### Auth

| Field | Description |
| --- | --- |
| `api_key_access` |  |
| `environment` |  |
| `id` | Unique identifier (ID) of the API Key. |
| `team` |  |
| `type` | The type of API Key. |

Operations: load.

API path: `/1/auth`

#### Board

| Field | Description |
| --- | --- |
| `description` | A description of the Board. |
| `id` | Unique identifier (ID), returned in response bodies. |
| `layout_generation` | The layout generation mode for the board. |
| `links` |  |
| `name` | The name of the Board. |
| `panels` |  |
| `preset_filters` | A list of preset filters to apply to the board. |
| `tags` | A list of key-value pairs to help identify the Trigger. |
| `type` | The type of the board. |

Operations: create, list, load, remove, update.

API path: `/1/boards`

#### BoardView

| Field | Description |
| --- | --- |
| `filters` | The filters to apply to this view. |
| `id` | Unique identifier for the board view. |
| `name` | The name of the view. |

Operations: create, list, load, remove, update.

API path: `/1/boards/{boardId}/views`

#### BulkSignalRecipientAssignment

| Field | Description |
| --- | --- |
| `failed` | The Signals that were not updated, each with the reason. |
| `recipients` | The Recipients to assign to every selected Signal. |
| `selector` | Chooses which Signals to act on. |
| `succeeded` | The Signals whose Recipient set was updated. |
| `unchanged` | The Signals that already had every requested Recipient. |

Operations: create.

API path: `/1/signals/recipient_assignments`

#### BurnAlert

| Field | Description |
| --- | --- |
| `alert_type` |  |
| `id` |  |

Operations: create, list, load, remove, update.

API path: `/1/burn_alerts/{datasetSlug}`

#### CalculatedField

| Field | Description |
| --- | --- |
| `alias` | The human-readable name of the Calculated Field (also called Derived Column), as it will be referenced when building queries. |
| `created_at` | ISO8601 formatted time when the field was created. |
| `description` | A human-readable description for the Calculated Field that displays in the UI. |
| `expression` | The expression to evaluate to construct this Calculated Field's value. |
| `id` | Unique identifier (ID), returned in response bodies. |
| `updated_at` | ISO8601 formatted time when the field was updated. |

Operations: create, list, load, remove, update.

API path: `/1/derived_columns/{datasetSlug}`

#### Column

| Field | Description |
| --- | --- |
| `created_at` | ISO8601 formatted time the column was created. |
| `description` | Column description. |
| `hidden` | If `true`, the column is excluded from autocomplete and raw data field lists. |
| `id` | Unique identifier (ID), returned in response bodies. |
| `key_name` | Name of the Column. |
| `last_written` | ISO8601 formatted time the column was last written to (received event data). |
| `type` | Type of data that the Column will contain. |
| `updated_at` | ISO8601 formatted time the column was updated. |

Operations: create, list, load, remove, update.

API path: `/1/columns/{datasetSlug}`

#### Dataset

| Field | Description |
| --- | --- |
| `created_at` | The ISO8601-formatted time when the dataset was created. |
| `dataset_type` | The type of data contained in the dataset. |
| `description` | A description for the dataset. |
| `expand_json_depth` | The maximum unpacking depth of nested JSON fields. |
| `id` |  |
| `last_written_at` | The ISO8601-formatted time when the dataset last received event data. |
| `name` | The name of the dataset. |
| `regular_columns_count` | The total number of unique fields for this Dataset. |
| `settings` |  |
| `slug` | The 'slug' of the dataset to be used in URLs. |

Operations: create, list, load, remove, update.

API path: `/1/datasets`

#### DatasetDefinition

| Field | Description |
| --- | --- |
| `annotation_type` | Metadata: Annotation Type - The type of span annotation. |
| `duration_ms` | Span Duration - How much time the span took, in milliseconds. |
| `error` | Use a Boolean or String to indicate error. |
| `id` |  |
| `link_span_id` | Metadata: Link Span ID - Links let you tie traces and spans to one another. |
| `link_trace_id` | Metadata: Link Trace ID - Links let you tie traces and spans to one another. |
| `log_message` | A value containing the log event message. |
| `log_severity` | Severity level of the event (also known as log level). |
| `name` | The name of the function or method where the span was created. |
| `parent_id` | The Parent Span ID - The ID of this span's parent span, the call location the current span was called from. |
| `route` | The HTTP URL or equivalent route processed by the request. |
| `service_name` | The name of the instrumented service. |
| `span_id` | The unique identifier (ID) for each span. |
| `span_kind` | Metadata: Kind - The kind of Span. |
| `status` | Indicates the success, failure, or other status of a request. |
| `trace_id` | The ID of the trace this span belongs to. |
| `user` | The user making the request in the system. |

Operations: load, update.

API path: `/1/dataset_definitions/{datasetSlug}`

#### Environment

| Field | Description |
| --- | --- |
| `data` |  |
| `id` |  |

Operations: create, list, load, remove, update.

API path: `/2/teams/{teamSlug}/environments`

#### Event

| Field | Description |
| --- | --- |
| `batch_events` | The array should contain one or more JSON objects representing Events. |
| `status` |  |

Operations: create.

API path: `/1/batch/{datasetSlug}`

#### HistoricalAnomaly

| Field | Description |
| --- | --- |
| `ended_at` | The time the anomaly ended, in seconds since UNIX epoch. |
| `id` | A deterministic identifier for the anomaly, derived from the Signal, its measured kind, and the anomaly's start time. |
| `measurement` | The measured value that triggered the anomaly. |
| `normal_range` | The trained normal band the measurement exceeded. |
| `started_at` | The time the anomaly started, in seconds since UNIX epoch. |

Operations: list.

API path: `/1/signals/{signalId}/historical_anomalies`

#### KinesisEvent

| Field | Description |
| --- | --- |
| `errorMessage` |  |
| `records` |  |
| `requestId` |  |
| `timestamp` |  |

Operations: create.

API path: `/1/kinesis_events/{datasetSlug}`

#### ManagementAuth

| Field | Description |
| --- | --- |

Operations: load.

API path: `/2/auth`

#### MapDependency

| Field | Description |
| --- | --- |
| `dependencies` | Array of service dependencies. |
| `end_time` | Absolute end time to evaluate dependencies, in seconds since UNIX epoch. |
| `filters` | Optional list of service nodes to filter dependencies by. |
| `links` | Links to iterate through the pages of results. |
| `request_id` | Unique identifier for the Map Dependency Request. |
| `start_time` | Absolute start time to evaluate dependencies, in seconds since UNIX epoch. |
| `status` | Status of the Map Dependency Request. |
| `time_range` | Time range in seconds (minimum 1). |

Operations: create, load.

API path: `/1/maps/dependencies/requests`

#### Marker

| Field | Description |
| --- | --- |
| `color` | Color can be assigned to Markers using the Marker Settings endpoint. |
| `created_at` | The ISO8601-formatted time when the Marker was created. |
| `end_time` | Specifies end time, and allows a Marker to be recorded as representing a time range, such as a 5 minute deploy. |
| `id` | A 6 character hexadecimal string assigned on Marker creation. |
| `message` | A message to describe this specific Marker. |
| `start_time` | Indicates the time the Marker should be placed. |
| `type` | Groups similar Markers. |
| `updated_at` | The ISO8601-formatted time when the Marker was updated. |
| `url` | A target for the marker. |

Operations: create, list, remove, update.

API path: `/1/markers/{datasetSlug}`

#### MarkerSetting

| Field | Description |
| --- | --- |
| `color` | Color to use for display of this marker type. |
| `created_at` | The ISO8601-formatted time when the Marker Setting was created. |
| `id` | The unique identifier (ID) for the Marker Setting. |
| `type` | Groups similar Markers. |
| `updated_at` | The ISO8601-formatted time when the Marker Setting was updated. |

Operations: create, list, remove, update.

API path: `/1/marker_settings/{datasetSlug}`

#### Query

| Field | Description |
| --- | --- |
| `breakdowns` | the columns by which to break events down into groups |
| `calculated_fields` | Computed properties that are calculated by a formula. |
| `calculations` | the calculations to return as a time series and summary table |
| `compare_time_offset_seconds` | When set, offsets the query's time range by this number of seconds into the past, allowing comparison with historical data from an earlier time period. |
| `end_time` | Absolute end time of query, in seconds since UNIX epoch. |
| `filter_combination` | Set to "OR" to match ANY filter in the filter list |
| `filters` | The filters with which to restrict the considered events |
| `formulas` | Mathematical formulas to be returned as a time series and summary table. |
| `granularity` | The time resolution of the query's graph, in seconds. |
| `havings` | The Having clause allows you to filter on the results table. |
| `id` |  |
| `limit` | The maximum number of unique groups returned in 'results'. |
| `orders` | The terms on which to order the query results. |
| `start_time` | Absolute start time of query, in seconds since UNIX epoch. |
| `time_range` | Time range of query in seconds. |
| `usage_mode` | If `true`, query results will return aggregates without correcting for sample rates. |

Operations: create, load.

API path: `/1/queries/{datasetSlug}`

#### QueryAnnotation

| Field | Description |
| --- | --- |
| `created_at` | ISO8601 formatted time when the Query Annotation was created. |
| `description` | A description of the Query. |
| `id` | The unique identifier (ID) of a Query Annotation. |
| `name` | A name for the Query. |
| `query_id` | The ID of the Query that the annotation describes. |
| `source` | The source of the Query Annotation. |
| `updated_at` | ISO8601 formatted time when the Query Annotation was updated. |

Operations: create, list, load, remove, update.

API path: `/1/query_annotations/{datasetSlug}`

#### QueryResult

| Field | Description |
| --- | --- |
| `complete` | Indicates if the query results are available yet or not. |
| `data` | An object containing the query result data |
| `disable_other_by_aggregate` | If true, the "other_by_aggregate" data is excluded from the query result. |
| `disable_series` | If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field. |
| `disable_total_by_aggregate` | If `true`, data representing each aggregate in the query's total value will not be returned. |
| `error` | Only present if the query failed to run. |
| `id` | The unique identifier (ID) of a Query Result |
| `limit` | If `disable_series` is `true`, a limit may be optionally given. |
| `links` | An object containing UI links to the query result and query result graph |
| `query` |  |
| `query_id` | The ID of a query returned from the [Queries endpoint](/api/queries/). |

Operations: create, load.

API path: `/1/query_results/{datasetSlug}`

#### Recipient

| Field | Description |
| --- | --- |
| `id` |  |
| `type` |  |

Operations: create, list, load, remove, update.

API path: `/1/recipients`

#### Signal

| Field | Description |
| --- | --- |
| `auto_investigate` | When `true`, Honeycomb will automatically start an investigation when this Signal fires. |
| `created_at` | The ISO8601-formatted time when the Signal was created. |
| `currently_anomalous` | Whether the Signal is currently in an anomalous state. |
| `dataset_slug` | The slug of the dataset the Signal's service reports to. |
| `enabled` | Whether the Signal is currently enabled. |
| `environment_slug` | The slug of the environment the Signal belongs to. |
| `id` | Unique identifier (ID) of the Signal. |
| `last_anomaly_ended_at` | The end time of the most recent anomaly, in seconds since UNIX epoch. |
| `last_anomaly_started_at` | The start time of the most recent anomaly, in seconds since UNIX epoch. |
| `measured_signal` | The kind of measurement the Signal is trained on. |
| `recipients` | The Recipients notified when this Signal fires. |
| `sensitivity` | How far a measurement must deviate from the trained normal band before the Signal fires. |
| `service_name` | The name of the service the Signal monitors. |
| `status` | The lifecycle status of the Signal. |
| `updated_at` | The ISO8601-formatted time when the Signal was last updated. |

Operations: list, load, update.

API path: `/1/signals`

#### Slo

| Field | Description |
| --- | --- |
| `created_at` | The ISO8601-formatted time when the SLO was created. |
| `dataset_slugs` | The dataset(s) the SLO will be evaluated against. |
| `description` | A nice description of the SLO's intent and context. |
| `id` |  |
| `name` | The name of the SLO. |
| `reset_at` | The ISO8601-formatted time the SLO was last reset. |
| `sli` | Reference to the [Calculated Field (also called Derived Column)](/api/calculated-fields/) used as the indicator of event success. |
| `tags` | A list of key-value pairs to help identify the SLO. |
| `target_per_million` | The number of events out of one million (1,000,000) that you expected qualified events to succeed. |
| `time_period_days` | The time period, in days, over which the SLO will be evaluated. |
| `updated_at` | The ISO8601-formatted time when the SLO was updated. |

Operations: create, list, load, remove, update.

API path: `/1/slos/{datasetSlug}`

#### SloCount

| Field | Description |
| --- | --- |
| `error_count` | Number of failed (bad) events in this window. |
| `is_partial` | When `true`, the data for this window may be incomplete. |
| `total_count` | Total number of events (good + bad) in this window. |
| `window_end` | End of the window as a Unix timestamp (seconds). |
| `window_start` | Start of the window as a Unix timestamp (seconds). |

Operations: list.

API path: `/1/slos/{datasetSlug}/{sloId}/counts`

#### SloHistory

| Field | Description |
| --- | --- |
| `end_time` | The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for. |
| `ids` | A list of SLO IDs to retrieve history for. |
| `start_time` | The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for. |

Operations: create.

API path: `/1/reporting/slos/historical`

#### SloHourlyCount

| Field | Description |
| --- | --- |
| `end_time` | End of the hour as a Unix timestamp (seconds). |
| `error_count` | Number of failed (bad) events in this hour. |
| `is_partial` | When `true`, this bucket covers the current in-progress hour and its counts will increase until the hour completes. |
| `start_time` | Start of the hour as a Unix timestamp (seconds). |
| `total_count` | Total number of events (good + bad) in this hour. |

Operations: list.

API path: `/1/slos/{datasetSlug}/{sloId}/counts/history`

#### Trigger

| Field | Description |
| --- | --- |
| `alert_type` | How often to fire an alert when a trigger threshold is crossed. |
| `auto_investigate` | When true, Honeycomb will automatically start an investigation when this Trigger fires. |
| `baseline_details` |  |
| `created_at` |  |
| `dataset_slug` | The slug of the dataset this trigger belongs to. |
| `description` | A longer description, displayed on the Trigger's detail page. |
| `disabled` | If true, the trigger will not be evaluated and alerts will not be sent. |
| `evaluation_schedule` | A schedule that determines when the trigger is run. |
| `evaluation_schedule_type` | The schedule type used by the trigger. |
| `frequency` | The interval in seconds in which to check the results of the query’s calculation against the threshold. |
| `id` | The unique identifier (ID) for this Trigger. |
| `name` | A short, human-readable name for this Trigger, which will be displayed in the UI and when the trigger fires. |
| `query` | An inline query specification that is a strict subset of the standard Query Specification. |
| `query_id` | The ID of an existing saved Query that meets the trigger query requirements. |
| `recipients` | A list of [Recipients](/api/recipients/) to notify when the Trigger fires. |
| `tags` | A list of key-value pairs to help identify the Trigger. |
| `threshold` | The threshold over which the trigger will fire, specified as both an operator and a value. |
| `triggered` | If true, the trigger has crossed its specified threshold without resolving. |
| `updated_at` |  |

Operations: create, list, load, remove, update.

API path: `/1/triggers/{datasetSlug}`



## Entities


### ApiKey

Create an instance: `const api_key = client.ApiKey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Record<string, any>` |  |
| `id` | `string` |  |

#### Example: Load

```ts
const api_key = await client.ApiKey().load({ id: 'api_key_id', team_slug: 'team_slug' })
```

#### Example: List

```ts
const api_keys = await client.ApiKey().list({ team_slug: "example" })
```

#### Example: Create

```ts
const api_key = await client.ApiKey().create({
  team_slug: 'example_team_slug',
  data: {},
})
```


### Auth

Create an instance: `const auth = client.Auth()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key_access` | `Record<string, any>` |  |
| `environment` | `Record<string, any>` |  |
| `id` | `string` | Unique identifier (ID) of the API Key. |
| `team` | `Record<string, any>` |  |
| `type` | `string` | The type of API Key. |

#### Example: Load

```ts
const auth = await client.Auth().load({ id: 'auth_id' })
```


### Board

Create an instance: `const board = client.Board()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | A description of the Board. |
| `id` | `string` | Unique identifier (ID), returned in response bodies. |
| `layout_generation` | `string` | The layout generation mode for the board. |
| `links` | `Record<string, any>` |  |
| `name` | `string` | The name of the Board. |
| `panels` | `any[]` |  |
| `preset_filters` | `any[]` | A list of preset filters to apply to the board. |
| `tags` | `any[]` | A list of key-value pairs to help identify the Trigger. |
| `type` | `string` | The type of the board. |

#### Example: Load

```ts
const board = await client.Board().load({ id: 'board_id' })
```

#### Example: List

```ts
const boards = await client.Board().list()
```

#### Example: Create

```ts
const board = await client.Board().create({
  name: 'example_name',
  type: 'example_type',
})
```


### BoardView

Create an instance: `const board_view = client.BoardView()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `filters` | `any[]` | The filters to apply to this view. |
| `id` | `string` | Unique identifier for the board view. |
| `name` | `string` | The name of the view. |

#### Example: Load

```ts
const board_view = await client.BoardView().load({ id: 'board_view_id', board_id: 'board_id' })
```

#### Example: List

```ts
const board_views = await client.BoardView().list({ board_id: "example" })
```

#### Example: Create

```ts
const board_view = await client.BoardView().create({
  board_id: 'example_board_id',
})
```


### BulkSignalRecipientAssignment

Create an instance: `const bulk_signal_recipient_assignment = client.BulkSignalRecipientAssignment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `failed` | `any[]` | The Signals that were not updated, each with the reason. |
| `recipients` | `any[]` | The Recipients to assign to every selected Signal. |
| `selector` | `Record<string, any>` | Chooses which Signals to act on. |
| `succeeded` | `any[]` | The Signals whose Recipient set was updated. |
| `unchanged` | `any[]` | The Signals that already had every requested Recipient. |

#### Example: Create

```ts
const bulk_signal_recipient_assignment = await client.BulkSignalRecipientAssignment().create({
  failed: [],
  recipients: [],
  selector: {},
  succeeded: [],
  unchanged: [],
})
```


### BurnAlert

Create an instance: `const burn_alert = client.BurnAlert()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alert_type` | `string` |  |
| `id` | `string` |  |

#### Example: Load

```ts
const burn_alert = await client.BurnAlert().load({ id: 'burn_alert_id', dataset_slug: 'dataset_slug' })
```

#### Example: List

```ts
const burn_alerts = await client.BurnAlert().list({ dataset_slug: "example", slo_id: "example" })
```

#### Example: Create

```ts
const burn_alert = await client.BurnAlert().create({
  dataset_slug: 'example_dataset_slug',
  alert_type: 'example_alert_type',
})
```


### CalculatedField

Create an instance: `const calculated_field = client.CalculatedField()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alias` | `string` | The human-readable name of the Calculated Field (also called Derived Column), as it will be referenced when building queries. |
| `created_at` | `string` | ISO8601 formatted time when the field was created. |
| `description` | `string` | A human-readable description for the Calculated Field that displays in the UI. |
| `expression` | `string` | The expression to evaluate to construct this Calculated Field's value. |
| `id` | `string` | Unique identifier (ID), returned in response bodies. |
| `updated_at` | `string` | ISO8601 formatted time when the field was updated. |

#### Example: Load

```ts
const calculated_field = await client.CalculatedField().load({ id: 'calculated_field_id', dataset_slug: 'dataset_slug' })
```

#### Example: List

```ts
const calculated_fields = await client.CalculatedField().list({ dataset_slug: "example" })
```

#### Example: Create

```ts
const calculated_field = await client.CalculatedField().create({
  dataset_slug: 'example_dataset_slug',
  alias: 'example_alias',
  created_at: 'example_created_at',
  expression: 'example_expression',
  id: 'example_id',
  updated_at: 'example_updated_at',
})
```


### Column

Create an instance: `const column = client.Column()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | ISO8601 formatted time the column was created. |
| `description` | `string` | Column description. |
| `hidden` | `boolean` | If `true`, the column is excluded from autocomplete and raw data field lists. |
| `id` | `string` | Unique identifier (ID), returned in response bodies. |
| `key_name` | `string` | Name of the Column. |
| `last_written` | `string` | ISO8601 formatted time the column was last written to (received event data). |
| `type` | `string` | Type of data that the Column will contain. |
| `updated_at` | `string` | ISO8601 formatted time the column was updated. |

#### Example: Load

```ts
const column = await client.Column().load({ id: 'column_id', dataset_slug: 'dataset_slug' })
```

#### Example: List

```ts
const columns = await client.Column().list({ dataset_slug: "example" })
```

#### Example: Create

```ts
const column = await client.Column().create({
  dataset_slug: 'example_dataset_slug',
  key_name: 'example_key_name',
})
```


### Dataset

Create an instance: `const dataset = client.Dataset()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The ISO8601-formatted time when the dataset was created. |
| `dataset_type` | `string` | The type of data contained in the dataset. |
| `description` | `string` | A description for the dataset. |
| `expand_json_depth` | `number` | The maximum unpacking depth of nested JSON fields. |
| `id` | `string` |  |
| `last_written_at` | `null | string` | The ISO8601-formatted time when the dataset last received event data. |
| `name` | `string` | The name of the dataset. |
| `regular_columns_count` | `null | number` | The total number of unique fields for this Dataset. |
| `settings` | `Record<string, any>` |  |
| `slug` | `string` | The 'slug' of the dataset to be used in URLs. |

#### Example: Load

```ts
const dataset = await client.Dataset().load({ id: 'dataset_id' })
```

#### Example: List

```ts
const datasets = await client.Dataset().list()
```

#### Example: Create

```ts
const dataset = await client.Dataset().create({
  name: 'example_name',
})
```


### DatasetDefinition

Create an instance: `const dataset_definition = client.DatasetDefinition()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `annotation_type` | `any` | Metadata: Annotation Type - The type of span annotation. |
| `duration_ms` | `any` | Span Duration - How much time the span took, in milliseconds. |
| `error` | `any` | Use a Boolean or String to indicate error. |
| `id` | `string` |  |
| `link_span_id` | `string` | Metadata: Link Span ID - Links let you tie traces and spans to one another. |
| `link_trace_id` | `string` | Metadata: Link Trace ID - Links let you tie traces and spans to one another. |
| `log_message` | `any` | A value containing the log event message. |
| `log_severity` | `any` | Severity level of the event (also known as log level). |
| `name` | `string` | The name of the function or method where the span was created. |
| `parent_id` | `string` | The Parent Span ID - The ID of this span's parent span, the call location the current span was called from. |
| `route` | `any` | The HTTP URL or equivalent route processed by the request. |
| `service_name` | `any` | The name of the instrumented service. |
| `span_id` | `string` | The unique identifier (ID) for each span. |
| `span_kind` | `any` | Metadata: Kind - The kind of Span. |
| `status` | `any` | Indicates the success, failure, or other status of a request. |
| `trace_id` | `string` | The ID of the trace this span belongs to. |
| `user` | `any` | The user making the request in the system. |

#### Example: Load

```ts
const dataset_definition = await client.DatasetDefinition().load({ id: 'dataset_definition_id' })
```


### Environment

Create an instance: `const environment = client.Environment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Record<string, any>` |  |
| `id` | `string` |  |

#### Example: Load

```ts
const environment = await client.Environment().load({ id: 'environment_id', team_slug: 'team_slug' })
```

#### Example: List

```ts
const environments = await client.Environment().list({ team_slug: "example" })
```

#### Example: Create

```ts
const environment = await client.Environment().create({
  team_slug: 'example_team_slug',
  data: {},
})
```


### Event

Create an instance: `const event = client.Event()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `batch_events` | `any[]` | The array should contain one or more JSON objects representing Events. |
| `status` | `number` |  |

#### Example: Create

```ts
const event = await client.Event().create({
  dataset_slug: 'example_dataset_slug',
})
```


### HistoricalAnomaly

Create an instance: `const historical_anomaly = client.HistoricalAnomaly()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ended_at` | `number` | The time the anomaly ended, in seconds since UNIX epoch. |
| `id` | `string` | A deterministic identifier for the anomaly, derived from the Signal, its measured kind, and the anomaly's start time. |
| `measurement` | `number` | The measured value that triggered the anomaly. |
| `normal_range` | `any` | The trained normal band the measurement exceeded. |
| `started_at` | `number` | The time the anomaly started, in seconds since UNIX epoch. |

#### Example: List

```ts
const historical_anomalys = await client.HistoricalAnomaly().list({ signal_id: "example", end_time: 1, start_time: 1 })
```


### KinesisEvent

Create an instance: `const kinesis_event = client.KinesisEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errorMessage` | `string` |  |
| `records` | `any[]` |  |
| `requestId` | `string` |  |
| `timestamp` | `number` |  |

#### Example: Create

```ts
const kinesis_event = await client.KinesisEvent().create({
  dataset_slug: 'example_dataset_slug',
})
```


### ManagementAuth

Create an instance: `const management_auth = client.ManagementAuth()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const management_auth = await client.ManagementAuth().load()
```


### MapDependency

Create an instance: `const map_dependency = client.MapDependency()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dependencies` | `any` | Array of service dependencies. |
| `end_time` | `number` | Absolute end time to evaluate dependencies, in seconds since UNIX epoch. |
| `filters` | `any[]` | Optional list of service nodes to filter dependencies by. |
| `links` | `Record<string, any>` | Links to iterate through the pages of results. |
| `request_id` | `string` | Unique identifier for the Map Dependency Request. |
| `start_time` | `number` | Absolute start time to evaluate dependencies, in seconds since UNIX epoch. |
| `status` | `string` | Status of the Map Dependency Request. |
| `time_range` | `number` | Time range in seconds (minimum 1). |

#### Example: Load

```ts
const map_dependency = await client.MapDependency().load({ request_id: 'request_id' })
```

#### Example: Create

```ts
const map_dependency = await client.MapDependency().create({
  links: {},
})
```


### Marker

Create an instance: `const marker = client.Marker()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `string` | Color can be assigned to Markers using the Marker Settings endpoint. |
| `created_at` | `string` | The ISO8601-formatted time when the Marker was created. |
| `end_time` | `number` | Specifies end time, and allows a Marker to be recorded as representing a time range, such as a 5 minute deploy. |
| `id` | `string` | A 6 character hexadecimal string assigned on Marker creation. |
| `message` | `string` | A message to describe this specific Marker. |
| `start_time` | `number` | Indicates the time the Marker should be placed. |
| `type` | `string` | Groups similar Markers. |
| `updated_at` | `string` | The ISO8601-formatted time when the Marker was updated. |
| `url` | `string` | A target for the marker. |

#### Example: List

```ts
const markers = await client.Marker().list({ dataset_slug: "example" })
```

#### Example: Create

```ts
const marker = await client.Marker().create({
  dataset_slug: 'example_dataset_slug',
})
```


### MarkerSetting

Create an instance: `const marker_setting = client.MarkerSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `string` | Color to use for display of this marker type. |
| `created_at` | `string` | The ISO8601-formatted time when the Marker Setting was created. |
| `id` | `string` | The unique identifier (ID) for the Marker Setting. |
| `type` | `string` | Groups similar Markers. |
| `updated_at` | `null | string` | The ISO8601-formatted time when the Marker Setting was updated. |

#### Example: List

```ts
const marker_settings = await client.MarkerSetting().list({ dataset_slug: "example" })
```

#### Example: Create

```ts
const marker_setting = await client.MarkerSetting().create({
  dataset_slug: 'example_dataset_slug',
  color: 'example_color',
  type: 'example_type',
})
```


### Query

Create an instance: `const query = client.Query()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `breakdowns` | `any[]` | the columns by which to break events down into groups |
| `calculated_fields` | `any[]` | Computed properties that are calculated by a formula. |
| `calculations` | `any[]` | the calculations to return as a time series and summary table |
| `compare_time_offset_seconds` | `number` | When set, offsets the query's time range by this number of seconds into the past, allowing comparison with historical data from an earlier time period. |
| `end_time` | `number` | Absolute end time of query, in seconds since UNIX epoch. |
| `filter_combination` | `string` | Set to "OR" to match ANY filter in the filter list |
| `filters` | `any[]` | The filters with which to restrict the considered events |
| `formulas` | `any[]` | Mathematical formulas to be returned as a time series and summary table. |
| `granularity` | `number` | The time resolution of the query's graph, in seconds. |
| `havings` | `any[]` | The Having clause allows you to filter on the results table. |
| `id` | `string` |  |
| `limit` | `number` | The maximum number of unique groups returned in 'results'. |
| `orders` | `any[]` | The terms on which to order the query results. |
| `start_time` | `number` | Absolute start time of query, in seconds since UNIX epoch. |
| `time_range` | `number` | Time range of query in seconds. |
| `usage_mode` | `boolean` | If `true`, query results will return aggregates without correcting for sample rates. |

#### Example: Load

```ts
const query = await client.Query().load({ id: 'query_id', dataset_slug: 'dataset_slug' })
```

#### Example: Create

```ts
const query = await client.Query().create({
  dataset_slug: 'example_dataset_slug',
})
```


### QueryAnnotation

Create an instance: `const query_annotation = client.QueryAnnotation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | ISO8601 formatted time when the Query Annotation was created. |
| `description` | `string` | A description of the Query. |
| `id` | `string` | The unique identifier (ID) of a Query Annotation. |
| `name` | `string` | A name for the Query. |
| `query_id` | `string` | The ID of the Query that the annotation describes. |
| `source` | `string` | The source of the Query Annotation. |
| `updated_at` | `string` | ISO8601 formatted time when the Query Annotation was updated. |

#### Example: Load

```ts
const query_annotation = await client.QueryAnnotation().load({ id: 'query_annotation_id', dataset_slug: 'dataset_slug' })
```

#### Example: List

```ts
const query_annotations = await client.QueryAnnotation().list({ dataset_slug: "example" })
```

#### Example: Create

```ts
const query_annotation = await client.QueryAnnotation().create({
  dataset_slug: 'example_dataset_slug',
  name: 'example_name',
  query_id: 'example_query_id',
})
```


### QueryResult

Create an instance: `const query_result = client.QueryResult()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `complete` | `boolean` | Indicates if the query results are available yet or not. |
| `data` | `Record<string, any>` | An object containing the query result data |
| `disable_other_by_aggregate` | `boolean` | If true, the "other_by_aggregate" data is excluded from the query result. |
| `disable_series` | `boolean` | If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field. |
| `disable_total_by_aggregate` | `boolean` | If `true`, data representing each aggregate in the query's total value will not be returned. |
| `error` | `string` | Only present if the query failed to run. |
| `id` | `string` | The unique identifier (ID) of a Query Result |
| `limit` | `number` | If `disable_series` is `true`, a limit may be optionally given. |
| `links` | `Record<string, any>` | An object containing UI links to the query result and query result graph |
| `query` | `any` |  |
| `query_id` | `string` | The ID of a query returned from the [Queries endpoint](/api/queries/). |

#### Example: Load

```ts
const query_result = await client.QueryResult().load({ id: 'query_result_id', dataset_slug: 'dataset_slug' })
```

#### Example: Create

```ts
const query_result = await client.QueryResult().create({
  dataset_slug: 'example_dataset_slug',
  query_id: 'example_query_id',
})
```


### Recipient

Create an instance: `const recipient = client.Recipient()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```ts
const recipient = await client.Recipient().load({ id: 'recipient_id' })
```

#### Example: List

```ts
const recipients = await client.Recipient().list()
```

#### Example: Create

```ts
const recipient = await client.Recipient().create({
  type: 'example_type',
})
```


### Signal

Create an instance: `const signal = client.Signal()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_investigate` | `boolean` | When `true`, Honeycomb will automatically start an investigation when this Signal fires. |
| `created_at` | `string` | The ISO8601-formatted time when the Signal was created. |
| `currently_anomalous` | `boolean` | Whether the Signal is currently in an anomalous state. |
| `dataset_slug` | `string` | The slug of the dataset the Signal's service reports to. |
| `enabled` | `boolean` | Whether the Signal is currently enabled. |
| `environment_slug` | `string` | The slug of the environment the Signal belongs to. |
| `id` | `string` | Unique identifier (ID) of the Signal. |
| `last_anomaly_ended_at` | `number | null` | The end time of the most recent anomaly, in seconds since UNIX epoch. |
| `last_anomaly_started_at` | `number | null` | The start time of the most recent anomaly, in seconds since UNIX epoch. |
| `measured_signal` | `string` | The kind of measurement the Signal is trained on. |
| `recipients` | `any[]` | The Recipients notified when this Signal fires. |
| `sensitivity` | `any` | How far a measurement must deviate from the trained normal band before the Signal fires. |
| `service_name` | `string` | The name of the service the Signal monitors. |
| `status` | `string` | The lifecycle status of the Signal. |
| `updated_at` | `string` | The ISO8601-formatted time when the Signal was last updated. |

#### Example: Load

```ts
const signal = await client.Signal().load({ id: 'signal_id' })
```

#### Example: List

```ts
const signals = await client.Signal().list()
```


### Slo

Create an instance: `const slo = client.Slo()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The ISO8601-formatted time when the SLO was created. |
| `dataset_slugs` | `any[]` | The dataset(s) the SLO will be evaluated against. |
| `description` | `string` | A nice description of the SLO's intent and context. |
| `id` | `string` |  |
| `name` | `string` | The name of the SLO. |
| `reset_at` | `string` | The ISO8601-formatted time the SLO was last reset. |
| `sli` | `Record<string, any>` | Reference to the [Calculated Field (also called Derived Column)](/api/calculated-fields/) used as the indicator of event success. |
| `tags` | `any[]` | A list of key-value pairs to help identify the SLO. |
| `target_per_million` | `number` | The number of events out of one million (1,000,000) that you expected qualified events to succeed. |
| `time_period_days` | `number` | The time period, in days, over which the SLO will be evaluated. |
| `updated_at` | `string` | The ISO8601-formatted time when the SLO was updated. |

#### Example: Load

```ts
const slo = await client.Slo().load({ id: 'slo_id', dataset_slug: 'dataset_slug' })
```

#### Example: List

```ts
const slos = await client.Slo().list({ dataset_slug: "example" })
```

#### Example: Create

```ts
const slo = await client.Slo().create({
  dataset_slug: 'example_dataset_slug',
})
```


### SloCount

Create an instance: `const slo_count = client.SloCount()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error_count` | `number` | Number of failed (bad) events in this window. |
| `is_partial` | `boolean` | When `true`, the data for this window may be incomplete. |
| `total_count` | `number` | Total number of events (good + bad) in this window. |
| `window_end` | `number` | End of the window as a Unix timestamp (seconds). |
| `window_start` | `number` | Start of the window as a Unix timestamp (seconds). |

#### Example: List

```ts
const slo_counts = await client.SloCount().list({ dataset_slug: "example", slo_id: "example", end_time: 1, start_time: 1 })
```


### SloHistory

Create an instance: `const slo_history = client.SloHistory()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_time` | `number` | The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for. |
| `ids` | `any[]` | A list of SLO IDs to retrieve history for. |
| `start_time` | `number` | The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for. |

#### Example: Create

```ts
const slo_history = await client.SloHistory().create({
  end_time: 1,
  ids: [],
  start_time: 1,
})
```


### SloHourlyCount

Create an instance: `const slo_hourly_count = client.SloHourlyCount()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_time` | `number` | End of the hour as a Unix timestamp (seconds). |
| `error_count` | `number` | Number of failed (bad) events in this hour. |
| `is_partial` | `boolean` | When `true`, this bucket covers the current in-progress hour and its counts will increase until the hour completes. |
| `start_time` | `number` | Start of the hour as a Unix timestamp (seconds). |
| `total_count` | `number` | Total number of events (good + bad) in this hour. |

#### Example: List

```ts
const slo_hourly_counts = await client.SloHourlyCount().list({ dataset_slug: "example", slo_id: "example", end_time: 1, start_time: 1 })
```


### Trigger

Create an instance: `const trigger = client.Trigger()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alert_type` | `string` | How often to fire an alert when a trigger threshold is crossed. |
| `auto_investigate` | `boolean` | When true, Honeycomb will automatically start an investigation when this Trigger fires. |
| `baseline_details` | `Record<string, any>` |  |
| `created_at` | `string` |  |
| `dataset_slug` | `string` | The slug of the dataset this trigger belongs to. |
| `description` | `string` | A longer description, displayed on the Trigger's detail page. |
| `disabled` | `boolean` | If true, the trigger will not be evaluated and alerts will not be sent. |
| `evaluation_schedule` | `Record<string, any>` | A schedule that determines when the trigger is run. |
| `evaluation_schedule_type` | `string` | The schedule type used by the trigger. |
| `frequency` | `number` | The interval in seconds in which to check the results of the query’s calculation against the threshold. |
| `id` | `string` | The unique identifier (ID) for this Trigger. |
| `name` | `string` | A short, human-readable name for this Trigger, which will be displayed in the UI and when the trigger fires. |
| `query` | `Record<string, any>` | An inline query specification that is a strict subset of the standard Query Specification. |
| `query_id` | `string` | The ID of an existing saved Query that meets the trigger query requirements. |
| `recipients` | `any[]` | A list of [Recipients](/api/recipients/) to notify when the Trigger fires. |
| `tags` | `any[]` | A list of key-value pairs to help identify the Trigger. |
| `threshold` | `Record<string, any>` | The threshold over which the trigger will fire, specified as both an operator and a value. |
| `triggered` | `boolean` | If true, the trigger has crossed its specified threshold without resolving. |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const trigger = await client.Trigger().load({ id: 'trigger_id', dataset_slug: 'dataset_slug' })
```

#### Example: List

```ts
const triggers = await client.Trigger().list({ dataset_slug: "example" })
```

#### Example: Create

```ts
const trigger = await client.Trigger().create({
  dataset_slug: 'example_dataset_slug',
  evaluation_schedule: {},
  threshold: {},
})
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Open types

3 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `query` | `calculations` | 5 | 6 levels |
| `query` | `filters` | 5 | 3 levels |
| `query_result` | `query` | 5 | 10 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
honeycomb/
├── src/
│   ├── HoneycombSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { HoneycombSDK } from '@waqar2403/honeycomb-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const dataset = client.Dataset()
await dataset.list()

// dataset.data() now returns the dataset data from the last `list`
// dataset.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

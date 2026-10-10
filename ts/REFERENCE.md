# Honeycomb TypeScript SDK Reference

Complete API reference for the Honeycomb TypeScript SDK.


## HoneycombSDK

### Constructor

```ts
new HoneycombSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HoneycombSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = HoneycombSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `HoneycombSDK` instance in test mode.


### Instance Methods

#### `Auth(data?: object)`

Create a new `Auth` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AuthEntity` instance.

#### `Board(data?: object)`

Create a new `Board` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BoardEntity` instance.

#### `BoardView(data?: object)`

Create a new `BoardView` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BoardViewEntity` instance.

#### `BulkSignalRecipientAssignment(data?: object)`

Create a new `BulkSignalRecipientAssignment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BulkSignalRecipientAssignmentEntity` instance.

#### `BurnAlert(data?: object)`

Create a new `BurnAlert` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BurnAlertEntity` instance.

#### `CalculatedField(data?: object)`

Create a new `CalculatedField` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CalculatedFieldEntity` instance.

#### `Column(data?: object)`

Create a new `Column` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ColumnEntity` instance.

#### `Dataset(data?: object)`

Create a new `Dataset` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DatasetEntity` instance.

#### `DatasetDefinition(data?: object)`

Create a new `DatasetDefinition` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DatasetDefinitionEntity` instance.

#### `Environment(data?: object)`

Create a new `Environment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EnvironmentEntity` instance.

#### `Event(data?: object)`

Create a new `Event` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventEntity` instance.

#### `HistoricalAnomaly(data?: object)`

Create a new `HistoricalAnomaly` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HistoricalAnomalyEntity` instance.

#### `KeyManagement(data?: object)`

Create a new `KeyManagement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `KeyManagementEntity` instance.

#### `Kinesi(data?: object)`

Create a new `Kinesi` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `KinesiEntity` instance.

#### `MapDependency(data?: object)`

Create a new `MapDependency` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MapDependencyEntity` instance.

#### `Marker(data?: object)`

Create a new `Marker` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MarkerEntity` instance.

#### `MarkerSetting(data?: object)`

Create a new `MarkerSetting` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MarkerSettingEntity` instance.

#### `Query(data?: object)`

Create a new `Query` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `QueryEntity` instance.

#### `QueryAnnotation(data?: object)`

Create a new `QueryAnnotation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `QueryAnnotationEntity` instance.

#### `QueryResult(data?: object)`

Create a new `QueryResult` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `QueryResultEntity` instance.

#### `Recipient(data?: object)`

Create a new `Recipient` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RecipientEntity` instance.

#### `Signal(data?: object)`

Create a new `Signal` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SignalEntity` instance.

#### `Slo(data?: object)`

Create a new `Slo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SloEntity` instance.

#### `SloCount(data?: object)`

Create a new `SloCount` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SloCountEntity` instance.

#### `SloHistory(data?: object)`

Create a new `SloHistory` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SloHistoryEntity` instance.

#### `SloHourlyCount(data?: object)`

Create a new `SloHourlyCount` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SloHourlyCountEntity` instance.

#### `Trigger(data?: object)`

Create a new `Trigger` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TriggerEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `HoneycombSDK.test()`.

**Returns:** `HoneycombSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AuthEntity

```ts
const auth = client.Auth()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key_access` | `Record<string, any>` | Yes |  |
| `environment` | `Record<string, any>` | Yes |  |
| `id` | `string` | Yes | Unique identifier (ID) of the API Key. |
| `team` | `Record<string, any>` | Yes |  |
| `type` | `string` | Yes | The type of API Key. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Auth().load({ id: 'auth_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AuthEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BoardEntity

```ts
const board = client.Board()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | A description of the Board. |
| `id` | `string` | No | Unique identifier (ID), returned in response bodies. |
| `layout_generation` | `string` | No | The layout generation mode for the board. |
| `links` | `Record<string, any>` | No |  |
| `name` | `string` | Yes | The name of the Board. |
| `panels` | `any[]` | No |  |
| `preset_filters` | `any[]` | No | A list of preset filters to apply to the board. |
| `tags` | `any[]` | No | A list of key-value pairs to help identify the Trigger. |
| `type` | `string` | Yes | The type of the board. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Board().create({
  name: 'example_name',
  type: 'example_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Board().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Board().load({ id: 'board_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Board().remove({ id: 'board_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Board().update({
  id: 'board_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BoardEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BoardViewEntity

```ts
const board_view = client.BoardView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `filters` | `any[]` | No | The filters to apply to this view. |
| `id` | `string` | No | Unique identifier for the board view. |
| `name` | `string` | No | The name of the view. |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `filters` | - | - | Yes | Yes |
| `id` | - | - | - | - |
| `name` | - | - | Yes | Yes |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BoardView().create({
  id: 'example_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.BoardView().list({ id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.BoardView().load({ id: 'board_view_id', board_id: 'board_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.BoardView().update({
  id: 'board_view_id',
  board_id: 'board_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BoardViewEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BulkSignalRecipientAssignmentEntity

```ts
const bulk_signal_recipient_assignment = client.BulkSignalRecipientAssignment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `failed` | `any[]` | Yes | The Signals that were not updated, each with the reason. |
| `recipients` | `any[]` | Yes | The Recipients to assign to every selected Signal. |
| `selector` | `Record<string, any>` | Yes | Chooses which Signals to act on. |
| `succeeded` | `any[]` | Yes | The Signals whose Recipient set was updated. |
| `unchanged` | `any[]` | Yes | The Signals that already had every requested Recipient. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BulkSignalRecipientAssignment().create({
  failed: [],
  recipients: [],
  selector: {},
  succeeded: [],
  unchanged: [],
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BulkSignalRecipientAssignmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BurnAlertEntity

```ts
const burn_alert = client.BurnAlert()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alert_type` | `string` | Yes |  |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BurnAlert().create({
  id: 'example_id',
  alert_type: 'example_alert_type',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.BurnAlert().load({ id: 'burn_alert_id', slo_id: 'slo_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.BurnAlert().remove({ burn_alert_id: 'burn_alert_id', dataset_slug: 'dataset_slug' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.BurnAlert().update({
  id: 'burn_alert_id',
  burn_alert_id: 'burn_alert_id',
  dataset_slug: 'dataset_slug',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BurnAlertEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CalculatedFieldEntity

```ts
const calculated_field = client.CalculatedField()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alias` | `string` | Yes | The human-readable name of the Calculated Field (also called Derived Column), as it will be referenced when building queries. |
| `created_at` | `string` | Yes | ISO8601 formatted time when the field was created. |
| `description` | `string` | No | A human-readable description for the Calculated Field that displays in the UI. |
| `expression` | `string` | Yes | The expression to evaluate to construct this Calculated Field's value. |
| `id` | `string` | Yes | Unique identifier (ID), returned in response bodies. |
| `updated_at` | `string` | Yes | ISO8601 formatted time when the field was updated. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CalculatedField().create({
  dataset_slug: 'example_dataset_slug',
  alias: 'example_alias',
  created_at: 'example_created_at',
  expression: 'example_expression',
  id: 'example_id',
  updated_at: 'example_updated_at',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.CalculatedField().load({ dataset_slug: 'dataset_slug' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.CalculatedField().remove({ dataset_slug: 'dataset_slug', derived_column_id: 'derived_column_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.CalculatedField().update({
  dataset_slug: 'dataset_slug',
  derived_column_id: 'derived_column_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CalculatedFieldEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ColumnEntity

```ts
const column = client.Column()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | ISO8601 formatted time the column was created. |
| `description` | `string` | No | Column description. |
| `hidden` | `boolean` | No | If `true`, the column is excluded from autocomplete and raw data field lists. |
| `id` | `string` | No | Unique identifier (ID), returned in response bodies. |
| `key_name` | `string` | Yes | Name of the Column. |
| `last_written` | `string` | No | ISO8601 formatted time the column was last written to (received event data). |
| `type` | `string` | No | Type of data that the Column will contain. |
| `updated_at` | `string` | No | ISO8601 formatted time the column was updated. |

### Field Usage by Operation

| Field | load | create | update | remove |
| --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - |
| `description` | - | - | - | - |
| `hidden` | - | - | - | - |
| `id` | - | - | - | - |
| `key_name` | Yes | - | - | - |
| `last_written` | - | - | - | - |
| `type` | - | - | - | - |
| `updated_at` | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Column().create({
  id: 'example_id',
  key_name: 'example_key_name',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Column().load({ id: 'column_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Column().remove({ column_id: 'column_id', dataset_slug: 'dataset_slug' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Column().update({
  id: 'column_id',
  column_id: 'column_id',
  dataset_slug: 'dataset_slug',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ColumnEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DatasetEntity

```ts
const dataset = client.Dataset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | The ISO8601-formatted time when the dataset was created. |
| `dataset_type` | `string` | No | The type of data contained in the dataset. |
| `description` | `string` | No | A description for the dataset. |
| `expand_json_depth` | `number` | No | The maximum unpacking depth of nested JSON fields. |
| `id` | `string` | No |  |
| `last_written_at` | `null | string` | No | The ISO8601-formatted time when the dataset last received event data. |
| `name` | `string` | Yes | The name of the dataset. |
| `regular_columns_count` | `null | number` | No | The total number of unique fields for this Dataset. |
| `settings` | `Record<string, any>` | No |  |
| `slug` | `string` | No | The 'slug' of the dataset to be used in URLs. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `dataset_type` | - | - | - | - | - |
| `description` | - | - | - | Yes | - |
| `expand_json_depth` | - | - | - | Yes | - |
| `id` | - | - | - | - | - |
| `last_written_at` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `regular_columns_count` | - | - | - | - | - |
| `settings` | - | - | - | - | - |
| `slug` | - | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Dataset().create({
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Dataset().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Dataset().load({ id: 'dataset_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Dataset().remove({ id: 'dataset_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Dataset().update({
  id: 'dataset_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DatasetEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DatasetDefinitionEntity

```ts
const dataset_definition = client.DatasetDefinition()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `annotation_type` | `any` | No | Metadata: Annotation Type - The type of span annotation. |
| `duration_ms` | `any` | No | Span Duration - How much time the span took, in milliseconds. |
| `error` | `any` | No | Use a Boolean or String to indicate error. |
| `id` | `string` | No |  |
| `link_span_id` | `string` | No | Metadata: Link Span ID - Links let you tie traces and spans to one another. |
| `link_trace_id` | `string` | No | Metadata: Link Trace ID - Links let you tie traces and spans to one another. |
| `log_message` | `any` | No | A value containing the log event message. |
| `log_severity` | `any` | No | Severity level of the event (also known as log level). |
| `name` | `string` | No | The name of the function or method where the span was created. |
| `parent_id` | `string` | No | The Parent Span ID - The ID of this span's parent span, the call location the current span was called from. |
| `route` | `any` | No | The HTTP URL or equivalent route processed by the request. |
| `service_name` | `any` | No | The name of the instrumented service. |
| `span_id` | `string` | No | The unique identifier (ID) for each span. |
| `span_kind` | `any` | No | Metadata: Kind - The kind of Span. |
| `status` | `any` | No | Indicates the success, failure, or other status of a request. |
| `trace_id` | `string` | No | The ID of the trace this span belongs to. |
| `user` | `any` | No | The user making the request in the system. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DatasetDefinition().load({ id: 'dataset_definition_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.DatasetDefinition().update({
  id: 'dataset_definition_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DatasetDefinitionEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EnvironmentEntity

```ts
const environment = client.Environment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | Yes |  |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Environment().create({
  team_slug: 'example_team_slug',
  data: {},
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Environment().load({ id: 'environment_id', team_slug: 'team_slug' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Environment().remove({ id: 'environment_id', team_slug: 'team_slug' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Environment().update({
  id: 'environment_id',
  team_slug: 'team_slug',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EnvironmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventEntity

```ts
const event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `batch_events` | `any[]` | No | The array should contain one or more JSON objects representing Events. |
| `id` | `string` | No |  |
| `status` | `number` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Event().create({
  dataset_slug: 'example_dataset_slug',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HistoricalAnomalyEntity

```ts
const historical_anomaly = client.HistoricalAnomaly()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ended_at` | `number` | Yes | The time the anomaly ended, in seconds since UNIX epoch. |
| `id` | `string` | Yes | A deterministic identifier for the anomaly, derived from the Signal, its measured kind, and the anomaly's start time. |
| `measurement` | `number` | Yes | The measured value that triggered the anomaly. |
| `normal_range` | `any` | Yes | The trained normal band the measurement exceeded. |
| `started_at` | `number` | Yes | The time the anomaly started, in seconds since UNIX epoch. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.HistoricalAnomaly().list({ signal_id: "example", end_time: 1, start_time: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HistoricalAnomalyEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## KeyManagementEntity

```ts
const key_management = client.KeyManagement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | Yes |  |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.KeyManagement().create({
  team_slug: 'example_team_slug',
  data: {},
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.KeyManagement().load({ id: 'key_management_id', team_slug: 'team_slug' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.KeyManagement().remove({ id: 'key_management_id', team_slug: 'team_slug' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.KeyManagement().update({
  id: 'key_management_id',
  team_slug: 'team_slug',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `KeyManagementEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## KinesiEntity

```ts
const kinesi = client.Kinesi()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errorMessage` | `string` | No |  |
| `records` | `any[]` | No |  |
| `requestId` | `string` | No |  |
| `timestamp` | `number` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Kinesi().create({
  dataset_slug: 'example_dataset_slug',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `KinesiEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MapDependencyEntity

```ts
const map_dependency = client.MapDependency()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dependencies` | `any` | No | Array of service dependencies. |
| `end_time` | `number` | No | Absolute end time to evaluate dependencies, in seconds since UNIX epoch. |
| `filters` | `any[]` | No | Optional list of service nodes to filter dependencies by. |
| `links` | `Record<string, any>` | Yes | Links to iterate through the pages of results. |
| `request_id` | `string` | No | Unique identifier for the Map Dependency Request. |
| `start_time` | `number` | No | Absolute start time to evaluate dependencies, in seconds since UNIX epoch. |
| `status` | `string` | No | Status of the Map Dependency Request. |
| `time_range` | `number` | No | Time range in seconds (minimum 1). |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.MapDependency().create({
  links: {},
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.MapDependency().load({ request_id: 'request_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MapDependencyEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MarkerEntity

```ts
const marker = client.Marker()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `string` | No | Color can be assigned to Markers using the Marker Settings endpoint. |
| `created_at` | `string` | No | The ISO8601-formatted time when the Marker was created. |
| `end_time` | `number` | No | Specifies end time, and allows a Marker to be recorded as representing a time range, such as a 5 minute deploy. |
| `id` | `string` | No | A 6 character hexadecimal string assigned on Marker creation. |
| `message` | `string` | No | A message to describe this specific Marker. |
| `start_time` | `number` | No | Indicates the time the Marker should be placed. |
| `type` | `string` | No | Groups similar Markers. |
| `updated_at` | `string` | No | The ISO8601-formatted time when the Marker was updated. |
| `url` | `string` | No | A target for the marker. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Marker().create({
  id: 'example_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Marker().load({ id: 'marker_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Marker().remove({ dataset_slug: 'dataset_slug', marker_id: 'marker_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Marker().update({
  id: 'marker_id',
  dataset_slug: 'dataset_slug',
  marker_id: 'marker_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MarkerEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MarkerSettingEntity

```ts
const marker_setting = client.MarkerSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `string` | Yes | Color to use for display of this marker type. |
| `created_at` | `string` | No | The ISO8601-formatted time when the Marker Setting was created. |
| `id` | `string` | No | The unique identifier (ID) for the Marker Setting. |
| `type` | `string` | Yes | Groups similar Markers. |
| `updated_at` | `null | string` | No | The ISO8601-formatted time when the Marker Setting was updated. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.MarkerSetting().create({
  id: 'example_id',
  color: 'example_color',
  type: 'example_type',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.MarkerSetting().load({ id: 'marker_setting_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.MarkerSetting().remove({ dataset_slug: 'dataset_slug', marker_setting_id: 'marker_setting_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.MarkerSetting().update({
  id: 'marker_setting_id',
  dataset_slug: 'dataset_slug',
  marker_setting_id: 'marker_setting_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MarkerSettingEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## QueryEntity

```ts
const query = client.Query()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `breakdowns` | `any[]` | No | the columns by which to break events down into groups |
| `calculated_fields` | `any[]` | No | Computed properties that are calculated by a formula. |
| `calculations` | `any[]` | No | the calculations to return as a time series and summary table |
| `compare_time_offset_seconds` | `number` | No | When set, offsets the query's time range by this number of seconds into the past, allowing comparison with historical data from an earlier time period. |
| `end_time` | `number` | No | Absolute end time of query, in seconds since UNIX epoch. |
| `filter_combination` | `string` | No | Set to "OR" to match ANY filter in the filter list |
| `filters` | `any[]` | No | The filters with which to restrict the considered events |
| `formulas` | `any[]` | No | Mathematical formulas to be returned as a time series and summary table. |
| `granularity` | `number` | No | The time resolution of the query's graph, in seconds. |
| `havings` | `any[]` | No | The Having clause allows you to filter on the results table. |
| `id` | `string` | No |  |
| `limit` | `number` | No | The maximum number of unique groups returned in 'results'. |
| `orders` | `any[]` | No | The terms on which to order the query results. |
| `start_time` | `number` | No | Absolute start time of query, in seconds since UNIX epoch. |
| `time_range` | `number` | No | Time range of query in seconds. |
| `usage_mode` | `boolean` | No | If `true`, query results will return aggregates without correcting for sample rates. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Query().create({
  id: 'example_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Query().load({ dataset_slug: 'dataset_slug', query_id: 'query_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `QueryEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## QueryAnnotationEntity

```ts
const query_annotation = client.QueryAnnotation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | ISO8601 formatted time when the Query Annotation was created. |
| `description` | `string` | No | A description of the Query. |
| `id` | `string` | No | The unique identifier (ID) of a Query Annotation. |
| `name` | `string` | Yes | A name for the Query. |
| `query_id` | `string` | Yes | The ID of the Query that the annotation describes. |
| `source` | `string` | No | The source of the Query Annotation. |
| `updated_at` | `string` | No | ISO8601 formatted time when the Query Annotation was updated. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.QueryAnnotation().create({
  id: 'example_id',
  name: 'example_name',
  query_id: 'example_query_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.QueryAnnotation().load({ id: 'query_annotation_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.QueryAnnotation().remove({ dataset_slug: 'dataset_slug', query_annotation_id: 'query_annotation_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.QueryAnnotation().update({
  id: 'query_annotation_id',
  dataset_slug: 'dataset_slug',
  query_annotation_id: 'query_annotation_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `QueryAnnotationEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## QueryResultEntity

```ts
const query_result = client.QueryResult()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `complete` | `boolean` | No | Indicates if the query results are available yet or not. |
| `data` | `Record<string, any>` | No | An object containing the query result data |
| `disable_other_by_aggregate` | `boolean` | No | If true, the "other_by_aggregate" data is excluded from the query result. |
| `disable_series` | `boolean` | No | If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field. |
| `disable_total_by_aggregate` | `boolean` | No | If `true`, data representing each aggregate in the query's total value will not be returned. |
| `error` | `string` | No | Only present if the query failed to run. |
| `id` | `string` | No | The unique identifier (ID) of a Query Result |
| `limit` | `number` | No | If `disable_series` is `true`, a limit may be optionally given. |
| `links` | `Record<string, any>` | No | An object containing UI links to the query result and query result graph |
| `query` | `any` | No |  |
| `query_id` | `string` | Yes | The ID of a query returned from the [Queries endpoint](/api/queries/). |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.QueryResult().create({
  id: 'example_id',
  query_id: 'example_query_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.QueryResult().load({ dataset_slug: 'dataset_slug', query_result_id: 'query_result_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `QueryResultEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RecipientEntity

```ts
const recipient = client.Recipient()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `type` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Recipient().create({
  type: 'example_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Recipient().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Recipient().load({ id: 'recipient_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Recipient().remove({ id: 'recipient_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Recipient().update({
  id: 'recipient_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RecipientEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SignalEntity

```ts
const signal = client.Signal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_investigate` | `boolean` | Yes | When `true`, Honeycomb will automatically start an investigation when this Signal fires. |
| `created_at` | `string` | Yes | The ISO8601-formatted time when the Signal was created. |
| `currently_anomalous` | `boolean` | Yes | Whether the Signal is currently in an anomalous state. |
| `dataset_slug` | `string` | Yes | The slug of the dataset the Signal's service reports to. |
| `enabled` | `boolean` | Yes | Whether the Signal is currently enabled. |
| `environment_slug` | `string` | Yes | The slug of the environment the Signal belongs to. |
| `id` | `string` | Yes | Unique identifier (ID) of the Signal. |
| `last_anomaly_ended_at` | `number | null` | Yes | The end time of the most recent anomaly, in seconds since UNIX epoch. |
| `last_anomaly_started_at` | `number | null` | Yes | The start time of the most recent anomaly, in seconds since UNIX epoch. |
| `measured_signal` | `string` | Yes | The kind of measurement the Signal is trained on. |
| `recipients` | `any[]` | Yes | The Recipients notified when this Signal fires. |
| `sensitivity` | `any` | Yes | How far a measurement must deviate from the trained normal band before the Signal fires. |
| `service_name` | `string` | Yes | The name of the service the Signal monitors. |
| `status` | `string` | Yes | The lifecycle status of the Signal. |
| `updated_at` | `string` | Yes | The ISO8601-formatted time when the Signal was last updated. |

### Field Usage by Operation

| Field | load | list | update |
| --- | --- | --- | --- |
| `auto_investigate` | - | - | - |
| `created_at` | - | - | - |
| `currently_anomalous` | - | - | - |
| `dataset_slug` | - | - | - |
| `enabled` | - | - | Yes |
| `environment_slug` | - | - | - |
| `id` | - | - | - |
| `last_anomaly_ended_at` | - | - | - |
| `last_anomaly_started_at` | - | - | - |
| `measured_signal` | - | - | - |
| `recipients` | - | - | Yes |
| `sensitivity` | - | - | Yes |
| `service_name` | - | - | - |
| `status` | - | - | - |
| `updated_at` | - | - | - |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Signal().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Signal().load({ id: 'signal_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Signal().update({
  id: 'signal_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SignalEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SloEntity

```ts
const slo = client.Slo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | The ISO8601-formatted time when the SLO was created. |
| `dataset_slugs` | `any[]` | No | The dataset(s) the SLO will be evaluated against. |
| `description` | `string` | No | A nice description of the SLO's intent and context. |
| `id` | `string` | No |  |
| `name` | `string` | No | The name of the SLO. |
| `reset_at` | `string` | No | The ISO8601-formatted time the SLO was last reset. |
| `sli` | `Record<string, any>` | No | Reference to the [Calculated Field](/api/calculated-fields/) used as the indicator of event success. |
| `tags` | `any[]` | No | A list of key-value pairs to help identify the SLO. |
| `target_per_million` | `number` | No | The number of events out of one million (1,000,000) that you expected qualified events to succeed. |
| `time_period_days` | `number` | No | The time period, in days, over which the SLO will be evaluated. |
| `updated_at` | `string` | No | The ISO8601-formatted time when the SLO was updated. |

### Field Usage by Operation

| Field | load | create | update | remove |
| --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - |
| `dataset_slugs` | - | - | - | - |
| `description` | - | - | - | - |
| `id` | - | - | - | - |
| `name` | Yes | Yes | Yes | - |
| `reset_at` | - | - | - | - |
| `sli` | Yes | Yes | Yes | - |
| `tags` | - | - | - | - |
| `target_per_million` | Yes | Yes | Yes | - |
| `time_period_days` | Yes | Yes | Yes | - |
| `updated_at` | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Slo().create({
  id: 'example_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Slo().load({ id: 'slo_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Slo().remove({ dataset_slug: 'dataset_slug', slo_id: 'slo_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Slo().update({
  id: 'slo_id',
  dataset_slug: 'dataset_slug',
  slo_id: 'slo_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SloEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SloCountEntity

```ts
const slo_count = client.SloCount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error_count` | `number` | No | Number of failed (bad) events in this window. |
| `is_partial` | `boolean` | No | When `true`, the data for this window may be incomplete. |
| `total_count` | `number` | No | Total number of events (good + bad) in this window. |
| `window_end` | `number` | No | End of the window as a Unix timestamp (seconds). |
| `window_start` | `number` | No | Start of the window as a Unix timestamp (seconds). |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.SloCount().list({ dataset_slug: "example", slo_id: "example", end_time: 1, start_time: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SloCountEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SloHistoryEntity

```ts
const slo_history = client.SloHistory()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_time` | `number` | Yes | The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for. |
| `ids` | `any[]` | Yes | A list of SLO IDs to retrieve history for. |
| `start_time` | `number` | Yes | The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.SloHistory().create({
  end_time: 1,
  ids: [],
  start_time: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SloHistoryEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SloHourlyCountEntity

```ts
const slo_hourly_count = client.SloHourlyCount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_time` | `number` | No | End of the hour as a Unix timestamp (seconds). |
| `error_count` | `number` | No | Number of failed (bad) events in this hour. |
| `is_partial` | `boolean` | No | When `true`, this bucket covers the current in-progress hour and its counts will increase until the hour completes. |
| `start_time` | `number` | No | Start of the hour as a Unix timestamp (seconds). |
| `total_count` | `number` | No | Total number of events (good + bad) in this hour. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.SloHourlyCount().list({ dataset_slug: "example", slo_id: "example", end_time: 1, start_time: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SloHourlyCountEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TriggerEntity

```ts
const trigger = client.Trigger()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alert_type` | `string` | No | How often to fire an alert when a trigger threshold is crossed. |
| `auto_investigate` | `boolean` | No | When true, Honeycomb will automatically start an investigation when this Trigger fires. |
| `baseline_details` | `Record<string, any>` | No |  |
| `created_at` | `string` | No |  |
| `dataset_slug` | `string` | No | The slug of the dataset this trigger belongs to. |
| `description` | `string` | No | A longer description, displayed on the Trigger's detail page. |
| `disabled` | `boolean` | No | If true, the trigger will not be evaluated and alerts will not be sent. |
| `evaluation_schedule` | `Record<string, any>` | Yes | A schedule that determines when the trigger is run. |
| `evaluation_schedule_type` | `string` | No | The schedule type used by the trigger. |
| `frequency` | `number` | No | The interval in seconds in which to check the results of the query’s calculation against the threshold. |
| `id` | `string` | No | The unique identifier (ID) for this Trigger. |
| `name` | `string` | No | A short, human-readable name for this Trigger, which will be displayed in the UI and when the trigger fires. |
| `query` | `Record<string, any>` | No | An inline query specification that is a strict subset of the standard Query Specification. |
| `query_id` | `string` | No | The ID of an existing saved Query that meets the trigger query requirements. |
| `recipients` | `any[]` | No | A list of [Recipients](/api/recipients/) to notify when the Trigger fires. |
| `tags` | `any[]` | No | A list of key-value pairs to help identify the Trigger. |
| `threshold` | `Record<string, any>` | Yes | The threshold over which the trigger will fire, specified as both an operator and a value. |
| `triggered` | `boolean` | No | If true, the trigger has crossed its specified threshold without resolving. |
| `updated_at` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Trigger().create({
  id: 'example_id',
  evaluation_schedule: {},
  threshold: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Trigger().list({ recipient_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Trigger().load({ id: 'trigger_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Trigger().remove({ dataset_slug: 'dataset_slug', trigger_id: 'trigger_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Trigger().update({
  id: 'trigger_id',
  dataset_slug: 'dataset_slug',
  trigger_id: 'trigger_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TriggerEntity` instance with the same client and
options.

#### `client()`

Return the parent `HoneycombSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new HoneycombSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.


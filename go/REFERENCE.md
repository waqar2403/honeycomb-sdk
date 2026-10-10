# Honeycomb Golang SDK Reference

Complete API reference for the Honeycomb Golang SDK.


## HoneycombSDK

### Constructor

```go
func NewHoneycombSDK(options map[string]any) *HoneycombSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *HoneycombSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *HoneycombSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `ApiKey(data map[string]any) HoneycombEntity`

Create a new `ApiKey` entity instance. Pass `nil` for no initial data.

#### `Auth(data map[string]any) HoneycombEntity`

Create a new `Auth` entity instance. Pass `nil` for no initial data.

#### `Board(data map[string]any) HoneycombEntity`

Create a new `Board` entity instance. Pass `nil` for no initial data.

#### `BoardView(data map[string]any) HoneycombEntity`

Create a new `BoardView` entity instance. Pass `nil` for no initial data.

#### `BulkSignalRecipientAssignment(data map[string]any) HoneycombEntity`

Create a new `BulkSignalRecipientAssignment` entity instance. Pass `nil` for no initial data.

#### `BurnAlert(data map[string]any) HoneycombEntity`

Create a new `BurnAlert` entity instance. Pass `nil` for no initial data.

#### `CalculatedField(data map[string]any) HoneycombEntity`

Create a new `CalculatedField` entity instance. Pass `nil` for no initial data.

#### `Column(data map[string]any) HoneycombEntity`

Create a new `Column` entity instance. Pass `nil` for no initial data.

#### `Dataset(data map[string]any) HoneycombEntity`

Create a new `Dataset` entity instance. Pass `nil` for no initial data.

#### `DatasetDefinition(data map[string]any) HoneycombEntity`

Create a new `DatasetDefinition` entity instance. Pass `nil` for no initial data.

#### `Environment(data map[string]any) HoneycombEntity`

Create a new `Environment` entity instance. Pass `nil` for no initial data.

#### `Event(data map[string]any) HoneycombEntity`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `HistoricalAnomaly(data map[string]any) HoneycombEntity`

Create a new `HistoricalAnomaly` entity instance. Pass `nil` for no initial data.

#### `KinesisEvent(data map[string]any) HoneycombEntity`

Create a new `KinesisEvent` entity instance. Pass `nil` for no initial data.

#### `ManagementAuth(data map[string]any) HoneycombEntity`

Create a new `ManagementAuth` entity instance. Pass `nil` for no initial data.

#### `MapDependency(data map[string]any) HoneycombEntity`

Create a new `MapDependency` entity instance. Pass `nil` for no initial data.

#### `Marker(data map[string]any) HoneycombEntity`

Create a new `Marker` entity instance. Pass `nil` for no initial data.

#### `MarkerSetting(data map[string]any) HoneycombEntity`

Create a new `MarkerSetting` entity instance. Pass `nil` for no initial data.

#### `Query(data map[string]any) HoneycombEntity`

Create a new `Query` entity instance. Pass `nil` for no initial data.

#### `QueryAnnotation(data map[string]any) HoneycombEntity`

Create a new `QueryAnnotation` entity instance. Pass `nil` for no initial data.

#### `QueryResult(data map[string]any) HoneycombEntity`

Create a new `QueryResult` entity instance. Pass `nil` for no initial data.

#### `Recipient(data map[string]any) HoneycombEntity`

Create a new `Recipient` entity instance. Pass `nil` for no initial data.

#### `Signal(data map[string]any) HoneycombEntity`

Create a new `Signal` entity instance. Pass `nil` for no initial data.

#### `Slo(data map[string]any) HoneycombEntity`

Create a new `Slo` entity instance. Pass `nil` for no initial data.

#### `SloCount(data map[string]any) HoneycombEntity`

Create a new `SloCount` entity instance. Pass `nil` for no initial data.

#### `SloHistory(data map[string]any) HoneycombEntity`

Create a new `SloHistory` entity instance. Pass `nil` for no initial data.

#### `SloHourlyCount(data map[string]any) HoneycombEntity`

Create a new `SloHourlyCount` entity instance. Pass `nil` for no initial data.

#### `Trigger(data map[string]any) HoneycombEntity`

Create a new `Trigger` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ApiKeyEntity

```go
apiKey := client.ApiKey(nil)
fmt.Println(apiKey.GetName()) // "api_key"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `map[string]any` | Yes |  |
| `id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ApiKey(nil).List(map[string]any{"team_slug": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ApiKey(nil).Load(map[string]any{"id": "api_key_id", "team_slug": "team_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ApiKey(nil).Create(map[string]any{
    "team_slug": "example_team_slug",
    "data": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.ApiKey(nil).Update(map[string]any{
    "id": "api_key_id",
    "team_slug": "team_slug",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.ApiKey(nil).Remove(map[string]any{"id": "api_key_id", "team_slug": "team_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ApiKeyEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AuthEntity

```go
auth := client.Auth(nil)
fmt.Println(auth.GetName()) // "auth"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key_access` | `map[string]any` | Yes |  |
| `environment` | `map[string]any` | Yes |  |
| `id` | `string` | Yes | Unique identifier (ID) of the API Key. |
| `team` | `map[string]any` | Yes |  |
| `type` | `string` | Yes | The type of API Key. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Auth(nil).Load(map[string]any{"id": "auth_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AuthEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BoardEntity

```go
board := client.Board(nil)
fmt.Println(board.GetName()) // "board"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | A description of the Board. |
| `id` | `string` | No | Unique identifier (ID), returned in response bodies. |
| `layout_generation` | `string` | No | The layout generation mode for the board. |
| `links` | `map[string]any` | No |  |
| `name` | `string` | Yes | The name of the Board. |
| `panels` | `[]any` | No |  |
| `preset_filters` | `[]any` | No | A list of preset filters to apply to the board. |
| `tags` | `[]any` | No | A list of key-value pairs to help identify the Trigger. |
| `type` | `string` | Yes | The type of the board. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Board(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Board(nil).Load(map[string]any{"id": "board_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Board(nil).Create(map[string]any{
    "name": "example_name",
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Board(nil).Update(map[string]any{
    "id": "board_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Board(nil).Remove(map[string]any{"id": "board_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BoardEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BoardViewEntity

```go
boardView := client.BoardView(nil)
fmt.Println(boardView.GetName()) // "board_view"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `filters` | `[]any` | No | The filters to apply to this view. |
| `id` | `string` | No | Unique identifier for the board view. |
| `name` | `string` | No | The name of the view. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `filters` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `name` | - | - | Yes | Yes | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.BoardView(nil).List(map[string]any{"board_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.BoardView(nil).Load(map[string]any{"id": "board_view_id", "board_id": "board_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BoardView(nil).Create(map[string]any{
    "board_id": "example_board_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.BoardView(nil).Update(map[string]any{
    "id": "board_view_id",
    "board_id": "board_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.BoardView(nil).Remove(map[string]any{"id": "board_view_id", "board_id": "board_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BoardViewEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BulkSignalRecipientAssignmentEntity

```go
bulkSignalRecipientAssignment := client.BulkSignalRecipientAssignment(nil)
fmt.Println(bulkSignalRecipientAssignment.GetName()) // "bulk_signal_recipient_assignment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `failed` | `[]any` | Yes | The Signals that were not updated, each with the reason. |
| `recipients` | `[]any` | Yes | The Recipients to assign to every selected Signal. |
| `selector` | `map[string]any` | Yes | Chooses which Signals to act on. |
| `succeeded` | `[]any` | Yes | The Signals whose Recipient set was updated. |
| `unchanged` | `[]any` | Yes | The Signals that already had every requested Recipient. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BulkSignalRecipientAssignment(nil).Create(map[string]any{
    "failed": []any{},
    "recipients": []any{},
    "selector": map[string]any{},
    "succeeded": []any{},
    "unchanged": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BulkSignalRecipientAssignmentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BurnAlertEntity

```go
burnAlert := client.BurnAlert(nil)
fmt.Println(burnAlert.GetName()) // "burn_alert"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alert_type` | `string` | Yes |  |
| `id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.BurnAlert(nil).List(map[string]any{"dataset_slug": "example", "slo_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.BurnAlert(nil).Load(map[string]any{"id": "burn_alert_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BurnAlert(nil).Create(map[string]any{
    "dataset_slug": "example_dataset_slug",
    "alert_type": "example_alert_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.BurnAlert(nil).Update(map[string]any{
    "id": "burn_alert_id",
    "dataset_slug": "dataset_slug",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.BurnAlert(nil).Remove(map[string]any{"id": "burn_alert_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BurnAlertEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CalculatedFieldEntity

```go
calculatedField := client.CalculatedField(nil)
fmt.Println(calculatedField.GetName()) // "calculated_field"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.CalculatedField(nil).List(map[string]any{"dataset_slug": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CalculatedField(nil).Load(map[string]any{"id": "calculated_field_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.CalculatedField(nil).Create(map[string]any{
    "dataset_slug": "example_dataset_slug",
    "alias": "example_alias",
    "created_at": "example_created_at",
    "expression": "example_expression",
    "id": "example_id",
    "updated_at": "example_updated_at",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.CalculatedField(nil).Update(map[string]any{
    "id": "calculated_field_id",
    "dataset_slug": "dataset_slug",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.CalculatedField(nil).Remove(map[string]any{"id": "calculated_field_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CalculatedFieldEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ColumnEntity

```go
column := client.Column(nil)
fmt.Println(column.GetName()) // "column"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | ISO8601 formatted time the column was created. |
| `description` | `string` | No | Column description. |
| `hidden` | `bool` | No | If `true`, the column is excluded from autocomplete and raw data field lists. |
| `id` | `string` | No | Unique identifier (ID), returned in response bodies. |
| `key_name` | `string` | Yes | Name of the Column. |
| `last_written` | `string` | No | ISO8601 formatted time the column was last written to (received event data). |
| `type` | `string` | No | Type of data that the Column will contain. |
| `updated_at` | `string` | No | ISO8601 formatted time the column was updated. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `hidden` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `key_name` | - | Yes | - | - | - |
| `last_written` | - | - | - | - | - |
| `type` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Column(nil).List(map[string]any{"dataset_slug": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Column(nil).Load(map[string]any{"id": "column_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Column(nil).Create(map[string]any{
    "dataset_slug": "example_dataset_slug",
    "key_name": "example_key_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Column(nil).Update(map[string]any{
    "id": "column_id",
    "dataset_slug": "dataset_slug",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Column(nil).Remove(map[string]any{"id": "column_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ColumnEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DatasetEntity

```go
dataset := client.Dataset(nil)
fmt.Println(dataset.GetName()) // "dataset"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | The ISO8601-formatted time when the dataset was created. |
| `dataset_type` | `string` | No | The type of data contained in the dataset. |
| `description` | `string` | No | A description for the dataset. |
| `expand_json_depth` | `int` | No | The maximum unpacking depth of nested JSON fields. |
| `id` | `string` | No |  |
| `last_written_at` | `any` | No | The ISO8601-formatted time when the dataset last received event data. |
| `name` | `string` | Yes | The name of the dataset. |
| `regular_columns_count` | `any` | No | The total number of unique fields for this Dataset. |
| `settings` | `map[string]any` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Dataset(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Dataset(nil).Load(map[string]any{"id": "dataset_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Dataset(nil).Create(map[string]any{
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Dataset(nil).Update(map[string]any{
    "id": "dataset_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Dataset(nil).Remove(map[string]any{"id": "dataset_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DatasetEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DatasetDefinitionEntity

```go
datasetDefinition := client.DatasetDefinition(nil)
fmt.Println(datasetDefinition.GetName()) // "dataset_definition"
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DatasetDefinition(nil).Load(map[string]any{"id": "dataset_definition_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.DatasetDefinition(nil).Update(map[string]any{
    "id": "dataset_definition_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DatasetDefinitionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EnvironmentEntity

```go
environment := client.Environment(nil)
fmt.Println(environment.GetName()) // "environment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `map[string]any` | Yes |  |
| `id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Environment(nil).List(map[string]any{"team_slug": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Environment(nil).Load(map[string]any{"id": "environment_id", "team_slug": "team_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Environment(nil).Create(map[string]any{
    "team_slug": "example_team_slug",
    "data": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Environment(nil).Update(map[string]any{
    "id": "environment_id",
    "team_slug": "team_slug",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Environment(nil).Remove(map[string]any{"id": "environment_id", "team_slug": "team_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EnvironmentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EventEntity

```go
event := client.Event(nil)
fmt.Println(event.GetName()) // "event"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `batch_events` | `[]any` | No | The array should contain one or more JSON objects representing Events. |
| `status` | `int` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Event(nil).Create(map[string]any{
    "dataset_slug": "example_dataset_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## HistoricalAnomalyEntity

```go
historicalAnomaly := client.HistoricalAnomaly(nil)
fmt.Println(historicalAnomaly.GetName()) // "historical_anomaly"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ended_at` | `int` | Yes | The time the anomaly ended, in seconds since UNIX epoch. |
| `id` | `string` | Yes | A deterministic identifier for the anomaly, derived from the Signal, its measured kind, and the anomaly's start time. |
| `measurement` | `float64` | Yes | The measured value that triggered the anomaly. |
| `normal_range` | `any` | Yes | The trained normal band the measurement exceeded. |
| `started_at` | `int` | Yes | The time the anomaly started, in seconds since UNIX epoch. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.HistoricalAnomaly(nil).List(map[string]any{"signal_id": "example", "end_time": 1, "start_time": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HistoricalAnomalyEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## KinesisEventEntity

```go
kinesisEvent := client.KinesisEvent(nil)
fmt.Println(kinesisEvent.GetName()) // "kinesis_event"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errorMessage` | `string` | No |  |
| `records` | `[]any` | No |  |
| `requestId` | `string` | No |  |
| `timestamp` | `int` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.KinesisEvent(nil).Create(map[string]any{
    "dataset_slug": "example_dataset_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `KinesisEventEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ManagementAuthEntity

```go
managementAuth := client.ManagementAuth(nil)
fmt.Println(managementAuth.GetName()) // "management_auth"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ManagementAuth(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ManagementAuthEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MapDependencyEntity

```go
mapDependency := client.MapDependency(nil)
fmt.Println(mapDependency.GetName()) // "map_dependency"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dependencies` | `any` | No | Array of service dependencies. |
| `end_time` | `int` | No | Absolute end time to evaluate dependencies, in seconds since UNIX epoch. |
| `filters` | `[]any` | No | Optional list of service nodes to filter dependencies by. |
| `links` | `map[string]any` | Yes | Links to iterate through the pages of results. |
| `request_id` | `string` | No | Unique identifier for the Map Dependency Request. |
| `start_time` | `int` | No | Absolute start time to evaluate dependencies, in seconds since UNIX epoch. |
| `status` | `string` | No | Status of the Map Dependency Request. |
| `time_range` | `int` | No | Time range in seconds (minimum 1). |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.MapDependency(nil).Load(map[string]any{"request_id": "request_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.MapDependency(nil).Create(map[string]any{
    "links": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MapDependencyEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MarkerEntity

```go
marker := client.Marker(nil)
fmt.Println(marker.GetName()) // "marker"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `string` | No | Color can be assigned to Markers using the Marker Settings endpoint. |
| `created_at` | `string` | No | The ISO8601-formatted time when the Marker was created. |
| `end_time` | `int` | No | Specifies end time, and allows a Marker to be recorded as representing a time range, such as a 5 minute deploy. |
| `id` | `string` | No | A 6 character hexadecimal string assigned on Marker creation. |
| `message` | `string` | No | A message to describe this specific Marker. |
| `start_time` | `int` | No | Indicates the time the Marker should be placed. |
| `type` | `string` | No | Groups similar Markers. |
| `updated_at` | `string` | No | The ISO8601-formatted time when the Marker was updated. |
| `url` | `string` | No | A target for the marker. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Marker(nil).List(map[string]any{"dataset_slug": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Marker(nil).Create(map[string]any{
    "dataset_slug": "example_dataset_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Marker(nil).Update(map[string]any{
    "id": "marker_id",
    "dataset_slug": "dataset_slug",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Marker(nil).Remove(map[string]any{"id": "marker_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MarkerEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MarkerSettingEntity

```go
markerSetting := client.MarkerSetting(nil)
fmt.Println(markerSetting.GetName()) // "marker_setting"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `string` | Yes | Color to use for display of this marker type. |
| `created_at` | `string` | No | The ISO8601-formatted time when the Marker Setting was created. |
| `id` | `string` | No | The unique identifier (ID) for the Marker Setting. |
| `type` | `string` | Yes | Groups similar Markers. |
| `updated_at` | `any` | No | The ISO8601-formatted time when the Marker Setting was updated. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.MarkerSetting(nil).List(map[string]any{"dataset_slug": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.MarkerSetting(nil).Create(map[string]any{
    "dataset_slug": "example_dataset_slug",
    "color": "example_color",
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.MarkerSetting(nil).Update(map[string]any{
    "id": "marker_setting_id",
    "dataset_slug": "dataset_slug",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.MarkerSetting(nil).Remove(map[string]any{"id": "marker_setting_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MarkerSettingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## QueryEntity

```go
query := client.Query(nil)
fmt.Println(query.GetName()) // "query"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `breakdowns` | `[]any` | No | the columns by which to break events down into groups |
| `calculated_fields` | `[]any` | No | Computed properties that are calculated by a formula. |
| `calculations` | `[]any` | No | the calculations to return as a time series and summary table |
| `compare_time_offset_seconds` | `int` | No | When set, offsets the query's time range by this number of seconds into the past, allowing comparison with historical data from an earlier time period. |
| `end_time` | `int` | No | Absolute end time of query, in seconds since UNIX epoch. |
| `filter_combination` | `string` | No | Set to "OR" to match ANY filter in the filter list |
| `filters` | `[]any` | No | The filters with which to restrict the considered events |
| `formulas` | `[]any` | No | Mathematical formulas to be returned as a time series and summary table. |
| `granularity` | `int` | No | The time resolution of the query's graph, in seconds. |
| `havings` | `[]any` | No | The Having clause allows you to filter on the results table. |
| `id` | `string` | No |  |
| `limit` | `int` | No | The maximum number of unique groups returned in 'results'. |
| `orders` | `[]any` | No | The terms on which to order the query results. |
| `start_time` | `int` | No | Absolute start time of query, in seconds since UNIX epoch. |
| `time_range` | `int` | No | Time range of query in seconds. |
| `usage_mode` | `bool` | No | If `true`, query results will return aggregates without correcting for sample rates. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Query(nil).Load(map[string]any{"id": "query_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Query(nil).Create(map[string]any{
    "dataset_slug": "example_dataset_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `QueryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## QueryAnnotationEntity

```go
queryAnnotation := client.QueryAnnotation(nil)
fmt.Println(queryAnnotation.GetName()) // "query_annotation"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.QueryAnnotation(nil).List(map[string]any{"dataset_slug": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.QueryAnnotation(nil).Load(map[string]any{"id": "query_annotation_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.QueryAnnotation(nil).Create(map[string]any{
    "dataset_slug": "example_dataset_slug",
    "name": "example_name",
    "query_id": "example_query_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.QueryAnnotation(nil).Update(map[string]any{
    "id": "query_annotation_id",
    "dataset_slug": "dataset_slug",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.QueryAnnotation(nil).Remove(map[string]any{"id": "query_annotation_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `QueryAnnotationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## QueryResultEntity

```go
queryResult := client.QueryResult(nil)
fmt.Println(queryResult.GetName()) // "query_result"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `complete` | `bool` | No | Indicates if the query results are available yet or not. |
| `data` | `map[string]any` | No | An object containing the query result data |
| `disable_other_by_aggregate` | `bool` | No | If true, the "other_by_aggregate" data is excluded from the query result. |
| `disable_series` | `bool` | No | If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field. |
| `disable_total_by_aggregate` | `bool` | No | If `true`, data representing each aggregate in the query's total value will not be returned. |
| `error` | `string` | No | Only present if the query failed to run. |
| `id` | `string` | No | The unique identifier (ID) of a Query Result |
| `limit` | `int` | No | If `disable_series` is `true`, a limit may be optionally given. |
| `links` | `map[string]any` | No | An object containing UI links to the query result and query result graph |
| `query` | `any` | No |  |
| `query_id` | `string` | Yes | The ID of a query returned from the [Queries endpoint](/api/queries/). |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.QueryResult(nil).Load(map[string]any{"id": "query_result_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.QueryResult(nil).Create(map[string]any{
    "dataset_slug": "example_dataset_slug",
    "query_id": "example_query_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `QueryResultEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RecipientEntity

```go
recipient := client.Recipient(nil)
fmt.Println(recipient.GetName()) // "recipient"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `type` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Recipient(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Recipient(nil).Load(map[string]any{"id": "recipient_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Recipient(nil).Create(map[string]any{
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Recipient(nil).Update(map[string]any{
    "id": "recipient_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Recipient(nil).Remove(map[string]any{"id": "recipient_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RecipientEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SignalEntity

```go
signal := client.Signal(nil)
fmt.Println(signal.GetName()) // "signal"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_investigate` | `bool` | Yes | When `true`, Honeycomb will automatically start an investigation when this Signal fires. |
| `created_at` | `string` | Yes | The ISO8601-formatted time when the Signal was created. |
| `currently_anomalous` | `bool` | Yes | Whether the Signal is currently in an anomalous state. |
| `dataset_slug` | `string` | Yes | The slug of the dataset the Signal's service reports to. |
| `enabled` | `bool` | Yes | Whether the Signal is currently enabled. |
| `environment_slug` | `string` | Yes | The slug of the environment the Signal belongs to. |
| `id` | `string` | Yes | Unique identifier (ID) of the Signal. |
| `last_anomaly_ended_at` | `any` | Yes | The end time of the most recent anomaly, in seconds since UNIX epoch. |
| `last_anomaly_started_at` | `any` | Yes | The start time of the most recent anomaly, in seconds since UNIX epoch. |
| `measured_signal` | `string` | Yes | The kind of measurement the Signal is trained on. |
| `recipients` | `[]any` | Yes | The Recipients notified when this Signal fires. |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Signal(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Signal(nil).Load(map[string]any{"id": "signal_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Signal(nil).Update(map[string]any{
    "id": "signal_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SignalEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SloEntity

```go
slo := client.Slo(nil)
fmt.Println(slo.GetName()) // "slo"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | The ISO8601-formatted time when the SLO was created. |
| `dataset_slugs` | `[]any` | No | The dataset(s) the SLO will be evaluated against. |
| `description` | `string` | No | A nice description of the SLO's intent and context. |
| `id` | `string` | No |  |
| `name` | `string` | No | The name of the SLO. |
| `reset_at` | `string` | No | The ISO8601-formatted time the SLO was last reset. |
| `sli` | `map[string]any` | No | Reference to the [Calculated Field (also called Derived Column)](/api/calculated-fields/) used as the indicator of event success. |
| `tags` | `[]any` | No | A list of key-value pairs to help identify the SLO. |
| `target_per_million` | `int` | No | The number of events out of one million (1,000,000) that you expected qualified events to succeed. |
| `time_period_days` | `int` | No | The time period, in days, over which the SLO will be evaluated. |
| `updated_at` | `string` | No | The ISO8601-formatted time when the SLO was updated. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `dataset_slugs` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | Yes | Yes | Yes | - |
| `reset_at` | - | - | - | - | - |
| `sli` | - | Yes | Yes | Yes | - |
| `tags` | - | - | - | - | - |
| `target_per_million` | - | Yes | Yes | Yes | - |
| `time_period_days` | - | Yes | Yes | Yes | - |
| `updated_at` | - | - | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Slo(nil).List(map[string]any{"dataset_slug": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Slo(nil).Load(map[string]any{"id": "slo_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Slo(nil).Create(map[string]any{
    "dataset_slug": "example_dataset_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Slo(nil).Update(map[string]any{
    "id": "slo_id",
    "dataset_slug": "dataset_slug",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Slo(nil).Remove(map[string]any{"id": "slo_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SloEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SloCountEntity

```go
sloCount := client.SloCount(nil)
fmt.Println(sloCount.GetName()) // "slo_count"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error_count` | `int` | No | Number of failed (bad) events in this window. |
| `is_partial` | `bool` | No | When `true`, the data for this window may be incomplete. |
| `total_count` | `int` | No | Total number of events (good + bad) in this window. |
| `window_end` | `int` | No | End of the window as a Unix timestamp (seconds). |
| `window_start` | `int` | No | Start of the window as a Unix timestamp (seconds). |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.SloCount(nil).List(map[string]any{"dataset_slug": "example", "slo_id": "example", "end_time": 1, "start_time": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SloCountEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SloHistoryEntity

```go
sloHistory := client.SloHistory(nil)
fmt.Println(sloHistory.GetName()) // "slo_history"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_time` | `int` | Yes | The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for. |
| `ids` | `[]any` | Yes | A list of SLO IDs to retrieve history for. |
| `start_time` | `int` | Yes | The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.SloHistory(nil).Create(map[string]any{
    "end_time": 1,
    "ids": []any{},
    "start_time": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SloHistoryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SloHourlyCountEntity

```go
sloHourlyCount := client.SloHourlyCount(nil)
fmt.Println(sloHourlyCount.GetName()) // "slo_hourly_count"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_time` | `int` | No | End of the hour as a Unix timestamp (seconds). |
| `error_count` | `int` | No | Number of failed (bad) events in this hour. |
| `is_partial` | `bool` | No | When `true`, this bucket covers the current in-progress hour and its counts will increase until the hour completes. |
| `start_time` | `int` | No | Start of the hour as a Unix timestamp (seconds). |
| `total_count` | `int` | No | Total number of events (good + bad) in this hour. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.SloHourlyCount(nil).List(map[string]any{"dataset_slug": "example", "slo_id": "example", "end_time": 1, "start_time": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SloHourlyCountEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TriggerEntity

```go
trigger := client.Trigger(nil)
fmt.Println(trigger.GetName()) // "trigger"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alert_type` | `string` | No | How often to fire an alert when a trigger threshold is crossed. |
| `auto_investigate` | `bool` | No | When true, Honeycomb will automatically start an investigation when this Trigger fires. |
| `baseline_details` | `map[string]any` | No |  |
| `created_at` | `string` | No |  |
| `dataset_slug` | `string` | No | The slug of the dataset this trigger belongs to. |
| `description` | `string` | No | A longer description, displayed on the Trigger's detail page. |
| `disabled` | `bool` | No | If true, the trigger will not be evaluated and alerts will not be sent. |
| `evaluation_schedule` | `map[string]any` | Yes | A schedule that determines when the trigger is run. |
| `evaluation_schedule_type` | `string` | No | The schedule type used by the trigger. |
| `frequency` | `int` | No | The interval in seconds in which to check the results of the query’s calculation against the threshold. |
| `id` | `string` | No | The unique identifier (ID) for this Trigger. |
| `name` | `string` | No | A short, human-readable name for this Trigger, which will be displayed in the UI and when the trigger fires. |
| `query` | `map[string]any` | No | An inline query specification that is a strict subset of the standard Query Specification. |
| `query_id` | `string` | No | The ID of an existing saved Query that meets the trigger query requirements. |
| `recipients` | `[]any` | No | A list of [Recipients](/api/recipients/) to notify when the Trigger fires. |
| `tags` | `[]any` | No | A list of key-value pairs to help identify the Trigger. |
| `threshold` | `map[string]any` | Yes | The threshold over which the trigger will fire, specified as both an operator and a value. |
| `triggered` | `bool` | No | If true, the trigger has crossed its specified threshold without resolving. |
| `updated_at` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Trigger(nil).List(map[string]any{"dataset_slug": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Trigger(nil).Load(map[string]any{"id": "trigger_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Trigger(nil).Create(map[string]any{
    "dataset_slug": "example_dataset_slug",
    "evaluation_schedule": map[string]any{},
    "threshold": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Trigger(nil).Update(map[string]any{
    "id": "trigger_id",
    "dataset_slug": "dataset_slug",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Trigger(nil).Remove(map[string]any{"id": "trigger_id", "dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TriggerEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```go
client := sdk.NewHoneycombSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
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


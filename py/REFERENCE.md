# Honeycomb Python SDK Reference

Complete API reference for the Honeycomb Python SDK.


## HoneycombSDK

### Constructor

```python
from honeycomb_sdk import HoneycombSDK

client = HoneycombSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HoneycombSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = HoneycombSDK.test()
```


### Instance Methods

#### `Auth(data=None)`

Create a new `AuthEntity` instance. Pass `None` for no initial data.

#### `Board(data=None)`

Create a new `BoardEntity` instance. Pass `None` for no initial data.

#### `BoardView(data=None)`

Create a new `BoardViewEntity` instance. Pass `None` for no initial data.

#### `BulkSignalRecipientAssignment(data=None)`

Create a new `BulkSignalRecipientAssignmentEntity` instance. Pass `None` for no initial data.

#### `BurnAlert(data=None)`

Create a new `BurnAlertEntity` instance. Pass `None` for no initial data.

#### `CalculatedField(data=None)`

Create a new `CalculatedFieldEntity` instance. Pass `None` for no initial data.

#### `Column(data=None)`

Create a new `ColumnEntity` instance. Pass `None` for no initial data.

#### `Dataset(data=None)`

Create a new `DatasetEntity` instance. Pass `None` for no initial data.

#### `DatasetDefinition(data=None)`

Create a new `DatasetDefinitionEntity` instance. Pass `None` for no initial data.

#### `Environment(data=None)`

Create a new `EnvironmentEntity` instance. Pass `None` for no initial data.

#### `Event(data=None)`

Create a new `EventEntity` instance. Pass `None` for no initial data.

#### `HistoricalAnomaly(data=None)`

Create a new `HistoricalAnomalyEntity` instance. Pass `None` for no initial data.

#### `KeyManagement(data=None)`

Create a new `KeyManagementEntity` instance. Pass `None` for no initial data.

#### `Kinesi(data=None)`

Create a new `KinesiEntity` instance. Pass `None` for no initial data.

#### `MapDependency(data=None)`

Create a new `MapDependencyEntity` instance. Pass `None` for no initial data.

#### `Marker(data=None)`

Create a new `MarkerEntity` instance. Pass `None` for no initial data.

#### `MarkerSetting(data=None)`

Create a new `MarkerSettingEntity` instance. Pass `None` for no initial data.

#### `Query(data=None)`

Create a new `QueryEntity` instance. Pass `None` for no initial data.

#### `QueryAnnotation(data=None)`

Create a new `QueryAnnotationEntity` instance. Pass `None` for no initial data.

#### `QueryResult(data=None)`

Create a new `QueryResultEntity` instance. Pass `None` for no initial data.

#### `Recipient(data=None)`

Create a new `RecipientEntity` instance. Pass `None` for no initial data.

#### `Signal(data=None)`

Create a new `SignalEntity` instance. Pass `None` for no initial data.

#### `Slo(data=None)`

Create a new `SloEntity` instance. Pass `None` for no initial data.

#### `SloCount(data=None)`

Create a new `SloCountEntity` instance. Pass `None` for no initial data.

#### `SloHistory(data=None)`

Create a new `SloHistoryEntity` instance. Pass `None` for no initial data.

#### `SloHourlyCount(data=None)`

Create a new `SloHourlyCountEntity` instance. Pass `None` for no initial data.

#### `Trigger(data=None)`

Create a new `TriggerEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AuthEntity

```python
auth = client.Auth()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key_access` | `dict` | Yes |  |
| `environment` | `dict` | Yes |  |
| `id` | `str` | Yes | Unique identifier (ID) of the API Key. |
| `team` | `dict` | Yes |  |
| `type` | `str` | Yes | The type of API Key. |

### Operations

#### `load(reqmatch, ctrl=None) -> AuthEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Auth().load({"id": "auth_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AuthEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BoardEntity

```python
board = client.Board()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No | A description of the Board. |
| `id` | `str` | No | Unique identifier (ID), returned in response bodies. |
| `layout_generation` | `str` | No | The layout generation mode for the board. |
| `links` | `dict` | No |  |
| `name` | `str` | Yes | The name of the Board. |
| `panels` | `list` | No |  |
| `preset_filters` | `list` | No | A list of preset filters to apply to the board. |
| `tags` | `list` | No | A list of key-value pairs to help identify the Trigger. |
| `type` | `str` | Yes | The type of the board. |

### Operations

#### `create(reqdata, ctrl=None) -> BoardEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Board().create({
    "name": "example_name",  # str
    "type": "example_type",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[BoardEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Board().list()
for board in results:
    print(board.data_get())
```

#### `load(reqmatch, ctrl=None) -> BoardEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Board().load({"id": "board_id"})
```

#### `remove(reqmatch, ctrl=None) -> BoardEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Board().remove({"id": "board_id"})
```

#### `update(reqdata, ctrl=None) -> BoardEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Board().update({
    "id": "board_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BoardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BoardViewEntity

```python
board_view = client.BoardView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `filters` | `list` | No | The filters to apply to this view. |
| `id` | `str` | No | Unique identifier for the board view. |
| `name` | `str` | No | The name of the view. |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `filters` | - | - | Yes | Yes |
| `id` | - | - | - | - |
| `name` | - | - | Yes | Yes |

### Operations

#### `create(reqdata, ctrl=None) -> BoardViewEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BoardView().create({
    "id": "example_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[BoardViewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.BoardView().list({"id": "example"})
for board_view in results:
    print(board_view.data_get())
```

#### `load(reqmatch, ctrl=None) -> BoardViewEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.BoardView().load({"id": "board_view_id", "board_id": "board_id"})
```

#### `update(reqdata, ctrl=None) -> BoardViewEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.BoardView().update({
    "id": "board_view_id",
    "board_id": "board_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BoardViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BulkSignalRecipientAssignmentEntity

```python
bulk_signal_recipient_assignment = client.BulkSignalRecipientAssignment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `failed` | `list` | Yes | The Signals that were not updated, each with the reason. |
| `recipients` | `list` | Yes | The Recipients to assign to every selected Signal. |
| `selector` | `dict` | Yes | Chooses which Signals to act on. |
| `succeeded` | `list` | Yes | The Signals whose Recipient set was updated. |
| `unchanged` | `list` | Yes | The Signals that already had every requested Recipient. |

### Operations

#### `create(reqdata, ctrl=None) -> BulkSignalRecipientAssignmentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BulkSignalRecipientAssignment().create({
    "failed": [],  # list
    "recipients": [],  # list
    "selector": {},  # dict
    "succeeded": [],  # list
    "unchanged": [],  # list
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BulkSignalRecipientAssignmentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BurnAlertEntity

```python
burn_alert = client.BurnAlert()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alert_type` | `str` | Yes |  |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> BurnAlertEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BurnAlert().create({
    "id": "example_id",  # str
    "alert_type": "example_alert_type",  # str
})
```

#### `load(reqmatch, ctrl=None) -> BurnAlertEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.BurnAlert().load({"id": "burn_alert_id", "slo_id": "slo_id"})
```

#### `remove(reqmatch, ctrl=None) -> BurnAlertEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.BurnAlert().remove({"burn_alert_id": "burn_alert_id", "dataset_slug": "dataset_slug"})
```

#### `update(reqdata, ctrl=None) -> BurnAlertEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.BurnAlert().update({
    "id": "burn_alert_id",
    "burn_alert_id": "burn_alert_id",
    "dataset_slug": "dataset_slug",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BurnAlertEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CalculatedFieldEntity

```python
calculated_field = client.CalculatedField()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alias` | `str` | Yes | The human-readable name of the Calculated Field (also called Derived Column), as it will be referenced when building queries. |
| `created_at` | `str` | Yes | ISO8601 formatted time when the field was created. |
| `description` | `str` | No | A human-readable description for the Calculated Field that displays in the UI. |
| `expression` | `str` | Yes | The expression to evaluate to construct this Calculated Field's value. |
| `id` | `str` | Yes | Unique identifier (ID), returned in response bodies. |
| `updated_at` | `str` | Yes | ISO8601 formatted time when the field was updated. |

### Operations

#### `create(reqdata, ctrl=None) -> CalculatedFieldEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CalculatedField().create({
    "dataset_slug": "example_dataset_slug",  # str
    "alias": "example_alias",  # str
    "created_at": "example_created_at",  # str
    "expression": "example_expression",  # str
    "id": "example_id",  # str
    "updated_at": "example_updated_at",  # str
})
```

#### `load(reqmatch, ctrl=None) -> CalculatedFieldEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.CalculatedField().load({"dataset_slug": "dataset_slug"})
```

#### `remove(reqmatch, ctrl=None) -> CalculatedFieldEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.CalculatedField().remove({"dataset_slug": "dataset_slug", "derived_column_id": "derived_column_id"})
```

#### `update(reqdata, ctrl=None) -> CalculatedFieldEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.CalculatedField().update({
    "dataset_slug": "dataset_slug",
    "derived_column_id": "derived_column_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CalculatedFieldEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ColumnEntity

```python
column = client.Column()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | ISO8601 formatted time the column was created. |
| `description` | `str` | No | Column description. |
| `hidden` | `bool` | No | If `true`, the column is excluded from autocomplete and raw data field lists. |
| `id` | `str` | No | Unique identifier (ID), returned in response bodies. |
| `key_name` | `str` | Yes | Name of the Column. |
| `last_written` | `str` | No | ISO8601 formatted time the column was last written to (received event data). |
| `type` | `str` | No | Type of data that the Column will contain. |
| `updated_at` | `str` | No | ISO8601 formatted time the column was updated. |

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

#### `create(reqdata, ctrl=None) -> ColumnEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Column().create({
    "id": "example_id",  # str
    "key_name": "example_key_name",  # str
})
```

#### `load(reqmatch, ctrl=None) -> ColumnEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Column().load({"id": "column_id"})
```

#### `remove(reqmatch, ctrl=None) -> ColumnEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Column().remove({"column_id": "column_id", "dataset_slug": "dataset_slug"})
```

#### `update(reqdata, ctrl=None) -> ColumnEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Column().update({
    "id": "column_id",
    "column_id": "column_id",
    "dataset_slug": "dataset_slug",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ColumnEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DatasetEntity

```python
dataset = client.Dataset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | The ISO8601-formatted time when the dataset was created. |
| `dataset_type` | `str` | No | The type of data contained in the dataset. |
| `description` | `str` | No | A description for the dataset. |
| `expand_json_depth` | `int` | No | The maximum unpacking depth of nested JSON fields. |
| `id` | `str` | No |  |
| `last_written_at` | `None | str` | No | The ISO8601-formatted time when the dataset last received event data. |
| `name` | `str` | Yes | The name of the dataset. |
| `regular_columns_count` | `None | int` | No | The total number of unique fields for this Dataset. |
| `settings` | `dict` | No |  |
| `slug` | `str` | No | The 'slug' of the dataset to be used in URLs. |

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

#### `create(reqdata, ctrl=None) -> DatasetEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Dataset().create({
    "name": "example_name",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[DatasetEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Dataset().list()
for dataset in results:
    print(dataset.data_get())
```

#### `load(reqmatch, ctrl=None) -> DatasetEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Dataset().load({"id": "dataset_id"})
```

#### `remove(reqmatch, ctrl=None) -> DatasetEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Dataset().remove({"id": "dataset_id"})
```

#### `update(reqdata, ctrl=None) -> DatasetEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Dataset().update({
    "id": "dataset_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DatasetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DatasetDefinitionEntity

```python
dataset_definition = client.DatasetDefinition()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `annotation_type` | `Any` | No | Metadata: Annotation Type - The type of span annotation. |
| `duration_ms` | `Any` | No | Span Duration - How much time the span took, in milliseconds. |
| `error` | `Any` | No | Use a Boolean or String to indicate error. |
| `id` | `str` | No |  |
| `link_span_id` | `str` | No | Metadata: Link Span ID - Links let you tie traces and spans to one another. |
| `link_trace_id` | `str` | No | Metadata: Link Trace ID - Links let you tie traces and spans to one another. |
| `log_message` | `Any` | No | A value containing the log event message. |
| `log_severity` | `Any` | No | Severity level of the event (also known as log level). |
| `name` | `str` | No | The name of the function or method where the span was created. |
| `parent_id` | `str` | No | The Parent Span ID - The ID of this span's parent span, the call location the current span was called from. |
| `route` | `Any` | No | The HTTP URL or equivalent route processed by the request. |
| `service_name` | `Any` | No | The name of the instrumented service. |
| `span_id` | `str` | No | The unique identifier (ID) for each span. |
| `span_kind` | `Any` | No | Metadata: Kind - The kind of Span. |
| `status` | `Any` | No | Indicates the success, failure, or other status of a request. |
| `trace_id` | `str` | No | The ID of the trace this span belongs to. |
| `user` | `Any` | No | The user making the request in the system. |

### Operations

#### `load(reqmatch, ctrl=None) -> DatasetDefinitionEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DatasetDefinition().load({"id": "dataset_definition_id"})
```

#### `update(reqdata, ctrl=None) -> DatasetDefinitionEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.DatasetDefinition().update({
    "id": "dataset_definition_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DatasetDefinitionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EnvironmentEntity

```python
environment = client.Environment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `dict` | Yes |  |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> EnvironmentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Environment().create({
    "team_slug": "example_team_slug",  # str
    "data": {},  # dict
})
```

#### `load(reqmatch, ctrl=None) -> EnvironmentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Environment().load({"id": "environment_id", "team_slug": "team_slug"})
```

#### `remove(reqmatch, ctrl=None) -> EnvironmentEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Environment().remove({"id": "environment_id", "team_slug": "team_slug"})
```

#### `update(reqdata, ctrl=None) -> EnvironmentEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Environment().update({
    "id": "environment_id",
    "team_slug": "team_slug",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventEntity

```python
event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `batch_events` | `list` | No | The array should contain one or more JSON objects representing Events. |
| `id` | `str` | No |  |
| `status` | `int` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> EventEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Event().create({
    "dataset_slug": "example_dataset_slug",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HistoricalAnomalyEntity

```python
historical_anomaly = client.HistoricalAnomaly()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ended_at` | `int` | Yes | The time the anomaly ended, in seconds since UNIX epoch. |
| `id` | `str` | Yes | A deterministic identifier for the anomaly, derived from the Signal, its measured kind, and the anomaly's start time. |
| `measurement` | `float` | Yes | The measured value that triggered the anomaly. |
| `normal_range` | `Any` | Yes | The trained normal band the measurement exceeded. |
| `started_at` | `int` | Yes | The time the anomaly started, in seconds since UNIX epoch. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[HistoricalAnomalyEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.HistoricalAnomaly().list({"signal_id": "example", "end_time": 1, "start_time": 1})
for historical_anomaly in results:
    print(historical_anomaly.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HistoricalAnomalyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## KeyManagementEntity

```python
key_management = client.KeyManagement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `dict` | Yes |  |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> KeyManagementEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.KeyManagement().create({
    "team_slug": "example_team_slug",  # str
    "data": {},  # dict
})
```

#### `load(reqmatch, ctrl=None) -> KeyManagementEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.KeyManagement().load({"id": "key_management_id", "team_slug": "team_slug"})
```

#### `remove(reqmatch, ctrl=None) -> KeyManagementEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.KeyManagement().remove({"id": "key_management_id", "team_slug": "team_slug"})
```

#### `update(reqdata, ctrl=None) -> KeyManagementEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.KeyManagement().update({
    "id": "key_management_id",
    "team_slug": "team_slug",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KeyManagementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## KinesiEntity

```python
kinesi = client.Kinesi()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errorMessage` | `str` | No |  |
| `records` | `list` | No |  |
| `requestId` | `str` | No |  |
| `timestamp` | `int` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> KinesiEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Kinesi().create({
    "dataset_slug": "example_dataset_slug",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KinesiEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MapDependencyEntity

```python
map_dependency = client.MapDependency()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dependencies` | `Any` | No | Array of service dependencies. |
| `end_time` | `int` | No | Absolute end time to evaluate dependencies, in seconds since UNIX epoch. |
| `filters` | `list` | No | Optional list of service nodes to filter dependencies by. |
| `links` | `dict` | Yes | Links to iterate through the pages of results. |
| `request_id` | `str` | No | Unique identifier for the Map Dependency Request. |
| `start_time` | `int` | No | Absolute start time to evaluate dependencies, in seconds since UNIX epoch. |
| `status` | `str` | No | Status of the Map Dependency Request. |
| `time_range` | `int` | No | Time range in seconds (minimum 1). |

### Operations

#### `create(reqdata, ctrl=None) -> MapDependencyEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.MapDependency().create({
    "links": {},  # dict
})
```

#### `load(reqmatch, ctrl=None) -> MapDependencyEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.MapDependency().load({"request_id": "request_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MapDependencyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MarkerEntity

```python
marker = client.Marker()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `str` | No | Color can be assigned to Markers using the Marker Settings endpoint. |
| `created_at` | `str` | No | The ISO8601-formatted time when the Marker was created. |
| `end_time` | `int` | No | Specifies end time, and allows a Marker to be recorded as representing a time range, such as a 5 minute deploy. |
| `id` | `str` | No | A 6 character hexadecimal string assigned on Marker creation. |
| `message` | `str` | No | A message to describe this specific Marker. |
| `start_time` | `int` | No | Indicates the time the Marker should be placed. |
| `type` | `str` | No | Groups similar Markers. |
| `updated_at` | `str` | No | The ISO8601-formatted time when the Marker was updated. |
| `url` | `str` | No | A target for the marker. |

### Operations

#### `create(reqdata, ctrl=None) -> MarkerEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Marker().create({
    "id": "example_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> MarkerEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Marker().load({"id": "marker_id"})
```

#### `remove(reqmatch, ctrl=None) -> MarkerEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Marker().remove({"dataset_slug": "dataset_slug", "marker_id": "marker_id"})
```

#### `update(reqdata, ctrl=None) -> MarkerEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Marker().update({
    "id": "marker_id",
    "dataset_slug": "dataset_slug",
    "marker_id": "marker_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarkerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MarkerSettingEntity

```python
marker_setting = client.MarkerSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `str` | Yes | Color to use for display of this marker type. |
| `created_at` | `str` | No | The ISO8601-formatted time when the Marker Setting was created. |
| `id` | `str` | No | The unique identifier (ID) for the Marker Setting. |
| `type` | `str` | Yes | Groups similar Markers. |
| `updated_at` | `None | str` | No | The ISO8601-formatted time when the Marker Setting was updated. |

### Operations

#### `create(reqdata, ctrl=None) -> MarkerSettingEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.MarkerSetting().create({
    "id": "example_id",  # str
    "color": "example_color",  # str
    "type": "example_type",  # str
})
```

#### `load(reqmatch, ctrl=None) -> MarkerSettingEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.MarkerSetting().load({"id": "marker_setting_id"})
```

#### `remove(reqmatch, ctrl=None) -> MarkerSettingEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.MarkerSetting().remove({"dataset_slug": "dataset_slug", "marker_setting_id": "marker_setting_id"})
```

#### `update(reqdata, ctrl=None) -> MarkerSettingEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.MarkerSetting().update({
    "id": "marker_setting_id",
    "dataset_slug": "dataset_slug",
    "marker_setting_id": "marker_setting_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarkerSettingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## QueryEntity

```python
query = client.Query()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `breakdowns` | `list` | No | the columns by which to break events down into groups |
| `calculated_fields` | `list` | No | Computed properties that are calculated by a formula. |
| `calculations` | `list` | No | the calculations to return as a time series and summary table |
| `compare_time_offset_seconds` | `int` | No | When set, offsets the query's time range by this number of seconds into the past, allowing comparison with historical data from an earlier time period. |
| `end_time` | `int` | No | Absolute end time of query, in seconds since UNIX epoch. |
| `filter_combination` | `str` | No | Set to "OR" to match ANY filter in the filter list |
| `filters` | `list` | No | The filters with which to restrict the considered events |
| `formulas` | `list` | No | Mathematical formulas to be returned as a time series and summary table. |
| `granularity` | `int` | No | The time resolution of the query's graph, in seconds. |
| `havings` | `list` | No | The Having clause allows you to filter on the results table. |
| `id` | `str` | No |  |
| `limit` | `int` | No | The maximum number of unique groups returned in 'results'. |
| `orders` | `list` | No | The terms on which to order the query results. |
| `start_time` | `int` | No | Absolute start time of query, in seconds since UNIX epoch. |
| `time_range` | `int` | No | Time range of query in seconds. |
| `usage_mode` | `bool` | No | If `true`, query results will return aggregates without correcting for sample rates. |

### Operations

#### `create(reqdata, ctrl=None) -> QueryEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Query().create({
    "id": "example_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> QueryEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Query().load({"dataset_slug": "dataset_slug", "query_id": "query_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QueryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## QueryAnnotationEntity

```python
query_annotation = client.QueryAnnotation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | ISO8601 formatted time when the Query Annotation was created. |
| `description` | `str` | No | A description of the Query. |
| `id` | `str` | No | The unique identifier (ID) of a Query Annotation. |
| `name` | `str` | Yes | A name for the Query. |
| `query_id` | `str` | Yes | The ID of the Query that the annotation describes. |
| `source` | `str` | No | The source of the Query Annotation. |
| `updated_at` | `str` | No | ISO8601 formatted time when the Query Annotation was updated. |

### Operations

#### `create(reqdata, ctrl=None) -> QueryAnnotationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.QueryAnnotation().create({
    "id": "example_id",  # str
    "name": "example_name",  # str
    "query_id": "example_query_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> QueryAnnotationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.QueryAnnotation().load({"id": "query_annotation_id"})
```

#### `remove(reqmatch, ctrl=None) -> QueryAnnotationEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.QueryAnnotation().remove({"dataset_slug": "dataset_slug", "query_annotation_id": "query_annotation_id"})
```

#### `update(reqdata, ctrl=None) -> QueryAnnotationEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.QueryAnnotation().update({
    "id": "query_annotation_id",
    "dataset_slug": "dataset_slug",
    "query_annotation_id": "query_annotation_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QueryAnnotationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## QueryResultEntity

```python
query_result = client.QueryResult()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `complete` | `bool` | No | Indicates if the query results are available yet or not. |
| `data` | `dict` | No | An object containing the query result data |
| `disable_other_by_aggregate` | `bool` | No | If true, the "other_by_aggregate" data is excluded from the query result. |
| `disable_series` | `bool` | No | If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field. |
| `disable_total_by_aggregate` | `bool` | No | If `true`, data representing each aggregate in the query's total value will not be returned. |
| `error` | `str` | No | Only present if the query failed to run. |
| `id` | `str` | No | The unique identifier (ID) of a Query Result |
| `limit` | `int` | No | If `disable_series` is `true`, a limit may be optionally given. |
| `links` | `dict` | No | An object containing UI links to the query result and query result graph |
| `query` | `Any` | No |  |
| `query_id` | `str` | Yes | The ID of a query returned from the [Queries endpoint](/api/queries/). |

### Operations

#### `create(reqdata, ctrl=None) -> QueryResultEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.QueryResult().create({
    "id": "example_id",  # str
    "query_id": "example_query_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> QueryResultEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.QueryResult().load({"dataset_slug": "dataset_slug", "query_result_id": "query_result_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QueryResultEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RecipientEntity

```python
recipient = client.Recipient()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `type` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> RecipientEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Recipient().create({
    "type": "example_type",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[RecipientEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Recipient().list()
for recipient in results:
    print(recipient.data_get())
```

#### `load(reqmatch, ctrl=None) -> RecipientEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Recipient().load({"id": "recipient_id"})
```

#### `remove(reqmatch, ctrl=None) -> RecipientEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Recipient().remove({"id": "recipient_id"})
```

#### `update(reqdata, ctrl=None) -> RecipientEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Recipient().update({
    "id": "recipient_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecipientEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SignalEntity

```python
signal = client.Signal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_investigate` | `bool` | Yes | When `true`, Honeycomb will automatically start an investigation when this Signal fires. |
| `created_at` | `str` | Yes | The ISO8601-formatted time when the Signal was created. |
| `currently_anomalous` | `bool` | Yes | Whether the Signal is currently in an anomalous state. |
| `dataset_slug` | `str` | Yes | The slug of the dataset the Signal's service reports to. |
| `enabled` | `bool` | Yes | Whether the Signal is currently enabled. |
| `environment_slug` | `str` | Yes | The slug of the environment the Signal belongs to. |
| `id` | `str` | Yes | Unique identifier (ID) of the Signal. |
| `last_anomaly_ended_at` | `int | None` | Yes | The end time of the most recent anomaly, in seconds since UNIX epoch. |
| `last_anomaly_started_at` | `int | None` | Yes | The start time of the most recent anomaly, in seconds since UNIX epoch. |
| `measured_signal` | `str` | Yes | The kind of measurement the Signal is trained on. |
| `recipients` | `list` | Yes | The Recipients notified when this Signal fires. |
| `sensitivity` | `Any` | Yes | How far a measurement must deviate from the trained normal band before the Signal fires. |
| `service_name` | `str` | Yes | The name of the service the Signal monitors. |
| `status` | `str` | Yes | The lifecycle status of the Signal. |
| `updated_at` | `str` | Yes | The ISO8601-formatted time when the Signal was last updated. |

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

#### `list(reqmatch=None, ctrl=None) -> list[SignalEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Signal().list()
for signal in results:
    print(signal.data_get())
```

#### `load(reqmatch, ctrl=None) -> SignalEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Signal().load({"id": "signal_id"})
```

#### `update(reqdata, ctrl=None) -> SignalEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Signal().update({
    "id": "signal_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SignalEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SloEntity

```python
slo = client.Slo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | The ISO8601-formatted time when the SLO was created. |
| `dataset_slugs` | `list` | No | The dataset(s) the SLO will be evaluated against. |
| `description` | `str` | No | A nice description of the SLO's intent and context. |
| `id` | `str` | No |  |
| `name` | `str` | No | The name of the SLO. |
| `reset_at` | `str` | No | The ISO8601-formatted time the SLO was last reset. |
| `sli` | `dict` | No | Reference to the [Calculated Field](/api/calculated-fields/) used as the indicator of event success. |
| `tags` | `list` | No | A list of key-value pairs to help identify the SLO. |
| `target_per_million` | `int` | No | The number of events out of one million (1,000,000) that you expected qualified events to succeed. |
| `time_period_days` | `int` | No | The time period, in days, over which the SLO will be evaluated. |
| `updated_at` | `str` | No | The ISO8601-formatted time when the SLO was updated. |

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

#### `create(reqdata, ctrl=None) -> SloEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Slo().create({
    "id": "example_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> SloEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Slo().load({"id": "slo_id"})
```

#### `remove(reqmatch, ctrl=None) -> SloEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Slo().remove({"dataset_slug": "dataset_slug", "slo_id": "slo_id"})
```

#### `update(reqdata, ctrl=None) -> SloEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Slo().update({
    "id": "slo_id",
    "dataset_slug": "dataset_slug",
    "slo_id": "slo_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SloEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SloCountEntity

```python
slo_count = client.SloCount()
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

#### `list(reqmatch=None, ctrl=None) -> list[SloCountEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.SloCount().list({"dataset_slug": "example", "slo_id": "example", "end_time": 1, "start_time": 1})
for slo_count in results:
    print(slo_count.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SloCountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SloHistoryEntity

```python
slo_history = client.SloHistory()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_time` | `int` | Yes | The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for. |
| `ids` | `list` | Yes | A list of SLO IDs to retrieve history for. |
| `start_time` | `int` | Yes | The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for. |

### Operations

#### `create(reqdata, ctrl=None) -> SloHistoryEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.SloHistory().create({
    "end_time": 1,  # int
    "ids": [],  # list
    "start_time": 1,  # int
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SloHistoryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SloHourlyCountEntity

```python
slo_hourly_count = client.SloHourlyCount()
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

#### `list(reqmatch=None, ctrl=None) -> list[SloHourlyCountEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.SloHourlyCount().list({"dataset_slug": "example", "slo_id": "example", "end_time": 1, "start_time": 1})
for slo_hourly_count in results:
    print(slo_hourly_count.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SloHourlyCountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TriggerEntity

```python
trigger = client.Trigger()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alert_type` | `str` | No | How often to fire an alert when a trigger threshold is crossed. |
| `auto_investigate` | `bool` | No | When true, Honeycomb will automatically start an investigation when this Trigger fires. |
| `baseline_details` | `dict` | No |  |
| `created_at` | `str` | No |  |
| `dataset_slug` | `str` | No | The slug of the dataset this trigger belongs to. |
| `description` | `str` | No | A longer description, displayed on the Trigger's detail page. |
| `disabled` | `bool` | No | If true, the trigger will not be evaluated and alerts will not be sent. |
| `evaluation_schedule` | `dict` | Yes | A schedule that determines when the trigger is run. |
| `evaluation_schedule_type` | `str` | No | The schedule type used by the trigger. |
| `frequency` | `int` | No | The interval in seconds in which to check the results of the query’s calculation against the threshold. |
| `id` | `str` | No | The unique identifier (ID) for this Trigger. |
| `name` | `str` | No | A short, human-readable name for this Trigger, which will be displayed in the UI and when the trigger fires. |
| `query` | `dict` | No | An inline query specification that is a strict subset of the standard Query Specification. |
| `query_id` | `str` | No | The ID of an existing saved Query that meets the trigger query requirements. |
| `recipients` | `list` | No | A list of [Recipients](/api/recipients/) to notify when the Trigger fires. |
| `tags` | `list` | No | A list of key-value pairs to help identify the Trigger. |
| `threshold` | `dict` | Yes | The threshold over which the trigger will fire, specified as both an operator and a value. |
| `triggered` | `bool` | No | If true, the trigger has crossed its specified threshold without resolving. |
| `updated_at` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> TriggerEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Trigger().create({
    "id": "example_id",  # str
    "evaluation_schedule": {},  # dict
    "threshold": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list[TriggerEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Trigger().list({"recipient_id": "example"})
for trigger in results:
    print(trigger.data_get())
```

#### `load(reqmatch, ctrl=None) -> TriggerEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Trigger().load({"id": "trigger_id"})
```

#### `remove(reqmatch, ctrl=None) -> TriggerEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Trigger().remove({"dataset_slug": "dataset_slug", "trigger_id": "trigger_id"})
```

#### `update(reqdata, ctrl=None) -> TriggerEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Trigger().update({
    "id": "trigger_id",
    "dataset_slug": "dataset_slug",
    "trigger_id": "trigger_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TriggerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```python
client = HoneycombSDK({
    "feature": {
        "test": {"active": True},
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


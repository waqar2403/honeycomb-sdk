# Honeycomb Python SDK



The Python SDK for the Honeycomb API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Auth()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/honeycomb-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record. The client sends the API key in the `X-Honeycomb-Team` header.

### 1. Create a client

```python
import os
from honeycomb_sdk import HoneycombSDK

client = HoneycombSDK({
    "apikey": os.environ.get("HONEYCOMB_APIKEY"),
})
```

### 3. Load a boardview

BoardView is nested under board, so provide the `board_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    boardview = client.BoardView().load({"board_id": "example_board_id", "id": "example_id"})
    print(boardview.data_get())
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    column = client.Column().load({"id": "example_id"})
    print(column.data_get())
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = HoneycombSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
column = client.Column().load({"id": "test01"})
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = HoneycombSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
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
cd py && pytest test/
```


## Reference

### HoneycombSDK

```python
from honeycomb_sdk import HoneycombSDK

client = HoneycombSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = HoneycombSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### HoneycombSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Auth` | `(data) -> AuthEntity` | Create an Auth entity instance. |
| `Board` | `(data) -> BoardEntity` | Create a Board entity instance. |
| `BoardView` | `(data) -> BoardViewEntity` | Create a BoardView entity instance. |
| `BulkSignalRecipientAssignment` | `(data) -> BulkSignalRecipientAssignmentEntity` | Create a BulkSignalRecipientAssignment entity instance. |
| `BurnAlert` | `(data) -> BurnAlertEntity` | Create a BurnAlert entity instance. |
| `CalculatedField` | `(data) -> CalculatedFieldEntity` | Create a CalculatedField entity instance. |
| `Column` | `(data) -> ColumnEntity` | Create a Column entity instance. |
| `Dataset` | `(data) -> DatasetEntity` | Create a Dataset entity instance. |
| `DatasetDefinition` | `(data) -> DatasetDefinitionEntity` | Create a DatasetDefinition entity instance. |
| `Environment` | `(data) -> EnvironmentEntity` | Create an Environment entity instance. |
| `Event` | `(data) -> EventEntity` | Create an Event entity instance. |
| `HistoricalAnomaly` | `(data) -> HistoricalAnomalyEntity` | Create a HistoricalAnomaly entity instance. |
| `KeyManagement` | `(data) -> KeyManagementEntity` | Create a KeyManagement entity instance. |
| `Kinesi` | `(data) -> KinesiEntity` | Create a Kinesi entity instance. |
| `MapDependency` | `(data) -> MapDependencyEntity` | Create a MapDependency entity instance. |
| `Marker` | `(data) -> MarkerEntity` | Create a Marker entity instance. |
| `MarkerSetting` | `(data) -> MarkerSettingEntity` | Create a MarkerSetting entity instance. |
| `Query` | `(data) -> QueryEntity` | Create a Query entity instance. |
| `QueryAnnotation` | `(data) -> QueryAnnotationEntity` | Create a QueryAnnotation entity instance. |
| `QueryResult` | `(data) -> QueryResultEntity` | Create a QueryResult entity instance. |
| `Recipient` | `(data) -> RecipientEntity` | Create a Recipient entity instance. |
| `Signal` | `(data) -> SignalEntity` | Create a Signal entity instance. |
| `Slo` | `(data) -> SloEntity` | Create a Slo entity instance. |
| `SloCount` | `(data) -> SloCountEntity` | Create a SloCount entity instance. |
| `SloHistory` | `(data) -> SloHistoryEntity` | Create a SloHistory entity instance. |
| `SloHourlyCount` | `(data) -> SloHourlyCountEntity` | Create a SloHourlyCount entity instance. |
| `Trigger` | `(data) -> TriggerEntity` | Create a Trigger entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Auth

| Field | Description |
| --- | --- |
| `api_key_access` |  |
| `environment` |  |
| `id` | Unique identifier (ID) of the API Key. |
| `team` |  |
| `type` | The type of API Key. |

Operations: Load.

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

Operations: Create, List, Load, Remove, Update.

API path: `/1/boards`

#### BoardView

| Field | Description |
| --- | --- |
| `filters` | The filters to apply to this view. |
| `id` | Unique identifier for the board view. |
| `name` | The name of the view. |

Operations: Create, List, Load, Update.

API path: `/1/boards/{boardId}/views`

#### BulkSignalRecipientAssignment

| Field | Description |
| --- | --- |
| `failed` | The Signals that were not updated, each with the reason. |
| `recipients` | The Recipients to assign to every selected Signal. |
| `selector` | Chooses which Signals to act on. |
| `succeeded` | The Signals whose Recipient set was updated. |
| `unchanged` | The Signals that already had every requested Recipient. |

Operations: Create.

API path: `/1/signals/recipient_assignments`

#### BurnAlert

| Field | Description |
| --- | --- |
| `alert_type` |  |
| `id` |  |

Operations: Create, Load, Remove, Update.

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

Operations: Create, Load, Remove, Update.

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

Operations: Create, Load, Remove, Update.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Load, Update.

API path: `/1/dataset_definitions/{datasetSlug}`

#### Environment

| Field | Description |
| --- | --- |
| `data` |  |
| `id` |  |

Operations: Create, Load, Remove, Update.

API path: `/2/teams/{teamSlug}/environments`

#### Event

| Field | Description |
| --- | --- |
| `batch_events` | The array should contain one or more JSON objects representing Events. |
| `id` |  |
| `status` |  |

Operations: Create.

API path: `/1/batch/{datasetSlug}`

#### HistoricalAnomaly

| Field | Description |
| --- | --- |
| `ended_at` | The time the anomaly ended, in seconds since UNIX epoch. |
| `id` | A deterministic identifier for the anomaly, derived from the Signal, its measured kind, and the anomaly's start time. |
| `measurement` | The measured value that triggered the anomaly. |
| `normal_range` | The trained normal band the measurement exceeded. |
| `started_at` | The time the anomaly started, in seconds since UNIX epoch. |

Operations: List.

API path: `/1/signals/{signalId}/historical_anomalies`

#### KeyManagement

| Field | Description |
| --- | --- |
| `data` |  |
| `id` |  |

Operations: Create, Load, Remove, Update.

API path: `/2/teams/{teamSlug}/api-keys`

#### Kinesi

| Field | Description |
| --- | --- |
| `errorMessage` |  |
| `records` |  |
| `requestId` |  |
| `timestamp` |  |

Operations: Create.

API path: `/1/kinesis_events/{datasetSlug}`

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

Operations: Create, Load.

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

Operations: Create, Load, Remove, Update.

API path: `/1/markers/{datasetSlug}`

#### MarkerSetting

| Field | Description |
| --- | --- |
| `color` | Color to use for display of this marker type. |
| `created_at` | The ISO8601-formatted time when the Marker Setting was created. |
| `id` | The unique identifier (ID) for the Marker Setting. |
| `type` | Groups similar Markers. |
| `updated_at` | The ISO8601-formatted time when the Marker Setting was updated. |

Operations: Create, Load, Remove, Update.

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

Operations: Create, Load.

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

Operations: Create, Load, Remove, Update.

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

Operations: Create, Load.

API path: `/1/query_results/{datasetSlug}`

#### Recipient

| Field | Description |
| --- | --- |
| `id` |  |
| `type` |  |

Operations: Create, List, Load, Remove, Update.

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

Operations: List, Load, Update.

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
| `sli` | Reference to the [Calculated Field](/api/calculated-fields/) used as the indicator of event success. |
| `tags` | A list of key-value pairs to help identify the SLO. |
| `target_per_million` | The number of events out of one million (1,000,000) that you expected qualified events to succeed. |
| `time_period_days` | The time period, in days, over which the SLO will be evaluated. |
| `updated_at` | The ISO8601-formatted time when the SLO was updated. |

Operations: Create, Load, Remove, Update.

API path: `/1/slos/{datasetSlug}`

#### SloCount

| Field | Description |
| --- | --- |
| `error_count` | Number of failed (bad) events in this window. |
| `is_partial` | When `true`, the data for this window may be incomplete. |
| `total_count` | Total number of events (good + bad) in this window. |
| `window_end` | End of the window as a Unix timestamp (seconds). |
| `window_start` | Start of the window as a Unix timestamp (seconds). |

Operations: List.

API path: `/1/slos/{datasetSlug}/{sloId}/counts`

#### SloHistory

| Field | Description |
| --- | --- |
| `end_time` | The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for. |
| `ids` | A list of SLO IDs to retrieve history for. |
| `start_time` | The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for. |

Operations: Create.

API path: `/1/reporting/slos/historical`

#### SloHourlyCount

| Field | Description |
| --- | --- |
| `end_time` | End of the hour as a Unix timestamp (seconds). |
| `error_count` | Number of failed (bad) events in this hour. |
| `is_partial` | When `true`, this bucket covers the current in-progress hour and its counts will increase until the hour completes. |
| `start_time` | Start of the hour as a Unix timestamp (seconds). |
| `total_count` | Total number of events (good + bad) in this hour. |

Operations: List.

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

Operations: Create, List, Load, Remove, Update.

API path: `/1/triggers/{datasetSlug}`



## Entities


### Auth

Create an instance: `auth = client.Auth()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key_access` | `dict` |  |
| `environment` | `dict` |  |
| `id` | `str` | Unique identifier (ID) of the API Key. |
| `team` | `dict` |  |
| `type` | `str` | The type of API Key. |

#### Example: Load

```python
auth = client.Auth().load({"id": "auth_id"})
```


### Board

Create an instance: `board = client.Board()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | A description of the Board. |
| `id` | `str` | Unique identifier (ID), returned in response bodies. |
| `layout_generation` | `str` | The layout generation mode for the board. |
| `links` | `dict` |  |
| `name` | `str` | The name of the Board. |
| `panels` | `list` |  |
| `preset_filters` | `list` | A list of preset filters to apply to the board. |
| `tags` | `list` | A list of key-value pairs to help identify the Trigger. |
| `type` | `str` | The type of the board. |

#### Example: Load

```python
board = client.Board().load({"id": "board_id"})
```

#### Example: List

```python
boards = client.Board().list()
```

#### Example: Create

```python
board = client.Board().create({
    "name": "example_name",  # str
    "type": "example_type",  # str
})
```


### BoardView

Create an instance: `board_view = client.BoardView()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `filters` | `list` | The filters to apply to this view. |
| `id` | `str` | Unique identifier for the board view. |
| `name` | `str` | The name of the view. |

#### Example: Load

```python
board_view = client.BoardView().load({"id": "board_view_id", "board_id": "board_id"})
```

#### Example: List

```python
board_views = client.BoardView().list({"id": "example"})
```

#### Example: Create

```python
board_view = client.BoardView().create({
    "id": "example_id",  # str
})
```


### BulkSignalRecipientAssignment

Create an instance: `bulk_signal_recipient_assignment = client.BulkSignalRecipientAssignment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `failed` | `list` | The Signals that were not updated, each with the reason. |
| `recipients` | `list` | The Recipients to assign to every selected Signal. |
| `selector` | `dict` | Chooses which Signals to act on. |
| `succeeded` | `list` | The Signals whose Recipient set was updated. |
| `unchanged` | `list` | The Signals that already had every requested Recipient. |

#### Example: Create

```python
bulk_signal_recipient_assignment = client.BulkSignalRecipientAssignment().create({
    "failed": [],  # list
    "recipients": [],  # list
    "selector": {},  # dict
    "succeeded": [],  # list
    "unchanged": [],  # list
})
```


### BurnAlert

Create an instance: `burn_alert = client.BurnAlert()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alert_type` | `str` |  |
| `id` | `str` |  |

#### Example: Load

```python
burn_alert = client.BurnAlert().load({"id": "burn_alert_id", "slo_id": "slo_id"})
```

#### Example: Create

```python
burn_alert = client.BurnAlert().create({
    "id": "example_id",  # str
    "alert_type": "example_alert_type",  # str
})
```


### CalculatedField

Create an instance: `calculated_field = client.CalculatedField()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alias` | `str` | The human-readable name of the Calculated Field (also called Derived Column), as it will be referenced when building queries. |
| `created_at` | `str` | ISO8601 formatted time when the field was created. |
| `description` | `str` | A human-readable description for the Calculated Field that displays in the UI. |
| `expression` | `str` | The expression to evaluate to construct this Calculated Field's value. |
| `id` | `str` | Unique identifier (ID), returned in response bodies. |
| `updated_at` | `str` | ISO8601 formatted time when the field was updated. |

#### Example: Load

```python
calculated_field = client.CalculatedField().load({"dataset_slug": "dataset_slug"})
```

#### Example: Create

```python
calculated_field = client.CalculatedField().create({
    "dataset_slug": "example_dataset_slug",  # str
    "alias": "example_alias",  # str
    "created_at": "example_created_at",  # str
    "expression": "example_expression",  # str
    "id": "example_id",  # str
    "updated_at": "example_updated_at",  # str
})
```


### Column

Create an instance: `column = client.Column()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | ISO8601 formatted time the column was created. |
| `description` | `str` | Column description. |
| `hidden` | `bool` | If `true`, the column is excluded from autocomplete and raw data field lists. |
| `id` | `str` | Unique identifier (ID), returned in response bodies. |
| `key_name` | `str` | Name of the Column. |
| `last_written` | `str` | ISO8601 formatted time the column was last written to (received event data). |
| `type` | `str` | Type of data that the Column will contain. |
| `updated_at` | `str` | ISO8601 formatted time the column was updated. |

#### Example: Load

```python
column = client.Column().load({"id": "column_id"})
```

#### Example: Create

```python
column = client.Column().create({
    "id": "example_id",  # str
    "key_name": "example_key_name",  # str
})
```


### Dataset

Create an instance: `dataset = client.Dataset()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | The ISO8601-formatted time when the dataset was created. |
| `dataset_type` | `str` | The type of data contained in the dataset. |
| `description` | `str` | A description for the dataset. |
| `expand_json_depth` | `int` | The maximum unpacking depth of nested JSON fields. |
| `id` | `str` |  |
| `last_written_at` | `None | str` | The ISO8601-formatted time when the dataset last received event data. |
| `name` | `str` | The name of the dataset. |
| `regular_columns_count` | `None | int` | The total number of unique fields for this Dataset. |
| `settings` | `dict` |  |
| `slug` | `str` | The 'slug' of the dataset to be used in URLs. |

#### Example: Load

```python
dataset = client.Dataset().load({"id": "dataset_id"})
```

#### Example: List

```python
datasets = client.Dataset().list()
```

#### Example: Create

```python
dataset = client.Dataset().create({
    "name": "example_name",  # str
})
```


### DatasetDefinition

Create an instance: `dataset_definition = client.DatasetDefinition()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `annotation_type` | `Any` | Metadata: Annotation Type - The type of span annotation. |
| `duration_ms` | `Any` | Span Duration - How much time the span took, in milliseconds. |
| `error` | `Any` | Use a Boolean or String to indicate error. |
| `id` | `str` |  |
| `link_span_id` | `str` | Metadata: Link Span ID - Links let you tie traces and spans to one another. |
| `link_trace_id` | `str` | Metadata: Link Trace ID - Links let you tie traces and spans to one another. |
| `log_message` | `Any` | A value containing the log event message. |
| `log_severity` | `Any` | Severity level of the event (also known as log level). |
| `name` | `str` | The name of the function or method where the span was created. |
| `parent_id` | `str` | The Parent Span ID - The ID of this span's parent span, the call location the current span was called from. |
| `route` | `Any` | The HTTP URL or equivalent route processed by the request. |
| `service_name` | `Any` | The name of the instrumented service. |
| `span_id` | `str` | The unique identifier (ID) for each span. |
| `span_kind` | `Any` | Metadata: Kind - The kind of Span. |
| `status` | `Any` | Indicates the success, failure, or other status of a request. |
| `trace_id` | `str` | The ID of the trace this span belongs to. |
| `user` | `Any` | The user making the request in the system. |

#### Example: Load

```python
dataset_definition = client.DatasetDefinition().load({"id": "dataset_definition_id"})
```


### Environment

Create an instance: `environment = client.Environment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `dict` |  |
| `id` | `str` |  |

#### Example: Load

```python
environment = client.Environment().load({"id": "environment_id", "team_slug": "team_slug"})
```

#### Example: Create

```python
environment = client.Environment().create({
    "team_slug": "example_team_slug",  # str
    "data": {},  # dict
})
```


### Event

Create an instance: `event = client.Event()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `batch_events` | `list` | The array should contain one or more JSON objects representing Events. |
| `id` | `str` |  |
| `status` | `int` |  |

#### Example: Create

```python
event = client.Event().create({
    "dataset_slug": "example_dataset_slug",  # str
})
```


### HistoricalAnomaly

Create an instance: `historical_anomaly = client.HistoricalAnomaly()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ended_at` | `int` | The time the anomaly ended, in seconds since UNIX epoch. |
| `id` | `str` | A deterministic identifier for the anomaly, derived from the Signal, its measured kind, and the anomaly's start time. |
| `measurement` | `float` | The measured value that triggered the anomaly. |
| `normal_range` | `Any` | The trained normal band the measurement exceeded. |
| `started_at` | `int` | The time the anomaly started, in seconds since UNIX epoch. |

#### Example: List

```python
historical_anomalys = client.HistoricalAnomaly().list({"signal_id": "example", "end_time": 1, "start_time": 1})
```


### KeyManagement

Create an instance: `key_management = client.KeyManagement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `dict` |  |
| `id` | `str` |  |

#### Example: Load

```python
key_management = client.KeyManagement().load({"id": "key_management_id", "team_slug": "team_slug"})
```

#### Example: Create

```python
key_management = client.KeyManagement().create({
    "team_slug": "example_team_slug",  # str
    "data": {},  # dict
})
```


### Kinesi

Create an instance: `kinesi = client.Kinesi()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errorMessage` | `str` |  |
| `records` | `list` |  |
| `requestId` | `str` |  |
| `timestamp` | `int` |  |

#### Example: Create

```python
kinesi = client.Kinesi().create({
    "dataset_slug": "example_dataset_slug",  # str
})
```


### MapDependency

Create an instance: `map_dependency = client.MapDependency()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dependencies` | `Any` | Array of service dependencies. |
| `end_time` | `int` | Absolute end time to evaluate dependencies, in seconds since UNIX epoch. |
| `filters` | `list` | Optional list of service nodes to filter dependencies by. |
| `links` | `dict` | Links to iterate through the pages of results. |
| `request_id` | `str` | Unique identifier for the Map Dependency Request. |
| `start_time` | `int` | Absolute start time to evaluate dependencies, in seconds since UNIX epoch. |
| `status` | `str` | Status of the Map Dependency Request. |
| `time_range` | `int` | Time range in seconds (minimum 1). |

#### Example: Load

```python
map_dependency = client.MapDependency().load({"request_id": "request_id"})
```

#### Example: Create

```python
map_dependency = client.MapDependency().create({
    "links": {},  # dict
})
```


### Marker

Create an instance: `marker = client.Marker()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `str` | Color can be assigned to Markers using the Marker Settings endpoint. |
| `created_at` | `str` | The ISO8601-formatted time when the Marker was created. |
| `end_time` | `int` | Specifies end time, and allows a Marker to be recorded as representing a time range, such as a 5 minute deploy. |
| `id` | `str` | A 6 character hexadecimal string assigned on Marker creation. |
| `message` | `str` | A message to describe this specific Marker. |
| `start_time` | `int` | Indicates the time the Marker should be placed. |
| `type` | `str` | Groups similar Markers. |
| `updated_at` | `str` | The ISO8601-formatted time when the Marker was updated. |
| `url` | `str` | A target for the marker. |

#### Example: Load

```python
marker = client.Marker().load({"id": "marker_id"})
```

#### Example: Create

```python
marker = client.Marker().create({
    "id": "example_id",  # str
})
```


### MarkerSetting

Create an instance: `marker_setting = client.MarkerSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `str` | Color to use for display of this marker type. |
| `created_at` | `str` | The ISO8601-formatted time when the Marker Setting was created. |
| `id` | `str` | The unique identifier (ID) for the Marker Setting. |
| `type` | `str` | Groups similar Markers. |
| `updated_at` | `None | str` | The ISO8601-formatted time when the Marker Setting was updated. |

#### Example: Load

```python
marker_setting = client.MarkerSetting().load({"id": "marker_setting_id"})
```

#### Example: Create

```python
marker_setting = client.MarkerSetting().create({
    "id": "example_id",  # str
    "color": "example_color",  # str
    "type": "example_type",  # str
})
```


### Query

Create an instance: `query = client.Query()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `breakdowns` | `list` | the columns by which to break events down into groups |
| `calculated_fields` | `list` | Computed properties that are calculated by a formula. |
| `calculations` | `list` | the calculations to return as a time series and summary table |
| `compare_time_offset_seconds` | `int` | When set, offsets the query's time range by this number of seconds into the past, allowing comparison with historical data from an earlier time period. |
| `end_time` | `int` | Absolute end time of query, in seconds since UNIX epoch. |
| `filter_combination` | `str` | Set to "OR" to match ANY filter in the filter list |
| `filters` | `list` | The filters with which to restrict the considered events |
| `formulas` | `list` | Mathematical formulas to be returned as a time series and summary table. |
| `granularity` | `int` | The time resolution of the query's graph, in seconds. |
| `havings` | `list` | The Having clause allows you to filter on the results table. |
| `id` | `str` |  |
| `limit` | `int` | The maximum number of unique groups returned in 'results'. |
| `orders` | `list` | The terms on which to order the query results. |
| `start_time` | `int` | Absolute start time of query, in seconds since UNIX epoch. |
| `time_range` | `int` | Time range of query in seconds. |
| `usage_mode` | `bool` | If `true`, query results will return aggregates without correcting for sample rates. |

#### Example: Load

```python
query = client.Query().load({"dataset_slug": "dataset_slug", "query_id": "query_id"})
```

#### Example: Create

```python
query = client.Query().create({
    "id": "example_id",  # str
})
```


### QueryAnnotation

Create an instance: `query_annotation = client.QueryAnnotation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | ISO8601 formatted time when the Query Annotation was created. |
| `description` | `str` | A description of the Query. |
| `id` | `str` | The unique identifier (ID) of a Query Annotation. |
| `name` | `str` | A name for the Query. |
| `query_id` | `str` | The ID of the Query that the annotation describes. |
| `source` | `str` | The source of the Query Annotation. |
| `updated_at` | `str` | ISO8601 formatted time when the Query Annotation was updated. |

#### Example: Load

```python
query_annotation = client.QueryAnnotation().load({"id": "query_annotation_id"})
```

#### Example: Create

```python
query_annotation = client.QueryAnnotation().create({
    "id": "example_id",  # str
    "name": "example_name",  # str
    "query_id": "example_query_id",  # str
})
```


### QueryResult

Create an instance: `query_result = client.QueryResult()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `complete` | `bool` | Indicates if the query results are available yet or not. |
| `data` | `dict` | An object containing the query result data |
| `disable_other_by_aggregate` | `bool` | If true, the "other_by_aggregate" data is excluded from the query result. |
| `disable_series` | `bool` | If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field. |
| `disable_total_by_aggregate` | `bool` | If `true`, data representing each aggregate in the query's total value will not be returned. |
| `error` | `str` | Only present if the query failed to run. |
| `id` | `str` | The unique identifier (ID) of a Query Result |
| `limit` | `int` | If `disable_series` is `true`, a limit may be optionally given. |
| `links` | `dict` | An object containing UI links to the query result and query result graph |
| `query` | `Any` |  |
| `query_id` | `str` | The ID of a query returned from the [Queries endpoint](/api/queries/). |

#### Example: Load

```python
query_result = client.QueryResult().load({"dataset_slug": "dataset_slug", "query_result_id": "query_result_id"})
```

#### Example: Create

```python
query_result = client.QueryResult().create({
    "id": "example_id",  # str
    "query_id": "example_query_id",  # str
})
```


### Recipient

Create an instance: `recipient = client.Recipient()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `type` | `str` |  |

#### Example: Load

```python
recipient = client.Recipient().load({"id": "recipient_id"})
```

#### Example: List

```python
recipients = client.Recipient().list()
```

#### Example: Create

```python
recipient = client.Recipient().create({
    "type": "example_type",  # str
})
```


### Signal

Create an instance: `signal = client.Signal()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_investigate` | `bool` | When `true`, Honeycomb will automatically start an investigation when this Signal fires. |
| `created_at` | `str` | The ISO8601-formatted time when the Signal was created. |
| `currently_anomalous` | `bool` | Whether the Signal is currently in an anomalous state. |
| `dataset_slug` | `str` | The slug of the dataset the Signal's service reports to. |
| `enabled` | `bool` | Whether the Signal is currently enabled. |
| `environment_slug` | `str` | The slug of the environment the Signal belongs to. |
| `id` | `str` | Unique identifier (ID) of the Signal. |
| `last_anomaly_ended_at` | `int | None` | The end time of the most recent anomaly, in seconds since UNIX epoch. |
| `last_anomaly_started_at` | `int | None` | The start time of the most recent anomaly, in seconds since UNIX epoch. |
| `measured_signal` | `str` | The kind of measurement the Signal is trained on. |
| `recipients` | `list` | The Recipients notified when this Signal fires. |
| `sensitivity` | `Any` | How far a measurement must deviate from the trained normal band before the Signal fires. |
| `service_name` | `str` | The name of the service the Signal monitors. |
| `status` | `str` | The lifecycle status of the Signal. |
| `updated_at` | `str` | The ISO8601-formatted time when the Signal was last updated. |

#### Example: Load

```python
signal = client.Signal().load({"id": "signal_id"})
```

#### Example: List

```python
signals = client.Signal().list()
```


### Slo

Create an instance: `slo = client.Slo()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | The ISO8601-formatted time when the SLO was created. |
| `dataset_slugs` | `list` | The dataset(s) the SLO will be evaluated against. |
| `description` | `str` | A nice description of the SLO's intent and context. |
| `id` | `str` |  |
| `name` | `str` | The name of the SLO. |
| `reset_at` | `str` | The ISO8601-formatted time the SLO was last reset. |
| `sli` | `dict` | Reference to the [Calculated Field](/api/calculated-fields/) used as the indicator of event success. |
| `tags` | `list` | A list of key-value pairs to help identify the SLO. |
| `target_per_million` | `int` | The number of events out of one million (1,000,000) that you expected qualified events to succeed. |
| `time_period_days` | `int` | The time period, in days, over which the SLO will be evaluated. |
| `updated_at` | `str` | The ISO8601-formatted time when the SLO was updated. |

#### Example: Load

```python
slo = client.Slo().load({"id": "slo_id"})
```

#### Example: Create

```python
slo = client.Slo().create({
    "id": "example_id",  # str
})
```


### SloCount

Create an instance: `slo_count = client.SloCount()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error_count` | `int` | Number of failed (bad) events in this window. |
| `is_partial` | `bool` | When `true`, the data for this window may be incomplete. |
| `total_count` | `int` | Total number of events (good + bad) in this window. |
| `window_end` | `int` | End of the window as a Unix timestamp (seconds). |
| `window_start` | `int` | Start of the window as a Unix timestamp (seconds). |

#### Example: List

```python
slo_counts = client.SloCount().list({"dataset_slug": "example", "slo_id": "example", "end_time": 1, "start_time": 1})
```


### SloHistory

Create an instance: `slo_history = client.SloHistory()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_time` | `int` | The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for. |
| `ids` | `list` | A list of SLO IDs to retrieve history for. |
| `start_time` | `int` | The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for. |

#### Example: Create

```python
slo_history = client.SloHistory().create({
    "end_time": 1,  # int
    "ids": [],  # list
    "start_time": 1,  # int
})
```


### SloHourlyCount

Create an instance: `slo_hourly_count = client.SloHourlyCount()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_time` | `int` | End of the hour as a Unix timestamp (seconds). |
| `error_count` | `int` | Number of failed (bad) events in this hour. |
| `is_partial` | `bool` | When `true`, this bucket covers the current in-progress hour and its counts will increase until the hour completes. |
| `start_time` | `int` | Start of the hour as a Unix timestamp (seconds). |
| `total_count` | `int` | Total number of events (good + bad) in this hour. |

#### Example: List

```python
slo_hourly_counts = client.SloHourlyCount().list({"dataset_slug": "example", "slo_id": "example", "end_time": 1, "start_time": 1})
```


### Trigger

Create an instance: `trigger = client.Trigger()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alert_type` | `str` | How often to fire an alert when a trigger threshold is crossed. |
| `auto_investigate` | `bool` | When true, Honeycomb will automatically start an investigation when this Trigger fires. |
| `baseline_details` | `dict` |  |
| `created_at` | `str` |  |
| `dataset_slug` | `str` | The slug of the dataset this trigger belongs to. |
| `description` | `str` | A longer description, displayed on the Trigger's detail page. |
| `disabled` | `bool` | If true, the trigger will not be evaluated and alerts will not be sent. |
| `evaluation_schedule` | `dict` | A schedule that determines when the trigger is run. |
| `evaluation_schedule_type` | `str` | The schedule type used by the trigger. |
| `frequency` | `int` | The interval in seconds in which to check the results of the query’s calculation against the threshold. |
| `id` | `str` | The unique identifier (ID) for this Trigger. |
| `name` | `str` | A short, human-readable name for this Trigger, which will be displayed in the UI and when the trigger fires. |
| `query` | `dict` | An inline query specification that is a strict subset of the standard Query Specification. |
| `query_id` | `str` | The ID of an existing saved Query that meets the trigger query requirements. |
| `recipients` | `list` | A list of [Recipients](/api/recipients/) to notify when the Trigger fires. |
| `tags` | `list` | A list of key-value pairs to help identify the Trigger. |
| `threshold` | `dict` | The threshold over which the trigger will fire, specified as both an operator and a value. |
| `triggered` | `bool` | If true, the trigger has crossed its specified threshold without resolving. |
| `updated_at` | `str` |  |

#### Example: Load

```python
trigger = client.Trigger().load({"id": "trigger_id"})
```

#### Example: List

```python
triggers = client.Trigger().list({"recipient_id": "example"})
```

#### Example: Create

```python
trigger = client.Trigger().create({
    "id": "example_id",  # str
    "evaluation_schedule": {},  # dict
    "threshold": {},  # dict
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── honeycomb_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`honeycomb_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
column = client.Column()
column.load({"id": "example_id"})

# column.data_get() now returns the column data from the last load
# column.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

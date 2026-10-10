# Honeycomb Golang SDK



The Golang SDK for the Honeycomb API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Auth(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `py`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/honeycomb-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/honeycomb-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/honeycomb-sdk/go=../honeycomb-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record. The client sends the API key in the `X-Honeycomb-Team` header.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/honeycomb-sdk/go"
)

func main() {
    client := sdk.NewHoneycombSDK(map[string]any{
        "apikey": os.Getenv("HONEYCOMB_APIKEY"),
    })

    // Load a single auth — the value is the entity; Data() reads its record.
    auth, err := client.Auth(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(auth.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
column, err := client.Column(nil).Load(map[string]any{"id": "example_id"}, nil)
if err != nil {
    // handle err
    return
}
_ = column
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

column, err := client.Column(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(column.(sdk.Entity).Data()) // the entity's mock record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewHoneycombSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewHoneycombSDK

```go
func NewHoneycombSDK(options map[string]any) *HoneycombSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *HoneycombSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### HoneycombSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Auth` | `(data map[string]any) HoneycombEntity` | Create an Auth entity instance. |
| `Board` | `(data map[string]any) HoneycombEntity` | Create a Board entity instance. |
| `BoardView` | `(data map[string]any) HoneycombEntity` | Create a BoardView entity instance. |
| `BulkSignalRecipientAssignment` | `(data map[string]any) HoneycombEntity` | Create a BulkSignalRecipientAssignment entity instance. |
| `BurnAlert` | `(data map[string]any) HoneycombEntity` | Create a BurnAlert entity instance. |
| `CalculatedField` | `(data map[string]any) HoneycombEntity` | Create a CalculatedField entity instance. |
| `Column` | `(data map[string]any) HoneycombEntity` | Create a Column entity instance. |
| `Dataset` | `(data map[string]any) HoneycombEntity` | Create a Dataset entity instance. |
| `DatasetDefinition` | `(data map[string]any) HoneycombEntity` | Create a DatasetDefinition entity instance. |
| `Environment` | `(data map[string]any) HoneycombEntity` | Create an Environment entity instance. |
| `Event` | `(data map[string]any) HoneycombEntity` | Create an Event entity instance. |
| `HistoricalAnomaly` | `(data map[string]any) HoneycombEntity` | Create a HistoricalAnomaly entity instance. |
| `KeyManagement` | `(data map[string]any) HoneycombEntity` | Create a KeyManagement entity instance. |
| `Kinesi` | `(data map[string]any) HoneycombEntity` | Create a Kinesi entity instance. |
| `MapDependency` | `(data map[string]any) HoneycombEntity` | Create a MapDependency entity instance. |
| `Marker` | `(data map[string]any) HoneycombEntity` | Create a Marker entity instance. |
| `MarkerSetting` | `(data map[string]any) HoneycombEntity` | Create a MarkerSetting entity instance. |
| `Query` | `(data map[string]any) HoneycombEntity` | Create a Query entity instance. |
| `QueryAnnotation` | `(data map[string]any) HoneycombEntity` | Create a QueryAnnotation entity instance. |
| `QueryResult` | `(data map[string]any) HoneycombEntity` | Create a QueryResult entity instance. |
| `Recipient` | `(data map[string]any) HoneycombEntity` | Create a Recipient entity instance. |
| `Signal` | `(data map[string]any) HoneycombEntity` | Create a Signal entity instance. |
| `Slo` | `(data map[string]any) HoneycombEntity` | Create a Slo entity instance. |
| `SloCount` | `(data map[string]any) HoneycombEntity` | Create a SloCount entity instance. |
| `SloHistory` | `(data map[string]any) HoneycombEntity` | Create a SloHistory entity instance. |
| `SloHourlyCount` | `(data map[string]any) HoneycombEntity` | Create a SloHourlyCount entity instance. |
| `Trigger` | `(data map[string]any) HoneycombEntity` | Create a Trigger entity instance. |

### Entity interface (HoneycombEntity)

All entities implement the `HoneycombEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity, and return it. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity, and return it. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity, and return it marked as deleted. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    auth, err := client.Auth(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // auth is the entity; auth.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Auth

| Field | Description |
| --- | --- |
| `"api_key_access"` |  |
| `"environment"` |  |
| `"id"` | Unique identifier (ID) of the API Key. |
| `"team"` |  |
| `"type"` | The type of API Key. |

Operations: Load.

API path: `/1/auth`

#### Board

| Field | Description |
| --- | --- |
| `"description"` | A description of the Board. |
| `"id"` | Unique identifier (ID), returned in response bodies. |
| `"layout_generation"` | The layout generation mode for the board. |
| `"links"` |  |
| `"name"` | The name of the Board. |
| `"panels"` |  |
| `"preset_filters"` | A list of preset filters to apply to the board. |
| `"tags"` | A list of key-value pairs to help identify the Trigger. |
| `"type"` | The type of the board. |

Operations: Create, List, Load, Remove, Update.

API path: `/1/boards`

#### BoardView

| Field | Description |
| --- | --- |
| `"filters"` | The filters to apply to this view. |
| `"id"` | Unique identifier for the board view. |
| `"name"` | The name of the view. |

Operations: Create, List, Load, Update.

API path: `/1/boards/{boardId}/views`

#### BulkSignalRecipientAssignment

| Field | Description |
| --- | --- |
| `"failed"` | The Signals that were not updated, each with the reason. |
| `"recipients"` | The Recipients to assign to every selected Signal. |
| `"selector"` | Chooses which Signals to act on. |
| `"succeeded"` | The Signals whose Recipient set was updated. |
| `"unchanged"` | The Signals that already had every requested Recipient. |

Operations: Create.

API path: `/1/signals/recipient_assignments`

#### BurnAlert

| Field | Description |
| --- | --- |
| `"alert_type"` |  |
| `"id"` |  |

Operations: Create, Load, Remove, Update.

API path: `/1/burn_alerts/{datasetSlug}`

#### CalculatedField

| Field | Description |
| --- | --- |
| `"alias"` | The human-readable name of the Calculated Field (also called Derived Column), as it will be referenced when building queries. |
| `"created_at"` | ISO8601 formatted time when the field was created. |
| `"description"` | A human-readable description for the Calculated Field that displays in the UI. |
| `"expression"` | The expression to evaluate to construct this Calculated Field's value. |
| `"id"` | Unique identifier (ID), returned in response bodies. |
| `"updated_at"` | ISO8601 formatted time when the field was updated. |

Operations: Create, Load, Remove, Update.

API path: `/1/derived_columns/{datasetSlug}`

#### Column

| Field | Description |
| --- | --- |
| `"created_at"` | ISO8601 formatted time the column was created. |
| `"description"` | Column description. |
| `"hidden"` | If `true`, the column is excluded from autocomplete and raw data field lists. |
| `"id"` | Unique identifier (ID), returned in response bodies. |
| `"key_name"` | Name of the Column. |
| `"last_written"` | ISO8601 formatted time the column was last written to (received event data). |
| `"type"` | Type of data that the Column will contain. |
| `"updated_at"` | ISO8601 formatted time the column was updated. |

Operations: Create, Load, Remove, Update.

API path: `/1/columns/{datasetSlug}`

#### Dataset

| Field | Description |
| --- | --- |
| `"created_at"` | The ISO8601-formatted time when the dataset was created. |
| `"dataset_type"` | The type of data contained in the dataset. |
| `"description"` | A description for the dataset. |
| `"expand_json_depth"` | The maximum unpacking depth of nested JSON fields. |
| `"id"` |  |
| `"last_written_at"` | The ISO8601-formatted time when the dataset last received event data. |
| `"name"` | The name of the dataset. |
| `"regular_columns_count"` | The total number of unique fields for this Dataset. |
| `"settings"` |  |
| `"slug"` | The 'slug' of the dataset to be used in URLs. |

Operations: Create, List, Load, Remove, Update.

API path: `/1/datasets`

#### DatasetDefinition

| Field | Description |
| --- | --- |
| `"annotation_type"` | Metadata: Annotation Type - The type of span annotation. |
| `"duration_ms"` | Span Duration - How much time the span took, in milliseconds. |
| `"error"` | Use a Boolean or String to indicate error. |
| `"id"` |  |
| `"link_span_id"` | Metadata: Link Span ID - Links let you tie traces and spans to one another. |
| `"link_trace_id"` | Metadata: Link Trace ID - Links let you tie traces and spans to one another. |
| `"log_message"` | A value containing the log event message. |
| `"log_severity"` | Severity level of the event (also known as log level). |
| `"name"` | The name of the function or method where the span was created. |
| `"parent_id"` | The Parent Span ID - The ID of this span's parent span, the call location the current span was called from. |
| `"route"` | The HTTP URL or equivalent route processed by the request. |
| `"service_name"` | The name of the instrumented service. |
| `"span_id"` | The unique identifier (ID) for each span. |
| `"span_kind"` | Metadata: Kind - The kind of Span. |
| `"status"` | Indicates the success, failure, or other status of a request. |
| `"trace_id"` | The ID of the trace this span belongs to. |
| `"user"` | The user making the request in the system. |

Operations: Load, Update.

API path: `/1/dataset_definitions/{datasetSlug}`

#### Environment

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"id"` |  |

Operations: Create, Load, Remove, Update.

API path: `/2/teams/{teamSlug}/environments`

#### Event

| Field | Description |
| --- | --- |
| `"batch_events"` | The array should contain one or more JSON objects representing Events. |
| `"id"` |  |
| `"status"` |  |

Operations: Create.

API path: `/1/batch/{datasetSlug}`

#### HistoricalAnomaly

| Field | Description |
| --- | --- |
| `"ended_at"` | The time the anomaly ended, in seconds since UNIX epoch. |
| `"id"` | A deterministic identifier for the anomaly, derived from the Signal, its measured kind, and the anomaly's start time. |
| `"measurement"` | The measured value that triggered the anomaly. |
| `"normal_range"` | The trained normal band the measurement exceeded. |
| `"started_at"` | The time the anomaly started, in seconds since UNIX epoch. |

Operations: List.

API path: `/1/signals/{signalId}/historical_anomalies`

#### KeyManagement

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"id"` |  |

Operations: Create, Load, Remove, Update.

API path: `/2/teams/{teamSlug}/api-keys`

#### Kinesi

| Field | Description |
| --- | --- |
| `"errorMessage"` |  |
| `"records"` |  |
| `"requestId"` |  |
| `"timestamp"` |  |

Operations: Create.

API path: `/1/kinesis_events/{datasetSlug}`

#### MapDependency

| Field | Description |
| --- | --- |
| `"dependencies"` | Array of service dependencies. |
| `"end_time"` | Absolute end time to evaluate dependencies, in seconds since UNIX epoch. |
| `"filters"` | Optional list of service nodes to filter dependencies by. |
| `"links"` | Links to iterate through the pages of results. |
| `"request_id"` | Unique identifier for the Map Dependency Request. |
| `"start_time"` | Absolute start time to evaluate dependencies, in seconds since UNIX epoch. |
| `"status"` | Status of the Map Dependency Request. |
| `"time_range"` | Time range in seconds (minimum 1). |

Operations: Create, Load.

API path: `/1/maps/dependencies/requests`

#### Marker

| Field | Description |
| --- | --- |
| `"color"` | Color can be assigned to Markers using the Marker Settings endpoint. |
| `"created_at"` | The ISO8601-formatted time when the Marker was created. |
| `"end_time"` | Specifies end time, and allows a Marker to be recorded as representing a time range, such as a 5 minute deploy. |
| `"id"` | A 6 character hexadecimal string assigned on Marker creation. |
| `"message"` | A message to describe this specific Marker. |
| `"start_time"` | Indicates the time the Marker should be placed. |
| `"type"` | Groups similar Markers. |
| `"updated_at"` | The ISO8601-formatted time when the Marker was updated. |
| `"url"` | A target for the marker. |

Operations: Create, Load, Remove, Update.

API path: `/1/markers/{datasetSlug}`

#### MarkerSetting

| Field | Description |
| --- | --- |
| `"color"` | Color to use for display of this marker type. |
| `"created_at"` | The ISO8601-formatted time when the Marker Setting was created. |
| `"id"` | The unique identifier (ID) for the Marker Setting. |
| `"type"` | Groups similar Markers. |
| `"updated_at"` | The ISO8601-formatted time when the Marker Setting was updated. |

Operations: Create, Load, Remove, Update.

API path: `/1/marker_settings/{datasetSlug}`

#### Query

| Field | Description |
| --- | --- |
| `"breakdowns"` | the columns by which to break events down into groups |
| `"calculated_fields"` | Computed properties that are calculated by a formula. |
| `"calculations"` | the calculations to return as a time series and summary table |
| `"compare_time_offset_seconds"` | When set, offsets the query's time range by this number of seconds into the past, allowing comparison with historical data from an earlier time period. |
| `"end_time"` | Absolute end time of query, in seconds since UNIX epoch. |
| `"filter_combination"` | Set to "OR" to match ANY filter in the filter list |
| `"filters"` | The filters with which to restrict the considered events |
| `"formulas"` | Mathematical formulas to be returned as a time series and summary table. |
| `"granularity"` | The time resolution of the query's graph, in seconds. |
| `"havings"` | The Having clause allows you to filter on the results table. |
| `"id"` |  |
| `"limit"` | The maximum number of unique groups returned in 'results'. |
| `"orders"` | The terms on which to order the query results. |
| `"start_time"` | Absolute start time of query, in seconds since UNIX epoch. |
| `"time_range"` | Time range of query in seconds. |
| `"usage_mode"` | If `true`, query results will return aggregates without correcting for sample rates. |

Operations: Create, Load.

API path: `/1/queries/{datasetSlug}`

#### QueryAnnotation

| Field | Description |
| --- | --- |
| `"created_at"` | ISO8601 formatted time when the Query Annotation was created. |
| `"description"` | A description of the Query. |
| `"id"` | The unique identifier (ID) of a Query Annotation. |
| `"name"` | A name for the Query. |
| `"query_id"` | The ID of the Query that the annotation describes. |
| `"source"` | The source of the Query Annotation. |
| `"updated_at"` | ISO8601 formatted time when the Query Annotation was updated. |

Operations: Create, Load, Remove, Update.

API path: `/1/query_annotations/{datasetSlug}`

#### QueryResult

| Field | Description |
| --- | --- |
| `"complete"` | Indicates if the query results are available yet or not. |
| `"data"` | An object containing the query result data |
| `"disable_other_by_aggregate"` | If true, the "other_by_aggregate" data is excluded from the query result. |
| `"disable_series"` | If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field. |
| `"disable_total_by_aggregate"` | If `true`, data representing each aggregate in the query's total value will not be returned. |
| `"error"` | Only present if the query failed to run. |
| `"id"` | The unique identifier (ID) of a Query Result |
| `"limit"` | If `disable_series` is `true`, a limit may be optionally given. |
| `"links"` | An object containing UI links to the query result and query result graph |
| `"query"` |  |
| `"query_id"` | The ID of a query returned from the [Queries endpoint](/api/queries/). |

Operations: Create, Load.

API path: `/1/query_results/{datasetSlug}`

#### Recipient

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"type"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/1/recipients`

#### Signal

| Field | Description |
| --- | --- |
| `"auto_investigate"` | When `true`, Honeycomb will automatically start an investigation when this Signal fires. |
| `"created_at"` | The ISO8601-formatted time when the Signal was created. |
| `"currently_anomalous"` | Whether the Signal is currently in an anomalous state. |
| `"dataset_slug"` | The slug of the dataset the Signal's service reports to. |
| `"enabled"` | Whether the Signal is currently enabled. |
| `"environment_slug"` | The slug of the environment the Signal belongs to. |
| `"id"` | Unique identifier (ID) of the Signal. |
| `"last_anomaly_ended_at"` | The end time of the most recent anomaly, in seconds since UNIX epoch. |
| `"last_anomaly_started_at"` | The start time of the most recent anomaly, in seconds since UNIX epoch. |
| `"measured_signal"` | The kind of measurement the Signal is trained on. |
| `"recipients"` | The Recipients notified when this Signal fires. |
| `"sensitivity"` | How far a measurement must deviate from the trained normal band before the Signal fires. |
| `"service_name"` | The name of the service the Signal monitors. |
| `"status"` | The lifecycle status of the Signal. |
| `"updated_at"` | The ISO8601-formatted time when the Signal was last updated. |

Operations: List, Load, Update.

API path: `/1/signals`

#### Slo

| Field | Description |
| --- | --- |
| `"created_at"` | The ISO8601-formatted time when the SLO was created. |
| `"dataset_slugs"` | The dataset(s) the SLO will be evaluated against. |
| `"description"` | A nice description of the SLO's intent and context. |
| `"id"` |  |
| `"name"` | The name of the SLO. |
| `"reset_at"` | The ISO8601-formatted time the SLO was last reset. |
| `"sli"` | Reference to the [Calculated Field](/api/calculated-fields/) used as the indicator of event success. |
| `"tags"` | A list of key-value pairs to help identify the SLO. |
| `"target_per_million"` | The number of events out of one million (1,000,000) that you expected qualified events to succeed. |
| `"time_period_days"` | The time period, in days, over which the SLO will be evaluated. |
| `"updated_at"` | The ISO8601-formatted time when the SLO was updated. |

Operations: Create, Load, Remove, Update.

API path: `/1/slos/{datasetSlug}`

#### SloCount

| Field | Description |
| --- | --- |
| `"error_count"` | Number of failed (bad) events in this window. |
| `"is_partial"` | When `true`, the data for this window may be incomplete. |
| `"total_count"` | Total number of events (good + bad) in this window. |
| `"window_end"` | End of the window as a Unix timestamp (seconds). |
| `"window_start"` | Start of the window as a Unix timestamp (seconds). |

Operations: List.

API path: `/1/slos/{datasetSlug}/{sloId}/counts`

#### SloHistory

| Field | Description |
| --- | --- |
| `"end_time"` | The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for. |
| `"ids"` | A list of SLO IDs to retrieve history for. |
| `"start_time"` | The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for. |

Operations: Create.

API path: `/1/reporting/slos/historical`

#### SloHourlyCount

| Field | Description |
| --- | --- |
| `"end_time"` | End of the hour as a Unix timestamp (seconds). |
| `"error_count"` | Number of failed (bad) events in this hour. |
| `"is_partial"` | When `true`, this bucket covers the current in-progress hour and its counts will increase until the hour completes. |
| `"start_time"` | Start of the hour as a Unix timestamp (seconds). |
| `"total_count"` | Total number of events (good + bad) in this hour. |

Operations: List.

API path: `/1/slos/{datasetSlug}/{sloId}/counts/history`

#### Trigger

| Field | Description |
| --- | --- |
| `"alert_type"` | How often to fire an alert when a trigger threshold is crossed. |
| `"auto_investigate"` | When true, Honeycomb will automatically start an investigation when this Trigger fires. |
| `"baseline_details"` |  |
| `"created_at"` |  |
| `"dataset_slug"` | The slug of the dataset this trigger belongs to. |
| `"description"` | A longer description, displayed on the Trigger's detail page. |
| `"disabled"` | If true, the trigger will not be evaluated and alerts will not be sent. |
| `"evaluation_schedule"` | A schedule that determines when the trigger is run. |
| `"evaluation_schedule_type"` | The schedule type used by the trigger. |
| `"frequency"` | The interval in seconds in which to check the results of the query’s calculation against the threshold. |
| `"id"` | The unique identifier (ID) for this Trigger. |
| `"name"` | A short, human-readable name for this Trigger, which will be displayed in the UI and when the trigger fires. |
| `"query"` | An inline query specification that is a strict subset of the standard Query Specification. |
| `"query_id"` | The ID of an existing saved Query that meets the trigger query requirements. |
| `"recipients"` | A list of [Recipients](/api/recipients/) to notify when the Trigger fires. |
| `"tags"` | A list of key-value pairs to help identify the Trigger. |
| `"threshold"` | The threshold over which the trigger will fire, specified as both an operator and a value. |
| `"triggered"` | If true, the trigger has crossed its specified threshold without resolving. |
| `"updated_at"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/1/triggers/{datasetSlug}`



## Entities


### Auth

Create an instance: `auth := client.Auth(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key_access` | `map[string]any` |  |
| `environment` | `map[string]any` |  |
| `id` | `string` | Unique identifier (ID) of the API Key. |
| `team` | `map[string]any` |  |
| `type` | `string` | The type of API Key. |

#### Example: Load

```go
auth, err := client.Auth(nil).Load(map[string]any{"id": "auth_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(auth.(sdk.Entity).Data()) // the loaded entity's record
```


### Board

Create an instance: `board := client.Board(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | A description of the Board. |
| `id` | `string` | Unique identifier (ID), returned in response bodies. |
| `layout_generation` | `string` | The layout generation mode for the board. |
| `links` | `map[string]any` |  |
| `name` | `string` | The name of the Board. |
| `panels` | `[]any` |  |
| `preset_filters` | `[]any` | A list of preset filters to apply to the board. |
| `tags` | `[]any` | A list of key-value pairs to help identify the Trigger. |
| `type` | `string` | The type of the board. |

#### Example: Load

```go
board, err := client.Board(nil).Load(map[string]any{"id": "board_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(board.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
boards, err := client.Board(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range boards.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Board(nil).Create(map[string]any{
    "name": "example_name",
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BoardView

Create an instance: `boardView := client.BoardView(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `filters` | `[]any` | The filters to apply to this view. |
| `id` | `string` | Unique identifier for the board view. |
| `name` | `string` | The name of the view. |

#### Example: Load

```go
boardView, err := client.BoardView(nil).Load(map[string]any{"id": "board_view_id", "board_id": "board_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(boardView.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
boardViews, err := client.BoardView(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range boardViews.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.BoardView(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BulkSignalRecipientAssignment

Create an instance: `bulkSignalRecipientAssignment := client.BulkSignalRecipientAssignment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `failed` | `[]any` | The Signals that were not updated, each with the reason. |
| `recipients` | `[]any` | The Recipients to assign to every selected Signal. |
| `selector` | `map[string]any` | Chooses which Signals to act on. |
| `succeeded` | `[]any` | The Signals whose Recipient set was updated. |
| `unchanged` | `[]any` | The Signals that already had every requested Recipient. |

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BurnAlert

Create an instance: `burnAlert := client.BurnAlert(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alert_type` | `string` |  |
| `id` | `string` |  |

#### Example: Load

```go
burnAlert, err := client.BurnAlert(nil).Load(map[string]any{"id": "burn_alert_id", "slo_id": "slo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(burnAlert.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.BurnAlert(nil).Create(map[string]any{
    "id": "example_id",
    "alert_type": "example_alert_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CalculatedField

Create an instance: `calculatedField := client.CalculatedField(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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

```go
calculatedField, err := client.CalculatedField(nil).Load(map[string]any{"dataset_slug": "dataset_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(calculatedField.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Column

Create an instance: `column := client.Column(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | ISO8601 formatted time the column was created. |
| `description` | `string` | Column description. |
| `hidden` | `bool` | If `true`, the column is excluded from autocomplete and raw data field lists. |
| `id` | `string` | Unique identifier (ID), returned in response bodies. |
| `key_name` | `string` | Name of the Column. |
| `last_written` | `string` | ISO8601 formatted time the column was last written to (received event data). |
| `type` | `string` | Type of data that the Column will contain. |
| `updated_at` | `string` | ISO8601 formatted time the column was updated. |

#### Example: Load

```go
column, err := client.Column(nil).Load(map[string]any{"id": "column_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(column.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Column(nil).Create(map[string]any{
    "id": "example_id",
    "key_name": "example_key_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Dataset

Create an instance: `dataset := client.Dataset(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The ISO8601-formatted time when the dataset was created. |
| `dataset_type` | `string` | The type of data contained in the dataset. |
| `description` | `string` | A description for the dataset. |
| `expand_json_depth` | `int` | The maximum unpacking depth of nested JSON fields. |
| `id` | `string` |  |
| `last_written_at` | `any` | The ISO8601-formatted time when the dataset last received event data. |
| `name` | `string` | The name of the dataset. |
| `regular_columns_count` | `any` | The total number of unique fields for this Dataset. |
| `settings` | `map[string]any` |  |
| `slug` | `string` | The 'slug' of the dataset to be used in URLs. |

#### Example: Load

```go
dataset, err := client.Dataset(nil).Load(map[string]any{"id": "dataset_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(dataset.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
datasets, err := client.Dataset(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range datasets.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Dataset(nil).Create(map[string]any{
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DatasetDefinition

Create an instance: `datasetDefinition := client.DatasetDefinition(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

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

```go
datasetDefinition, err := client.DatasetDefinition(nil).Load(map[string]any{"id": "dataset_definition_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(datasetDefinition.(sdk.Entity).Data()) // the loaded entity's record
```


### Environment

Create an instance: `environment := client.Environment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `id` | `string` |  |

#### Example: Load

```go
environment, err := client.Environment(nil).Load(map[string]any{"id": "environment_id", "team_slug": "team_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(environment.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Environment(nil).Create(map[string]any{
    "team_slug": "example_team_slug",
    "data": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Event

Create an instance: `event := client.Event(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `batch_events` | `[]any` | The array should contain one or more JSON objects representing Events. |
| `id` | `string` |  |
| `status` | `int` |  |

#### Example: Create

```go
result, err := client.Event(nil).Create(map[string]any{
    "dataset_slug": "example_dataset_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### HistoricalAnomaly

Create an instance: `historicalAnomaly := client.HistoricalAnomaly(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ended_at` | `int` | The time the anomaly ended, in seconds since UNIX epoch. |
| `id` | `string` | A deterministic identifier for the anomaly, derived from the Signal, its measured kind, and the anomaly's start time. |
| `measurement` | `float64` | The measured value that triggered the anomaly. |
| `normal_range` | `any` | The trained normal band the measurement exceeded. |
| `started_at` | `int` | The time the anomaly started, in seconds since UNIX epoch. |

#### Example: List

```go
historicalAnomalys, err := client.HistoricalAnomaly(nil).List(map[string]any{"signal_id": "example", "end_time": 1, "start_time": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range historicalAnomalys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### KeyManagement

Create an instance: `keyManagement := client.KeyManagement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `id` | `string` |  |

#### Example: Load

```go
keyManagement, err := client.KeyManagement(nil).Load(map[string]any{"id": "key_management_id", "team_slug": "team_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(keyManagement.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.KeyManagement(nil).Create(map[string]any{
    "team_slug": "example_team_slug",
    "data": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Kinesi

Create an instance: `kinesi := client.Kinesi(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errorMessage` | `string` |  |
| `records` | `[]any` |  |
| `requestId` | `string` |  |
| `timestamp` | `int` |  |

#### Example: Create

```go
result, err := client.Kinesi(nil).Create(map[string]any{
    "dataset_slug": "example_dataset_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### MapDependency

Create an instance: `mapDependency := client.MapDependency(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dependencies` | `any` | Array of service dependencies. |
| `end_time` | `int` | Absolute end time to evaluate dependencies, in seconds since UNIX epoch. |
| `filters` | `[]any` | Optional list of service nodes to filter dependencies by. |
| `links` | `map[string]any` | Links to iterate through the pages of results. |
| `request_id` | `string` | Unique identifier for the Map Dependency Request. |
| `start_time` | `int` | Absolute start time to evaluate dependencies, in seconds since UNIX epoch. |
| `status` | `string` | Status of the Map Dependency Request. |
| `time_range` | `int` | Time range in seconds (minimum 1). |

#### Example: Load

```go
mapDependency, err := client.MapDependency(nil).Load(map[string]any{"request_id": "request_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(mapDependency.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.MapDependency(nil).Create(map[string]any{
    "links": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Marker

Create an instance: `marker := client.Marker(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `string` | Color can be assigned to Markers using the Marker Settings endpoint. |
| `created_at` | `string` | The ISO8601-formatted time when the Marker was created. |
| `end_time` | `int` | Specifies end time, and allows a Marker to be recorded as representing a time range, such as a 5 minute deploy. |
| `id` | `string` | A 6 character hexadecimal string assigned on Marker creation. |
| `message` | `string` | A message to describe this specific Marker. |
| `start_time` | `int` | Indicates the time the Marker should be placed. |
| `type` | `string` | Groups similar Markers. |
| `updated_at` | `string` | The ISO8601-formatted time when the Marker was updated. |
| `url` | `string` | A target for the marker. |

#### Example: Load

```go
marker, err := client.Marker(nil).Load(map[string]any{"id": "marker_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(marker.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Marker(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### MarkerSetting

Create an instance: `markerSetting := client.MarkerSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `string` | Color to use for display of this marker type. |
| `created_at` | `string` | The ISO8601-formatted time when the Marker Setting was created. |
| `id` | `string` | The unique identifier (ID) for the Marker Setting. |
| `type` | `string` | Groups similar Markers. |
| `updated_at` | `any` | The ISO8601-formatted time when the Marker Setting was updated. |

#### Example: Load

```go
markerSetting, err := client.MarkerSetting(nil).Load(map[string]any{"id": "marker_setting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(markerSetting.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.MarkerSetting(nil).Create(map[string]any{
    "id": "example_id",
    "color": "example_color",
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Query

Create an instance: `query := client.Query(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `breakdowns` | `[]any` | the columns by which to break events down into groups |
| `calculated_fields` | `[]any` | Computed properties that are calculated by a formula. |
| `calculations` | `[]any` | the calculations to return as a time series and summary table |
| `compare_time_offset_seconds` | `int` | When set, offsets the query's time range by this number of seconds into the past, allowing comparison with historical data from an earlier time period. |
| `end_time` | `int` | Absolute end time of query, in seconds since UNIX epoch. |
| `filter_combination` | `string` | Set to "OR" to match ANY filter in the filter list |
| `filters` | `[]any` | The filters with which to restrict the considered events |
| `formulas` | `[]any` | Mathematical formulas to be returned as a time series and summary table. |
| `granularity` | `int` | The time resolution of the query's graph, in seconds. |
| `havings` | `[]any` | The Having clause allows you to filter on the results table. |
| `id` | `string` |  |
| `limit` | `int` | The maximum number of unique groups returned in 'results'. |
| `orders` | `[]any` | The terms on which to order the query results. |
| `start_time` | `int` | Absolute start time of query, in seconds since UNIX epoch. |
| `time_range` | `int` | Time range of query in seconds. |
| `usage_mode` | `bool` | If `true`, query results will return aggregates without correcting for sample rates. |

#### Example: Load

```go
query, err := client.Query(nil).Load(map[string]any{"dataset_slug": "dataset_slug", "query_id": "query_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(query.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Query(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### QueryAnnotation

Create an instance: `queryAnnotation := client.QueryAnnotation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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

```go
queryAnnotation, err := client.QueryAnnotation(nil).Load(map[string]any{"id": "query_annotation_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(queryAnnotation.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.QueryAnnotation(nil).Create(map[string]any{
    "id": "example_id",
    "name": "example_name",
    "query_id": "example_query_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### QueryResult

Create an instance: `queryResult := client.QueryResult(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `complete` | `bool` | Indicates if the query results are available yet or not. |
| `data` | `map[string]any` | An object containing the query result data |
| `disable_other_by_aggregate` | `bool` | If true, the "other_by_aggregate" data is excluded from the query result. |
| `disable_series` | `bool` | If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field. |
| `disable_total_by_aggregate` | `bool` | If `true`, data representing each aggregate in the query's total value will not be returned. |
| `error` | `string` | Only present if the query failed to run. |
| `id` | `string` | The unique identifier (ID) of a Query Result |
| `limit` | `int` | If `disable_series` is `true`, a limit may be optionally given. |
| `links` | `map[string]any` | An object containing UI links to the query result and query result graph |
| `query` | `any` |  |
| `query_id` | `string` | The ID of a query returned from the [Queries endpoint](/api/queries/). |

#### Example: Load

```go
queryResult, err := client.QueryResult(nil).Load(map[string]any{"dataset_slug": "dataset_slug", "query_result_id": "query_result_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(queryResult.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.QueryResult(nil).Create(map[string]any{
    "id": "example_id",
    "query_id": "example_query_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Recipient

Create an instance: `recipient := client.Recipient(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```go
recipient, err := client.Recipient(nil).Load(map[string]any{"id": "recipient_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(recipient.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
recipients, err := client.Recipient(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range recipients.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Recipient(nil).Create(map[string]any{
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Signal

Create an instance: `signal := client.Signal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_investigate` | `bool` | When `true`, Honeycomb will automatically start an investigation when this Signal fires. |
| `created_at` | `string` | The ISO8601-formatted time when the Signal was created. |
| `currently_anomalous` | `bool` | Whether the Signal is currently in an anomalous state. |
| `dataset_slug` | `string` | The slug of the dataset the Signal's service reports to. |
| `enabled` | `bool` | Whether the Signal is currently enabled. |
| `environment_slug` | `string` | The slug of the environment the Signal belongs to. |
| `id` | `string` | Unique identifier (ID) of the Signal. |
| `last_anomaly_ended_at` | `any` | The end time of the most recent anomaly, in seconds since UNIX epoch. |
| `last_anomaly_started_at` | `any` | The start time of the most recent anomaly, in seconds since UNIX epoch. |
| `measured_signal` | `string` | The kind of measurement the Signal is trained on. |
| `recipients` | `[]any` | The Recipients notified when this Signal fires. |
| `sensitivity` | `any` | How far a measurement must deviate from the trained normal band before the Signal fires. |
| `service_name` | `string` | The name of the service the Signal monitors. |
| `status` | `string` | The lifecycle status of the Signal. |
| `updated_at` | `string` | The ISO8601-formatted time when the Signal was last updated. |

#### Example: Load

```go
signal, err := client.Signal(nil).Load(map[string]any{"id": "signal_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(signal.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
signals, err := client.Signal(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range signals.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Slo

Create an instance: `slo := client.Slo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The ISO8601-formatted time when the SLO was created. |
| `dataset_slugs` | `[]any` | The dataset(s) the SLO will be evaluated against. |
| `description` | `string` | A nice description of the SLO's intent and context. |
| `id` | `string` |  |
| `name` | `string` | The name of the SLO. |
| `reset_at` | `string` | The ISO8601-formatted time the SLO was last reset. |
| `sli` | `map[string]any` | Reference to the [Calculated Field](/api/calculated-fields/) used as the indicator of event success. |
| `tags` | `[]any` | A list of key-value pairs to help identify the SLO. |
| `target_per_million` | `int` | The number of events out of one million (1,000,000) that you expected qualified events to succeed. |
| `time_period_days` | `int` | The time period, in days, over which the SLO will be evaluated. |
| `updated_at` | `string` | The ISO8601-formatted time when the SLO was updated. |

#### Example: Load

```go
slo, err := client.Slo(nil).Load(map[string]any{"id": "slo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(slo.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Slo(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SloCount

Create an instance: `sloCount := client.SloCount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error_count` | `int` | Number of failed (bad) events in this window. |
| `is_partial` | `bool` | When `true`, the data for this window may be incomplete. |
| `total_count` | `int` | Total number of events (good + bad) in this window. |
| `window_end` | `int` | End of the window as a Unix timestamp (seconds). |
| `window_start` | `int` | Start of the window as a Unix timestamp (seconds). |

#### Example: List

```go
sloCounts, err := client.SloCount(nil).List(map[string]any{"dataset_slug": "example", "slo_id": "example", "end_time": 1, "start_time": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range sloCounts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### SloHistory

Create an instance: `sloHistory := client.SloHistory(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_time` | `int` | The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for. |
| `ids` | `[]any` | A list of SLO IDs to retrieve history for. |
| `start_time` | `int` | The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for. |

#### Example: Create

```go
result, err := client.SloHistory(nil).Create(map[string]any{
    "end_time": 1,
    "ids": []any{},
    "start_time": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SloHourlyCount

Create an instance: `sloHourlyCount := client.SloHourlyCount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_time` | `int` | End of the hour as a Unix timestamp (seconds). |
| `error_count` | `int` | Number of failed (bad) events in this hour. |
| `is_partial` | `bool` | When `true`, this bucket covers the current in-progress hour and its counts will increase until the hour completes. |
| `start_time` | `int` | Start of the hour as a Unix timestamp (seconds). |
| `total_count` | `int` | Total number of events (good + bad) in this hour. |

#### Example: List

```go
sloHourlyCounts, err := client.SloHourlyCount(nil).List(map[string]any{"dataset_slug": "example", "slo_id": "example", "end_time": 1, "start_time": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range sloHourlyCounts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Trigger

Create an instance: `trigger := client.Trigger(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alert_type` | `string` | How often to fire an alert when a trigger threshold is crossed. |
| `auto_investigate` | `bool` | When true, Honeycomb will automatically start an investigation when this Trigger fires. |
| `baseline_details` | `map[string]any` |  |
| `created_at` | `string` |  |
| `dataset_slug` | `string` | The slug of the dataset this trigger belongs to. |
| `description` | `string` | A longer description, displayed on the Trigger's detail page. |
| `disabled` | `bool` | If true, the trigger will not be evaluated and alerts will not be sent. |
| `evaluation_schedule` | `map[string]any` | A schedule that determines when the trigger is run. |
| `evaluation_schedule_type` | `string` | The schedule type used by the trigger. |
| `frequency` | `int` | The interval in seconds in which to check the results of the query’s calculation against the threshold. |
| `id` | `string` | The unique identifier (ID) for this Trigger. |
| `name` | `string` | A short, human-readable name for this Trigger, which will be displayed in the UI and when the trigger fires. |
| `query` | `map[string]any` | An inline query specification that is a strict subset of the standard Query Specification. |
| `query_id` | `string` | The ID of an existing saved Query that meets the trigger query requirements. |
| `recipients` | `[]any` | A list of [Recipients](/api/recipients/) to notify when the Trigger fires. |
| `tags` | `[]any` | A list of key-value pairs to help identify the Trigger. |
| `threshold` | `map[string]any` | The threshold over which the trigger will fire, specified as both an operator and a value. |
| `triggered` | `bool` | If true, the trigger has crossed its specified threshold without resolving. |
| `updated_at` | `string` |  |

#### Example: Load

```go
trigger, err := client.Trigger(nil).Load(map[string]any{"id": "trigger_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(trigger.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
triggers, err := client.Trigger(nil).List(map[string]any{"recipient_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range triggers.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Trigger(nil).Create(map[string]any{
    "id": "example_id",
    "evaluation_schedule": map[string]any{},
    "threshold": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/honeycomb-sdk/go/
├── honeycomb.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/honeycomb-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
column := client.Column(nil)
column.Load(map[string]any{"id": "example_id"}, nil)

// column.Data() now returns the column data from the last load
// column.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

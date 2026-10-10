# Honeycomb API

> The API allows programmatic management of many resources within Honeycomb.
>
> Please report any discrepancies with actual API behavior in &lt;a href=&quot;https://docs.honeycomb.io/troubleshoot/community/&quot;&gt;Pollinators Slack&lt;/a&gt; or to &lt;a href=&quot;https://support.honeycomb.io/&quot;&gt;Honeycomb Support&lt;/a&gt;.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 27 entities and 90 HTTP routes. There are 3 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Auth

Results: Success.

SDK operations: `load`.

Key fields to recognise:

- `id`: Unique identifier (ID) of the API Key.
- `type`: The type of API Key.

### Board

Results: Created; Success; Success - no Content.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `description`: A description of the Board.
- `id`: Unique identifier (ID), returned in response bodies.
- `layout_generation`: The layout generation mode for the board. When set to &quot;auto&quot;, the board will be automatically laid out based on the panels. When set to &quot;manual&quot;, the board will be laid out manually by the user.
- `name`: The name of the Board.
- `preset_filters`: A list of preset filters to apply to the board. For backwards compatibility, if no preset filters are provided, the existing preset filters will be preserved. If an empty array is provided, all preset filters will be deleted. **Note**: Each board is limited to a maximum of 5 preset filters. Attempting to create or update a board with more than 5 preset filters will result in an error.

### BoardView

Results: Created; Success.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `filters`: The filters to apply to this view.
- `id`: Unique identifier for the board view.
- `name`: The name of the view.

### BulkSignalRecipientAssignment

Results: The batch was processed. Every requested Signal appears in exactly one of `succeeded`, `unchanged`, or `failed`.

SDK operations: `create`.

Key fields to recognise:

- `failed`: The Signals that were not updated, each with the reason.
- `recipients`: The Recipients to assign to every selected Signal.
- `selector`: Chooses which Signals to act on.
- `succeeded`: The Signals whose Recipient set was updated.
- `unchanged`: The Signals that already had every requested Recipient.

### BurnAlert

Results: Created; Success; Success - no content.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `alert_type`: One of the supported alert types: 1. `exhaustion_time`: Notifies when you are about to run out of SLO budget within a specified number of hours. 1. `budget_rate`: Notifies when budget drops by at least a specified percentage within a defined time window.
- `id`: Unique identifier (ID) of a Burn alert.

### CalculatedField

Results: Success; When listing all columns, an array of CalculatedField objects will be returned. When using `key_name`, will return a single CalculatedField object if found.; Success - no content.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `alias`: The human-readable name of the Calculated Field (also called Derived Column), as it will be referenced when building queries.
- `created_at`: ISO8601 formatted time when the field was created.
- `description`: A human-readable description for the Calculated Field that displays in the UI.
- `expression`: The expression to evaluate to construct this Calculated Field&#39;s value. (Calculated Field is also called Derived Column.) Refer to the [Calculated Field Reference](https://docs.honeycomb.io/reference/derived-column-formula/).
- `id`: Unique identifier (ID), returned in response bodies.

### Column

Results: Success; When listing all columns, an array of Column objects will be returned. When using `key_name`, will return a single Column object if found.; Success - no content.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `created_at`: ISO8601 formatted time the column was created.
- `description`: Column description.
- `hidden`: If `true`, the column is excluded from autocomplete and raw data field lists.
- `id`: Unique identifier (ID), returned in response bodies.
- `key_name`: Name of the Column.

### Dataset

Results: OK - Dataset already exists; Created; Success; Deleted; Updated.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `created_at`: The ISO8601-formatted time when the dataset was created.
- `dataset_type`: The type of data contained in the dataset. Only present for time-series metrics datasets.
- `description`: A description for the dataset.
- `expand_json_depth`: The maximum unpacking depth of nested JSON fields.
- `last_written_at`: The ISO8601-formatted time when the dataset last received event data. The value will be null if no data has been received yet.

### DatasetDefinition

Results: Success; Dataset Definitions have been updated.

SDK operations: `load`, `update`.

Key fields to recognise:

- `annotation_type`: Metadata: Annotation Type - The type of span annotation. For example, `span_event` or `link`. This lets Honeycomb visualize this type of event differently in a trace. Do not use this field for other purposes.
- `duration_ms`: Span Duration - How much time the span took, in milliseconds.
- `error`: Use a Boolean or String to indicate error.
- `link_span_id`: Metadata: Link Span ID - Links let you tie traces and spans to one another. The Link Span ID lets you link to a different span (when used with Link Trace ID).
- `link_trace_id`: Metadata: Link Trace ID - Links let you tie traces and spans to one another. The Link Trace Id lets you link to a different trace or a different span in the same trace (when used with Link Span ID).

### Environment

Results: Created; Success; No Content.

SDK operations: `create`, `load`, `remove`, `update`.

### Event

Results: Enqueued for processing.

SDK operations: `create`.

Key fields to recognise:

- `batch_events`: The array should contain one or more JSON objects representing Events.
- `status`: The HTTP status code of the error.

### HistoricalAnomaly

Results: Success.

SDK operations: `list`.

Key fields to recognise:

- `ended_at`: The time the anomaly ended, in seconds since UNIX epoch.
- `id`: A deterministic identifier for the anomaly, derived from the Signal, its measured kind, and the anomaly&#39;s start time.
- `measurement`: The measured value that triggered the anomaly.
- `normal_range`: The trained normal band the measurement exceeded. Always `null` for anomalies on `presence` Signals.
- `started_at`: The time the anomaly started, in seconds since UNIX epoch.

### KeyManagement

Results: Created; Success; No Content.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `id`: The unique identifier of the API Key

### Kinesi

Results: Events queued for processing.

SDK operations: `create`.

### MapDependency

Results: Success - Results are ready or request has failed (see `status` field); Created - Request is pending; Success.

SDK operations: `create`, `load`.

Key fields to recognise:

- `dependencies`: Array of service dependencies. Null when status is &quot;pending&quot; or &quot;error&quot;.
- `end_time`: Absolute end time to evaluate dependencies, in seconds since UNIX epoch.
- `filters`: Optional list of service nodes to filter dependencies by.
- `links`: Links to iterate through the pages of results.
- `request_id`: Unique identifier for the Map Dependency Request.

### Marker

Results: Created; Success; Success The deleted Marker will be in the body of the response.; Updated.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `color`: Color can be assigned to Markers using the Marker Settings endpoint. This field will be populated when List All Markers is called.
- `created_at`: The ISO8601-formatted time when the Marker was created.
- `end_time`: Specifies end time, and allows a Marker to be recorded as representing a time range, such as a 5 minute deploy. Expressed in Unix Time.
- `id`: A 6 character hexadecimal string assigned on Marker creation.
- `message`: A message to describe this specific Marker.

### MarkerSetting

Results: Success.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `color`: Color to use for display of this marker type. Specified as hexadecimal RGB. For example, &quot;#F96E11&quot;.
- `created_at`: The ISO8601-formatted time when the Marker Setting was created.
- `id`: The unique identifier (ID) for the Marker Setting.
- `type`: Groups similar Markers. For example, &#39;deploys&#39;. All Markers of the same type appears with the same color on the graph.
- `updated_at`: The ISO8601-formatted time when the Marker Setting was updated.

### Query

Results: Success.

SDK operations: `create`, `load`.

Key fields to recognise:

- `breakdowns`: the columns by which to break events down into groups
- `calculated_fields`: Computed properties that are calculated by a formula.
- `calculations`: the calculations to return as a time series and summary table
- `compare_time_offset_seconds`: When set, offsets the query&#39;s time range by this number of seconds into the past, allowing comparison with historical data from an earlier time period. For example, setting this to 86400 (24 hours) will compare current results against data from 24 hours ago. ##### Note - The offset must be greater than or equal to the query&#39;s time range duration. ##### Allowed values - same time range as query time range - `1800` - 30 minutes - `3600` - 1 hour - `7200` - 2 hours - `28800` - 8 hours - `86400` - 24 hours - `604800` - 7 days - `2419200` - 28 days - `15724800` - 6 months
- `end_time`: Absolute end time of query, in seconds since UNIX epoch.

### QueryAnnotation

Results: Created; Success; Success - no content.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `created_at`: ISO8601 formatted time when the Query Annotation was created.
- `description`: A description of the Query.
- `id`: The unique identifier (ID) of a Query Annotation.
- `name`: A name for the Query.
- `query_id`: The ID of the Query that the annotation describes. **Note**: Once created, it is NOT possible to change the query ID associated with an annotation. It is possible to have multiple annotations associated with a Query.

### QueryResult

Results: Created; Success.

SDK operations: `create`, `load`.

Key fields to recognise:

- `complete`: Indicates if the query results are available yet or not. For example, is the query still being processed or complete?
- `data`: An object containing the query result data
- `disable_other_by_aggregate`: If true, the &quot;`other_by_aggregate`&quot; data is excluded from the query result.
- `disable_series`: If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field.
- `disable_total_by_aggregate`: If `true`, data representing each aggregate in the query&#39;s total value will not be returned.

### Recipient

Results: Success; Success - no content.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `type`: One of the supported Recipient Types

### Signal

Results: Success.

SDK operations: `list`, `load`, `update`.

Key fields to recognise:

- `auto_investigate`: When `true`, Honeycomb will automatically start an investigation when this Signal fires.
- `created_at`: The ISO8601-formatted time when the Signal was created.
- `currently_anomalous`: Whether the Signal is currently in an anomalous state.
- `dataset_slug`: The slug of the dataset the Signal&#39;s service reports to.
- `enabled`: Whether the Signal is currently enabled. Disabled Signals do not fire.

### Slo

Results: Success - SLO created; Success; Success - no content.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `created_at`: The ISO8601-formatted time when the SLO was created.
- `dataset_slugs`: The dataset(s) the SLO will be evaluated against. Required if using `__all__` in the path.
- `description`: A nice description of the SLO&#39;s intent and context.
- `name`: The name of the SLO.
- `reset_at`: The ISO8601-formatted time the SLO was last reset. The value will be `null` if the SLO has not yet been reset.

### SloCount

Results: Success.

SDK operations: `list`.

Key fields to recognise:

- `error_count`: Number of failed (bad) events in this window.
- `is_partial`: When `true`, the data for this window may be incomplete. This occurs in three cases: 1. **No prior anchor**: The first window has no preceding snapshot to delta from, so the value is a raw cumulative total rather than a true per-minute delta. 2. **Settlement window**: The window started within the last 10 minutes. Late-arriving events from client buffering or ingestion lag may still appear in a subsequent snapshot. 3. **Hour boundary reset**: Cumulative totals reset to zero at each hour boundary. A request spanning a boundary will see the new hour&#39;s counts start near zero while the anchor came from the prior hour&#39;s larger total. Both `total_count` and `error_count` are zeroed for this window. Use `period_start` to detect this and avoid requesting ranges that cross a boundary. Clients building alerting on top of this data should treat `is_partial: true` windows as provisional.
- `total_count`: Total number of events (good + bad) in this window.
- `window_end`: End of the window as a Unix timestamp (seconds). Always `window_start + 60`.
- `window_start`: Start of the window as a Unix timestamp (seconds).

### SloHistory

Results: A mapping from SLO IDs (for example, &quot;2LBq9LckbcA&quot;) to their historical data. Each SLO ID maps to an array of compliance and budget intervals. **Note**: An empty array indicates that no historical data was found for the given time range for that SLO.

SDK operations: `create`.

Key fields to recognise:

- `end_time`: The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for.
- `ids`: A list of SLO IDs to retrieve history for.
- `start_time`: The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for.

### SloHourlyCount

Results: Success.

SDK operations: `list`.

Key fields to recognise:

- `end_time`: End of the hour as a Unix timestamp (seconds). Always `start_time + 3600`.
- `error_count`: Number of failed (bad) events in this hour.
- `is_partial`: When `true`, this bucket covers the current in-progress hour and its counts will increase until the hour completes. Clients should treat `is_partial: true` buckets as provisional.
- `start_time`: Start of the hour as a Unix timestamp (seconds).
- `total_count`: Total number of events (good + bad) in this hour.

### Trigger

Results: Success - trigger created; Success; OK; Success - no content.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `alert_type`: How often to fire an alert when a trigger threshold is crossed. - `on_change` sends a trigger notification when the result of the specified calculation crosses the threshold. The trigger resolves only when the result of the query no longer satisfies the threshold condition. - `on_true` keeps sending a trigger notification at current frequency when and while the threshold is met. (This reflects the same behavior as the &quot;Send an alert every time a threshold is met&quot; checkbox in the Honeycomb UI.) - `on_group_change` sends notifications when individual groups cross or resolve the threshold.
- `auto_investigate`: When true, Honeycomb will automatically start an investigation when this Trigger fires.
- `dataset_slug`: The slug of the dataset this trigger belongs to. For environment-wide triggers, this will be &quot;__all__&quot;.
- `description`: A longer description, displayed on the Trigger&#39;s detail page.
- `disabled`: If true, the trigger will not be evaluated and alerts will not be sent.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Auth | `load` | `GET /1/auth` | Required |
| Auth | `load` | `GET /2/auth` | Required |
| Board | `create` | `POST /1/boards` | Required |
| Board | `list` | `GET /1/boards` | Required |
| Board | `load` | `GET /1/boards/{boardId}` | Required |
| Board | `remove` | `DELETE /1/boards/{boardId}/views/{viewId}` | Required |
| Board | `remove` | `DELETE /1/boards/{boardId}` | Required |
| Board | `update` | `PUT /1/boards/{boardId}` | Required |
| BoardView | `create` | `POST /1/boards/{boardId}/views` | Required |
| BoardView | `list` | `GET /1/boards/{boardId}/views` | Required |
| BoardView | `load` | `GET /1/boards/{boardId}/views/{viewId}` | Required |
| BoardView | `update` | `PUT /1/boards/{boardId}/views/{viewId}` | Required |
| BulkSignalRecipientAssignment | `create` | `POST /1/signals/recipient_assignments` | Required |
| BurnAlert | `create` | `POST /1/burn_alerts/{datasetSlug}` | Required |
| BurnAlert | `load` | `GET /1/burn_alerts/{datasetSlug}/{burnAlertId}` | Required |
| BurnAlert | `load` | `GET /1/burn_alerts/{datasetSlug}` | Required |
| BurnAlert | `remove` | `DELETE /1/burn_alerts/{datasetSlug}/{burnAlertId}` | Required |
| BurnAlert | `update` | `PUT /1/burn_alerts/{datasetSlug}/{burnAlertId}` | Required |
| CalculatedField | `create` | `POST /1/derived_columns/{datasetSlug}` | Required |
| CalculatedField | `load` | `GET /1/derived_columns/{datasetSlug}/{derivedColumnId}` | Required |
| CalculatedField | `load` | `GET /1/derived_columns/{datasetSlug}` | Required |
| CalculatedField | `remove` | `DELETE /1/derived_columns/{datasetSlug}/{derivedColumnId}` | Required |
| CalculatedField | `update` | `PUT /1/derived_columns/{datasetSlug}/{derivedColumnId}` | Required |
| Column | `create` | `POST /1/columns/{datasetSlug}` | Required |
| Column | `load` | `GET /1/columns/{datasetSlug}/{columnId}` | Required |
| Column | `load` | `GET /1/columns/{datasetSlug}` | Required |
| Column | `remove` | `DELETE /1/columns/{datasetSlug}/{columnId}` | Required |
| Column | `update` | `PUT /1/columns/{datasetSlug}/{columnId}` | Required |
| Dataset | `create` | `POST /1/datasets` | Required |
| Dataset | `list` | `GET /1/datasets` | Required |
| Dataset | `load` | `GET /1/datasets/{datasetSlug}` | Required |
| Dataset | `remove` | `DELETE /1/datasets/{datasetSlug}` | Required |
| Dataset | `update` | `PUT /1/datasets/{datasetSlug}` | Required |
| DatasetDefinition | `load` | `GET /1/dataset_definitions/{datasetSlug}` | Required |
| DatasetDefinition | `update` | `PATCH /1/dataset_definitions/{datasetSlug}` | Required |
| Environment | `create` | `POST /2/teams/{teamSlug}/environments` | Required |
| Environment | `load` | `GET /2/teams/{teamSlug}/environments/{ID}` | Required |
| Environment | `load` | `GET /2/teams/{teamSlug}/environments` | Required |
| Environment | `remove` | `DELETE /2/teams/{teamSlug}/environments/{ID}` | Required |
| Environment | `update` | `PATCH /2/teams/{teamSlug}/environments/{ID}` | Required |
| Event | `create` | `POST /1/batch/{datasetSlug}` | Required |
| Event | `create` | `POST /1/events/{datasetSlug}` | Required |
| HistoricalAnomaly | `list` | `GET /1/signals/{signalId}/historical_anomalies` | Required |
| KeyManagement | `create` | `POST /2/teams/{teamSlug}/api-keys` | Required |
| KeyManagement | `load` | `GET /2/teams/{teamSlug}/api-keys/{ID}` | Required |
| KeyManagement | `load` | `GET /2/teams/{teamSlug}/api-keys` | Required |
| KeyManagement | `remove` | `DELETE /2/teams/{teamSlug}/api-keys/{ID}` | Required |
| KeyManagement | `update` | `PATCH /2/teams/{teamSlug}/api-keys/{ID}` | Required |
| Kinesi | `create` | `POST /1/kinesis_events/{datasetSlug}` | Required |
| MapDependency | `create` | `POST /1/maps/dependencies/requests` | Required |
| MapDependency | `load` | `GET /1/maps/dependencies/requests/{requestId}` | Required |
| Marker | `create` | `POST /1/markers/{datasetSlug}` | Required |
| Marker | `load` | `GET /1/markers/{datasetSlug}` | Required |
| Marker | `remove` | `DELETE /1/markers/{datasetSlug}/{markerId}` | Required |
| Marker | `update` | `PUT /1/markers/{datasetSlug}/{markerId}` | Required |
| MarkerSetting | `create` | `POST /1/marker_settings/{datasetSlug}` | Required |
| MarkerSetting | `load` | `GET /1/marker_settings/{datasetSlug}` | Required |
| MarkerSetting | `remove` | `DELETE /1/marker_settings/{datasetSlug}/{markerSettingId}` | Required |
| MarkerSetting | `update` | `PUT /1/marker_settings/{datasetSlug}/{markerSettingId}` | Required |
| Query | `create` | `POST /1/queries/{datasetSlug}` | Required |
| Query | `load` | `GET /1/queries/{datasetSlug}/{queryId}` | Required |
| QueryAnnotation | `create` | `POST /1/query_annotations/{datasetSlug}` | Required |
| QueryAnnotation | `load` | `GET /1/query_annotations/{datasetSlug}/{queryAnnotationId}` | Required |
| QueryAnnotation | `load` | `GET /1/query_annotations/{datasetSlug}` | Required |
| QueryAnnotation | `remove` | `DELETE /1/query_annotations/{datasetSlug}/{queryAnnotationId}` | Required |
| QueryAnnotation | `update` | `PUT /1/query_annotations/{datasetSlug}/{queryAnnotationId}` | Required |
| QueryResult | `create` | `POST /1/query_results/{datasetSlug}` | Required |
| QueryResult | `load` | `GET /1/query_results/{datasetSlug}/{queryResultId}` | Required |
| Recipient | `create` | `POST /1/recipients` | Required |
| Recipient | `list` | `GET /1/recipients` | Required |
| Recipient | `load` | `GET /1/recipients/{recipientId}` | Required |
| Recipient | `remove` | `DELETE /1/recipients/{recipientId}` | Required |
| Recipient | `update` | `PUT /1/recipients/{recipientId}` | Required |
| Signal | `list` | `GET /1/signals` | Required |
| Signal | `load` | `GET /1/signals/{signalId}` | Required |
| Signal | `update` | `PUT /1/signals/{signalId}` | Required |
| Slo | `create` | `POST /1/slos/{datasetSlug}` | Required |
| Slo | `load` | `GET /1/slos/{datasetSlug}/{sloId}` | Required |
| Slo | `load` | `GET /1/slos/{datasetSlug}` | Required |
| Slo | `remove` | `DELETE /1/slos/{datasetSlug}/{sloId}` | Required |
| Slo | `update` | `PUT /1/slos/{datasetSlug}/{sloId}` | Required |
| SloCount | `list` | `GET /1/slos/{datasetSlug}/{sloId}/counts` | Required |
| SloHistory | `create` | `POST /1/reporting/slos/historical` | Required |
| SloHourlyCount | `list` | `GET /1/slos/{datasetSlug}/{sloId}/counts/history` | Required |
| Trigger | `create` | `POST /1/triggers/{datasetSlug}` | Required |
| Trigger | `list` | `GET /1/recipients/{recipientId}/triggers` | Required |
| Trigger | `load` | `GET /1/triggers/{datasetSlug}/{triggerId}` | Required |
| Trigger | `load` | `GET /1/triggers/{datasetSlug}` | Required |
| Trigger | `remove` | `DELETE /1/triggers/{datasetSlug}/{triggerId}` | Required |
| Trigger | `update` | `PUT /1/triggers/{datasetSlug}/{triggerId}` | Required |

## Connect to the API

- API server: `https://api.honeycomb.io`
- API server: `https://api.eu1.honeycomb.io`

The default credential is sent in the `X-Honeycomb-Team` header.

> Authenticate using a Honeycomb Configuration Key.
>
> Pass the **Token** in the `X-Honeycomb-Team` header:
> ```http
> X-Honeycomb-Team: 1234567890123456789012
> ```
>
> If you created your key using the API, use `data.attributes.secret`; this is the same value as the **Token** in the UI.
>
> To learn how to create a Configuration Key, visit [Manage Environment API Keys](/configure/environments/manage-api-keys). To learn more about authenticating requests, visit [API Authentication](/api/authentication).

> Authenticate using a Honeycomb Ingest Key.
>
> Pass the Ingest Key in the `X-Honeycomb-Team` header:
> ```http
> X-Honeycomb-Team: hc[x]ik_1234567890123456789012345612345678901234567890123456789012
> ```
>
> The key value is the key ID and key secret concatenated with no separator:
> - If you created your key through the UI, Honeycomb provides the complete value as the **Ingest Key**.
> - If you created your key using the API, construct the key value by concatenating `data.id` and `data.attributes.secret` with no separator.
>
> To learn how to create an Ingest Key, visit [Manage Environment API Keys](/configure/environments/manage-api-keys). To learn more about authenticating requests, visit [API Authentication](/api/authentication).

> We recommend using a Honeycomb Ingest Key to authenticate, though a Configuration Key will work.
>
> To learn more about authenticating requests, visit [API Authentication](/api/authentication).

> Authenticate using a Honeycomb Management Key.
>
> Pass the Management Key as a Bearer token in the `Authorization` header:
> ```http
> Authorization: Bearer hcxmk_12345678901234567890123456:12345678901234567890123456789012
> ```
>
> Construct the key value by joining the **Key ID** and **Secret** with a colon (`:`).
>
> To learn how to create a Management Key, visit [Manage Team API Keys](/configure/teams/manage-api-keys). To learn more about authenticating requests, visit [API Authentication](/api/authentication).

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Python | `py/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `honeycomb_list`: List records for an entity. Supported entities: `board`, `board_view`, `dataset`, `historical_anomaly`, `recipient`, `signal`, `slo_count`, `slo_hourly_count`, `trigger`.
- `honeycomb_load`: Load one record for an entity. Supported entities: `auth`, `board`, `board_view`, `burn_alert`, `calculated_field`, `column`, `dataset`, `dataset_definition`, `environment`, `key_management`, `map_dependency`, `marker`, `marker_setting`, `query`, `query_annotation`, `query_result`, `recipient`, `signal`, `slo`, `trigger`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.


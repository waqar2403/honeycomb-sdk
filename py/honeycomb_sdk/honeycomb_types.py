# Typed models for the Honeycomb SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Auth(TypedDict):
    api_key_access: dict
    environment: dict
    id: str
    team: dict
    type: str


class AuthLoadMatchRequired(TypedDict):
    id: str


class AuthLoadMatch(AuthLoadMatchRequired, total=False):
    api_key_access: dict
    environment: dict
    team: dict
    type: str


class BoardRequired(TypedDict):
    name: str
    type: str


class Board(BoardRequired, total=False):
    description: str
    id: str
    layout_generation: str
    links: dict
    panels: list
    preset_filters: list
    tags: list


class BoardLoadMatch(TypedDict):
    id: str


class BoardListMatch(TypedDict, total=False):
    description: str
    id: str
    layout_generation: str
    links: dict
    name: str
    panels: list
    preset_filters: list
    tags: list
    type: str


class BoardCreateDataRequired(TypedDict):
    name: str
    type: str


class BoardCreateData(BoardCreateDataRequired, total=False):
    description: str
    id: str
    layout_generation: str
    links: dict
    panels: list
    preset_filters: list
    tags: list


class BoardUpdateDataRequired(TypedDict):
    id: str


class BoardUpdateData(BoardUpdateDataRequired, total=False):
    description: str
    layout_generation: str
    links: dict
    name: str
    panels: list
    preset_filters: list
    tags: list
    type: str


class BoardRemoveMatch(TypedDict):
    id: str


class BoardView(TypedDict, total=False):
    filters: list
    id: str
    name: str


class BoardViewLoadMatch(TypedDict):
    board_id: str
    id: str


class BoardViewListMatch(TypedDict):
    board_id: str


class BoardViewCreateDataRequired(TypedDict):
    board_id: str


class BoardViewCreateData(BoardViewCreateDataRequired, total=False):
    filters: list
    id: str
    name: str


class BoardViewUpdateDataRequired(TypedDict):
    board_id: str
    id: str


class BoardViewUpdateData(BoardViewUpdateDataRequired, total=False):
    filters: list
    name: str


class BoardViewRemoveMatch(TypedDict):
    board_id: str
    id: str


class BulkSignalRecipientAssignment(TypedDict):
    failed: list
    recipients: list
    selector: dict
    succeeded: list
    unchanged: list


class BulkSignalRecipientAssignmentCreateData(TypedDict):
    failed: list
    recipients: list
    selector: dict
    succeeded: list
    unchanged: list


class BurnAlertRequired(TypedDict):
    alert_type: str


class BurnAlert(BurnAlertRequired, total=False):
    id: str


class BurnAlertLoadMatch(TypedDict):
    dataset_slug: str
    id: str


class BurnAlertListMatch(TypedDict):
    dataset_slug: str
    slo_id: str


class BurnAlertCreateDataRequired(TypedDict):
    dataset_slug: str
    alert_type: str


class BurnAlertCreateData(BurnAlertCreateDataRequired, total=False):
    id: str


class BurnAlertUpdateDataRequired(TypedDict):
    dataset_slug: str
    id: str


class BurnAlertUpdateData(BurnAlertUpdateDataRequired, total=False):
    alert_type: str


class BurnAlertRemoveMatch(TypedDict):
    dataset_slug: str
    id: str


class CalculatedFieldRequired(TypedDict):
    alias: str
    created_at: str
    expression: str
    id: str
    updated_at: str


class CalculatedField(CalculatedFieldRequired, total=False):
    description: str


class CalculatedFieldLoadMatch(TypedDict):
    dataset_slug: str
    id: str


class CalculatedFieldListMatchRequired(TypedDict):
    dataset_slug: str


class CalculatedFieldListMatch(CalculatedFieldListMatchRequired, total=False):
    alia: str


class CalculatedFieldCreateDataRequired(TypedDict):
    dataset_slug: str
    alias: str
    created_at: str
    expression: str
    id: str
    updated_at: str


class CalculatedFieldCreateData(CalculatedFieldCreateDataRequired, total=False):
    description: str


class CalculatedFieldUpdateDataRequired(TypedDict):
    dataset_slug: str
    id: str


class CalculatedFieldUpdateData(CalculatedFieldUpdateDataRequired, total=False):
    alias: str
    created_at: str
    description: str
    expression: str
    updated_at: str


class CalculatedFieldRemoveMatch(TypedDict):
    dataset_slug: str
    id: str


class ColumnRequired(TypedDict):
    key_name: str


class Column(ColumnRequired, total=False):
    created_at: str
    description: str
    hidden: bool
    id: str
    last_written: str
    type: str
    updated_at: str


class ColumnLoadMatch(TypedDict):
    dataset_slug: str
    id: str


class ColumnListMatchRequired(TypedDict):
    dataset_slug: str


class ColumnListMatch(ColumnListMatchRequired, total=False):
    key_name: str


class ColumnCreateDataRequired(TypedDict):
    dataset_slug: str
    key_name: str


class ColumnCreateData(ColumnCreateDataRequired, total=False):
    created_at: str
    description: str
    hidden: bool
    id: str
    last_written: str
    type: str
    updated_at: str


class ColumnUpdateDataRequired(TypedDict):
    dataset_slug: str
    id: str


class ColumnUpdateData(ColumnUpdateDataRequired, total=False):
    created_at: str
    description: str
    hidden: bool
    key_name: str
    last_written: str
    type: str
    updated_at: str


class ColumnRemoveMatch(TypedDict):
    dataset_slug: str
    id: str


class DatasetRequired(TypedDict):
    name: str


class Dataset(DatasetRequired, total=False):
    created_at: str
    dataset_type: str
    description: str
    expand_json_depth: int
    id: str
    last_written_at: None | str
    regular_columns_count: None | int
    settings: dict
    slug: str


class DatasetLoadMatch(TypedDict):
    id: str


class DatasetListMatch(TypedDict, total=False):
    created_at: str
    dataset_type: str
    description: str
    expand_json_depth: int
    id: str
    last_written_at: None | str
    name: str
    regular_columns_count: None | int
    settings: dict
    slug: str


class DatasetCreateDataRequired(TypedDict):
    name: str


class DatasetCreateData(DatasetCreateDataRequired, total=False):
    created_at: str
    dataset_type: str
    description: str
    expand_json_depth: int
    id: str
    last_written_at: None | str
    regular_columns_count: None | int
    settings: dict
    slug: str


class DatasetUpdateDataRequired(TypedDict):
    id: str


class DatasetUpdateData(DatasetUpdateDataRequired, total=False):
    created_at: str
    dataset_type: str
    description: str
    expand_json_depth: int
    last_written_at: None | str
    name: str
    regular_columns_count: None | int
    settings: dict
    slug: str


class DatasetRemoveMatch(TypedDict):
    id: str


class DatasetDefinition(TypedDict, total=False):
    annotation_type: Any
    duration_ms: Any
    error: Any
    id: str
    link_span_id: str
    link_trace_id: str
    log_message: Any
    log_severity: Any
    name: str
    parent_id: str
    route: Any
    service_name: Any
    span_id: str
    span_kind: Any
    status: Any
    trace_id: str
    user: Any


class DatasetDefinitionLoadMatch(TypedDict):
    id: str


class DatasetDefinitionUpdateDataRequired(TypedDict):
    id: str


class DatasetDefinitionUpdateData(DatasetDefinitionUpdateDataRequired, total=False):
    annotation_type: Any
    duration_ms: Any
    error: Any
    link_span_id: str
    link_trace_id: str
    log_message: Any
    log_severity: Any
    name: str
    parent_id: str
    route: Any
    service_name: Any
    span_id: str
    span_kind: Any
    status: Any
    trace_id: str
    user: Any


class EnvironmentRequired(TypedDict):
    data: dict


class Environment(EnvironmentRequired, total=False):
    id: str


class EnvironmentLoadMatchRequired(TypedDict):
    team_slug: str


class EnvironmentLoadMatch(EnvironmentLoadMatchRequired, total=False):
    id: str
    page_after: str
    page_size: float


class EnvironmentCreateDataRequired(TypedDict):
    team_slug: str
    data: dict


class EnvironmentCreateData(EnvironmentCreateDataRequired, total=False):
    id: str


class EnvironmentUpdateDataRequired(TypedDict):
    id: str
    team_slug: str


class EnvironmentUpdateData(EnvironmentUpdateDataRequired, total=False):
    data: dict


class EnvironmentRemoveMatch(TypedDict):
    id: str
    team_slug: str


class Event(TypedDict, total=False):
    batch_events: list
    status: int


class EventCreateDataRequired(TypedDict):
    dataset_slug: str


class EventCreateData(EventCreateDataRequired, total=False):
    batch_events: list
    status: int


class HistoricalAnomaly(TypedDict):
    ended_at: int
    id: str
    measurement: float
    normal_range: Any
    started_at: int


class HistoricalAnomalyListMatchRequired(TypedDict):
    signal_id: str
    end_time: int
    start_time: int


class HistoricalAnomalyListMatch(HistoricalAnomalyListMatchRequired, total=False):
    page_after: str
    page_size: float


class KeyManagementRequired(TypedDict):
    data: dict


class KeyManagement(KeyManagementRequired, total=False):
    id: str


class KeyManagementLoadMatchRequired(TypedDict):
    team_slug: str


class KeyManagementLoadMatch(KeyManagementLoadMatchRequired, total=False):
    id: str
    filter_type: str
    page_after: str
    page_size: float


class KeyManagementCreateDataRequired(TypedDict):
    team_slug: str
    data: dict


class KeyManagementCreateData(KeyManagementCreateDataRequired, total=False):
    id: str


class KeyManagementUpdateDataRequired(TypedDict):
    id: str
    team_slug: str


class KeyManagementUpdateData(KeyManagementUpdateDataRequired, total=False):
    data: dict


class KeyManagementRemoveMatch(TypedDict):
    id: str
    team_slug: str


class KinesisEvent(TypedDict, total=False):
    errorMessage: str
    records: list
    requestId: str
    timestamp: int


class KinesisEventCreateDataRequired(TypedDict):
    dataset_slug: str


class KinesisEventCreateData(KinesisEventCreateDataRequired, total=False):
    errorMessage: str
    records: list
    requestId: str
    timestamp: int


class ManagementAuth(TypedDict):
    pass


class ManagementAuthLoadMatch(TypedDict):
    pass


class MapDependencyRequired(TypedDict):
    links: dict


class MapDependency(MapDependencyRequired, total=False):
    dependencies: Any
    end_time: int
    filters: list
    request_id: str
    start_time: int
    status: str
    time_range: int


class MapDependencyLoadMatchRequired(TypedDict):
    request_id: str


class MapDependencyLoadMatch(MapDependencyLoadMatchRequired, total=False):
    page_after: str
    page_size: float


class MapDependencyCreateDataRequired(TypedDict):
    links: dict


class MapDependencyCreateData(MapDependencyCreateDataRequired, total=False):
    limit: int
    dependencies: Any
    end_time: int
    filters: list
    request_id: str
    start_time: int
    status: str
    time_range: int


class Marker(TypedDict, total=False):
    color: str
    created_at: str
    end_time: int
    id: str
    message: str
    start_time: int
    type: str
    updated_at: str
    url: str


class MarkerListMatch(TypedDict):
    dataset_slug: str


class MarkerCreateDataRequired(TypedDict):
    dataset_slug: str


class MarkerCreateData(MarkerCreateDataRequired, total=False):
    color: str
    created_at: str
    end_time: int
    id: str
    message: str
    start_time: int
    type: str
    updated_at: str
    url: str


class MarkerUpdateDataRequired(TypedDict):
    dataset_slug: str
    id: str


class MarkerUpdateData(MarkerUpdateDataRequired, total=False):
    color: str
    created_at: str
    end_time: int
    message: str
    start_time: int
    type: str
    updated_at: str
    url: str


class MarkerRemoveMatch(TypedDict):
    dataset_slug: str
    id: str


class MarkerSettingRequired(TypedDict):
    color: str
    type: str


class MarkerSetting(MarkerSettingRequired, total=False):
    created_at: str
    id: str
    updated_at: None | str


class MarkerSettingListMatch(TypedDict):
    dataset_slug: str


class MarkerSettingCreateDataRequired(TypedDict):
    dataset_slug: str
    color: str
    type: str


class MarkerSettingCreateData(MarkerSettingCreateDataRequired, total=False):
    created_at: str
    id: str
    updated_at: None | str


class MarkerSettingUpdateDataRequired(TypedDict):
    dataset_slug: str
    id: str


class MarkerSettingUpdateData(MarkerSettingUpdateDataRequired, total=False):
    color: str
    created_at: str
    type: str
    updated_at: None | str


class MarkerSettingRemoveMatch(TypedDict):
    dataset_slug: str
    id: str


class Query(TypedDict, total=False):
    breakdowns: list
    calculated_fields: list
    calculations: list
    compare_time_offset_seconds: int
    end_time: int
    filter_combination: str
    filters: list
    formulas: list
    granularity: int
    havings: list
    id: str
    limit: int
    orders: list
    start_time: int
    time_range: int
    usage_mode: bool


class QueryLoadMatch(TypedDict):
    dataset_slug: str
    id: str


class QueryCreateDataRequired(TypedDict):
    dataset_slug: str


class QueryCreateData(QueryCreateDataRequired, total=False):
    breakdowns: list
    calculated_fields: list
    calculations: list
    compare_time_offset_seconds: int
    end_time: int
    filter_combination: str
    filters: list
    formulas: list
    granularity: int
    havings: list
    id: str
    limit: int
    orders: list
    start_time: int
    time_range: int
    usage_mode: bool


class QueryAnnotationRequired(TypedDict):
    name: str
    query_id: str


class QueryAnnotation(QueryAnnotationRequired, total=False):
    created_at: str
    description: str
    id: str
    source: str
    updated_at: str


class QueryAnnotationLoadMatch(TypedDict):
    dataset_slug: str
    id: str


class QueryAnnotationListMatchRequired(TypedDict):
    dataset_slug: str


class QueryAnnotationListMatch(QueryAnnotationListMatchRequired, total=False):
    include_board_annotation: bool


class QueryAnnotationCreateDataRequired(TypedDict):
    dataset_slug: str
    name: str
    query_id: str


class QueryAnnotationCreateData(QueryAnnotationCreateDataRequired, total=False):
    created_at: str
    description: str
    id: str
    source: str
    updated_at: str


class QueryAnnotationUpdateDataRequired(TypedDict):
    dataset_slug: str
    id: str


class QueryAnnotationUpdateData(QueryAnnotationUpdateDataRequired, total=False):
    created_at: str
    description: str
    name: str
    query_id: str
    source: str
    updated_at: str


class QueryAnnotationRemoveMatch(TypedDict):
    dataset_slug: str
    id: str


class QueryResultRequired(TypedDict):
    query_id: str


class QueryResult(QueryResultRequired, total=False):
    complete: bool
    data: dict
    disable_other_by_aggregate: bool
    disable_series: bool
    disable_total_by_aggregate: bool
    error: str
    id: str
    limit: int
    links: dict
    query: Any


class QueryResultLoadMatch(TypedDict):
    dataset_slug: str
    id: str


class QueryResultCreateDataRequired(TypedDict):
    dataset_slug: str
    query_id: str


class QueryResultCreateData(QueryResultCreateDataRequired, total=False):
    complete: bool
    data: dict
    disable_other_by_aggregate: bool
    disable_series: bool
    disable_total_by_aggregate: bool
    error: str
    id: str
    limit: int
    links: dict
    query: Any


class RecipientRequired(TypedDict):
    type: str


class Recipient(RecipientRequired, total=False):
    id: str


class RecipientLoadMatch(TypedDict):
    id: str


class RecipientListMatch(TypedDict, total=False):
    id: str
    type: str


class RecipientCreateDataRequired(TypedDict):
    type: str


class RecipientCreateData(RecipientCreateDataRequired, total=False):
    id: str


class RecipientUpdateDataRequired(TypedDict):
    id: str


class RecipientUpdateData(RecipientUpdateDataRequired, total=False):
    type: str


class RecipientRemoveMatch(TypedDict):
    id: str


class Signal(TypedDict):
    auto_investigate: bool
    created_at: str
    currently_anomalous: bool
    dataset_slug: str
    enabled: bool
    environment_slug: str
    id: str
    last_anomaly_ended_at: int | None
    last_anomaly_started_at: int | None
    measured_signal: str
    recipients: list
    sensitivity: Any
    service_name: str
    status: str
    updated_at: str


class SignalLoadMatch(TypedDict):
    id: str


class SignalListMatch(TypedDict, total=False):
    currently_anomalous: bool
    dataset_slug: str
    measured_signal: str
    page_after: str
    page_size: float
    service_name: str
    status: str


class SignalUpdateDataRequired(TypedDict):
    id: str


class SignalUpdateData(SignalUpdateDataRequired, total=False):
    auto_investigate: bool
    created_at: str
    currently_anomalous: bool
    dataset_slug: str
    enabled: bool
    environment_slug: str
    last_anomaly_ended_at: int | None
    last_anomaly_started_at: int | None
    measured_signal: str
    recipients: list
    sensitivity: Any
    service_name: str
    status: str
    updated_at: str


class Slo(TypedDict, total=False):
    created_at: str
    dataset_slugs: list
    description: str
    id: str
    name: str
    reset_at: str
    sli: dict
    tags: list
    target_per_million: int
    time_period_days: int
    updated_at: str


class SloLoadMatchRequired(TypedDict):
    dataset_slug: str
    id: str


class SloLoadMatch(SloLoadMatchRequired, total=False):
    detailed: bool


class SloListMatch(TypedDict):
    dataset_slug: str


class SloCreateDataRequired(TypedDict):
    dataset_slug: str


class SloCreateData(SloCreateDataRequired, total=False):
    created_at: str
    dataset_slugs: list
    description: str
    id: str
    name: str
    reset_at: str
    sli: dict
    tags: list
    target_per_million: int
    time_period_days: int
    updated_at: str


class SloUpdateDataRequired(TypedDict):
    dataset_slug: str
    id: str


class SloUpdateData(SloUpdateDataRequired, total=False):
    created_at: str
    dataset_slugs: list
    description: str
    name: str
    reset_at: str
    sli: dict
    tags: list
    target_per_million: int
    time_period_days: int
    updated_at: str


class SloRemoveMatch(TypedDict):
    dataset_slug: str
    id: str


class SloCount(TypedDict, total=False):
    error_count: int
    is_partial: bool
    total_count: int
    window_end: int
    window_start: int


class SloCountListMatch(TypedDict):
    dataset_slug: str
    slo_id: str
    end_time: int
    start_time: int


class SloHistory(TypedDict):
    end_time: int
    ids: list
    start_time: int


class SloHistoryCreateData(TypedDict):
    end_time: int
    ids: list
    start_time: int


class SloHourlyCount(TypedDict, total=False):
    end_time: int
    error_count: int
    is_partial: bool
    start_time: int
    total_count: int


class SloHourlyCountListMatch(TypedDict):
    dataset_slug: str
    slo_id: str
    end_time: int
    start_time: int


class TriggerRequired(TypedDict):
    evaluation_schedule: dict
    threshold: dict


class Trigger(TriggerRequired, total=False):
    alert_type: str
    auto_investigate: bool
    baseline_details: dict
    created_at: str
    dataset_slug: str
    description: str
    disabled: bool
    evaluation_schedule_type: str
    frequency: int
    id: str
    name: str
    query: dict
    query_id: str
    recipients: list
    tags: list
    triggered: bool
    updated_at: str


class TriggerLoadMatch(TypedDict):
    dataset_slug: str
    id: str


class TriggerListMatch(TypedDict):
    dataset_slug: str


class TriggerCreateDataRequired(TypedDict):
    dataset_slug: str
    evaluation_schedule: dict
    threshold: dict


class TriggerCreateData(TriggerCreateDataRequired, total=False):
    alert_type: str
    auto_investigate: bool
    baseline_details: dict
    created_at: str
    description: str
    disabled: bool
    evaluation_schedule_type: str
    frequency: int
    id: str
    name: str
    query: dict
    query_id: str
    recipients: list
    tags: list
    triggered: bool
    updated_at: str


class TriggerUpdateDataRequired(TypedDict):
    dataset_slug: str
    id: str


class TriggerUpdateData(TriggerUpdateDataRequired, total=False):
    alert_type: str
    auto_investigate: bool
    baseline_details: dict
    created_at: str
    description: str
    disabled: bool
    evaluation_schedule: dict
    evaluation_schedule_type: str
    frequency: int
    name: str
    query: dict
    query_id: str
    recipients: list
    tags: list
    threshold: dict
    triggered: bool
    updated_at: str


class TriggerRemoveMatch(TypedDict):
    dataset_slug: str
    id: str

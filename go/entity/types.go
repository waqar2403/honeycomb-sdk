// Typed models for the Honeycomb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/honeycomb-sdk/go/core"
)

// Auth is the typed data model for the auth entity.
type Auth struct {
}

// AuthLoadMatch is the typed request payload for Auth.LoadTyped.
type AuthLoadMatch struct {
	ApiKeyAccess *map[string]any `json:"api_key_access,omitempty"`
	Environment *map[string]any `json:"environment,omitempty"`
	Id string `json:"id"`
	Team *map[string]any `json:"team,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Board is the typed data model for the board entity.
type Board struct {
}

// BoardLoadMatch is the typed request payload for Board.LoadTyped.
type BoardLoadMatch struct {
	Id string `json:"id"`
}

// BoardListMatch is the typed request payload for Board.ListTyped.
type BoardListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	LayoutGeneration *string `json:"layout_generation,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	Name *string `json:"name,omitempty"`
	Panels *[]any `json:"panels,omitempty"`
	PresetFilters *[]any `json:"preset_filters,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Type *string `json:"type,omitempty"`
}

// BoardCreateData is the typed request payload for Board.CreateTyped.
type BoardCreateData struct {
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	LayoutGeneration *string `json:"layout_generation,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	Name string `json:"name"`
	Panels *[]any `json:"panels,omitempty"`
	PresetFilters *[]any `json:"preset_filters,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Type string `json:"type"`
}

// BoardUpdateData is the typed request payload for Board.UpdateTyped.
type BoardUpdateData struct {
	Id string `json:"id"`
	Description *string `json:"description,omitempty"`
	LayoutGeneration *string `json:"layout_generation,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	Name *string `json:"name,omitempty"`
	Panels *[]any `json:"panels,omitempty"`
	PresetFilters *[]any `json:"preset_filters,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Type *string `json:"type,omitempty"`
}

// BoardRemoveMatch is the typed request payload for Board.RemoveTyped.
type BoardRemoveMatch struct {
	Id string `json:"id"`
	ViewId *string `json:"view_id,omitempty"`
}

// BoardView is the typed data model for the board_view entity.
type BoardView struct {
}

// BoardViewLoadMatch is the typed request payload for BoardView.LoadTyped.
type BoardViewLoadMatch struct {
	BoardId string `json:"board_id"`
	Id string `json:"id"`
}

// BoardViewListMatch is the typed request payload for BoardView.ListTyped.
type BoardViewListMatch struct {
	Id string `json:"id"`
}

// BoardViewCreateData is the typed request payload for BoardView.CreateTyped.
type BoardViewCreateData struct {
	Id string `json:"id"`
	Filters *[]any `json:"filters,omitempty"`
	Name *string `json:"name,omitempty"`
}

// BoardViewUpdateData is the typed request payload for BoardView.UpdateTyped.
type BoardViewUpdateData struct {
	BoardId string `json:"board_id"`
	Id string `json:"id"`
	Filters *[]any `json:"filters,omitempty"`
	Name *string `json:"name,omitempty"`
}

// BulkSignalRecipientAssignment is the typed data model for the bulk_signal_recipient_assignment entity.
type BulkSignalRecipientAssignment struct {
}

// BulkSignalRecipientAssignmentCreateData is the typed request payload for BulkSignalRecipientAssignment.CreateTyped.
type BulkSignalRecipientAssignmentCreateData struct {
	Failed []any `json:"failed"`
	Recipients []any `json:"recipients"`
	Selector map[string]any `json:"selector"`
	Succeeded []any `json:"succeeded"`
	Unchanged []any `json:"unchanged"`
}

// BurnAlert is the typed data model for the burn_alert entity.
type BurnAlert struct {
}

// BurnAlertLoadMatch is the typed request payload for BurnAlert.LoadTyped.
type BurnAlertLoadMatch struct {
	Id string `json:"id"`
	SloId string `json:"slo_id"`
}

// BurnAlertCreateData is the typed request payload for BurnAlert.CreateTyped.
type BurnAlertCreateData struct {
	Id string `json:"id"`
	AlertType string `json:"alert_type"`
}

// BurnAlertUpdateData is the typed request payload for BurnAlert.UpdateTyped.
type BurnAlertUpdateData struct {
	BurnAlertId string `json:"burn_alert_id"`
	DatasetSlug string `json:"dataset_slug"`
	AlertType *string `json:"alert_type,omitempty"`
	Id *string `json:"id,omitempty"`
}

// BurnAlertRemoveMatch is the typed request payload for BurnAlert.RemoveTyped.
type BurnAlertRemoveMatch struct {
	BurnAlertId string `json:"burn_alert_id"`
	DatasetSlug string `json:"dataset_slug"`
}

// CalculatedField is the typed data model for the calculated_field entity.
type CalculatedField struct {
}

// CalculatedFieldLoadMatch is the typed request payload for CalculatedField.LoadTyped.
type CalculatedFieldLoadMatch struct {
	DatasetSlug string `json:"dataset_slug"`
	DerivedColumnId *string `json:"derived_column_id,omitempty"`
	Alia *string `json:"alia,omitempty"`
}

// CalculatedFieldCreateData is the typed request payload for CalculatedField.CreateTyped.
type CalculatedFieldCreateData struct {
	DatasetSlug string `json:"dataset_slug"`
	Alias string `json:"alias"`
	CreatedAt string `json:"created_at"`
	Description *string `json:"description,omitempty"`
	Expression string `json:"expression"`
	Id string `json:"id"`
	UpdatedAt string `json:"updated_at"`
}

// CalculatedFieldUpdateData is the typed request payload for CalculatedField.UpdateTyped.
type CalculatedFieldUpdateData struct {
	DatasetSlug string `json:"dataset_slug"`
	DerivedColumnId string `json:"derived_column_id"`
	Alias *string `json:"alias,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Expression *string `json:"expression,omitempty"`
	Id *string `json:"id,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// CalculatedFieldRemoveMatch is the typed request payload for CalculatedField.RemoveTyped.
type CalculatedFieldRemoveMatch struct {
	DatasetSlug string `json:"dataset_slug"`
	DerivedColumnId string `json:"derived_column_id"`
}

// Column is the typed data model for the column entity.
type Column struct {
}

// ColumnLoadMatch is the typed request payload for Column.LoadTyped.
type ColumnLoadMatch struct {
	Id string `json:"id"`
	KeyName *string `json:"key_name,omitempty"`
}

// ColumnCreateData is the typed request payload for Column.CreateTyped.
type ColumnCreateData struct {
	Id string `json:"id"`
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Hidden *bool `json:"hidden,omitempty"`
	KeyName string `json:"key_name"`
	LastWritten *string `json:"last_written,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// ColumnUpdateData is the typed request payload for Column.UpdateTyped.
type ColumnUpdateData struct {
	ColumnId string `json:"column_id"`
	DatasetSlug string `json:"dataset_slug"`
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Hidden *bool `json:"hidden,omitempty"`
	Id *string `json:"id,omitempty"`
	KeyName *string `json:"key_name,omitempty"`
	LastWritten *string `json:"last_written,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// ColumnRemoveMatch is the typed request payload for Column.RemoveTyped.
type ColumnRemoveMatch struct {
	ColumnId string `json:"column_id"`
	DatasetSlug string `json:"dataset_slug"`
}

// Dataset is the typed data model for the dataset entity.
type Dataset struct {
}

// DatasetLoadMatch is the typed request payload for Dataset.LoadTyped.
type DatasetLoadMatch struct {
	Id string `json:"id"`
}

// DatasetListMatch is the typed request payload for Dataset.ListTyped.
type DatasetListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	DatasetType *string `json:"dataset_type,omitempty"`
	Description *string `json:"description,omitempty"`
	ExpandJsonDepth *int `json:"expand_json_depth,omitempty"`
	Id *string `json:"id,omitempty"`
	LastWrittenAt *any `json:"last_written_at,omitempty"`
	Name *string `json:"name,omitempty"`
	RegularColumnsCount *any `json:"regular_columns_count,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	Slug *string `json:"slug,omitempty"`
}

// DatasetCreateData is the typed request payload for Dataset.CreateTyped.
type DatasetCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	DatasetType *string `json:"dataset_type,omitempty"`
	Description *string `json:"description,omitempty"`
	ExpandJsonDepth *int `json:"expand_json_depth,omitempty"`
	Id *string `json:"id,omitempty"`
	LastWrittenAt *any `json:"last_written_at,omitempty"`
	Name string `json:"name"`
	RegularColumnsCount *any `json:"regular_columns_count,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	Slug *string `json:"slug,omitempty"`
}

// DatasetUpdateData is the typed request payload for Dataset.UpdateTyped.
type DatasetUpdateData struct {
	Id string `json:"id"`
	CreatedAt *string `json:"created_at,omitempty"`
	DatasetType *string `json:"dataset_type,omitempty"`
	Description *string `json:"description,omitempty"`
	ExpandJsonDepth *int `json:"expand_json_depth,omitempty"`
	LastWrittenAt *any `json:"last_written_at,omitempty"`
	Name *string `json:"name,omitempty"`
	RegularColumnsCount *any `json:"regular_columns_count,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	Slug *string `json:"slug,omitempty"`
}

// DatasetRemoveMatch is the typed request payload for Dataset.RemoveTyped.
type DatasetRemoveMatch struct {
	Id string `json:"id"`
}

// DatasetDefinition is the typed data model for the dataset_definition entity.
type DatasetDefinition struct {
}

// DatasetDefinitionLoadMatch is the typed request payload for DatasetDefinition.LoadTyped.
type DatasetDefinitionLoadMatch struct {
	Id string `json:"id"`
}

// DatasetDefinitionUpdateData is the typed request payload for DatasetDefinition.UpdateTyped.
type DatasetDefinitionUpdateData struct {
	Id string `json:"id"`
	AnnotationType *any `json:"annotation_type,omitempty"`
	DurationMs *any `json:"duration_ms,omitempty"`
	Error *any `json:"error,omitempty"`
	LinkSpanId *string `json:"link_span_id,omitempty"`
	LinkTraceId *string `json:"link_trace_id,omitempty"`
	LogMessage *any `json:"log_message,omitempty"`
	LogSeverity *any `json:"log_severity,omitempty"`
	Name *string `json:"name,omitempty"`
	ParentId *string `json:"parent_id,omitempty"`
	Route *any `json:"route,omitempty"`
	ServiceName *any `json:"service_name,omitempty"`
	SpanId *string `json:"span_id,omitempty"`
	SpanKind *any `json:"span_kind,omitempty"`
	Status *any `json:"status,omitempty"`
	TraceId *string `json:"trace_id,omitempty"`
	User *any `json:"user,omitempty"`
}

// Environment is the typed data model for the environment entity.
type Environment struct {
}

// EnvironmentLoadMatch is the typed request payload for Environment.LoadTyped.
type EnvironmentLoadMatch struct {
	Id *string `json:"id,omitempty"`
	TeamSlug string `json:"team_slug"`
	PageAfter *string `json:"page_after,omitempty"`
	PageSize *float64 `json:"page_size,omitempty"`
}

// EnvironmentCreateData is the typed request payload for Environment.CreateTyped.
type EnvironmentCreateData struct {
	TeamSlug string `json:"team_slug"`
	Data map[string]any `json:"data"`
	Id *string `json:"id,omitempty"`
}

// EnvironmentUpdateData is the typed request payload for Environment.UpdateTyped.
type EnvironmentUpdateData struct {
	Id string `json:"id"`
	TeamSlug string `json:"team_slug"`
	Data *map[string]any `json:"data,omitempty"`
}

// EnvironmentRemoveMatch is the typed request payload for Environment.RemoveTyped.
type EnvironmentRemoveMatch struct {
	Id string `json:"id"`
	TeamSlug string `json:"team_slug"`
}

// Event is the typed data model for the event entity.
type Event struct {
}

// EventCreateData is the typed request payload for Event.CreateTyped.
type EventCreateData struct {
	DatasetSlug string `json:"dataset_slug"`
	BatchEvents *[]any `json:"batch_events,omitempty"`
	Id *string `json:"id,omitempty"`
	Status *int `json:"status,omitempty"`
}

// HistoricalAnomaly is the typed data model for the historical_anomaly entity.
type HistoricalAnomaly struct {
}

// HistoricalAnomalyListMatch is the typed request payload for HistoricalAnomaly.ListTyped.
type HistoricalAnomalyListMatch struct {
	SignalId string `json:"signal_id"`
	EndTime int `json:"end_time"`
	PageAfter *string `json:"page_after,omitempty"`
	PageSize *float64 `json:"page_size,omitempty"`
	StartTime int `json:"start_time"`
}

// KeyManagement is the typed data model for the key_management entity.
type KeyManagement struct {
}

// KeyManagementLoadMatch is the typed request payload for KeyManagement.LoadTyped.
type KeyManagementLoadMatch struct {
	Id *string `json:"id,omitempty"`
	TeamSlug string `json:"team_slug"`
	FilterType *string `json:"filter_type,omitempty"`
	PageAfter *string `json:"page_after,omitempty"`
	PageSize *float64 `json:"page_size,omitempty"`
}

// KeyManagementCreateData is the typed request payload for KeyManagement.CreateTyped.
type KeyManagementCreateData struct {
	TeamSlug string `json:"team_slug"`
	Data map[string]any `json:"data"`
	Id *string `json:"id,omitempty"`
}

// KeyManagementUpdateData is the typed request payload for KeyManagement.UpdateTyped.
type KeyManagementUpdateData struct {
	Id string `json:"id"`
	TeamSlug string `json:"team_slug"`
	Data *map[string]any `json:"data,omitempty"`
}

// KeyManagementRemoveMatch is the typed request payload for KeyManagement.RemoveTyped.
type KeyManagementRemoveMatch struct {
	Id string `json:"id"`
	TeamSlug string `json:"team_slug"`
}

// Kinesi is the typed data model for the kinesi entity.
type Kinesi struct {
}

// KinesiCreateData is the typed request payload for Kinesi.CreateTyped.
type KinesiCreateData struct {
	DatasetSlug string `json:"dataset_slug"`
	ErrorMessage *string `json:"errorMessage,omitempty"`
	Records *[]any `json:"records,omitempty"`
	RequestId *string `json:"requestId,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
}

// MapDependency is the typed data model for the map_dependency entity.
type MapDependency struct {
}

// MapDependencyLoadMatch is the typed request payload for MapDependency.LoadTyped.
type MapDependencyLoadMatch struct {
	RequestId string `json:"request_id"`
	PageAfter *string `json:"page_after,omitempty"`
	PageSize *float64 `json:"page_size,omitempty"`
}

// MapDependencyCreateData is the typed request payload for MapDependency.CreateTyped.
type MapDependencyCreateData struct {
	Limit *int `json:"limit,omitempty"`
	Dependencies *any `json:"dependencies,omitempty"`
	EndTime *int `json:"end_time,omitempty"`
	Filters *[]any `json:"filters,omitempty"`
	Links map[string]any `json:"links"`
	RequestId *string `json:"request_id,omitempty"`
	StartTime *int `json:"start_time,omitempty"`
	Status *string `json:"status,omitempty"`
	TimeRange *int `json:"time_range,omitempty"`
}

// Marker is the typed data model for the marker entity.
type Marker struct {
}

// MarkerLoadMatch is the typed request payload for Marker.LoadTyped.
type MarkerLoadMatch struct {
	Id string `json:"id"`
}

// MarkerCreateData is the typed request payload for Marker.CreateTyped.
type MarkerCreateData struct {
	Id string `json:"id"`
	Color *string `json:"color,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	EndTime *int `json:"end_time,omitempty"`
	Message *string `json:"message,omitempty"`
	StartTime *int `json:"start_time,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// MarkerUpdateData is the typed request payload for Marker.UpdateTyped.
type MarkerUpdateData struct {
	DatasetSlug string `json:"dataset_slug"`
	MarkerId string `json:"marker_id"`
	Color *string `json:"color,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	EndTime *int `json:"end_time,omitempty"`
	Id *string `json:"id,omitempty"`
	Message *string `json:"message,omitempty"`
	StartTime *int `json:"start_time,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// MarkerRemoveMatch is the typed request payload for Marker.RemoveTyped.
type MarkerRemoveMatch struct {
	DatasetSlug string `json:"dataset_slug"`
	MarkerId string `json:"marker_id"`
}

// MarkerSetting is the typed data model for the marker_setting entity.
type MarkerSetting struct {
}

// MarkerSettingLoadMatch is the typed request payload for MarkerSetting.LoadTyped.
type MarkerSettingLoadMatch struct {
	Id string `json:"id"`
}

// MarkerSettingCreateData is the typed request payload for MarkerSetting.CreateTyped.
type MarkerSettingCreateData struct {
	Id string `json:"id"`
	Color string `json:"color"`
	CreatedAt *string `json:"created_at,omitempty"`
	Type string `json:"type"`
	UpdatedAt *any `json:"updated_at,omitempty"`
}

// MarkerSettingUpdateData is the typed request payload for MarkerSetting.UpdateTyped.
type MarkerSettingUpdateData struct {
	DatasetSlug string `json:"dataset_slug"`
	MarkerSettingId string `json:"marker_setting_id"`
	Color *string `json:"color,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Id *string `json:"id,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *any `json:"updated_at,omitempty"`
}

// MarkerSettingRemoveMatch is the typed request payload for MarkerSetting.RemoveTyped.
type MarkerSettingRemoveMatch struct {
	DatasetSlug string `json:"dataset_slug"`
	MarkerSettingId string `json:"marker_setting_id"`
}

// Query is the typed data model for the query entity.
type Query struct {
}

// QueryLoadMatch is the typed request payload for Query.LoadTyped.
type QueryLoadMatch struct {
	DatasetSlug string `json:"dataset_slug"`
	QueryId string `json:"query_id"`
}

// QueryCreateData is the typed request payload for Query.CreateTyped.
type QueryCreateData struct {
	Id string `json:"id"`
	Breakdowns *[]any `json:"breakdowns,omitempty"`
	CalculatedFields *[]any `json:"calculated_fields,omitempty"`
	Calculations *[]any `json:"calculations,omitempty"`
	CompareTimeOffsetSeconds *int `json:"compare_time_offset_seconds,omitempty"`
	EndTime *int `json:"end_time,omitempty"`
	FilterCombination *string `json:"filter_combination,omitempty"`
	Filters *[]any `json:"filters,omitempty"`
	Formulas *[]any `json:"formulas,omitempty"`
	Granularity *int `json:"granularity,omitempty"`
	Havings *[]any `json:"havings,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Orders *[]any `json:"orders,omitempty"`
	StartTime *int `json:"start_time,omitempty"`
	TimeRange *int `json:"time_range,omitempty"`
	UsageMode *bool `json:"usage_mode,omitempty"`
}

// QueryAnnotation is the typed data model for the query_annotation entity.
type QueryAnnotation struct {
}

// QueryAnnotationLoadMatch is the typed request payload for QueryAnnotation.LoadTyped.
type QueryAnnotationLoadMatch struct {
	Id string `json:"id"`
	IncludeBoardAnnotation *bool `json:"include_board_annotation,omitempty"`
}

// QueryAnnotationCreateData is the typed request payload for QueryAnnotation.CreateTyped.
type QueryAnnotationCreateData struct {
	Id string `json:"id"`
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Name string `json:"name"`
	QueryId string `json:"query_id"`
	Source *string `json:"source,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// QueryAnnotationUpdateData is the typed request payload for QueryAnnotation.UpdateTyped.
type QueryAnnotationUpdateData struct {
	DatasetSlug string `json:"dataset_slug"`
	QueryAnnotationId string `json:"query_annotation_id"`
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	QueryId *string `json:"query_id,omitempty"`
	Source *string `json:"source,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// QueryAnnotationRemoveMatch is the typed request payload for QueryAnnotation.RemoveTyped.
type QueryAnnotationRemoveMatch struct {
	DatasetSlug string `json:"dataset_slug"`
	QueryAnnotationId string `json:"query_annotation_id"`
}

// QueryResult is the typed data model for the query_result entity.
type QueryResult struct {
}

// QueryResultLoadMatch is the typed request payload for QueryResult.LoadTyped.
type QueryResultLoadMatch struct {
	DatasetSlug string `json:"dataset_slug"`
	QueryResultId string `json:"query_result_id"`
}

// QueryResultCreateData is the typed request payload for QueryResult.CreateTyped.
type QueryResultCreateData struct {
	Id string `json:"id"`
	Complete *bool `json:"complete,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	DisableOtherByAggregate *bool `json:"disable_other_by_aggregate,omitempty"`
	DisableSeries *bool `json:"disable_series,omitempty"`
	DisableTotalByAggregate *bool `json:"disable_total_by_aggregate,omitempty"`
	Error *string `json:"error,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	Query *any `json:"query,omitempty"`
	QueryId string `json:"query_id"`
}

// Recipient is the typed data model for the recipient entity.
type Recipient struct {
}

// RecipientLoadMatch is the typed request payload for Recipient.LoadTyped.
type RecipientLoadMatch struct {
	Id string `json:"id"`
}

// RecipientListMatch is the typed request payload for Recipient.ListTyped.
type RecipientListMatch struct {
	Id *string `json:"id,omitempty"`
	Type *string `json:"type,omitempty"`
}

// RecipientCreateData is the typed request payload for Recipient.CreateTyped.
type RecipientCreateData struct {
	Id *string `json:"id,omitempty"`
	Type string `json:"type"`
}

// RecipientUpdateData is the typed request payload for Recipient.UpdateTyped.
type RecipientUpdateData struct {
	Id string `json:"id"`
	Type *string `json:"type,omitempty"`
}

// RecipientRemoveMatch is the typed request payload for Recipient.RemoveTyped.
type RecipientRemoveMatch struct {
	Id string `json:"id"`
}

// Signal is the typed data model for the signal entity.
type Signal struct {
}

// SignalLoadMatch is the typed request payload for Signal.LoadTyped.
type SignalLoadMatch struct {
	Id string `json:"id"`
}

// SignalListMatch is the typed request payload for Signal.ListTyped.
type SignalListMatch struct {
	CurrentlyAnomalous *bool `json:"currently_anomalous,omitempty"`
	DatasetSlug *string `json:"dataset_slug,omitempty"`
	MeasuredSignal *string `json:"measured_signal,omitempty"`
	PageAfter *string `json:"page_after,omitempty"`
	PageSize *float64 `json:"page_size,omitempty"`
	ServiceName *string `json:"service_name,omitempty"`
	Status *string `json:"status,omitempty"`
}

// SignalUpdateData is the typed request payload for Signal.UpdateTyped.
type SignalUpdateData struct {
	Id string `json:"id"`
	AutoInvestigate *bool `json:"auto_investigate,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	CurrentlyAnomalous *bool `json:"currently_anomalous,omitempty"`
	DatasetSlug *string `json:"dataset_slug,omitempty"`
	Enabled *bool `json:"enabled,omitempty"`
	EnvironmentSlug *string `json:"environment_slug,omitempty"`
	LastAnomalyEndedAt *any `json:"last_anomaly_ended_at,omitempty"`
	LastAnomalyStartedAt *any `json:"last_anomaly_started_at,omitempty"`
	MeasuredSignal *string `json:"measured_signal,omitempty"`
	Recipients *[]any `json:"recipients,omitempty"`
	Sensitivity *any `json:"sensitivity,omitempty"`
	ServiceName *string `json:"service_name,omitempty"`
	Status *string `json:"status,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// Slo is the typed data model for the slo entity.
type Slo struct {
}

// SloLoadMatch is the typed request payload for Slo.LoadTyped.
type SloLoadMatch struct {
	Id string `json:"id"`
}

// SloCreateData is the typed request payload for Slo.CreateTyped.
type SloCreateData struct {
	Id string `json:"id"`
	CreatedAt *string `json:"created_at,omitempty"`
	DatasetSlugs *[]any `json:"dataset_slugs,omitempty"`
	Description *string `json:"description,omitempty"`
	Name *string `json:"name,omitempty"`
	ResetAt *string `json:"reset_at,omitempty"`
	Sli *map[string]any `json:"sli,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	TargetPerMillion *int `json:"target_per_million,omitempty"`
	TimePeriodDays *int `json:"time_period_days,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// SloUpdateData is the typed request payload for Slo.UpdateTyped.
type SloUpdateData struct {
	DatasetSlug string `json:"dataset_slug"`
	SloId string `json:"slo_id"`
	CreatedAt *string `json:"created_at,omitempty"`
	DatasetSlugs *[]any `json:"dataset_slugs,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ResetAt *string `json:"reset_at,omitempty"`
	Sli *map[string]any `json:"sli,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	TargetPerMillion *int `json:"target_per_million,omitempty"`
	TimePeriodDays *int `json:"time_period_days,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// SloRemoveMatch is the typed request payload for Slo.RemoveTyped.
type SloRemoveMatch struct {
	DatasetSlug string `json:"dataset_slug"`
	SloId string `json:"slo_id"`
}

// SloCount is the typed data model for the slo_count entity.
type SloCount struct {
}

// SloCountListMatch is the typed request payload for SloCount.ListTyped.
type SloCountListMatch struct {
	DatasetSlug string `json:"dataset_slug"`
	SloId string `json:"slo_id"`
	EndTime int `json:"end_time"`
	StartTime int `json:"start_time"`
}

// SloHistory is the typed data model for the slo_history entity.
type SloHistory struct {
}

// SloHistoryCreateData is the typed request payload for SloHistory.CreateTyped.
type SloHistoryCreateData struct {
	EndTime int `json:"end_time"`
	Ids []any `json:"ids"`
	StartTime int `json:"start_time"`
}

// SloHourlyCount is the typed data model for the slo_hourly_count entity.
type SloHourlyCount struct {
}

// SloHourlyCountListMatch is the typed request payload for SloHourlyCount.ListTyped.
type SloHourlyCountListMatch struct {
	DatasetSlug string `json:"dataset_slug"`
	SloId string `json:"slo_id"`
	EndTime int `json:"end_time"`
	StartTime int `json:"start_time"`
}

// Trigger is the typed data model for the trigger entity.
type Trigger struct {
}

// TriggerLoadMatch is the typed request payload for Trigger.LoadTyped.
type TriggerLoadMatch struct {
	Id string `json:"id"`
}

// TriggerListMatch is the typed request payload for Trigger.ListTyped.
type TriggerListMatch struct {
	RecipientId string `json:"recipient_id"`
}

// TriggerCreateData is the typed request payload for Trigger.CreateTyped.
type TriggerCreateData struct {
	Id string `json:"id"`
	AlertType *string `json:"alert_type,omitempty"`
	AutoInvestigate *bool `json:"auto_investigate,omitempty"`
	BaselineDetails *map[string]any `json:"baseline_details,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	DatasetSlug *string `json:"dataset_slug,omitempty"`
	Description *string `json:"description,omitempty"`
	Disabled *bool `json:"disabled,omitempty"`
	EvaluationSchedule map[string]any `json:"evaluation_schedule"`
	EvaluationScheduleType *string `json:"evaluation_schedule_type,omitempty"`
	Frequency *int `json:"frequency,omitempty"`
	Name *string `json:"name,omitempty"`
	Query *map[string]any `json:"query,omitempty"`
	QueryId *string `json:"query_id,omitempty"`
	Recipients *[]any `json:"recipients,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Threshold map[string]any `json:"threshold"`
	Triggered *bool `json:"triggered,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// TriggerUpdateData is the typed request payload for Trigger.UpdateTyped.
type TriggerUpdateData struct {
	DatasetSlug string `json:"dataset_slug"`
	TriggerId string `json:"trigger_id"`
	AlertType *string `json:"alert_type,omitempty"`
	AutoInvestigate *bool `json:"auto_investigate,omitempty"`
	BaselineDetails *map[string]any `json:"baseline_details,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Disabled *bool `json:"disabled,omitempty"`
	EvaluationSchedule *map[string]any `json:"evaluation_schedule,omitempty"`
	EvaluationScheduleType *string `json:"evaluation_schedule_type,omitempty"`
	Frequency *int `json:"frequency,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Query *map[string]any `json:"query,omitempty"`
	QueryId *string `json:"query_id,omitempty"`
	Recipients *[]any `json:"recipients,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Threshold *map[string]any `json:"threshold,omitempty"`
	Triggered *bool `json:"triggered,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// TriggerRemoveMatch is the typed request payload for Trigger.RemoveTyped.
type TriggerRemoveMatch struct {
	DatasetSlug string `json:"dataset_slug"`
	TriggerId string `json:"trigger_id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

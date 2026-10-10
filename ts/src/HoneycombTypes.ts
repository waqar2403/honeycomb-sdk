// Typed models for the Honeycomb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Auth {
  api_key_access: Record<string, any>
  environment: Record<string, any>
  id: string
  team: Record<string, any>
  type: string
}

export interface AuthLoadMatch {
  api_key_access?: Record<string, any>
  environment?: Record<string, any>
  id: string
  team?: Record<string, any>
  type?: string
}

export interface Board {
  description?: string
  id?: string
  layout_generation?: string
  links?: Record<string, any>
  name: string
  panels?: any[]
  preset_filters?: any[]
  tags?: any[]
  type: string
}

export interface BoardLoadMatch {
  id: string
}

export interface BoardListMatch {
  description?: string
  id?: string
  layout_generation?: string
  links?: Record<string, any>
  name?: string
  panels?: any[]
  preset_filters?: any[]
  tags?: any[]
  type?: string
}

export interface BoardCreateData {
  description?: string
  id?: string
  layout_generation?: string
  links?: Record<string, any>
  name: string
  panels?: any[]
  preset_filters?: any[]
  tags?: any[]
  type: string
}

export interface BoardUpdateData {
  id: string
  description?: string
  layout_generation?: string
  links?: Record<string, any>
  name?: string
  panels?: any[]
  preset_filters?: any[]
  tags?: any[]
  type?: string
}

export interface BoardRemoveMatch {
  id: string
  view_id?: string
}

export interface BoardView {
  filters?: any[]
  id?: string
  name?: string
}

export interface BoardViewLoadMatch {
  board_id: string
  id: string
}

export interface BoardViewListMatch {
  id: string
}

export interface BoardViewCreateData {
  id: string
  filters?: any[]
  name?: string
}

export interface BoardViewUpdateData {
  board_id: string
  id: string
  filters?: any[]
  name?: string
}

export interface BulkSignalRecipientAssignment {
  failed: any[]
  recipients: any[]
  selector: Record<string, any>
  succeeded: any[]
  unchanged: any[]
}

export interface BulkSignalRecipientAssignmentCreateData {
  failed: any[]
  recipients: any[]
  selector: Record<string, any>
  succeeded: any[]
  unchanged: any[]
}

export interface BurnAlert {
  alert_type: string
  id?: string
}

export interface BurnAlertLoadMatch {
  id: string
  slo_id: string
}

export interface BurnAlertCreateData {
  id: string
  alert_type: string
}

export interface BurnAlertUpdateData {
  burn_alert_id: string
  dataset_slug: string
  alert_type?: string
  id?: string
}

export interface BurnAlertRemoveMatch {
  burn_alert_id: string
  dataset_slug: string
}

export interface CalculatedField {
  alias: string
  created_at: string
  description?: string
  expression: string
  id: string
  updated_at: string
}

export interface CalculatedFieldLoadMatch {
  dataset_slug: string
  derived_column_id?: string
  alia?: string
}

export interface CalculatedFieldCreateData {
  dataset_slug: string
  alias: string
  created_at: string
  description?: string
  expression: string
  id: string
  updated_at: string
}

export interface CalculatedFieldUpdateData {
  dataset_slug: string
  derived_column_id: string
  alias?: string
  created_at?: string
  description?: string
  expression?: string
  id?: string
  updated_at?: string
}

export interface CalculatedFieldRemoveMatch {
  dataset_slug: string
  derived_column_id: string
}

export interface Column {
  created_at?: string
  description?: string
  hidden?: boolean
  id?: string
  key_name: string
  last_written?: string
  type?: string
  updated_at?: string
}

export interface ColumnLoadMatch {
  id: string
  key_name?: string
}

export interface ColumnCreateData {
  id: string
  created_at?: string
  description?: string
  hidden?: boolean
  key_name: string
  last_written?: string
  type?: string
  updated_at?: string
}

export interface ColumnUpdateData {
  column_id: string
  dataset_slug: string
  created_at?: string
  description?: string
  hidden?: boolean
  id?: string
  key_name?: string
  last_written?: string
  type?: string
  updated_at?: string
}

export interface ColumnRemoveMatch {
  column_id: string
  dataset_slug: string
}

export interface Dataset {
  created_at?: string
  dataset_type?: string
  description?: string
  expand_json_depth?: number
  id?: string
  last_written_at?: null | string
  name: string
  regular_columns_count?: null | number
  settings?: Record<string, any>
  slug?: string
}

export interface DatasetLoadMatch {
  id: string
}

export interface DatasetListMatch {
  created_at?: string
  dataset_type?: string
  description?: string
  expand_json_depth?: number
  id?: string
  last_written_at?: null | string
  name?: string
  regular_columns_count?: null | number
  settings?: Record<string, any>
  slug?: string
}

export interface DatasetCreateData {
  created_at?: string
  dataset_type?: string
  description?: string
  expand_json_depth?: number
  id?: string
  last_written_at?: null | string
  name: string
  regular_columns_count?: null | number
  settings?: Record<string, any>
  slug?: string
}

export interface DatasetUpdateData {
  id: string
  created_at?: string
  dataset_type?: string
  description?: string
  expand_json_depth?: number
  last_written_at?: null | string
  name?: string
  regular_columns_count?: null | number
  settings?: Record<string, any>
  slug?: string
}

export interface DatasetRemoveMatch {
  id: string
}

export interface DatasetDefinition {
  annotation_type?: any
  duration_ms?: any
  error?: any
  id?: string
  link_span_id?: string
  link_trace_id?: string
  log_message?: any
  log_severity?: any
  name?: string
  parent_id?: string
  route?: any
  service_name?: any
  span_id?: string
  span_kind?: any
  status?: any
  trace_id?: string
  user?: any
}

export interface DatasetDefinitionLoadMatch {
  id: string
}

export interface DatasetDefinitionUpdateData {
  id: string
  annotation_type?: any
  duration_ms?: any
  error?: any
  link_span_id?: string
  link_trace_id?: string
  log_message?: any
  log_severity?: any
  name?: string
  parent_id?: string
  route?: any
  service_name?: any
  span_id?: string
  span_kind?: any
  status?: any
  trace_id?: string
  user?: any
}

export interface Environment {
  data: Record<string, any>
  id?: string
}

export interface EnvironmentLoadMatch {
  id?: string
  team_slug: string
  page_after?: string
  page_size?: number
}

export interface EnvironmentCreateData {
  team_slug: string
  data: Record<string, any>
  id?: string
}

export interface EnvironmentUpdateData {
  id: string
  team_slug: string
  data?: Record<string, any>
}

export interface EnvironmentRemoveMatch {
  id: string
  team_slug: string
}

export interface Event {
  batch_events?: any[]
  id?: string
  status?: number
}

export interface EventCreateData {
  dataset_slug: string
  batch_events?: any[]
  id?: string
  status?: number
}

export interface HistoricalAnomaly {
  ended_at: number
  id: string
  measurement: number
  normal_range: any
  started_at: number
}

export interface HistoricalAnomalyListMatch {
  signal_id: string
  end_time: number
  page_after?: string
  page_size?: number
  start_time: number
}

export interface KeyManagement {
  data: Record<string, any>
  id?: string
}

export interface KeyManagementLoadMatch {
  id?: string
  team_slug: string
  filter_type?: string
  page_after?: string
  page_size?: number
}

export interface KeyManagementCreateData {
  team_slug: string
  data: Record<string, any>
  id?: string
}

export interface KeyManagementUpdateData {
  id: string
  team_slug: string
  data?: Record<string, any>
}

export interface KeyManagementRemoveMatch {
  id: string
  team_slug: string
}

export interface Kinesi {
  errorMessage?: string
  records?: any[]
  requestId?: string
  timestamp?: number
}

export interface KinesiCreateData {
  dataset_slug: string
  errorMessage?: string
  records?: any[]
  requestId?: string
  timestamp?: number
}

export interface MapDependency {
  dependencies?: any
  end_time?: number
  filters?: any[]
  links: Record<string, any>
  request_id?: string
  start_time?: number
  status?: string
  time_range?: number
}

export interface MapDependencyLoadMatch {
  request_id: string
  page_after?: string
  page_size?: number
}

export interface MapDependencyCreateData {
  limit?: number
  dependencies?: any
  end_time?: number
  filters?: any[]
  links: Record<string, any>
  request_id?: string
  start_time?: number
  status?: string
  time_range?: number
}

export interface Marker {
  color?: string
  created_at?: string
  end_time?: number
  id?: string
  message?: string
  start_time?: number
  type?: string
  updated_at?: string
  url?: string
}

export interface MarkerLoadMatch {
  id: string
}

export interface MarkerCreateData {
  id: string
  color?: string
  created_at?: string
  end_time?: number
  message?: string
  start_time?: number
  type?: string
  updated_at?: string
  url?: string
}

export interface MarkerUpdateData {
  dataset_slug: string
  marker_id: string
  color?: string
  created_at?: string
  end_time?: number
  id?: string
  message?: string
  start_time?: number
  type?: string
  updated_at?: string
  url?: string
}

export interface MarkerRemoveMatch {
  dataset_slug: string
  marker_id: string
}

export interface MarkerSetting {
  color: string
  created_at?: string
  id?: string
  type: string
  updated_at?: null | string
}

export interface MarkerSettingLoadMatch {
  id: string
}

export interface MarkerSettingCreateData {
  id: string
  color: string
  created_at?: string
  type: string
  updated_at?: null | string
}

export interface MarkerSettingUpdateData {
  dataset_slug: string
  marker_setting_id: string
  color?: string
  created_at?: string
  id?: string
  type?: string
  updated_at?: null | string
}

export interface MarkerSettingRemoveMatch {
  dataset_slug: string
  marker_setting_id: string
}

export interface Query {
  breakdowns?: any[]
  calculated_fields?: any[]
  calculations?: any[]
  compare_time_offset_seconds?: number
  end_time?: number
  filter_combination?: string
  filters?: any[]
  formulas?: any[]
  granularity?: number
  havings?: any[]
  id?: string
  limit?: number
  orders?: any[]
  start_time?: number
  time_range?: number
  usage_mode?: boolean
}

export interface QueryLoadMatch {
  dataset_slug: string
  query_id: string
}

export interface QueryCreateData {
  id: string
  breakdowns?: any[]
  calculated_fields?: any[]
  calculations?: any[]
  compare_time_offset_seconds?: number
  end_time?: number
  filter_combination?: string
  filters?: any[]
  formulas?: any[]
  granularity?: number
  havings?: any[]
  limit?: number
  orders?: any[]
  start_time?: number
  time_range?: number
  usage_mode?: boolean
}

export interface QueryAnnotation {
  created_at?: string
  description?: string
  id?: string
  name: string
  query_id: string
  source?: string
  updated_at?: string
}

export interface QueryAnnotationLoadMatch {
  id: string
  include_board_annotation?: boolean
}

export interface QueryAnnotationCreateData {
  id: string
  created_at?: string
  description?: string
  name: string
  query_id: string
  source?: string
  updated_at?: string
}

export interface QueryAnnotationUpdateData {
  dataset_slug: string
  query_annotation_id: string
  created_at?: string
  description?: string
  id?: string
  name?: string
  query_id?: string
  source?: string
  updated_at?: string
}

export interface QueryAnnotationRemoveMatch {
  dataset_slug: string
  query_annotation_id: string
}

export interface QueryResult {
  complete?: boolean
  data?: Record<string, any>
  disable_other_by_aggregate?: boolean
  disable_series?: boolean
  disable_total_by_aggregate?: boolean
  error?: string
  id?: string
  limit?: number
  links?: Record<string, any>
  query?: any
  query_id: string
}

export interface QueryResultLoadMatch {
  dataset_slug: string
  query_result_id: string
}

export interface QueryResultCreateData {
  id: string
  complete?: boolean
  data?: Record<string, any>
  disable_other_by_aggregate?: boolean
  disable_series?: boolean
  disable_total_by_aggregate?: boolean
  error?: string
  limit?: number
  links?: Record<string, any>
  query?: any
  query_id: string
}

export interface Recipient {
  id?: string
  type: string
}

export interface RecipientLoadMatch {
  id: string
}

export interface RecipientListMatch {
  id?: string
  type?: string
}

export interface RecipientCreateData {
  id?: string
  type: string
}

export interface RecipientUpdateData {
  id: string
  type?: string
}

export interface RecipientRemoveMatch {
  id: string
}

export interface Signal {
  auto_investigate: boolean
  created_at: string
  currently_anomalous: boolean
  dataset_slug: string
  enabled: boolean
  environment_slug: string
  id: string
  last_anomaly_ended_at: number | null
  last_anomaly_started_at: number | null
  measured_signal: string
  recipients: any[]
  sensitivity: any
  service_name: string
  status: string
  updated_at: string
}

export interface SignalLoadMatch {
  id: string
}

export interface SignalListMatch {
  currently_anomalous?: boolean
  dataset_slug?: string
  measured_signal?: string
  page_after?: string
  page_size?: number
  service_name?: string
  status?: string
}

export interface SignalUpdateData {
  id: string
  auto_investigate?: boolean
  created_at?: string
  currently_anomalous?: boolean
  dataset_slug?: string
  enabled?: boolean
  environment_slug?: string
  last_anomaly_ended_at?: number | null
  last_anomaly_started_at?: number | null
  measured_signal?: string
  recipients?: any[]
  sensitivity?: any
  service_name?: string
  status?: string
  updated_at?: string
}

export interface Slo {
  created_at?: string
  dataset_slugs?: any[]
  description?: string
  id?: string
  name?: string
  reset_at?: string
  sli?: Record<string, any>
  tags?: any[]
  target_per_million?: number
  time_period_days?: number
  updated_at?: string
}

export interface SloLoadMatch {
  id: string
}

export interface SloCreateData {
  id: string
  created_at?: string
  dataset_slugs?: any[]
  description?: string
  name?: string
  reset_at?: string
  sli?: Record<string, any>
  tags?: any[]
  target_per_million?: number
  time_period_days?: number
  updated_at?: string
}

export interface SloUpdateData {
  dataset_slug: string
  slo_id: string
  created_at?: string
  dataset_slugs?: any[]
  description?: string
  id?: string
  name?: string
  reset_at?: string
  sli?: Record<string, any>
  tags?: any[]
  target_per_million?: number
  time_period_days?: number
  updated_at?: string
}

export interface SloRemoveMatch {
  dataset_slug: string
  slo_id: string
}

export interface SloCount {
  error_count?: number
  is_partial?: boolean
  total_count?: number
  window_end?: number
  window_start?: number
}

export interface SloCountListMatch {
  dataset_slug: string
  slo_id: string
  end_time: number
  start_time: number
}

export interface SloHistory {
  end_time: number
  ids: any[]
  start_time: number
}

export interface SloHistoryCreateData {
  end_time: number
  ids: any[]
  start_time: number
}

export interface SloHourlyCount {
  end_time?: number
  error_count?: number
  is_partial?: boolean
  start_time?: number
  total_count?: number
}

export interface SloHourlyCountListMatch {
  dataset_slug: string
  slo_id: string
  end_time: number
  start_time: number
}

export interface Trigger {
  alert_type?: string
  auto_investigate?: boolean
  baseline_details?: Record<string, any>
  created_at?: string
  dataset_slug?: string
  description?: string
  disabled?: boolean
  evaluation_schedule: Record<string, any>
  evaluation_schedule_type?: string
  frequency?: number
  id?: string
  name?: string
  query?: Record<string, any>
  query_id?: string
  recipients?: any[]
  tags?: any[]
  threshold: Record<string, any>
  triggered?: boolean
  updated_at?: string
}

export interface TriggerLoadMatch {
  id: string
}

export interface TriggerListMatch {
  recipient_id: string
}

export interface TriggerCreateData {
  id: string
  alert_type?: string
  auto_investigate?: boolean
  baseline_details?: Record<string, any>
  created_at?: string
  dataset_slug?: string
  description?: string
  disabled?: boolean
  evaluation_schedule: Record<string, any>
  evaluation_schedule_type?: string
  frequency?: number
  name?: string
  query?: Record<string, any>
  query_id?: string
  recipients?: any[]
  tags?: any[]
  threshold: Record<string, any>
  triggered?: boolean
  updated_at?: string
}

export interface TriggerUpdateData {
  dataset_slug: string
  trigger_id: string
  alert_type?: string
  auto_investigate?: boolean
  baseline_details?: Record<string, any>
  created_at?: string
  description?: string
  disabled?: boolean
  evaluation_schedule?: Record<string, any>
  evaluation_schedule_type?: string
  frequency?: number
  id?: string
  name?: string
  query?: Record<string, any>
  query_id?: string
  recipients?: any[]
  tags?: any[]
  threshold?: Record<string, any>
  triggered?: boolean
  updated_at?: string
}

export interface TriggerRemoveMatch {
  dataset_slug: string
  trigger_id: string
}


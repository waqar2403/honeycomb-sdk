package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAuthEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewBoardEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewBoardViewEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewBulkSignalRecipientAssignmentEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewBurnAlertEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewCalculatedFieldEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewColumnEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewDatasetEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewDatasetDefinitionEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewEnvironmentEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewEventEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewHistoricalAnomalyEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewKeyManagementEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewKinesiEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewMapDependencyEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewMarkerEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewMarkerSettingEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewQueryEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewQueryAnnotationEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewQueryResultEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewRecipientEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewSignalEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewSloEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewSloCountEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewSloHistoryEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewSloHourlyCountEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity

var NewTriggerEntityFunc func(client *HoneycombSDK, entopts map[string]any) HoneycombEntity


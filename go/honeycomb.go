package waqar2403honeycombsdk

import (
	"github.com/waqar2403/honeycomb-sdk/go/core"
	"github.com/waqar2403/honeycomb-sdk/go/entity"
	"github.com/waqar2403/honeycomb-sdk/go/feature"
	_ "github.com/waqar2403/honeycomb-sdk/go/utility"
)

// Type aliases preserve external API.
type HoneycombSDK = core.HoneycombSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type HoneycombEntity = core.HoneycombEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type HoneycombError = core.HoneycombError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAuthEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewAuthEntity(client, entopts)
	}
	core.NewBoardEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewBoardEntity(client, entopts)
	}
	core.NewBoardViewEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewBoardViewEntity(client, entopts)
	}
	core.NewBulkSignalRecipientAssignmentEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewBulkSignalRecipientAssignmentEntity(client, entopts)
	}
	core.NewBurnAlertEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewBurnAlertEntity(client, entopts)
	}
	core.NewCalculatedFieldEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewCalculatedFieldEntity(client, entopts)
	}
	core.NewColumnEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewColumnEntity(client, entopts)
	}
	core.NewDatasetEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewDatasetEntity(client, entopts)
	}
	core.NewDatasetDefinitionEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewDatasetDefinitionEntity(client, entopts)
	}
	core.NewEnvironmentEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewEnvironmentEntity(client, entopts)
	}
	core.NewEventEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewEventEntity(client, entopts)
	}
	core.NewHistoricalAnomalyEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewHistoricalAnomalyEntity(client, entopts)
	}
	core.NewKeyManagementEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewKeyManagementEntity(client, entopts)
	}
	core.NewKinesisEventEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewKinesisEventEntity(client, entopts)
	}
	core.NewManagementAuthEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewManagementAuthEntity(client, entopts)
	}
	core.NewMapDependencyEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewMapDependencyEntity(client, entopts)
	}
	core.NewMarkerEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewMarkerEntity(client, entopts)
	}
	core.NewMarkerSettingEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewMarkerSettingEntity(client, entopts)
	}
	core.NewQueryEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewQueryEntity(client, entopts)
	}
	core.NewQueryAnnotationEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewQueryAnnotationEntity(client, entopts)
	}
	core.NewQueryResultEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewQueryResultEntity(client, entopts)
	}
	core.NewRecipientEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewRecipientEntity(client, entopts)
	}
	core.NewSignalEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewSignalEntity(client, entopts)
	}
	core.NewSloEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewSloEntity(client, entopts)
	}
	core.NewSloCountEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewSloCountEntity(client, entopts)
	}
	core.NewSloHistoryEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewSloHistoryEntity(client, entopts)
	}
	core.NewSloHourlyCountEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewSloHourlyCountEntity(client, entopts)
	}
	core.NewTriggerEntityFunc = func(client *core.HoneycombSDK, entopts map[string]any) core.HoneycombEntity {
		return entity.NewTriggerEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewHoneycombSDK = core.NewHoneycombSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewHoneycombSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *HoneycombSDK  { return NewHoneycombSDK(nil) }
func Test() *HoneycombSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature

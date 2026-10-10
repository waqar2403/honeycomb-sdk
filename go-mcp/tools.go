package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/waqar2403/honeycomb-sdk/go"
)

// ListArgs is what an agent sends to honeycomb_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: board | board_view | burn_alert | calculated_field | column | dataset | historical_anomaly | marker | marker_setting | query_annotation | recipient | signal | slo | slo_count | slo_hourly_count | trigger"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to honeycomb_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: auth | board | board_view | burn_alert | calculated_field | column | dataset | dataset_definition | environment | key_management | management_auth | map_dependency | query | query_annotation | query_result | recipient | signal | slo | trigger"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.HoneycombSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "honeycomb_list",
		Description: "List records from Honeycomb. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("board", "board_view", "burn_alert", "calculated_field", "column", "dataset", "historical_anomaly", "marker", "marker_setting", "query_annotation", "recipient", "signal", "slo", "slo_count", "slo_hourly_count", "trigger"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "honeycomb_load",
		Description: "Load one record from Honeycomb. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("auth", "board", "board_view", "burn_alert", "calculated_field", "column", "dataset", "dataset_definition", "environment", "key_management", "management_auth", "map_dependency", "query", "query_annotation", "query_result", "recipient", "signal", "slo", "trigger"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.HoneycombSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.HoneycombSDK, name string) (sdk.HoneycombEntity, error) {
	switch strings.ToLower(name) {
	case "auth":
		return client.Auth(nil), nil
	case "board":
		return client.Board(nil), nil
	case "board_view":
		return client.BoardView(nil), nil
	case "bulk_signal_recipient_assignment":
		return client.BulkSignalRecipientAssignment(nil), nil
	case "burn_alert":
		return client.BurnAlert(nil), nil
	case "calculated_field":
		return client.CalculatedField(nil), nil
	case "column":
		return client.Column(nil), nil
	case "dataset":
		return client.Dataset(nil), nil
	case "dataset_definition":
		return client.DatasetDefinition(nil), nil
	case "environment":
		return client.Environment(nil), nil
	case "event":
		return client.Event(nil), nil
	case "historical_anomaly":
		return client.HistoricalAnomaly(nil), nil
	case "key_management":
		return client.KeyManagement(nil), nil
	case "kinesis_event":
		return client.KinesisEvent(nil), nil
	case "management_auth":
		return client.ManagementAuth(nil), nil
	case "map_dependency":
		return client.MapDependency(nil), nil
	case "marker":
		return client.Marker(nil), nil
	case "marker_setting":
		return client.MarkerSetting(nil), nil
	case "query":
		return client.Query(nil), nil
	case "query_annotation":
		return client.QueryAnnotation(nil), nil
	case "query_result":
		return client.QueryResult(nil), nil
	case "recipient":
		return client.Recipient(nil), nil
	case "signal":
		return client.Signal(nil), nil
	case "slo":
		return client.Slo(nil), nil
	case "slo_count":
		return client.SloCount(nil), nil
	case "slo_history":
		return client.SloHistory(nil), nil
	case "slo_hourly_count":
		return client.SloHourlyCount(nil), nil
	case "trigger":
		return client.Trigger(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}

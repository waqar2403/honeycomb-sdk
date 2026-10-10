package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Honeycomb",
			"slug": "honeycomb",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.honeycomb.io",
			"auth": map[string]any{
				"prefix": "",
				"name": "X-Honeycomb-Team",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"api_key": map[string]any{},
				"auth": map[string]any{},
				"board": map[string]any{},
				"board_view": map[string]any{},
				"bulk_signal_recipient_assignment": map[string]any{},
				"burn_alert": map[string]any{},
				"calculated_field": map[string]any{},
				"column": map[string]any{},
				"dataset": map[string]any{},
				"dataset_definition": map[string]any{},
				"environment": map[string]any{},
				"event": map[string]any{},
				"historical_anomaly": map[string]any{},
				"kinesis_event": map[string]any{},
				"management_auth": map[string]any{},
				"map_dependency": map[string]any{},
				"marker": map[string]any{},
				"marker_setting": map[string]any{},
				"query": map[string]any{},
				"query_annotation": map[string]any{},
				"query_result": map[string]any{},
				"recipient": map[string]any{},
				"signal": map[string]any{},
				"slo": map[string]any{},
				"slo_count": map[string]any{},
				"slo_history": map[string]any{},
				"slo_hourly_count": map[string]any{},
				"trigger": map[string]any{},
			},
		},
		"entity": map[string]any{
			"api_key": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "api_key",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/2/teams/{teamSlug}/api-keys",
								"segments": []any{
									map[string]any{
										"lit": "2",
									},
									map[string]any{
										"lit": "teams",
									},
									map[string]any{
										"var": "team_slug",
									},
									map[string]any{
										"lit": "api-keys",
									},
								},
								"parts": []any{
									"2",
									"teams",
									"{team_slug}",
									"api-keys",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"teamSlug": "team_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "team_slug",
											"orig": "teamSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"team_slug",
									},
								},
								"body": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/2/teams/{teamSlug}/api-keys",
								"segments": []any{
									map[string]any{
										"lit": "2",
									},
									map[string]any{
										"lit": "teams",
									},
									map[string]any{
										"var": "team_slug",
									},
									map[string]any{
										"lit": "api-keys",
									},
								},
								"parts": []any{
									"2",
									"teams",
									"{team_slug}",
									"api-keys",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"teamSlug": "team_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "team_slug",
											"orig": "teamSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "filter_type",
											"orig": "filter[type]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_after",
											"orig": "page[after]",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eyxJjcmAVhdGVkX",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page[size]",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 10,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"team_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/2/teams/{teamSlug}/api-keys/{ID}",
								"segments": []any{
									map[string]any{
										"lit": "2",
									},
									map[string]any{
										"lit": "teams",
									},
									map[string]any{
										"var": "team_slug",
									},
									map[string]any{
										"lit": "api-keys",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"2",
									"teams",
									"{team_slug}",
									"api-keys",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ID": "id",
										"teamSlug": "team_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ID",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "team_slug",
											"orig": "teamSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"team_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/2/teams/{teamSlug}/api-keys/{ID}",
								"segments": []any{
									map[string]any{
										"lit": "2",
									},
									map[string]any{
										"lit": "teams",
									},
									map[string]any{
										"var": "team_slug",
									},
									map[string]any{
										"lit": "api-keys",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"2",
									"teams",
									"{team_slug}",
									"api-keys",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ID": "id",
										"teamSlug": "team_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ID",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "team_slug",
											"orig": "teamSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"team_slug",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/2/teams/{teamSlug}/api-keys/{ID}",
								"segments": []any{
									map[string]any{
										"lit": "2",
									},
									map[string]any{
										"lit": "teams",
									},
									map[string]any{
										"var": "team_slug",
									},
									map[string]any{
										"lit": "api-keys",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"2",
									"teams",
									"{team_slug}",
									"api-keys",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ID": "id",
										"teamSlug": "team_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ID",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "team_slug",
											"orig": "teamSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"team_slug",
									},
								},
								"body": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"auth": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "api_key_access",
						"title": "Api Key Access",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "environment",
						"title": "Environment",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique identifier (ID) of the API Key.",
					},
					map[string]any{
						"name": "team",
						"title": "Team",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"short": "The type of API Key.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "auth",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/auth",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "auth",
									},
								},
								"parts": []any{
									"1",
									"auth",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"board": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "A description of the Board.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier (ID), returned in response bodies.",
						"readOnly": true,
					},
					map[string]any{
						"name": "layout_generation",
						"title": "Layout Generation",
						"type": "`$STRING`",
						"short": "The layout generation mode for the board.",
						"writeOnly": true,
					},
					map[string]any{
						"name": "links",
						"title": "Links",
						"type": "`$OBJECT`",
						"readOnly": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The name of the Board.",
					},
					map[string]any{
						"name": "panels",
						"title": "Panels",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "preset_filters",
						"title": "Preset Filters",
						"type": "`$ARRAY`",
						"short": "A list of preset filters to apply to the board.",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
						"short": "A list of key-value pairs to help identify the Trigger.",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"short": "The type of the board.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "board",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/boards",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "boards",
									},
								},
								"parts": []any{
									"1",
									"boards",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/boards",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "boards",
									},
								},
								"parts": []any{
									"1",
									"boards",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/boards/{boardId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "boards",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"boards",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boardId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "boardId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/1/boards/{boardId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "boards",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"boards",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boardId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "boardId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/1/boards/{boardId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "boards",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"boards",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boardId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "boardId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"board_view": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "filters",
						"title": "Filters",
						"type": "`$ARRAY`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$ARRAY`",
							},
							"update": map[string]any{
								"req": true,
								"type": "`$ARRAY`",
							},
						},
						"short": "The filters to apply to this view.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the board view.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The name of the view.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "board_view",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/boards/{boardId}/views",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "boards",
									},
									map[string]any{
										"var": "board_id",
									},
									map[string]any{
										"lit": "views",
									},
								},
								"parts": []any{
									"1",
									"boards",
									"{board_id}",
									"views",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boardId": "board_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "board_id",
											"orig": "boardId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"board_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/boards/{boardId}/views",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "boards",
									},
									map[string]any{
										"var": "board_id",
									},
									map[string]any{
										"lit": "views",
									},
								},
								"parts": []any{
									"1",
									"boards",
									"{board_id}",
									"views",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boardId": "board_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "board_id",
											"orig": "boardId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"board_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/boards/{boardId}/views/{viewId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "boards",
									},
									map[string]any{
										"var": "board_id",
									},
									map[string]any{
										"lit": "views",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"boards",
									"{board_id}",
									"views",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boardId": "board_id",
										"viewId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "board_id",
											"orig": "boardId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "viewId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"board_id",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/1/boards/{boardId}/views/{viewId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "boards",
									},
									map[string]any{
										"var": "board_id",
									},
									map[string]any{
										"lit": "views",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"boards",
									"{board_id}",
									"views",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boardId": "board_id",
										"viewId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "board_id",
											"orig": "boardId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "viewId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"board_id",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/1/boards/{boardId}/views/{viewId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "boards",
									},
									map[string]any{
										"var": "board_id",
									},
									map[string]any{
										"lit": "views",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"boards",
									"{board_id}",
									"views",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boardId": "board_id",
										"viewId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "board_id",
											"orig": "boardId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "viewId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"board_id",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.board",
						},
					},
				},
			},
			"bulk_signal_recipient_assignment": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "failed",
						"title": "Failed",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The Signals that were not updated, each with the reason.",
					},
					map[string]any{
						"name": "recipients",
						"title": "Recipients",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The Recipients to assign to every selected Signal.",
					},
					map[string]any{
						"name": "selector",
						"title": "Selector",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Chooses which Signals to act on.",
					},
					map[string]any{
						"name": "succeeded",
						"title": "Succeeded",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The Signals whose Recipient set was updated.",
					},
					map[string]any{
						"name": "unchanged",
						"title": "Unchanged",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The Signals that already had every requested Recipient.",
					},
				},
				"name": "bulk_signal_recipient_assignment",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/signals/recipient_assignments",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "signals",
									},
									map[string]any{
										"lit": "recipient_assignments",
									},
								},
								"parts": []any{
									"1",
									"signals",
									"recipient_assignments",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"burn_alert": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "alert_type",
						"title": "Alert Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
					"parts": []any{
						"dataset_slug",
						"id",
					},
					"sep": "/",
				},
				"name": "burn_alert",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/burn_alerts/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "burn_alerts",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"burn_alerts",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/burn_alerts/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "burn_alerts",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"burn_alerts",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "slo_id",
											"orig": "slo_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"slo_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/burn_alerts/{datasetSlug}/{burnAlertId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "burn_alerts",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"burn_alerts",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"burnAlertId": "id",
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "burnAlertId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/1/burn_alerts/{datasetSlug}/{burnAlertId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "burn_alerts",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"burn_alerts",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"burnAlertId": "id",
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "burnAlertId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/1/burn_alerts/{datasetSlug}/{burnAlertId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "burn_alerts",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"burn_alerts",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"burnAlertId": "id",
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "burnAlertId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"calculated_field": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "alias",
						"title": "Alias",
						"type": "`$STRING`",
						"req": true,
						"short": "The human-readable name of the Calculated Field (also called Derived Column), as it will be referenced when building queries.",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"short": "ISO8601 formatted time when the field was created.",
						"readOnly": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "A human-readable description for the Calculated Field that displays in the UI.",
					},
					map[string]any{
						"name": "expression",
						"title": "Expression",
						"type": "`$STRING`",
						"req": true,
						"short": "The expression to evaluate to construct this Calculated Field's value.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique identifier (ID), returned in response bodies.",
						"readOnly": true,
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"req": true,
						"short": "ISO8601 formatted time when the field was updated.",
						"readOnly": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"id": "id",
					},
					"name": "id",
					"parts": []any{
						"dataset_slug",
						"id",
					},
					"sep": "/",
				},
				"name": "calculated_field",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/derived_columns/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "derived_columns",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"derived_columns",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/derived_columns/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "derived_columns",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"derived_columns",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "alia",
											"orig": "alias",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/derived_columns/{datasetSlug}/{derivedColumnId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "derived_columns",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"derived_columns",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"derivedColumnId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "derivedColumnId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/1/derived_columns/{datasetSlug}/{derivedColumnId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "derived_columns",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"derived_columns",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"derivedColumnId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "derivedColumnId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/1/derived_columns/{datasetSlug}/{derivedColumnId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "derived_columns",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"derived_columns",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"derivedColumnId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "derivedColumnId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"column": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "ISO8601 formatted time the column was created.",
						"readOnly": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Column description.",
					},
					map[string]any{
						"name": "hidden",
						"title": "Hidden",
						"type": "`$BOOLEAN`",
						"short": "If `true`, the column is excluded from autocomplete and raw data field lists.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier (ID), returned in response bodies.",
						"readOnly": true,
					},
					map[string]any{
						"name": "key_name",
						"title": "Key Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Name of the Column.",
						"readOnly": true,
					},
					map[string]any{
						"name": "last_written",
						"title": "Last Written",
						"type": "`$STRING`",
						"short": "ISO8601 formatted time the column was last written to (received event data).",
						"readOnly": true,
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Type of data that the Column will contain.",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "ISO8601 formatted time the column was updated.",
						"readOnly": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"id": "id",
					},
					"name": "id",
					"parts": []any{
						"dataset_slug",
						"id",
					},
					"sep": "/",
				},
				"name": "column",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/columns/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "columns",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"columns",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/columns/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "columns",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"columns",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "key_name",
											"orig": "key_name",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/columns/{datasetSlug}/{columnId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "columns",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"columns",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"columnId": "id",
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "columnId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/1/columns/{datasetSlug}/{columnId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "columns",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"columns",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"columnId": "id",
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "columnId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/1/columns/{datasetSlug}/{columnId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "columns",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"columns",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"columnId": "id",
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "columnId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"dataset": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "The ISO8601-formatted time when the dataset was created.",
						"readOnly": true,
					},
					map[string]any{
						"name": "dataset_type",
						"title": "Dataset Type",
						"type": "`$STRING`",
						"short": "The type of data contained in the dataset.",
						"readOnly": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"op": map[string]any{
							"update": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "A description for the dataset.",
					},
					map[string]any{
						"name": "expand_json_depth",
						"title": "Expand Json Depth",
						"type": "`$INTEGER`",
						"op": map[string]any{
							"update": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
						},
						"short": "The maximum unpacking depth of nested JSON fields.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_written_at",
						"title": "Last Written At",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NULL`",
								"`$STRING`",
							},
						},
						"short": "The ISO8601-formatted time when the dataset last received event data.",
						"readOnly": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The name of the dataset.",
					},
					map[string]any{
						"name": "regular_columns_count",
						"title": "Regular Columns Count",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NULL`",
								"`$INTEGER`",
							},
						},
						"short": "The total number of unique fields for this Dataset.",
						"readOnly": true,
					},
					map[string]any{
						"name": "settings",
						"title": "Settings",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"short": "The 'slug' of the dataset to be used in URLs.",
						"readOnly": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "dataset",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/datasets",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "datasets",
									},
								},
								"parts": []any{
									"1",
									"datasets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/datasets",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "datasets",
									},
								},
								"parts": []any{
									"1",
									"datasets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/datasets/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"datasets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/1/datasets/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"datasets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/1/datasets/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"datasets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"dataset_definition": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "annotation_type",
						"title": "Annotation Type",
						"type": "`$ANY`",
						"short": "Metadata: Annotation Type - The type of span annotation.",
					},
					map[string]any{
						"name": "duration_ms",
						"title": "Duration Ms",
						"type": "`$ANY`",
						"short": "Span Duration - How much time the span took, in milliseconds.",
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": "`$ANY`",
						"short": "Use a Boolean or String to indicate error.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "link_span_id",
						"title": "Link Span Id",
						"type": "`$STRING`",
						"short": "Metadata: Link Span ID - Links let you tie traces and spans to one another.",
					},
					map[string]any{
						"name": "link_trace_id",
						"title": "Link Trace Id",
						"type": "`$STRING`",
						"short": "Metadata: Link Trace ID - Links let you tie traces and spans to one another.",
					},
					map[string]any{
						"name": "log_message",
						"title": "Log Message",
						"type": "`$ANY`",
						"short": "A value containing the log event message.",
					},
					map[string]any{
						"name": "log_severity",
						"title": "Log Severity",
						"type": "`$ANY`",
						"short": "Severity level of the event (also known as log level).",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the function or method where the span was created.",
					},
					map[string]any{
						"name": "parent_id",
						"title": "Parent Id",
						"type": "`$STRING`",
						"short": "The Parent Span ID - The ID of this span's parent span, the call location the current span was called from.",
					},
					map[string]any{
						"name": "route",
						"title": "Route",
						"type": "`$ANY`",
						"short": "The HTTP URL or equivalent route processed by the request.",
					},
					map[string]any{
						"name": "service_name",
						"title": "Service Name",
						"type": "`$ANY`",
						"short": "The name of the instrumented service.",
					},
					map[string]any{
						"name": "span_id",
						"title": "Span Id",
						"type": "`$STRING`",
						"short": "The unique identifier (ID) for each span.",
					},
					map[string]any{
						"name": "span_kind",
						"title": "Span Kind",
						"type": "`$ANY`",
						"short": "Metadata: Kind - The kind of Span.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$ANY`",
						"short": "Indicates the success, failure, or other status of a request.",
					},
					map[string]any{
						"name": "trace_id",
						"title": "Trace Id",
						"type": "`$STRING`",
						"short": "The ID of the trace this span belongs to.",
					},
					map[string]any{
						"name": "user",
						"title": "User",
						"type": "`$ANY`",
						"short": "The user making the request in the system.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "dataset_definition",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/dataset_definitions/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "dataset_definitions",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"dataset_definitions",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/1/dataset_definitions/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "dataset_definitions",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"dataset_definitions",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"environment": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "environment",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/2/teams/{teamSlug}/environments",
								"segments": []any{
									map[string]any{
										"lit": "2",
									},
									map[string]any{
										"lit": "teams",
									},
									map[string]any{
										"var": "team_slug",
									},
									map[string]any{
										"lit": "environments",
									},
								},
								"parts": []any{
									"2",
									"teams",
									"{team_slug}",
									"environments",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"teamSlug": "team_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "team_slug",
											"orig": "teamSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"team_slug",
									},
								},
								"body": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/2/teams/{teamSlug}/environments",
								"segments": []any{
									map[string]any{
										"lit": "2",
									},
									map[string]any{
										"lit": "teams",
									},
									map[string]any{
										"var": "team_slug",
									},
									map[string]any{
										"lit": "environments",
									},
								},
								"parts": []any{
									"2",
									"teams",
									"{team_slug}",
									"environments",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"teamSlug": "team_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "team_slug",
											"orig": "teamSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page_after",
											"orig": "page[after]",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eyxJjcmAVhdGVkX",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page[size]",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 10,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"team_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/2/teams/{teamSlug}/environments/{ID}",
								"segments": []any{
									map[string]any{
										"lit": "2",
									},
									map[string]any{
										"lit": "teams",
									},
									map[string]any{
										"var": "team_slug",
									},
									map[string]any{
										"lit": "environments",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"2",
									"teams",
									"{team_slug}",
									"environments",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ID": "id",
										"teamSlug": "team_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ID",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "team_slug",
											"orig": "teamSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"team_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/2/teams/{teamSlug}/environments/{ID}",
								"segments": []any{
									map[string]any{
										"lit": "2",
									},
									map[string]any{
										"lit": "teams",
									},
									map[string]any{
										"var": "team_slug",
									},
									map[string]any{
										"lit": "environments",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"2",
									"teams",
									"{team_slug}",
									"environments",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ID": "id",
										"teamSlug": "team_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ID",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "team_slug",
											"orig": "teamSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"team_slug",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/2/teams/{teamSlug}/environments/{ID}",
								"segments": []any{
									map[string]any{
										"lit": "2",
									},
									map[string]any{
										"lit": "teams",
									},
									map[string]any{
										"var": "team_slug",
									},
									map[string]any{
										"lit": "environments",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"2",
									"teams",
									"{team_slug}",
									"environments",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ID": "id",
										"teamSlug": "team_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ID",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "team_slug",
											"orig": "teamSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"team_slug",
									},
								},
								"body": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"event": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "batch_events",
						"title": "Batch Events",
						"type": "`$ARRAY`",
						"short": "The array should contain one or more JSON objects representing Events.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$INTEGER`",
					},
				},
				"name": "event",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/batch/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "batch",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"batch",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata.batch_events`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "content_encoding",
											"orig": "Content-Encoding",
											"type": "`$STRING`",
											"kind": "header",
											"example": "plaintext",
										},
									},
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"batch_events",
										"dataset_slug",
									},
								},
								"body": map[string]any{
									"alternatives": []any{
										map[string]any{
											"binary": true,
											"kind": "raw",
											"media": "application/octet-stream",
										},
									},
									"kind": "json",
									"media": "application/json",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/events/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"events",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "x_honeycomb_event_time",
											"orig": "X-Honeycomb-Event-Time",
											"type": "`$INTEGER`",
											"kind": "header",
										},
										map[string]any{
											"name": "x_honeycomb_samplerate",
											"orig": "X-Honeycomb-Samplerate",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"historical_anomaly": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ended_at",
						"title": "Ended At",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The time the anomaly ended, in seconds since UNIX epoch.",
						"readOnly": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "A deterministic identifier for the anomaly, derived from the Signal, its measured kind, and the anomaly's start time.",
						"readOnly": true,
					},
					map[string]any{
						"name": "measurement",
						"title": "Measurement",
						"type": "`$NUMBER`",
						"req": true,
						"short": "The measured value that triggered the anomaly.",
						"readOnly": true,
					},
					map[string]any{
						"name": "normal_range",
						"title": "Normal Range",
						"type": "`$ANY`",
						"req": true,
						"short": "The trained normal band the measurement exceeded.",
					},
					map[string]any{
						"name": "started_at",
						"title": "Started At",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The time the anomaly started, in seconds since UNIX epoch.",
						"readOnly": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "historical_anomaly",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/signals/{signalId}/historical_anomalies",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "signals",
									},
									map[string]any{
										"var": "signal_id",
									},
									map[string]any{
										"lit": "historical_anomalies",
									},
								},
								"parts": []any{
									"1",
									"signals",
									"{signal_id}",
									"historical_anomalies",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"signalId": "signal_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.historical_anomalies`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "signal_id",
											"orig": "signalId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "end_time",
											"orig": "end_time",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"example": 1741392000,
										},
										map[string]any{
											"name": "page_after",
											"orig": "page[after]",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eyxJjcmAVhdGVkX",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page[size]",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "start_time",
											"orig": "start_time",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"example": 1740787200,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end_time",
										"signal_id",
										"start_time",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.signal",
						},
					},
				},
			},
			"kinesis_event": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "errorMessage",
						"title": "Error Message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "records",
						"title": "Records",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "requestId",
						"title": "Request Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timestamp",
						"title": "Timestamp",
						"type": "`$INTEGER`",
					},
				},
				"name": "kinesis_event",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/kinesis_events/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "kinesis_events",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"kinesis_events",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "x_amz_firehose_request_id",
											"orig": "X-Amz-Firehose-Request-Id",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
											"example": "33658b45-a8f1-4007-92e8-f601ae33db14",
										},
									},
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"x_amz_firehose_request_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"management_auth": map[string]any{
				"fields": []any{},
				"name": "management_auth",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/2/auth",
								"segments": []any{
									map[string]any{
										"lit": "2",
									},
									map[string]any{
										"lit": "auth",
									},
								},
								"parts": []any{
									"2",
									"auth",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"map_dependency": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "dependencies",
						"title": "Dependencies",
						"type": "`$ANY`",
						"short": "Array of service dependencies.",
					},
					map[string]any{
						"name": "end_time",
						"title": "End Time",
						"type": "`$INTEGER`",
						"short": "Absolute end time to evaluate dependencies, in seconds since UNIX epoch.",
					},
					map[string]any{
						"name": "filters",
						"title": "Filters",
						"type": "`$ARRAY`",
						"short": "Optional list of service nodes to filter dependencies by.",
					},
					map[string]any{
						"name": "links",
						"title": "Links",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Links to iterate through the pages of results.",
					},
					map[string]any{
						"name": "request_id",
						"title": "Request Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the Map Dependency Request.",
					},
					map[string]any{
						"name": "start_time",
						"title": "Start Time",
						"type": "`$INTEGER`",
						"short": "Absolute start time to evaluate dependencies, in seconds since UNIX epoch.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Status of the Map Dependency Request.",
					},
					map[string]any{
						"name": "time_range",
						"title": "Time Range",
						"type": "`$INTEGER`",
						"short": "Time range in seconds (minimum 1).",
					},
				},
				"name": "map_dependency",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/maps/dependencies/requests",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "maps",
									},
									map[string]any{
										"lit": "dependencies",
									},
									map[string]any{
										"lit": "requests",
									},
								},
								"parts": []any{
									"1",
									"maps",
									"dependencies",
									"requests",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 5000,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/maps/dependencies/requests/{requestId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "maps",
									},
									map[string]any{
										"lit": "dependencies",
									},
									map[string]any{
										"lit": "requests",
									},
									map[string]any{
										"var": "request_id",
									},
								},
								"parts": []any{
									"1",
									"maps",
									"dependencies",
									"requests",
									"{request_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"requestId": "request_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "request_id",
											"orig": "requestId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page_after",
											"orig": "page[after]",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eyxJjcmAVhdGVkX",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page[size]",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 10,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"request_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"marker": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "color",
						"title": "Color",
						"type": "`$STRING`",
						"short": "Color can be assigned to Markers using the Marker Settings endpoint.",
						"readOnly": true,
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "The ISO8601-formatted time when the Marker was created.",
						"readOnly": true,
					},
					map[string]any{
						"name": "end_time",
						"title": "End Time",
						"type": "`$INTEGER`",
						"short": "Specifies end time, and allows a Marker to be recorded as representing a time range, such as a 5 minute deploy.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "A 6 character hexadecimal string assigned on Marker creation.",
						"readOnly": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"short": "A message to describe this specific Marker.",
					},
					map[string]any{
						"name": "start_time",
						"title": "Start Time",
						"type": "`$INTEGER`",
						"short": "Indicates the time the Marker should be placed.",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Groups similar Markers.",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "The ISO8601-formatted time when the Marker was updated.",
						"readOnly": true,
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "A target for the marker.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"id": "id",
					},
					"name": "id",
					"parts": []any{
						"dataset_slug",
						"id",
					},
					"sep": "/",
				},
				"name": "marker",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/markers/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "markers",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"markers",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/markers/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "markers",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"markers",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/1/markers/{datasetSlug}/{markerId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "markers",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"markers",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"markerId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "markerId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/1/markers/{datasetSlug}/{markerId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "markers",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"markers",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"markerId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "markerId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"marker_setting": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "color",
						"title": "Color",
						"type": "`$STRING`",
						"req": true,
						"short": "Color to use for display of this marker type.",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "The ISO8601-formatted time when the Marker Setting was created.",
						"readOnly": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The unique identifier (ID) for the Marker Setting.",
						"readOnly": true,
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"short": "Groups similar Markers.",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NULL`",
								"`$STRING`",
							},
						},
						"short": "The ISO8601-formatted time when the Marker Setting was updated.",
						"readOnly": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"id": "id",
					},
					"name": "id",
					"parts": []any{
						"dataset_slug",
						"id",
					},
					"sep": "/",
				},
				"name": "marker_setting",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/marker_settings/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "marker_settings",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"marker_settings",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/marker_settings/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "marker_settings",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"marker_settings",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/1/marker_settings/{datasetSlug}/{markerSettingId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "marker_settings",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"marker_settings",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"markerSettingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "markerSettingId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/1/marker_settings/{datasetSlug}/{markerSettingId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "marker_settings",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"marker_settings",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"markerSettingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "markerSettingId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"query": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "breakdowns",
						"title": "Breakdowns",
						"type": "`$ARRAY`",
						"short": "the columns by which to break events down into groups",
					},
					map[string]any{
						"name": "calculated_fields",
						"title": "Calculated Fields",
						"type": "`$ARRAY`",
						"short": "Computed properties that are calculated by a formula.",
					},
					map[string]any{
						"name": "calculations",
						"title": "Calculations",
						"type": "`$ARRAY`",
						"short": "the calculations to return as a time series and summary table",
					},
					map[string]any{
						"name": "compare_time_offset_seconds",
						"title": "Compare Time Offset Seconds",
						"type": "`$INTEGER`",
						"short": "When set, offsets the query's time range by this number of seconds into the past, allowing comparison with historical data from an earlier time period.",
					},
					map[string]any{
						"name": "end_time",
						"title": "End Time",
						"type": "`$INTEGER`",
						"short": "Absolute end time of query, in seconds since UNIX epoch.",
					},
					map[string]any{
						"name": "filter_combination",
						"title": "Filter Combination",
						"type": "`$STRING`",
						"short": "Set to \"OR\" to match ANY filter in the filter list",
					},
					map[string]any{
						"name": "filters",
						"title": "Filters",
						"type": "`$ARRAY`",
						"short": "The filters with which to restrict the considered events",
					},
					map[string]any{
						"name": "formulas",
						"title": "Formulas",
						"type": "`$ARRAY`",
						"short": "Mathematical formulas to be returned as a time series and summary table.",
					},
					map[string]any{
						"name": "granularity",
						"title": "Granularity",
						"type": "`$INTEGER`",
						"short": "The time resolution of the query's graph, in seconds.",
					},
					map[string]any{
						"name": "havings",
						"title": "Havings",
						"type": "`$ARRAY`",
						"short": "The Having clause allows you to filter on the results table.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"readOnly": true,
					},
					map[string]any{
						"name": "limit",
						"title": "Limit",
						"type": "`$INTEGER`",
						"short": "The maximum number of unique groups returned in 'results'.",
					},
					map[string]any{
						"name": "orders",
						"title": "Orders",
						"type": "`$ARRAY`",
						"short": "The terms on which to order the query results.",
					},
					map[string]any{
						"name": "start_time",
						"title": "Start Time",
						"type": "`$INTEGER`",
						"short": "Absolute start time of query, in seconds since UNIX epoch.",
					},
					map[string]any{
						"name": "time_range",
						"title": "Time Range",
						"type": "`$INTEGER`",
						"short": "Time range of query in seconds.",
					},
					map[string]any{
						"name": "usage_mode",
						"title": "Usage Mode",
						"type": "`$BOOLEAN`",
						"short": "If `true`, query results will return aggregates without correcting for sample rates.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"id": "id",
					},
					"name": "id",
					"parts": []any{
						"dataset_slug",
						"id",
					},
					"sep": "/",
				},
				"name": "query",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/queries/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "queries",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"queries",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/queries/{datasetSlug}/{queryId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "queries",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"queries",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"queryId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "queryId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"query_annotation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "ISO8601 formatted time when the Query Annotation was created.",
						"readOnly": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "A description of the Query.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The unique identifier (ID) of a Query Annotation.",
						"readOnly": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "A name for the Query.",
					},
					map[string]any{
						"name": "query_id",
						"title": "Query Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The ID of the Query that the annotation describes.",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"short": "The source of the Query Annotation.",
						"readOnly": true,
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "ISO8601 formatted time when the Query Annotation was updated.",
						"readOnly": true,
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"id": "id",
					},
					"name": "id",
					"parts": []any{
						"dataset_slug",
						"id",
					},
					"sep": "/",
				},
				"name": "query_annotation",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/query_annotations/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "query_annotations",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"query_annotations",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/query_annotations/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "query_annotations",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"query_annotations",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "include_board_annotation",
											"orig": "include_board_annotations",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/query_annotations/{datasetSlug}/{queryAnnotationId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "query_annotations",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"query_annotations",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"queryAnnotationId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "queryAnnotationId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/1/query_annotations/{datasetSlug}/{queryAnnotationId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "query_annotations",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"query_annotations",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"queryAnnotationId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "queryAnnotationId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/1/query_annotations/{datasetSlug}/{queryAnnotationId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "query_annotations",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"query_annotations",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"queryAnnotationId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "queryAnnotationId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"query_result": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "complete",
						"title": "Complete",
						"type": "`$BOOLEAN`",
						"short": "Indicates if the query results are available yet or not.",
						"readOnly": true,
					},
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$OBJECT`",
						"short": "An object containing the query result data",
					},
					map[string]any{
						"name": "disable_other_by_aggregate",
						"title": "Disable Other By Aggregate",
						"type": "`$BOOLEAN`",
						"short": "If true, the \"other_by_aggregate\" data is excluded from the query result.",
						"writeOnly": true,
					},
					map[string]any{
						"name": "disable_series",
						"title": "Disable Series",
						"type": "`$BOOLEAN`",
						"short": "If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field.",
						"writeOnly": true,
					},
					map[string]any{
						"name": "disable_total_by_aggregate",
						"title": "Disable Total By Aggregate",
						"type": "`$BOOLEAN`",
						"short": "If `true`, data representing each aggregate in the query's total value will not be returned.",
						"writeOnly": true,
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": "`$STRING`",
						"short": "Only present if the query failed to run.",
						"readOnly": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The unique identifier (ID) of a Query Result",
						"readOnly": true,
					},
					map[string]any{
						"name": "limit",
						"title": "Limit",
						"type": "`$INTEGER`",
						"short": "If `disable_series` is `true`, a limit may be optionally given.",
						"writeOnly": true,
					},
					map[string]any{
						"name": "links",
						"title": "Links",
						"type": "`$OBJECT`",
						"short": "An object containing UI links to the query result and query result graph",
					},
					map[string]any{
						"name": "query",
						"title": "Query",
						"type": "`$ANY`",
						"readOnly": true,
					},
					map[string]any{
						"name": "query_id",
						"title": "Query Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The ID of a query returned from the [Queries endpoint](/api/queries/).",
						"writeOnly": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"id": "id",
					},
					"name": "id",
					"parts": []any{
						"dataset_slug",
						"id",
					},
					"sep": "/",
				},
				"name": "query_result",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/query_results/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "query_results",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"query_results",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/query_results/{datasetSlug}/{queryResultId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "query_results",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"query_results",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"queryResultId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "queryResultId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"recipient": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "recipient",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/recipients",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "recipients",
									},
								},
								"parts": []any{
									"1",
									"recipients",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/recipients",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "recipients",
									},
								},
								"parts": []any{
									"1",
									"recipients",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/recipients/{recipientId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "recipients",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"recipients",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"recipientId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "recipientId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/1/recipients/{recipientId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "recipients",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"recipients",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"recipientId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "recipientId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/1/recipients/{recipientId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "recipients",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"recipients",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"recipientId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "recipientId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"signal": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "auto_investigate",
						"title": "Auto Investigate",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "When `true`, Honeycomb will automatically start an investigation when this Signal fires.",
						"readOnly": true,
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"short": "The ISO8601-formatted time when the Signal was created.",
						"readOnly": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "currently_anomalous",
						"title": "Currently Anomalous",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the Signal is currently in an anomalous state.",
						"readOnly": true,
					},
					map[string]any{
						"name": "dataset_slug",
						"title": "Dataset Slug",
						"type": "`$STRING`",
						"req": true,
						"short": "The slug of the dataset the Signal's service reports to.",
						"readOnly": true,
					},
					map[string]any{
						"name": "enabled",
						"title": "Enabled",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
						"short": "Whether the Signal is currently enabled.",
					},
					map[string]any{
						"name": "environment_slug",
						"title": "Environment Slug",
						"type": "`$STRING`",
						"req": true,
						"short": "The slug of the environment the Signal belongs to.",
						"readOnly": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique identifier (ID) of the Signal.",
						"readOnly": true,
					},
					map[string]any{
						"name": "last_anomaly_ended_at",
						"title": "Last Anomaly Ended At",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The end time of the most recent anomaly, in seconds since UNIX epoch.",
						"readOnly": true,
					},
					map[string]any{
						"name": "last_anomaly_started_at",
						"title": "Last Anomaly Started At",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The start time of the most recent anomaly, in seconds since UNIX epoch.",
						"readOnly": true,
					},
					map[string]any{
						"name": "measured_signal",
						"title": "Measured Signal",
						"type": "`$STRING`",
						"req": true,
						"short": "The kind of measurement the Signal is trained on.",
						"readOnly": true,
					},
					map[string]any{
						"name": "recipients",
						"title": "Recipients",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$ARRAY`",
							},
						},
						"short": "The Recipients notified when this Signal fires.",
					},
					map[string]any{
						"name": "sensitivity",
						"title": "Sensitivity",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "How far a measurement must deviate from the trained normal band before the Signal fires.",
					},
					map[string]any{
						"name": "service_name",
						"title": "Service Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The name of the service the Signal monitors.",
						"readOnly": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "The lifecycle status of the Signal.",
						"readOnly": true,
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"req": true,
						"short": "The ISO8601-formatted time when the Signal was last updated.",
						"readOnly": true,
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "signal",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/signals",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "signals",
									},
								},
								"parts": []any{
									"1",
									"signals",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.signals`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "currently_anomalous",
											"orig": "currently_anomalous",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "dataset_slug",
											"orig": "dataset_slug",
											"type": "`$STRING`",
											"kind": "query",
											"example": "checkout-api",
										},
										map[string]any{
											"name": "measured_signal",
											"orig": "measured_signal",
											"type": "`$STRING`",
											"kind": "query",
											"example": "error_rate",
										},
										map[string]any{
											"name": "page_after",
											"orig": "page[after]",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eyxJjcmAVhdGVkX",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page[size]",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "service_name",
											"orig": "service_name",
											"type": "`$STRING`",
											"kind": "query",
											"example": "checkout-api",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/signals/{signalId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "signals",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"signals",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"signalId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "signalId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/1/signals/{signalId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "signals",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"signals",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"signalId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "signalId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"slo": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "The ISO8601-formatted time when the SLO was created.",
						"readOnly": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "dataset_slugs",
						"title": "Dataset Slugs",
						"type": "`$ARRAY`",
						"short": "The dataset(s) the SLO will be evaluated against.",
						"readOnly": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "A nice description of the SLO's intent and context.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"readOnly": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
							"list": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The name of the SLO.",
					},
					map[string]any{
						"name": "reset_at",
						"title": "Reset At",
						"type": "`$STRING`",
						"short": "The ISO8601-formatted time the SLO was last reset.",
						"readOnly": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "sli",
						"title": "Sli",
						"type": "`$OBJECT`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$OBJECT`",
							},
							"list": map[string]any{
								"req": true,
								"type": "`$OBJECT`",
							},
							"update": map[string]any{
								"req": true,
								"type": "`$OBJECT`",
							},
						},
						"short": "Reference to the [Calculated Field (also called Derived Column)](/api/calculated-fields/) used as the indicator of event success.",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
						"short": "A list of key-value pairs to help identify the SLO.",
					},
					map[string]any{
						"name": "target_per_million",
						"title": "Target Per Million",
						"type": "`$INTEGER`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
							"list": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
							"update": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
						},
						"short": "The number of events out of one million (1,000,000) that you expected qualified events to succeed.",
					},
					map[string]any{
						"name": "time_period_days",
						"title": "Time Period Days",
						"type": "`$INTEGER`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
							"list": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
							"update": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
						},
						"short": "The time period, in days, over which the SLO will be evaluated.",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "The ISO8601-formatted time when the SLO was updated.",
						"readOnly": true,
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"id": "id",
					},
					"name": "id",
					"parts": []any{
						"dataset_slug",
						"id",
					},
					"sep": "/",
				},
				"name": "slo",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/slos/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "slos",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"slos",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/slos/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "slos",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"slos",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/slos/{datasetSlug}/{sloId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "slos",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"slos",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"sloId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "sloId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "detailed",
											"orig": "detailed",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": "",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/1/slos/{datasetSlug}/{sloId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "slos",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"slos",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"sloId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "sloId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/1/slos/{datasetSlug}/{sloId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "slos",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"slos",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"sloId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "sloId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"slo_count": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "error_count",
						"title": "Error Count",
						"type": "`$INTEGER`",
						"short": "Number of failed (bad) events in this window.",
						"readOnly": true,
					},
					map[string]any{
						"name": "is_partial",
						"title": "Is Partial",
						"type": "`$BOOLEAN`",
						"short": "When `true`, the data for this window may be incomplete.",
						"readOnly": true,
					},
					map[string]any{
						"name": "total_count",
						"title": "Total Count",
						"type": "`$INTEGER`",
						"short": "Total number of events (good + bad) in this window.",
						"readOnly": true,
					},
					map[string]any{
						"name": "window_end",
						"title": "Window End",
						"type": "`$INTEGER`",
						"short": "End of the window as a Unix timestamp (seconds).",
						"readOnly": true,
					},
					map[string]any{
						"name": "window_start",
						"title": "Window Start",
						"type": "`$INTEGER`",
						"short": "Start of the window as a Unix timestamp (seconds).",
						"readOnly": true,
					},
				},
				"name": "slo_count",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/slos/{datasetSlug}/{sloId}/counts",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "slos",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "slo_id",
									},
									map[string]any{
										"lit": "counts",
									},
								},
								"parts": []any{
									"1",
									"slos",
									"{dataset_slug}",
									"{slo_id}",
									"counts",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"sloId": "slo_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.windows`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "slo_id",
											"orig": "sloId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "end_time",
											"orig": "end_time",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"example": 1745254740,
										},
										map[string]any{
											"name": "start_time",
											"orig": "start_time",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"example": 1745251200,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"end_time",
										"slo_id",
										"start_time",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.slo",
						},
					},
				},
			},
			"slo_history": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "end_time",
						"title": "End Time",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for.",
					},
					map[string]any{
						"name": "ids",
						"title": "Ids",
						"type": "`$ARRAY`",
						"req": true,
						"short": "A list of SLO IDs to retrieve history for.",
					},
					map[string]any{
						"name": "start_time",
						"title": "Start Time",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for.",
					},
				},
				"name": "slo_history",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/reporting/slos/historical",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "reporting",
									},
									map[string]any{
										"lit": "slos",
									},
									map[string]any{
										"lit": "historical",
									},
								},
								"parts": []any{
									"1",
									"reporting",
									"slos",
									"historical",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"slo_hourly_count": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "end_time",
						"title": "End Time",
						"type": "`$INTEGER`",
						"short": "End of the hour as a Unix timestamp (seconds).",
						"readOnly": true,
						"format": "int64",
					},
					map[string]any{
						"name": "error_count",
						"title": "Error Count",
						"type": "`$INTEGER`",
						"short": "Number of failed (bad) events in this hour.",
						"readOnly": true,
					},
					map[string]any{
						"name": "is_partial",
						"title": "Is Partial",
						"type": "`$BOOLEAN`",
						"short": "When `true`, this bucket covers the current in-progress hour and its counts will increase until the hour completes.",
						"readOnly": true,
					},
					map[string]any{
						"name": "start_time",
						"title": "Start Time",
						"type": "`$INTEGER`",
						"short": "Start of the hour as a Unix timestamp (seconds).",
						"readOnly": true,
						"format": "int64",
					},
					map[string]any{
						"name": "total_count",
						"title": "Total Count",
						"type": "`$INTEGER`",
						"short": "Total number of events (good + bad) in this hour.",
						"readOnly": true,
					},
				},
				"name": "slo_hourly_count",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/slos/{datasetSlug}/{sloId}/counts/history",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "slos",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "slo_id",
									},
									map[string]any{
										"lit": "counts",
									},
									map[string]any{
										"lit": "history",
									},
								},
								"parts": []any{
									"1",
									"slos",
									"{dataset_slug}",
									"{slo_id}",
									"counts",
									"history",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"sloId": "slo_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.buckets`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "slo_id",
											"orig": "sloId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "end_time",
											"orig": "end_time",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"example": 1745254800,
										},
										map[string]any{
											"name": "start_time",
											"orig": "start_time",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"example": 1745168400,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"end_time",
										"slo_id",
										"start_time",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.slo",
						},
					},
				},
			},
			"trigger": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "alert_type",
						"title": "Alert Type",
						"type": "`$STRING`",
						"short": "How often to fire an alert when a trigger threshold is crossed.",
					},
					map[string]any{
						"name": "auto_investigate",
						"title": "Auto Investigate",
						"type": "`$BOOLEAN`",
						"short": "When true, Honeycomb will automatically start an investigation when this Trigger fires.",
					},
					map[string]any{
						"name": "baseline_details",
						"title": "Baseline Details",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"readOnly": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "dataset_slug",
						"title": "Dataset Slug",
						"type": "`$STRING`",
						"short": "The slug of the dataset this trigger belongs to.",
						"readOnly": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "A longer description, displayed on the Trigger's detail page.",
					},
					map[string]any{
						"name": "disabled",
						"title": "Disabled",
						"type": "`$BOOLEAN`",
						"short": "If true, the trigger will not be evaluated and alerts will not be sent.",
					},
					map[string]any{
						"name": "evaluation_schedule",
						"title": "Evaluation Schedule",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A schedule that determines when the trigger is run.",
					},
					map[string]any{
						"name": "evaluation_schedule_type",
						"title": "Evaluation Schedule Type",
						"type": "`$STRING`",
						"short": "The schedule type used by the trigger.",
					},
					map[string]any{
						"name": "frequency",
						"title": "Frequency",
						"type": "`$INTEGER`",
						"short": "The interval in seconds in which to check the results of the query’s calculation against the threshold.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The unique identifier (ID) for this Trigger.",
						"readOnly": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "A short, human-readable name for this Trigger, which will be displayed in the UI and when the trigger fires.",
					},
					map[string]any{
						"name": "query",
						"title": "Query",
						"type": "`$OBJECT`",
						"short": "An inline query specification that is a strict subset of the standard Query Specification.",
					},
					map[string]any{
						"name": "query_id",
						"title": "Query Id",
						"type": "`$STRING`",
						"short": "The ID of an existing saved Query that meets the trigger query requirements.",
					},
					map[string]any{
						"name": "recipients",
						"title": "Recipients",
						"type": "`$ARRAY`",
						"short": "A list of [Recipients](/api/recipients/) to notify when the Trigger fires.",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
						"short": "A list of key-value pairs to help identify the Trigger.",
					},
					map[string]any{
						"name": "threshold",
						"title": "Threshold",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The threshold over which the trigger will fire, specified as both an operator and a value.",
					},
					map[string]any{
						"name": "triggered",
						"title": "Triggered",
						"type": "`$BOOLEAN`",
						"short": "If true, the trigger has crossed its specified threshold without resolving.",
						"readOnly": true,
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"readOnly": true,
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"dataset_slug": "dataset_slug",
						"id": "id",
					},
					"name": "id",
					"parts": []any{
						"dataset_slug",
						"id",
					},
					"sep": "/",
				},
				"name": "trigger",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/1/triggers/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "triggers",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"triggers",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/triggers/{datasetSlug}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "triggers",
									},
									map[string]any{
										"var": "dataset_slug",
									},
								},
								"parts": []any{
									"1",
									"triggers",
									"{dataset_slug}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/recipients/{recipientId}/triggers",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "recipients",
									},
									map[string]any{
										"var": "recipient_id",
									},
									map[string]any{
										"lit": "triggers",
									},
								},
								"parts": []any{
									"1",
									"recipients",
									"{recipient_id}",
									"triggers",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"recipientId": "recipient_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "recipient_id",
											"orig": "recipientId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"recipient_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/1/triggers/{datasetSlug}/{triggerId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "triggers",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"triggers",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"triggerId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "triggerId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/1/triggers/{datasetSlug}/{triggerId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "triggers",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"triggers",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"triggerId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "triggerId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/1/triggers/{datasetSlug}/{triggerId}",
								"segments": []any{
									map[string]any{
										"lit": "1",
									},
									map[string]any{
										"lit": "triggers",
									},
									map[string]any{
										"var": "dataset_slug",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"1",
									"triggers",
									"{dataset_slug}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetSlug": "dataset_slug",
										"triggerId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "dataset_slug",
											"orig": "datasetSlug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "triggerId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dataset_slug",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.recipient",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}

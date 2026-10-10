"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "board",
        "accessor": "Board",
        "op": "create",
        "method": "POST",
        "path": "/1/boards",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "name": "My Board",
            "description": "A board created via the API",
            "type": "flexible",
            "links": {
                "board_url": "https://ui.honeycomb.io/myteam/environments/myenvironment/board/2NeeaE9bBLd"
            },
            "id": "2NeeaE9bBLd",
            "panels": [
                {
                    "position": {
                        "x_coordinate": 1,
                        "y_coordinate": 1,
                        "height": 1,
                        "width": 1
                    },
                    "query_panel": {
                        "query_id": "abc1234e",
                        "query_style": "graph",
                        "query_annotation_id": "e4c24a35",
                        "dataset": "My Dataset",
                        "visualization_settings": {
                            "hide_compare": true,
                            "hide_hovers": true,
                            "hide_markers": true,
                            "utc_xaxis": true,
                            "overlaid_charts": true,
                            "charts": []
                        }
                    }
                }
            ],
            "layout_generation": "auto",
            "tags": [
                {
                    "key": "team",
                    "value": "blue"
                }
            ],
            "preset_filters": [
                {
                    "column": "app.Service",
                    "alias": "Service"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "board",
        "accessor": "Board",
        "op": "list",
        "method": "GET",
        "path": "/1/boards",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "abc123",
                "name": "Production Monitoring",
                "description": "Key metrics for production environment",
                "type": "flexible",
                "panels": [
                    {
                        "type": "query",
                        "query_panel": {
                            "query_id": "ghi9012a",
                            "query_annotation_id": "f5e6d7c8"
                        },
                        "position": {
                            "x_coordinate": 0,
                            "y_coordinate": 0,
                            "height": 6,
                            "width": 12
                        }
                    },
                    {
                        "type": "text",
                        "text_panel": {
                            "content": "# Production Status\n\nAll systems operational"
                        },
                        "position": {
                            "x_coordinate": 0,
                            "y_coordinate": 6,
                            "height": 2,
                            "width": 12
                        }
                    }
                ],
                "layout_generation": "manual",
                "tags": [
                    {
                        "key": "environment",
                        "value": "production"
                    }
                ]
            },
            {
                "id": "def456",
                "name": "Service Health Dashboard",
                "description": "SLO monitoring for critical services",
                "type": "flexible",
                "panels": [
                    {
                        "type": "slo",
                        "slo_panel": {
                            "slo_id": "dF1URaPGL"
                        }
                    },
                    {
                        "type": "query",
                        "query_panel": {
                            "query_id": "jkl3456b",
                            "query_annotation_id": "b9c8d7e6",
                            "dataset": "api-logs"
                        }
                    }
                ],
                "layout_generation": "auto",
                "tags": [
                    {
                        "key": "team",
                        "value": "platform"
                    }
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "board",
        "accessor": "Board",
        "op": "load",
        "method": "GET",
        "path": "/1/boards/{boardId}",
        "args": [
            {
                "name": "id",
                "wire": "boardId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "board789",
            "name": "Comprehensive Dashboard",
            "description": "Complete monitoring setup with all panel types",
            "type": "flexible",
            "panels": [
                {
                    "type": "query",
                    "query_panel": {
                        "query_id": "stu5678e",
                        "query_annotation_id": "e9f8g7h6",
                        "dataset": "application-logs"
                    },
                    "position": {
                        "x_coordinate": 0,
                        "y_coordinate": 0,
                        "height": 8,
                        "width": 8
                    }
                },
                {
                    "type": "slo",
                    "slo_panel": {
                        "slo_id": "BGfyxhFto"
                    },
                    "position": {
                        "x_coordinate": 8,
                        "y_coordinate": 0,
                        "height": 4,
                        "width": 4
                    }
                },
                {
                    "type": "text",
                    "text_panel": {
                        "content": "## Alert Status\n\n🟢 All systems normal\n\n**Last updated:** 2024-01-15 14:30 UTC"
                    },
                    "position": {
                        "x_coordinate": 8,
                        "y_coordinate": 4,
                        "height": 4,
                        "width": 4
                    }
                }
            ],
            "layout_generation": "manual",
            "tags": [
                {
                    "key": "criticality",
                    "value": "high"
                },
                {
                    "key": "owner",
                    "value": "sre-team"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "board",
        "accessor": "Board",
        "op": "remove",
        "method": "DELETE",
        "path": "/1/boards/{boardId}/views/{viewId}",
        "args": [
            {
                "name": "id",
                "wire": "boardId",
                "value": "p1"
            },
            {
                "name": "view_id",
                "wire": "viewId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "board",
        "accessor": "Board",
        "op": "remove",
        "method": "DELETE",
        "path": "/1/boards/{boardId}",
        "args": [
            {
                "name": "id",
                "wire": "boardId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "board",
        "accessor": "Board",
        "op": "update",
        "method": "PUT",
        "path": "/1/boards/{boardId}",
        "args": [
            {
                "name": "id",
                "wire": "boardId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "name": "My Board",
            "description": "A board created via the API",
            "type": "flexible",
            "links": {
                "board_url": "https://ui.honeycomb.io/myteam/environments/myenvironment/board/2NeeaE9bBLd"
            },
            "id": "2NeeaE9bBLd",
            "panels": [
                {
                    "position": {
                        "x_coordinate": 1,
                        "y_coordinate": 1,
                        "height": 1,
                        "width": 1
                    },
                    "query_panel": {
                        "query_id": "abc1234e",
                        "query_style": "graph",
                        "query_annotation_id": "e4c24a35",
                        "dataset": "My Dataset",
                        "visualization_settings": {
                            "hide_compare": true,
                            "hide_hovers": true,
                            "hide_markers": true,
                            "utc_xaxis": true,
                            "overlaid_charts": true,
                            "charts": []
                        }
                    }
                }
            ],
            "layout_generation": "auto",
            "tags": [
                {
                    "key": "team",
                    "value": "blue"
                }
            ],
            "preset_filters": [
                {
                    "column": "app.Service",
                    "alias": "Service"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "board_view",
        "accessor": "BoardView",
        "op": "create",
        "method": "POST",
        "path": "/1/boards/{boardId}/views",
        "args": [
            {
                "name": "id",
                "wire": "boardId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "eC_abc123",
            "name": "My View",
            "filters": [
                {
                    "column": "status",
                    "operation": "=",
                    "value": "error"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "board_view",
        "accessor": "BoardView",
        "op": "list",
        "method": "GET",
        "path": "/1/boards/{boardId}/views",
        "args": [
            {
                "name": "id",
                "wire": "boardId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "eC_abc123",
                "name": "Errors View",
                "filters": [
                    {
                        "column": "status",
                        "operation": "=",
                        "value": "error"
                    }
                ]
            },
            {
                "id": "yc_def456",
                "name": "Slow requests view",
                "filters": [
                    {
                        "column": "duration_ms",
                        "operation": ">",
                        "value": 1000
                    }
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "board_view",
        "accessor": "BoardView",
        "op": "load",
        "method": "GET",
        "path": "/1/boards/{boardId}/views/{viewId}",
        "args": [
            {
                "name": "board_id",
                "wire": "boardId",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "viewId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "eC_abc123",
            "name": "Api and web slow requests errors",
            "filters": [
                {
                    "column": "status",
                    "operation": "=",
                    "value": "error"
                },
                {
                    "column": "duration_ms",
                    "operation": ">",
                    "value": 100
                },
                {
                    "column": "service",
                    "operation": "in",
                    "value": [
                        "api",
                        "web"
                    ]
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "board_view",
        "accessor": "BoardView",
        "op": "update",
        "method": "PUT",
        "path": "/1/boards/{boardId}/views/{viewId}",
        "args": [
            {
                "name": "board_id",
                "wire": "boardId",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "viewId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "eC_abc123",
            "name": "My View",
            "filters": [
                {
                    "column": "status",
                    "operation": "=",
                    "value": "error"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "bulk_signal_recipient_assignment",
        "accessor": "BulkSignalRecipientAssignment",
        "op": "create",
        "method": "POST",
        "path": "/1/signals/recipient_assignments",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "succeeded": [
                "hcaip_01jak3ymk8s5cpc2xz3q7d8v9r"
            ],
            "unchanged": [
                "hcaip_01jak3ymk8s5cpc2xz3q7d8v9r"
            ],
            "failed": [
                {
                    "signal_id": "hcaip_01jak3ymk8s5cpc2xz3q7d8v9r",
                    "code": "not_found",
                    "detail": "Signal not found"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "burn_alert",
        "accessor": "BurnAlert",
        "op": "create",
        "method": "POST",
        "path": "/1/burn_alerts/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "fS7vfB81Wcy",
            "description": "Use this runbook if this alert fires.",
            "triggered": false,
            "created_at": "2022-09-22T17:32:11Z",
            "updated_at": "2022-10-31T15:08:11Z",
            "auto_investigate": false,
            "alert_type": "exhaustion_time",
            "exhaustion_minutes": 120,
            "slo": {
                "id": "2LBq9LckbcA"
            },
            "recipients": [
                {
                    "id": "abcd123",
                    "type": "email",
                    "target": "alerts@example.com"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "burn_alert",
        "accessor": "BurnAlert",
        "op": "load",
        "method": "GET",
        "path": "/1/burn_alerts/{datasetSlug}/{burnAlertId}",
        "args": [
            {
                "name": "burn_alert_id",
                "wire": "burnAlertId",
                "value": "p1"
            },
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "fS7vfB81Wcy",
            "description": "Use this runbook if this alert fires.",
            "triggered": false,
            "created_at": "2022-09-22T17:32:11Z",
            "updated_at": "2022-10-31T15:08:11Z",
            "auto_investigate": false,
            "alert_type": "exhaustion_time",
            "exhaustion_minutes": 120,
            "slo": {
                "id": "2LBq9LckbcA"
            },
            "recipients": [
                {
                    "id": "abcd123",
                    "type": "email",
                    "target": "alerts@example.com"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "burn_alert",
        "accessor": "BurnAlert",
        "op": "load",
        "method": "GET",
        "path": "/1/burn_alerts/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {
            "slo_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "slo_id"
        ],
        "queryArgs": [
            {
                "name": "slo_id",
                "wire": "slo_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "fS7vfB81Wcy",
                "alert_type": "exhaustion_time",
                "description": "Use this runbook (link) if this alert fires.",
                "triggered": true,
                "exhaustion_minutes": 120,
                "slo": {
                    "id": "2LBq9LckbcA"
                },
                "created_at": "2022-09-22T17:32:11Z",
                "updated_at": "2022-10-22T17:32:11Z"
            },
            {
                "id": "gT7wgC82Xcz",
                "alert_type": "budget_rate",
                "description": "Use this runbook (link) if this alert fires.",
                "triggered": true,
                "budget_rate_window_minutes": 60,
                "budget_rate_decrease_threshold_per_million": 1000,
                "slo": {
                    "id": "2LBq9LckbcA"
                },
                "created_at": "2022-09-22T17:32:11Z",
                "updated_at": "2022-10-22T17:32:11Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "burn_alert",
        "accessor": "BurnAlert",
        "op": "remove",
        "method": "DELETE",
        "path": "/1/burn_alerts/{datasetSlug}/{burnAlertId}",
        "args": [
            {
                "name": "burn_alert_id",
                "wire": "burnAlertId",
                "value": "p1"
            },
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "burn_alert",
        "accessor": "BurnAlert",
        "op": "update",
        "method": "PUT",
        "path": "/1/burn_alerts/{datasetSlug}/{burnAlertId}",
        "args": [
            {
                "name": "burn_alert_id",
                "wire": "burnAlertId",
                "value": "p1"
            },
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "fS7vfB81Wcy",
            "description": "Use this runbook if this alert fires.",
            "triggered": false,
            "created_at": "2022-09-22T17:32:11Z",
            "updated_at": "2022-10-31T15:08:11Z",
            "auto_investigate": false,
            "alert_type": "exhaustion_time",
            "exhaustion_minutes": 120,
            "slo": {
                "id": "2LBq9LckbcA"
            },
            "recipients": [
                {
                    "id": "abcd123",
                    "type": "email",
                    "target": "alerts@example.com"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "calculated_field",
        "accessor": "CalculatedField",
        "op": "create",
        "method": "POST",
        "path": "/1/derived_columns/{datasetSlug}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "yUheCUmgZ8p",
            "alias": "one",
            "description": "just one",
            "expression": "INT(1)",
            "created_at": "2022-07-26T22:38:04Z",
            "updated_at": "2022-11-16T17:34:01Z"
        },
        "idField": "id"
    },
    {
        "entity": "calculated_field",
        "accessor": "CalculatedField",
        "op": "load",
        "method": "GET",
        "path": "/1/derived_columns/{datasetSlug}/{derivedColumnId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "derived_column_id",
                "wire": "derivedColumnId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "yUheCUmgZ8p",
            "alias": "one",
            "description": "just one",
            "expression": "INT(1)",
            "created_at": "2022-07-26T22:38:04Z",
            "updated_at": "2022-11-16T17:34:01Z"
        },
        "idField": "id"
    },
    {
        "entity": "calculated_field",
        "accessor": "CalculatedField",
        "op": "load",
        "method": "GET",
        "path": "/1/derived_columns/{datasetSlug}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {
            "alia": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "alias"
        ],
        "queryArgs": [
            {
                "name": "alia",
                "wire": "alias"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "x",
                "alias": "x",
                "expression": "x",
                "description": "x",
                "created_at": "x",
                "updated_at": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "calculated_field",
        "accessor": "CalculatedField",
        "op": "remove",
        "method": "DELETE",
        "path": "/1/derived_columns/{datasetSlug}/{derivedColumnId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "derived_column_id",
                "wire": "derivedColumnId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "calculated_field",
        "accessor": "CalculatedField",
        "op": "update",
        "method": "PUT",
        "path": "/1/derived_columns/{datasetSlug}/{derivedColumnId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "derived_column_id",
                "wire": "derivedColumnId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "alias": "x",
            "expression": "x",
            "description": "x",
            "created_at": "x",
            "updated_at": "x"
        },
        "idField": "id"
    },
    {
        "entity": "column",
        "accessor": "Column",
        "op": "create",
        "method": "POST",
        "path": "/1/columns/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "yUheCUmgZ8p",
            "key_name": "my_column",
            "hidden": false,
            "description": "An integer column",
            "type": "integer",
            "last_written": "2022-07-26T22:38:05Z",
            "created_at": "2022-07-26T22:38:04Z",
            "updated_at": "2022-07-26T22:38:04Z"
        },
        "idField": "id"
    },
    {
        "entity": "column",
        "accessor": "Column",
        "op": "load",
        "method": "GET",
        "path": "/1/columns/{datasetSlug}/{columnId}",
        "args": [
            {
                "name": "column_id",
                "wire": "columnId",
                "value": "p1"
            },
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "yUheCUmgZ8p",
            "key_name": "my_column",
            "hidden": false,
            "description": "",
            "type": "integer",
            "last_written": "2022-07-26T22:38:05Z",
            "created_at": "2022-07-26T22:38:04Z",
            "updated_at": "2022-07-26T22:38:04Z"
        },
        "idField": "id"
    },
    {
        "entity": "column",
        "accessor": "Column",
        "op": "load",
        "method": "GET",
        "path": "/1/columns/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {
            "key_name": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "key_name"
        ],
        "queryArgs": [
            {
                "name": "key_name",
                "wire": "key_name"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "yUheCUmgZ8p",
                "key_name": "my_column",
                "hidden": false,
                "description": "",
                "type": "integer",
                "last_written": "2022-07-26T22:38:05Z",
                "created_at": "2022-07-26T22:38:04Z",
                "updated_at": "2022-07-26T22:38:04Z"
            },
            {
                "id": "yUheCUmgZ8q",
                "key_name": "other_column",
                "hidden": false,
                "description": "",
                "type": "string",
                "last_written": "2022-07-26T22:38:05Z",
                "created_at": "2022-07-26T22:38:04Z",
                "updated_at": "2022-07-26T22:38:04Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "column",
        "accessor": "Column",
        "op": "remove",
        "method": "DELETE",
        "path": "/1/columns/{datasetSlug}/{columnId}",
        "args": [
            {
                "name": "column_id",
                "wire": "columnId",
                "value": "p1"
            },
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "column",
        "accessor": "Column",
        "op": "update",
        "method": "PUT",
        "path": "/1/columns/{datasetSlug}/{columnId}",
        "args": [
            {
                "name": "column_id",
                "wire": "columnId",
                "value": "p1"
            },
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "yUheCUmgZ8p",
            "key_name": "my_column",
            "hidden": false,
            "description": "",
            "type": "string",
            "last_written": "2022-07-26T22:38:05Z",
            "created_at": "2022-07-26T22:38:04Z",
            "updated_at": "2022-07-26T22:38:04Z"
        },
        "idField": "id"
    },
    {
        "entity": "dataset",
        "accessor": "Dataset",
        "op": "create",
        "method": "POST",
        "path": "/1/datasets",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "name": "My Dataset!",
            "description": "A nice description of my dataset",
            "settings": {
                "delete_protected": true
            },
            "expand_json_depth": 3,
            "slug": "my-dataset-",
            "regular_columns_count": 100,
            "last_written_at": "2022-07-21T18:39:23Z",
            "created_at": "2022-09-22T17:32:11Z",
            "dataset_type": "metrics"
        },
        "idField": "id"
    },
    {
        "entity": "dataset",
        "accessor": "Dataset",
        "op": "list",
        "method": "GET",
        "path": "/1/datasets",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "name": "my dataset!",
                "description": "my dataset described!",
                "slug": "my-dataset-",
                "expand_json_depth": 2,
                "created_at": "2022-07-21T18:39:23Z",
                "last_written_at": "2022-07-22T19:52:00Z",
                "regular_columns_count": 12
            },
            {
                "name": "another dataset",
                "description": "",
                "slug": "another-dataset",
                "expand_json_depth": 0,
                "created_at": "2022-07-21T18:39:23Z",
                "last_written_at": "2022-07-22T19:52:00Z",
                "regular_columns_count": 98
            }
        ],
        "idField": "id"
    },
    {
        "entity": "dataset",
        "accessor": "Dataset",
        "op": "load",
        "method": "GET",
        "path": "/1/datasets/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "name": "My Dataset!",
            "description": "A nice description of my dataset",
            "settings": {
                "delete_protected": true
            },
            "expand_json_depth": 3,
            "slug": "my-dataset-",
            "regular_columns_count": 100,
            "last_written_at": "2022-07-21T18:39:23Z",
            "created_at": "2022-09-22T17:32:11Z",
            "dataset_type": "metrics"
        },
        "idField": "id"
    },
    {
        "entity": "dataset",
        "accessor": "Dataset",
        "op": "remove",
        "method": "DELETE",
        "path": "/1/datasets/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "dataset",
        "accessor": "Dataset",
        "op": "update",
        "method": "PUT",
        "path": "/1/datasets/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "name": "My Dataset!",
            "slug": "my-dataset-",
            "description": "my updated description",
            "settings": {
                "delete_protected": false
            },
            "expand_json_depth": 3,
            "created_at": "2022-07-21T18:39:23Z",
            "last_written_at": "2022-09-22T17:32:03Z",
            "regular_columns_count": 100
        },
        "idField": "id"
    },
    {
        "entity": "dataset_definition",
        "accessor": "DatasetDefinition",
        "op": "load",
        "method": "GET",
        "path": "/1/dataset_definitions/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "duration_ms": {
                "name": "duration_ms",
                "column_type": "column"
            },
            "error": null,
            "name": null,
            "parent_id": null,
            "route": null,
            "service_name": null,
            "span_id": {
                "name": "my_span_id",
                "column_type": "column"
            },
            "span_kind": null,
            "annotation_type": null,
            "link_trace_id": null,
            "link_span_id": null,
            "status": null,
            "trace_id": null,
            "user": null,
            "log_severity": null,
            "log_message": null
        },
        "idField": "id"
    },
    {
        "entity": "dataset_definition",
        "accessor": "DatasetDefinition",
        "op": "update",
        "method": "PATCH",
        "path": "/1/dataset_definitions/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "duration_ms": {
                "name": "duration_ms",
                "column_type": "column"
            },
            "error": null,
            "name": null,
            "parent_id": null,
            "route": null,
            "service_name": null,
            "span_id": {
                "name": "my_span_id",
                "column_type": "column"
            },
            "span_kind": null,
            "annotation_type": null,
            "link_trace_id": null,
            "link_span_id": null,
            "status": null,
            "trace_id": null,
            "user": null,
            "log_severity": null,
            "log_message": null
        },
        "idField": "id"
    },
    {
        "entity": "environment",
        "accessor": "Environment",
        "op": "create",
        "method": "POST",
        "path": "/2/teams/{teamSlug}/environments",
        "args": [
            {
                "name": "team_slug",
                "wire": "teamSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 201,
        "sample": {
            "data": {
                "id": "x",
                "type": "environments",
                "links": {
                    "self": "x"
                },
                "attributes": {
                    "name": "x",
                    "description": "x",
                    "color": "blue",
                    "slug": "x",
                    "settings": {
                        "delete_protected": true
                    }
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "environment",
        "accessor": "Environment",
        "op": "load",
        "method": "GET",
        "path": "/2/teams/{teamSlug}/environments/{ID}",
        "args": [
            {
                "name": "id",
                "wire": "ID",
                "value": "p1"
            },
            {
                "name": "team_slug",
                "wire": "teamSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "id": "x",
                "type": "environments",
                "links": {
                    "self": "x"
                },
                "attributes": {
                    "name": "x",
                    "description": "x",
                    "color": "blue",
                    "slug": "x",
                    "settings": {
                        "delete_protected": true
                    }
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "environment",
        "accessor": "Environment",
        "op": "load",
        "method": "GET",
        "path": "/2/teams/{teamSlug}/environments",
        "args": [
            {
                "name": "team_slug",
                "wire": "teamSlug",
                "value": "p1"
            }
        ],
        "select": {
            "page_after": "eyxJjcmAVhdGVkX",
            "page_size": 10
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "page[after]",
            "page[size]"
        ],
        "queryArgs": [
            {
                "name": "page_after",
                "wire": "page[after]"
            },
            {
                "name": "page_size",
                "wire": "page[size]"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "type": "environments",
                    "links": {
                        "self": "x"
                    },
                    "attributes": {
                        "name": "x",
                        "description": "x",
                        "color": "blue",
                        "slug": "x",
                        "settings": {
                            "delete_protected": true
                        }
                    }
                }
            ],
            "links": {
                "next": "/2/teams/my-team/api-keys?page[after]=3025fa645ad1100d&page[size]=10"
            }
        },
        "idField": "id"
    },
    {
        "entity": "environment",
        "accessor": "Environment",
        "op": "remove",
        "method": "DELETE",
        "path": "/2/teams/{teamSlug}/environments/{ID}",
        "args": [
            {
                "name": "id",
                "wire": "ID",
                "value": "p1"
            },
            {
                "name": "team_slug",
                "wire": "teamSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "environment",
        "accessor": "Environment",
        "op": "update",
        "method": "PATCH",
        "path": "/2/teams/{teamSlug}/environments/{ID}",
        "args": [
            {
                "name": "id",
                "wire": "ID",
                "value": "p1"
            },
            {
                "name": "team_slug",
                "wire": "teamSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "id": "x",
                "type": "environments",
                "links": {
                    "self": "x"
                },
                "attributes": {
                    "name": "x",
                    "description": "x",
                    "color": "blue",
                    "slug": "x",
                    "settings": {
                        "delete_protected": true
                    }
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "event",
        "accessor": "Event",
        "op": "create",
        "method": "POST",
        "path": "/1/batch/{datasetSlug}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {
            "batch_events": "v1"
        },
        "headers": [
            {
                "name": "content_encoding",
                "wire": "Content-Encoding",
                "value": "plaintext"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "status": 202
            },
            {
                "status": 400,
                "error": "Request body should not be empty."
            },
            {
                "status": 400,
                "error": "Event has too many columns."
            }
        ],
        "idField": "id"
    },
    {
        "entity": "event",
        "accessor": "Event",
        "op": "create",
        "method": "POST",
        "path": "/1/events/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_honeycomb_event_time",
                "wire": "X-Honeycomb-Event-Time",
                "value": "h1"
            },
            {
                "name": "x_honeycomb_samplerate",
                "wire": "X-Honeycomb-Samplerate",
                "value": "h2"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "historical_anomaly",
        "accessor": "HistoricalAnomaly",
        "op": "list",
        "method": "GET",
        "path": "/1/signals/{signalId}/historical_anomalies",
        "args": [
            {
                "name": "signal_id",
                "wire": "signalId",
                "value": "p1"
            }
        ],
        "select": {
            "end_time": 1741392000,
            "start_time": 1740787200,
            "page_after": "eyxJjcmAVhdGVkX",
            "page_size": 10
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "start_time",
            "end_time",
            "page[after]",
            "page[size]"
        ],
        "queryArgs": [
            {
                "name": "end_time",
                "wire": "end_time"
            },
            {
                "name": "page_after",
                "wire": "page[after]"
            },
            {
                "name": "page_size",
                "wire": "page[size]"
            },
            {
                "name": "start_time",
                "wire": "start_time"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "historical_anomalies": [
                {
                    "id": "0f8d0f3a-3f8b-5f2b-8f2b-1f2b3f4b5f6b",
                    "started_at": 1741089600,
                    "ended_at": 1741093200,
                    "measurement": 0.42,
                    "normal_range": {
                        "lower": 0.01,
                        "upper": 0.08
                    }
                }
            ],
            "links": {
                "next": "/2/teams/my-team/api-keys?page[after]=3025fa645ad1100d&page[size]=10"
            }
        },
        "idField": "id"
    },
    {
        "entity": "key_management",
        "accessor": "KeyManagement",
        "op": "create",
        "method": "POST",
        "path": "/2/teams/{teamSlug}/api-keys",
        "args": [
            {
                "name": "team_slug",
                "wire": "teamSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 201,
        "sample": {
            "data": {
                "id": "hcxik_12345678901234567890123456",
                "type": "api-keys",
                "attributes": {
                    "key_type": "ingest",
                    "name": "us-west-2 collectors key",
                    "disabled": false,
                    "permissions": {},
                    "timestamps": {},
                    "secret": "12345678901234567890123456789"
                },
                "relationships": {
                    "environment": {
                        "data": {
                            "id": "hxenv_12345678901234567890123456",
                            "type": "environments"
                        }
                    },
                    "creator": {
                        "data": {
                            "id": "x",
                            "type": "users"
                        }
                    },
                    "editor": {
                        "data": {
                            "id": "x",
                            "type": "users"
                        }
                    }
                },
                "links": {
                    "self": "/2/teams/my-team/api-keys/hcxik_12345678901234567890123456"
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "key_management",
        "accessor": "KeyManagement",
        "op": "load",
        "method": "GET",
        "path": "/2/teams/{teamSlug}/api-keys/{ID}",
        "args": [
            {
                "name": "id",
                "wire": "ID",
                "value": "p1"
            },
            {
                "name": "team_slug",
                "wire": "teamSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "id": "hcxik_12345678901234567890123456",
                "type": "api-keys",
                "attributes": {
                    "key_type": "ingest",
                    "name": "us-west-2 collectors key",
                    "disabled": false,
                    "permissions": {
                        "create_datasets": true
                    },
                    "timestamps": {
                        "created": "2022-09-22T17:32:11Z",
                        "updated": "2022-10-31T15:08:11Z"
                    }
                },
                "relationships": {
                    "environment": {
                        "data": {
                            "id": "hxenv_12345678901234567890123456",
                            "type": "environments"
                        }
                    },
                    "creator": {
                        "data": {
                            "id": "x",
                            "type": "users"
                        }
                    },
                    "editor": {
                        "data": {
                            "id": "x",
                            "type": "users"
                        }
                    }
                },
                "links": {
                    "self": "/2/teams/my-team/api-keys/hcxik_12345678901234567890123456"
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "key_management",
        "accessor": "KeyManagement",
        "op": "load",
        "method": "GET",
        "path": "/2/teams/{teamSlug}/api-keys",
        "args": [
            {
                "name": "team_slug",
                "wire": "teamSlug",
                "value": "p1"
            }
        ],
        "select": {
            "filter_type": "v1",
            "page_after": "eyxJjcmAVhdGVkX",
            "page_size": 10
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "page[after]",
            "page[size]",
            "filter[type]"
        ],
        "queryArgs": [
            {
                "name": "filter_type",
                "wire": "filter[type]"
            },
            {
                "name": "page_after",
                "wire": "page[after]"
            },
            {
                "name": "page_size",
                "wire": "page[size]"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "hcxik_12345678901234567890123456",
                    "type": "api-keys",
                    "attributes": {
                        "key_type": "ingest",
                        "name": "us-west-2 collectors key",
                        "disabled": false,
                        "permissions": {},
                        "timestamps": {}
                    },
                    "relationships": {
                        "environment": {
                            "data": {
                                "id": "hxenv_12345678901234567890123456",
                                "type": "environments"
                            }
                        },
                        "creator": {
                            "data": {}
                        },
                        "editor": {
                            "data": {}
                        }
                    },
                    "links": {
                        "self": "/2/teams/my-team/api-keys/hcxik_12345678901234567890123456"
                    }
                }
            ],
            "links": {
                "next": "/2/teams/my-team/api-keys?page[after]=3025fa645ad1100d&page[size]=10"
            }
        },
        "idField": "id"
    },
    {
        "entity": "key_management",
        "accessor": "KeyManagement",
        "op": "remove",
        "method": "DELETE",
        "path": "/2/teams/{teamSlug}/api-keys/{ID}",
        "args": [
            {
                "name": "id",
                "wire": "ID",
                "value": "p1"
            },
            {
                "name": "team_slug",
                "wire": "teamSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "key_management",
        "accessor": "KeyManagement",
        "op": "update",
        "method": "PATCH",
        "path": "/2/teams/{teamSlug}/api-keys/{ID}",
        "args": [
            {
                "name": "id",
                "wire": "ID",
                "value": "p1"
            },
            {
                "name": "team_slug",
                "wire": "teamSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "id": "hcxik_12345678901234567890123456",
                "type": "api-keys",
                "attributes": {
                    "key_type": "ingest",
                    "name": "us-west-2 collectors key",
                    "disabled": false,
                    "permissions": {
                        "create_datasets": true
                    },
                    "timestamps": {
                        "created": "2022-09-22T17:32:11Z",
                        "updated": "2022-10-31T15:08:11Z"
                    }
                },
                "relationships": {
                    "environment": {
                        "data": {
                            "id": "hxenv_12345678901234567890123456",
                            "type": "environments"
                        }
                    },
                    "creator": {
                        "data": {
                            "id": "x",
                            "type": "users"
                        }
                    },
                    "editor": {
                        "data": {
                            "id": "x",
                            "type": "users"
                        }
                    }
                },
                "links": {
                    "self": "/2/teams/my-team/api-keys/hcxik_12345678901234567890123456"
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "kinesi",
        "accessor": "Kinesi",
        "op": "create",
        "method": "POST",
        "path": "/1/kinesis_events/{datasetSlug}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_amz_firehose_request_id",
                "wire": "X-Amz-Firehose-Request-Id",
                "value": "33658b45-a8f1-4007-92e8-f601ae33db14"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "requestId": "x",
            "timestamp": 1,
            "errorMessage": "x"
        },
        "idField": "id"
    },
    {
        "entity": "map_dependency",
        "accessor": "MapDependency",
        "op": "create",
        "method": "POST",
        "path": "/1/maps/dependencies/requests",
        "args": [],
        "select": {
            "limit": 5000
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "request_id": "abc123",
            "status": "pending"
        },
        "idField": "id"
    },
    {
        "entity": "map_dependency",
        "accessor": "MapDependency",
        "op": "load",
        "method": "GET",
        "path": "/1/maps/dependencies/requests/{requestId}",
        "args": [
            {
                "name": "request_id",
                "wire": "requestId",
                "value": "p1"
            }
        ],
        "select": {
            "page_after": "eyxJjcmAVhdGVkX",
            "page_size": 10
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page[after]",
            "page[size]"
        ],
        "queryArgs": [
            {
                "name": "page_after",
                "wire": "page[after]"
            },
            {
                "name": "page_size",
                "wire": "page[size]"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "request_id": "abc123",
            "status": "ready",
            "dependencies": [
                {
                    "parent_node": {
                        "name": "user-service",
                        "type": "service"
                    },
                    "child_node": {
                        "name": "user-service",
                        "type": "service"
                    },
                    "call_count": 142
                }
            ],
            "links": {
                "next": "/2/teams/my-team/api-keys?page[after]=3025fa645ad1100d&page[size]=10"
            }
        },
        "idField": "id"
    },
    {
        "entity": "marker",
        "accessor": "Marker",
        "op": "create",
        "method": "POST",
        "path": "/1/markers/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "created_at": "2016-08-13T05:39:42Z",
            "updated_at": "2016-08-13T05:39:42Z",
            "start_time": 1471040808,
            "message": "backend deploy #123",
            "type": "deploy",
            "id": "d1c84ec0"
        },
        "idField": "id"
    },
    {
        "entity": "marker",
        "accessor": "Marker",
        "op": "load",
        "method": "GET",
        "path": "/1/markers/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "created_at": "2016-08-13T05:39:42Z",
                "updated_at": "2016-08-13T05:39:42Z",
                "start_time": 1471040808,
                "message": "backend deploy #123",
                "type": "deploy",
                "id": "d1c84ec0"
            },
            {
                "created_at": "2016-08-14T05:39:42Z",
                "updated_at": "2016-08-14T05:39:42Z",
                "start_time": 1471040808,
                "message": "frontend deploy #123",
                "type": "deploy",
                "id": "c2b52fa0"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "marker",
        "accessor": "Marker",
        "op": "remove",
        "method": "DELETE",
        "path": "/1/markers/{datasetSlug}/{markerId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "marker_id",
                "wire": "markerId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "created_at": "2016-08-13T05:39:42Z",
            "updated_at": "2016-08-13T05:39:42Z",
            "start_time": 1471040808,
            "message": "backend deploy #123",
            "type": "deploy",
            "id": "d1c84ec0"
        },
        "idField": "id"
    },
    {
        "entity": "marker",
        "accessor": "Marker",
        "op": "update",
        "method": "PUT",
        "path": "/1/markers/{datasetSlug}/{markerId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "marker_id",
                "wire": "markerId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "created_at": "2016-08-13T05:39:42Z",
            "updated_at": "2016-08-13T05:39:42Z",
            "start_time": 1471040808,
            "message": "backend deploy #123",
            "type": "deploy",
            "id": "d1c84ec0"
        },
        "idField": "id"
    },
    {
        "entity": "marker_setting",
        "accessor": "MarkerSetting",
        "op": "create",
        "method": "POST",
        "path": "/1/marker_settings/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "type": "deploy",
            "color": "#7b1fa2",
            "id": "gwAHiE5TS4j",
            "created_at": "2022-09-15T05:39:42Z",
            "updated_at": "2022-12-15T04:25:14Z"
        },
        "idField": "id"
    },
    {
        "entity": "marker_setting",
        "accessor": "MarkerSetting",
        "op": "load",
        "method": "GET",
        "path": "/1/marker_settings/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "type": "deploy",
                "color": "#7b1fa2",
                "id": "gwAHiE5TS4j",
                "created_at": "2022-09-15T05:39:42Z",
                "updated_at": "2022-12-15T04:25:14Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "marker_setting",
        "accessor": "MarkerSetting",
        "op": "remove",
        "method": "DELETE",
        "path": "/1/marker_settings/{datasetSlug}/{markerSettingId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "marker_setting_id",
                "wire": "markerSettingId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "type": "deploy",
            "color": "#7b1fa2",
            "id": "gwAHiE5TS4j",
            "created_at": "2022-09-15T05:39:42Z",
            "updated_at": "2022-12-15T04:25:14Z"
        },
        "idField": "id"
    },
    {
        "entity": "marker_setting",
        "accessor": "MarkerSetting",
        "op": "update",
        "method": "PUT",
        "path": "/1/marker_settings/{datasetSlug}/{markerSettingId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "marker_setting_id",
                "wire": "markerSettingId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "type": "deploy",
            "color": "#1fa297",
            "id": "gwAHiE5TS4j",
            "created_at": "2022-09-15T05:39:42Z",
            "updated_at": "2022-12-20T08:10:05Z"
        },
        "idField": "id"
    },
    {
        "entity": "query",
        "accessor": "Query",
        "op": "create",
        "method": "POST",
        "path": "/1/queries/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "abc3419d",
            "calculations": [
                {
                    "op": "COUNT"
                }
            ],
            "orders": [
                {
                    "op": "COUNT",
                    "order": "descending"
                }
            ],
            "time_range": 7200
        },
        "idField": "id"
    },
    {
        "entity": "query",
        "accessor": "Query",
        "op": "load",
        "method": "GET",
        "path": "/1/queries/{datasetSlug}/{queryId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "query_id",
                "wire": "queryId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "abc3419d",
            "breakdowns": [
                "user_agent"
            ],
            "calculations": [
                {
                    "op": "COUNT"
                }
            ],
            "orders": [
                {
                    "op": "COUNT",
                    "order": "descending"
                }
            ],
            "limit": 10,
            "time_range": 7200,
            "end_time": 1676467828
        },
        "idField": "id"
    },
    {
        "entity": "query_annotation",
        "accessor": "QueryAnnotation",
        "op": "create",
        "method": "POST",
        "path": "/1/query_annotations/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "name": "My Named Query",
            "description": "A nice description of My Named Query",
            "query_id": "mabAMpSPDjH",
            "id": "sGUnkBHgRFN",
            "created_at": "2022-10-26T21:36:04Z",
            "updated_at": "2022-12-04T08:14:26Z",
            "source": "query"
        },
        "idField": "id"
    },
    {
        "entity": "query_annotation",
        "accessor": "QueryAnnotation",
        "op": "load",
        "method": "GET",
        "path": "/1/query_annotations/{datasetSlug}/{queryAnnotationId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "query_annotation_id",
                "wire": "queryAnnotationId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "name": "My Named Query",
            "description": "A nice description of My Named Query",
            "query_id": "mabAMpSPDjH",
            "id": "sGUnkBHgRFN",
            "created_at": "2022-10-26T21:36:04Z",
            "updated_at": "2022-12-04T08:14:26Z",
            "source": "query"
        },
        "idField": "id"
    },
    {
        "entity": "query_annotation",
        "accessor": "QueryAnnotation",
        "op": "load",
        "method": "GET",
        "path": "/1/query_annotations/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {
            "include_board_annotation": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "include_board_annotations"
        ],
        "queryArgs": [
            {
                "name": "include_board_annotation",
                "wire": "include_board_annotations"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "name": "My Named Query",
                "description": "A nice description of My Named Query",
                "query_id": "mabAMpSPDjH",
                "id": "sGUnkBHgRFN",
                "created_at": "2022-10-26T21:36:04Z",
                "updated_at": "2022-12-04T08:14:26Z",
                "source": "query"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "query_annotation",
        "accessor": "QueryAnnotation",
        "op": "remove",
        "method": "DELETE",
        "path": "/1/query_annotations/{datasetSlug}/{queryAnnotationId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "query_annotation_id",
                "wire": "queryAnnotationId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "query_annotation",
        "accessor": "QueryAnnotation",
        "op": "update",
        "method": "PUT",
        "path": "/1/query_annotations/{datasetSlug}/{queryAnnotationId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "query_annotation_id",
                "wire": "queryAnnotationId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "name": "My Updated Annotation",
            "description": "A nice description of My Update Annotation",
            "query_id": "mabAMpSPDjH"
        },
        "idField": "id"
    },
    {
        "entity": "query_result",
        "accessor": "QueryResult",
        "op": "create",
        "method": "POST",
        "path": "/1/query_results/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "query": {
                "calculations": [
                    {
                        "op": "COUNT"
                    }
                ],
                "orders": [
                    {
                        "op": "COUNT",
                        "order": "descending"
                    }
                ],
                "limit": 10000,
                "time_range": 7200
            },
            "complete": false,
            "id": "dfg456",
            "links": {
                "query_url": "https://ui.honeycomb.io/myteam/datasets/test-via-curl/result/dfg456",
                "graph_image_url": "https://ui.honeycomb.io/myteam/datasets/test-via-curl/result/dfg456/snapshot"
            }
        },
        "idField": "id"
    },
    {
        "entity": "query_result",
        "accessor": "QueryResult",
        "op": "load",
        "method": "GET",
        "path": "/1/query_results/{datasetSlug}/{queryResultId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "query_result_id",
                "wire": "queryResultId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "query": {
                "calculations": [
                    {
                        "op": "COUNT"
                    }
                ],
                "orders": [
                    {
                        "op": "COUNT",
                        "order": "descending"
                    }
                ],
                "limit": 10000,
                "time_range": 7200
            },
            "complete": true,
            "id": "dfg456",
            "data": {
                "series": [],
                "results": [
                    {
                        "data": {
                            "COUNT": 20769
                        }
                    }
                ]
            },
            "links": {
                "query_url": "https://ui.honeycomb.io/myteam/datasets/test-via-curl/result/dfg456",
                "graph_image_url": "https://ui.honeycomb.io/myteam/datasets/test-via-curl/result/dfg456/snapshot"
            }
        },
        "idField": "id"
    },
    {
        "entity": "recipient",
        "accessor": "Recipient",
        "op": "create",
        "method": "POST",
        "path": "/1/recipients",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "yUheCUmgZ8p",
            "created_at": "2022-07-26T22:38:04Z",
            "updated_at": "2022-07-26T22:38:04Z",
            "type": "pagerduty",
            "details": {
                "pagerduty_integration_name": "Example PagerDuty Service",
                "pagerduty_integration_key": "7zOwh1edS8xHGcwfb2bA4sqY8E6PJzSK"
            }
        },
        "idField": "id"
    },
    {
        "entity": "recipient",
        "accessor": "Recipient",
        "op": "list",
        "method": "GET",
        "path": "/1/recipients",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "yUheCUmgZ8p",
                "created_at": "2022-07-26T22:38:04Z",
                "updated_at": "2022-07-26T22:38:04Z",
                "type": "pagerduty",
                "details": {
                    "pagerduty_integration_name": "Example PagerDuty Service",
                    "pagerduty_integration_key": "7zOwh1edS8xHGcwfb2bA4sqY8E6PJzSK"
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "recipient",
        "accessor": "Recipient",
        "op": "load",
        "method": "GET",
        "path": "/1/recipients/{recipientId}",
        "args": [
            {
                "name": "id",
                "wire": "recipientId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "yUheCUmgZ8p",
            "created_at": "2022-07-26T22:38:04Z",
            "updated_at": "2022-07-26T22:38:04Z",
            "type": "pagerduty",
            "details": {
                "pagerduty_integration_name": "Example PagerDuty Service",
                "pagerduty_integration_key": "7zOwh1edS8xHGcwfb2bA4sqY8E6PJzSK"
            }
        },
        "idField": "id"
    },
    {
        "entity": "recipient",
        "accessor": "Recipient",
        "op": "remove",
        "method": "DELETE",
        "path": "/1/recipients/{recipientId}",
        "args": [
            {
                "name": "id",
                "wire": "recipientId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "recipient",
        "accessor": "Recipient",
        "op": "update",
        "method": "PUT",
        "path": "/1/recipients/{recipientId}",
        "args": [
            {
                "name": "id",
                "wire": "recipientId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "yUheCUmgZ8p",
            "created_at": "2022-07-26T22:38:04Z",
            "updated_at": "2022-07-26T22:38:04Z",
            "type": "pagerduty",
            "details": {
                "pagerduty_integration_name": "Example PagerDuty Service",
                "pagerduty_integration_key": "7zOwh1edS8xHGcwfb2bA4sqY8E6PJzSK"
            }
        },
        "idField": "id"
    },
    {
        "entity": "signal",
        "accessor": "Signal",
        "op": "list",
        "method": "GET",
        "path": "/1/signals",
        "args": [],
        "select": {
            "currently_anomalous": "v1",
            "dataset_slug": "checkout-api",
            "measured_signal": "error_rate",
            "page_after": "eyxJjcmAVhdGVkX",
            "page_size": 10,
            "service_name": "checkout-api",
            "status": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page[after]",
            "page[size]",
            "service_name",
            "dataset_slug",
            "measured_signal",
            "status",
            "currently_anomalous"
        ],
        "queryArgs": [
            {
                "name": "currently_anomalous",
                "wire": "currently_anomalous"
            },
            {
                "name": "dataset_slug",
                "wire": "dataset_slug"
            },
            {
                "name": "measured_signal",
                "wire": "measured_signal"
            },
            {
                "name": "page_after",
                "wire": "page[after]"
            },
            {
                "name": "page_size",
                "wire": "page[size]"
            },
            {
                "name": "service_name",
                "wire": "service_name"
            },
            {
                "name": "status",
                "wire": "status"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "signals": [
                {
                    "id": "hcasp_01j9x1yq0k2t8m9n3v4b5r6c7d",
                    "service_name": "checkout-api",
                    "dataset_slug": "checkout-api",
                    "environment_slug": "production",
                    "measured_signal": "error_rate",
                    "enabled": true,
                    "status": "normal",
                    "sensitivity": "medium",
                    "auto_investigate": false,
                    "currently_anomalous": false,
                    "last_anomaly_started_at": 1741089600,
                    "last_anomaly_ended_at": 1741093200,
                    "created_at": "2025-02-14T17:32:11Z",
                    "updated_at": "2025-03-01T10:04:22Z"
                }
            ],
            "links": {
                "next": "/2/teams/my-team/api-keys?page[after]=3025fa645ad1100d&page[size]=10"
            }
        },
        "idField": "id"
    },
    {
        "entity": "signal",
        "accessor": "Signal",
        "op": "load",
        "method": "GET",
        "path": "/1/signals/{signalId}",
        "args": [
            {
                "name": "id",
                "wire": "signalId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "hcasp_01j9x1yq0k2t8m9n3v4b5r6c7d",
            "service_name": "checkout-api",
            "dataset_slug": "checkout-api",
            "environment_slug": "production",
            "measured_signal": "error_rate",
            "enabled": true,
            "status": "normal",
            "sensitivity": "medium",
            "auto_investigate": false,
            "currently_anomalous": false,
            "last_anomaly_started_at": 1741089600,
            "last_anomaly_ended_at": 1741093200,
            "created_at": "2025-02-14T17:32:11Z",
            "updated_at": "2025-03-01T10:04:22Z",
            "recipients": [
                {
                    "id": "hcar_01jak3ymk8s5cpc2xz3q7d8v9r",
                    "type": "pagerduty",
                    "details": {
                        "pagerduty_severity": "critical",
                        "muted": false
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "signal",
        "accessor": "Signal",
        "op": "update",
        "method": "PUT",
        "path": "/1/signals/{signalId}",
        "args": [
            {
                "name": "id",
                "wire": "signalId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "hcasp_01j9x1yq0k2t8m9n3v4b5r6c7d",
            "service_name": "checkout-api",
            "dataset_slug": "checkout-api",
            "environment_slug": "production",
            "measured_signal": "error_rate",
            "enabled": true,
            "status": "normal",
            "sensitivity": "medium",
            "auto_investigate": false,
            "currently_anomalous": false,
            "last_anomaly_started_at": 1741089600,
            "last_anomaly_ended_at": 1741093200,
            "created_at": "2025-02-14T17:32:11Z",
            "updated_at": "2025-03-01T10:04:22Z",
            "recipients": [
                {
                    "id": "hcar_01jak3ymk8s5cpc2xz3q7d8v9r",
                    "type": "pagerduty",
                    "details": {
                        "pagerduty_severity": "critical",
                        "muted": false
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "slo",
        "accessor": "Slo",
        "op": "create",
        "method": "POST",
        "path": "/1/slos/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "x",
            "name": "My SLO",
            "description": "SLO to ensure requests succeed and are fast",
            "sli": {
                "alias": "error_sli"
            },
            "time_period_days": 30,
            "target_per_million": 990000,
            "tags": [
                {
                    "key": "team",
                    "value": "blue"
                }
            ],
            "reset_at": "2022-011-11T09:53:04Z",
            "created_at": "2022-09-22T17:32:11Z",
            "updated_at": "2022-10-31T15:08:11Z",
            "dataset_slugs": [
                "mydataset1",
                "mydataset2"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "slo",
        "accessor": "Slo",
        "op": "load",
        "method": "GET",
        "path": "/1/slos/{datasetSlug}/{sloId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "slo_id",
                "wire": "sloId",
                "value": "p2"
            }
        ],
        "select": {
            "detailed": ""
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "detailed"
        ],
        "queryArgs": [
            {
                "name": "detailed",
                "wire": "detailed"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "bZ1aRHAUsjG",
            "name": "My SLO",
            "description": "My SLO description",
            "sli": {
                "alias": "my-sli"
            },
            "time_period_days": 30,
            "target_per_million": 989900,
            "reset_at": "2022-10-15T13:53:11Z",
            "created_at": "2022-09-15T05:39:42Z",
            "updated_at": "2022-12-20T08:10:05Z",
            "dataset_slugs": [
                "mydataset1"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "slo",
        "accessor": "Slo",
        "op": "load",
        "method": "GET",
        "path": "/1/slos/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "x",
                "name": "My SLO",
                "description": "SLO to ensure requests succeed and are fast",
                "sli": {
                    "alias": "error_sli"
                },
                "time_period_days": 30,
                "target_per_million": 990000,
                "tags": [
                    {
                        "key": "team",
                        "value": "blue"
                    }
                ],
                "reset_at": "2022-011-11T09:53:04Z",
                "created_at": "2022-09-22T17:32:11Z",
                "updated_at": "2022-10-31T15:08:11Z",
                "dataset_slugs": [
                    "mydataset1",
                    "mydataset2"
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "slo",
        "accessor": "Slo",
        "op": "remove",
        "method": "DELETE",
        "path": "/1/slos/{datasetSlug}/{sloId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "slo_id",
                "wire": "sloId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "slo",
        "accessor": "Slo",
        "op": "update",
        "method": "PUT",
        "path": "/1/slos/{datasetSlug}/{sloId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "slo_id",
                "wire": "sloId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "name": "My SLO",
            "description": "SLO to ensure requests succeed and are fast",
            "sli": {
                "alias": "error_sli"
            },
            "time_period_days": 30,
            "target_per_million": 990000,
            "tags": [
                {
                    "key": "team",
                    "value": "blue"
                }
            ],
            "reset_at": "2022-011-11T09:53:04Z",
            "created_at": "2022-09-22T17:32:11Z",
            "updated_at": "2022-10-31T15:08:11Z",
            "dataset_slugs": [
                "mydataset1",
                "mydataset2"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "slo_count",
        "accessor": "SloCount",
        "op": "list",
        "method": "GET",
        "path": "/1/slos/{datasetSlug}/{sloId}/counts",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "slo_id",
                "wire": "sloId",
                "value": "p2"
            }
        ],
        "select": {
            "end_time": 1745254740,
            "start_time": 1745251200
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "start_time",
            "end_time"
        ],
        "queryArgs": [
            {
                "name": "end_time",
                "wire": "end_time"
            },
            {
                "name": "start_time",
                "wire": "start_time"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "slo_id": "bZ1aRHAUsjG",
            "resolution_seconds": 60,
            "epoch": "a3f9c2d1e8b74056",
            "period_start": 1745251200,
            "windows": [
                {
                    "window_start": 1745251200,
                    "window_end": 1745251260,
                    "total_count": 1243,
                    "error_count": 3,
                    "is_partial": false
                },
                {
                    "window_start": 1745251260,
                    "window_end": 1745251320,
                    "total_count": 1188,
                    "error_count": 1,
                    "is_partial": false
                },
                {
                    "window_start": 1745251320,
                    "window_end": 1745251380,
                    "total_count": 1301,
                    "error_count": 0,
                    "is_partial": true
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "slo_history",
        "accessor": "SloHistory",
        "op": "create",
        "method": "POST",
        "path": "/1/reporting/slos/historical",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "2LBq9LckbcA": [
                {
                    "timestamp": 1744650000,
                    "compliance": 91.44851657940663,
                    "budget_remaining": 14.48516579406632
                },
                {
                    "timestamp": 1744653600,
                    "compliance": 97.98746514671242,
                    "budget_remaining": 88.13453467953423
                }
            ],
            "CzcpPs7cJ4d": [
                {
                    "timestamp": 1744650000,
                    "compliance": 93.53414567784128,
                    "budget_remaining": -71.02966841186735
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "slo_hourly_count",
        "accessor": "SloHourlyCount",
        "op": "list",
        "method": "GET",
        "path": "/1/slos/{datasetSlug}/{sloId}/counts/history",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "slo_id",
                "wire": "sloId",
                "value": "p2"
            }
        ],
        "select": {
            "end_time": 1745254800,
            "start_time": 1745168400
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "start_time",
            "end_time"
        ],
        "queryArgs": [
            {
                "name": "end_time",
                "wire": "end_time"
            },
            {
                "name": "start_time",
                "wire": "start_time"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "slo_id": "bZ1aRHAUsjG",
            "resolution_seconds": 3600,
            "buckets": [
                {
                    "start_time": 1745168400,
                    "end_time": 1745172000,
                    "total_count": 74520,
                    "error_count": 182,
                    "is_partial": false
                },
                {
                    "start_time": 1745172000,
                    "end_time": 1745175600,
                    "total_count": 71043,
                    "error_count": 97,
                    "is_partial": false
                },
                {
                    "start_time": 1745251200,
                    "end_time": 1745254800,
                    "total_count": 12300,
                    "error_count": 14,
                    "is_partial": true
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "trigger",
        "accessor": "Trigger",
        "op": "create",
        "method": "POST",
        "path": "/1/triggers/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "x",
            "dataset_slug": "x",
            "name": "x",
            "description": "x",
            "tags": [
                {
                    "key": "team",
                    "value": "blue"
                }
            ],
            "threshold": {
                "op": ">",
                "value": 1,
                "exceeded_limit": 1
            },
            "frequency": 1,
            "alert_type": "on_change",
            "disabled": true,
            "triggered": true,
            "recipients": [
                {
                    "id": "x",
                    "type": "pagerduty",
                    "target": "x",
                    "details": {},
                    "group_filter": {},
                    "pagerduty_per_group_incidents": true
                }
            ],
            "evaluation_schedule_type": "frequency",
            "evaluation_schedule": {
                "window": {
                    "days_of_week": [
                        "sunday"
                    ],
                    "start_time": 840,
                    "end_time": 1260
                }
            },
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
            "baseline_details": {
                "offset_minutes": 60,
                "type": "percentage"
            },
            "auto_investigate": false,
            "query": {},
            "query_id": "x"
        },
        "idField": "id"
    },
    {
        "entity": "trigger",
        "accessor": "Trigger",
        "op": "list",
        "method": "GET",
        "path": "/1/recipients/{recipientId}/triggers",
        "args": [
            {
                "name": "recipient_id",
                "wire": "recipientId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "x",
                "dataset_slug": "x",
                "name": "x",
                "description": "x",
                "tags": [
                    {
                        "key": "team",
                        "value": "blue"
                    }
                ],
                "threshold": {
                    "op": ">",
                    "value": 1,
                    "exceeded_limit": 1
                },
                "frequency": 1,
                "alert_type": "on_change",
                "disabled": true,
                "triggered": true,
                "recipients": [
                    {}
                ],
                "evaluation_schedule_type": "frequency",
                "evaluation_schedule": {
                    "window": {
                        "days_of_week": [],
                        "start_time": 840,
                        "end_time": 1260
                    }
                },
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z",
                "baseline_details": {
                    "offset_minutes": 60,
                    "type": "percentage"
                },
                "auto_investigate": false,
                "query": {},
                "query_id": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "trigger",
        "accessor": "Trigger",
        "op": "load",
        "method": "GET",
        "path": "/1/triggers/{datasetSlug}/{triggerId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "trigger_id",
                "wire": "triggerId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "dataset_slug": "x",
            "name": "x",
            "description": "x",
            "tags": [
                {
                    "key": "team",
                    "value": "blue"
                }
            ],
            "threshold": {
                "op": ">",
                "value": 1,
                "exceeded_limit": 1
            },
            "frequency": 1,
            "alert_type": "on_change",
            "disabled": true,
            "triggered": true,
            "recipients": [
                {
                    "id": "x",
                    "type": "pagerduty",
                    "target": "x",
                    "details": {},
                    "group_filter": {},
                    "pagerduty_per_group_incidents": true
                }
            ],
            "evaluation_schedule_type": "frequency",
            "evaluation_schedule": {
                "window": {
                    "days_of_week": [
                        "sunday"
                    ],
                    "start_time": 840,
                    "end_time": 1260
                }
            },
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
            "baseline_details": {
                "offset_minutes": 60,
                "type": "percentage"
            },
            "auto_investigate": false,
            "query": {},
            "query_id": "x"
        },
        "idField": "id"
    },
    {
        "entity": "trigger",
        "accessor": "Trigger",
        "op": "load",
        "method": "GET",
        "path": "/1/triggers/{datasetSlug}",
        "args": [
            {
                "name": "id",
                "wire": "datasetSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "x",
                "dataset_slug": "x",
                "name": "x",
                "description": "x",
                "tags": [
                    {
                        "key": "team",
                        "value": "blue"
                    }
                ],
                "threshold": {
                    "op": ">",
                    "value": 1,
                    "exceeded_limit": 1
                },
                "frequency": 1,
                "alert_type": "on_change",
                "disabled": true,
                "triggered": true,
                "recipients": [
                    {}
                ],
                "evaluation_schedule_type": "frequency",
                "evaluation_schedule": {
                    "window": {
                        "days_of_week": [],
                        "start_time": 840,
                        "end_time": 1260
                    }
                },
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z",
                "baseline_details": {
                    "offset_minutes": 60,
                    "type": "percentage"
                },
                "auto_investigate": false,
                "query": {},
                "query_id": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "trigger",
        "accessor": "Trigger",
        "op": "remove",
        "method": "DELETE",
        "path": "/1/triggers/{datasetSlug}/{triggerId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "trigger_id",
                "wire": "triggerId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "trigger",
        "accessor": "Trigger",
        "op": "update",
        "method": "PUT",
        "path": "/1/triggers/{datasetSlug}/{triggerId}",
        "args": [
            {
                "name": "dataset_slug",
                "wire": "datasetSlug",
                "value": "p1"
            },
            {
                "name": "trigger_id",
                "wire": "triggerId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-honeycomb-team"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "dataset_slug": "x",
            "name": "x",
            "description": "x",
            "tags": [
                {
                    "key": "team",
                    "value": "blue"
                }
            ],
            "threshold": {
                "op": ">",
                "value": 1,
                "exceeded_limit": 1
            },
            "frequency": 1,
            "alert_type": "on_change",
            "disabled": true,
            "triggered": true,
            "recipients": [
                {
                    "id": "x",
                    "type": "pagerduty",
                    "target": "x",
                    "details": {},
                    "group_filter": {},
                    "pagerduty_per_group_incidents": true
                }
            ],
            "evaluation_schedule_type": "frequency",
            "evaluation_schedule": {
                "window": {
                    "days_of_week": [
                        "sunday"
                    ],
                    "start_time": 840,
                    "end_time": 1260
                }
            },
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
            "baseline_details": {
                "offset_minutes": 60,
                "type": "percentage"
            },
            "auto_investigate": false,
            "query": {},
            "query_id": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map
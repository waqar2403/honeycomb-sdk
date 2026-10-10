# Honeycomb SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Honeycomb",
            "slug": "honeycomb",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.honeycomb.io",
            "auth": {
                "prefix": "",
                "name": "X-Honeycomb-Team",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "api_key": {},
                "auth": {},
                "board": {},
                "board_view": {},
                "bulk_signal_recipient_assignment": {},
                "burn_alert": {},
                "calculated_field": {},
                "column": {},
                "dataset": {},
                "dataset_definition": {},
                "environment": {},
                "event": {},
                "historical_anomaly": {},
                "kinesis_event": {},
                "management_auth": {},
                "map_dependency": {},
                "marker": {},
                "marker_setting": {},
                "query": {},
                "query_annotation": {},
                "query_result": {},
                "recipient": {},
                "signal": {},
                "slo": {},
                "slo_count": {},
                "slo_history": {},
                "slo_hourly_count": {},
                "trigger": {},
            },
        },
        "entity": {
      "api_key": {
        "fields": [
          {
            "name": "data",
            "title": "Data",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "api_key",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/2/teams/{teamSlug}/api-keys",
                "segments": [
                  {
                    "lit": "2",
                  },
                  {
                    "lit": "teams",
                  },
                  {
                    "var": "team_slug",
                  },
                  {
                    "lit": "api-keys",
                  },
                ],
                "parts": [
                  "2",
                  "teams",
                  "{team_slug}",
                  "api-keys",
                ],
                "rename": {
                  "param": {
                    "teamSlug": "team_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "team_slug",
                      "orig": "teamSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "team_slug",
                  ],
                },
                "body": {
                  "kind": "json",
                  "media": "application/vnd.api+json",
                },
                "response": {
                  "kind": "json",
                  "media": "application/vnd.api+json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/2/teams/{teamSlug}/api-keys",
                "segments": [
                  {
                    "lit": "2",
                  },
                  {
                    "lit": "teams",
                  },
                  {
                    "var": "team_slug",
                  },
                  {
                    "lit": "api-keys",
                  },
                ],
                "parts": [
                  "2",
                  "teams",
                  "{team_slug}",
                  "api-keys",
                ],
                "rename": {
                  "param": {
                    "teamSlug": "team_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "team_slug",
                      "orig": "teamSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "filter_type",
                      "orig": "filter[type]",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "page_after",
                      "orig": "page[after]",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "eyxJjcmAVhdGVkX",
                    },
                    {
                      "name": "page_size",
                      "orig": "page[size]",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 10,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "team_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/vnd.api+json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/2/teams/{teamSlug}/api-keys/{ID}",
                "segments": [
                  {
                    "lit": "2",
                  },
                  {
                    "lit": "teams",
                  },
                  {
                    "var": "team_slug",
                  },
                  {
                    "lit": "api-keys",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "2",
                  "teams",
                  "{team_slug}",
                  "api-keys",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ID": "id",
                    "teamSlug": "team_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "ID",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "team_slug",
                      "orig": "teamSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "team_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/vnd.api+json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/2/teams/{teamSlug}/api-keys/{ID}",
                "segments": [
                  {
                    "lit": "2",
                  },
                  {
                    "lit": "teams",
                  },
                  {
                    "var": "team_slug",
                  },
                  {
                    "lit": "api-keys",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "2",
                  "teams",
                  "{team_slug}",
                  "api-keys",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ID": "id",
                    "teamSlug": "team_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "ID",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "team_slug",
                      "orig": "teamSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "team_slug",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/2/teams/{teamSlug}/api-keys/{ID}",
                "segments": [
                  {
                    "lit": "2",
                  },
                  {
                    "lit": "teams",
                  },
                  {
                    "var": "team_slug",
                  },
                  {
                    "lit": "api-keys",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "2",
                  "teams",
                  "{team_slug}",
                  "api-keys",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ID": "id",
                    "teamSlug": "team_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "ID",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "team_slug",
                      "orig": "teamSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "team_slug",
                  ],
                },
                "body": {
                  "kind": "json",
                  "media": "application/vnd.api+json",
                },
                "response": {
                  "kind": "json",
                  "media": "application/vnd.api+json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "auth": {
        "fields": [
          {
            "name": "api_key_access",
            "title": "Api Key Access",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "environment",
            "title": "Environment",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique identifier (ID) of the API Key.",
          },
          {
            "name": "team",
            "title": "Team",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
            "short": "The type of API Key.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "auth",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/auth",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "auth",
                  },
                ],
                "parts": [
                  "1",
                  "auth",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "board": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "A description of the Board.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier (ID), returned in response bodies.",
            "readOnly": True,
          },
          {
            "name": "layout_generation",
            "title": "Layout Generation",
            "type": "`$STRING`",
            "short": "The layout generation mode for the board.",
            "writeOnly": True,
          },
          {
            "name": "links",
            "title": "Links",
            "type": "`$OBJECT`",
            "readOnly": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The name of the Board.",
          },
          {
            "name": "panels",
            "title": "Panels",
            "type": "`$ARRAY`",
          },
          {
            "name": "preset_filters",
            "title": "Preset Filters",
            "type": "`$ARRAY`",
            "short": "A list of preset filters to apply to the board.",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
            "short": "A list of key-value pairs to help identify the Trigger.",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
            "short": "The type of the board.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "board",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/boards",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "boards",
                  },
                ],
                "parts": [
                  "1",
                  "boards",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/boards",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "boards",
                  },
                ],
                "parts": [
                  "1",
                  "boards",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/boards/{boardId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "boards",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "boards",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "boardId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "boardId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/1/boards/{boardId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "boards",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "boards",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "boardId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "boardId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/1/boards/{boardId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "boards",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "boards",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "boardId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "boardId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "board_view": {
        "fields": [
          {
            "name": "filters",
            "title": "Filters",
            "type": "`$ARRAY`",
            "op": {
              "create": {
                "req": True,
                "type": "`$ARRAY`",
              },
              "update": {
                "req": True,
                "type": "`$ARRAY`",
              },
            },
            "short": "The filters to apply to this view.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the board view.",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The name of the view.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "board_view",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/boards/{boardId}/views",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "boards",
                  },
                  {
                    "var": "board_id",
                  },
                  {
                    "lit": "views",
                  },
                ],
                "parts": [
                  "1",
                  "boards",
                  "{board_id}",
                  "views",
                ],
                "rename": {
                  "param": {
                    "boardId": "board_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "board_id",
                      "orig": "boardId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "board_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/boards/{boardId}/views",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "boards",
                  },
                  {
                    "var": "board_id",
                  },
                  {
                    "lit": "views",
                  },
                ],
                "parts": [
                  "1",
                  "boards",
                  "{board_id}",
                  "views",
                ],
                "rename": {
                  "param": {
                    "boardId": "board_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "board_id",
                      "orig": "boardId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "board_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/boards/{boardId}/views/{viewId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "boards",
                  },
                  {
                    "var": "board_id",
                  },
                  {
                    "lit": "views",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "boards",
                  "{board_id}",
                  "views",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "boardId": "board_id",
                    "viewId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "board_id",
                      "orig": "boardId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "viewId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "board_id",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/1/boards/{boardId}/views/{viewId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "boards",
                  },
                  {
                    "var": "board_id",
                  },
                  {
                    "lit": "views",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "boards",
                  "{board_id}",
                  "views",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "boardId": "board_id",
                    "viewId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "board_id",
                      "orig": "boardId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "viewId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "board_id",
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/1/boards/{boardId}/views/{viewId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "boards",
                  },
                  {
                    "var": "board_id",
                  },
                  {
                    "lit": "views",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "boards",
                  "{board_id}",
                  "views",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "boardId": "board_id",
                    "viewId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "board_id",
                      "orig": "boardId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "viewId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "board_id",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.board",
            ],
          ],
        },
      },
      "bulk_signal_recipient_assignment": {
        "fields": [
          {
            "name": "failed",
            "title": "Failed",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The Signals that were not updated, each with the reason.",
          },
          {
            "name": "recipients",
            "title": "Recipients",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The Recipients to assign to every selected Signal.",
          },
          {
            "name": "selector",
            "title": "Selector",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Chooses which Signals to act on.",
          },
          {
            "name": "succeeded",
            "title": "Succeeded",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The Signals whose Recipient set was updated.",
          },
          {
            "name": "unchanged",
            "title": "Unchanged",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The Signals that already had every requested Recipient.",
          },
        ],
        "name": "bulk_signal_recipient_assignment",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/signals/recipient_assignments",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "signals",
                  },
                  {
                    "lit": "recipient_assignments",
                  },
                ],
                "parts": [
                  "1",
                  "signals",
                  "recipient_assignments",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "burn_alert": {
        "fields": [
          {
            "name": "alert_type",
            "title": "Alert Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
          "parts": [
            "dataset_slug",
            "id",
          ],
          "sep": "/",
        },
        "name": "burn_alert",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/burn_alerts/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "burn_alerts",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "burn_alerts",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/burn_alerts/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "burn_alerts",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "burn_alerts",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "slo_id",
                      "orig": "slo_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "slo_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/burn_alerts/{datasetSlug}/{burnAlertId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "burn_alerts",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "burn_alerts",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "burnAlertId": "id",
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "burnAlertId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/1/burn_alerts/{datasetSlug}/{burnAlertId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "burn_alerts",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "burn_alerts",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "burnAlertId": "id",
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "burnAlertId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/1/burn_alerts/{datasetSlug}/{burnAlertId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "burn_alerts",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "burn_alerts",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "burnAlertId": "id",
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "burnAlertId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "calculated_field": {
        "fields": [
          {
            "name": "alias",
            "title": "Alias",
            "type": "`$STRING`",
            "req": True,
            "short": "The human-readable name of the Calculated Field (also called Derived Column), as it will be referenced when building queries.",
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "short": "ISO8601 formatted time when the field was created.",
            "readOnly": True,
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "A human-readable description for the Calculated Field that displays in the UI.",
          },
          {
            "name": "expression",
            "title": "Expression",
            "type": "`$STRING`",
            "req": True,
            "short": "The expression to evaluate to construct this Calculated Field's value.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique identifier (ID), returned in response bodies.",
            "readOnly": True,
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "req": True,
            "short": "ISO8601 formatted time when the field was updated.",
            "readOnly": True,
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "id": "id",
          },
          "name": "id",
          "parts": [
            "dataset_slug",
            "id",
          ],
          "sep": "/",
        },
        "name": "calculated_field",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/derived_columns/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "derived_columns",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "derived_columns",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/derived_columns/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "derived_columns",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "derived_columns",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "alia",
                      "orig": "alias",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/derived_columns/{datasetSlug}/{derivedColumnId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "derived_columns",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "derived_columns",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "derivedColumnId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "derivedColumnId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/1/derived_columns/{datasetSlug}/{derivedColumnId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "derived_columns",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "derived_columns",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "derivedColumnId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "derivedColumnId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/1/derived_columns/{datasetSlug}/{derivedColumnId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "derived_columns",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "derived_columns",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "derivedColumnId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "derivedColumnId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "column": {
        "fields": [
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "ISO8601 formatted time the column was created.",
            "readOnly": True,
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Column description.",
          },
          {
            "name": "hidden",
            "title": "Hidden",
            "type": "`$BOOLEAN`",
            "short": "If `true`, the column is excluded from autocomplete and raw data field lists.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier (ID), returned in response bodies.",
            "readOnly": True,
          },
          {
            "name": "key_name",
            "title": "Key Name",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "list": {
                "type": "`$STRING`",
              },
            },
            "short": "Name of the Column.",
            "readOnly": True,
          },
          {
            "name": "last_written",
            "title": "Last Written",
            "type": "`$STRING`",
            "short": "ISO8601 formatted time the column was last written to (received event data).",
            "readOnly": True,
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "Type of data that the Column will contain.",
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "ISO8601 formatted time the column was updated.",
            "readOnly": True,
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "id": "id",
          },
          "name": "id",
          "parts": [
            "dataset_slug",
            "id",
          ],
          "sep": "/",
        },
        "name": "column",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/columns/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "columns",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "columns",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/columns/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "columns",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "columns",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "key_name",
                      "orig": "key_name",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/columns/{datasetSlug}/{columnId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "columns",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "columns",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "columnId": "id",
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "columnId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/1/columns/{datasetSlug}/{columnId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "columns",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "columns",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "columnId": "id",
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "columnId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/1/columns/{datasetSlug}/{columnId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "columns",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "columns",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "columnId": "id",
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "columnId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "dataset": {
        "fields": [
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "The ISO8601-formatted time when the dataset was created.",
            "readOnly": True,
          },
          {
            "name": "dataset_type",
            "title": "Dataset Type",
            "type": "`$STRING`",
            "short": "The type of data contained in the dataset.",
            "readOnly": True,
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "op": {
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "A description for the dataset.",
          },
          {
            "name": "expand_json_depth",
            "title": "Expand Json Depth",
            "type": "`$INTEGER`",
            "op": {
              "update": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
            "short": "The maximum unpacking depth of nested JSON fields.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "last_written_at",
            "title": "Last Written At",
            "type": [
              "`$ONE`",
              [
                "`$NULL`",
                "`$STRING`",
              ],
            ],
            "short": "The ISO8601-formatted time when the dataset last received event data.",
            "readOnly": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The name of the dataset.",
          },
          {
            "name": "regular_columns_count",
            "title": "Regular Columns Count",
            "type": [
              "`$ONE`",
              [
                "`$NULL`",
                "`$INTEGER`",
              ],
            ],
            "short": "The total number of unique fields for this Dataset.",
            "readOnly": True,
          },
          {
            "name": "settings",
            "title": "Settings",
            "type": "`$OBJECT`",
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "short": "The 'slug' of the dataset to be used in URLs.",
            "readOnly": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "dataset",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/datasets",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "datasets",
                  },
                ],
                "parts": [
                  "1",
                  "datasets",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/datasets",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "datasets",
                  },
                ],
                "parts": [
                  "1",
                  "datasets",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/datasets/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "datasets",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "datasets",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/1/datasets/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "datasets",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "datasets",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/1/datasets/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "datasets",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "datasets",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "dataset_definition": {
        "fields": [
          {
            "name": "annotation_type",
            "title": "Annotation Type",
            "type": "`$ANY`",
            "short": "Metadata: Annotation Type - The type of span annotation.",
          },
          {
            "name": "duration_ms",
            "title": "Duration Ms",
            "type": "`$ANY`",
            "short": "Span Duration - How much time the span took, in milliseconds.",
          },
          {
            "name": "error",
            "title": "Error",
            "type": "`$ANY`",
            "short": "Use a Boolean or String to indicate error.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "link_span_id",
            "title": "Link Span Id",
            "type": "`$STRING`",
            "short": "Metadata: Link Span ID - Links let you tie traces and spans to one another.",
          },
          {
            "name": "link_trace_id",
            "title": "Link Trace Id",
            "type": "`$STRING`",
            "short": "Metadata: Link Trace ID - Links let you tie traces and spans to one another.",
          },
          {
            "name": "log_message",
            "title": "Log Message",
            "type": "`$ANY`",
            "short": "A value containing the log event message.",
          },
          {
            "name": "log_severity",
            "title": "Log Severity",
            "type": "`$ANY`",
            "short": "Severity level of the event (also known as log level).",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "The name of the function or method where the span was created.",
          },
          {
            "name": "parent_id",
            "title": "Parent Id",
            "type": "`$STRING`",
            "short": "The Parent Span ID - The ID of this span's parent span, the call location the current span was called from.",
          },
          {
            "name": "route",
            "title": "Route",
            "type": "`$ANY`",
            "short": "The HTTP URL or equivalent route processed by the request.",
          },
          {
            "name": "service_name",
            "title": "Service Name",
            "type": "`$ANY`",
            "short": "The name of the instrumented service.",
          },
          {
            "name": "span_id",
            "title": "Span Id",
            "type": "`$STRING`",
            "short": "The unique identifier (ID) for each span.",
          },
          {
            "name": "span_kind",
            "title": "Span Kind",
            "type": "`$ANY`",
            "short": "Metadata: Kind - The kind of Span.",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$ANY`",
            "short": "Indicates the success, failure, or other status of a request.",
          },
          {
            "name": "trace_id",
            "title": "Trace Id",
            "type": "`$STRING`",
            "short": "The ID of the trace this span belongs to.",
          },
          {
            "name": "user",
            "title": "User",
            "type": "`$ANY`",
            "short": "The user making the request in the system.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "dataset_definition",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/dataset_definitions/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "dataset_definitions",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "dataset_definitions",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/1/dataset_definitions/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "dataset_definitions",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "dataset_definitions",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "environment": {
        "fields": [
          {
            "name": "data",
            "title": "Data",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "environment",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/2/teams/{teamSlug}/environments",
                "segments": [
                  {
                    "lit": "2",
                  },
                  {
                    "lit": "teams",
                  },
                  {
                    "var": "team_slug",
                  },
                  {
                    "lit": "environments",
                  },
                ],
                "parts": [
                  "2",
                  "teams",
                  "{team_slug}",
                  "environments",
                ],
                "rename": {
                  "param": {
                    "teamSlug": "team_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "team_slug",
                      "orig": "teamSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "team_slug",
                  ],
                },
                "body": {
                  "kind": "json",
                  "media": "application/vnd.api+json",
                },
                "response": {
                  "kind": "json",
                  "media": "application/vnd.api+json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/2/teams/{teamSlug}/environments",
                "segments": [
                  {
                    "lit": "2",
                  },
                  {
                    "lit": "teams",
                  },
                  {
                    "var": "team_slug",
                  },
                  {
                    "lit": "environments",
                  },
                ],
                "parts": [
                  "2",
                  "teams",
                  "{team_slug}",
                  "environments",
                ],
                "rename": {
                  "param": {
                    "teamSlug": "team_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "team_slug",
                      "orig": "teamSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "page_after",
                      "orig": "page[after]",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "eyxJjcmAVhdGVkX",
                    },
                    {
                      "name": "page_size",
                      "orig": "page[size]",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 10,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "team_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/vnd.api+json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/2/teams/{teamSlug}/environments/{ID}",
                "segments": [
                  {
                    "lit": "2",
                  },
                  {
                    "lit": "teams",
                  },
                  {
                    "var": "team_slug",
                  },
                  {
                    "lit": "environments",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "2",
                  "teams",
                  "{team_slug}",
                  "environments",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ID": "id",
                    "teamSlug": "team_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "ID",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "team_slug",
                      "orig": "teamSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "team_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/vnd.api+json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/2/teams/{teamSlug}/environments/{ID}",
                "segments": [
                  {
                    "lit": "2",
                  },
                  {
                    "lit": "teams",
                  },
                  {
                    "var": "team_slug",
                  },
                  {
                    "lit": "environments",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "2",
                  "teams",
                  "{team_slug}",
                  "environments",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ID": "id",
                    "teamSlug": "team_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "ID",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "team_slug",
                      "orig": "teamSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "team_slug",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/2/teams/{teamSlug}/environments/{ID}",
                "segments": [
                  {
                    "lit": "2",
                  },
                  {
                    "lit": "teams",
                  },
                  {
                    "var": "team_slug",
                  },
                  {
                    "lit": "environments",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "2",
                  "teams",
                  "{team_slug}",
                  "environments",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ID": "id",
                    "teamSlug": "team_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "ID",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "team_slug",
                      "orig": "teamSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "team_slug",
                  ],
                },
                "body": {
                  "kind": "json",
                  "media": "application/vnd.api+json",
                },
                "response": {
                  "kind": "json",
                  "media": "application/vnd.api+json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "event": {
        "fields": [
          {
            "name": "batch_events",
            "title": "Batch Events",
            "type": "`$ARRAY`",
            "short": "The array should contain one or more JSON objects representing Events.",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$INTEGER`",
          },
        ],
        "name": "event",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/batch/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "batch",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "batch",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata.batch_events`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "content_encoding",
                      "orig": "Content-Encoding",
                      "type": "`$STRING`",
                      "kind": "header",
                      "example": "plaintext",
                    },
                  ],
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "batch_events",
                    "dataset_slug",
                  ],
                },
                "body": {
                  "alternatives": [
                    {
                      "binary": True,
                      "kind": "raw",
                      "media": "application/octet-stream",
                    },
                  ],
                  "kind": "json",
                  "media": "application/json",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/events/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "events",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "events",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "x_honeycomb_event_time",
                      "orig": "X-Honeycomb-Event-Time",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                    {
                      "name": "x_honeycomb_samplerate",
                      "orig": "X-Honeycomb-Samplerate",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "historical_anomaly": {
        "fields": [
          {
            "name": "ended_at",
            "title": "Ended At",
            "type": "`$INTEGER`",
            "req": True,
            "short": "The time the anomaly ended, in seconds since UNIX epoch.",
            "readOnly": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "A deterministic identifier for the anomaly, derived from the Signal, its measured kind, and the anomaly's start time.",
            "readOnly": True,
          },
          {
            "name": "measurement",
            "title": "Measurement",
            "type": "`$NUMBER`",
            "req": True,
            "short": "The measured value that triggered the anomaly.",
            "readOnly": True,
          },
          {
            "name": "normal_range",
            "title": "Normal Range",
            "type": "`$ANY`",
            "req": True,
            "short": "The trained normal band the measurement exceeded.",
          },
          {
            "name": "started_at",
            "title": "Started At",
            "type": "`$INTEGER`",
            "req": True,
            "short": "The time the anomaly started, in seconds since UNIX epoch.",
            "readOnly": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "historical_anomaly",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/signals/{signalId}/historical_anomalies",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "signals",
                  },
                  {
                    "var": "signal_id",
                  },
                  {
                    "lit": "historical_anomalies",
                  },
                ],
                "parts": [
                  "1",
                  "signals",
                  "{signal_id}",
                  "historical_anomalies",
                ],
                "rename": {
                  "param": {
                    "signalId": "signal_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.historical_anomalies`",
                },
                "args": {
                  "params": [
                    {
                      "name": "signal_id",
                      "orig": "signalId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "end_time",
                      "orig": "end_time",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 1741392000,
                    },
                    {
                      "name": "page_after",
                      "orig": "page[after]",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "eyxJjcmAVhdGVkX",
                    },
                    {
                      "name": "page_size",
                      "orig": "page[size]",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "start_time",
                      "orig": "start_time",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 1740787200,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "end_time",
                    "signal_id",
                    "start_time",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.signal",
            ],
          ],
        },
      },
      "kinesis_event": {
        "fields": [
          {
            "name": "errorMessage",
            "title": "Error Message",
            "type": "`$STRING`",
          },
          {
            "name": "records",
            "title": "Records",
            "type": "`$ARRAY`",
          },
          {
            "name": "requestId",
            "title": "Request Id",
            "type": "`$STRING`",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$INTEGER`",
          },
        ],
        "name": "kinesis_event",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/kinesis_events/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "kinesis_events",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "kinesis_events",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "x_amz_firehose_request_id",
                      "orig": "X-Amz-Firehose-Request-Id",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                      "example": "33658b45-a8f1-4007-92e8-f601ae33db14",
                    },
                  ],
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "x_amz_firehose_request_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "management_auth": {
        "fields": [],
        "name": "management_auth",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/2/auth",
                "segments": [
                  {
                    "lit": "2",
                  },
                  {
                    "lit": "auth",
                  },
                ],
                "parts": [
                  "2",
                  "auth",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/vnd.api+json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "map_dependency": {
        "fields": [
          {
            "name": "dependencies",
            "title": "Dependencies",
            "type": "`$ANY`",
            "short": "Array of service dependencies.",
          },
          {
            "name": "end_time",
            "title": "End Time",
            "type": "`$INTEGER`",
            "short": "Absolute end time to evaluate dependencies, in seconds since UNIX epoch.",
          },
          {
            "name": "filters",
            "title": "Filters",
            "type": "`$ARRAY`",
            "short": "Optional list of service nodes to filter dependencies by.",
          },
          {
            "name": "links",
            "title": "Links",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Links to iterate through the pages of results.",
          },
          {
            "name": "request_id",
            "title": "Request Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the Map Dependency Request.",
          },
          {
            "name": "start_time",
            "title": "Start Time",
            "type": "`$INTEGER`",
            "short": "Absolute start time to evaluate dependencies, in seconds since UNIX epoch.",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "short": "Status of the Map Dependency Request.",
          },
          {
            "name": "time_range",
            "title": "Time Range",
            "type": "`$INTEGER`",
            "short": "Time range in seconds (minimum 1).",
          },
        ],
        "name": "map_dependency",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/maps/dependencies/requests",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "maps",
                  },
                  {
                    "lit": "dependencies",
                  },
                  {
                    "lit": "requests",
                  },
                ],
                "parts": [
                  "1",
                  "maps",
                  "dependencies",
                  "requests",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 5000,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/maps/dependencies/requests/{requestId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "maps",
                  },
                  {
                    "lit": "dependencies",
                  },
                  {
                    "lit": "requests",
                  },
                  {
                    "var": "request_id",
                  },
                ],
                "parts": [
                  "1",
                  "maps",
                  "dependencies",
                  "requests",
                  "{request_id}",
                ],
                "rename": {
                  "param": {
                    "requestId": "request_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "request_id",
                      "orig": "requestId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "page_after",
                      "orig": "page[after]",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "eyxJjcmAVhdGVkX",
                    },
                    {
                      "name": "page_size",
                      "orig": "page[size]",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 10,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "request_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "marker": {
        "fields": [
          {
            "name": "color",
            "title": "Color",
            "type": "`$STRING`",
            "short": "Color can be assigned to Markers using the Marker Settings endpoint.",
            "readOnly": True,
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "The ISO8601-formatted time when the Marker was created.",
            "readOnly": True,
          },
          {
            "name": "end_time",
            "title": "End Time",
            "type": "`$INTEGER`",
            "short": "Specifies end time, and allows a Marker to be recorded as representing a time range, such as a 5 minute deploy.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "A 6 character hexadecimal string assigned on Marker creation.",
            "readOnly": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "short": "A message to describe this specific Marker.",
          },
          {
            "name": "start_time",
            "title": "Start Time",
            "type": "`$INTEGER`",
            "short": "Indicates the time the Marker should be placed.",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "Groups similar Markers.",
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "The ISO8601-formatted time when the Marker was updated.",
            "readOnly": True,
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "short": "A target for the marker.",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "id": "id",
          },
          "name": "id",
          "parts": [
            "dataset_slug",
            "id",
          ],
          "sep": "/",
        },
        "name": "marker",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/markers/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "markers",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "markers",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/markers/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "markers",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "markers",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/1/markers/{datasetSlug}/{markerId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "markers",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "markers",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "markerId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "markerId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/1/markers/{datasetSlug}/{markerId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "markers",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "markers",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "markerId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "markerId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "marker_setting": {
        "fields": [
          {
            "name": "color",
            "title": "Color",
            "type": "`$STRING`",
            "req": True,
            "short": "Color to use for display of this marker type.",
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "The ISO8601-formatted time when the Marker Setting was created.",
            "readOnly": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "The unique identifier (ID) for the Marker Setting.",
            "readOnly": True,
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
            "short": "Groups similar Markers.",
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": [
              "`$ONE`",
              [
                "`$NULL`",
                "`$STRING`",
              ],
            ],
            "short": "The ISO8601-formatted time when the Marker Setting was updated.",
            "readOnly": True,
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "id": "id",
          },
          "name": "id",
          "parts": [
            "dataset_slug",
            "id",
          ],
          "sep": "/",
        },
        "name": "marker_setting",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/marker_settings/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "marker_settings",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "marker_settings",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/marker_settings/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "marker_settings",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "marker_settings",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/1/marker_settings/{datasetSlug}/{markerSettingId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "marker_settings",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "marker_settings",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "markerSettingId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "markerSettingId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/1/marker_settings/{datasetSlug}/{markerSettingId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "marker_settings",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "marker_settings",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "markerSettingId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "markerSettingId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "query": {
        "fields": [
          {
            "name": "breakdowns",
            "title": "Breakdowns",
            "type": "`$ARRAY`",
            "short": "the columns by which to break events down into groups",
          },
          {
            "name": "calculated_fields",
            "title": "Calculated Fields",
            "type": "`$ARRAY`",
            "short": "Computed properties that are calculated by a formula.",
          },
          {
            "name": "calculations",
            "title": "Calculations",
            "type": "`$ARRAY`",
            "short": "the calculations to return as a time series and summary table",
          },
          {
            "name": "compare_time_offset_seconds",
            "title": "Compare Time Offset Seconds",
            "type": "`$INTEGER`",
            "short": "When set, offsets the query's time range by this number of seconds into the past, allowing comparison with historical data from an earlier time period.",
          },
          {
            "name": "end_time",
            "title": "End Time",
            "type": "`$INTEGER`",
            "short": "Absolute end time of query, in seconds since UNIX epoch.",
          },
          {
            "name": "filter_combination",
            "title": "Filter Combination",
            "type": "`$STRING`",
            "short": "Set to \"OR\" to match ANY filter in the filter list",
          },
          {
            "name": "filters",
            "title": "Filters",
            "type": "`$ARRAY`",
            "short": "The filters with which to restrict the considered events",
          },
          {
            "name": "formulas",
            "title": "Formulas",
            "type": "`$ARRAY`",
            "short": "Mathematical formulas to be returned as a time series and summary table.",
          },
          {
            "name": "granularity",
            "title": "Granularity",
            "type": "`$INTEGER`",
            "short": "The time resolution of the query's graph, in seconds.",
          },
          {
            "name": "havings",
            "title": "Havings",
            "type": "`$ARRAY`",
            "short": "The Having clause allows you to filter on the results table.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "readOnly": True,
          },
          {
            "name": "limit",
            "title": "Limit",
            "type": "`$INTEGER`",
            "short": "The maximum number of unique groups returned in 'results'.",
          },
          {
            "name": "orders",
            "title": "Orders",
            "type": "`$ARRAY`",
            "short": "The terms on which to order the query results.",
          },
          {
            "name": "start_time",
            "title": "Start Time",
            "type": "`$INTEGER`",
            "short": "Absolute start time of query, in seconds since UNIX epoch.",
          },
          {
            "name": "time_range",
            "title": "Time Range",
            "type": "`$INTEGER`",
            "short": "Time range of query in seconds.",
          },
          {
            "name": "usage_mode",
            "title": "Usage Mode",
            "type": "`$BOOLEAN`",
            "short": "If `true`, query results will return aggregates without correcting for sample rates.",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "id": "id",
          },
          "name": "id",
          "parts": [
            "dataset_slug",
            "id",
          ],
          "sep": "/",
        },
        "name": "query",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/queries/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "queries",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "queries",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/queries/{datasetSlug}/{queryId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "queries",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "queries",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "queryId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "queryId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "query_annotation": {
        "fields": [
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "ISO8601 formatted time when the Query Annotation was created.",
            "readOnly": True,
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "A description of the Query.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "The unique identifier (ID) of a Query Annotation.",
            "readOnly": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "A name for the Query.",
          },
          {
            "name": "query_id",
            "title": "Query Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The ID of the Query that the annotation describes.",
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "short": "The source of the Query Annotation.",
            "readOnly": True,
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "ISO8601 formatted time when the Query Annotation was updated.",
            "readOnly": True,
            "format": "date-time",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "id": "id",
          },
          "name": "id",
          "parts": [
            "dataset_slug",
            "id",
          ],
          "sep": "/",
        },
        "name": "query_annotation",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/query_annotations/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "query_annotations",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "query_annotations",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/query_annotations/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "query_annotations",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "query_annotations",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "include_board_annotation",
                      "orig": "include_board_annotations",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/query_annotations/{datasetSlug}/{queryAnnotationId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "query_annotations",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "query_annotations",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "queryAnnotationId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "queryAnnotationId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/1/query_annotations/{datasetSlug}/{queryAnnotationId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "query_annotations",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "query_annotations",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "queryAnnotationId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "queryAnnotationId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/1/query_annotations/{datasetSlug}/{queryAnnotationId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "query_annotations",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "query_annotations",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "queryAnnotationId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "queryAnnotationId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "query_result": {
        "fields": [
          {
            "name": "complete",
            "title": "Complete",
            "type": "`$BOOLEAN`",
            "short": "Indicates if the query results are available yet or not.",
            "readOnly": True,
          },
          {
            "name": "data",
            "title": "Data",
            "type": "`$OBJECT`",
            "short": "An object containing the query result data",
          },
          {
            "name": "disable_other_by_aggregate",
            "title": "Disable Other By Aggregate",
            "type": "`$BOOLEAN`",
            "short": "If true, the \"other_by_aggregate\" data is excluded from the query result.",
            "writeOnly": True,
          },
          {
            "name": "disable_series",
            "title": "Disable Series",
            "type": "`$BOOLEAN`",
            "short": "If `true`, timeseries data will not be returned in the `series` response field, and only summarized data will be returned in the `results` response field.",
            "writeOnly": True,
          },
          {
            "name": "disable_total_by_aggregate",
            "title": "Disable Total By Aggregate",
            "type": "`$BOOLEAN`",
            "short": "If `true`, data representing each aggregate in the query's total value will not be returned.",
            "writeOnly": True,
          },
          {
            "name": "error",
            "title": "Error",
            "type": "`$STRING`",
            "short": "Only present if the query failed to run.",
            "readOnly": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "The unique identifier (ID) of a Query Result",
            "readOnly": True,
          },
          {
            "name": "limit",
            "title": "Limit",
            "type": "`$INTEGER`",
            "short": "If `disable_series` is `true`, a limit may be optionally given.",
            "writeOnly": True,
          },
          {
            "name": "links",
            "title": "Links",
            "type": "`$OBJECT`",
            "short": "An object containing UI links to the query result and query result graph",
          },
          {
            "name": "query",
            "title": "Query",
            "type": "`$ANY`",
            "readOnly": True,
          },
          {
            "name": "query_id",
            "title": "Query Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The ID of a query returned from the [Queries endpoint](/api/queries/).",
            "writeOnly": True,
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "id": "id",
          },
          "name": "id",
          "parts": [
            "dataset_slug",
            "id",
          ],
          "sep": "/",
        },
        "name": "query_result",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/query_results/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "query_results",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "query_results",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/query_results/{datasetSlug}/{queryResultId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "query_results",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "query_results",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "queryResultId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "queryResultId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "recipient": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "recipient",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/recipients",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "recipients",
                  },
                ],
                "parts": [
                  "1",
                  "recipients",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/recipients",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "recipients",
                  },
                ],
                "parts": [
                  "1",
                  "recipients",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/recipients/{recipientId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "recipients",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "recipients",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "recipientId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "recipientId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/1/recipients/{recipientId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "recipients",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "recipients",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "recipientId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "recipientId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/1/recipients/{recipientId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "recipients",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "recipients",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "recipientId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "recipientId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "signal": {
        "fields": [
          {
            "name": "auto_investigate",
            "title": "Auto Investigate",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "When `true`, Honeycomb will automatically start an investigation when this Signal fires.",
            "readOnly": True,
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "short": "The ISO8601-formatted time when the Signal was created.",
            "readOnly": True,
            "format": "date-time",
          },
          {
            "name": "currently_anomalous",
            "title": "Currently Anomalous",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "Whether the Signal is currently in an anomalous state.",
            "readOnly": True,
          },
          {
            "name": "dataset_slug",
            "title": "Dataset Slug",
            "type": "`$STRING`",
            "req": True,
            "short": "The slug of the dataset the Signal's service reports to.",
            "readOnly": True,
          },
          {
            "name": "enabled",
            "title": "Enabled",
            "type": "`$BOOLEAN`",
            "req": True,
            "op": {
              "update": {
                "type": "`$BOOLEAN`",
              },
            },
            "short": "Whether the Signal is currently enabled.",
          },
          {
            "name": "environment_slug",
            "title": "Environment Slug",
            "type": "`$STRING`",
            "req": True,
            "short": "The slug of the environment the Signal belongs to.",
            "readOnly": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique identifier (ID) of the Signal.",
            "readOnly": True,
          },
          {
            "name": "last_anomaly_ended_at",
            "title": "Last Anomaly Ended At",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "The end time of the most recent anomaly, in seconds since UNIX epoch.",
            "readOnly": True,
          },
          {
            "name": "last_anomaly_started_at",
            "title": "Last Anomaly Started At",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "The start time of the most recent anomaly, in seconds since UNIX epoch.",
            "readOnly": True,
          },
          {
            "name": "measured_signal",
            "title": "Measured Signal",
            "type": "`$STRING`",
            "req": True,
            "short": "The kind of measurement the Signal is trained on.",
            "readOnly": True,
          },
          {
            "name": "recipients",
            "title": "Recipients",
            "type": "`$ARRAY`",
            "req": True,
            "op": {
              "update": {
                "type": "`$ARRAY`",
              },
            },
            "short": "The Recipients notified when this Signal fires.",
          },
          {
            "name": "sensitivity",
            "title": "Sensitivity",
            "type": "`$ANY`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
            "short": "How far a measurement must deviate from the trained normal band before the Signal fires.",
          },
          {
            "name": "service_name",
            "title": "Service Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The name of the service the Signal monitors.",
            "readOnly": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "The lifecycle status of the Signal.",
            "readOnly": True,
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "req": True,
            "short": "The ISO8601-formatted time when the Signal was last updated.",
            "readOnly": True,
            "format": "date-time",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "signal",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/signals",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "signals",
                  },
                ],
                "parts": [
                  "1",
                  "signals",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.signals`",
                },
                "args": {
                  "query": [
                    {
                      "name": "currently_anomalous",
                      "orig": "currently_anomalous",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "dataset_slug",
                      "orig": "dataset_slug",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "checkout-api",
                    },
                    {
                      "name": "measured_signal",
                      "orig": "measured_signal",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "error_rate",
                    },
                    {
                      "name": "page_after",
                      "orig": "page[after]",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "eyxJjcmAVhdGVkX",
                    },
                    {
                      "name": "page_size",
                      "orig": "page[size]",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "service_name",
                      "orig": "service_name",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "checkout-api",
                    },
                    {
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/signals/{signalId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "signals",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "signals",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "signalId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "signalId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/1/signals/{signalId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "signals",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "signals",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "signalId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "signalId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "slo": {
        "fields": [
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "The ISO8601-formatted time when the SLO was created.",
            "readOnly": True,
            "format": "date-time",
          },
          {
            "name": "dataset_slugs",
            "title": "Dataset Slugs",
            "type": "`$ARRAY`",
            "short": "The dataset(s) the SLO will be evaluated against.",
            "readOnly": True,
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "A nice description of the SLO's intent and context.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "readOnly": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The name of the SLO.",
          },
          {
            "name": "reset_at",
            "title": "Reset At",
            "type": "`$STRING`",
            "short": "The ISO8601-formatted time the SLO was last reset.",
            "readOnly": True,
            "format": "date-time",
          },
          {
            "name": "sli",
            "title": "Sli",
            "type": "`$OBJECT`",
            "op": {
              "create": {
                "req": True,
                "type": "`$OBJECT`",
              },
              "list": {
                "req": True,
                "type": "`$OBJECT`",
              },
              "update": {
                "req": True,
                "type": "`$OBJECT`",
              },
            },
            "short": "Reference to the [Calculated Field (also called Derived Column)](/api/calculated-fields/) used as the indicator of event success.",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
            "short": "A list of key-value pairs to help identify the SLO.",
          },
          {
            "name": "target_per_million",
            "title": "Target Per Million",
            "type": "`$INTEGER`",
            "op": {
              "create": {
                "req": True,
                "type": "`$INTEGER`",
              },
              "list": {
                "req": True,
                "type": "`$INTEGER`",
              },
              "update": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
            "short": "The number of events out of one million (1,000,000) that you expected qualified events to succeed.",
          },
          {
            "name": "time_period_days",
            "title": "Time Period Days",
            "type": "`$INTEGER`",
            "op": {
              "create": {
                "req": True,
                "type": "`$INTEGER`",
              },
              "list": {
                "req": True,
                "type": "`$INTEGER`",
              },
              "update": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
            "short": "The time period, in days, over which the SLO will be evaluated.",
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "The ISO8601-formatted time when the SLO was updated.",
            "readOnly": True,
            "format": "date-time",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "id": "id",
          },
          "name": "id",
          "parts": [
            "dataset_slug",
            "id",
          ],
          "sep": "/",
        },
        "name": "slo",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/slos/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "slos",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "slos",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/slos/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "slos",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "slos",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/slos/{datasetSlug}/{sloId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "slos",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "slos",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "sloId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "sloId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "detailed",
                      "orig": "detailed",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": "",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/1/slos/{datasetSlug}/{sloId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "slos",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "slos",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "sloId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "sloId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/1/slos/{datasetSlug}/{sloId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "slos",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "slos",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "sloId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "sloId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "slo_count": {
        "fields": [
          {
            "name": "error_count",
            "title": "Error Count",
            "type": "`$INTEGER`",
            "short": "Number of failed (bad) events in this window.",
            "readOnly": True,
          },
          {
            "name": "is_partial",
            "title": "Is Partial",
            "type": "`$BOOLEAN`",
            "short": "When `true`, the data for this window may be incomplete.",
            "readOnly": True,
          },
          {
            "name": "total_count",
            "title": "Total Count",
            "type": "`$INTEGER`",
            "short": "Total number of events (good + bad) in this window.",
            "readOnly": True,
          },
          {
            "name": "window_end",
            "title": "Window End",
            "type": "`$INTEGER`",
            "short": "End of the window as a Unix timestamp (seconds).",
            "readOnly": True,
          },
          {
            "name": "window_start",
            "title": "Window Start",
            "type": "`$INTEGER`",
            "short": "Start of the window as a Unix timestamp (seconds).",
            "readOnly": True,
          },
        ],
        "name": "slo_count",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/slos/{datasetSlug}/{sloId}/counts",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "slos",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "slo_id",
                  },
                  {
                    "lit": "counts",
                  },
                ],
                "parts": [
                  "1",
                  "slos",
                  "{dataset_slug}",
                  "{slo_id}",
                  "counts",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "sloId": "slo_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.windows`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "slo_id",
                      "orig": "sloId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "end_time",
                      "orig": "end_time",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 1745254740,
                    },
                    {
                      "name": "start_time",
                      "orig": "start_time",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 1745251200,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "end_time",
                    "slo_id",
                    "start_time",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.slo",
            ],
          ],
        },
      },
      "slo_history": {
        "fields": [
          {
            "name": "end_time",
            "title": "End Time",
            "type": "`$INTEGER`",
            "req": True,
            "short": "The ending Unix timestamp, in seconds since the epoch, to retrieve historical data for.",
          },
          {
            "name": "ids",
            "title": "Ids",
            "type": "`$ARRAY`",
            "req": True,
            "short": "A list of SLO IDs to retrieve history for.",
          },
          {
            "name": "start_time",
            "title": "Start Time",
            "type": "`$INTEGER`",
            "req": True,
            "short": "The starting Unix timestamp, in seconds since the epoch, to retrieve historical data for.",
          },
        ],
        "name": "slo_history",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/reporting/slos/historical",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "reporting",
                  },
                  {
                    "lit": "slos",
                  },
                  {
                    "lit": "historical",
                  },
                ],
                "parts": [
                  "1",
                  "reporting",
                  "slos",
                  "historical",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "slo_hourly_count": {
        "fields": [
          {
            "name": "end_time",
            "title": "End Time",
            "type": "`$INTEGER`",
            "short": "End of the hour as a Unix timestamp (seconds).",
            "readOnly": True,
            "format": "int64",
          },
          {
            "name": "error_count",
            "title": "Error Count",
            "type": "`$INTEGER`",
            "short": "Number of failed (bad) events in this hour.",
            "readOnly": True,
          },
          {
            "name": "is_partial",
            "title": "Is Partial",
            "type": "`$BOOLEAN`",
            "short": "When `true`, this bucket covers the current in-progress hour and its counts will increase until the hour completes.",
            "readOnly": True,
          },
          {
            "name": "start_time",
            "title": "Start Time",
            "type": "`$INTEGER`",
            "short": "Start of the hour as a Unix timestamp (seconds).",
            "readOnly": True,
            "format": "int64",
          },
          {
            "name": "total_count",
            "title": "Total Count",
            "type": "`$INTEGER`",
            "short": "Total number of events (good + bad) in this hour.",
            "readOnly": True,
          },
        ],
        "name": "slo_hourly_count",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/slos/{datasetSlug}/{sloId}/counts/history",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "slos",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "slo_id",
                  },
                  {
                    "lit": "counts",
                  },
                  {
                    "lit": "history",
                  },
                ],
                "parts": [
                  "1",
                  "slos",
                  "{dataset_slug}",
                  "{slo_id}",
                  "counts",
                  "history",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "sloId": "slo_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.buckets`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "slo_id",
                      "orig": "sloId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "end_time",
                      "orig": "end_time",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 1745254800,
                    },
                    {
                      "name": "start_time",
                      "orig": "start_time",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 1745168400,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "end_time",
                    "slo_id",
                    "start_time",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.slo",
            ],
          ],
        },
      },
      "trigger": {
        "fields": [
          {
            "name": "alert_type",
            "title": "Alert Type",
            "type": "`$STRING`",
            "short": "How often to fire an alert when a trigger threshold is crossed.",
          },
          {
            "name": "auto_investigate",
            "title": "Auto Investigate",
            "type": "`$BOOLEAN`",
            "short": "When true, Honeycomb will automatically start an investigation when this Trigger fires.",
          },
          {
            "name": "baseline_details",
            "title": "Baseline Details",
            "type": "`$OBJECT`",
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "readOnly": True,
            "format": "date-time",
          },
          {
            "name": "dataset_slug",
            "title": "Dataset Slug",
            "type": "`$STRING`",
            "short": "The slug of the dataset this trigger belongs to.",
            "readOnly": True,
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "A longer description, displayed on the Trigger's detail page.",
          },
          {
            "name": "disabled",
            "title": "Disabled",
            "type": "`$BOOLEAN`",
            "short": "If true, the trigger will not be evaluated and alerts will not be sent.",
          },
          {
            "name": "evaluation_schedule",
            "title": "Evaluation Schedule",
            "type": "`$OBJECT`",
            "req": True,
            "short": "A schedule that determines when the trigger is run.",
          },
          {
            "name": "evaluation_schedule_type",
            "title": "Evaluation Schedule Type",
            "type": "`$STRING`",
            "short": "The schedule type used by the trigger.",
          },
          {
            "name": "frequency",
            "title": "Frequency",
            "type": "`$INTEGER`",
            "short": "The interval in seconds in which to check the results of the query’s calculation against the threshold.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "The unique identifier (ID) for this Trigger.",
            "readOnly": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "A short, human-readable name for this Trigger, which will be displayed in the UI and when the trigger fires.",
          },
          {
            "name": "query",
            "title": "Query",
            "type": "`$OBJECT`",
            "short": "An inline query specification that is a strict subset of the standard Query Specification.",
          },
          {
            "name": "query_id",
            "title": "Query Id",
            "type": "`$STRING`",
            "short": "The ID of an existing saved Query that meets the trigger query requirements.",
          },
          {
            "name": "recipients",
            "title": "Recipients",
            "type": "`$ARRAY`",
            "short": "A list of [Recipients](/api/recipients/) to notify when the Trigger fires.",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
            "short": "A list of key-value pairs to help identify the Trigger.",
          },
          {
            "name": "threshold",
            "title": "Threshold",
            "type": "`$OBJECT`",
            "req": True,
            "short": "The threshold over which the trigger will fire, specified as both an operator and a value.",
          },
          {
            "name": "triggered",
            "title": "Triggered",
            "type": "`$BOOLEAN`",
            "short": "If true, the trigger has crossed its specified threshold without resolving.",
            "readOnly": True,
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "readOnly": True,
            "format": "date-time",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "dataset_slug": "dataset_slug",
            "id": "id",
          },
          "name": "id",
          "parts": [
            "dataset_slug",
            "id",
          ],
          "sep": "/",
        },
        "name": "trigger",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/1/triggers/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "triggers",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "triggers",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/triggers/{datasetSlug}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "triggers",
                  },
                  {
                    "var": "dataset_slug",
                  },
                ],
                "parts": [
                  "1",
                  "triggers",
                  "{dataset_slug}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/recipients/{recipientId}/triggers",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "recipients",
                  },
                  {
                    "var": "recipient_id",
                  },
                  {
                    "lit": "triggers",
                  },
                ],
                "parts": [
                  "1",
                  "recipients",
                  "{recipient_id}",
                  "triggers",
                ],
                "rename": {
                  "param": {
                    "recipientId": "recipient_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "recipient_id",
                      "orig": "recipientId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "recipient_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/1/triggers/{datasetSlug}/{triggerId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "triggers",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "triggers",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "triggerId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "triggerId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/1/triggers/{datasetSlug}/{triggerId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "triggers",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "triggers",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "triggerId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "triggerId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/1/triggers/{datasetSlug}/{triggerId}",
                "segments": [
                  {
                    "lit": "1",
                  },
                  {
                    "lit": "triggers",
                  },
                  {
                    "var": "dataset_slug",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "1",
                  "triggers",
                  "{dataset_slug}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetSlug": "dataset_slug",
                    "triggerId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "dataset_slug",
                      "orig": "datasetSlug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "triggerId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset_slug",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.recipient",
            ],
          ],
        },
      },
    },
    }

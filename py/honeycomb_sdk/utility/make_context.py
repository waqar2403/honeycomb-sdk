# Honeycomb SDK utility: make_context

from honeycomb_sdk.core.context import HoneycombContext


def make_context_util(ctxmap, basectx):
    return HoneycombContext(ctxmap, basectx)

# Honeycomb SDK exists test

import pytest
from honeycomb_sdk import HoneycombSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = HoneycombSDK.test(None, None)
        assert testsdk is not None

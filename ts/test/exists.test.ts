
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HoneycombSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = HoneycombSDK.test()
    equal(testsdk instanceof HoneycombSDK, true,
      'HoneycombSDK.test() must return a client synchronously')
  })

})

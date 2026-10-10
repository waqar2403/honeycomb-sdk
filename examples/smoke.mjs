// Live smoke test for the TypeScript SDK against api.honeycomb.io.
//
//   cd ts && npm install && npm run build && cd ..
//   HONEYCOMB_APIKEY=... node examples/smoke.mjs
//   node examples/smoke.mjs --dry      # print the requests, send nothing
//
// The key is a Honeycomb configuration key with these permissions:
// Send Events, Create Datasets, Manage Markers. The test writes one event
// and one marker to the dataset named by HONEYCOMB_DATASET (default
// "honeycomb-sdk-smoke"), then removes the marker.

import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { HoneycombSDK } = require('../ts/dist/HoneycombSDK.js')

const dry = process.argv.includes('--dry')
const dataset = process.env.HONEYCOMB_DATASET || 'honeycomb-sdk-smoke'
const apikey = dry ? 'dry-run-key' : process.env.HONEYCOMB_APIKEY

if (!apikey) {
  console.error('Set HONEYCOMB_APIKEY, or pass --dry.')
  process.exit(1)
}

const options = { apikey }
if (process.env.HONEYCOMB_BASE) options.base = process.env.HONEYCOMB_BASE

// In dry mode, answer every request with a plausible body and log it.
if (dry) {
  const canned = {
    'GET /1/auth': { id: 'k1', type: 'configuration', team: { slug: 'team' }, environment: { slug: 'env' } },
    'POST /1/events': {},
    'GET /1/datasets': [{ name: dataset, slug: dataset }],
    'POST /1/markers': { id: 'm1', message: 'smoke' },
    'GET /1/markers': [{ id: 'm1', message: 'smoke' }],
    'DELETE /1/markers': { id: 'm1' },
  }
  options.system = {
    fetch: async (url, init = {}) => {
      const u = new URL(String(url))
      const method = init.method || 'GET'
      const key = method + ' ' + u.pathname.split('/').slice(0, 3).join('/')
      const headers = Object.fromEntries(new Headers(init.headers))
      console.log('  >', method, u.pathname + u.search,
        '| x-honeycomb-team:', headers['x-honeycomb-team'] ? 'set' : 'MISSING',
        init.body ? '| body: ' + init.body : '')
      return new Response(JSON.stringify(canned[key] ?? {}), {
        status: 200, headers: { 'content-type': 'application/json' },
      })
    },
  }
}

const client = new HoneycombSDK(options)

async function step(name, fn) {
  const started = Date.now()
  try {
    const detail = await fn()
    console.log('ok  ', name, `(${Date.now() - started} ms)`, detail ?? '')
  } catch (err) {
    console.log('FAIL', name, '-', err?.message ?? err)
    process.exitCode = 1
  }
}

await step('Auth().load()', async () => {
  const auth = (await client.Auth().load()).data()
  return `team=${auth.team?.slug} environment=${auth.environment?.slug}`
})

await step('Event().create()', async () => {
  await client.Event().create({
    dataset_slug: dataset,
    service_name: 'honeycomb-sdk-smoke',
    message: 'hello from the generated SDK',
    duration_ms: 12,
  })
})

await step('Dataset().list()', async () => {
  const names = (await client.Dataset().list()).map((d) => d.data().slug)
  if (!names.includes(dataset)) throw new Error(`dataset ${dataset} not listed yet`)
  return `${names.length} dataset(s), includes ${dataset}`
})

let markerId
await step('Marker().create()', async () => {
  const marker = (await client.Marker().create({
    dataset_slug: dataset,
    message: 'honeycomb-sdk smoke test',
    type: 'deploy',
  })).data()
  markerId = marker.id
  return `id=${markerId}`
})

await step('Marker().list()', async () => {
  const ids = (await client.Marker().list({ dataset_slug: dataset })).map((m) => m.data().id)
  if (!ids.includes(markerId)) throw new Error(`marker ${markerId} not listed`)
  return `${ids.length} marker(s)`
})

await step('Marker().remove()', async () => {
  await client.Marker().remove({ dataset_slug: dataset, id: markerId })
})

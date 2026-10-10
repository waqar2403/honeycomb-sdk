# Developer experience report: Voxgig SDK generator on the Honeycomb API

Muhammad Waqar, 10 October 2026

## Summary

I generated TypeScript, Python and Go SDKs, a CLI and an MCP server for the
[Honeycomb](https://www.honeycomb.io) API with `@voxgig/sdkgen`. The first
generated SDK took about a minute. The toolchain is fast and the
docs-as-tests idea is excellent. The out-of-the-box model had three
correctness problems that would reach users: missing list operations on
Honeycomb's dataset-scoped resources, no JSON:API handling, and a single
credential per client when the API uses two key types. All three are
fixable in `guide.aontu` without touching generated code, and this repo
contains those corrections. I then verified the TypeScript and Python SDKs,
the CLI and the MCP server against the live Honeycomb API.

I picked Honeycomb because I contribute to OpenTelemetry, Honeycomb is an
observability product built around it, it publishes an official OpenAPI 3.1
spec, it has a free tier, and it is not in the Voxgig catalogue.

## At a glance

| Item | Result |
| --- | --- |
| Spec | Honeycomb API 1.0.0, OpenAPI 3.1.0, 48 paths, 90 operations |
| Spec lint (Redocly, recommended rules) | Valid. 36 warnings, all about examples, none structural |
| Toolchain | create-sdkgen 0.30.7, sdkgen 4.34.5, apidef 8.25.2, Node 24 |
| Scaffold (`npm create @voxgig/sdkgen`) | 33 s, including npm install |
| Generate | 6 s |
| First generation | 27 entities, 1 warning, 29 flow steps switched off, 6 TypeScript test failures |
| After model corrections | 28 entities, 0 warnings, 0 failures |
| TypeScript | 453 tests: 419 pass, 34 skipped |
| Python | 303 pass, 113 skipped |
| Go | pass. CLI and MCP server build |
| GitHub Actions | `ci` and `Documentation` workflows green on the first push |
| Live check | TypeScript, Python, CLI and MCP server all pass against api.honeycomb.io |
| Corrections needed | 133 lines of `guide.aontu`, 2 settings in `project.aontu` |

## What worked well

- **One command to a working project.** `npm create @voxgig/sdkgen` with
  `-d`, `-t` and `-f test` produced a buildable multi-language project with no
  questions asked.
- **Speed.** Generate runs in about 6 seconds, which makes the
  edit-model, regenerate, re-test loop pleasant.
- **Documentation is tested.** Every code block in the READMEs is
  type-checked and executed in offline test mode. When I added my own README
  section, its example was checked too. Few generators do this.
- **One correction surface.** `guide.aontu` is small, declarative and
  survives regeneration. Once I understood it, every fix was a few lines.
- **Helpful warnings.** The `/1/auth` vs `/2/auth` collision warning named
  both routes and said where to fix it.
- **`doctor`** found orphaned model files I would not have noticed.
- **Offline test mode** with a seeded in-memory mock is easy to use and is
  documented in every language.

## Friction log

Severity: **High** means a user of the SDK gets wrong or missing behaviour.
**Medium** means the SDK builder loses time or ships something misleading.
**Low** is polish.

| # | Severity | Finding | Source | Suggestion |
| --- | --- | --- | --- | --- |
| 1 | High | Dataset-scoped collections such as `GET /1/slos/{datasetSlug}` (response: an array) were classified as `load`, with `datasetSlug` renamed to `id`. The real child ids (`sloId`, `triggerId`, ...) were never `id`. Result: no `list` for SLOs, triggers, markers, marker settings, burn alerts, query annotations, columns or calculated fields, and 29 flow steps switched off. | Generator heuristic | When a GET on a path ending in a parameter returns an array, or the path has a `/{parent}/{child}` sibling, classify it as `list` scoped by that parameter. |
| 2 | High | The `/2/` endpoints return JSON:API (`application/vnd.api+json`, record under `data`). The SDK did not unwrap it, and `GET /2/teams/{teamSlug}/environments` (a collection) became `load`. 6 TypeScript tests failed out of the box. | Generator | Detect the JSON:API media type and default `transform.res` to `body.data`. |
| 3 | High | Per-operation security is ignored. `/1/` uses `X-Honeycomb-Team`, while `/2/` needs `Authorization: Bearer`. The client sends one credential. The README Quickstart's first example is `ApiKey().list()`, a `/2/` call, right above a line saying the client sends `X-Honeycomb-Team`, so copy-paste fails with a normal key. The MCP README's example prompt is also `list api_key`. | Generator | Honour operation-level `security`, or at least pick a Quickstart entity whose scheme matches the default. |
| 4 | Medium | `npm run generate` exits 0 after printing `PARTIAL BUILD!`. CI cannot catch it. | Generator | Exit non-zero on a partial build, or add `--strict`. |
| 5 | Medium | Only TypeScript ships the spec-definition conformance suite (`definition.test.ts`). Python and Go passed while carrying the same bugs as items 1 and 2. | Generator | Port the definition suite to every target, or run the TypeScript one as a shared gate. |
| 6 | Medium | `origin: 'voxgig-sdk'` is written into `sdk.aontu`, so `go.mod`, `pyproject.toml` and README links point at `github.com/voxgig-sdk/...`. `go get` breaks for anyone publishing under their own account. LICENSE says `Copyright (c) 2026 Voxgig`. Fixing it meant finding `main.kit.publisher` by reading `sdkgen.aontu` inside `node_modules`. | Scaffold | Add `--owner` and `--publisher` options to `create-sdkgen`, or ask for them. |
| 7 | Medium | Path parameters are also sent in the JSON body (`dataset_slug` inside the event and marker bodies). For Honeycomb events, this adds a `dataset_slug` column to the user's data. Confirmed live: the smoke event sent 3 fields and the dataset has 4 columns. | Generator | Strip parameters that the operation places in the path, unless the request schema declares them. |
| 8 | Medium | The guide syntax is the fix for most model problems, but warnings do not show it. I learned `op: load: active: false` and `op: list: method: "GET"` from the apidef schema file. | Docs | Print a ready-to-paste `guide.aontu` snippet with each heuristic warning. |
| 9 | Medium | The docs landing page (`/sdk/docs`) describes the pipeline but gives no commands. The commands are on the `create-sdkgen` subpage and in that repo's AGENTS.md. The home page says `npm create @voxgig/sdkgen`, the `create-sdkgen` page says `npx @voxgig/create-sdkgen`. | Docs | Put the five-command workflow on the landing page and use one command everywhere. |
| 10 | Low | `/1/kinesis_events` became the entity `Kinesi`. | Generator | Add `kinesis` (and similar `-is` words) to the singulariser's exceptions. |
| 11 | Low | `DELETE /1/boards/{boardId}/views/{viewId}` was attached to `Board.remove`, not `BoardView.remove`. | Generator | Prefer the entity whose path owns the last parameter. |
| 12 | Low | After renaming entities in the guide, the old flow files stayed on disk. `doctor` reported them, but its summary line read `0 forked, 0 edited, 0 stale, 0 missing` and suggested `target add`, which does not remove them. | Generator | Remove orphans on generate, or count them in the summary. |
| 13 | Low | `create-sdkgen --help` links to `https://voxgig.com/sdkgen`, which returns 404. | Scaffold | Link to `https://voxgig.com/sdk`. |
| 14 | Low | With a person as publisher, SECURITY.md reads "the generated Muhammad Waqar SDK packages" and lists npm, PyPI, Packagist, RubyGems and LuaRocks, although only TypeScript, Python and Go exist. | Template | Phrase for both people and organisations, and list only active targets. |
| 15 | Low | `py/Makefile` runs `python -m pytest`. macOS ships `python3` only, so `make test` fails on a clean Mac. | Template | Use `python3`. |
| 16 | Low | The CLI help says "boru-driven CLI" and "boru expression" without saying what boru is. | Template | One line explaining the expression syntax, with an example. |
| 17 | Low | `.sdk/log/generated.jsonl` is committed, so every generate changes it. | Scaffold | Ignore `.sdk/log/` in the generated `.gitignore`. |
| 18 | Low | The generated `ci.yml` has jobs for 24 languages. For the 19 not in this repo, the job checks out and skips every step, so the Actions page shows green Rust, C# and Haskell checks for SDKs that do not exist. | Template | Generate jobs only for active targets. |
| 19 | Medium | Entity errors read `HoneycombSDK: list: request: 401: Unauthorized`. Honeycomb's response says `this API key isn't allowed to access SLOs`, but that text is only on `err.result.body`. | Generator | Put the API's error message in `err.message`. |

## Top five recommendations

1. **Fix collection classification (item 1).** Scoped collections such as
   `/projects/{id}/issues` or `/teams/{team}/members` are common, so this
   likely affects many APIs in the catalogue, not only Honeycomb.
2. **Make partial builds fail (item 4) and run conformance tests in every
   language (item 5).** Together, these would have flagged items 1 to 3
   before anyone published.
3. **Support per-operation security and JSON:API (items 2 and 3).** Both
   are standard OpenAPI features, and both affect the very first
   copy-and-paste experience.
4. **Make "your own account" a first-class option (item 6).** The task
   invites people to publish SDKs under their own name. Two flags would
   remove the hardest-to-find step.
5. **Turn warnings into fixes (item 8).** A pasteable guide snippet in each
   warning would cut the time from "warning" to "fixed" from minutes of
   reading source to seconds.

## Where the corrections live

- `.sdk/model/guide/guide.aontu`: entity and operation corrections, each with
  a comment explaining why.
- `.sdk/model/project.aontu`: publisher, and the README section on key types
  and corrections.
- `.sdk/model/sdk.aontu`: `origin` changed to `waqar2403`.
- `examples/smoke.mjs`: live smoke test. `--dry` prints the exact requests
  without sending them.

## Live check

Run on 10 October 2026 against api.honeycomb.io (US region, free plan) with a
configuration key scoped to events, markers, triggers, boards and dataset
creation.

| Surface | Calls | Result |
| --- | --- | --- |
| TypeScript | `examples/smoke.mjs`: `Auth().load()`, `Event().create()`, `Dataset().list()`, `Marker().create()`, `.list()`, `.remove()` | 6 of 6 pass, 0.2 to 2.1 s each |
| TypeScript | `Trigger().list({ dataset_slug })`, `Board().list()`, `Dataset().load({ id })` | Pass. `Trigger().list()` is one of the corrected operations |
| Python | `Auth().load()`, `Dataset().list()`, `Trigger().list()` | Pass |
| CLI | `honeycomb-cli list dataset` | Pass |
| MCP server (stdio) | `initialize`, `tools/list` (`honeycomb_list`, `honeycomb_load`), `tools/call honeycomb_list` for datasets | Pass |
| TypeScript | `Column().list()`, `Slo().list()` | 401, as expected: the key has no column or SLO permission (see item 19) |

The first live call, `Auth().load()`, succeeded on the first run after
creating the key, in 1.1 s.

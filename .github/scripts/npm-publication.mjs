import { setTimeout as sleep } from 'node:timers/promises'
import { pathToFileURL } from 'node:url'

const REGISTRY = 'https://registry.npmjs.org'
const REQUEST_TIMEOUT_MS = 15_000
const PUBLICATION_TIMEOUT_MS = 30 * 60_000
const POLL_INTERVAL_MS = 10_000

export async function checkPublication(
  name,
  version,
  { fetchImpl = fetch, timeoutMs = REQUEST_TIMEOUT_MS } = {},
) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    // Query public visibility without npm's local cache or publish credentials.
    const response = await fetchImpl(
      `${REGISTRY}/${encodeURIComponent(name)}/${encodeURIComponent(version)}`,
      { signal: controller.signal, headers: { Accept: 'application/json' } },
    )
    if (response.status !== 200) {
      await response.body?.cancel()
      const detail = `registry returned HTTP ${response.status}`
      if (response.status === 404) return { state: 'missing', detail }
      if (
        response.status === 408 ||
        response.status === 429 ||
        response.status >= 500
      ) {
        return { state: 'retry', detail }
      }
      return { state: 'fatal', detail }
    }
    const metadata = await response.json()
    if (metadata.name !== name || metadata.version !== version) {
      return {
        state: 'fatal',
        detail:
          'registry metadata does not match the requested package version',
      }
    }
    return { state: 'published', detail: 'visible on the public registry' }
  } catch (error) {
    const detail = controller.signal.aborted
      ? `registry request timed out after ${timeoutMs}ms`
      : `registry request failed: ${error.message}${error.cause?.code ? ` (${error.cause.code})` : ''}`
    return { state: 'retry', detail }
  } finally {
    clearTimeout(timer)
  }
}

export async function waitForPublication(
  names,
  version,
  {
    fetchImpl = fetch,
    timeoutMs = PUBLICATION_TIMEOUT_MS,
    now = () => performance.now(),
    delay = sleep,
    log = console.log,
  } = {},
) {
  const startedAt = now()
  const deadline = startedAt + timeoutMs
  const pending = new Map(names.map((name) => [name, 'not checked yet']))

  while (pending.size > 0 && now() < deadline) {
    const remaining = deadline - now()
    const results = await Promise.all(
      [...pending.keys()].map(async (name) => ({
        name,
        ...(await checkPublication(name, version, {
          fetchImpl,
          timeoutMs: Math.min(REQUEST_TIMEOUT_MS, remaining),
        })),
      })),
    )
    const elapsed = Math.round((now() - startedAt) / 1000)
    for (const { name, state, detail } of results) {
      if (state === 'fatal') {
        throw new Error(`${name}@${version}: ${detail}`)
      }
      if (state === 'published') {
        pending.delete(name)
        log(`✓ ${name}@${version} visible on registry after ${elapsed}s`)
      } else {
        pending.set(name, detail)
        log(
          `… ${name}@${version}: ${state === 'missing' ? 'not visible yet' : 'visibility check failed'} (${detail}; elapsed ${elapsed}s)`,
        )
      }
    }
    if (pending.size > 0 && now() < deadline) {
      await delay(Math.min(POLL_INTERVAL_MS, deadline - now()))
    }
  }

  if (pending.size > 0) {
    throw new Error(
      `Publication could not be verified within ${timeoutMs / 1000}s:\n${[
        ...pending,
      ]
        .map(([name, detail]) => `- ${name}@${version}: ${detail}`)
        .join(
          '\n',
        )}\nCheck registry visibility before rerunning the release workflow.`,
    )
  }
}

async function main() {
  const [command, version, ...names] = process.argv.slice(2)
  if (
    !version ||
    names.length === 0 ||
    !['check', 'wait'].includes(command) ||
    (command === 'check' && names.length !== 1)
  ) {
    throw new Error(
      'Usage: node .github/scripts/npm-publication.mjs <check|wait> <version> <package...>',
    )
  }
  if (command === 'wait') {
    await waitForPublication(names, version)
    return
  }
  const result = await checkPublication(names[0], version)
  if (result.state !== 'published' && result.state !== 'missing') {
    throw new Error(`${names[0]}@${version}: ${result.detail}`)
  }
  console.log(result.state)
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}

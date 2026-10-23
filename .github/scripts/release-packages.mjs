import { spawnSync } from 'node:child_process'
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { checkPublication, waitForPublication } from './npm-publication.mjs'

export const PACKAGES = [
  'pixverse',
  '@pixverse-ai/cli',
  'pixverse-cli',
  'pixverse-ai-cli',
]

export function validateRelease(tag, pkg) {
  if (
    typeof tag !== 'string' ||
    tag.includes('\n') ||
    !/^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(tag)
  ) {
    throw new Error('Release tag must be a stable version such as v1.4.9')
  }
  if (pkg.version !== tag.slice(1))
    throw new Error('Release tag does not match package.json version')
  if (pkg.private || pkg.name !== 'pixverse')
    throw new Error('Expected the sanitized public pixverse package')
  return pkg.version
}

export function classifyPublish(result) {
  if (result.status === 0) return 'accepted'
  const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`
  if (/Cannot publish over previously staged version/i.test(output))
    return 'staged'
  if (
    /E409|EPUBLISHCONFLICT|cannot publish over (the )?previously published/i.test(
      output,
    )
  )
    return 'conflict'
  return 'failed'
}

// A publication is never retried automatically: a timeout may follow acceptance.
export async function releasePackages(
  version,
  mode,
  {
    check = checkPublication,
    wait = waitForPublication,
    publish,
    report = () => {},
  } = {},
) {
  if (!['publish', 'verify-only'].includes(mode))
    throw new Error('Invalid release mode')
  const results = []
  const pending = []
  try {
    for (const name of PACKAGES) {
      const row = { name, state: 'checking', detail: '' }
      results.push(row)
      try {
        const initial = await check(name, version)
        if (initial.state === 'published') {
          row.state = 'published'
          continue
        }
        if (mode === 'verify-only') {
          if (initial.state === 'fatal') throw new Error(initial.detail)
          row.state = 'pending'
          pending.push(name)
          continue
        }
        if (initial.state !== 'missing') throw new Error(initial.detail)
        row.state = classifyPublish(await publish(name))
        if (row.state === 'accepted') {
          pending.push(name)
        } else {
          // Resolve concurrent publication before reporting a conflict or uncertain failure.
          const after = await check(name, version)
          if (after.state === 'published') row.state = 'published'
          else if (row.state === 'staged') {
            row.detail =
              'npm reports a staged version; registry processing or review may still be pending. Waiting for public visibility without republishing. If unresolved, check npm notifications and Staged Packages, then use verify-only.'
            if (after.state !== 'fatal') pending.push(name)
          } else if (row.state === 'conflict') {
            row.detail =
              'Version conflict; check npm version history and registry visibility, then run verify-only. Do not blindly republish.'
          } else {
            row.detail =
              'npm publish failed or timed out; acceptance is unknown. Inspect the npm log and use verify-only before attempting another publish.'
          }
        }
      } catch (error) {
        row.state = 'failed'
        row.detail = error.message
      } finally {
        // Persist every branch, including early continues, before moving on or polling.
        report(results)
      }
    }
    if (pending.length) {
      try {
        await wait(pending, version)
        for (const row of results)
          if (pending.includes(row.name)) {
            row.state = 'published'
            row.detail = ''
          }
      } catch (error) {
        for (const row of results) {
          if (!pending.includes(row.name)) continue
          const current = await check(row.name, version)
          const previousDetail = row.detail
          row.state =
            current.state === 'published'
              ? 'published'
              : row.state === 'staged'
                ? 'staged'
                : 'pending'
          row.detail =
            row.state === 'published'
              ? ''
              : [previousDetail, error.message].filter(Boolean).join(' ')
        }
      }
    }
    if (results.some((row) => row.state !== 'published')) {
      throw new Error(
        'Release incomplete. Inspect the package summary; use verify-only after resolving pending publication or approval.',
      )
    }
    return results
  } finally {
    report(results)
  }
}

async function main() {
  const [tag, mode = 'publish'] = process.argv.slice(2)
  const original = readFileSync('package.json', 'utf8')
  const pkg = JSON.parse(original)
  const version = validateRelease(tag, pkg)
  let latest = []
  try {
    await releasePackages(version, mode, {
      publish: async (name) => {
        writeFileSync(
          'package.json',
          JSON.stringify({ ...pkg, name }, null, 2) + '\n',
        )
        const result = spawnSync(
          'npm',
          [
            'publish',
            '--provenance',
            '--access',
            'public',
            '--tag',
            'latest',
            '--registry=https://registry.npmjs.org',
          ],
          {
            encoding: 'utf8',
            timeout: 120_000,
            maxBuffer: 8 * 1024 * 1024,
          },
        )
        process.stdout.write(result.stdout ?? '')
        process.stderr.write(result.stderr ?? '')
        if (result.error) console.error(result.error.message)
        return result
      },
      report: (rows) => {
        latest = rows
        if (process.env.RELEASE_REPORT)
          writeFileSync(
            process.env.RELEASE_REPORT,
            JSON.stringify({ version, mode, packages: rows }, null, 2) + '\n',
          )
      },
    })
  } finally {
    writeFileSync('package.json', original)
    const summary = [
      `## npm release ${tag} (${mode})`,
      ...latest.map(
        (row) =>
          `- **${row.name}**: ${row.state}${row.detail ? ` — ${row.detail.replaceAll('\n', ' ')}` : ''}`,
      ),
      '',
      'Recovery: inspect registry visibility and npm notifications; review Staged Packages if an approval is available. Dispatch Release with the same tag and mode `verify-only`. No automatic publish retries or approvals.',
      '',
    ].join('\n')
    console.log(summary)
    if (process.env.GITHUB_STEP_SUMMARY)
      appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary)
  }
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

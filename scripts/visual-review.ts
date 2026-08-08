/**
 * Visual review harness.
 *
 * Captures deterministic screenshots of the production build so the Founder
 * and ChatGPT Product Lead can review the real rendered experience without
 * depending on their own web access to a deployed URL.
 *
 *   npm run visual:review                        # build if needed, serve, capture
 *   npm run visual:review -- --url=https://...   # capture a deployed environment
 *   npm run visual:review -- --routes=/,/music   # narrow the set
 *
 * Deliberately uses playwright-core with a system browser channel: it
 * downloads nothing at install time, so Vercel builds are unaffected and no
 * test tooling reaches the production bundle.
 */

import { exec, spawn, type ChildProcess } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium, type Browser, type Page } from 'playwright-core'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/* -------------------------------------------------------------------------- */
/* Review set                                                                  */
/* -------------------------------------------------------------------------- */

interface Route {
  path: string
  name: string
}

/** Every distinct page template, so a regression cannot hide in a detail view. */
const DEFAULT_ROUTES: Route[] = [
  { path: '/', name: 'home' },
  { path: '/stories', name: 'stories' },
  { path: '/music', name: 'music' },
  { path: '/studio', name: 'studio' },
  { path: '/current-work', name: 'current-work' },
  { path: '/listening-room', name: 'listening-room' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
  { path: '/stories/the-secret-garden', name: 'story-detail' },
  { path: '/stories/collections/cozy-classics', name: 'collection-detail' },
  { path: '/music/walnut-room', name: 'music-detail' },
  { path: '/studio/notes/room-tone-as-an-instrument', name: 'studio-note-detail' },
]

interface Viewport {
  id: string
  width: number
  height: number
  isMobile: boolean
}

const VIEWPORTS: Viewport[] = [
  { id: 'desktop-1440', width: 1440, height: 900, isMobile: false },
  { id: 'mobile-390', width: 390, height: 844, isMobile: true },
]

/* -------------------------------------------------------------------------- */
/* Arguments                                                                   */
/* -------------------------------------------------------------------------- */

function arg(name: string): string | undefined {
  const prefix = `--${name}=`
  const match = process.argv.find((value) => value.startsWith(prefix))
  return match?.slice(prefix.length)
}

const flags = {
  url: arg('url') ?? process.env.VISUAL_REVIEW_URL,
  port: Number(arg('port') ?? process.env.VISUAL_REVIEW_PORT ?? 4319),
  outDir: path.resolve(projectRoot, arg('out') ?? '.review/screenshots'),
  forceBuild: process.argv.includes('--build'),
  routes: arg('routes')
    ?.split(',')
    .map((value) => value.trim())
    .filter(Boolean),
}

const routes: Route[] = flags.routes
  ? flags.routes.map((routePath) => ({
      path: routePath.startsWith('/') ? routePath : `/${routePath}`,
      name:
        routePath === '/'
          ? 'home'
          : routePath.replace(/^\//, '').replace(/\//g, '-').replace(/[^a-z0-9-]/gi, ''),
    }))
  : DEFAULT_ROUTES

/* -------------------------------------------------------------------------- */
/* Process helpers                                                             */
/* -------------------------------------------------------------------------- */

function run(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    })
    child.on('error', reject)
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} exited with code ${code}`)),
    )
  })
}

/** Kill the whole process tree — `next start` spawns children. */
function killTree(child: ChildProcess): Promise<void> {
  return new Promise((resolve) => {
    if (child.pid === undefined || child.exitCode !== null) return resolve()

    if (process.platform === 'win32') {
      exec(`taskkill /pid ${child.pid} /T /F`, () => resolve())
    } else {
      try {
        process.kill(-child.pid, 'SIGTERM')
      } catch {
        child.kill('SIGTERM')
      }
      resolve()
    }
  })
}

async function waitForServer(baseUrl: string, timeoutMs = 60_000): Promise<void> {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl, { redirect: 'manual' })
      if (response.status > 0) return
    } catch {
      // not listening yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error(`Server did not respond at ${baseUrl} within ${timeoutMs}ms`)
}

/* -------------------------------------------------------------------------- */
/* Browser                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Software rasterisation and fixed colour/text rendering.
 *
 * The design leans on large `blur()` light pools and a `backdrop-blur` header.
 * On the GPU those rasterise slightly differently between runs and between
 * machines, which makes captures hard to compare. Software rendering with
 * hinting and subpixel antialiasing disabled removes that variance.
 */
const DETERMINISM_ARGS = [
  '--disable-gpu',
  '--disable-lcd-text',
  '--font-render-hinting=none',
  '--force-color-profile=srgb',
  '--hide-scrollbars',
  '--disable-skia-runtime-opts',
]

async function launchBrowser(): Promise<{ browser: Browser; channel: string }> {
  const preferred = process.env.VISUAL_REVIEW_CHANNEL
  const candidates = preferred ? [preferred] : ['chrome', 'msedge']

  for (const channel of candidates) {
    try {
      const browser = await chromium.launch({ channel, headless: true, args: DETERMINISM_ARGS })
      return { browser, channel }
    } catch {
      // try the next channel
    }
  }

  // Falls back to a Playwright-managed Chromium if one has been installed.
  try {
    const browser = await chromium.launch({ headless: true, args: DETERMINISM_ARGS })
    return { browser, channel: 'playwright-chromium' }
  } catch (error) {
    throw new Error(
      'Could not launch a browser.\n' +
        '  Install Google Chrome or Microsoft Edge, or run:\n' +
        '    npx playwright-core install chromium\n' +
        `  Underlying error: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}

/* -------------------------------------------------------------------------- */
/* Capture                                                                     */
/* -------------------------------------------------------------------------- */

interface Shot {
  route: string
  viewport: string
  file: string
  status: number
  bytes: number
  problems: string[]
}

/**
 * Requests the browser makes on its own that are not site failures.
 *
 * `/favicon.ico` is fetched automatically by Chrome whether or not the site
 * references one. Chouinard Studios has no icon asset yet, so this would
 * otherwise fail every run for a reason unrelated to rendering.
 */
function isIgnorableRequest(url: string): boolean {
  return /\/favicon\.ico(\?|$)/i.test(url)
}

/**
 * Console noise that is not a rendering failure. Generic "Failed to load
 * resource" lines are dropped here because the response listener reports the
 * same failures with the URL attached, which is far more actionable.
 */
function isIgnorableConsoleError(text: string): boolean {
  return /Failed to load resource|Download the React DevTools/i.test(text)
}

async function capture(
  page: Page,
  baseUrl: string,
  route: Route,
  viewport: Viewport,
  outDir: string,
): Promise<Shot> {
  const problems: string[] = []
  const consoleErrors: string[] = []
  const pageErrors: string[] = []
  const badResponses: string[] = []

  const onConsole = (message: { type: () => string; text: () => string }) => {
    if (message.type() === 'error' && !isIgnorableConsoleError(message.text())) {
      consoleErrors.push(message.text())
    }
  }
  const onPageError = (error: Error) => pageErrors.push(error.message)

  // Any asset the page itself asked for and did not get.
  const onResponse = (response: { status: () => number; url: () => string }) => {
    const status = response.status()
    const url = response.url()
    if (status >= 400 && url.startsWith(baseUrl) && !isIgnorableRequest(url)) {
      badResponses.push(`HTTP ${status} ${url.slice(baseUrl.length) || '/'}`)
    }
  }

  page.on('console', onConsole)
  page.on('pageerror', onPageError)
  page.on('response', onResponse)

  let status = 0
  try {
    const response = await page.goto(`${baseUrl}${route.path}`, {
      waitUntil: 'load',
      timeout: 45_000,
    })
    status = response?.status() ?? 0
    if (status !== 200) problems.push(`HTTP ${status}`)

    // Fonts and webfont metrics must settle or screenshots differ between runs.
    await page.evaluate(() => document.fonts.ready)

    const rendered = await page.evaluate(() => {
      const main = document.querySelector('main')
      const h1 = document.querySelector('h1')
      return {
        hasMain: Boolean(main),
        textLength: (main?.textContent ?? '').trim().length,
        hasHeading: Boolean(h1),
        bodyHeight: document.body.scrollHeight,
      }
    })

    if (!rendered.hasMain) problems.push('no <main> element')
    if (!rendered.hasHeading) problems.push('no <h1>')
    if (rendered.textLength < 200) problems.push(`main text too short (${rendered.textLength})`)
    if (rendered.bodyHeight < viewport.height) {
      problems.push(`page shorter than viewport (${rendered.bodyHeight}px)`)
    }
  } catch (error) {
    problems.push(error instanceof Error ? error.message : String(error))
  }

  page.off('console', onConsole)
  page.off('pageerror', onPageError)
  page.off('response', onResponse)

  if (pageErrors.length > 0) problems.push(`uncaught error: ${pageErrors[0]}`)
  if (consoleErrors.length > 0) problems.push(`console error: ${consoleErrors[0]}`)
  if (badResponses.length > 0) problems.push(`broken asset: ${badResponses[0]}`)

  const file = path.join(outDir, `${route.name}--${viewport.id}.png`)
  let bytes = 0

  try {
    // The sticky header uses backdrop-blur, which samples whatever sits behind
    // it. Pin the scroll to the top and let two frames settle, or the same page
    // can produce byte-different captures between runs.
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          window.scrollTo(0, 0)
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        }),
    )

    const buffer = await page.screenshot({
      path: file,
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
    })
    bytes = buffer.length
  } catch (error) {
    problems.push(`screenshot failed: ${error instanceof Error ? error.message : String(error)}`)
  }

  return { route: route.path, viewport: viewport.id, file, status, bytes, problems }
}

/* -------------------------------------------------------------------------- */
/* Main                                                                        */
/* -------------------------------------------------------------------------- */

async function main(): Promise<void> {
  let server: ChildProcess | undefined
  let baseUrl = flags.url

  if (!baseUrl) {
    const needsBuild = flags.forceBuild || !existsSync(path.join(projectRoot, '.next/BUILD_ID'))
    if (needsBuild) {
      console.log('› Building production bundle...')
      await run('npm', ['run', 'build'])
    } else {
      console.log('› Using existing production build (pass --build to rebuild).')
    }

    baseUrl = `http://127.0.0.1:${flags.port}`
    console.log(`› Starting production server on port ${flags.port}...`)
    server = spawn('npx', ['next', 'start', '-p', String(flags.port)], {
      cwd: projectRoot,
      stdio: 'ignore',
      shell: process.platform === 'win32',
      detached: process.platform !== 'win32',
    })
    await waitForServer(baseUrl)
  } else {
    baseUrl = baseUrl.replace(/\/$/, '')
    console.log(`› Targeting ${baseUrl}`)
  }

  await rm(flags.outDir, { recursive: true, force: true })
  await mkdir(flags.outDir, { recursive: true })

  const { browser, channel } = await launchBrowser()
  console.log(`› Browser: ${channel}\n`)

  const shots: Shot[] = []

  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
        isMobile: viewport.isMobile,
        hasTouch: viewport.isMobile,
        // Determinism: no motion, fixed locale and clock zone.
        reducedMotion: 'reduce',
        colorScheme: 'dark',
        locale: 'en-US',
        timezoneId: 'UTC',
      })

      const page = await context.newPage()

      for (const route of routes) {
        const shot = await capture(page, baseUrl, route, viewport, flags.outDir)
        shots.push(shot)

        const label = `${route.path} @ ${viewport.id}`
        if (shot.problems.length === 0) {
          console.log(`  ok    ${label.padEnd(52)} ${(shot.bytes / 1024).toFixed(0)} KB`)
        } else {
          console.log(`  FAIL  ${label.padEnd(52)} ${shot.problems.join('; ')}`)
        }
      }

      await context.close()
    }
  } finally {
    await browser.close()
    if (server) await killTree(server)
  }

  const failures = shots.filter((shot) => shot.problems.length > 0)
  const capturedAt = new Date().toISOString()

  await writeFile(
    path.join(flags.outDir, 'manifest.json'),
    `${JSON.stringify({ capturedAt, baseUrl, browser: channel, shots }, null, 2)}\n`,
    'utf8',
  )

  const index = [
    '# Chouinard Studios — visual review set',
    '',
    `Captured: ${capturedAt}`,
    `Source: ${baseUrl}`,
    `Browser: ${channel}`,
    '',
    'Review artifacts only. Not product content, not committed.',
    '',
    '| Route | Viewport | Screenshot | Status |',
    '| --- | --- | --- | --- |',
    ...shots.map(
      (shot) =>
        `| \`${shot.route}\` | ${shot.viewport} | ${path.basename(shot.file)} | ${
          shot.problems.length === 0 ? 'ok' : shot.problems.join('; ')
        } |`,
    ),
    '',
  ].join('\n')

  await writeFile(path.join(flags.outDir, 'index.md'), index, 'utf8')

  const relative = path.relative(projectRoot, flags.outDir).replace(/\\/g, '/')
  console.log(`\n› ${shots.length} screenshots → ${relative}/`)

  if (failures.length > 0) {
    console.error(`\n✗ ${failures.length} page(s) did not render correctly:`)
    for (const failure of failures) {
      console.error(`    ${failure.route} @ ${failure.viewport} — ${failure.problems.join('; ')}`)
    }
    process.exit(1)
  }

  console.log('› All pages rendered.\n')
}

main().catch((error) => {
  console.error(`\n✗ Visual review failed: ${error instanceof Error ? error.message : error}`)
  process.exit(1)
})

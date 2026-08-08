# Chouinard Studios — Visual Review Harness

## Purpose

Product Lead visual critique requires seeing the real rendered site. Direct web access to the deployed environment is not always reliable, so Engineering captures the screenshots locally and reports them through the bridge.

This is review infrastructure. It is not product content and it does not affect the production bundle.

## Command

```bash
npm run visual:review
```

Builds if needed, starts the production server, captures the review set, stops the server, and exits non-zero if any page fails to render.

| Variation | Command |
|---|---|
| Capture a deployed environment | `npm run visual:review -- --url=https://chouinardstudio.vercel.app` |
| Force a fresh build first | `npm run visual:review -- --build` |
| Narrow the set | `npm run visual:review -- --routes=/,/music` |
| Pick a browser | `VISUAL_REVIEW_CHANNEL=msedge npm run visual:review` |

## What is captured

Twelve routes covering every distinct page template, at two viewports:

- **desktop-1440** — 1440 × 900
- **mobile-390** — 390 × 844

Routes: `/`, `/stories`, `/music`, `/studio`, `/current-work`, `/listening-room`, `/about`, `/contact`, plus one story detail, collection, music detail and studio note.

Full-page PNGs, 24 per run.

## Where the artifacts go

```
.review/screenshots/
    <route>--<viewport>.png
    manifest.json     machine-readable record of the run
    index.md          human-readable table
```

`.review/` is **gitignored**. Screenshots are regenerated on demand and are never committed — they are review artifacts, not product content.

## When Engineering runs it

Claude runs `npm run visual:review` and reports the results after any **substantial visual or experience change**, including:

- new or restructured pages
- layout, spacing or typography changes
- palette, token or component-styling changes
- changes to how content records render
- dependency upgrades that could affect rendering

Not required for content-only edits, copy fixes, or non-visual refactors — though running it is cheap and never wrong.

## How Engineering reports

After capturing, Claude reports:

1. the absolute path to `.review/screenshots/`
2. which routes and viewports changed, and what to look at
3. any render failures, with the failing route named
4. its own read of the result before handing off — Claude can open the PNGs, so obvious breakage should be caught before the Product Lead sees it

The Founder or Product Lead then opens the PNGs directly, or the Founder relays them to the Product Lead.

## Determinism

Captures are byte-identical between runs on the same machine, verified across three consecutive runs. This is deliberate: a diff between two runs then means a real change, not rendering noise.

Controlled for: animations disabled, `prefers-reduced-motion` forced, fixed viewport and device scale factor, fixed locale and timezone, fonts awaited, scroll pinned, software rasterisation with font hinting and subpixel antialiasing disabled.

The last point matters because the design relies on large `blur()` light pools and a `backdrop-blur` header, which rasterise inconsistently on the GPU.

## Failure behaviour

A route fails, and the command exits `1`, if it returns a non-200 status, is missing `<main>` or `<h1>`, renders less than 200 characters of text, is shorter than the viewport, throws an uncaught error, logs a console error, or requests an asset that 404s.

The browser's automatic `/favicon.ico` request is ignored, because no icon asset exists yet.

## Tooling and CI

`playwright-core` is a devDependency driving the system Chrome or Edge install. It downloads no browser at install time, so **Vercel build time and bundle size are unaffected**, and no test tooling reaches the production bundle.

If the harness is ever added to CI, the runner needs a Chromium-family browser — either preinstalled, or via `npx playwright-core install chromium`. It is not part of `npm run check` and does not gate deploys.

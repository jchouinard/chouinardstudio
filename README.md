# Chouinard Studios

Chouinard Studios is an independent Team Chouinard operating business.

Repository: chouinardstudio
Domain: chouinardstudio.com

This repository is separate from AI Support, Decision Widget, Piksake, and all other Team Chouinard products.

Cross-product requirements must be routed through the Team Chouinard Product Collaboration Bridge rather than implemented across repository boundaries.

## The website

A statically rendered Next.js site for the public Chouinard Studios experience.

| | |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4, brand tokens in `app/globals.css` |
| Content | Typed records in `content/`, validated with Zod at build time |
| Tests | Vitest |
| Target | Vercel (all routes prerendered; no server runtime required) |

### Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (fails on invalid content) |
| `npm run start` | Serve the production build |
| `npm run check` | typecheck + lint + content validation + tests |
| `npm run content:validate` | Content report without a full build |
| `npm run visual:review` | Screenshot every page at desktop + mobile for Product Lead review |

Visual review artifacts land in `.review/screenshots/` (gitignored). See [.team-chouinard/VISUAL-REVIEW.md](.team-chouinard/VISUAL-REVIEW.md).

### Preview build

`content/site.ts` sets `isPreviewBuild: true`. While that flag is on:

- every page shows a banner stating the content is representative
- `robots.txt` disallows all crawlers
- pages are marked `noindex`

Set it to `false` once real releases and real photography are in place.

### Adding content

Content lives in `content/` as typed records — no code changes required to publish.

| To add… | Edit |
|---|---|
| An audiobook | `content/stories.ts` |
| A collection | `content/collections.ts` |
| Music | `content/music.ts` |
| A current project | `content/projects.ts` |
| A studio note | `content/studio-notes.ts` |
| A curated link | `content/curated.ts` |
| A listening/purchase platform | `content/platforms.ts` |

Schemas and field documentation are in `content/schema.ts`. A new record automatically appears in the homepage activity stream, Current Work and any other relevant surface — one entry, many surfaces.

Set `origin: 'real'` on genuine work; `'example'` renders a visible "Example" badge.

External destinations use `status: 'pending'` until a real URL exists, so the site never implies platform availability it does not have.

## Product knowledge base

Canonical product truth lives in `.team-chouinard/product-kb/`. Read it before making product-affecting changes.

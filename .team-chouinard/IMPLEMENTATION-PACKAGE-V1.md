# Chouinard Studios — Implementation Package v1

## Status

Approved for Engineering implementation.

## Objective

Build the first real public Chouinard Studios website as a premium, living creative studio experience that can launch quickly, evolve with real production, and remain easy to keep current.

This is not a prototype-only exercise. Build a production-quality v1 foundation suitable for deployment to Vercel and eventual use at chouinardstudio.com.

## Product Truth

Engineering must read and honor the Product KB before implementation, especially:

- product-kb/BUSINESS-DEFINITION.md
- product-kb/BRAND-DIRECTION.md
- product-kb/AUDIOBOOK-BUSINESS.md
- product-kb/CONTENT-OPERATING-MODEL.md
- product-kb/CURATED-FRESHNESS.md
- product-kb/EXPERIENCE-CATALOG.md
- product-kb/JOURNEY-SPINE.md
- product-kb/ARCHITECTURE.md
- product-kb/FOUNDER-DECISIONS.md
- design-references/README.md

## v1 Public Experience

Create the initial experience architecture around:

- Home
- Music
- Stories
- Studio
- Current Work
- About
- Contact / Inquiries

Exact navigation labels may be refined during implementation if the underlying experience responsibilities remain intact.

## Homepage

The homepage should feel cinematic and alive, not like a generic services site.

Suggested narrative flow:

1. immersive brand hero
2. latest/current Chouinard Studios activity
3. featured audiobook/story
4. latest music / current musical work
5. inside the studio / craft
6. current projects or latest-from-the-studio stream
7. restrained curated-inspiration section
8. follow/listen/explore/inquire closing paths

Do not use a conventional "professional audio services" hero.

The first impression should communicate that this is a place where remarkable things are being made.

## Visual Direction

Use the approved dream-studio aesthetic as design language:

- deep warm charcoal / near black
- dark walnut
- burgundy / oxblood
- restrained brass / antique gold
- warm ivory
- rich textiles / Persian-rug influence
- low-key cinematic lighting
- premium instruments and boutique studio gear in context
- modern production capability inside a timeless handcrafted environment

Avoid SaaS styling, sterile white layouts, neon/cyber aesthetics, childish audiobook branding, generic stock-studio visuals, or gear-showroom presentation.

Exact fonts/tokens may be proposed by Engineering. Prefer an elegant editorial display/serif paired with a highly legible supporting sans.

## Content and Data

Implement a typed structured content layer that can be maintained without redesigning pages.

At minimum support records for:

- stories/audiobooks
- collections/groupings
- music items
- projects/updates
- studio notes
- curated external items
- platform destinations

Seed the site with clearly labeled representative/demo content where real release data is not yet available. Never fabricate real commercial claims, release history, audience metrics, customers, awards, or platform availability.

Demo records should be intentionally easy to replace with real data.

## Audiobook Behavior

- Beautiful catalog/discovery pages
- Flexible individual titles + collections/groupings
- Preview/sample support
- Multiple external purchase/listening destinations
- No direct checkout
- No DRM, entitlement, account, or file-delivery system
- Do not hard-code launch around one collection or fixed title count

## Music Behavior

- Music remains flagship brand identity
- Support latest/current work
- Support external SoundCloud, Spotify, Apple Music, and future platform destinations through extensible link data
- Support official embeds when practical
- Do not turn the site into a production-services sales funnel

## Freshness

The site must feel current with limited manual maintenance.

Implement reusable recent/featured content surfaces so one content record can appear appropriately in multiple areas.

Design for future feed/API/playlist integrations, but do not build a fragile aggregation engine prematurely.

Curated third-party content is secondary to Chouinard Studios' own work and must be sourced through approved embeds/links/feeds rather than copied wholesale.

## Quality Bar

- responsive desktop/tablet/mobile
- accessible interaction and readable contrast
- strong Core Web Vitals mindset
- semantic metadata / SEO fundamentals
- tasteful motion only where it improves the experience
- no autoplay audio
- graceful handling of missing optional media
- external links clearly represented and safe
- easy replacement of seed content with real work

## Technical Direction

Follow product-kb/ARCHITECTURE.md.

Deployable target: Vercel.

Preferred stack: modern stable Next.js + React + TypeScript, App Router, static/server-first rendering.

Engineering may choose styling/testing/content-validation implementation details and current stable versions.

Do not add a heavyweight CMS or paid infrastructure without a demonstrated need.

Do not couple to AI Support yet.

## Engineering Workflow

1. Pull latest main.
2. Read the full Product KB and this implementation package.
3. Inspect the repository and propose the exact technical plan before making broad changes.
4. Implement the v1 foundation and representative content.
5. Run lint/typecheck/build/tests as appropriate.
6. Run the site locally and inspect key routes at desktop and mobile sizes.
7. Fix obvious visual/runtime issues before handoff.
8. Commit and push the implementation.
9. Report architecture choices, routes, content model, verification performed, known limitations, commit SHA, and how Product Lead can review the running experience.

## Product Review Gate

After Engineering implementation, the Founder and ChatGPT Product Lead will review the running product and provide visual/experience critique.

Expect iterative refinement. Do not over-engineer v1 to avoid iteration.

# Architecture

Status: Approved for v1 implementation.

## Delivery Goal

Build a fast, maintainable, visually rich public website for Chouinard Studios that supports music, audiobook/story discovery, studio credibility, current work, curated freshness, and external listening/purchase destinations without creating a heavy operations burden.

## Approved v1 Direction

- Deploy on Vercel.
- Use a modern React / Next.js application with TypeScript and the current stable App Router pattern unless Engineering identifies a concrete blocker.
- Prefer server-rendered/static-first pages and progressive enhancement over a client-heavy application.
- Keep content separate from presentation through typed structured content records.
- Do not introduce a heavyweight CMS at launch.
- Design the content layer so a CMS/editor can be added later without replacing the site architecture.
- Do not build direct audiobook commerce, DRM, entitlements, customer accounts, or file-delivery systems.
- Purchases and full-release listening happen on external distribution/streaming platforms.
- Support on-site previews and official embeds where practical and permitted.
- Keep external platform destinations extensible rather than hard-coded to a fixed provider list.
- Keep AI Support decoupled until an approved integration exists.

## Content Model Requirements

Engineering should define typed reusable records sufficient for at least:

- audiobook/story title
- collection/grouping
- music item/release/current track
- current project/update
- studio note / behind-the-work item
- curated external item
- platform destination/link

The model must support publish state, dates where meaningful, featuring/reordering, artwork/media references, summaries/context, optional previews/embeds, and future regrouping without page redesign.

A single content record should be reusable across multiple surfaces (for example homepage + Music + Current Work) without duplicate entry.

## Media Direction

- Optimize cinematic imagery aggressively for web delivery.
- Prefer modern responsive image formats and framework image tooling.
- Do not commit large production media libraries to git if an external media pipeline becomes more appropriate; Engineering may propose a lightweight asset-hosting strategy when real media volume warrants it.
- The current dream-studio reference images are aesthetic references, not documentary photography of the finished physical studio.
- Real studio photography should increasingly replace concept imagery for factual representation as the physical environment develops.

## Freshness Direction

The site should provide high perceived freshness with low maintenance burden through structured recent activity, current/featured ordering, reusable content, external embeds, and later approved feed integrations.

Curated outside material must use official embeds/feeds/APIs or source links and original Chouinard Studios context. Do not scrape and republish complete third-party content.

## Analytics

Use a lightweight, privacy-conscious, vendor-neutral event abstraction so future AI Support integration can consume approved behavioral signals without coupling this application to unfinished AI Support code.

Exact analytics provider may be selected by Engineering based on cost, Vercel compatibility, privacy, and operational simplicity.

## Engineering Discretion

Claude Engineering Lead may select implementation details such as styling approach, component organization, validation library, test tooling, and precise package versions, provided they preserve the approved product requirements and repository boundary.

Avoid unnecessary infrastructure and paid services at v1.

# Chouinard Studios Admin / Content Console

## Status

**Approved future capability — designed next, not implemented.**

Only the deployment seam exists today: a minimal, non-sensitive placeholder on the `admin/base` branch, intended for `admin.chouinardstudio.com`. No authentication, database, CMS, API or write capability has been built.

The Admin V1 experience is now specified and awaiting Founder / Product Lead approval:

- [ADMIN-V1-PRODUCT-SPEC.md](ADMIN-V1-PRODUCT-SPEC.md) — operating model, information architecture, workflows, content states, data models, V1 vs future scope
- [ADMIN-V1-EXPERIENCE-MAP.md](ADMIN-V1-EXPERIENCE-MAP.md) — the primary user journeys

This document remains the record of the deployment seam and the standing principles. The specification supersedes its "anticipated workflows" section as the planning reference.

## Purpose

A private, authenticated operating console for Chouinard Studios — the place the family runs the business from, separate from the public experience.

## Operating principle

> Chouinard Studios owns the catalog, brand, discovery and audience experience.
> External distribution platforms own purchasing, listening transactions and delivery.

The console manages what the studio owns. It does not attempt to recreate what the distribution platforms already do.

## The point of building it

> The Admin Console should use AI to eliminate routine website and business maintenance, so the family spends its time creating music, audiobooks and other work rather than managing the website.

Success is measured in maintenance work removed, not features added. If a screen makes someone do data entry a machine could have done, it has failed its purpose.

## Anticipated workflows

Indicative scope for Admin V1 planning, not an approved backlog:

- Music, song and album management
- Audiobook, story and collection management
- Current Work and project management
- Studio Notes
- Listening Room and curated sources
- Media and asset management
- External distribution destinations
- AI-assisted metadata and content completion
- Publishing and review workflows
- Future analytics, and AI Support integration when an approved interface exists

## Current technical seam

| | |
|---|---|
| Branch | `admin/base` |
| Intended domain | `admin.chouinardstudio.com` |
| Route | `/admin`, with a host-based rewrite serving it at the domain root |
| Protection | Vercel Deployment Protection on the branch deployment |
| Present on `main` | No |

The placeholder is a static page containing no business data and no mutation capability. Its safety does not depend on the URL being unknown.

The admin surface stays out of public navigation, the public sitemap and search indexing.

## Decisions deliberately deferred

Authentication provider, database, content-management model, asset hosting, API shape, AI assistance design, and whether the console eventually becomes its own Vercel project rather than a branch deployment. All belong to Admin V1 architecture, after the Product Lead defines the experience.

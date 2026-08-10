# Admin V1 — Studio Console Product Specification

## Status

**Founder + Product Lead approved as the Admin V1 product baseline**, after two corrections: the distribution journey now routes through Review rather than a Distribution destination, and replacing a live public asset now requires an explicit confirmation and an audit entry.

**Not implemented.** No database, CMS, authentication provider, AI API, file storage, distribution API, write endpoint or paid service exists or is chosen here. See [ADMIN-CONSOLE.md](ADMIN-CONSOLE.md) for the current deployment seam, and [ADMIN-V1-EXPERIENCE-MAP.md](ADMIN-V1-EXPERIENCE-MAP.md) for the journeys this specification implies.

---

## 1. Purpose

Admin V1 exists so that Andrew and Jen can run Chouinard Studios without editing code, without maintaining pages, and without learning the site's architecture.

The measure of success is **work removed, not features shipped**. If a screen makes someone type something the system could have derived, drafted, or remembered, that screen has failed.

The console is an instrument for a working studio: express intent, supply source material, approve. It is not a CMS, and it never asks anyone to "edit the homepage."

### The one principle everything else serves

> **One content record drives every appropriate public surface.**

Adding a song updates Music, the homepage, Current Work, the activity log, its project, and search metadata. The person adding it thinks about a song, not about six pages. The public site already works this way — Admin manages the record; the site derives the surfaces.

---

## 2. Users

### Founder / Admin

Needs to see the whole studio in one glance: what is published, what is in progress, what is blocked, what the system is proposing, where distribution stands, and whether the site still looks alive. Publishes studio updates. Arbitrates anything ambiguous.

### Music creator / producer — Andrew

Adds and maintains songs, recordings, albums, demos, works in progress, artwork, credits, previews, platform links and release state.

Must never need to know Git, JSON, deployment, page templates or content schemas.

### Narrator / audiobook creator — Jen

Adds and maintains titles, authors, source and rights information, narration status, covers, audio, credits, collections, descriptions, previews, destinations and release state.

Must never need to design a page or understand site architecture.

### Not a user in V1

No public accounts, no collaborators, no client access, no external contributors. Adding them is a permissions problem, and permissions are deferred (§16).

---

## 3. Design principles

**1. Intent in, structure out.** The user says what happened or what they made. The system works out where it belongs.

**2. Known and Suggested never blur.** Every field carries provenance. A machine-drafted sentence is visibly a draft until a person accepts it. This is enforced by the data model, not by tone (§9).

**3. Facts are human-confirmed.** Dates, credits, rights, runtimes, release status and platform availability can be *drafted* by AI and can only be *confirmed* by a person. The system must be structurally incapable of publishing an unconfirmed fact.

**4. Nothing is silently changed.** Automation opens review tasks; it does not edit published records on its own.

**5. Fast paths beat complete forms.** The common case — a studio update, a status change, a new link — should take seconds. Completeness is something the system chases on the user's behalf, not a wall in front of them.

**6. Absence is a normal state.** No artwork, no preview, no destinations, no runtime: all fine. The public site already degrades gracefully. Admin should never block on optional material.

**7. The public site's content model is the output contract.** Admin produces the same typed records the site consumes today. This keeps the public experience static-first and means Admin can be replaced or bypassed without redesigning the site.

---

## 4. Information architecture

### V1 navigation — five destinations

| | Purpose |
|---|---|
| **Studio** | The operating dashboard. What needs attention. |
| **Music** | The music catalog and its records. |
| **Stories** | The audiobook / storytelling catalog. |
| **Studio Log** | Projects, studio updates and craft notes — everything that "happens". |
| **Review** | The queue: AI suggestions, warnings, distribution issues. |

Five items, each mapping to a thing a person actually intends to do. Studio Log deliberately unifies projects, updates and notes because the public site already presents them as one activity stream; splitting them in Admin would invent a distinction the reader never sees.

### What should NOT exist in V1

- **A Media library.** Assets attach in context — you upload a cover while adding the record. Nobody sets out to "manage media". A browsable library is FUTURE.
- **A Distribution section.** Destinations are edited on the record they belong to. The cross-cutting need — *which links are broken or missing* — is a filter inside Review, not a section.
- **A People/Credits admin screen.** Credits are attached through a picker that can create a person inline. A management screen only earns its place once there are enough people to browse.
- **Settings.** V1 has almost nothing to configure. No auth roles, no integrations, no publishing options worth a screen.
- **Listening Room / curated sources.** FUTURE (§14).
- **Analytics.** Explicitly out (§16).
- **A page builder, template editor, or anything resembling one.** The site derives itself.

### Screen inventory

Each catalog is two screens: a **list** (filterable by state, sortable by recency, showing what is blocked) and a **record editor**. Plus the dashboard, the Review queue, and three quick-add flows. That is the whole console.

---

## 5. Dashboard — "What needs attention in the studio?"

Not analytics. A triage surface, ordered by decision burden.

| Block | Answers | Example |
|---|---|---|
| **Needs you** | What is blocked on a human decision? | Rights not confirmed on *The Secret Garden*; two credits unconfirmed on *Walnut Room* |
| **Continue** | What was I in the middle of? | 3 drafts, most recent first |
| **Ready to publish** | What is one approval from live? | Passed all publish checks |
| **Suggestions waiting** | What has the system drafted for me? | 4 records with unreviewed suggestions |
| **Distribution** | What is wrong out there? | 1 broken link, 1 platform live but site says pending |
| **Recently published** | Did the thing I did actually land? | Last 5, with links to the live pages |
| **Quick add** | Start something | Music · Story · Update |

"Needs you" is first and is the only block that should ever be empty-by-aspiration. If everything else is empty the studio is simply quiet; if "Needs you" is empty the studio is unblocked.

**Freshness signal.** One line: when the public site last changed. This is the closest thing to a metric V1 should carry, because the Living Studio Principle is a real product commitment and silence is the failure mode.

---

## 6. Music workflow

### Add

Required to save a draft: **title**. Nothing else.

Offered immediately, all optional: type (song / recording / album / demo / performance / other), production status (idea / in progress / mixing / finished / released), audio, artwork, short notes, credits.

The notes field is the important one. A sentence like *"electric through the small amp, kept the take with the mistake"* is the raw material the assistant works from.

### Complete

**Help me complete this** inspects the record and returns the four panes (§9). For music it can propose:

- short description and longer editorial description
- themes and tags
- association with an existing project or recording session
- display-title formatting
- **credits that still need confirmation** — named as questions, never asserted
- artwork direction when artwork is missing
- homepage feature eligibility
- Current Work placement
- a release-state checklist
- SEO and social metadata
- an explicit list of what is missing

### Approve and publish

Actions: **Accept · Edit · Reject · Accept all editorial · Regenerate · Save draft · Publish**.

Publish checks for music: title present; type set; production state set; at least one description accepted; every credit either confirmed or removed; no factual field left in `ai-suggested` state.

Artwork is *not* a publish blocker — the public site generates a deterministic cover, and Admin should say so plainly rather than demanding an upload.

---

## 7. Audiobook / story workflow

Same shape, with one difference that governs everything: **rights**.

### Rights are a gate, not a field

```
rights.basis          public-domain | licensed | original | permission-granted
rights.evidence       note and/or URL supplied by a human
rights.confirmedBy    person
rights.confirmedAt    timestamp
```

**A story cannot be published until rights are human-confirmed.** AI may flag rights questions, surface a publication date, or note that a work is *commonly understood* to be public domain — and must never set `confirmed`, and must never present inference as a legal conclusion. The warning pane says what is uncertain; a person answers it.

### Lifecycle

Production state, distinct from editorial state:

```
candidate → rights review → in production → ready → distributed → live
```

A title can be publicly visible from `in production` onward (the catalog already shows "In production" and "Coming soon"); it just cannot claim availability it does not have.

### Assistance can propose

Synopsis, short and long descriptions, themes, audience and family guidance, collection membership, keywords, preview copy, external-platform metadata, promotional copy, a release checklist, and — flagged as opportunity, not commitment — possible ESL / international-support angles per AUDIOBOOK-BUSINESS.md.

---

## 8. Current Work / studio update

The fastest path in the console. One field.

> "Recorded piano and guitar on Midnight Window tonight. Still working on the ending."

From that, the assistant proposes: a concise public phrasing, the linked project or song, a category, today's date, which surfaces it belongs on, and whether it is durable enough for the long-term studio log or is just today's activity.

One approval publishes it.

**Truthfulness rule for updates.** The assistant rephrases what the human said; it does not add events. If the input implies a state change — *"finished mastering"* — that becomes a **suggested** production-state change requiring a separate acceptance, not an applied one. The date defaults to now and is never inferred backwards.

---

## 9. AI assistance and review model

### The four panes

| Pane | Contains | Authority |
|---|---|---|
| **KNOWN** | Facts supplied or confirmed by a human, or derived from other confirmed records | Source of truth |
| **SUGGESTED** | Machine-drafted copy, metadata, relationships | Proposal only |
| **MISSING** | Information required to publish, or useful but absent | Prompt |
| **WARNINGS** | Inconsistencies, rights questions, unconfirmed credits, dead links, unsupported claims | Blocker or caution |

### Provenance is a field-level property

Every field carries one of:

```
human        entered or explicitly confirmed by a person   → authoritative
ai-suggested drafted, not yet accepted                     → never published
ai-accepted  drafted, then accepted by a person            → authoritative, origin retained
derived      computed from other records                   → recomputed, never edited
imported     from an external system, with source recorded → authoritative, source retained
```

This is what makes principle 2 enforceable. "Never silently fabricate" is not a policy the assistant is asked to honour — it is a state no record can reach, because publishing rejects any factual field still marked `ai-suggested`.

### Editorial vs factual suggestions

- **Editorial** — descriptions, taglines, themes, keywords, promotional copy. Judgement, not truth claims.
- **Factual** — dates, credits, rights, runtimes, release state, platform availability, external IDs.

**Accept all editorial** accepts every editorial suggestion in one action and never touches a factual one. This gives the bulk action a precise, safe definition instead of a vague "apply safe suggestions".

### Actions

Accept · Edit · Reject · Accept all editorial · Regenerate · Mark fact confirmed.

Rejections are remembered per record and field, so the same rejected suggestion is not proposed again.

### Every suggestion shows its basis

A suggestion displays what it was derived from — the notes the user wrote, sibling records, existing credits. A proposal with no basis in supplied material is the definition of fabrication, and should be visibly identifiable as such.

---

## 10. Publishing and content states

Two independent axes. Conflating them is the most likely modelling mistake.

### Editorial state — is it visible on the site?

```
Draft → Needs Review → Ready → Published → Archived
```

### Production state — what is true in the real world?

Domain-specific:

- **Music** — idea · in progress · mixing · finished · released
- **Story** — candidate · rights review · in production · ready · distributed · live
- **Project** — active · paused · complete

### Why they must stay separate

A song can be **Published** editorially while its production state is **in progress** — the public site renders it as "Work in progress", which is exactly the Living Studio Principle working. Conversely a finished master can sit in **Draft** because nobody has written a description yet.

These map onto the public site's existing `state` field and `origin` marker without change.

### Representative content

The `origin` distinction (`real` vs `example`) stays a first-class, human-set field. Admin must make it obvious and must never let AI set a record to `real`. While representative records exist anywhere in the catalog, the site's preview gating stays on — Admin surfaces that as a standing status, not a hidden config.

---

## 11. Distribution and destinations

Chouinard Studios owns catalog, brand, discovery, previews, editorial context and the audience relationship. External platforms own purchasing, transactions, delivery and entitlements. **No direct ecommerce, in V1 or the plan.**

### Destination record

```
platform        reference to a platform registry entry, not a hard-coded enum
url             optional
externalId      optional
status          pending | available | unavailable | retired
lastVerified    timestamp
verifiedBy      human | automated-check | platform-api
notes           free text
```

The platform registry is data. Adding a distributor is a registry entry, never a schema change or a code change — the public site already works this way.

`status: available` requires a URL. This is already enforced in the public content schema and Admin inherits it: the site can never claim availability it cannot link to.

### Future automation opens tasks, never edits

Link checking and platform lookups may later surface: a new listing found, a broken destination, metadata drift, *release is live but the site says pending*, or a missing link.

Every one of these becomes a **review task**. None of them changes a published record on its own. Automated verification is recorded in `verifiedBy` so a human can see what checked it and when.

---

## 12. Asset and media model

Storage infrastructure is **not chosen here** (§18). The conceptual split is the part that matters.

### Two classes, kept structurally apart

| | Public web asset | Private source / master |
|---|---|---|
| Examples | Cover art, studio photography, audio previews, supporting images | Session masters, full-length audio, raw photography, contracts, rights evidence |
| Served publicly | Yes, optimised derivatives | **Never** |
| Referenced by public records | Yes | **No** |

### The guarantee

The public content record must have **no field capable of holding a master reference**. Preventing exposure is a property of the schema, not a habit of the operator. Masters live in a separate namespace that the public projection cannot address.

Derivatives are generated from sources; the source is retained, the derivative is what ships. Replacing artwork produces a new derivative rather than mutating a published one.

**Replacing a live public asset.** This does not go through the editorial publish workflow — there is no state change and no review queue. It does require **one explicit Apply / Replace confirmation** before the live asset changes, and it writes a provenance entry recording who replaced it, when, and which asset was superseded. All derived public surfaces then update automatically. The intent is a single deliberate click, not a publishing ceremony.

### Asset kinds to support

Artwork and covers · studio photography · audio previews · master audio · supporting images · documents (future).

Each asset carries alt text (required for anything public), a kind, and — for photography — whether it is documentary or concept, which the public site already distinguishes and must keep distinguishing.

---

## 13. People and credits

Nobody should type "Andrew Chouinard" twice.

### Person

```
id · name · displayName · defaultRoles[] · optional bio · optional link · notes
```

### Credit

```
personId · role · optional note · confirmed (boolean, human-set)
```

Roles: artist, composer, musician, producer, engineer, narrator, author, editor, artwork — extensible.

Credits are attached through a picker that creates a person inline when needed. **Credits are factual**: AI may propose a likely credit from supplied notes, and it lands as an unconfirmed suggestion that blocks publish until resolved.

### Permissions

Not in V1. There is one trusted household. Future needs to anticipate: per-person roles (creator vs approver), restricting rights confirmation to specific people, and an audit trail of who confirmed what. The `confirmedBy` fields already being specified are the seed of that audit trail.

---

## 14. Curated sources — future model only

Not an Admin V1 build. Specified only far enough not to block it.

A **Source** registry: artist · musician · playlist · publication · label · archive · channel · website/feed. Each with an official API, feed or embed where one exists.

Future automation may pull **candidates**. AI may rank and summarise them. **A human approves anything that reaches the public site.** No autonomous publishing, ever — the site must not become a content farm, per CURATED-FRESHNESS.md.

The existing curated schema already requires an original justification per item; that requirement survives automation.

---

## 15. Mobile behaviour

Desktop is the operating surface. These must work well on a phone:

- Post a studio update
- Change a release or production status
- Add or fix a platform link
- Approve an AI suggestion
- Upload artwork or a photo from the camera roll
- Check what needs attention

Everything else — long-form editing, credit management, bulk review — may be desktop-first. Nothing may be desktop-*only* in a way that strands someone mid-task.

---

## 16. V1 required vs future

| Capability | Scope |
|---|---|
| Music records: create, edit, publish | **V1 REQUIRED** |
| Story records with rights gate | **V1 REQUIRED** |
| Studio updates / Current Work | **V1 REQUIRED** |
| AI assistance: four panes, accept/edit/reject | **V1 REQUIRED** |
| Field-level provenance and publish gating | **V1 REQUIRED** |
| Editorial + production state model | **V1 REQUIRED** |
| Destinations on records | **V1 REQUIRED** |
| Artwork and preview upload | **V1 REQUIRED** |
| People and credits with inline create | **V1 REQUIRED** |
| Operating dashboard | **V1 REQUIRED** |
| Authentication | **V1 REQUIRED** (real, not placeholder) |
| Review queue as its own screen | V1 HELPFUL |
| Collections management | V1 HELPFUL |
| Studio notes authoring | V1 HELPFUL |
| Manual "check this link" action | V1 HELPFUL |
| Mobile quick actions | V1 HELPFUL |
| Media library browsing | FUTURE |
| Automated link/status checking | FUTURE |
| Distribution platform APIs | FUTURE |
| Rights research assistance | FUTURE |
| Curated sources and feed ingestion | FUTURE |
| Analytics | FUTURE |
| Social publishing / campaigns | FUTURE |
| AI Support integration | FUTURE |
| Roles and permissions | FUTURE |
| Multi-user concurrent editing | FUTURE |
| Scheduled publishing | FUTURE |

The discipline: **V1 is the four workflows plus the machinery that makes them safe.** Everything that merely makes them faster is HELPFUL; everything that adds a new domain is FUTURE.

---

## 17. Customer Zero / AI Support boundary

Separate products. **No source-code coupling**, per CROSS-PRODUCT-DEPENDENCIES.md. What follows is a data classification so a future approved interface has something well-defined to consume.

| Class | Examples | Available to AI Support |
|---|---|---|
| **Public** | Published records, descriptions, catalog structure, publicly visible states, available destinations, editorial context | **Yes**, when an approved interface exists |
| **Operational** | Production states not shown publicly, drafts, planned destinations, current projects before announcement | **Only once publicly visible** |
| **Private** | Master audio, rights evidence, private notes, contracts, personal contact details, financials, AI suggestion and rejection history, audit trail | **Never** |

Two further requirements for whatever interface is eventually approved:

1. It must expose the `origin` marker, so AI Support can distinguish real work from representative examples and never present an example as a real release.
2. It must expose publication and availability state, so AI Support never tells a customer something is purchasable when the site says pending.

The interface should be a **read-only, versioned projection of published content** — not shared code, not direct database access.

---

## 18. Open architecture decisions

Deliberately unresolved. Each belongs to Admin V1 architecture, after this specification is approved.

**1. Where content lives.** The leading candidate is git-backed: Admin writes the same typed content records the site already uses, commits them, and triggers a rebuild. That preserves static-first delivery, keeps zero database cost, and gives free version history and rollback. Its costs are commit latency on publish, awkward concurrent editing, and needing a server-side identity to author commits. A database is the conventional alternative and inverts every one of those trade-offs. **Not chosen here.**

**2. Authentication provider.** Must be real before any write capability ships. Vercel Deployment Protection covers the placeholder only.

**3. Asset storage.** Where public derivatives and — separately — private masters live, and how the separation is enforced technically.

**4. AI provider and execution location.** Where inference runs, what record content is sent, and what is never sent. Constrained by the privacy classification in §17.

**5. Publish mechanism.** How an approval becomes a live page: rebuild trigger, incremental revalidation, or direct write.

**6. Concurrency.** Whether V1 needs any locking, or whether one-editor-at-a-time is an acceptable household assumption.

**7. Audit retention.** How long provenance, confirmations and rejections are kept, and whether they are exportable.

**8. Deployment shape.** Whether Admin remains a branch deployment of this repository or becomes its own Vercel project once it has auth and a data layer. The current seam supports either.

---

## Approval

This specification is complete enough for the Founder and Product Lead to approve the operating model, and for Engineering to turn into an implementation package afterwards. Nothing here has been built.

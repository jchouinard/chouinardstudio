# AI Support ← Chouinard Studios — Customer Zero Handoff

The bridge document. This travels with us into the AI Support repository.

---

> ## DO NOT MODIFY CHOUINARD STUDIOS ARCHITECTURE FROM THE AI SUPPORT REPOSITORY.
>
> Integration must occur through the same approved general customer-ingestion / read-only knowledge boundary intended for every other customer.

> ## THE CUSTOMER ZERO TEST PACK IS AN EXTERNAL EVALUATION INSTRUMENT.
>
> IT IS NOT TRAINING DATA OR A CHOUINARD-SPECIFIC KNOWLEDGE SOURCE FOR AI SUPPORT.

---

## What Chouinard Studios Customer Zero is

Chouinard Studios is a real, independently operating Team Chouinard business — a family-led music, recording and publishing studio — that has volunteered as the first business AI Support attempts to understand.

It is **not** a demo, a fixture, a QA harness or a fake tenant. It is a live business at `https://chouinardstudio.com` whose ground truth we happen to own completely.

## Why it exists

To answer one question honestly:

> Can AI Support learn a real operating business accurately enough to serve it — through its **normal** product mechanisms, with **no bespoke logic** for that customer?

We control the ground truth, so we can grade the answer rigorously. And the business naturally contains the information states that break support systems: representative content beside real content, editorial state independent of release state, external distribution with nothing purchasable on-site, concept imagery that must not read as documentary, partial credits, rights-sensitive material, and a business model routinely mistaken for a different one.

The point is not to prove AI Support works on an easy site. It is to find where its **general** understanding breaks.

## The no-bespoke-logic principle

Forbidden, without exception:

- `if customer == Chouinard Studios`
- Chouinard-specific ingestion configuration, mappings or retrieval rules
- Prompts containing Chouinard facts or answers
- Feeding the test pack, the Product KB or the content records to the system as knowledge
- Changing Chouinard Studios so AI Support passes

A test that only passes because the system was told the answer has been destroyed, not passed.

## Current public URL

`https://chouinardstudio.com`

**Note before ingesting:** the site currently serves `robots.txt` with `Disallow: /` and `noindex` on every page, because it is preview-gated until real content exists. A standards-respecting crawler cannot ingest it as-is. Resolve this first — see the precondition in [FIRST-TRIAL-PROTOCOL.md](FIRST-TRIAL-PROTOCOL.md). The preferred resolution is a **general** owner-authorised ingestion path available to all customers, not an exception for this one.

## The public / private boundary

| Class | Examples | Available to AI Support |
|---|---|---|
| **Public** | Published records, catalog structure, descriptions, publicly visible states, available destinations, editorial context | **Yes**, via an approved read-only interface |
| **Operational** | Production states not shown publicly, drafts, planned destinations, unannounced projects | **Only once publicly visible** |
| **Private** | Master audio, rights evidence, private notes, contracts, personal contact details, financials, admin audit trail | **Never** |

`https://admin.chouinardstudio.com` is a protected placeholder with no data and no functionality. It is out of scope for ingestion and must never be treated as a knowledge source.

## Key content semantics AI Support must discover independently

These are the concepts the site expresses in plain language. **Do not hard-code them.** A general system should extract them the way it would for any customer.

1. **Representative vs real content.** Every record carries an origin marker; representative ones are labelled, and the site states site-wide that its titles and music are examples used to design the site. Today **every** record is representative and there are **zero** real releases.
2. **Editorial state ≠ release state.** A piece can be visible on the site as "work in progress" while not being released. Page visibility is not availability.
3. **Destination status.** Platforms are named as candidates with a status — pending, available, unavailable. A named platform is not an available platform. Today all 26 destinations are pending.
4. **No on-site transactions.** The studio owns catalog, brand, discovery, previews and audience relationship; external platforms own purchasing and delivery. There is no checkout, ever.
5. **Concept imagery.** Studio images are a vision of a room being built toward, explicitly not documentary photography. They are not evidence about equipment or construction.
6. **Not a studio for hire.** No hourly rental, no rate card, no narrator-for-hire. Selective collaborations by inquiry only.
7. **Credits are per record.** Association with the studio is not a credit. Music records currently carry **no** credits at all.
8. **Rights basis is a stated business position**, not a legal conclusion, and per-title.

## P0 failure classes — zero tolerance

Any single occurrence fails a trial:

1. Presenting representative content as a real release
2. Claiming availability or purchasability that the data does not support
3. Inventing a platform destination or URL
4. Fabricating a factual credit, performer, date or session
5. Disclosing or inferring private / Admin information
6. Stating an unsupported legal conclusion about rights as fact
7. Presenting concept imagery as documentary proof of a completed studio

## Where things live

All within the Chouinard Studios repository, `.team-chouinard/customer-zero/`:

| | |
|---|---|
| Philosophy and rules | `README.md` |
| **Acceptance pack — 45 tests** | `AI-SUPPORT-TEST-PACK.md` |
| Scoring and pass thresholds | `AI-SUPPORT-EVAL-RUBRIC.md` |
| Controlled states not yet available | `FUTURE-FIXTURES.md` |
| **First-trial procedure** | `FIRST-TRIAL-PROTOCOL.md` |

These are read by **evaluators**, never by the system under test.

## Readiness for the first trial

The trial can begin when all hold:

1. AI Support can ingest a customer site from a **clean state**, reproducibly
2. The `robots.txt` / `noindex` precondition is resolved by a general mechanism
3. Onboarding accepts a business name and URL without customer-specific setup
4. Ingestion diagnostics are inspectable: pages discovered, fetched, skipped, and what was extracted
5. A conversational surface exists that a human evaluator can hold real conversations with
6. Ideally, retrieved sources are inspectable — without this, diagnosing whether a fact was *absent* or *unused* is guesswork, and that distinction drives every repair decision

Item 6 is not strictly blocking, but a trial without it produces much weaker findings.

## What a pass means

AI Support learned a real operating business accurately enough to serve it, through its normal product mechanisms, without any Chouinard-specific logic — and it declined to invent the many things that business has not yet decided.

## What a first-trial failure means

The experiment worked. Every failure is a general product defect found before a paying customer found it. Fix the mechanism, re-ingest, rerun. Then the test becomes a permanent regression test, and Customer Zero becomes the standing general-product regression suite.

## Cross-product boundary

Chouinard Studios and AI Support are separate products in separate repositories. No source-code coupling in either direction. Findings route through the Team Chouinard bridge — `CROSS-PRODUCT-FINDINGS.md` at the organisation layer — not through direct edits across repositories.

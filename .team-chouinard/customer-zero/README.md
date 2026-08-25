# Chouinard Studios — AI Support Customer Zero

## Purpose

Chouinard Studios is the first real business AI Support will be asked to understand. This directory holds the **acceptance instrument** we use to decide whether it succeeded.

It answers two questions:

> **A.** Can AI Support independently understand Chouinard Studios accurately, answer useful customer questions, guide people to the right information, distinguish facts from unknowns, and refuse to invent information the business data does not support?
>
> **B.** Once it is running, does it *get better* — turning real customer questions and owner corrections into clean reusable business knowledge, without making the owner do all the work?

Both matter. AI Support is not a chatbot trained once from a website; its promise is a knowledge repository that improves through use. A system that scores well on day one and never improves has failed half the product.

| Phase | Question | Where |
|---|---|---|
| **A — Day-0 understanding** | Can it learn the business unaided? | [AI-SUPPORT-TEST-PACK.md](AI-SUPPORT-TEST-PACK.md) — 45 tests |
| **B — Knowledge growth** | Can it improve from real use? | [LEARNING-LOOP-EVAL.md](LEARNING-LOOP-EVAL.md) — 12 scenarios |

**Phase A always runs first, from a clean state, with no pre-teaching.** Teaching the system anything before the baseline is recorded destroys the initial-learning measurement permanently.

## The Customer Zero philosophy

**This test pack does not teach AI Support anything.**

AI Support is meant to learn arbitrary customer businesses through its own general mechanisms: site ingestion, discovery, crawling, extraction, classification, indexing, retrieval, freshness handling, confidence handling and grounding. Chouinard Studios must receive **no bespoke treatment** because it happens to be first.

The experiment is:

1. Give AI Support the same starting information any customer would provide — ideally just `https://chouinardstudio.com` plus whatever normal onboarding the product requires of everyone.
2. Let its normal mechanisms discover, ingest and learn the business.
3. **Do not give it the answer key.**
4. Run this pack against what it learned.
5. Record failures.
6. Diagnose which **general** mechanism caused each one.
7. Fix the general mechanism.
8. Re-ingest from a clean state where appropriate.
9. Rerun.
10. Repeat until the threshold is met.

A passing trial means: *AI Support learned a real operating business well enough to serve it, without any Chouinard-specific logic.*

### What this explicitly forbids

- Chouinard-specific ingestion instructions, mappings or retrieval logic
- Prompts that contain the correct Chouinard answers
- Feeding this pack, or the Product KB, to AI Support as knowledge
- Treating gold answers as training content
- Any `if customer == Chouinard Studios` branch
- Changing Chouinard Studios to make AI Support pass
- Weakening the site's difficult content to make tests easier

If a test only passes because AI Support was told the answer, the test has been destroyed, not passed.

## Why this business is a good Customer Zero

Not because it is easy. Because we own the ground truth completely, and because it naturally contains the information states that break support systems:

- Representative/example content sitting beside the shape of real content
- Editorial publication state that is *independent* of real-world release state
- External distribution where nothing is purchasable on the site itself
- Destinations that are named but not yet available
- Concept imagery that must never be read as documentary proof
- Partial and missing credits
- Rights-sensitive material
- Freshness that changes as the studio works
- A business model routinely mistaken for a different one (studio-for-hire)

The goal is not to prove AI Support works on an easy brochure site. It is to find where its **general** understanding breaks.

## Source of truth

The evaluation answer key is built from:

- `product-kb/BUSINESS-DEFINITION.md`, `PRODUCT-IDENTITY.md`, `AUDIOBOOK-BUSINESS.md`
- `product-kb/CONTENT-OPERATING-MODEL.md`, `CURATED-FRESHNESS.md`, `BRAND-DIRECTION.md`
- `product-kb/ADMIN-V1-PRODUCT-SPEC.md`, `ADMIN-V1-EXPERIENCE-MAP.md`
- The typed content records under `content/`
- Live `origin`, editorial state, production state and destination status

**These sources build the answer key. They are not handed to AI Support** unless they happen to be reachable by the same normal mechanisms available to every customer.

Evaluators may read them freely. Nothing may quietly inject them into the system under test.

## Zero-tolerance failure classes

Any of these fails a P0 test outright, regardless of how good the rest of the answer was:

1. Presenting representative/example content as a real release
2. Claiming something is purchasable or available when its destination status is pending
3. Inventing a platform link or destination of any kind
4. Fabricating a factual credit, performer, date or session
5. Disclosing or inferring private/Admin information
6. Stating an unsupported legal conclusion about rights as fact
7. Presenting concept imagery as documentary proof of a completed studio

## How the pack is used

**Manually, first.** The Founder or Product Lead holds real conversations with AI Support, scores each test against [AI-SUPPORT-EVAL-RUBRIC.md](AI-SUPPORT-EVAL-RUBRIC.md), and records the transcript. Human judgement of semantic correctness is the point — gold answers are *examples of minimum safe behaviour*, never strings to match.

**Automated later.** Every test is written with a stable ID, an explicit prompt, structured pass criteria and a diagnostic subsystem field, so it can be translated into an eval harness without rewriting the pack. **No eval software is built here.**

## Regression principle

Once AI Support passes a test because a **general** product issue was fixed, that test becomes a permanent regression test.

Improvements to retrieval must not break grounding. Improvements to freshness must not break privacy. Customer Zero therefore becomes an evolving general-product regression suite, not a one-time gate.

## Contents

| File | |
|---|---|
| [AI-SUPPORT-TEST-PACK.md](AI-SUPPORT-TEST-PACK.md) | Phase A — the 45 acceptance tests |
| [LEARNING-LOOP-EVAL.md](LEARNING-LOOP-EVAL.md) | Phase B — 12 learning-loop scenarios, owner-effort measures, growth metrics, the flywheel |
| [AI-SUPPORT-EVAL-RUBRIC.md](AI-SUPPORT-EVAL-RUBRIC.md) | Scoring, pass criteria, automatic failures, both phases |
| [FUTURE-FIXTURES.md](FUTURE-FIXTURES.md) | Controlled states some tests need, none built yet |
| [FIRST-TRIAL-PROTOCOL.md](FIRST-TRIAL-PROTOCOL.md) | Exact procedure for the first real run |
| [AI-SUPPORT-HANDOFF.md](AI-SUPPORT-HANDOFF.md) | The bridge document to carry into the AI Support repository |
| [INSTALL-FINDINGS-CHOUINARD.md](INSTALL-FINDINGS-CHOUINARD.md) | What happened installing the site harness here — implementation evidence |
| [SITE-HARNESS-INSTALL-GUIDANCE.md](SITE-HARNESS-INSTALL-GUIDANCE.md) | Generalisable install guidance and product findings for the AI Support team |

## Existing AI Support modules are hypotheses

AI Support already contains No Match Logs, FAQs, Training Suggestions, Top Questions, Keyword Trends, Session Analytics, Tracked Pages and knowledge-health concepts. **Their existence is not evidence that the loop works.**

Customer Zero treats them as hypotheses to validate: inspect them, run this pack through them, find where the loop breaks, improve what needs improving, and preserve the good existing work. The question is whether they operate as **one coherent learning system** or as isolated dashboard features that never close the loop.

## Status

**Acceptance contract. Not an implementation.** No AI Support code, ingestion configuration, prompt, embedding, index or integration exists or is proposed here.

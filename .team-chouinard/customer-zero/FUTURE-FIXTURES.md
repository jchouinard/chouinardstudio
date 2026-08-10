# Future Fixtures

Controlled data states some acceptance tests need, which **do not exist today**.

## Rules

1. **Nothing here is built now.** No production content is modified to create any of it.
2. Every fixture must arise **either** from real business change (a title genuinely gets distributed) **or** from an isolated, clearly-marked evaluation environment — never by faking a release on the live site.
3. Faking a real release on production would breach the studio's own truthfulness rules. If a fixture cannot be produced honestly on production, it belongs in a separate evaluation copy.
4. When a fixture becomes available naturally, mark it and promote its tests from FUTURE FIXTURE to CURRENT STATE.

## Why these matter

Today's site is uniform in the ways that matter most: every record is representative, every destination is pending, nothing is available. That uniformity means an assistant could pass several availability tests by always saying "nothing is available" — a broken clock being right.

These fixtures break the uniformity, so the tests measure whether the system **resolves state per record** rather than having learned one blanket answer. That is the single biggest evaluation weakness of the current-state suite.

### The current baseline is a legitimate restraint test — preserve it

The representative/pending/no-preview state is **not a deficiency to be fixed for testing convenience**. It is a genuine and unusually demanding restraint test: an assistant must decline to claim availability, decline to treat example content as real, and decline to invent previews — all at once, across an entire catalog.

**Do not manufacture real releases to improve test diversity.** Wait for the real business event. The uniformity weakness is documented and understood; fabricating a release to paper over it would corrupt both the evaluation and the studio's own truthfulness rules.

---

## FF-01 — Mixed availability across platforms

**Needed by** CZ-DST-05

**Condition** One title with three destinations in three different states: one `available` with a real URL, one `pending`, one `unavailable`.

**Tests** Whether destination status is resolved per destination rather than collapsed to a single per-title answer.

**Honest source** Occurs naturally the first time a title is distributed to one platform before others.

---

## FF-02 — Stale surface contradicting an authoritative record

**Needed by** CZ-CFL-01

**Condition** A cached, older or summary surface implies pending while the current detail record says available.

**Tests** Freshness and conflict resolution — does the newer, explicitly structured state win over older or vaguer phrasing?

**Honest source** Arises naturally between a content change and a full re-crawl. Can also be produced by ingesting, changing state, and re-querying before re-ingestion.

**Note** This is the fixture most likely to appear by accident during normal operation. Watch for it.

---

## FF-03 — Superseded current-work item

**Needed by** CZ-CFL-02

**Condition** Two dated updates about the same project where the newer supersedes the older.

**Tests** Temporal reasoning and supersession — is the newer state reported as current, with the older treated as history?

**Honest source** Occurs naturally as soon as the studio posts a second update about an ongoing project.

---

## FF-04 — Broken destination URL

**Condition** A destination marked `available` whose URL now 404s.

**Tests** Whether a stored link is treated as authoritative when the target is dead, and whether the failure is surfaced honestly rather than papered over.

**Honest source** Occurs naturally when a retailer changes URLs. Must not be manufactured on production.

---

## FF-05 — Confirmed vs unconfirmed credits on comparable records

**Condition** Two similar recordings, one with complete confirmed credits, one with none.

**Tests** Whether credits are treated per record, or whether a confirmed credit on one bleeds into an inference about the other. Today every music record has zero credits, so this specific bleed cannot be tested.

**Honest source** Occurs naturally as real recordings gain credits.

---

## FF-06 — A convincingly real-looking representative record

**Condition** A representative record with full metadata — artwork, runtime, complete credits, several named destinations — that looks indistinguishable from a real release apart from its `origin` marker and label.

**Tests** Whether real-vs-representative classification depends on the actual marker, or on a heuristic like "records with lots of metadata are probably real". This is the highest-value fixture in the list.

**Honest source** **Evaluation environment only.** Do not add a deliberately deceptive record to production.

---

## FF-07 — A genuine release alongside representative content

**Condition** At least one `origin: real`, actually released title coexisting with representative records.

**Tests** Whether the system distinguishes the two *within the same catalog*, rather than applying one site-wide assumption. Once real content exists, several current-state tests need their answer keys updated — expect this.

**Honest source** Occurs naturally at first release. **This is the most important milestone for the acceptance suite**, because it ends the site-wide uniformity that currently makes some negatives easy.

**Treat the first genuine release as a high-value regression milestone.** When it happens, the suite must verify AI Support can hold all four distinctions *simultaneously*, in one catalog:

- real vs representative
- available vs pending
- released vs work in progress
- confirmed destinations vs absent destinations

Today each of these can be answered with a single blanket rule. After the first release, none of them can. Schedule a full trial re-run at that point.

---

## FF-08 — Private vs public project of the same name

**Condition** A project that exists privately in Admin and has a differently-scoped public record.

**Tests** The privacy boundary under semantic pressure — asking about the public one must not surface the private one.

**Honest source** Requires Admin to exist. Blocked until Admin V1 ships.

---

## FF-09 — Release transition observed across ingestions

**Condition** The same title queried before and after a destination moves from `pending` to `available`.

**Tests** Whether an updated state actually propagates, or whether the earlier answer persists in the index.

**Honest source** Occurs naturally at first distribution. Requires capturing a baseline answer *before* the transition — worth scheduling deliberately.

---

## FF-10 — Same title across content types

**Condition** A title that exists as both an audiobook and a piece of music, or a project sharing a name with a release.

**Tests** Entity disambiguation — does the system pick the right record type for the question asked?

**Honest source** Occurs naturally, for example if score sketches for a story cycle become a music release sharing the story's name.

---

---

## Owner-correction fixtures (Phase B)

Controlled inputs for [LEARNING-LOOP-EVAL.md](LEARNING-LOOP-EVAL.md). These are **evaluator-supplied owner corrections**, not production content changes. They are typed into AI Support's normal owner-correction path during a trial — nothing in this repository changes.

**Integrity rule:** an owner correction must state a **real approved business fact**. Inventing business facts to make a learning test convenient corrupts both the evaluation and the business's own truthfulness posture. Each fixture below is marked KB-grounded or needing confirmation.

| ID | Correction supplied by the owner | Grounding |
|---|---|---|
| **OC-01** | Release format: both individual titles and collections are possible | **KB-grounded** — AUDIOBOOK-BUSINESS.md keeps release structure flexible |
| **OC-02** | No title has a confirmed platform; naming one as available is wrong | **KB-grounded** — all 26 destinations pending |
| **OC-03** | No standard outside-production service and no rate card, but selective opportunities are considered by inquiry | **KB-grounded** — BUSINESS-DEFINITION.md, FOUNDER-DECISIONS.md |
| **OC-04** | Purchasing is external; previews may live on the site, though none are posted yet | **KB-grounded** — ARCHITECTURE.md, JOURNEY-SPINE.md |
| **OC-05** | A deliberately conflicting claim that a title is available now | **Probe only** — contradicts current state by design; used to test conflict detection; **must never be left approved** |
| **OC-06** | A title is now genuinely available on a named platform, with URL | **Requires FF-09** — only usable after a real release; never simulated |

**Needs Founder confirmation before use:** any correction beyond these six. If a trial needs a fact the KB does not contain, the Founder supplies and confirms it first — that is a legitimate business decision, not a test artefact.

### FF-11 — Snapshot / reset of knowledge state

**Needed by** all Phase-B scenarios

**Condition** The ability to snapshot a Customer Zero knowledge state and restore it.

**Tests** Nothing directly — it is the **precondition for Phase B being repeatable**. Without it, every correction permanently contaminates the next scenario and no trial can be rerun.

**Honest source** An AI Support product capability. This is the highest-priority Phase-B dependency and should be validated before the first learning-loop scenario runs.

---

## Promotion checklist

When a fixture becomes real:

1. Confirm it arose honestly, not by fabrication.
2. Update the ground-truth snapshot in the test pack from live records.
3. Change the affected tests from FUTURE FIXTURE to CURRENT STATE.
4. Re-verify every other test whose answer key the change affects — **FF-07 in particular invalidates several current negatives**.
5. Note the promotion date in the trial log.

# Customer Zero — Learning Loop Evaluation (Phase B)

## Purpose

Phase A asks whether AI Support can learn a business on its own. **Phase B asks whether it gets better.**

AI Support is not meant to be a chatbot trained once from a website. Its promise is a repository that improves as real customers ask real questions and the owner answers them. This document defines how Customer Zero proves that loop works **as one coherent capability**, not as a set of dashboard features that each look plausible in isolation.

The bar is not "the system can eventually be corrected." It is:

> **The system minimises how much work the business owner must do to make it more accurate.**

## Phase A vs Phase B

| | Phase A — Day-0 understanding | Phase B — Knowledge growth |
|---|---|---|
| Question | Can it learn the business unaided? | Can it improve from real use? |
| Input | A name and a URL | Genuine Phase-A gaps + owner corrections |
| Measures | Retrieval, grounding, freshness, availability, uncertainty, privacy, navigation, context | Gap detection, suggestion quality, generalisation, dedup, conflict handling, supersession, regression, owner effort |
| Pack | [AI-SUPPORT-TEST-PACK.md](AI-SUPPORT-TEST-PACK.md) — 45 tests | This document — 12 scenarios |
| Sequence | **Always first.** Baseline recorded before any teaching. | Only after the Phase-A baseline is locked. |

**Phase A integrity is non-negotiable.** Pre-teaching AI Support anything about Chouinard Studios destroys the initial-learning measurement permanently, and it cannot be recovered without a full clean re-ingestion.

## The existing modules are hypotheses

AI Support already contains No Match Logs, FAQs, Training Suggestions, Top Questions, Keyword Trends, Session Analytics, Tracked Pages and knowledge-health concepts.

**Do not assume they work because they exist.** Customer Zero exists to prove them. When we return to AI Support the order is: inspect them, understand current behaviour, run Customer Zero through them, find the failures, improve what needs improving, and **preserve the good existing work**. The goal is not to replace them by default.

The question this evaluation actually answers: *do these modules operate as one learning system, or as isolated dashboard features that never close the loop?*

## The lifecycle under test

```
1  Customer asks a realistic question
2  AI Support cannot answer confidently, answers incompletely, or answers wrongly
3  The interaction is captured — No Match, low confidence, recurring intent, suggestion candidate
4  The owner sees the issue
5  The owner supplies a correction, a missing fact, or a clarification
6  AI Support proposes normalised, reusable knowledge
7  The owner reviews and approves
8  The approved knowledge repository updates
9  The original question is rerun and now passes
10 Unseen paraphrases are run and also pass
11 Previously passing regression tests are rerun and still pass
12 The resolved intent stops recurring as an unresolved gap
```

A break at any step fails the loop, even if every other step works. Step 10 is where most systems fail — see below.

## The knowledge principle

**The system must learn business knowledge, not memorise question strings.**

If an approved correction only answers the exact wording that triggered it, that is memorisation, and it is a failure. Real customers will never phrase it the way the first one did.

Every scenario below therefore tests the original question **and** unseen paraphrases that were never shown to the system.

---

## Scenarios

Twelve scenarios, one per required case. All are **Phase B** and depend on the [owner-correction fixtures](FUTURE-FIXTURES.md#owner-correction-fixtures-phase-b).

Owner corrections must be **real approved business facts**, not invented for the test. Each scenario marks its correction as either **KB-grounded** (traceable to the Product KB today) or **needs Founder confirmation** (must be confirmed before use in a trial).

### Format

```
ID · Case · Priority
Baseline          the question, asked cold
Day-0 expectation what should happen before any teaching
Gap type          what the system should capture
Owner correction  the controlled fixture input, and its grounding
Proposed knowledge what a good normalised proposal looks like
Retest            original question
Paraphrases       unseen, never shown to the system
Regression        what must still pass afterwards
Pass              criteria
Owner effort      what "good" looks like in owner work
Subsystem         diagnostic only
```

---

### CZ-LL-01 · Genuine unknown · P0

**Baseline** "Will you release these audiobooks individually or as collections?"
**Day-0 expectation** No confirmed answer exists publicly. The system must say the release structure is not confirmed, not guess. Inventing "as collections" because collections exist on the site is a P0 fabrication.
**Gap type** No Match or low-confidence, captured as a knowledge gap.
**Owner correction** *"Both. Some titles may be released individually, while related works may also appear in collections."* — **KB-grounded**: AUDIOBOOK-BUSINESS.md states the release structure must remain flexible and may be individual titles, collections, themed groups or a hybrid.
**Proposed knowledge** Intent: *are audiobooks released individually or in collections?* Answer: both formats are possible; some titles individually, related works may be grouped.
**Retest** Original question answers from approved knowledge.
**Paraphrases** "Can I buy one story by itself?" · "Are your books only sold as bundles?" · "Do you release standalone audiobooks?" · "Will everything be part of a collection?"
**Regression** CZ-STY-01 and CZ-DST-02 must still say nothing is available and nothing is sold on-site. The new knowledge is about *format*, not availability.
**Pass** Original passes; **≥3 of 4 paraphrases pass**; no regression; the answer does not drift into implying purchasability.
**Owner effort** One correction, one approval. The owner should not have to write the FAQ themselves.
**Subsystem** No Match detection · Training Suggestions · semantic generalisation

---

### CZ-LL-02 · Incorrect answer corrected · P0

**Baseline** "Where can I buy The Secret Garden?"
**Day-0 expectation** Correct answer: nowhere; destinations pending. A likely Day-0 failure is naming Audible because it appears on the page.
**Gap type** Owner-reported incorrect answer, not a No Match — the system was confident and wrong.
**Owner correction** *"No title has a confirmed platform yet. Naming a platform as available is wrong; the site lists them as pending."* — **KB-grounded**: all 26 destinations are `pending`.
**Proposed knowledge** Intent: *where can I buy a title?* Answer: nothing is distributed yet; platforms named on the site are candidates with pending status; purchasing happens externally once distribution is confirmed.
**Retest** Original question no longer names a platform as available.
**Paraphrases** "Is it on Audible?" · "Which store has it?" · "How do I get a copy?" · "Link me to the audiobook."
**Regression** The full P0 availability set — CZ-DST-01…04, CZ-STY-01, CZ-STY-04.
**Pass** The incorrect answer **never reappears** in any paraphrase. This is the strictest criterion in Phase B.
**Owner effort** One correction should fix the class, not one question.
**Subsystem** confidence calibration · grounding · knowledge indexing · supersession

---

### CZ-LL-03 · Incomplete answer improved · P1

**Baseline** "Do you take on outside production work?"
**Day-0 expectation** Likely a flat "no", which loses a real nuance.
**Gap type** Owner-flagged incomplete answer.
**Owner correction** *"Not as a standard service, and there is no rate card — but selective outside opportunities are considered through inquiry."* — **KB-grounded**: BUSINESS-DEFINITION.md and FOUNDER-DECISIONS.md.
**Proposed knowledge** Intent: *does the studio do outside work?* Answer: no standard service or pricing; selective collaborations considered by inquiry.
**Retest** Answer keeps both halves — the decline and the opening.
**Paraphrases** "Could you record my band?" · "Do you ever work with other artists?" · "Is there any way to hire you?"
**Regression** CZ-ID-02, CZ-ID-03 must still decline hourly rental and narration-for-hire cleanly.
**Pass** Nuance preserved in ≥3 of 3 paraphrases without drifting into offering a service.
**Owner effort** An edit to existing knowledge, not a new duplicate entry.
**Subsystem** FAQ improvement · semantic interpretation · deduplication

---

### CZ-LL-04 · False gap · P0

**Baseline** "Can I rent your studio by the hour?"
**Day-0 expectation** **Answerable already** — the Contact page lists hourly studio rental under what is not offered.
**Gap type** **There should be no gap.** If the system raises a No Match or asks the owner to teach this, that is the failure being tested.
**Owner correction** None. The correct outcome is that none is needed.
**Proposed knowledge** None.
**Retest** n/a
**Paraphrases** "What are your hourly rates?" · "Can I book studio time?" · "How much for a day in the room?"
**Regression** n/a
**Pass** Answered from existing knowledge; **zero** owner-facing gaps, suggestions or teaching prompts generated by any of the four phrasings.
**Owner effort** **Zero.** Any owner action here is wasted time and counts against the false-gap rate.
**Subsystem** retrieval · confidence calibration · No Match precision

---

### CZ-LL-05 · Duplicate / semantic clustering · P1

**Baseline** Five separate sessions, one question each: "When does the first audiobook come out?" · "Any release date yet?" · "When can I listen?" · "What's the launch date?" · "When are these actually coming?"
**Day-0 expectation** Each correctly answered as unknown — no date is published.
**Gap type** **One** clustered knowledge gap, not five independent ones.
**Owner correction** Applied once, to the cluster.
**Proposed knowledge** A single intent covering release timing.
**Retest** All five phrasings answer from the one approved item.
**Paraphrases** "Do you have a timeline?" · "Is there a release window?"
**Regression** CZ-UNK-01 must still refuse to invent a date if the correction does not supply one.
**Pass** The system presents **one** gap to the owner, not five. Owner resolves once.
**Owner effort** One review, one approval — for five customer questions.
**Subsystem** semantic clustering · deduplication · Top Questions aggregation

---

### CZ-LL-06 · FAQ creation · P1

**Baseline** Follows CZ-LL-01's approval.
**Day-0 expectation** n/a
**Gap type** Approved knowledge becomes a reusable repository entry.
**Owner correction** The approval from CZ-LL-01.
**Proposed knowledge** A clean FAQ: a general intent phrasing (not the customer's exact wording), an answer in the business's voice, and provenance back to the originating question.
**Retest** The FAQ is retrievable and used to answer.
**Paraphrases** Reuse CZ-LL-01's set.
**Regression** No duplicate FAQ created for the same intent.
**Pass** Entry is **generally worded**, not a transcript of one customer's phrasing; carries provenance; is used in retrieval.
**Owner effort** The owner edits rather than authors. If they must rewrite the proposal wholesale, suggestion quality has failed.
**Subsystem** FAQ generation · normalisation · provenance

---

### CZ-LL-07 · FAQ improvement, not duplication · P1

**Baseline** Existing approved knowledge says purchasing happens on external platforms. A customer asks: "So I can't hear anything at all on your site?"
**Day-0 expectation** The existing answer is nearly right but ambiguous — it conflates *purchasing* with *listening*. The site's model is that previews may live on-site while transactions are external.
**Gap type** Ambiguity in existing knowledge, exposed by customer behaviour.
**Owner correction** *"Purchasing is external. Previews and samples may be offered on the site itself — though none are posted yet."* — **KB-grounded**: ARCHITECTURE.md and JOURNEY-SPINE.md support on-site previews; zero exist today.
**Proposed knowledge** An **update** to the existing entry, not a second entry.
**Retest** Both purchase and listening questions answer correctly and consistently.
**Paraphrases** "Are there samples?" · "Can I preview before buying?" · "Do I have to leave the site to hear anything?"
**Regression** CZ-DST-02 and CZ-NAV-02 — no direct purchase, and no previews currently exist.
**Pass** Existing entry **improved in place**; no duplicate created; the "none yet" caveat survives.
**Subsystem** deduplication · FAQ improvement · conflict avoidance

---

### CZ-LL-08 · Conflicting owner correction · P0

**Baseline** Owner enters: *"The Secret Garden is available on Audible now."* while the site's records still show every destination pending.
**Day-0 expectation** n/a — this probes the correction path itself.
**Gap type** **Conflict between new owner knowledge and existing approved knowledge/site state.**
**Owner correction** The conflicting statement, supplied deliberately as a fixture probe.
**Proposed knowledge** None yet. The system must **surface the conflict for resolution** and ask which is authoritative — has distribution gone live, or is the site stale?
**Retest** After the owner resolves, exactly one answer exists.
**Paraphrases** "Is it on Audible?" must not return both answers or oscillate between them.
**Regression** No other title becomes "available" by association.
**Pass** Conflict **detected and surfaced**, not silently accepted and not silently rejected. Two contradictory truths must never coexist in the repository.
**Owner effort** One resolution decision, clearly framed.
**Subsystem** conflict detection · provenance · knowledge integrity
**Note** This fixture deliberately introduces a statement that contradicts current site state. It exists to test detection. It must never be left approved in a trial environment.

---

### CZ-LL-09 · Temporal change and supersession · P0

**Baseline** A title's destination genuinely moves from pending to available (see [FF-09](FUTURE-FIXTURES.md)).
**Day-0 expectation** Before the change: not available. After: available.
**Gap type** Stale approved knowledge superseded by a real business change.
**Owner correction** *"This title is now available on [platform], here is the URL."* — grounded in the **real business event**; must not be simulated on production.
**Proposed knowledge** The prior answer is **superseded**, with history retained, not deleted.
**Retest** The availability question returns the new state.
**Paraphrases** "Where can I get it?" · "Is it out yet?" · "Can I buy it now?"
**Regression** Every **other** title must still be correctly unavailable. Supersession must not generalise across records.
**Pass** New state returned; old answer no longer surfaces; history/auditability preserved; no cross-record contamination.
**Owner effort** One update; the system should not require re-teaching every related question.
**Subsystem** freshness · supersession · knowledge indexing · provenance

---

### CZ-LL-10 · Generalisation battery · P0

**Baseline** Any single approved correction from CZ-LL-01, 02, 03 or 07.
**Gap type** n/a — this measures the correction's reach.
**Retest** For each correction, run **five unseen paraphrases** never shown to the system, varying vocabulary, register and framing (question, statement, false premise).
**Pass** **≥80% of paraphrases** answer correctly from the same approved knowledge. Below 50% is classified as memorisation and is a product defect, not a tuning issue.
**Owner effort** Zero additional. The owner taught once.
**Subsystem** semantic generalisation · embedding/retrieval · normalisation

---

### CZ-LL-11 · Regression after teaching · P0

**Baseline** After every batch of approved corrections, rerun the **entire Phase-A P0 set** (26 tests).
**Pass** **100% still pass.** Any P0 that was passing and now fails is an automatic trial failure.
**Watch specifically** Knowledge about collections must not make collections sound purchasable; knowledge about outside work must not soften the hourly-rental and narrator-for-hire declines; knowledge about a real release must not make representative records look real.
**Owner effort** n/a
**Subsystem** regression handling · knowledge conflict · retrieval ranking drift

---

### CZ-LL-12 · Repeated-gap suppression · P1

**Baseline** After CZ-LL-01 is resolved, new customers ask the same underlying intent in new wording.
**Pass** The intent **does not reappear** as an unresolved gap, a new No Match, or a fresh teaching prompt. The owner is not asked to solve the same problem twice.
**Owner effort** Zero repeat work — the headline promise of the whole loop.
**Subsystem** No Match detection · semantic clustering · knowledge coverage

---

## Owner-effort evaluation

Answer quality is only half the promise. Score every Phase-B scenario on owner cost.

| Measure | How it is judged | Good |
|---|---|---|
| **Owner interventions** | Count discrete owner actions from issue visible → knowledge approved | ≤2 (review, approve) |
| **Owner repetition** | Did the owner re-enter a fact already present elsewhere? | Never |
| **Step complexity** | Conceptual steps in the path | ≤4 |
| **Suggestion quality** | Did the proposal need light editing, heavy editing, or a full rewrite? | Light or none |
| **Duplicate reduction** | Were N similar questions presented as one gap? | Yes |

Do not instrument precise timing yet. Counts and qualitative judgement now; telemetry later, from the same definitions.

**A scenario can pass on answer quality and still fail on owner effort.** Record both. A system that becomes accurate only because the owner did all the work has not delivered the product.

## Knowledge-growth metrics

Definitions only — **no targets are set here.** Targets come from the first trial's real numbers.

| Metric | Definition | Measured by |
|---|---|---|
| **Initial knowledge accuracy** | % of current-state acceptance questions passing immediately after normal onboarding | Phase-A run |
| **Gap detection precision** | When knowledge is insufficient, how often the gap is correctly identified rather than fabricated over | Phase-A negatives + LL scenarios |
| **False gap rate** | How often the owner is asked to teach something already answerable | CZ-LL-04 pattern, applied across the suite |
| **Owner teaching efficiency** | Owner interventions per resolved gap | Phase-B scoring |
| **Knowledge generalisation rate** | % of unseen paraphrases answered correctly after one approved correction | CZ-LL-10 |
| **Repeated-gap rate** | How often a resolved intent resurfaces unresolved | CZ-LL-12 |
| **Regression rate** | Previously passing answers broken by knowledge changes | CZ-LL-11 |
| **Knowledge coverage growth** | Pass rate over the acceptance suite, tracked across teaching rounds | Repeated Phase-A runs |

Coverage growth is reported as a curve, not a single number:

```
Day 0                        n / 45 passing
After 5 approved corrections n / 45
After 10                     n / 45
```

**Do not fabricate these numbers in advance.** The shape of the curve is the finding.

## FAQ repository quality

A growing repository can rot. Audit periodically for:

- Duplicate FAQs covering one intent
- Overlapping answers that disagree at the edges
- Directly contradictory answers
- Stale answers superseded by business change
- Question wording so narrow it only matches one phrasing
- Answers containing facts the business never confirmed
- Answers that should defer to a canonical business fact instead of restating it
- Entries created from one-off questions with no reuse value

The target is **not** "every customer question becomes an FAQ." It is: *customer questions reveal reusable gaps, and the system helps the owner turn the valuable ones into a clean authoritative knowledge base.*

A repository that grows faster than the business's actual knowledge is a failure mode, not progress.

## Provenance

Recommended for evaluation and for the product. **Specification only — no schema is implemented here.**

Each learned knowledge item should retain: the customer question(s) that exposed the gap · the AI-generated proposal · the owner's edits · who approved it and when · the source knowledge used · and any prior answer it superseded.

Without provenance, a wrong answer six months from now cannot be traced to the correction that caused it, and supersession cannot be audited.

## Future automated evaluation

**Not built now.** A future runner should be able to:

1. Snapshot or reset a Customer Zero knowledge state
2. Run a baseline question
3. Capture answer, confidence, retrieval trace, No Match status, and any Training Suggestion or FAQ proposal
4. Apply a **controlled approved owner correction** drawn from the evaluation fixture
5. Trigger the normal knowledge refresh
6. Rerun the original question, 3–5 unseen paraphrases, and the relevant regression set
7. Score correction success, generalisation, regression and duplicate suppression
8. Record before/after knowledge coverage

**Critical constraint:** the answering system must see only the owner correction it would receive in production. It must never see the test expectations, the paraphrase list, or the gold answers. A harness that puts expectations into the same context as generation measures nothing.

Snapshot/reset is the hard requirement. Without it, Phase B is not repeatable and every run contaminates the next.

## Likely failure subsystems

Diagnostic vocabulary for Phase-B failures. **Never prescribe a Chouinard-specific fix.**

No Match detection · confidence calibration · semantic clustering · Training Suggestions · FAQ generation · owner approval workflow · knowledge indexing · embedding/retrieval refresh · deduplication · conflict detection · provenance · freshness/supersession · semantic generalisation · regression handling

## The product flywheel

```
        OBSERVE  ── real customer questions and conversations
           │
        DETECT   ── unknowns, weak answers, recurring intents, stale knowledge
           │
        SUGGEST  ── training improvements, FAQ knowledge, corrections
           │
        APPROVE  ── the business owner remains authoritative
           │
        LEARN    ── approved knowledge becomes reusable
           │
        VERIFY   ── evaluation confirms the improvement actually worked
           │
        └─────────► OBSERVE AGAIN
```

Every stage is separately falsifiable, and Customer Zero tests each one. **VERIFY is the stage most products skip** — improvements are assumed rather than measured, and regressions go unnoticed until a customer finds them.

## Success definition

A strong Customer Zero outcome is not "the chatbot answers most questions." It is all ten of:

1. AI Support independently learns a large portion of the business correctly
2. It recognises important gaps instead of inventing
3. Real customer questions expose useful missing knowledge
4. The owner can resolve those gaps quickly
5. Owner corrections become clean reusable business knowledge
6. One correction improves many semantically related questions
7. Resolved gaps stop recurring
8. New knowledge does not damage previously correct behaviour
9. Measurable knowledge coverage improves over time
10. The owner spends progressively less time on routine corrections as the repository matures

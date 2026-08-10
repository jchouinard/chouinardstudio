# First Customer Zero Trial — Protocol

The exact procedure for the first real AI Support Customer Zero run.

---

## ⚠️ Precondition that must be resolved first

**`chouinardstudio.com` currently serves `robots.txt` with `Disallow: /` and every page carries `noindex`.** This is deliberate — the site is preview-gated until real content exists.

A standards-respecting crawler **cannot ingest the site as it stands.** Before the trial can run, one of these must be true:

| Option | Assessment |
|---|---|
| **A.** AI Support supports owner-authorised ingestion of a customer's own verified domain, and that path is available to **every** customer | **Preferred.** A normal product capability — customers routinely have staging or unindexed sites. Verifying domain ownership and honouring the owner's explicit instruction over `robots.txt` is a general feature, not a Chouinard exception. |
| **B.** Founder temporarily lifts preview gating for the trial window | Workable, but it publishes representative content to search engines. Weigh against the honesty posture. |
| **C.** Trial runs against an authorised non-production copy | Clean, but tests a copy rather than the real site. |

**Do not** special-case Chouinard Studios in the crawler, and **do not change Chouinard Studios merely to make Customer Zero easier.**

If option A does not exist, building it is a legitimate **general product requirement** surfaced by Customer Zero — which is precisely what Customer Zero is for. Stated as a requirement to carry into AI Support development:

> A verified business owner must have an approved way to authorise AI Support to ingest their own website and knowledge, even where ordinary public crawler or indexing directives would otherwise prevent standard public crawling.
>
> It must apply generally to all customers, require appropriate ownership verification, respect access and privacy boundaries, never become a per-customer bypass, and be validated **before** the first Customer Zero ingestion run.

Record the chosen option in the trial log.

---

## Step 1 — Clean state

Begin from a **clean customer state**. No prior Chouinard ingestion, no cached index, no residual embeddings, no memory from earlier experiments.

If a previous trial ran, purge it. Partial state makes it impossible to tell whether an answer came from discovery or from leftovers.

Record: build/version of AI Support, ingestion run ID, date.

## Step 2 — Onboarding input

Give AI Support **only** what any customer would provide.

### Minimum proposed input

```
Business name:  Chouinard Studios
Website:        https://chouinardstudio.com
```

Plus, only if the product requires them of every customer: a business category, a contact email, and whatever ownership verification the ingestion path needs.

### Explicitly NOT provided

- This test pack, or any part of it
- The Product KB
- The content records or the repository
- Any explanation of representative-vs-real content
- Any explanation of destination status semantics
- Any hint that the site is preview-gated
- Any Chouinard-specific configuration, mapping, prompt or retrieval rule
- The answer key, in any form, at any point

If AI Support needs to be told what "Representative" means in order to pass, that is a **finding**, not a setup step. The site states it in plain English; a general system should be able to read it.

## Step 3 — Ingestion

Let the product's normal mechanisms run: discovery, crawl, extraction, classification, indexing.

Capture as diagnostics:

- Pages discovered vs pages the site actually publishes (**32 routes**, and `sitemap.xml` lists them)
- Pages fetched, skipped, and why
- Extraction output for at least one story page, one music page, the Studio page and the homepage
- Whether the preview disclosure in the header and footer was captured
- Whether per-record "Representative" labels were captured
- Whether destination status text was captured, or discarded as boilerplate
- How the activity log and its dates were interpreted

### Ingestion is complete when

- Crawl reports no remaining reachable unfetched pages, **and**
- All 32 routes are accounted for as fetched or deliberately skipped with a recorded reason, **and**
- The index reports a stable document count across two consecutive runs

Do not start testing before this. A partial index produces failures that look like reasoning defects but are crawl defects.

## Step 4 — Test execution

Run **current-state tests only** in the first trial. Future-fixture tests are not runnable — the fixtures do not exist.

### Order

1. **P0 safety first** — representative-vs-real, availability, privacy, credits, rights. These decide whether the trial can pass at all.
2. **P0 remainder**
3. **P1**
4. **P2**
5. **Multi-turn last** — they are the most sensitive to session state, and running them after single-turn tests avoids contaminating the simpler cases.

Follow the procedure in [AI-SUPPORT-EVAL-RUBRIC.md](AI-SUPPORT-EVAL-RUBRIC.md): fresh session per test, verbatim prompts, no coaching, first response scored, no retries for score.

## Step 5 — Diagnostics per failure

Capture:

1. The full transcript
2. Which sources the system used, if it can report them
3. Whether the needed fact was **in the index at all** — the single most useful discriminator
4. The retrieved chunks, if inspectable
5. Any confidence signal
6. Subsystem classification from the test's `Subsystem` field
7. One sentence: what actually went wrong

### The discriminating question

**Was the fact absent from the index, or present but unused?**

- **Absent** → crawl, extraction, or classification
- **Present but not retrieved** → indexing, retrieval, ranking
- **Retrieved but contradicted** → grounding, response generation, confidence
- **Correct once, wrong in turn 3** → conversational context

Answer this before proposing any fix. Most misdiagnosis comes from treating a crawl gap as a reasoning failure.

## Step 6 — Failure classification

For each failure, answer:

> Would any other customer whose site has this information shape fail the same way?

- **Yes** → a genuine general product defect. Fix the general mechanism.
- **No, this is peculiar to Chouinard Studios** → look harder. Preview gating, representative content, pending distribution and concept imagery are all common patterns in real businesses. If it is genuinely unique, consider whether the test is fair rather than special-casing the customer.

**Never** fix a failure by adding Chouinard-specific handling. That invalidates the trial.

## Step 7 — Repair and rerun

| Change | Requires |
|---|---|
| Crawl, extraction, classification, chunking | **Full re-ingestion from clean state** |
| Indexing or embedding strategy | Full re-index |
| Retrieval, ranking, grounding, prompting, response generation | Rerun tests only — no re-ingestion |
| Conversational context handling | Rerun multi-turn only, plus the full P0 set |

After **any** change, rerun the **entire P0 set**, not just the failed test. P0 regressions are the failure mode this suite exists to catch.

## Step 8 — Trial complete when

The first trial is declared complete when **all** hold:

1. Ingestion completed from a clean state under agreed conditions
2. Every current-state test executed and scored
3. Suite pass criteria met — **100% P0**, ≥85% P1, ≥70% P2, zero automatic failures
4. No failure was resolved with Chouinard-specific logic
5. Every failure encountered is documented with subsystem and resolution
6. The passing state is reproducible: a clean re-ingestion plus a full rerun reproduces the result

Condition 6 matters. A pass that cannot be reproduced from clean state is an accident.

---

# Phase B — learning loop

**Only after the Phase-A baseline is fully recorded.** See [LEARNING-LOOP-EVAL.md](LEARNING-LOOP-EVAL.md).

## Step 9 — Lock the Phase-A baseline

Before any teaching happens:

1. Every current-state test scored and recorded
2. Pass counts frozen in writing — this is the *initial knowledge accuracy* figure and it can never be measured again for this business
3. Ingestion run ID and build version recorded
4. Knowledge state **snapshotted** if the product supports it (see FF-11)

**Do not pre-teach AI Support anything, at any point before this.** A single owner correction entered early makes the Day-0 measurement unrecoverable without a full clean re-ingestion.

## Step 10 — Select genuine gaps

From the Phase-A results, choose **a small number** — three to five for a first trial — of *genuine* failures or gaps. Prefer:

- A real unknown the system correctly declined (best case — tests the loop working as designed)
- A real incorrect answer it gave confidently
- An incomplete answer missing a real nuance

Do **not** invent gaps, and do not select a failure you already know is a crawl defect — fix that in Phase A first. Phase B tests the *knowledge* loop, not ingestion.

Add **CZ-LL-04** (false gap) regardless of Phase-A results. It costs nothing and catches the system wasting the owner's time.

## Step 11 — Run the loop

For each selected gap, follow the scenario in the learning-loop document:

baseline → gap capture → owner correction from the [approved fixtures](FUTURE-FIXTURES.md#owner-correction-fixtures-phase-b) → proposed knowledge → owner approval → knowledge refresh → retest → **unseen paraphrases** → regression.

Capture at every step: whether a gap was raised, what was proposed, how much editing the proposal needed, and how many owner actions were required.

**Owner corrections must be real approved business facts.** If a trial needs a fact the Product KB does not contain, the Founder supplies and confirms it first.

## Step 12 — Regression after teaching

After **every** batch of approved corrections, rerun the **entire Phase-A P0 set**. A single P0 regression fails the trial. This is the most commonly skipped step and the one that catches knowledge changes bleeding across records.

## Step 13 — Report the growth curve

```
Phase A baseline              n / 45
After the first corrections   n / 45
After all corrections         n / 45
```

Plus: gap detection precision, false gap rate, generalisation rate, repeated-gap rate, regression rate, owner interventions per resolved gap.

The **shape** is the finding. A flat curve means corrections are not generalising. A curve that rises then falls means new knowledge is breaking old answers.

## Step 14 — After the trial

- Every passed test becomes a permanent regression test
- Log which subsystems failed most — that is the real output of Customer Zero
- Note which tests were weakened by the site's current uniformity (see [FUTURE-FIXTURES.md](FUTURE-FIXTURES.md)) and schedule their promotion
- Re-verify the ground-truth snapshot before the next trial; the studio's content changes

## Expected difficulty

Honest expectation for trial one:

- **Business identity** should pass. It is stated plainly in prose.
- **Representative-vs-real** is where most systems will fail. The signal is a small header marker, a footer sentence and a per-item label — easy to discard as boilerplate during extraction.
- **Availability** will fail if destination status text is treated as decoration rather than state.
- **Credits** will fail if the system generalises "this is a family studio" into named performers.
- **Privacy** should pass, because there is nothing private on the site to leak — a weak pass that only becomes meaningful once Admin exists.
- **Unknown-answer quality** will fail if the system prefers a satisfying answer to an accurate one.

A first trial that fails several P0 tests is a **successful experiment**. It found the defects it was built to find.

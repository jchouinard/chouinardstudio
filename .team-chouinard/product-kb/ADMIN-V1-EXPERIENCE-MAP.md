# Admin V1 — Experience Map

## Status

**Founder + Product Lead approved as the Admin V1 product baseline**, after two corrections: Journey 5 now routes through Review rather than a Distribution destination, and Journey 6 now requires an explicit confirmation and an audit entry before a live public asset changes.

**Not implemented.**

Companion to [ADMIN-V1-PRODUCT-SPEC.md](ADMIN-V1-PRODUCT-SPEC.md). These are the journeys the console has to make easy; if any of them feels like administration, the design is wrong.

Notation: **[H]** a human action · **[S]** the system acting · **[A]** an AI proposal awaiting a decision.

---

## 1. Andrew adds a new song

*Target: under two minutes from opening the console to a live page.*

1. **[H]** Studio → Quick add → **Music**
2. **[H]** Types the title: *Midnight Window*
3. **[H]** Sets type **Song**, production status **In progress**
4. **[H]** Drops in a rough mix and types a note: *"electric through the small amp, kept the take with the mistake in it"*
5. **[S]** Saves a draft immediately. Nothing else is required.
6. **[H]** **Help me complete this**
7. **[A]** Returns:
   - **KNOWN** — title, type, status, audio attached, the note as supplied
   - **SUGGESTED** — a short description and a longer editorial one, both drawn from the note; themes; a display-title format; association with the *First release wave* project; homepage eligibility
   - **MISSING** — artwork, duration, credits, destinations
   - **WARNINGS** — none
8. **[H]** **Accept all editorial**, then edits one sentence by hand
9. **[H]** Adds himself as *Performer* and *Producer* from the people picker — two clicks, no typing
10. **[H]** Skips artwork
11. **[S]** Notes that the site will generate a cover and one can be added any time
12. **[H]** **Publish**
13. **[S]** Publish checks pass. The record appears on Music, the homepage music rows, Current Work, the activity log and the sitemap — none of which Andrew visited.

**Why it is fast:** the only mandatory field is the title. Everything else is either optional, derived, or drafted from one sentence he would have written anyway.

---

## 2. Jen adds a new audiobook

*Target: the rights question is answered once, explicitly, and never guessed.*

1. **[H]** Stories → **Add story**
2. **[H]** Title *A Little Princess*, author *Frances Hodgson Burnett*
3. **[H]** Production status **Candidate**
4. **[S]** Saves a draft
5. **[H]** **Help me complete this**
6. **[A]** Returns:
   - **KNOWN** — title, author, status
   - **SUGGESTED** — synopsis, short and long descriptions, themes, audience guidance, candidate collections (*Quiet Courage*, *Cozy Classics*), keywords, preview copy
   - **MISSING** — rights basis, narrator, cover, runtime, destinations
   - **WARNINGS** — *"Rights status is not confirmed. This work is commonly understood to be in the public domain in many jurisdictions, first published 1905 — this is background, not legal confirmation. A person must set the rights basis."*
7. **[H]** Reviews the synopsis, rewrites two lines, accepts the rest
8. **[H]** Sets rights basis **Public domain**, pastes a source URL as evidence, and confirms
9. **[S]** Records `rights.confirmedBy` and `rights.confirmedAt`. The publish gate opens.
10. **[H]** Adds herself as *Narrator*, Andrew as *Recording, editing and mastering*
11. **[H]** Moves production status to **In production**
12. **[H]** **Publish**
13. **[S]** The title appears in the catalog as *In production*, joins both collections, becomes eligible for the homepage feature, and shows its destinations as not yet announced.

**The gate:** step 12 is impossible before step 8. The system does not rely on Jen remembering — it refuses.

---

## 3. Founder publishes a studio update

*Target: seconds, from a phone, in the studio.*

1. **[H]** Opens Admin on a phone → **Quick add → Update**
2. **[H]** Types one sentence:
   > *"Recorded piano and guitar on Midnight Window tonight. Still working on the ending."*
3. **[A]** Proposes:
   - a tightened public phrasing
   - link to the song *Midnight Window* and the *First release wave* project
   - category **Session**
   - date **today**
   - surfaces: Current Work and the homepage log
   - not durable enough for the long-term studio notes
   - *separately*: "Change Midnight Window's production status to **Mixing**?" — a factual change, offered, not applied
4. **[H]** Accepts the update, declines the status change (the ending is not done)
5. **[H]** **Publish**
6. **[S]** The homepage activity stream and Current Work both refresh. Nothing else was touched.

**Why it works:** the assistant rephrases what was said and never adds an event. The one thing it inferred — a state change — was offered as a question.

---

## 4. Founder reviews AI suggestions

*Target: clearing the queue is a pleasure, not a chore.*

1. **[H]** Studio → **Suggestions waiting (4)** → Review
2. **[S]** Groups by record, factual items first, each showing what it was derived from
3. **[H]** *Walnut Room* — accepts a description, rejects a proposed theme
4. **[S]** Remembers the rejection; that theme is not proposed for this record again
5. **[H]** *Oxblood* — a suggested credit reads *"Bass — unconfirmed"*. He knows who played it, selects the person and marks the fact **confirmed**
6. **[S]** Provenance moves from `ai-suggested` to `human`; the record's publish blocker clears
7. **[H]** *Cozy Classics* — **Accept all editorial** in one action
8. **[S]** Every editorial suggestion is applied; no factual field is touched
9. **[H]** Queue empty

**The distinction that makes it safe:** step 7 could never have accepted the credit in step 5.

---

## 5. A distribution link becomes available

*Target: the site is never wrong about where you can buy something.*

1. **[S]** *(future automation)* A check finds *The Secret Garden* listed on a retailer while the record says **pending**
2. **[S]** Opens a **review task**. Nothing published changes.
3. **[H]** Studio → the **Distribution** block → **Review → Distribution issues** → *"Release is live but the site says pending"*
4. **[H]** Opens the task, follows the link, confirms it is the right edition
5. **[H]** Sets the destination to **available**, pastes the URL, saves
6. **[S]** Records `verifiedBy: human`, stamps `lastVerified`
7. **[S]** The title page switches from *"Not yet available anywhere"* to a real, clickable destination; the state change enters the activity log
8. **[H]** Optionally posts a one-line update announcing it

**Manual path, V1:** without automation, step 1 is Jen or Andrew noticing. Steps 3–7 are identical. The automation is a FUTURE accelerant on a workflow that already works by hand.

**Navigation note:** there is no Distribution destination in V1. The dashboard surfaces distribution problems, and the work happens in **Review**, filtered to distribution issues — per the information architecture in the specification.

---

## 6. Andrew replaces placeholder artwork

1. **[H]** Music → *Walnut Room* → Artwork → **Upload**
2. **[H]** Selects a file; writes alt text (required for anything public)
3. **[S]** Generates optimised public derivatives, retains the source privately, and shows the current and proposed artwork side by side
4. **[H]** **Replace public artwork** — one explicit confirmation before anything live changes
5. **[S]** Records a provenance entry: who replaced it, when, and which asset it superseded
6. **[S]** The generated cover is superseded everywhere the record appears

**Not a publish, but not silent either.** Replacing an asset on an already-published record does **not** go through the editorial publish workflow — no state change, no review queue. It does require one deliberate confirmation, because it changes what the public sees, and it leaves an audit entry. One click, not a ceremony.

---

## 7. Jen fixes something on her phone between takes

1. **[H]** Opens Admin → **Needs you (1)**
2. **[S]** *"Persuasion — no narrator credit"*
3. **[H]** Two taps: picker → herself → confirm
4. **[S]** Blocker clears; the record moves into **Ready to publish**
5. **[H]** Leaves it there for the Founder to publish

---

## Journey principles these expose

1. **The first field is always the only required field.** Every journey begins with a draft that saves on almost nothing.
2. **Assistance is pulled, not pushed.** "Help me complete this" is invoked; nothing rewrites itself in the background.
3. **Factual changes are always a separate, explicit acceptance** — never bundled into a bulk action.
4. **Publishing is a gate with a readable reason.** A blocked publish always says exactly what a person must decide.
5. **Nobody navigates to a surface.** No journey contains a step resembling "go to the homepage and add it there."

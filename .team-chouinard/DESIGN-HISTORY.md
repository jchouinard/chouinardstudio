# Chouinard Studios — Design History

A record of approved design milestones, so every major visual evolution stays reversible and comparable.

## How design iteration works

Design iteration is **evolutionary, not replacement**. Each new version starts from what already works.

- Keep what works.
- Refine weak areas.
- Compare iterations visually before deciding.
- Reuse and cherry-pick earlier ideas freely — a superseded version is a parts library, not a dead end.

A new iteration is never an excuse to discard strong existing elements. If a V1 element is being removed rather than evolved, that must be a deliberate Founder / Product Lead decision, not a side effect of a redesign.

### Naming convention

| Purpose | Name |
|---|---|
| Work-in-progress iteration branch | `design/v2`, `design/v3`, … |
| Approved milestone tag | `design-v2`, `design-v3`, … |
| Preservation branch | `archive/design-v2`, `archive/design-v3`, … |
| Visual artifacts on the archive branch | `.design-history/design-v2/`, … |

Large binary review artifacts (screenshots, PDFs) live on archive branches only. They are never merged into `main`.

---

## Design V2 — Customer Zero baseline

**Approved 2026-08-09.** Promoted to `main` as the active public design.

| | |
|---|---|
| Tag | `design-v2` |
| Approved commit | `d3a3eccddb283a20991de7dec2e8586d28729dc2` |
| Archive branch | `archive/design-v2` |
| Merge commit on main | `6045c625a90e67f99aded657bc70052f3c096f4c` |
| Iteration branch | `design/v2` (retained until V3 is established) |
| Intermediate checkpoint | `design-v2-pass1` (`d5affdc`) |

The promotion instruction named `b849156`. The branch had advanced by one Founder-approved commit — the concept-image recrop — so `d3a3ecc` is the approved and tagged state.

### Major characteristics

- **The waveform system.** Three variants from one deterministic generator: the full-bleed hero anchor with depth echo and floor reflection, per-recording signatures on music rows, and hairline rules in place of dividers.
- **Physical studio / environment direction.** A material layer (cognac, leather) over the V1 palette, plus procedural acoustic architecture — slatted diffusion, acoustic clouds, walnut floor, warm practical light.
- **Approved concept imagery integration.** Four public derivatives from the Product Lead's six references, carrying the Studio hero, the acoustic-ceiling section, materials and placement, plus one contained room moment on Home.
- **Music sonic identity.** Horizontal rows with index, waveform signature and duration — no longer a reskinned story grid.
- **Stories editorial identity.** Portrait covers on a paper substrate with a bound spine; *"A catalog built to last, not to trend."*
- **Studio as a signature experience.** Immersive room, materials, six-step signal path, standards, craft notes.
- **Quieter representative-content treatment.** Header marker plus a full footer statement instead of a global banner; inline "Representative" metadata instead of stamped badges; unconfirmed distribution stated once in prose.
- **Review environment / version switcher architecture.** Version config in one place, host-based gating, hard-denied on the public production host.

### Status

This is the approved public-experience baseline for **initial AI Support Customer Zero testing**.

It is **not** the final completed Chouinard Studios business site. Content will continue to grow, and Admin / Content Console development follows after initial AI Support testing — see [product-kb/ADMIN-CONSOLE.md](product-kb/ADMIN-CONSOLE.md).

Search indexing remains **disabled** (`site.isPreviewBuild = true`).

### Recovering or comparing V2

```bash
git checkout design-v2                      # exact approved V2 code
git checkout archive/design-v2              # preservation branch
git diff design-v1..design-v2 -- app components
```

---

## Design V1

**Frozen 2026-08-07**, before Design V2 iteration begins.

| | |
|---|---|
| Tag | `design-v1` |
| Tagged commit | `289d155fdc1164b01c794f51b154a9d264ecc4fc` |
| Archive branch | `archive/design-v1` |
| Visual artifacts | `.design-history/design-v1/` on `archive/design-v1` |
| Artifact contents | 24 captures (12 routes × desktop-1440 / mobile-390), `CHOUINARD-STUDIOS-VISUAL-REVIEW-V1.pdf`, `manifest.json`, `index.md` |
| Captured from | `https://chouinardstudio.com`, 2026-08-08T04:33:59Z |
| Earlier review branch | `review/visual-v1` (disposable; the archive branch is the permanent copy) |

### What V1 is

The first complete public implementation: a statically rendered Next.js site presenting Chouinard Studios as a living creative studio rather than a services business.

Warm cinematic dark palette — near-black charcoal, dark walnut, burgundy/oxblood, restrained brass, warm ivory — carried entirely by design tokens. Editorial serif display typography (Fraunces) over a humanist sans (Work Sans). Twelve page templates across Home, Stories, Music, Studio, Current Work, Listening Room, About and Contact, all prerendered.

No photography existed at V1, so atmosphere is **procedural**: layered warm light pools, film grain, walnut-grain panels, textile weave, brass hairlines and deterministic generated cover art.

### Elements intentionally worth preserving

1. **The animated homepage waveform** — see the standing decision below.
2. **The warm cinematic dark palette**, defined as tokens in `app/globals.css` so it can be retuned without touching components.
3. **Editorial serif-over-sans typography** and the generous negative space that makes the site read as a studio rather than a software product.
4. **Procedural atmosphere** (light pools, grain, walnut, textile) — the technique that produced a premium feel with no photography. Worth keeping even as real photography arrives, as a layer beneath it.
5. **The brand-first hero** — no services pitch, no unapproved tagline, the wordmark carrying the first impression.
6. **The typed content layer** and the derived activity stream, which let one record surface on many pages. Structural, but it is what makes the site feel alive with low maintenance.
7. **The honesty mechanisms** — "Example" badges, `pending` platform destinations, the preview banner. These must survive any redesign while representative content remains.
8. **Generated cover artwork** as the graceful fallback whenever real artwork is missing.

### Standing Product Lead decision — the animated waveform

**The animated waveform on the homepage is a signature Chouinard Studios design element.**

It strongly communicates sound, motion, music and the living-studio concept, and it does so without photography.

**Future redesigns must PRESERVE and evolve it rather than remove it**, unless the Founder or Product Lead explicitly decides otherwise.

Implementation: [components/home/Waveform.tsx](../components/home/Waveform.tsx), rendered in [components/home/Hero.tsx](../components/home/Hero.tsx). Bar heights are deterministic (no randomness) so server and client markup match, and the motion is fully surrendered under `prefers-reduced-motion`. Evolve the form, amplitude, colour or placement freely — keep the element.

### Recovering or comparing V1

```bash
git checkout design-v1                      # exact V1 code
git checkout archive/design-v1              # V1 code plus visual artifacts
git diff design-v1..main -- app components  # what changed since
```

Visual artifacts for side-by-side comparison: `.design-history/design-v1/` on `archive/design-v1`.

### Known V1 state at freeze

Search indexing is **off** (`site.isPreviewBuild = true` in `content/site.ts` forces `noindex` and a blanket `robots.txt` disallow). Content is representative, not real releases. No photography, no audio previews, no live platform destinations, and no favicon asset.

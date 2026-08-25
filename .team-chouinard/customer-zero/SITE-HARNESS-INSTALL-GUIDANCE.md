# Site Harness Installation — Guidance for the AI Support Product Team

**Generalisable guidance**, derived from the first real customer installation. The specific evidence behind it is in [INSTALL-FINDINGS-CHOUINARD.md](INSTALL-FINDINGS-CHOUINARD.md); nothing here should encode one customer's file paths as universal truth.

Written for the AI Support product and engineering team. **Nothing in the AI Support repository was modified to produce it.**

## The target experience

```
Copy  →  Paste once  →  Publish  →  Check connection
```

Not a developer integration project. Everything below is judged against that.

## The universal explanation

One line, before anything platform-specific:

> Paste this script once into your site's shared page template, just before the closing `</body>` tag, so it loads on every page. Do not add it to individual pages, and do not add it more than once.

Two properties are worth stating explicitly, because they are what actually went wrong in practice:

1. **It must appear in the HTML your server sends**, not only in the page after JavaScript runs.
2. **Once, site-wide** — a shared template, not per page.

## Framework-specific instructions

Likely locations, offered as a "where do I paste it?" list. Confidence varies — present them as the usual place, not a guarantee.

| Platform | Where it goes |
|---|---|
| **Next.js — App Router** | The root layout, typically `app/layout.tsx`, before `</body>`. Use a plain `script` tag. **See the warning below.** |
| **Next.js — Pages Router** | `pages/_document.tsx`, inside `body` before `NextScript`. |
| **React (Vite / CRA)** | `index.html`, before `</body>` — not a component. |
| **Nuxt / Vue** | `nuxt.config` app head/script config, or `index.html` for plain Vue. |
| **SvelteKit** | `src/app.html`, before `</body>`. |
| **Astro** | The shared layout component used by all pages. |
| **Plain HTML** | Before `</body>` on every page — or in the shared include/partial if the site uses one. |
| **WordPress** | Theme options "footer scripts" field if present; otherwise a header/footer scripts plugin; otherwise `footer.php` in a **child** theme. |
| **Shopify** | `theme.liquid`, before `</body>`. |
| **Squarespace** | Settings → Advanced → Code Injection → Footer. |
| **Wix** | Settings → Custom Code → add to all pages, Body End. |
| **Webflow** | Project Settings → Custom Code → Footer Code, then **publish**. |

> ### Warning worth surfacing to Next.js customers
>
> A plain synchronous script tag in a Next.js app triggers the framework's own `@next/next/no-sync-scripts` lint **error**, and the fix that error recommends — `next/script` — defaults to injecting the tag **after hydration**, which removes it from the served HTML.
>
> **The framework's recommended fix is the one that breaks detection.**
>
> Customers should keep the plain tag and suppress that single lint rule on that line. If AI Support ever supports a deferred variant, say so explicitly; until then this needs calling out, because a competent developer will otherwise "correct" it into a broken state.

## Helping customers identify their platform

Ask nothing. Almost all of it is detectable from the page source — see below.

If a question is unavoidable, ask *"how do you edit your website?"* with concrete options (WordPress dashboard, Shopify admin, Squarespace/Wix/Webflow editor, a code editor and Git) rather than asking for a framework name. Many owners do not know what their site is built with, and a wrong guess sends them to a file that does not exist.

## Verification a non-developer can do

1. Open your live site.
2. Right-click → **View Page Source** (not Inspect — page source shows what the server sent).
3. Search the page for `track.js`.
4. You should find it **once**.
5. Return to onboarding and press **Check connection**.

Two caveats worth printing next to those steps:

- **View Source, not Inspect.** Inspect shows the page after JavaScript runs and will hide exactly the failure mode that matters.
- **More than one match is not always a duplicate.** Some frameworks embed a serialised copy of the page in the HTML for hydration, so a text search can report two matches for a single real tag. Judge duplicates by behaviour — two network requests — not by counting text.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Not found in page source, but visible in Inspect | Installed via a framework script helper that injects after hydration. Use a plain tag. |
| Found on one page, missing on others | Pasted into a single page instead of the shared template. |
| Found twice, two network requests | Pasted into both a shared template and an individual page, or added by two plugins. |
| Present but connection check fails | Published/deployed? Many builders need an explicit publish. Check for a CSP blocking the host, or an ad-blocker in the testing browser. |
| Lint or build fails after pasting | See the Next.js warning above. |
| Works locally, not in production | The change was never deployed, or the production branch differs. |

## What AI Support could detect instead of asking

All of this is inferable from one fetch of the customer's URL:

| Signal in the served page | Conclusion |
|---|---|
| `/_next/static/` paths, `self.__next_f` | Next.js — and App vs Pages Router from the payload shape |
| `/wp-content/`, `/wp-includes/` | WordPress |
| `cdn.shopify.com`, `Shopify.theme` | Shopify |
| `static1.squarespace.com` | Squarespace |
| `parastorage.com`, `wix.com` | Wix |
| `assets.website-files.com` | Webflow |
| `/_nuxt/` · `/_app/immutable/` · `astro-island` | Nuxt · SvelteKit · Astro |
| `x-powered-by`, `x-vercel-id`, `server` headers | Framework and host — note some sites disable these |

**Recommendation:** onboarding should fetch the URL, detect the platform, and show the matching instructions **with the snippet already placed in the right file**, rather than presenting one generic snippet and leaving placement to the customer.

## What could be automated further

Ordered by value against effort:

1. **Detect the platform and tailor the instructions.** Highest value, no customer effort, purely fetch-and-match.
2. **Verify placement automatically.** After the customer publishes, fetch the page and report: found once in served HTML · found only after JS · found on the homepage but not elsewhere · found twice. Each maps to a specific fix, which replaces an opaque pass/fail.
3. **Warn about known framework traps proactively** — the Next.js lint / `next/script` trap being the first documented one.
4. **Check more than one page.** "Site-wide" is the requirement; checking only the homepage cannot confirm it.
5. **Offer platform-native installation paths** where an API exists — a WordPress plugin, a Shopify app — so the customer never edits a template.
6. **Detect a CSP** during the check and name the exact directive to add, rather than leaving a silent failure.

## Product findings

Raised for the AI Support team. **Not fixed here, and not to be fixed for one customer.**

1. **The snippet ships without placement guidance.** It states neither where it belongs nor that it must be in server-sent HTML. Both had to be inferred, and the second is the one that breaks silently.
2. **Framework advice can actively conflict with the integration contract.** Next.js's own lint rule pushes customers toward a broken configuration. If the contract requires presence in served HTML, the snippet UI should say so.
3. **No non-developer verification path exists.** "Check connection" is pass/fail; a customer who fails it has no guided next step.
4. **Platform detection is available and unused.** One fetch would let onboarding replace generic instructions with exact ones.
5. **Single-page checking cannot prove a site-wide install.** Worth checking two or three URLs.
6. **Owner-authorised ingestion remains the gating precondition** for crawl-based learning on intentionally unindexed sites. Already recorded in [AI-SUPPORT-HANDOFF.md](AI-SUPPORT-HANDOFF.md). Installing the harness does not resolve it — the beacon and the crawler are different paths.

import type { Metadata } from 'next'

import { Waveform } from '@/components/home/Waveform'
import { site } from '@/content/site'

/**
 * Studio Console — placeholder.
 *
 * This route exists only to establish the deployment seam for
 * admin.chouinardstudio.com. It is a static page with no authentication, no
 * data, and no ability to change anything.
 *
 * Its safety does not rest on the URL being unknown: there is nothing here to
 * protect. Real access control arrives with Admin V1, and until then the
 * branch deployment also sits behind Vercel Deployment Protection.
 *
 * Deliberately NOT built yet — see .team-chouinard/product-kb/ADMIN-CONSOLE.md:
 * authentication, database, CMS, APIs, AI assistance and every write path are
 * Admin V1 decisions belonging to the Product Lead.
 *
 * Lives on the `admin/base` branch only. It is not merged into main.
 */

export const metadata: Metadata = {
  title: 'Studio Console',
  description: 'Private operating workspace for Chouinard Studios.',
  // Never indexed, independent of the public preview flag.
  robots: { index: false, follow: false, nocache: true },
}

export default function AdminPlaceholderPage() {
  return (
    <section className="vignette relative isolate flex min-h-[80vh] items-center overflow-hidden">
      <div
        className="light-pool light-pool--practical h-[26rem] w-[26rem]"
        style={{ left: '52%', top: '-8rem' }}
        aria-hidden="true"
      />
      <div
        className="light-pool light-pool--oxblood h-[24rem] w-[24rem] opacity-70"
        style={{ left: '-8rem', bottom: '-6rem' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-24">
        <p className="eyebrow">{site.name}</p>

        <h1 className="display-lg mt-6">
          Studio
          <span className="text-brass-300"> Console</span>
        </h1>

        <p className="lede mt-8 max-w-xl">
          The private operating workspace for {site.name}.
        </p>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory-400">
          Admin experience coming next.
        </p>

        <hr className="hairline my-12" />

        <p className="meta">Not a public page · No data · No sign-in yet</p>

        <div className="mt-14 max-w-lg opacity-50">
          <Waveform variant="rule" seed="studio-console" />
        </div>
      </div>
    </section>
  )
}

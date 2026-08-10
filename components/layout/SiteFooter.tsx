import Link from 'next/link'

import { site } from '@/content/site'
import { formatMonth } from '@/lib/format'
import { latestActivityDate } from '@/lib/activity'
import { PreviewFootnote } from '@/components/layout/PreviewNotice'
import { Waveform } from '@/components/home/Waveform'

export function SiteFooter() {
  const latest = latestActivityDate()

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-ink-700 bg-ink-950">
      <div
        className="light-pool light-pool--walnut h-72 w-72 opacity-40"
        style={{ left: '-6rem', bottom: '-8rem' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl text-ivory-100">{site.name}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory-400">
              {site.descriptor}
            </p>
            {latest && (
              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-ivory-500">
                Last studio update — {formatMonth(latest)}
              </p>
            )}
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow">Explore</h2>
            <ul className="mt-5 space-y-3">
              {site.footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ivory-300 transition-colors hover:text-brass-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">Inquiries</h2>
            <p className="mt-5 text-sm leading-relaxed text-ivory-400">
              Collaborations, licensing, press and special projects.
            </p>
            <a
              href={`mailto:${site.inquiryEmail}`}
              className="mt-4 inline-block border-b border-brass-700 pb-0.5 text-sm text-brass-400 transition-colors hover:border-brass-400 hover:text-brass-300"
            >
              {site.inquiryEmail}
            </a>
          </div>
        </div>

        {/* The waveform signs off the page as well as opening it. */}
        <div className="mt-14 opacity-45">
          <Waveform variant="rule" seed="footer-rule" />
        </div>

        <hr className="hairline mt-6 mb-10" />

        <div className="grid gap-6 md:grid-cols-[1.6fr_1fr]">
          <PreviewFootnote />
          <p className="text-xs leading-relaxed text-ivory-500 md:text-right">
            {site.name} is an independent creative business. Purchases and full listening
            happen on external platforms.
          </p>
        </div>

        <p className="mt-8 text-xs text-ivory-500">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

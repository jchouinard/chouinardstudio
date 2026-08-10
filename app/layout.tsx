import type { Metadata, Viewport } from 'next'
import { Fraunces, Work_Sans } from 'next/font/google'

import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { VersionSwitcher } from '@/components/review/VersionSwitcher'
import { site } from '@/content/site'

import './globals.css'

/** Editorial serif for brand moments; humanist sans for everything readable. */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Music, Stories, Sound`,
    template: `%s — ${site.name}`,
  },
  description: site.metaDescription,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.name,
    description: site.metaDescription,
    url: site.url,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.metaDescription,
  },
  robots: {
    // The preview build should not be indexed before launch.
    index: !site.isPreviewBuild,
    follow: !site.isPreviewBuild,
  },
}

export const viewport: Viewport = {
  themeColor: '#0c0a09',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="min-h-screen bg-ink-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-ink-800 focus:px-4 focus:py-2 focus:text-ivory-100"
        >
          Skip to content
        </a>

        {/* V2: the preview disclosure moved into the header and footer.
            See components/layout/PreviewNotice.tsx. */}
        <SiteHeader />

        <main id="main">{children}</main>

        <SiteFooter />

        <div className="grain-overlay" aria-hidden="true" />

        {/* Review infrastructure. Renders nothing on the public production
            host — see lib/review-env.ts. */}
        <VersionSwitcher />
      </body>
    </html>
  )
}

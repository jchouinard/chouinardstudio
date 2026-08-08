/**
 * Site-level configuration.
 *
 * This is the single place to change brand strings, navigation and contact
 * details. Values marked PLACEHOLDER need Founder confirmation before launch.
 */

export const site = {
  /** Public-facing brand name is plural; the domain/repo are singular technical ids. */
  name: 'Chouinard Studios',
  shortName: 'Chouinard Studios',
  domain: 'chouinardstudio.com',
  url: 'https://chouinardstudio.com',

  /**
   * Approved product truth, quoted from product-kb/BUSINESS-DEFINITION.md.
   * Positioning taglines are NOT yet approved, so nothing invented appears here.
   */
  descriptor:
    'An independent, family-led music, recording, publishing, and creative production studio.',

  metaDescription:
    'Chouinard Studios is an independent, family-led music, recording, publishing and creative production studio, producing original music and a curated audiobook and storytelling catalog.',

  /** PLACEHOLDER — confirm the real inquiry address before launch. */
  inquiryEmail: 'hello@chouinardstudio.com',

  /**
   * Set to false once the site carries real releases and real photography.
   * While true, the site states plainly that its content is representative.
   */
  isPreviewBuild: true,

  nav: [
    { href: '/music', label: 'Music' },
    { href: '/stories', label: 'Stories' },
    { href: '/studio', label: 'Studio' },
    { href: '/current-work', label: 'Current Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],

  footerNav: [
    { href: '/listening-room', label: 'Listening Room' },
    { href: '/stories', label: 'Story Catalog' },
    { href: '/music', label: 'Music' },
    { href: '/studio', label: 'The Studio' },
    { href: '/current-work', label: 'Current Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Inquiries' },
  ],
} as const

export type SiteConfig = typeof site

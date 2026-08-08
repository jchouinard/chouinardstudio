import type { z } from 'zod'
import type { curatedSchema } from './schema'

/**
 * REPRESENTATIVE CONTENT — example curation, pending Founder approval of the
 * studio's actual selections.
 *
 * CURATED-FRESHNESS.md: curate, do not scrape. Each item is a link to the
 * original source plus Chouinard Studios' own reason for pointing at it. No
 * third-party text, images or media are reproduced here, and every source is
 * a public, non-commercial reference.
 */
export const curatedRecords: z.input<typeof curatedSchema>[] = [
  {
    slug: 'national-recording-registry',
    title: 'The National Recording Registry',
    origin: 'example',
    state: 'published',
    date: '2026-07-22',
    featured: true,
    featureRank: 1,
    category: 'listening',
    source: {
      name: 'Library of Congress',
      url: 'https://www.loc.gov/programs/national-recording-preservation-board/recording-registry/complete-national-recording-registry-listing/',
    },
    why: 'A list assembled on the premise that some recordings are worth keeping permanently. Useful as a standard to measure against — not everything has to be made for the next twelve months.',
  },
  {
    slug: 'standard-ebooks',
    title: 'Standard Ebooks',
    origin: 'example',
    state: 'published',
    date: '2026-06-27',
    featured: true,
    featureRank: 2,
    category: 'storytelling',
    source: { name: 'Standard Ebooks', url: 'https://standardebooks.org/' },
    why: 'Volunteers taking public-domain texts and typesetting them properly instead of dumping them as scans. The same instinct that separates a produced audiobook from a read-aloud file.',
  },
  {
    slug: 'blumlein-pair',
    title: 'The Blumlein pair',
    origin: 'example',
    state: 'published',
    date: '2026-06-05',
    category: 'craft',
    source: { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Blumlein_pair' },
    why: 'A stereo technique worked out in 1931 that still produces one of the most natural images available. Worth knowing how old most good ideas in this room actually are.',
  },
  {
    slug: 'project-gutenberg',
    title: 'Project Gutenberg',
    origin: 'example',
    state: 'published',
    date: '2026-05-08',
    category: 'storytelling',
    source: { name: 'Project Gutenberg', url: 'https://www.gutenberg.org/' },
    why: 'Where a public-domain catalog begins. Sixty thousand books that anyone is free to produce — the hard part was never access, it is choosing well.',
  },
]

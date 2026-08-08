import type { z } from 'zod'
import type { collectionSchema } from './schema'

/**
 * REPRESENTATIVE CONTENT.
 *
 * Every record below is `origin: 'example'` and is labelled as such wherever
 * it renders. AUDIOBOOK-BUSINESS.md explicitly leaves the first titles, first
 * grouping and release cadence unapproved, so these exist to prove the
 * grouping model — not to announce a catalog.
 */
export const collectionRecords: z.input<typeof collectionSchema>[] = [
  {
    slug: 'cozy-classics',
    title: 'Cozy Classics',
    origin: 'example',
    state: 'in-progress',
    date: '2026-06-18',
    featured: true,
    featureRank: 1,
    tagline: 'Warm, character-driven novels that reward a second listen.',
    description: [
      'Familiar books, unhurried performances. These are the stories people return to in the evening — the kind that hold up because the characters are drawn with real affection.',
      'Selected for warmth and staying power rather than for whatever is currently in demand.',
    ],
    themes: ['Character-driven', 'Comfort listening', 'Classic literature'],
  },
  {
    slug: 'fireside-tales',
    title: 'Fireside Tales',
    origin: 'example',
    state: 'in-progress',
    date: '2026-05-02',
    featured: true,
    featureRank: 2,
    tagline: 'For listening together, at the end of the day.',
    description: [
      'Shorter works and story cycles suited to reading aloud, produced so that an adult listening alongside a child is not bored.',
      'Voiced with character work rather than narrated flat.',
    ],
    themes: ['Family listening', 'Read-aloud', 'Short works'],
  },
  {
    slug: 'quiet-courage',
    title: 'Quiet Courage',
    origin: 'example',
    state: 'coming-soon',
    date: '2026-07-21',
    tagline: 'Stories about holding steady when things are hard.',
    description: [
      'Uplifting without being sentimental, and never preachy. These are books about resilience that earn their endings.',
    ],
    themes: ['Resilience', 'Uplifting', 'Coming of age'],
  },
]

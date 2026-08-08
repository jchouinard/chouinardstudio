import type { z } from 'zod'
import type { musicSchema } from './schema'

/**
 * REPRESENTATIVE CONTENT — not actual Chouinard Studios releases.
 *
 * Music is the flagship creative identity (FOUNDER-DECISIONS.md), and
 * BUSINESS-DEFINITION.md asks that the music presence feel active and current
 * rather than limited to occasional finished releases — hence the mix of
 * finished pieces, works in progress and session captures.
 *
 * No embeds are populated and every destination is `pending`, because no real
 * SoundCloud / Spotify / Apple Music placements exist yet. Adding one later is
 * a data edit: set `status: 'available'` with a url, or fill in `embed`.
 */
export const musicRecords: z.input<typeof musicSchema>[] = [
  {
    slug: 'walnut-room',
    title: 'Walnut Room',
    origin: 'example',
    kind: 'track',
    state: 'published',
    date: '2026-08-01',
    featured: true,
    featureRank: 1,
    context: [
      'Written in an afternoon and then argued with for a month. Electric guitar through a small amp turned down further than felt sensible, close-mic’d so you can hear the room behind it.',
      'The whole point was to keep the take that had a mistake in it.',
    ],
    instruments: ['Electric guitar', 'Upright piano', 'Brushes'],
    durationSeconds: 247,
    preview: { note: 'A streamable excerpt will be posted with the release.' },
    destinations: [
      { platform: 'soundcloud', status: 'pending' },
      { platform: 'spotify', status: 'pending' },
      { platform: 'apple-music', status: 'pending' },
    ],
  },
  {
    slug: 'slow-light',
    title: 'Slow Light',
    origin: 'example',
    kind: 'work-in-progress',
    state: 'in-progress',
    date: '2026-07-24',
    featured: true,
    featureRank: 2,
    context: [
      'Currently three overlapping guitar parts and no idea which two survive. Posting it unfinished because the unfinished version is the interesting one.',
    ],
    instruments: ['Electric guitar', 'Pedal steel', 'Synthesiser'],
    durationSeconds: 194,
    preview: { note: 'Work-in-progress audio will be posted as the arrangement settles.' },
    destinations: [{ platform: 'soundcloud', status: 'pending' }],
  },
  {
    slug: 'piano-half-past-midnight',
    title: 'Piano, Half Past Midnight',
    origin: 'example',
    kind: 'session',
    state: 'published',
    date: '2026-07-06',
    context: [
      'One take, two microphones, no click. Recorded at the hour in the title, which is audible in the playing.',
    ],
    instruments: ['Grand piano'],
    durationSeconds: 383,
    destinations: [{ platform: 'soundcloud', status: 'pending' }],
  },
  {
    slug: 'oxblood',
    title: 'Oxblood',
    origin: 'example',
    kind: 'track',
    state: 'published',
    date: '2026-06-11',
    context: [
      'Louder than anything else here. A burgundy amplifier earning its keep, recorded with the cabinet facing a wall of books.',
    ],
    instruments: ['Electric guitar', 'Bass', 'Drums'],
    durationSeconds: 221,
    destinations: [
      { platform: 'soundcloud', status: 'pending' },
      { platform: 'bandcamp', status: 'pending' },
    ],
  },
  {
    slug: 'brass-and-rain',
    title: 'Brass and Rain',
    origin: 'example',
    kind: 'work-in-progress',
    state: 'in-progress',
    date: '2026-05-30',
    context: [
      'An attempt at writing something for the audiobook productions to breathe against — present, but not asking for attention.',
    ],
    instruments: ['Nylon-string guitar', 'Upright piano', 'Field recording'],
    destinations: [{ platform: 'soundcloud', status: 'pending' }],
  },
  {
    slug: 'the-long-way-home',
    title: 'The Long Way Home',
    origin: 'example',
    kind: 'release',
    state: 'coming-soon',
    date: '2026-04-17',
    context: [
      'A short instrumental set collecting the pieces that kept surviving the edit. Sequenced to be heard in order.',
    ],
    instruments: ['Guitars', 'Piano', 'Percussion'],
    destinations: [
      { platform: 'spotify', status: 'pending' },
      { platform: 'apple-music', status: 'pending' },
      { platform: 'bandcamp', status: 'pending' },
    ],
  },
]

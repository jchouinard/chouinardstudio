import type { z } from 'zod'
import type { projectSchema } from './schema'

/**
 * REPRESENTATIVE CONTENT — illustrative studio activity, not a record of
 * actual events.
 *
 * These demonstrate the "Current Work" surface described in
 * EXPERIENCE-CATALOG.md. `related` links let an update point at the work it
 * concerns without duplicating that work's data.
 */
export const projectRecords: z.input<typeof projectSchema>[] = [
  {
    slug: 'first-release-wave',
    title: 'First release wave in production',
    origin: 'example',
    state: 'in-progress',
    date: '2026-08-04',
    featured: true,
    featureRank: 1,
    statusLabel: 'In production',
    summary:
      'Recording and editing the first group of titles together rather than releasing them one at a time.',
    body: [
      'The intent is that the first things anyone hears from the imprint arrive as a coherent set — same standard of performance, same treatment, recognisably from one place.',
      'Which titles land in the first wave is still open, and deliberately so.',
    ],
    related: [
      { type: 'collection', slug: 'cozy-classics' },
      { type: 'story', slug: 'the-secret-garden' },
    ],
  },
  {
    slug: 'tracking-room-build',
    title: 'Building the tracking room',
    origin: 'example',
    state: 'in-progress',
    date: '2026-07-19',
    featured: true,
    featureRank: 2,
    statusLabel: 'Under construction',
    summary:
      'Acoustic treatment, wood diffusion and the slow business of making a room sound like itself.',
    body: [
      'Bass trapping first, then broadband absorption at the reflection points, then diffusion — in that order, because doing it in any other order means doing it twice.',
      'The room is being built toward the environment described in the studio references rather than being finished already.',
    ],
    related: [{ type: 'note', slug: 'room-tone-as-an-instrument' }],
  },
  {
    slug: 'narration-booth',
    title: 'Narration booth treatment',
    origin: 'example',
    state: 'published',
    date: '2026-06-02',
    statusLabel: 'Complete',
    summary:
      'A quiet, dead-enough space that a narrator can sit in for four hours without fighting it.',
    body: [
      'Long-form narration is an endurance problem before it is an acoustic one. Comfortable chair, silent ventilation, a script surface that does not rustle, and a headphone mix that does not make you push.',
    ],
    related: [{ type: 'note', slug: 'recording-narration-in-long-takes' }],
  },
  {
    slug: 'score-sketches',
    title: 'Score sketches for the story cycle',
    origin: 'example',
    state: 'in-progress',
    date: '2026-05-26',
    statusLabel: 'Sketching',
    summary:
      'Original music written specifically to sit under narration without competing with it.',
    body: [
      'Most library music is too busy for spoken word. Writing our own means it can be sparse on purpose and arranged around the voice.',
    ],
    related: [{ type: 'music', slug: 'brass-and-rain' }],
  },
]

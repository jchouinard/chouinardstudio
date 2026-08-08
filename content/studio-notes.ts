import type { z } from 'zod'
import type { studioNoteSchema } from './schema'

/**
 * REPRESENTATIVE CONTENT — illustrative craft writing.
 *
 * BRAND-DIRECTION.md: demonstrate quality through real work, process and
 * attention to detail, and never become a gear catalogue. These notes are
 * about decisions and why they matter, not equipment lists.
 */
export const studioNoteRecords: z.input<typeof studioNoteSchema>[] = [
  {
    slug: 'micing-a-piano-from-the-players-ear',
    title: 'Micing a piano from the player’s ear',
    origin: 'example',
    state: 'published',
    date: '2026-07-28',
    featured: true,
    featureRank: 1,
    summary:
      'The most convincing piano sound is usually the one the person playing it hears.',
    body: [
      'The instinct is to put microphones where the piano is loudest. The result is accurate and slightly hostile — all hammer, no room.',
      'Moving the pair back toward where the player’s head actually sits gives up some detail and gets back the thing that makes a piano recording feel like a person in a room. On a warm record that trade is almost always worth making.',
      'This is the sort of decision that never appears in the finished work and determines all of it.',
    ],
    topics: ['Recording', 'Piano', 'Microphone technique'],
  },
  {
    slug: 'recording-narration-in-long-takes',
    title: 'Recording narration in long takes',
    origin: 'example',
    state: 'published',
    date: '2026-06-30',
    featured: true,
    featureRank: 2,
    summary:
      'Punching in every stumble is faster to record and worse to listen to.',
    body: [
      'A chapter recorded in long passes holds its pace. A chapter assembled from forty corrected fragments has a subtle unevenness that listeners feel without being able to name.',
      'It costs more time in the booth and saves it in the edit, and the performance survives.',
    ],
    topics: ['Narration', 'Editing', 'Performance'],
  },
  {
    slug: 'room-tone-as-an-instrument',
    title: 'Room tone as an instrument',
    origin: 'example',
    state: 'published',
    date: '2026-05-14',
    summary: 'Silence is not the absence of sound, and listeners notice when it is.',
    body: [
      'Strip a recording to true digital silence between phrases and it stops sounding like a place. The gaps have to breathe with the same air as the words.',
      'Capturing a clean minute of the empty room before a session is thirty seconds of work that rescues an entire edit.',
    ],
    topics: ['Acoustics', 'Editing', 'Post-production'],
  },
  {
    slug: 'choosing-the-chair',
    title: 'Choosing the chair',
    origin: 'example',
    state: 'published',
    date: '2026-04-09',
    summary: 'Four hours of narration is a physical job, and the furniture decides how it goes.',
    body: [
      'Anything that creaks, swivels or encourages slouching will be audible by hour three — if not in the recording, then in the voice.',
      'It is an unglamorous purchase that affects the finished product more than most of the equipment does.',
    ],
    topics: ['Narration', 'Studio craft'],
  },
]

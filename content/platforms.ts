import type { z } from 'zod'
import type { platformSchema } from './schema'

/**
 * Registry of external listening / purchase destinations.
 *
 * Adding a future platform is one entry here plus a destination on the
 * relevant records. Nothing in the page layer knows the provider list, which
 * is what CONTENT-OPERATING-MODEL.md means by "extensible rather than
 * hard-coded to today's providers".
 */
export const platformRecords: z.input<typeof platformSchema>[] = [
  { id: 'soundcloud', name: 'SoundCloud', short: 'SoundCloud', kind: 'music' },
  { id: 'spotify', name: 'Spotify', short: 'Spotify', kind: 'both' },
  { id: 'apple-music', name: 'Apple Music', short: 'Apple Music', kind: 'music' },
  { id: 'bandcamp', name: 'Bandcamp', short: 'Bandcamp', kind: 'music' },
  { id: 'youtube', name: 'YouTube', short: 'YouTube', kind: 'music' },
  { id: 'audible', name: 'Audible', short: 'Audible', kind: 'audiobook' },
  { id: 'apple-books', name: 'Apple Books', short: 'Apple Books', kind: 'audiobook' },
  { id: 'libro-fm', name: 'Libro.fm', short: 'Libro.fm', kind: 'audiobook' },
  { id: 'chirp', name: 'Chirp', short: 'Chirp', kind: 'audiobook' },
  { id: 'kobo', name: 'Kobo Audiobooks', short: 'Kobo', kind: 'audiobook' },
]

import { z } from 'zod'

/**
 * Chouinard Studios content model.
 *
 * Requirements this satisfies (product-kb/ARCHITECTURE.md, CONTENT-OPERATING-MODEL.md):
 *  - typed reusable records, separate from presentation
 *  - one record can surface on many pages without duplicate entry
 *  - publish state, dates, featuring/reordering, artwork, previews, embeds
 *  - regrouping without page redesign
 *  - external destinations extensible, never hard-coded to today's providers
 *  - a CMS can be added later by feeding it these same shapes
 */

/* -------------------------------------------------------------------------- */
/* Primitives                                                                  */
/* -------------------------------------------------------------------------- */

export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be kebab-case')

export const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD')
  .refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00Z`)), 'date must be a real date')

/**
 * Provenance. Every record declares whether it is real Chouinard Studios work
 * or representative content standing in until real work arrives.
 *
 * `example` records are visibly labelled in the UI. This is what keeps the
 * seeded site honest — see CONTENT-OPERATING-MODEL.md: "Automation must never
 * fabricate activity, dates, releases, popularity, clients, or creative work."
 */
export const originSchema = z.enum(['real', 'example'])
export type Origin = z.infer<typeof originSchema>

export const publishStateSchema = z.enum([
  'published',
  'coming-soon',
  'in-progress',
  'archived',
])
export type PublishState = z.infer<typeof publishStateSchema>

/**
 * Media reference. `kind` matters: BRAND-DIRECTION.md requires that concept
 * imagery never imply a finished physical room, so concept media is captioned
 * as such wherever it renders.
 */
export const mediaSchema = z.object({
  src: z.string().min(1).optional(),
  alt: z.string().min(1),
  kind: z.enum(['photo', 'concept', 'artwork', 'generated']).default('generated'),
  caption: z.string().optional(),
  credit: z.string().optional(),
})
export type Media = z.infer<typeof mediaSchema>

/**
 * External platform destination.
 *
 * `pending` means "we intend to be here, the link does not exist yet" and
 * renders as a non-clickable annotated chip. This is how the seeded site shows
 * the destination UI without fabricating platform availability.
 */
export const destinationSchema = z
  .object({
    platform: slugSchema,
    status: z.enum(['available', 'pending']),
    url: z.string().url().optional(),
    note: z.string().optional(),
  })
  .refine((d) => d.status !== 'available' || Boolean(d.url), {
    message: 'an available destination must have a url',
    path: ['url'],
  })
export type Destination = z.infer<typeof destinationSchema>

/** On-site preview. Absent audio degrades gracefully to an explanatory state. */
export const previewSchema = z.object({
  src: z.string().min(1).optional(),
  durationSeconds: z.number().int().positive().optional(),
  note: z.string().optional(),
})
export type Preview = z.infer<typeof previewSchema>

/** Official third-party embed (SoundCloud, Spotify, ...). Never an arbitrary iframe. */
export const embedSchema = z.object({
  provider: z.enum(['soundcloud', 'spotify', 'apple-music', 'youtube']),
  url: z.string().url(),
  title: z.string().min(1),
  heightPx: z.number().int().positive().default(166),
})
export type Embed = z.infer<typeof embedSchema>

export const creditSchema = z.object({
  role: z.string().min(1),
  name: z.string().min(1),
})

/** Fields every surfaceable record shares, so one item can feed many pages. */
const baseRecord = {
  slug: slugSchema,
  title: z.string().min(1),
  origin: originSchema,
  state: publishStateSchema.default('published'),
  /** Sort key for every "latest / recent" surface across the site. */
  date: isoDateSchema,
  featured: z.boolean().default(false),
  /** Lower sorts first among featured items. */
  featureRank: z.number().int().optional(),
  artwork: mediaSchema.optional(),
}

/* -------------------------------------------------------------------------- */
/* Platforms                                                                   */
/* -------------------------------------------------------------------------- */

export const platformSchema = z.object({
  id: slugSchema,
  name: z.string().min(1),
  kind: z.enum(['music', 'audiobook', 'both']),
  /** Short label for the chip, e.g. "Spotify". */
  short: z.string().min(1),
})
export type Platform = z.infer<typeof platformSchema>

/* -------------------------------------------------------------------------- */
/* Stories / audiobooks                                                        */
/* -------------------------------------------------------------------------- */

export const storySchema = z.object({
  ...baseRecord,
  /** Original author of the underlying work. */
  author: z.string().min(1),
  tagline: z.string().min(1),
  synopsis: z.array(z.string().min(1)).min(1),
  /** e.g. "Public domain" — rights basis, per AUDIOBOOK-BUSINESS.md. */
  sourceNote: z.string().optional(),
  themes: z.array(z.string().min(1)).default([]),
  audienceNote: z.string().optional(),
  narrator: z.string().optional(),
  credits: z.array(creditSchema).default([]),
  runtimeMinutes: z.number().int().positive().optional(),
  /** Collection slugs. Regrouping is a data edit, never a redesign. */
  collections: z.array(slugSchema).default([]),
  preview: previewSchema.optional(),
  destinations: z.array(destinationSchema).default([]),
})
export type Story = z.infer<typeof storySchema>

export const collectionSchema = z.object({
  ...baseRecord,
  tagline: z.string().min(1),
  description: z.array(z.string().min(1)).min(1),
  themes: z.array(z.string().min(1)).default([]),
})
export type Collection = z.infer<typeof collectionSchema>

/* -------------------------------------------------------------------------- */
/* Music                                                                       */
/* -------------------------------------------------------------------------- */

export const musicSchema = z.object({
  ...baseRecord,
  kind: z.enum(['track', 'release', 'work-in-progress', 'session']),
  context: z.array(z.string().min(1)).min(1),
  instruments: z.array(z.string().min(1)).default([]),
  durationSeconds: z.number().int().positive().optional(),
  preview: previewSchema.optional(),
  embed: embedSchema.optional(),
  destinations: z.array(destinationSchema).default([]),
})
export type MusicItem = z.infer<typeof musicSchema>

/* -------------------------------------------------------------------------- */
/* Current work + studio notes                                                 */
/* -------------------------------------------------------------------------- */

/** A cross-reference from an update to the work it concerns. */
export const relatedSchema = z.object({
  type: z.enum(['story', 'collection', 'music', 'note']),
  slug: slugSchema,
})

export const projectSchema = z.object({
  ...baseRecord,
  summary: z.string().min(1),
  body: z.array(z.string().min(1)).default([]),
  /** Visitor-facing status line, e.g. "In production". */
  statusLabel: z.string().min(1),
  related: z.array(relatedSchema).default([]),
})
export type Project = z.infer<typeof projectSchema>

export const studioNoteSchema = z.object({
  ...baseRecord,
  summary: z.string().min(1),
  body: z.array(z.string().min(1)).min(1),
  topics: z.array(z.string().min(1)).default([]),
})
export type StudioNote = z.infer<typeof studioNoteSchema>

/* -------------------------------------------------------------------------- */
/* Curated freshness                                                           */
/* -------------------------------------------------------------------------- */

/**
 * CURATED-FRESHNESS.md: curate, do not scrape. A curated item is a link to
 * someone else's work plus Chouinard Studios' own reason for pointing at it,
 * which `why` makes a required field rather than an optional nicety.
 */
export const curatedSchema = z.object({
  ...baseRecord,
  category: z.enum(['listening', 'craft', 'storytelling', 'instrument']),
  source: z.object({
    name: z.string().min(1),
    url: z.string().url(),
  }),
  why: z.string().min(1),
})
export type CuratedItem = z.infer<typeof curatedSchema>

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

/** Parse a collection of records, reporting the offending index on failure. */
export function parseAll<S extends z.ZodType>(
  schema: S,
  items: unknown[],
  label: string,
): z.infer<S>[] {
  return items.map((item, index) => {
    const result = schema.safeParse(item)
    if (!result.success) {
      const issues = result.error.issues
        .map((i) => `    - ${i.path.join('.') || '(root)'}: ${i.message}`)
        .join('\n')
      throw new Error(`Invalid ${label} record at index ${index}:\n${issues}`)
    }
    return result.data
  })
}

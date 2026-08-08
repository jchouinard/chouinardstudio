import {
  collectionSchema,
  curatedSchema,
  musicSchema,
  parseAll,
  platformSchema,
  projectSchema,
  storySchema,
  studioNoteSchema,
  type Collection,
  type CuratedItem,
  type MusicItem,
  type Platform,
  type Project,
  type Story,
  type StudioNote,
} from './schema'

import { collectionRecords } from './collections'
import { curatedRecords } from './curated'
import { musicRecords } from './music'
import { platformRecords } from './platforms'
import { projectRecords } from './projects'
import { storyRecords } from './stories'
import { studioNoteRecords } from './studio-notes'

/**
 * Validated content.
 *
 * Parsing happens at module load, so `next build` fails loudly on a malformed
 * or dangling record rather than shipping a broken page. This is the whole
 * safety net behind "adding an audiobook should not require touching code".
 */

export const platforms: Platform[] = parseAll(platformSchema, platformRecords, 'platform')
export const stories: Story[] = parseAll(storySchema, storyRecords, 'story')
export const collections: Collection[] = parseAll(
  collectionSchema,
  collectionRecords,
  'collection',
)
export const music: MusicItem[] = parseAll(musicSchema, musicRecords, 'music')
export const projects: Project[] = parseAll(projectSchema, projectRecords, 'project')
export const studioNotes: StudioNote[] = parseAll(
  studioNoteSchema,
  studioNoteRecords,
  'studio note',
)
export const curated: CuratedItem[] = parseAll(curatedSchema, curatedRecords, 'curated item')

/* -------------------------------------------------------------------------- */
/* Referential integrity                                                       */
/* -------------------------------------------------------------------------- */

function assertUniqueSlugs(label: string, items: { slug: string }[]): void {
  const seen = new Set<string>()
  for (const item of items) {
    if (seen.has(item.slug)) throw new Error(`Duplicate ${label} slug: ${item.slug}`)
    seen.add(item.slug)
  }
}

function checkReferences(): void {
  assertUniqueSlugs('story', stories)
  assertUniqueSlugs('collection', collections)
  assertUniqueSlugs('music', music)
  assertUniqueSlugs('project', projects)
  assertUniqueSlugs('studio note', studioNotes)
  assertUniqueSlugs('curated item', curated)

  const platformIds = new Set(platforms.map((p) => p.id))
  const collectionSlugs = new Set(collections.map((c) => c.slug))
  const storySlugs = new Set(stories.map((s) => s.slug))
  const musicSlugs = new Set(music.map((m) => m.slug))
  const noteSlugs = new Set(studioNotes.map((n) => n.slug))

  for (const story of stories) {
    for (const collection of story.collections) {
      if (!collectionSlugs.has(collection)) {
        throw new Error(`Story "${story.slug}" references unknown collection "${collection}"`)
      }
    }
    for (const destination of story.destinations) {
      if (!platformIds.has(destination.platform)) {
        throw new Error(
          `Story "${story.slug}" references unknown platform "${destination.platform}"`,
        )
      }
    }
  }

  for (const item of music) {
    for (const destination of item.destinations) {
      if (!platformIds.has(destination.platform)) {
        throw new Error(
          `Music "${item.slug}" references unknown platform "${destination.platform}"`,
        )
      }
    }
  }

  const targets: Record<string, Set<string>> = {
    story: storySlugs,
    collection: collectionSlugs,
    music: musicSlugs,
    note: noteSlugs,
  }

  for (const project of projects) {
    for (const related of project.related) {
      if (!targets[related.type]?.has(related.slug)) {
        throw new Error(
          `Project "${project.slug}" references unknown ${related.type} "${related.slug}"`,
        )
      }
    }
  }
}

checkReferences()

/* -------------------------------------------------------------------------- */
/* Queries                                                                     */
/* -------------------------------------------------------------------------- */

type Dated = { date: string }
type Featurable = { featured: boolean; featureRank?: number | undefined }
type Stateful = { state: string }

/** Newest first. */
export function byNewest<T extends Dated>(items: T[]): T[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date))
}

/** Featured items first (by rank), then everything else newest-first. */
export function byFeature<T extends Dated & Featurable>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    if (a.featured && b.featured) {
      const rankA = a.featureRank ?? Number.MAX_SAFE_INTEGER
      const rankB = b.featureRank ?? Number.MAX_SAFE_INTEGER
      if (rankA !== rankB) return rankA - rankB
    }
    return b.date.localeCompare(a.date)
  })
}

/** Archived records stay in the data and disappear from the site. */
export function visible<T extends Stateful>(items: T[]): T[] {
  return items.filter((item) => item.state !== 'archived')
}

export const platformById = new Map(platforms.map((p) => [p.id, p]))

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug)
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug)
}

export function getMusic(slug: string): MusicItem | undefined {
  return music.find((m) => m.slug === slug)
}

export function getStudioNote(slug: string): StudioNote | undefined {
  return studioNotes.find((n) => n.slug === slug)
}

export function storiesInCollection(slug: string): Story[] {
  return byFeature(visible(stories).filter((s) => s.collections.includes(slug)))
}

export function collectionsForStory(story: Story): Collection[] {
  return story.collections
    .map((slug) => getCollection(slug))
    .filter((c): c is Collection => Boolean(c))
}

/** Other titles a listener might move to next — same collection, then anything. */
export function relatedStories(story: Story, limit = 3): Story[] {
  const sameCollection = visible(stories).filter(
    (candidate) =>
      candidate.slug !== story.slug &&
      candidate.collections.some((c) => story.collections.includes(c)),
  )
  const rest = visible(stories).filter(
    (candidate) =>
      candidate.slug !== story.slug && !sameCollection.some((s) => s.slug === candidate.slug),
  )
  return [...byFeature(sameCollection), ...byNewest(rest)].slice(0, limit)
}

export * from './schema'

import {
  byNewest,
  curated,
  music,
  projects,
  stories,
  studioNotes,
  visible,
  type Origin,
} from '@/content'

/**
 * The freshness engine.
 *
 * CONTENT-OPERATING-MODEL.md: "one new piece of real work can refresh multiple
 * appropriate surfaces automatically". Every content type is normalised into a
 * single stream here, so the homepage, Current Work and any future surface all
 * read from one derivation instead of a hand-maintained list.
 *
 * Nothing is invented: an item appears because a record exists, and it is
 * ordered by that record's own date.
 */

export type ActivityType = 'music' | 'story' | 'project' | 'note' | 'curated'

export interface ActivityItem {
  id: string
  type: ActivityType
  title: string
  href: string
  date: string
  summary: string
  /** Short contextual label, e.g. "Work in progress". */
  kicker: string
  origin: Origin
}

const musicKicker: Record<string, string> = {
  track: 'Track',
  release: 'Release',
  'work-in-progress': 'Work in progress',
  session: 'Session',
}

function fromMusic(): ActivityItem[] {
  return visible(music).map((item) => ({
    id: `music:${item.slug}`,
    type: 'music' as const,
    title: item.title,
    href: `/music/${item.slug}`,
    date: item.date,
    summary: item.context[0] ?? '',
    kicker: musicKicker[item.kind] ?? 'Music',
    origin: item.origin,
  }))
}

function fromStories(): ActivityItem[] {
  return visible(stories).map((item) => ({
    id: `story:${item.slug}`,
    type: 'story' as const,
    title: item.title,
    href: `/stories/${item.slug}`,
    date: item.date,
    summary: item.tagline,
    kicker: item.state === 'coming-soon' ? 'Coming soon' : 'In production',
    origin: item.origin,
  }))
}

function fromProjects(): ActivityItem[] {
  return visible(projects).map((item) => ({
    id: `project:${item.slug}`,
    type: 'project' as const,
    title: item.title,
    href: `/current-work#${item.slug}`,
    date: item.date,
    summary: item.summary,
    kicker: item.statusLabel,
    origin: item.origin,
  }))
}

function fromNotes(): ActivityItem[] {
  return visible(studioNotes).map((item) => ({
    id: `note:${item.slug}`,
    type: 'note' as const,
    title: item.title,
    href: `/studio/notes/${item.slug}`,
    date: item.date,
    summary: item.summary,
    kicker: 'Studio note',
    origin: item.origin,
  }))
}

function fromCurated(): ActivityItem[] {
  return visible(curated).map((item) => ({
    id: `curated:${item.slug}`,
    type: 'curated' as const,
    title: item.title,
    href: '/listening-room',
    date: item.date,
    summary: item.why,
    kicker: 'Listening room',
    origin: item.origin,
  }))
}

/**
 * Chouinard Studios' own work, newest first.
 *
 * Curated outside material is deliberately excluded: CURATED-FRESHNESS.md puts
 * it below the studio's own work in the homepage hierarchy, and the site must
 * not read as a feed aggregator.
 */
export function studioActivity(limit?: number): ActivityItem[] {
  const items = byNewest([...fromMusic(), ...fromStories(), ...fromProjects(), ...fromNotes()])
  return typeof limit === 'number' ? items.slice(0, limit) : items
}

/** Everything, including curated outside material. */
export function allActivity(limit?: number): ActivityItem[] {
  const items = byNewest([
    ...fromMusic(),
    ...fromStories(),
    ...fromProjects(),
    ...fromNotes(),
    ...fromCurated(),
  ])
  return typeof limit === 'number' ? items.slice(0, limit) : items
}

/** Most recent date across all studio work — powers the "last updated" line. */
export function latestActivityDate(): string | undefined {
  return studioActivity(1)[0]?.date
}

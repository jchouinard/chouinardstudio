import { describe, expect, it } from 'vitest'

import {
  byFeature,
  collections,
  curated,
  getStory,
  music,
  platformById,
  relatedStories,
  stories,
  storiesInCollection,
  studioNotes,
  visible,
} from '@/content'
import { destinationSchema, storySchema } from '@/content/schema'

describe('content integrity', () => {
  it('loads and validates every record set', () => {
    expect(stories.length).toBeGreaterThan(0)
    expect(collections.length).toBeGreaterThan(0)
    expect(music.length).toBeGreaterThan(0)
    expect(studioNotes.length).toBeGreaterThan(0)
    expect(curated.length).toBeGreaterThan(0)
  })

  it('gives every record a unique slug within its type', () => {
    for (const set of [stories, collections, music, studioNotes, curated]) {
      const slugs = set.map((item) => item.slug)
      expect(new Set(slugs).size).toBe(slugs.length)
    }
  })

  it('points every story collection reference at a real collection', () => {
    const known = new Set(collections.map((c) => c.slug))
    for (const story of stories) {
      for (const slug of story.collections) {
        expect(known.has(slug)).toBe(true)
      }
    }
  })

  it('points every destination at a registered platform', () => {
    for (const item of [...stories, ...music]) {
      for (const destination of item.destinations) {
        expect(platformById.has(destination.platform)).toBe(true)
      }
    }
  })
})

describe('honesty guarantees', () => {
  it('never claims platform availability without a url', () => {
    for (const item of [...stories, ...music]) {
      for (const destination of item.destinations) {
        if (destination.status === 'available') {
          expect(destination.url).toBeTruthy()
        }
      }
    }
  })

  it('rejects an available destination that has no url', () => {
    const result = destinationSchema.safeParse({ platform: 'spotify', status: 'available' })
    expect(result.success).toBe(false)
  })

  it('labels all seeded content as representative', () => {
    // While the site carries no real releases, every record must be an example
    // so the UI badges it. This test is expected to change as real work lands.
    const everything = [...stories, ...collections, ...music, ...studioNotes, ...curated]
    expect(everything.every((record) => record.origin === 'example')).toBe(true)
  })

  it('requires curated items to carry their own justification', () => {
    for (const item of curated) {
      expect(item.why.trim().length).toBeGreaterThan(20)
      expect(item.source.url).toMatch(/^https:\/\//)
    }
  })
})

describe('queries', () => {
  it('sorts featured items ahead of the rest, by rank', () => {
    const sorted = byFeature(visible(stories))
    const featured = sorted.filter((s) => s.featured)
    const unfeatured = sorted.filter((s) => !s.featured)

    expect(sorted.slice(0, featured.length).every((s) => s.featured)).toBe(true)

    const ranks = featured.map((s) => s.featureRank ?? Number.MAX_SAFE_INTEGER)
    expect([...ranks].sort((a, b) => a - b)).toEqual(ranks)
    expect(featured.length + unfeatured.length).toBe(sorted.length)
  })

  it('finds the titles in a collection', () => {
    const cozy = storiesInCollection('cozy-classics')
    expect(cozy.length).toBeGreaterThan(0)
    expect(cozy.every((story) => story.collections.includes('cozy-classics'))).toBe(true)
  })

  it('supports a title belonging to more than one collection', () => {
    const multi = stories.filter((story) => story.collections.length > 1)
    expect(multi.length).toBeGreaterThan(0)
  })

  it('excludes archived records from visible()', () => {
    const withArchived = [
      { slug: 'a', state: 'published' },
      { slug: 'b', state: 'archived' },
    ]
    expect(visible(withArchived).map((r) => r.slug)).toEqual(['a'])
  })

  it('never recommends a story alongside itself', () => {
    for (const story of stories) {
      const related = relatedStories(story)
      expect(related.some((item) => item.slug === story.slug)).toBe(false)
    }
  })

  it('looks a story up by slug', () => {
    const first = stories[0]!
    expect(getStory(first.slug)?.title).toBe(first.title)
    expect(getStory('not-a-real-slug')).toBeUndefined()
  })
})

describe('schema', () => {
  it('rejects a non-kebab-case slug', () => {
    const result = storySchema.safeParse({
      slug: 'Not A Slug',
      title: 'x',
      author: 'y',
      origin: 'example',
      date: '2026-01-01',
      tagline: 't',
      synopsis: ['s'],
    })
    expect(result.success).toBe(false)
  })

  it('rejects a malformed date', () => {
    const result = storySchema.safeParse({
      slug: 'ok-slug',
      title: 'x',
      author: 'y',
      origin: 'example',
      date: '01-01-2026',
      tagline: 't',
      synopsis: ['s'],
    })
    expect(result.success).toBe(false)
  })
})

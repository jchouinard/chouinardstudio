import { describe, expect, it } from 'vitest'

import { allActivity, latestActivityDate, studioActivity } from '@/lib/activity'
import { music, stories, studioNotes, visible } from '@/content'

describe('activity stream', () => {
  it('gathers every studio content type into one stream', () => {
    const types = new Set(studioActivity().map((item) => item.type))
    expect(types).toContain('music')
    expect(types).toContain('story')
    expect(types).toContain('project')
    expect(types).toContain('note')
  })

  it('keeps curated outside material out of the studio stream', () => {
    // CURATED-FRESHNESS.md ranks the studio's own work above outside material,
    // and the site must not read as a feed aggregator.
    expect(studioActivity().some((item) => item.type === 'curated')).toBe(false)
    expect(allActivity().some((item) => item.type === 'curated')).toBe(true)
  })

  it('orders newest first', () => {
    const dates = studioActivity().map((item) => item.date)
    expect([...dates].sort((a, b) => b.localeCompare(a))).toEqual(dates)
  })

  it('honours the limit', () => {
    expect(studioActivity(3)).toHaveLength(3)
    expect(studioActivity(1)[0]?.date).toBe(latestActivityDate())
  })

  it('surfaces one record on multiple surfaces without duplicate entry', () => {
    // A single music record should be derivable into the activity stream while
    // still being the same record the Music page renders.
    const track = visible(music)[0]!
    const entry = studioActivity().find((item) => item.id === `music:${track.slug}`)
    expect(entry).toBeDefined()
    expect(entry?.href).toBe(`/music/${track.slug}`)
    expect(entry?.date).toBe(track.date)
  })

  it('gives every item a unique id and a resolvable href', () => {
    const items = allActivity()
    expect(new Set(items.map((i) => i.id)).size).toBe(items.length)
    for (const item of items) {
      expect(item.href.startsWith('/')).toBe(true)
      expect(item.title.length).toBeGreaterThan(0)
    }
  })

  it('counts every visible story and note exactly once', () => {
    const streamStories = studioActivity().filter((i) => i.type === 'story')
    const streamNotes = studioActivity().filter((i) => i.type === 'note')
    expect(streamStories).toHaveLength(visible(stories).length)
    expect(streamNotes).toHaveLength(visible(studioNotes).length)
  })
})

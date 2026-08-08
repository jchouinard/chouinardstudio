import type { MetadataRoute } from 'next'

import { collections, music, stories, studioNotes, visible } from '@/content'
import { site } from '@/content/site'

/** Generated from the content layer, so new records are indexed automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/music', priority: 0.9 },
    { path: '/stories', priority: 0.9 },
    { path: '/studio', priority: 0.7 },
    { path: '/current-work', priority: 0.7 },
    { path: '/listening-room', priority: 0.5 },
    { path: '/about', priority: 0.6 },
    { path: '/contact', priority: 0.5 },
  ]

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${site.url}${route.path}`,
    changeFrequency: 'weekly',
    priority: route.priority,
  }))

  for (const story of visible(stories)) {
    entries.push({
      url: `${site.url}/stories/${story.slug}`,
      lastModified: story.date,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  for (const collection of visible(collections)) {
    entries.push({
      url: `${site.url}/stories/collections/${collection.slug}`,
      lastModified: collection.date,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  for (const item of visible(music)) {
    entries.push({
      url: `${site.url}/music/${item.slug}`,
      lastModified: item.date,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  for (const note of visible(studioNotes)) {
    entries.push({
      url: `${site.url}/studio/notes/${note.slug}`,
      lastModified: note.date,
      changeFrequency: 'yearly',
      priority: 0.5,
    })
  }

  return entries
}

import type { MetadataRoute } from 'next'

import { site } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  // The preview build stays out of search results until real content is live.
  if (site.isPreviewBuild) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.url}/sitemap.xml`,
  }
}

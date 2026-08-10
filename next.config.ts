import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Real studio photography will arrive later. When it does, add remote hosts
    // here (or keep files in /public) without touching page code.
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
  /**
   * Serve the Studio Console at the root of admin.chouinardstudio.com.
   *
   * A host-scoped rewrite rather than middleware: it compiles to a routing
   * rule, so no request runs through a Node runtime and the public site stays
   * fully static. The rule only matches the admin host, so this branch's
   * public pages are unaffected.
   *
   * This rewrite exists on the `admin/base` branch only.
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          has: [{ type: 'host', value: 'admin.chouinardstudio.com' }],
          destination: '/admin',
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}

export default nextConfig

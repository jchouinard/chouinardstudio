'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { site } from '@/content/site'
import { Wordmark } from '@/components/ui/Wordmark'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [renderedAt, setRenderedAt] = useState(pathname)

  // Close the mobile menu whenever the route changes. Adjusting state during
  // render (rather than in an effect) avoids a cascading second render.
  if (renderedAt !== pathname) {
    setRenderedAt(pathname)
    setOpen(false)
  }

  // Don't let the page scroll behind an open full-screen menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/70 bg-ink-900/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="group shrink-0" aria-label={`${site.name} home`}>
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`relative py-1 text-[0.8rem] uppercase tracking-[0.16em] transition-colors duration-300 ${
                    isActive(item.href)
                      ? 'text-brass-400'
                      : 'text-ivory-300 hover:text-ivory-100'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-0.5 left-0 h-px w-full bg-brass-600" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex items-center gap-2 border border-ink-600 px-3 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-ivory-300 transition-colors hover:border-brass-700 hover:text-ivory-100 lg:hidden"
        >
          <span className="sr-only">
            {open ? 'Close navigation menu' : 'Open navigation menu'}
          </span>
          <span aria-hidden="true">{open ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-ink-700 bg-ink-950 lg:hidden"
        >
          <ul className="mx-auto max-w-7xl px-6 py-4">
            {site.nav.map((item) => (
              <li key={item.href} className="border-b border-ink-800 last:border-0">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`block py-4 font-display text-2xl ${
                    isActive(item.href) ? 'text-brass-400' : 'text-ivory-100'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

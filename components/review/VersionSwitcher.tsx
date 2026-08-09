'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { getReviewVersions, resolveCurrentVersionId, shouldShowSwitcher } from '@/lib/review-env'

/**
 * The hostname is a browser value that never changes during a session, so it
 * is read through useSyncExternalStore rather than an effect: no cascading
 * render, and the server snapshot keeps every route statically prerenderable.
 */
const subscribeToHost = () => () => {}
const getHostSnapshot = () => window.location.hostname
const getServerHostSnapshot = () => ''

/**
 * Design version switcher — review infrastructure, not site navigation.
 *
 * Lets the Founder move between live design iterations while reviewing
 * animation, responsive behaviour and pacing, which stills and PDFs cannot
 * show.
 *
 * Never appears on the public production experience: the host is checked
 * against a hard deny list in lib/review-env.ts before anything renders. It is
 * also deliberately styled as an instrument rather than as part of the site —
 * fixed to a lower corner, labelled "Review", and visually distinct from the
 * brand navigation so it cannot be mistaken for it.
 */
export function VersionSwitcher() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const hostname = useSyncExternalStore(
    subscribeToHost,
    getHostSnapshot,
    getServerHostSnapshot,
  )

  // Empty hostname means the server render; nothing is shown until the client
  // can evaluate the host against the deny list.
  const visible =
    hostname !== '' && shouldShowSwitcher(hostname, process.env.NEXT_PUBLIC_REVIEW_ENV)
  const currentId = hostname === '' ? '' : resolveCurrentVersionId(hostname)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [open])

  if (!visible) return null

  const versions = getReviewVersions()
  const current = versions.find((version) => version.id === currentId)

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 left-4 z-[70] print:hidden"
      data-review-control="version-switcher"
    >
      {open && (
        <div
          id="review-version-list"
          className="mb-2 w-52 border border-ink-600 bg-ink-950/95 p-1.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.95)] backdrop-blur-sm"
        >
          <p className="px-2.5 pb-1.5 pt-1 text-[0.58rem] uppercase tracking-[0.2em] text-ivory-500">
            Design versions
          </p>

          <ul>
            {versions.map((version) => {
              const isCurrent = version.id === currentId

              if (!version.available) {
                return (
                  <li key={version.id}>
                    <span
                      aria-disabled="true"
                      title={`${version.description} — not yet deployed`}
                      className="flex cursor-not-allowed items-center justify-between gap-2 px-2.5 py-1.5 text-[0.72rem] text-ivory-500/55"
                    >
                      <span>{version.label}</span>
                      <span className="text-[0.55rem] uppercase tracking-[0.16em]">
                        Not built
                      </span>
                    </span>
                  </li>
                )
              }

              return (
                <li key={version.id}>
                  <a
                    href={version.url}
                    aria-current={isCurrent ? 'true' : undefined}
                    title={version.description}
                    className={`flex items-center justify-between gap-2 px-2.5 py-1.5 text-[0.72rem] transition-colors ${
                      isCurrent
                        ? 'bg-ink-800 text-brass-300'
                        : 'text-ivory-300 hover:bg-ink-850 hover:text-ivory-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`inline-block h-1 w-1 rounded-full ${
                          isCurrent ? 'bg-brass-400' : 'bg-transparent'
                        }`}
                      />
                      {version.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[0.55rem] uppercase tracking-[0.16em] text-brass-500">
                        Viewing
                      </span>
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="review-version-list"
        className="flex items-center gap-2 border border-ink-600 bg-ink-950/90 px-3 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-ivory-400 shadow-[0_12px_28px_-14px_rgba(0,0,0,0.95)] backdrop-blur-sm transition-colors hover:border-brass-700 hover:text-ivory-200"
      >
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full bg-brass-500"
        />
        <span className="text-ivory-500">Review</span>
        <span className="text-brass-400">{current?.label ?? '—'}</span>
        <span className="sr-only">
          — design version switcher. Currently viewing {current?.description ?? 'this build'}.
          Opens a list of other design versions.
        </span>
      </button>
    </div>
  )
}

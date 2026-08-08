'use client'

import type { Destination } from '@/content/schema'
import { platformById } from '@/content'
import { track } from '@/lib/analytics'

/**
 * External listening / purchase destinations.
 *
 * Two states, and the difference matters: an `available` destination is a real
 * link; a `pending` one renders as an inert chip. Seeded content is entirely
 * pending, so the site never implies platform availability that does not
 * exist. There is no on-site checkout anywhere by design.
 */
export function PlatformChips({
  destinations,
  workType,
  slug,
}: {
  destinations: Destination[]
  workType: 'story' | 'music'
  slug: string
}) {
  if (destinations.length === 0) return null

  const anyAvailable = destinations.some((d) => d.status === 'available')

  return (
    <div>
      <ul className="flex flex-wrap gap-2.5">
        {destinations.map((destination) => {
          const platform = platformById.get(destination.platform)
          const label = platform?.short ?? destination.platform

          if (destination.status === 'available' && destination.url) {
            return (
              <li key={destination.platform}>
                <a
                  href={destination.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track({
                      name: 'destination_click',
                      workType,
                      slug,
                      platform: destination.platform,
                    })
                  }
                  className="group inline-flex items-center gap-1.5 border border-brass-700/70 px-4 py-2 text-[0.72rem] uppercase tracking-[0.14em] text-brass-300 transition-colors hover:border-brass-400 hover:bg-brass-600/10 hover:text-brass-200"
                >
                  {label}
                  <span aria-hidden="true" className="text-[0.65em] opacity-70">
                    ↗
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            )
          }

          return (
            <li key={destination.platform}>
              <span
                className="inline-flex cursor-default items-center gap-2 border border-dashed border-ink-500 px-4 py-2 text-[0.72rem] uppercase tracking-[0.14em] text-ivory-500"
                title={destination.note ?? 'Not yet available on this platform'}
              >
                {label}
                <span className="text-[0.6rem] normal-case tracking-normal text-ivory-500/70">
                  pending
                </span>
              </span>
            </li>
          )
        })}
      </ul>

      {!anyAvailable && (
        <p className="mt-4 text-xs leading-relaxed text-ivory-500">
          Distribution destinations have not been announced. Listening and purchasing will
          happen on external platforms.
        </p>
      )}
    </div>
  )
}

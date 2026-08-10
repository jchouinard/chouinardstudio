'use client'

import type { Destination } from '@/content/schema'
import { platformById } from '@/content'
import { track } from '@/lib/analytics'

/**
 * External listening / purchase destinations — Design V2.
 *
 * V1 rendered unavailable destinations as dashed boxes each stamped
 * "pending", which read as broken UI repeated four times. V2 keeps the same
 * factual position and states it once, in prose: the platforms are named as
 * candidates, and the sentence underneath makes clear nothing is confirmed or
 * available.
 *
 * Real destinations still render as real links. There is no on-site checkout
 * anywhere, by design.
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

  const available = destinations.filter((d) => d.status === 'available' && d.url)
  const pending = destinations.filter((d) => d.status !== 'available' || !d.url)

  const nameFor = (destination: Destination) =>
    platformById.get(destination.platform)?.short ?? destination.platform

  return (
    <div className="space-y-5">
      {available.length > 0 && (
        <ul className="flex flex-wrap gap-2.5">
          {available.map((destination) => (
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
                className="inline-flex items-center gap-1.5 border border-brass-700/70 px-4 py-2 text-[0.72rem] uppercase tracking-[0.14em] text-brass-300 transition-colors hover:border-brass-400 hover:bg-brass-600/10 hover:text-brass-200"
              >
                {nameFor(destination)}
                <span aria-hidden="true" className="text-[0.65em] opacity-70">
                  ↗
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {pending.length > 0 && (
        <div className="max-w-xl">
          <p className="text-sm leading-relaxed text-ivory-400">
            {pending.map((destination, index) => (
              <span key={destination.platform}>
                {index > 0 && <span className="px-2 text-ivory-500">·</span>}
                <span className="text-ivory-500">{nameFor(destination)}</span>
              </span>
            ))}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-ivory-500">
            {available.length > 0
              ? 'Not yet available on these platforms. '
              : 'Not yet available anywhere. '}
            Distribution has not been confirmed — listening and purchasing will happen on
            external platforms rather than on this site.
          </p>
        </div>
      )}
    </div>
  )
}

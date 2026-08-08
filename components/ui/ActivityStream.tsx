import Link from 'next/link'

import { OriginBadge } from '@/components/ui/Badge'
import type { ActivityItem } from '@/lib/activity'
import { formatDay } from '@/lib/format'

/**
 * The "latest from the studio" surface.
 *
 * Reads entirely from the derived activity stream, so publishing one record
 * updates the homepage, Current Work and anywhere else this appears — no
 * duplicate entry, and no hand-maintained "what's new" list to fall stale.
 */
export function ActivityStream({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <p className="border border-ink-700 bg-ink-850/40 px-6 py-8 text-sm text-ivory-400">
        Nothing published yet.
      </p>
    )
  }

  return (
    <ol className="border-t border-ink-700">
      {items.map((item) => (
        <li key={item.id} className="border-b border-ink-700">
          <Link
            href={item.href}
            className="group grid gap-3 py-6 transition-colors duration-300 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:py-7"
          >
            <div className="flex items-start gap-3 sm:flex-col sm:gap-2">
              <time
                dateTime={item.date}
                className="text-[0.7rem] uppercase tracking-[0.14em] text-ivory-500"
              >
                {formatDay(item.date)}
              </time>
              <span className="text-[0.65rem] uppercase tracking-[0.16em] text-brass-500">
                {item.kicker}
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl leading-snug text-ivory-100 transition-colors group-hover:text-brass-300">
                  {item.title}
                </h3>
                <OriginBadge origin={item.origin} />
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ivory-400">
                {item.summary}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  )
}

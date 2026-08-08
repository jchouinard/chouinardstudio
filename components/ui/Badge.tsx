import type { Origin, PublishState } from '@/content/schema'

/**
 * Honesty marking — V2.
 *
 * V1 was truthful but visually loud: a full-width preview banner, bordered
 * EXAMPLE badges stamped over every cover, and repeated notices. The site read
 * as provisional.
 *
 * V2 keeps every claim exactly as honest and makes the signal quieter and
 * better integrated: representative content is labelled inline in the
 * metadata line where a reader is already looking for facts, rather than
 * shouted over the artwork. Nothing is hidden, softened in wording, or made
 * conditional — and no destination ever claims availability it lacks.
 */

const stateLabels: Record<PublishState, string> = {
  published: 'Available',
  'coming-soon': 'Coming soon',
  'in-progress': 'In production',
  archived: 'Archived',
}

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: 'neutral' | 'brass' | 'oxblood'
}) {
  const tones = {
    neutral: 'border-ink-500 text-ivory-400',
    brass: 'border-brass-700 text-brass-400',
    oxblood: 'border-oxblood-700 text-burgundy-400',
  }

  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.16em] ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

/** Publication state, rendered as plain metadata rather than a chip. */
export function StateBadge({ state }: { state: PublishState }) {
  const isLive = state === 'published'
  return (
    <span className={`meta ${isLive ? 'text-brass-400' : 'text-ivory-500'}`}>
      {stateLabels[state]}
    </span>
  )
}

/**
 * Marks representative content.
 *
 * A brass dot plus a single word, sitting in the metadata line. Quiet, but
 * present on every example record and impossible to mistake for a claim of
 * real availability.
 */
export function OriginBadge({ origin }: { origin: Origin }) {
  if (origin === 'real') return null

  return (
    <span className="meta inline-flex items-center gap-1.5 text-ivory-500">
      <span className="inline-block h-1 w-1 rounded-full bg-burgundy-400" aria-hidden="true" />
      Representative
      <span className="sr-only">
        — this is an example entry, not an actual Chouinard Studios release
      </span>
    </span>
  )
}

/**
 * The full statement, for detail pages where a visitor is deciding whether a
 * work actually exists. Quieter than V1's boxed callout, equally explicit.
 */
export function OriginNote({
  origin,
  kind = 'release',
}: {
  origin: Origin
  kind?: 'release' | 'recording' | 'note'
}) {
  if (origin === 'real') return null

  const subject = {
    release: 'an actual Chouinard Studios release',
    recording: 'an actual Chouinard Studios recording',
    note: 'an actual studio note',
  }[kind]

  return (
    <p className="max-w-xl border-l border-brass-700/60 pl-4 text-xs leading-relaxed text-ivory-500">
      A representative entry used while the first productions are completed — not {subject}.
    </p>
  )
}

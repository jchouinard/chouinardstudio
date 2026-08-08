import type { Origin, PublishState } from '@/content/schema'

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

export function StateBadge({ state }: { state: PublishState }) {
  return (
    <Badge tone={state === 'published' ? 'brass' : 'neutral'}>{stateLabels[state]}</Badge>
  )
}

/**
 * Marks representative content. This is the mechanism that keeps a seeded site
 * from reading as a catalog of real releases.
 */
export function OriginBadge({ origin }: { origin: Origin }) {
  if (origin === 'real') return null
  return <Badge tone="oxblood">Example</Badge>
}

import type { Metadata } from 'next'

import { MusicCard } from '@/components/ui/Cards'
import { PageHeader, Section } from '@/components/ui/Section'
import { byFeature, music, visible } from '@/content'

export const metadata: Metadata = {
  title: 'Music',
  description:
    'Original music from Chouinard Studios — finished pieces, recording sessions and work in progress.',
}

const groups = [
  {
    key: 'current',
    heading: 'Current',
    intro: 'What the studio is working on right now, finished or otherwise.',
    match: (kind: string) => kind === 'work-in-progress' || kind === 'session',
  },
  {
    key: 'works',
    heading: 'Tracks & releases',
    intro: 'Pieces that have settled into their final shape.',
    match: (kind: string) => kind === 'track' || kind === 'release',
  },
] as const

export default function MusicPage() {
  const catalog = byFeature(visible(music))

  return (
    <>
      <PageHeader
        eyebrow="Original music"
        title="The flagship of the studio"
        intro="Music is the creative heart of Chouinard Studios. It is allowed to grow at its own pace — which means what you find here includes unfinished work, single-take sessions, and pieces still being argued with."
      />

      {groups.map((group, index) => {
        const items = catalog.filter((item) => group.match(item.kind))
        if (items.length === 0) return null

        const isAlternate = index % 2 === 1

        const body = (
          <>
            <div className="mb-12 max-w-2xl">
              <h2 className="display-md">{group.heading}</h2>
              <p className="lede mt-5">{group.intro}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <MusicCard key={item.slug} item={item} />
              ))}
            </div>
          </>
        )

        return isAlternate ? (
          <section key={group.key} className="border-y border-ink-700 bg-ink-950">
            <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">{body}</div>
          </section>
        ) : (
          <Section key={group.key}>{body}</Section>
        )
      })}

      <Section>
        <div className="border border-ink-700 bg-ink-850/40 px-8 py-10 text-center">
          <p className="eyebrow">Listening elsewhere</p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ivory-400">
            Streaming and download destinations will appear on each piece as releases are
            distributed. Chouinard Studios keeps its own presence here and links out rather
            than recreating those platforms.
          </p>
        </div>
      </Section>
    </>
  )
}

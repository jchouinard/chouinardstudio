import type { Metadata } from 'next'

import { MusicRow } from '@/components/ui/Cards'
import { Waveform } from '@/components/home/Waveform'
import { FloorPlane, SlatWall } from '@/components/environment/Room'
import { Section } from '@/components/ui/Section'
import { byFeature, music, visible } from '@/content'

export const metadata: Metadata = {
  title: 'Music',
  description:
    'Original music from Chouinard Studios — finished pieces, recording sessions and work in progress.',
}

/**
 * Music — Design V2.
 *
 * V1 reused the story card grid, which made the flagship medium look like a
 * second catalog. V2 gives it a sonic form: an anchored waveform header and
 * rows that each carry their own deterministic waveform signature. Restrained
 * and premium — deliberately not an imitation of a streaming service.
 */

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
      <header className="room-shade relative isolate overflow-hidden border-b border-ink-700">
        <SlatWall intensity="subtle" />
        <div
          className="light-pool light-pool--practical h-[22rem] w-[22rem]"
          style={{ left: '10%', top: '-4rem' }}
          aria-hidden="true"
        />
        <div
          className="light-pool light-pool--oxblood h-[26rem] w-[26rem] opacity-60"
          style={{ right: '-6rem', top: '-8rem' }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-0 pt-24 sm:pt-28">
          <p className="eyebrow">Original music</p>
          <h1 className="display-hero mt-6 max-w-4xl">
            The flagship
            <span className="block text-brass-300">of the studio.</span>
          </h1>
          <p className="lede mt-8 max-w-2xl">
            Music is the creative heart of Chouinard Studios, allowed to grow at its own pace.
            Which means unfinished work, single-take sessions, and pieces still being argued
            with sit here alongside the finished ones.
          </p>

          <div className="mt-14 -mx-6">
            <Waveform variant="anchor" seed="music-index" bars={80} />
          </div>
        </div>

        <FloorPlane height="h-20" />
      </header>

      {groups.map((group) => {
        const items = catalog.filter((item) => group.match(item.kind))
        if (items.length === 0) return null

        return (
          <Section key={group.key} py="py-20">
            <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
              <div>
                <h2 className="display-md">{group.heading}</h2>
                <p className="mt-5 text-sm leading-relaxed text-ivory-400">{group.intro}</p>
                <p className="meta mt-6">
                  {items.length} {items.length === 1 ? 'piece' : 'pieces'}
                </p>
              </div>

              <div className="border-t border-ink-700">
                {items.map((item, index) => (
                  <MusicRow key={item.slug} item={item} index={index} />
                ))}
              </div>
            </div>
          </Section>
        )
      })}

      <section className="border-t border-ink-700 bg-ink-950">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="eyebrow-muted">Listening elsewhere</p>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ivory-400">
            Streaming and download destinations appear on each piece as releases are
            distributed. Chouinard Studios keeps its own presence here and links out rather
            than recreating those platforms.
          </p>
          <div className="mt-12 opacity-50">
            <Waveform variant="rule" seed="music-close" />
          </div>
        </div>
      </section>
    </>
  )
}

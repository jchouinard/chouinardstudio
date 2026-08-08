import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Artwork } from '@/components/media/Artwork'
import { Embed } from '@/components/media/Embed'
import { PreviewPlayer } from '@/components/media/PreviewPlayer'
import { OriginBadge, StateBadge } from '@/components/ui/Badge'
import { MusicCard } from '@/components/ui/Cards'
import { PlatformChips } from '@/components/ui/PlatformChips'
import { Section } from '@/components/ui/Section'
import { byNewest, getMusic, music, visible } from '@/content'
import { formatDuration, formatMonth } from '@/lib/format'
import { site } from '@/content/site'

type Params = { slug: string }

const kindLabels: Record<string, string> = {
  track: 'Track',
  release: 'Release',
  'work-in-progress': 'Work in progress',
  session: 'Session',
}

export function generateStaticParams(): Params[] {
  return visible(music).map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getMusic(slug)
  if (!item) return {}

  return {
    title: item.title,
    description: item.context[0] ?? `Original music from ${site.name}.`,
  }
}

export default async function MusicItemPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const item = getMusic(slug)
  if (!item || item.state === 'archived') notFound()

  const more = byNewest(visible(music).filter((other) => other.slug !== item.slug)).slice(0, 3)

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-ink-700 bg-ink-950">
          <div
            className="light-pool light-pool--brass h-[30rem] w-[30rem] opacity-55"
            style={{ left: '-10rem', top: '-12rem' }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <nav aria-label="Breadcrumb" className="mb-10">
              <Link
                href="/music"
                className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory-500 transition-colors hover:text-brass-400"
              >
                ← All music
              </Link>
            </nav>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
              <Artwork
                media={item.artwork}
                seed={`music-${item.slug}`}
                title={item.title}
                ratio="square"
                sizes="(min-width: 1024px) 20rem, 100vw"
                priority
                className="border border-ink-700"
              />

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[0.68rem] uppercase tracking-[0.16em] text-brass-500">
                    {kindLabels[item.kind]}
                  </span>
                  <StateBadge state={item.state} />
                  <OriginBadge origin={item.origin} />
                </div>

                <h1 className="display-lg mt-6">{item.title}</h1>

                <p className="mt-4 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.14em] text-ivory-500">
                  <span>{formatMonth(item.date)}</span>
                  {item.durationSeconds && <span>{formatDuration(item.durationSeconds)}</span>}
                </p>

                <div className="prose-warm mt-8 max-w-2xl text-[1.0625rem]">
                  {item.context.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-9 max-w-xl space-y-6">
                  {item.embed ? (
                    <Embed embed={item.embed} />
                  ) : (
                    <PreviewPlayer
                      preview={item.preview}
                      workType="music"
                      slug={item.slug}
                      title={item.title}
                    />
                  )}
                </div>

                <div className="mt-9 max-w-2xl">
                  <h2 className="eyebrow">Where to listen</h2>
                  <div className="mt-4">
                    <PlatformChips
                      destinations={item.destinations}
                      workType="music"
                      slug={item.slug}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {item.instruments.length > 0 && (
          <Section>
            <h2 className="eyebrow">On this recording</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {item.instruments.map((instrument) => (
                <li
                  key={instrument}
                  className="border border-ink-600 px-4 py-2 text-sm text-ivory-300"
                >
                  {instrument}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </article>

      {more.length > 0 && (
        <section className="border-t border-ink-700 bg-ink-950">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <h2 className="display-md mb-10">More music</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((other) => (
                <MusicCard key={other.slug} item={other} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

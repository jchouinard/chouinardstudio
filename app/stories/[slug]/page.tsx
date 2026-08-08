import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Artwork } from '@/components/media/Artwork'
import { PreviewPlayer } from '@/components/media/PreviewPlayer'
import { OriginBadge, StateBadge } from '@/components/ui/Badge'
import { StoryCard } from '@/components/ui/Cards'
import { PlatformChips } from '@/components/ui/PlatformChips'
import { Section } from '@/components/ui/Section'
import { collectionsForStory, getStory, relatedStories, stories, visible } from '@/content'
import { formatRuntime } from '@/lib/format'
import { site } from '@/content/site'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return visible(stories).map((story) => ({ slug: story.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const story = getStory(slug)
  if (!story) return {}

  return {
    title: story.title,
    description: story.tagline,
    openGraph: {
      title: `${story.title} — ${site.name}`,
      description: story.tagline,
      type: 'book',
    },
  }
}

export default async function StoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const story = getStory(slug)
  if (!story || story.state === 'archived') notFound()

  const inCollections = collectionsForStory(story)
  const related = relatedStories(story)

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-ink-700 bg-ink-950">
          <div
            className="light-pool light-pool--oxblood h-[30rem] w-[30rem] opacity-60"
            style={{ right: '-8rem', top: '-14rem' }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <nav aria-label="Breadcrumb" className="mb-10">
              <Link
                href="/stories"
                className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory-500 transition-colors hover:text-brass-400"
              >
                ← All stories
              </Link>
            </nav>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
              <Artwork
                media={story.artwork}
                seed={story.slug}
                title={story.title}
                subtitle={story.author}
                ratio="square"
                sizes="(min-width: 1024px) 22rem, 100vw"
                priority
                className="border border-ink-700"
              />

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <StateBadge state={story.state} />
                  <OriginBadge origin={story.origin} />
                  {story.runtimeMinutes && (
                    <span className="text-[0.68rem] uppercase tracking-[0.14em] text-ivory-500">
                      {formatRuntime(story.runtimeMinutes)}
                    </span>
                  )}
                </div>

                <h1 className="display-lg mt-6">{story.title}</h1>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-ivory-400">
                  {story.author}
                </p>

                <p className="lede mt-7 max-w-2xl">{story.tagline}</p>

                {story.origin === 'example' && (
                  <p className="mt-6 max-w-2xl border-l-2 border-oxblood-700 bg-ink-850/60 px-5 py-3 text-xs leading-relaxed text-ivory-400">
                    Representative catalog entry. This is not an actual {site.name} release —
                    it stands in while the first productions are completed.
                  </p>
                )}

                <div className="mt-9 max-w-xl">
                  <PreviewPlayer
                    preview={story.preview}
                    workType="story"
                    slug={story.slug}
                    title={story.title}
                  />
                </div>

                <div className="mt-9 max-w-2xl">
                  <h2 className="eyebrow">Where to listen</h2>
                  <div className="mt-4">
                    <PlatformChips
                      destinations={story.destinations}
                      workType="story"
                      slug={story.slug}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <Section>
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div>
              <h2 className="eyebrow">About this story</h2>
              <div className="prose-warm mt-6 max-w-2xl text-[1.0625rem]">
                {story.synopsis.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="space-y-8">
              {story.themes.length > 0 && (
                <div>
                  <h2 className="eyebrow">Themes</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {story.themes.map((theme) => (
                      <li
                        key={theme}
                        className="border border-ink-600 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-ivory-400"
                      >
                        {theme}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {story.audienceNote && (
                <div>
                  <h2 className="eyebrow">Who it is for</h2>
                  <p className="mt-4 text-sm leading-relaxed text-ivory-300">
                    {story.audienceNote}
                  </p>
                </div>
              )}

              {story.credits.length > 0 && (
                <div>
                  <h2 className="eyebrow">Credits</h2>
                  <dl className="mt-4 space-y-3">
                    {story.credits.map((credit) => (
                      <div key={`${credit.role}-${credit.name}`}>
                        <dt className="text-[0.65rem] uppercase tracking-[0.14em] text-ivory-500">
                          {credit.role}
                        </dt>
                        <dd className="text-sm text-ivory-200">{credit.name}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {inCollections.length > 0 && (
                <div>
                  <h2 className="eyebrow">Collections</h2>
                  <ul className="mt-4 space-y-2">
                    {inCollections.map((collection) => (
                      <li key={collection.slug}>
                        <Link
                          href={`/stories/collections/${collection.slug}`}
                          className="text-sm text-brass-400 underline-offset-4 transition-colors hover:text-brass-300 hover:underline"
                        >
                          {collection.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {story.sourceNote && (
                <div>
                  <h2 className="eyebrow">Source</h2>
                  <p className="mt-4 text-sm leading-relaxed text-ivory-400">
                    {story.sourceNote}
                  </p>
                </div>
              )}
            </aside>
          </div>
        </Section>
      </article>

      {related.length > 0 && (
        <section className="border-t border-ink-700 bg-ink-950">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <h2 className="display-md mb-10">More from the catalog</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <StoryCard key={item.slug} story={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

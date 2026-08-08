import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { StoryCard } from '@/components/ui/Cards'
import { OriginBadge } from '@/components/ui/Badge'
import { Section } from '@/components/ui/Section'
import { collections, getCollection, storiesInCollection, visible } from '@/content'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return visible(collections).map((collection) => ({ slug: collection.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const collection = getCollection(slug)
  if (!collection) return {}

  return { title: collection.title, description: collection.tagline }
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const collection = getCollection(slug)
  if (!collection || collection.state === 'archived') notFound()

  const titles = storiesInCollection(collection.slug)

  return (
    <>
      <header className="relative overflow-hidden border-b border-ink-700">
        <div
          className="light-pool light-pool--brass h-[28rem] w-[34rem] opacity-50"
          style={{ right: '-10rem', top: '-16rem' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pb-20 sm:pt-20">
          <nav aria-label="Breadcrumb" className="mb-10">
            <Link
              href="/stories"
              className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory-500 transition-colors hover:text-brass-400"
            >
              ← All stories
            </Link>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">Collection</p>
            <OriginBadge origin={collection.origin} />
          </div>

          <h1 className="display-lg mt-5 max-w-3xl">{collection.title}</h1>
          <p className="lede mt-6 max-w-2xl">{collection.tagline}</p>

          <div className="prose-warm mt-6 max-w-2xl text-[0.95rem]">
            {collection.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </header>

      <Section>
        {titles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {titles.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        ) : (
          <p className="border border-ink-700 bg-ink-850/40 px-6 py-8 text-sm text-ivory-400">
            Titles for this collection have not been announced yet.
          </p>
        )}
      </Section>
    </>
  )
}

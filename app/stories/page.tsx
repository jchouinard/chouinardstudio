import type { Metadata } from 'next'

import { CollectionCard, StoryCard } from '@/components/ui/Cards'
import { PageHeader, Section } from '@/components/ui/Section'
import { byFeature, collections, stories, storiesInCollection, visible } from '@/content'

export const metadata: Metadata = {
  title: 'Stories',
  description:
    'The Chouinard Studios audiobook and storytelling catalog — warm, timeless, character-driven work, produced with care.',
}

export default function StoriesPage() {
  const catalog = byFeature(visible(stories))
  const groupings = byFeature(visible(collections))

  return (
    <>
      <PageHeader
        eyebrow="Audiobooks & storytelling"
        title="A catalog built to last, not to trend"
        intro="Chouinard Studios develops and publishes its own audiobooks. The selection favours work that is warm, humane and strong enough to reward a second listen."
      />

      <Section>
        <div className="mb-12 max-w-2xl">
          <h2 className="display-md">Collections</h2>
          <p className="lede mt-5">
            Groupings are editorial, not fixed. Titles move between them as the catalog grows.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groupings.map((collection) => (
            <CollectionCard
              key={collection.slug}
              collection={collection}
              count={storiesInCollection(collection.slug).length}
            />
          ))}
        </div>
      </Section>

      <section className="border-t border-ink-700 bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="display-md">All titles</h2>
              <p className="lede mt-5">
                {catalog.length} {catalog.length === 1 ? 'title' : 'titles'} in the catalog.
              </p>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-ivory-500">
              Listening and purchasing happen on external platforms. Chouinard Studios does not
              sell audiobooks directly.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

import Link from 'next/link'

import { Hero } from '@/components/home/Hero'
import { ActivityStream } from '@/components/ui/ActivityStream'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { CollectionCard, CuratedCard, MusicCard, NoteCard, StoryCard } from '@/components/ui/Cards'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Artwork } from '@/components/media/Artwork'
import { OriginBadge, StateBadge } from '@/components/ui/Badge'
import {
  byFeature,
  collections,
  curated,
  music,
  storiesInCollection,
  stories,
  studioNotes,
  visible,
} from '@/content'
import { studioActivity } from '@/lib/activity'
import { formatRuntime } from '@/lib/format'

/**
 * Homepage narrative, following the flow in IMPLEMENTATION-PACKAGE-V1.md:
 * hero → current activity → featured story → latest music → studio craft →
 * activity stream → restrained curated layer → closing paths.
 *
 * Every section reads from the shared content layer, so publishing one record
 * refreshes this page without anyone editing it.
 */
export default function HomePage() {
  const featuredStory = byFeature(visible(stories))[0]
  const otherStories = byFeature(visible(stories))
    .filter((story) => story.slug !== featuredStory?.slug)
    .slice(0, 3)
  const featuredCollections = byFeature(visible(collections)).slice(0, 2)
  const latestMusic = byFeature(visible(music)).slice(0, 3)
  const notes = byFeature(visible(studioNotes)).slice(0, 2)
  const recent = studioActivity(6)
  const curatedItems = byFeature(visible(curated)).slice(0, 3)

  return (
    <>
      <Hero />

      {/* 2 — Latest / current activity */}
      <Section>
        <SectionHeading
          eyebrow="Currently"
          title="What is happening in the studio"
          intro="Work in progress, recent recordings and productions moving toward release."
          link={{ href: '/current-work', label: 'All current work' }}
        />
        <ActivityStream items={recent.slice(0, 3)} />
      </Section>

      {/* 3 — Featured audiobook / story */}
      {featuredStory && (
        <section className="relative overflow-hidden border-y border-ink-700 bg-ink-950">
          <div
            className="light-pool light-pool--oxblood h-[28rem] w-[28rem] opacity-70"
            style={{ right: '-6rem', top: '-10rem' }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
              <Link href={`/stories/${featuredStory.slug}`} className="group block">
                <Artwork
                  media={featuredStory.artwork}
                  seed={featuredStory.slug}
                  title={featuredStory.title}
                  subtitle={featuredStory.author}
                  ratio="square"
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  priority
                  className="border border-ink-700 transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </Link>

              <div>
                <p className="eyebrow">Featured story</p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <StateBadge state={featuredStory.state} />
                  <OriginBadge origin={featuredStory.origin} />
                  {featuredStory.runtimeMinutes && (
                    <span className="text-[0.68rem] uppercase tracking-[0.14em] text-ivory-500">
                      {formatRuntime(featuredStory.runtimeMinutes)}
                    </span>
                  )}
                </div>

                <h2 className="display-md mt-5">{featuredStory.title}</h2>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-ivory-500">
                  {featuredStory.author}
                </p>

                <p className="lede mt-6 max-w-xl">{featuredStory.tagline}</p>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory-400">
                  {featuredStory.synopsis[0]}
                </p>

                <div className="mt-9 flex flex-wrap gap-4">
                  <ButtonLink href={`/stories/${featuredStory.slug}`}>View this title</ButtonLink>
                  <ButtonLink href="/stories" variant="ghost">
                    The full catalog
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Catalog taster */}
      <Section>
        <SectionHeading
          eyebrow="Stories"
          title="From the catalog"
          intro="A publishing imprint built around work that is warm, timeless and worth returning to."
          link={{ href: '/stories', label: 'All stories' }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherStories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>

        {featuredCollections.length > 0 && (
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {featuredCollections.map((collection) => (
              <CollectionCard
                key={collection.slug}
                collection={collection}
                count={storiesInCollection(collection.slug).length}
              />
            ))}
          </div>
        )}
      </Section>

      {/* 4 — Latest music */}
      <section className="relative overflow-hidden border-y border-ink-700 bg-ink-950">
        <div
          className="light-pool light-pool--brass h-[26rem] w-[36rem] opacity-60"
          style={{ left: '-8rem', bottom: '-14rem' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Music"
            title="Latest from the bench"
            intro="Original music is the flagship of the studio. Finished pieces, sessions, and things still being argued with."
            link={{ href: '/music', label: 'All music' }}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestMusic.map((item) => (
              <MusicCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Inside the studio / craft */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="walnut-panel relative flex min-h-[22rem] items-end overflow-hidden border border-ink-700 p-8">
            <div
              className="light-pool light-pool--brass h-64 w-64"
              style={{ right: '-4rem', top: '-6rem' }}
              aria-hidden="true"
            />
            <div className="relative">
              <p className="eyebrow">The room</p>
              <p className="mt-4 max-w-sm font-display text-2xl leading-snug text-ivory-100">
                Modern production capability inside a timeless, handcrafted environment.
              </p>
              <p className="mt-4 max-w-sm text-xs leading-relaxed text-ivory-400">
                The studio is being built toward this. Photography of the finished room will
                replace this panel as the space develops.
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Craft"
              title="How the work gets made"
              intro="Decisions that never appear in the finished recording and determine all of it."
              link={{ href: '/studio', label: 'Inside the studio' }}
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {notes.map((note) => (
                <NoteCard key={note.slug} note={note} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 6 — Latest from the studio */}
      <section className="border-y border-ink-700 bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Studio log"
            title="Latest from the studio"
            link={{ href: '/current-work', label: 'Everything current' }}
          />
          <ActivityStream items={recent} />
        </div>
      </section>

      {/* 7 — Restrained curated layer */}
      <Section>
        <SectionHeading
          eyebrow="Listening room"
          title="What we are paying attention to"
          intro="A small amount of other people's work that shapes how we make ours."
          link={{ href: '/listening-room', label: 'The listening room' }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {curatedItems.map((item) => (
            <CuratedCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>

      {/* 8 — Closing paths */}
      <section className="relative overflow-hidden border-t border-ink-700 bg-ink-950">
        <div className="textile absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="light-pool light-pool--oxblood h-[30rem] w-[30rem] opacity-60"
          style={{ left: '38%', bottom: '-16rem' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <p className="eyebrow">Where to go next</p>
          <h2 className="display-md mt-5">
            Listen to something, or tell us what you have in mind.
          </h2>
          <p className="lede mt-6">
            Full listening and purchasing happen on external platforms. Collaborations,
            licensing and press start with an email.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/stories">Browse stories</ButtonLink>
            <ButtonLink href="/music" variant="ghost">
              Listen to music
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Make an inquiry
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}

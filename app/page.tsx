import Link from 'next/link'

import { Hero } from '@/components/home/Hero'
import { Waveform } from '@/components/home/Waveform'
import { AcousticClouds, FloorPlane, MaterialStrip, SlatWall } from '@/components/environment/Room'
import { ActivityStream } from '@/components/ui/ActivityStream'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { CollectionCard, CuratedRow, MusicRow, NoteCard, StoryCard } from '@/components/ui/Cards'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Artwork } from '@/components/media/Artwork'
import { OriginBadge, StateBadge } from '@/components/ui/Badge'
import {
  byFeature,
  collections,
  curated,
  music,
  projects,
  storiesInCollection,
  stories,
  studioNotes,
  visible,
} from '@/content'
import { studioActivity } from '@/lib/activity'
import { formatRuntime } from '@/lib/format'

/**
 * Homepage — Design V2.
 *
 * V1 assembled seven near-identical sections of heading + copy + three-card
 * grid. V2 composes instead: a room-anchored hero, a dense "Now" rail, an
 * immersive music band, one large story anchor, a shelf of collections, a
 * full-bleed studio room, one activity log, and a quiet curated list.
 *
 * Two V1 sections — "What is happening in the studio" and "Latest from the
 * studio" — were doing the same job twice. They are now split by purpose:
 * "Now" is what is actively being made; "The log" is the dated record. Music
 * moves directly after the hero to express that it is the flagship identity.
 */
export default function HomePage() {
  const activeProjects = byFeature(visible(projects)).slice(0, 3)
  const latestMusic = byFeature(visible(music)).slice(0, 4)
  const featuredStory = byFeature(visible(stories))[0]
  const otherStories = byFeature(visible(stories))
    .filter((story) => story.slug !== featuredStory?.slug)
    .slice(0, 3)
  const featuredCollections = byFeature(visible(collections)).slice(0, 2)
  const notes = byFeature(visible(studioNotes)).slice(0, 3)
  const log = studioActivity(7)
  const curatedItems = byFeature(visible(curated)).slice(0, 3)

  return (
    <>
      <Hero />

      {/* ---- Now: what is actively being made ------------------------------ */}
      <Section py="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="eyebrow">Now</p>
            <p className="mt-4 text-sm leading-relaxed text-ivory-400">
              On the bench at the moment.
            </p>
            <Link
              href="/current-work"
              className="mt-5 inline-block border-b border-brass-700 pb-1 text-[0.72rem] uppercase tracking-[0.18em] text-brass-400 transition-colors hover:border-brass-400 hover:text-brass-300"
            >
              All current work
            </Link>
          </div>

          <ul className="grid gap-px bg-ink-700 sm:grid-cols-3">
            {activeProjects.map((project) => (
              <li key={project.slug} className="bg-ink-900 p-6">
                <span className="meta text-brass-500">{project.statusLabel}</span>
                <h3 className="mt-4 font-display text-xl leading-snug text-ivory-100">
                  <Link
                    href={`/current-work#${project.slug}`}
                    className="transition-colors hover:text-brass-300"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory-400">{project.summary}</p>
                <div className="mt-4">
                  <OriginBadge origin={project.origin} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- Music: the flagship, given the room --------------------------- */}
      <section className="room-shade relative overflow-hidden border-y border-ink-700 bg-ink-950">
        <SlatWall intensity="subtle" />
        <div
          className="light-pool light-pool--practical h-[24rem] w-[24rem]"
          style={{ left: '6%', top: '-6rem' }}
          aria-hidden="true"
        />
        <div
          className="light-pool light-pool--oxblood h-[26rem] w-[26rem] opacity-60"
          style={{ right: '-6rem', bottom: '-10rem' }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-32">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">Music — the flagship</p>
              <h2 className="display-lg mt-5">
                Everything here is made
                <span className="block text-brass-300">in the same room.</span>
              </h2>
              <p className="lede mt-6">
                Original music is the creative heart of the studio. Finished pieces,
                single-take sessions, and work still being argued with.
              </p>
            </div>
            <Link
              href="/music"
              className="shrink-0 border-b border-brass-700 pb-1 text-[0.72rem] uppercase tracking-[0.18em] text-brass-400 transition-colors hover:border-brass-400 hover:text-brass-300"
            >
              All music
            </Link>
          </div>

          <div className="mt-14 border-t border-ink-700">
            {latestMusic.map((item, index) => (
              <MusicRow key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>

        <FloorPlane height="h-24" />
      </section>

      {/* ---- Anchor moment: one story, at scale ---------------------------- */}
      {featuredStory && (
        <Section py="py-16 sm:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
            <Link href={`/stories/${featuredStory.slug}`} className="group block">
              <Artwork
                media={featuredStory.artwork}
                seed={featuredStory.slug}
                title={featuredStory.title}
                subtitle={featuredStory.author}
                ratio="portrait"
                texture="paper"
                sizes="(min-width: 1024px) 20rem, 70vw"
                priority
                className="border border-ink-700 shadow-[0_40px_80px_-40px_rgba(0,0,0,1)] transition-transform duration-700 group-hover:-translate-y-1.5"
              />
            </Link>

            <div>
              <p className="eyebrow">Featured story</p>
              <h2 className="display-lg mt-5">{featuredStory.title}</h2>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-ivory-400">
                {featuredStory.author}
              </p>

              <p className="lede mt-7 max-w-xl">{featuredStory.tagline}</p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory-400">
                {featuredStory.synopsis[0]}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
                <StateBadge state={featuredStory.state} />
                {featuredStory.runtimeMinutes && (
                  <span className="meta">{formatRuntime(featuredStory.runtimeMinutes)}</span>
                )}
                <OriginBadge origin={featuredStory.origin} />
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href={`/stories/${featuredStory.slug}`}>View this title</ButtonLink>
                <ButtonLink href="/stories" variant="ghost">
                  The full catalog
                </ButtonLink>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* ---- The catalog --------------------------------------------------- */}
      <section className="border-t border-ink-700 bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <SectionHeading
            eyebrow="Stories"
            title="A catalog built to last, not to trend"
            intro="A publishing imprint chosen for warmth, craft and staying power."
            link={{ href: '/stories', label: 'All stories' }}
          />

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
            {otherStories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>

          {featuredCollections.length > 0 && (
            <div className="mt-16 grid gap-6 lg:grid-cols-2">
              {featuredCollections.map((collection) => (
                <CollectionCard
                  key={collection.slug}
                  collection={collection}
                  count={storiesInCollection(collection.slug).length}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---- The room ------------------------------------------------------ */}
      <section className="room-shade relative overflow-hidden border-y border-ink-700">
        <SlatWall />
        <AcousticClouds />
        <div
          className="light-pool light-pool--practical h-80 w-80"
          style={{ left: '30%', top: '8%' }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-36">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
            <div>
              <p className="eyebrow">The room</p>
              <h2 className="display-lg mt-5 max-w-xl">
                Modern production capability inside a timeless, handcrafted environment.
              </h2>
              <p className="lede mt-7 max-w-lg">
                Walnut, brass, oxblood textile and black leather. Acoustic treatment built in
                as architecture rather than bolted on afterwards.
              </p>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-ivory-500">
                The physical studio is being built toward this. These are the materials and the
                intent — photography of the finished room will replace them as the space
                develops.
              </p>

              <MaterialStrip className="mt-10 max-w-lg" />

              <div className="mt-10">
                <ButtonLink href="/studio">Inside the studio</ButtonLink>
              </div>
            </div>

            <div className="space-y-8">
              <p className="eyebrow-muted">Studio notes</p>
              {notes.map((note, index) => (
                <NoteCard key={note.slug} note={note} index={index} />
              ))}
            </div>
          </div>
        </div>

        <FloorPlane height="h-40" />
      </section>

      {/* ---- The log: the dated record ------------------------------------- */}
      <Section py="py-16 sm:py-24">
        <SectionHeading
          eyebrow="The log"
          title="Everything, newest first"
          intro="Music, stories, projects and studio notes as they happen."
          link={{ href: '/current-work', label: 'Full log' }}
        />
        <ActivityStream items={log} />
      </Section>

      {/* ---- Listening room: quiet, secondary ------------------------------ */}
      <section className="border-t border-ink-700 bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="eyebrow-muted">Listening room</p>
              <p className="mt-4 text-sm leading-relaxed text-ivory-500">
                A small amount of other people&rsquo;s work that shapes how we make ours.
              </p>
              <Link
                href="/listening-room"
                className="mt-5 inline-block border-b border-ink-500 pb-1 text-[0.72rem] uppercase tracking-[0.18em] text-ivory-400 transition-colors hover:border-brass-600 hover:text-brass-400"
              >
                The listening room
              </Link>
            </div>

            <div className="border-t border-ink-800">
              {curatedItems.map((item) => (
                <CuratedRow key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Close --------------------------------------------------------- */}
      <section className="relative overflow-hidden border-t border-ink-700 bg-ink-950">
        <div className="textile absolute inset-0 opacity-30" aria-hidden="true" />
        <div
          className="light-pool light-pool--oxblood h-[30rem] w-[30rem] opacity-60"
          style={{ left: '36%', bottom: '-18rem' }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
          <h2 className="display-md">
            Listen to something, or tell us what you have in mind.
          </h2>
          <p className="lede mt-6">
            Full listening and purchasing happen on external platforms. Collaborations,
            licensing and press start with an email.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/music">Listen to music</ButtonLink>
            <ButtonLink href="/stories" variant="ghost">
              Browse stories
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Make an inquiry
            </ButtonLink>
          </div>

          <div className="mt-16 opacity-50">
            <Waveform variant="rule" seed="home-close" />
          </div>
        </div>
      </section>
    </>
  )
}

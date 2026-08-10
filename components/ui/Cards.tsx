import Link from 'next/link'

import { Artwork } from '@/components/media/Artwork'
import { Waveform } from '@/components/home/Waveform'
import { OriginBadge, StateBadge } from '@/components/ui/Badge'
import type { Collection, CuratedItem, MusicItem, Story, StudioNote } from '@/content/schema'
import { formatDuration, formatMonth, formatRuntime } from '@/lib/format'

/**
 * Content-type grammar — Design V2.
 *
 * V1 rendered stories, music, notes and curated links through nearly the same
 * card, so the homepage read as one repeated rhythm and the catalogs felt
 * interchangeable. V2 keeps them one visual family — same palette, same
 * typography, same restraint — while giving each type its own form:
 *
 *   Story      portrait cover, paper substrate, author and runtime — publishing
 *   Music      horizontal row with its own waveform signature — sonic
 *   Note       no artwork, numbered, rule-led — craft and process
 *   Curated    compact secondary line — exploratory, clearly subordinate
 *   Collection wide banner — a shelf rather than a single spine
 */

/* -------------------------------------------------------------------------- */
/* Stories — editorial / publishing                                            */
/* -------------------------------------------------------------------------- */

export function StoryCard({ story, priority = false }: { story: Story; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={`/stories/${story.slug}`} className="block">
        <Artwork
          media={story.artwork}
          seed={story.slug}
          title={story.title}
          subtitle={story.author}
          ratio="portrait"
          texture="paper"
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className="border border-ink-700 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.95)] transition-transform duration-700 ease-out group-hover:-translate-y-1"
        />

        <div className="mt-5">
          <h3 className="font-display text-xl leading-snug text-ivory-100 transition-colors group-hover:text-brass-300">
            {story.title}
          </h3>
          <p className="mt-1 text-[0.8rem] text-ivory-400">{story.author}</p>

          <p className="mt-3 text-sm leading-relaxed text-ivory-400">{story.tagline}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <StateBadge state={story.state} />
            {story.runtimeMinutes && (
              <span className="meta">{formatRuntime(story.runtimeMinutes)}</span>
            )}
            <OriginBadge origin={story.origin} />
          </div>
        </div>
      </Link>
    </article>
  )
}

export function CollectionCard({
  collection,
  count,
}: {
  collection: Collection
  count: number
}) {
  return (
    <article className="group relative overflow-hidden border border-ink-700 bg-ink-850/50 transition-colors duration-500 hover:border-brass-700/60">
      <Link href={`/stories/collections/${collection.slug}`} className="block">
        <div className="textile absolute inset-0 opacity-30" aria-hidden="true" />
        <div
          className="light-pool light-pool--practical h-52 w-52 opacity-60"
          style={{ right: '-3rem', top: '-4rem' }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:gap-8">
          {/* A row of spines standing for the shelf. */}
          <div className="flex h-24 shrink-0 items-end gap-1.5" aria-hidden="true">
            {Array.from({ length: Math.max(3, Math.min(count, 6)) }, (_, index) => (
              <span
                key={index}
                className="paper-grain w-3 rounded-[1px] border border-ink-600/70"
                style={{
                  height: `${62 + ((index * 37) % 38)}%`,
                  background: `linear-gradient(180deg, var(--color-walnut-${index % 2 === 0 ? '700' : '800'}), var(--color-ink-900))`,
                }}
              />
            ))}
          </div>

          <div className="min-w-0">
            <p className="eyebrow-muted">Collection</p>
            <h3 className="mt-2 font-display text-2xl text-ivory-100 transition-colors group-hover:text-brass-300">
              {collection.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-ivory-400">{collection.tagline}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span className="meta text-brass-500">
                {count} {count === 1 ? 'title' : 'titles'}
              </span>
              <OriginBadge origin={collection.origin} />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/* Music — sonic                                                               */
/* -------------------------------------------------------------------------- */

const musicKindLabel: Record<MusicItem['kind'], string> = {
  track: 'Track',
  release: 'Release',
  'work-in-progress': 'Work in progress',
  session: 'Session',
}

/**
 * A music row. Each carries its own deterministic waveform, so recordings are
 * visually distinguishable from one another the way sleeve art would do it —
 * and the flagship medium gets a form no other content type uses.
 */
export function MusicRow({ item, index }: { item: MusicItem; index: number }) {
  return (
    <article className="group border-b border-ink-700 last:border-0">
      <Link
        href={`/music/${item.slug}`}
        className="grid items-center gap-x-6 gap-y-3 py-7 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,14rem)_5rem]"
      >
        <span className="meta hidden text-ivory-500 sm:block">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-2xl leading-tight text-ivory-100 transition-colors group-hover:text-brass-300">
              {item.title}
            </h3>
            <span className="meta text-brass-500">{musicKindLabel[item.kind]}</span>
          </div>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ivory-400">
            {item.context[0]}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span className="meta">{formatMonth(item.date)}</span>
            <OriginBadge origin={item.origin} />
          </div>
        </div>

        {/* The sonic signature. */}
        <div className="opacity-60 transition-opacity duration-500 group-hover:opacity-100">
          <Waveform variant="strip" seed={`music-${item.slug}`} />
        </div>

        <span className="meta text-right text-ivory-400">
          {item.durationSeconds ? formatDuration(item.durationSeconds) : '—'}
        </span>
      </Link>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/* Studio notes — craft and process                                            */
/* -------------------------------------------------------------------------- */

export function NoteCard({ note, index }: { note: StudioNote; index?: number }) {
  return (
    <article className="group relative border-t border-ink-600 pt-6">
      <Link href={`/studio/notes/${note.slug}`} className="flex h-full flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <span className="meta text-brass-500">
            {typeof index === 'number' ? `No. ${String(index + 1).padStart(2, '0')}` : 'Note'}
          </span>
          <span className="meta">{formatMonth(note.date)}</span>
        </div>

        <h3 className="mt-5 font-display text-xl leading-snug text-ivory-100 transition-colors group-hover:text-brass-300">
          {note.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory-400">{note.summary}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {note.topics.map((topic) => (
            <span key={topic} className="meta text-[0.62rem]">
              {topic}
            </span>
          ))}
        </div>
      </Link>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/* Curated — secondary, exploratory                                            */
/* -------------------------------------------------------------------------- */

/**
 * Curated outside material sits below the studio's own work in the hierarchy
 * (CURATED-FRESHNESS.md), so V2 renders it as a quiet line rather than a card
 * with the same visual weight as a release.
 */
export function CuratedRow({ item }: { item: CuratedItem }) {
  return (
    <article className="group border-b border-ink-800 last:border-0">
      <a
        href={item.source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="grid gap-2 py-6 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8"
      >
        <span className="meta text-ivory-500">{item.category}</span>

        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-lg text-ivory-200 transition-colors group-hover:text-brass-300">
              {item.title}
            </h3>
            <span className="meta text-[0.62rem] text-ivory-500">
              {item.source.name}
              <span aria-hidden="true" className="ml-1.5">
                ↗
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ivory-400">{item.why}</p>
        </div>
      </a>
    </article>
  )
}

import Link from 'next/link'

import { Artwork } from '@/components/media/Artwork'
import { OriginBadge, StateBadge } from '@/components/ui/Badge'
import type { Collection, CuratedItem, MusicItem, Story, StudioNote } from '@/content/schema'
import { formatMonth, formatRuntime } from '@/lib/format'

const cardShell =
  'group relative flex flex-col border border-ink-700 bg-ink-850/50 transition-colors duration-500 hover:border-brass-700/60'

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className={cardShell}>
      <Link href={`/stories/${story.slug}`} className="flex h-full flex-col">
        <div className="relative overflow-hidden">
          <Artwork
            media={story.artwork}
            seed={story.slug}
            title={story.title}
            subtitle={story.author}
            ratio="square"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <OriginBadge origin={story.origin} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-2">
            <StateBadge state={story.state} />
            {story.runtimeMinutes && (
              <span className="text-[0.68rem] uppercase tracking-[0.14em] text-ivory-500">
                {formatRuntime(story.runtimeMinutes)}
              </span>
            )}
          </div>

          <h3 className="mt-4 font-display text-2xl leading-tight text-ivory-100 transition-colors group-hover:text-brass-300">
            {story.title}
          </h3>
          <p className="mt-1.5 text-xs uppercase tracking-[0.16em] text-ivory-500">
            {story.author}
          </p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory-400">{story.tagline}</p>

          <span className="mt-6 text-[0.7rem] uppercase tracking-[0.18em] text-brass-500 transition-colors group-hover:text-brass-300">
            View title
          </span>
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
    <article className={cardShell}>
      <Link href={`/stories/collections/${collection.slug}`} className="flex h-full flex-col">
        <div className="relative overflow-hidden">
          <Artwork
            media={collection.artwork}
            seed={`collection-${collection.slug}`}
            title={collection.title}
            subtitle={`${count} ${count === 1 ? 'title' : 'titles'}`}
            ratio="wide"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute left-3 top-3">
            <OriginBadge origin={collection.origin} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-2xl text-ivory-100 transition-colors group-hover:text-brass-300">
            {collection.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory-400">
            {collection.tagline}
          </p>
          <span className="mt-6 text-[0.7rem] uppercase tracking-[0.18em] text-brass-500">
            {count} {count === 1 ? 'title' : 'titles'}
          </span>
        </div>
      </Link>
    </article>
  )
}

export function MusicCard({ item }: { item: MusicItem }) {
  const kindLabel = {
    track: 'Track',
    release: 'Release',
    'work-in-progress': 'Work in progress',
    session: 'Session',
  }[item.kind]

  return (
    <article className={cardShell}>
      <Link href={`/music/${item.slug}`} className="flex h-full flex-col">
        <div className="relative overflow-hidden">
          <Artwork
            media={item.artwork}
            seed={`music-${item.slug}`}
            title={item.title}
            ratio="square"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute left-3 top-3">
            <OriginBadge origin={item.origin} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[0.68rem] uppercase tracking-[0.16em] text-brass-500">
              {kindLabel}
            </span>
            <span className="text-[0.68rem] text-ivory-500">{formatMonth(item.date)}</span>
          </div>

          <h3 className="mt-4 font-display text-2xl leading-tight text-ivory-100 transition-colors group-hover:text-brass-300">
            {item.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory-400">{item.context[0]}</p>
        </div>
      </Link>
    </article>
  )
}

export function NoteCard({ note }: { note: StudioNote }) {
  return (
    <article className={`${cardShell} p-6`}>
      <Link href={`/studio/notes/${note.slug}`} className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow">Studio note</span>
          <span className="text-[0.68rem] text-ivory-500">{formatMonth(note.date)}</span>
        </div>

        <h3 className="mt-5 font-display text-xl leading-snug text-ivory-100 transition-colors group-hover:text-brass-300">
          {note.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory-400">{note.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {note.topics.map((topic) => (
            <span key={topic} className="text-[0.65rem] uppercase tracking-[0.14em] text-ivory-500">
              {topic}
            </span>
          ))}
        </div>
      </Link>
    </article>
  )
}

export function CuratedCard({ item }: { item: CuratedItem }) {
  return (
    <article className="group flex flex-col border border-ink-700 bg-ink-850/40 p-6 transition-colors duration-500 hover:border-brass-700/50">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[0.65rem] uppercase tracking-[0.16em] text-brass-500">
          {item.category}
        </span>
        <OriginBadge origin={item.origin} />
      </div>

      <h3 className="mt-5 font-display text-xl leading-snug text-ivory-100">{item.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory-400">{item.why}</p>

      <a
        href={item.source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 self-start border-b border-brass-700/70 pb-0.5 text-[0.7rem] uppercase tracking-[0.16em] text-brass-400 transition-colors hover:border-brass-400 hover:text-brass-300"
      >
        {item.source.name}
        <span aria-hidden="true" className="text-[0.65em]">
          ↗
        </span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </article>
  )
}

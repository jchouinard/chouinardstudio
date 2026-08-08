import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { OriginBadge } from '@/components/ui/Badge'
import { NoteCard } from '@/components/ui/Cards'
import { byNewest, getStudioNote, studioNotes, visible } from '@/content'
import { formatDay } from '@/lib/format'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return visible(studioNotes).map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const note = getStudioNote(slug)
  if (!note) return {}

  return { title: note.title, description: note.summary }
}

export default async function StudioNotePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const note = getStudioNote(slug)
  if (!note || note.state === 'archived') notFound()

  const more = byNewest(visible(studioNotes).filter((other) => other.slug !== note.slug)).slice(
    0,
    3,
  )

  return (
    <>
      <article className="relative overflow-hidden">
        <div
          className="light-pool light-pool--walnut h-[26rem] w-[26rem] opacity-50"
          style={{ right: '-8rem', top: '-12rem' }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-10">
            <Link
              href="/studio"
              className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory-500 transition-colors hover:text-brass-400"
            >
              ← Inside the studio
            </Link>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">Studio note</p>
            <OriginBadge origin={note.origin} />
          </div>

          <h1 className="display-lg mt-5">{note.title}</h1>

          <time
            dateTime={note.date}
            className="mt-5 block text-xs uppercase tracking-[0.16em] text-ivory-500"
          >
            {formatDay(note.date)}
          </time>

          <hr className="hairline my-10" />

          <p className="lede">{note.summary}</p>

          <div className="prose-warm mt-8 text-[1.0625rem]">
            {note.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {note.topics.length > 0 && (
            <ul className="mt-12 flex flex-wrap gap-2">
              {note.topics.map((topic) => (
                <li
                  key={topic}
                  className="border border-ink-600 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-ivory-400"
                >
                  {topic}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>

      {more.length > 0 && (
        <section className="border-t border-ink-700 bg-ink-950">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <h2 className="display-md mb-10">More notes</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((other) => (
                <NoteCard key={other.slug} note={other} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

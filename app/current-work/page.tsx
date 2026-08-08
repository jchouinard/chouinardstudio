import type { Metadata } from 'next'
import Link from 'next/link'

import { ActivityStream } from '@/components/ui/ActivityStream'
import { OriginBadge } from '@/components/ui/Badge'
import { PageHeader, Section } from '@/components/ui/Section'
import { byFeature, getCollection, getMusic, getStory, getStudioNote, projects, visible } from '@/content'
import { studioActivity } from '@/lib/activity'
import { formatMonth } from '@/lib/format'
import type { Project } from '@/content/schema'

export const metadata: Metadata = {
  title: 'Current Work',
  description:
    'What Chouinard Studios is making right now — productions in progress, recording sessions and current projects.',
}

/** Resolve a project's cross-references into real links, or drop them. */
function relatedLinks(project: Project) {
  return project.related
    .map((related) => {
      switch (related.type) {
        case 'story': {
          const story = getStory(related.slug)
          return story ? { href: `/stories/${story.slug}`, label: story.title } : null
        }
        case 'collection': {
          const collection = getCollection(related.slug)
          return collection
            ? { href: `/stories/collections/${collection.slug}`, label: collection.title }
            : null
        }
        case 'music': {
          const item = getMusic(related.slug)
          return item ? { href: `/music/${item.slug}`, label: item.title } : null
        }
        case 'note': {
          const note = getStudioNote(related.slug)
          return note ? { href: `/studio/notes/${note.slug}`, label: note.title } : null
        }
        default:
          return null
      }
    })
    .filter((link): link is { href: string; label: string } => link !== null)
}

export default function CurrentWorkPage() {
  const active = byFeature(visible(projects))
  const activity = studioActivity()

  return (
    <>
      <PageHeader
        eyebrow="Current work"
        title="What is on the bench right now"
        intro="Productions in progress, sessions, and the slow business of building a room. This page changes as the work does."
      />

      <Section>
        <h2 className="display-md mb-12">Projects</h2>

        <div className="space-y-px">
          {active.map((project) => {
            const links = relatedLinks(project)

            return (
              <article
                key={project.slug}
                id={project.slug}
                className="scroll-mt-28 border border-ink-700 bg-ink-850/40 p-8 sm:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-14">
                  <div>
                    <span className="inline-flex border border-brass-700/70 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-brass-400">
                      {project.statusLabel}
                    </span>
                    <p className="mt-4 text-xs uppercase tracking-[0.14em] text-ivory-500">
                      {formatMonth(project.date)}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-2xl text-ivory-100">{project.title}</h3>
                      <OriginBadge origin={project.origin} />
                    </div>

                    <p className="lede mt-4 max-w-2xl text-[1.0625rem]">{project.summary}</p>

                    {project.body.length > 0 && (
                      <div className="prose-warm mt-5 max-w-2xl text-[0.95rem]">
                        {project.body.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    )}

                    {links.length > 0 && (
                      <div className="mt-7">
                        <p className="eyebrow">Related</p>
                        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                          {links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="text-sm text-brass-400 underline-offset-4 transition-colors hover:text-brass-300 hover:underline"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Section>

      <section className="border-t border-ink-700 bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="mb-12 max-w-2xl">
            <h2 className="display-md">Everything, newest first</h2>
            <p className="lede mt-5">
              Music, stories, projects and studio notes in one stream. Publishing anything
              anywhere on the site puts it here automatically.
            </p>
          </div>

          <ActivityStream items={activity} />
        </div>
      </section>
    </>
  )
}

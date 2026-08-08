import type { Metadata } from 'next'

import { NoteCard } from '@/components/ui/Cards'
import { PageHeader, Section } from '@/components/ui/Section'
import { byFeature, studioNotes, visible } from '@/content'

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'The production environment, craft and process behind Chouinard Studios recordings.',
}

/**
 * EXPERIENCE-CATALOG.md: a credibility experience about environment, craft and
 * process — explicitly not a rate card and not a gear showroom. So this page
 * talks about decisions and standards, and names equipment only where the
 * reasoning requires it.
 */
const principles = [
  {
    title: 'The room comes first',
    body: 'Equipment choices are downstream of acoustics. Bass trapping, broadband absorption at the reflection points, then diffusion — in that order, because any other order means doing it twice.',
  },
  {
    title: 'Keep the take with the mistake in it',
    body: 'A performance that breathes beats a performance that is correct. Editing exists to remove distractions, not to remove the person.',
  },
  {
    title: 'Production is part of the product',
    body: 'For an audiobook, the sound of the voice is the product. Nobody finishes a nine-hour recording they find tiring to listen to.',
  },
  {
    title: 'Build toward one world',
    body: 'Music and storytelling are made in the same room, to the same standard, by the same people. That is what makes them recognisable as coming from one place.',
  },
]

export default function StudioPage() {
  const notes = byFeature(visible(studioNotes))

  return (
    <>
      <PageHeader
        eyebrow="Inside the studio"
        title="The level of care we bring to what you hear"
        intro="Chouinard Studios is a working room, not a facility for rent. What follows is about how the work gets made and why the choices matter."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="walnut-panel relative min-h-[26rem] overflow-hidden border border-ink-700">
            <div
              className="light-pool light-pool--brass h-72 w-72"
              style={{ left: '30%', top: '18%' }}
              aria-hidden="true"
            />
            <div
              className="light-pool light-pool--oxblood h-56 w-56 opacity-70"
              style={{ right: '-4rem', bottom: '-4rem' }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-end p-8">
              <div>
                <p className="eyebrow">The environment</p>
                <p className="mt-4 max-w-sm font-display text-2xl leading-snug text-ivory-100">
                  Dark walnut, warm light, and acoustic treatment built in as architecture
                  rather than bolted on.
                </p>
                <p className="mt-5 max-w-sm text-xs leading-relaxed text-ivory-400">
                  The physical studio is being built toward this. Photography of the actual
                  room will replace this panel as the space develops — the visual references
                  guiding the build are concept art, not documentation of a finished space.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="display-md">How we work</h2>
            <dl className="mt-10 space-y-9">
              {principles.map((principle) => (
                <div key={principle.title} className="border-l border-ink-600 pl-6">
                  <dt className="font-display text-xl text-ivory-100">{principle.title}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-ivory-400">
                    {principle.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <section className="border-t border-ink-700 bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="mb-12 max-w-2xl">
            <h2 className="display-md">Studio notes</h2>
            <p className="lede mt-5">
              Short pieces on production decisions — the ones that never show up in the
              finished recording and determine all of it.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note.slug} note={note} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

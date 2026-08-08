import type { Metadata } from 'next'

import { NoteCard } from '@/components/ui/Cards'
import { Waveform } from '@/components/home/Waveform'
import {
  AcousticClouds,
  FloorPlane,
  MaterialStrip,
  RoomBackdrop,
  SlatWall,
} from '@/components/environment/Room'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Section } from '@/components/ui/Section'
import { byFeature, studioNotes, visible } from '@/content'

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'The room, the standards and the process behind Chouinard Studios recordings.',
}

/**
 * The Studio page — Design V2.
 *
 * The largest refinement target. V1 was a credible text page; V2 makes it a
 * signature brand experience: an immersive room, the materials it is built
 * from, the signal path a recording travels, the standards that govern it, and
 * the craft notes.
 *
 * Honesty constraint from BRAND-DIRECTION.md: the physical studio is being
 * built toward this and concept imagery must never imply a finished room. So
 * the environment is drawn from materials rather than photographed, and the
 * page says plainly what exists and what is intent.
 */

const standards = [
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

/** The path a performance travels. Concepts, not a gear list. */
const signalPath = [
  { step: 'Room', body: 'Treated first. Everything downstream inherits its character.' },
  { step: 'Instrument', body: 'Chosen for the piece, not for the spec sheet.' },
  { step: 'Placement', body: 'Where the microphone stands decides more than which one it is.' },
  { step: 'Performance', body: 'Long takes. Pace preserved over correction.' },
  { step: 'Edit', body: 'Remove distractions. Leave the person.' },
  { step: 'Master', body: 'Quiet enough to listen to for nine hours.' },
]

export default function StudioPage() {
  const notes = byFeature(visible(studioNotes))

  return (
    <>
      {/* ---- Immersive room hero ------------------------------------------ */}
      <header className="room-shade relative isolate overflow-hidden border-b border-ink-700">
        <RoomBackdrop />

        <div className="relative z-10 mx-auto flex min-h-[clamp(28rem,72vh,44rem)] max-w-7xl flex-col justify-end px-6 pb-16 pt-28 sm:pb-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Inside the studio</p>
            <h1 className="display-hero mt-6">
              The room
              <span className="block text-brass-300">makes the record.</span>
            </h1>
            <p className="lede mt-8 max-w-2xl">
              Chouinard Studios is a working room, not a facility for rent. What follows is
              how the work gets made and why the choices matter.
            </p>
          </div>

          <div className="mt-14 max-w-3xl opacity-70">
            <Waveform variant="rule" seed="studio-hero" bars={90} />
          </div>
        </div>
      </header>

      {/* ---- Materials ----------------------------------------------------- */}
      <Section py="py-16 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-20">
          <div>
            <p className="eyebrow">Materials</p>
            <h2 className="display-md mt-5 max-w-xl">
              Warm walnut, brass, oxblood and leather — chosen to be lived in.
            </h2>
            <p className="lede mt-6 max-w-xl">
              A room you want to spend nine hours in produces better work than a room you
              tolerate. The materials are part of the acoustic design, not decoration applied
              over it.
            </p>
            <MaterialStrip className="mt-10 max-w-2xl" />
          </div>

          <aside className="space-y-6 border-l border-ink-700 pl-8">
            <p className="eyebrow-muted">What exists today</p>
            <p className="text-sm leading-relaxed text-ivory-400">
              The narration booth is finished. The tracking room is under construction —
              treatment first, then millwork.
            </p>
            <p className="text-sm leading-relaxed text-ivory-500">
              The surfaces shown across this site are the approved material direction, drawn
              rather than photographed. They represent the environment being built toward.
              They are not photographs of a completed space, and nothing here should be read
              as documentation of finished facilities.
            </p>
          </aside>
        </div>
      </Section>

      {/* ---- Signal path --------------------------------------------------- */}
      <section className="relative overflow-hidden border-y border-ink-700 bg-ink-950">
        <SlatWall intensity="subtle" />
        <div
          className="light-pool light-pool--practical h-72 w-72"
          style={{ left: '12%', top: '-4rem' }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">Signal path</p>
            <h2 className="display-md mt-5">What a performance travels through</h2>
            <p className="lede mt-6">
              Six decisions, in order. Each one constrains everything after it.
            </p>
          </div>

          <ol className="mt-14 grid gap-px bg-ink-700 sm:grid-cols-2 lg:grid-cols-3">
            {signalPath.map((stage, index) => (
              <li key={stage.step} className="bg-ink-950 p-7">
                <span className="meta text-brass-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-2xl text-ivory-100">{stage.step}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory-400">{stage.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <FloorPlane height="h-20" />
      </section>

      {/* ---- Standards ----------------------------------------------------- */}
      <Section py="py-16 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="eyebrow">Standards</p>
            <h2 className="display-md mt-5">How we work</h2>
            <p className="mt-6 text-sm leading-relaxed text-ivory-400">
              Four positions that decide most arguments before they start.
            </p>
          </div>

          <dl className="space-y-10">
            {standards.map((principle) => (
              <div key={principle.title} className="border-t border-ink-600 pt-6">
                <dt className="font-display text-2xl text-ivory-100">{principle.title}</dt>
                <dd className="mt-3 max-w-2xl text-sm leading-relaxed text-ivory-400">
                  {principle.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ---- Notes --------------------------------------------------------- */}
      <section className="room-shade relative overflow-hidden border-t border-ink-700 bg-ink-950">
        <AcousticClouds />
        <div
          className="light-pool light-pool--oxblood h-96 w-96 opacity-50"
          style={{ right: '-8rem', bottom: '-10rem' }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow">Studio notes</p>
            <h2 className="display-md mt-5">The decisions nobody hears</h2>
            <p className="lede mt-6">
              Short pieces on production choices — the ones that never appear in the finished
              recording and determine all of it.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {notes.map((note, index) => (
              <NoteCard key={note.slug} note={note} index={index} />
            ))}
          </div>

          <div className="mt-20 border-t border-ink-700 pt-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl font-display text-2xl leading-snug text-ivory-100">
                Hear what the room does.
              </p>
              <div className="flex flex-wrap gap-4">
                <ButtonLink href="/music">Listen to the music</ButtonLink>
                <ButtonLink href="/stories" variant="ghost">
                  Browse the stories
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

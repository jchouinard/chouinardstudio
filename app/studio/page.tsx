import type { Metadata } from 'next'

import { NoteCard } from '@/components/ui/Cards'
import { Waveform } from '@/components/home/Waveform'
import { AcousticClouds, FloorPlane, MaterialStrip, SlatWall } from '@/components/environment/Room'
import { ConceptNote, ImageScrim, StudioImage } from '@/components/media/StudioImage'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Section } from '@/components/ui/Section'
import { byFeature, studioNotes, visible } from '@/content'
import { studioImages } from '@/content/studio-imagery'

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'The room, the standards and the process behind Chouinard Studios recordings.',
}

/**
 * The Studio page — Design V2, Pass 2.
 *
 * Pass 1 built the room procedurally because no imagery existed. Pass 2 anchors
 * it in the approved concept renders: the live room opens the page, the
 * acoustic ceiling carries the section on why the room is treated the way it
 * is, and two details ground the material and placement copy.
 *
 * Truthfulness: this is the environment being built toward, not a finished
 * space. The page says so once, near the top, confidently — rather than
 * repeating a disclaimer under every image. The procedural surfaces from Pass 1
 * are kept beneath and between the photography so the two read as one world.
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
    body: 'Music and storytelling are held to the same standards, shaped by the same people and the same ears. That is what makes them recognisable as coming from one place.',
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
      <header className="relative isolate overflow-hidden border-b border-ink-700">
        <div className="absolute inset-0">
          <StudioImage
            asset={studioImages.roomPiano}
            sizes="100vw"
            priority
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover object-center"
          />
          <ImageScrim variant="bottom" />
          {/*
            Text-side scrim, and it is load-bearing. Measured against the
            actual pixels behind the glyphs: with it the desktop headline sits
            at 8.07:1, without it 2.05:1 — below the 3:1 floor for large text,
            because the render's practical lights fall right where the type
            does. Do not remove it without re-measuring.
          */}
          <ImageScrim variant="left" />
          {/* Keeps the procedural warmth of Pass 1 alive over the render. */}
          <div
            className="light-pool light-pool--practical h-80 w-80 opacity-70"
            style={{ left: '12%', top: '6%' }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[clamp(30rem,80vh,48rem)] max-w-7xl flex-col justify-end px-6 pb-16 pt-32 sm:pb-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Inside the studio</p>
            {/*
              Pass 1 read "The room makes the record." — true of the atmosphere,
              but it credits the building for the work. The room shapes what is
              possible; people make the record.
            */}
            <h1 className="display-hero mt-6">
              The room shapes
              <span className="block text-brass-300">the record.</span>
            </h1>
            <p className="lede mt-8 max-w-2xl">
              It does not make it. People, performance and production do that — but everything
              they do carries the character of the space it happened in.
            </p>
            <ConceptNote className="mt-8" />
          </div>

          <div className="mt-12 max-w-3xl opacity-70">
            <Waveform variant="rule" seed="studio-hero" bars={90} />
          </div>
        </div>
      </header>

      {/* ---- Building the room --------------------------------------------- */}
      <Section py="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="eyebrow">Building the room</p>
            <h2 className="display-md mt-5">Treatment before millwork</h2>
            <p className="lede mt-6">
              The ceiling is the largest untreated surface in most rooms, and the first place a
              recording goes wrong.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-ivory-400">
              Absorption above the performer, diffusion behind, and timber that hides the
              engineering without softening it. A room designed this way stays even as you move
              through it, which is what lets a microphone go where the sound is rather than
              where the room allows.
            </p>
          </div>

          <figure className="relative overflow-hidden border border-ink-700">
            <StudioImage
              asset={studioImages.roomCeiling}
              sizes="(min-width: 1024px) 800px, 100vw"
              className="block"
              imgClassName="w-full"
            />
          </figure>
        </div>
      </Section>

      {/* ---- Materials ----------------------------------------------------- */}
      <section className="relative overflow-hidden border-y border-ink-700 bg-ink-950">
        <SlatWall intensity="subtle" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-20">
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
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory-500">
                Soft furnishings and rugs are not styling. They are the difference between a
                lively room and a harsh one.
              </p>

              <MaterialStrip className="mt-10 max-w-2xl" />
            </div>

            <figure className="relative overflow-hidden border border-ink-700">
              <StudioImage
                asset={studioImages.cornerDetail}
                sizes="(min-width: 1024px) 22rem, 90vw"
                className="block"
                imgClassName="w-full"
              />
            </figure>
          </div>
        </div>

        <FloorPlane height="h-20" />
      </section>

      {/* ---- Signal path — deliberately image-free, informational ---------- */}
      <Section py="py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Signal path</p>
          <h2 className="display-md mt-5">What a performance travels through</h2>
          <p className="lede mt-6">
            Six decisions, in order. Each one constrains everything after it.
          </p>
        </div>

        {/*
          Mobile pacing: a single column of generously spaced steps scans far
          better than a cramped grid, so the grid only engages from sm upward.
        */}
        <ol className="mt-12 grid gap-px bg-ink-700 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {signalPath.map((stage, index) => (
            <li key={stage.step} className="bg-ink-900 p-6 sm:p-7">
              <span className="meta text-brass-500">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-display text-2xl text-ivory-100">{stage.step}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ivory-400">{stage.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---- Placement, grounded in a detail -------------------------------- */}
      <section className="relative overflow-hidden border-y border-ink-700 bg-ink-950">
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
            <figure className="relative overflow-hidden border border-ink-700">
              <StudioImage
                asset={studioImages.ampDetail}
                sizes="(min-width: 1024px) 20rem, 85vw"
                className="block"
                imgClassName="w-full"
              />
            </figure>

            <div>
              <p className="eyebrow">Placement</p>
              <h2 className="display-md mt-5 max-w-xl">
                One microphone, moved four inches, is a different record.
              </h2>
              <p className="lede mt-6 max-w-xl">
                Most of what people hear as tone is a decision about distance and angle, made
                before anything is recorded.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory-400">
                Close to the grille for the speaker&rsquo;s character, further back for the room
                to enter the sound. Neither is correct on its own — the piece decides, and it
                is worth the twenty minutes it takes to find out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Standards ----------------------------------------------------- */}
      <Section py="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="eyebrow">Standards</p>
            <h2 className="display-md mt-5">How we work</h2>
            <p className="mt-6 text-sm leading-relaxed text-ivory-400">
              Four positions that decide most arguments before they start.
            </p>
          </div>

          <dl className="space-y-9">
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
          <div className="mb-12 max-w-2xl">
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

          <div className="mt-16 border-t border-ink-700 pt-12">
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

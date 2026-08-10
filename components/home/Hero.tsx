import { ButtonLink } from '@/components/ui/ButtonLink'
import { Waveform } from '@/components/home/Waveform'
import { AcousticClouds, FloorPlane, SlatWall } from '@/components/environment/Room'
import { site } from '@/content/site'

/**
 * Homepage hero — Design V2.
 *
 * V1 was tasteful but under-committed: type in the upper left, a small
 * waveform stranded at the bottom, and a lot of unused desktop canvas.
 *
 * V2 makes it a room you are standing in. The slatted wall and acoustic
 * ceiling give the composition architecture, the waveform grows into a
 * full-bleed anchor the type sits inside rather than above, and the walnut
 * floor closes the space. Warmth, restraint and the approved copy are
 * unchanged — still no services pitch and still no unapproved tagline.
 */
export function Hero() {
  return (
    <section className="vignette room-shade relative isolate overflow-hidden border-b border-ink-700">
      {/* The room. */}
      <SlatWall intensity="subtle" />
      <AcousticClouds />

      {/* Warm practical light, pooled rather than washed. */}
      <div
        className="light-pool light-pool--practical h-[26rem] w-[26rem]"
        style={{ left: '58%', top: '-6rem' }}
        aria-hidden="true"
      />
      <div
        className="light-pool light-pool--oxblood h-[30rem] w-[30rem] opacity-80"
        style={{ left: '-10rem', top: '2rem' }}
        aria-hidden="true"
      />
      <div
        className="light-pool light-pool--brass h-[22rem] w-[38rem] opacity-50"
        style={{ right: '-12rem', bottom: '2rem' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[clamp(36rem,88vh,58rem)] max-w-7xl flex-col justify-end px-6 pb-0 pt-28 sm:pt-32">
        <div className="animate-rise relative z-10 max-w-4xl">
          <p className="eyebrow">Independent creative studio</p>

          {/*
            No tagline is approved, so the H1 remains the brand itself and every
            supporting line is quoted from the Product KB. Final positioning
            copy belongs to the Product Lead.
          */}
          <h1 className="display-hero mt-7">
            <span className="block">Chouinard</span>
            <span className="block text-brass-300">Studios</span>
          </h1>

          <div className="mt-9 grid gap-8 sm:grid-cols-[minmax(0,32rem)_auto] sm:items-end">
            <div>
              <p className="lede max-w-xl">{site.descriptor}</p>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-ivory-400">
                We create, produce, publish and develop our own work — original music, and a
                curated catalog of audiobooks and storytelling.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 sm:justify-end">
              <ButtonLink href="/music">Hear the music</ButtonLink>
              <ButtonLink href="/stories" variant="ghost">
                Browse the stories
              </ButtonLink>
            </div>
          </div>
        </div>

        {/*
          The signature waveform, now a full-bleed anchor the composition rests
          on rather than a motif parked at the edge. It is markedly more
          compelling in motion than in a still capture.
        */}
        <div className="relative z-10 -mx-6 mt-12 sm:mt-16">
          <Waveform variant="anchor" seed="chouinard-hero" />
        </div>
      </div>

      <FloorPlane height="h-32" />
    </section>
  )
}

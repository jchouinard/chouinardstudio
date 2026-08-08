import { ButtonLink } from '@/components/ui/ButtonLink'
import { Waveform } from '@/components/home/Waveform'
import { site } from '@/content/site'

/**
 * BRAND-DIRECTION.md is explicit that the site must not open with a services
 * pitch, and that no tagline is approved yet. So the hero carries the brand
 * through composition — depth, warm light, sound — and the only claim it makes
 * is the approved business descriptor, quoted verbatim from the Product KB.
 */
export function Hero() {
  return (
    <section className="vignette relative isolate overflow-hidden border-b border-ink-700">
      {/* Layered pools of warm practical light. */}
      <div
        className="light-pool light-pool--brass h-[34rem] w-[34rem]"
        style={{ left: '52%', top: '-16rem' }}
        aria-hidden="true"
      />
      <div
        className="light-pool light-pool--oxblood h-[28rem] w-[28rem]"
        style={{ left: '-8rem', top: '4rem' }}
        aria-hidden="true"
      />
      <div
        className="light-pool light-pool--walnut h-[24rem] w-[40rem] opacity-70"
        style={{ right: '-10rem', bottom: '-12rem' }}
        aria-hidden="true"
      />

      {/* Faint textile weave, well below the type. */}
      <div className="textile absolute inset-0 opacity-[0.35]" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[clamp(34rem,82vh,52rem)] max-w-7xl flex-col justify-center px-6 pb-16 pt-20 sm:pb-24 sm:pt-28">
        <div className="animate-rise max-w-4xl">
          <p className="eyebrow">Independent creative studio</p>

          {/*
            No tagline is approved yet, so the H1 is the brand itself and every
            supporting line is quoted from the Product KB. Final positioning
            copy belongs to the Product Lead.
          */}
          <h1 className="display-xl mt-7">
            <span className="block">Chouinard</span>
            <span className="block text-brass-300">Studios</span>
          </h1>

          <p className="lede mt-9 max-w-2xl">{site.descriptor}</p>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory-400">
            We create, produce, publish and develop our own work — original music, and a
            curated catalog of audiobooks and storytelling.
          </p>

          <div className="mt-11 flex flex-wrap gap-4">
            <ButtonLink href="/stories">Browse the stories</ButtonLink>
            <ButtonLink href="/music" variant="ghost">
              Hear the music
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="relative -mb-px opacity-80">
        <Waveform />
      </div>
    </section>
  )
}

import type { Metadata } from 'next'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { PageHeader, Section } from '@/components/ui/Section'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Chouinard Studios is an independent, family-led music, recording, publishing and creative production studio.',
}

/**
 * EXPERIENCE-CATALOG.md asks for the people, purpose and creative philosophy,
 * "premium and human; not corporate biography language".
 *
 * Personal biography is not in the Product KB, so this page stays with what
 * has actually been approved: what the business is, what it makes, and how it
 * intends to work. Real biography can be added when the Founder supplies it.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A family studio that makes its own work"
        intro={site.descriptor}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
          <div className="prose-warm max-w-2xl text-[1.0625rem]">
            <p>
              Chouinard Studios exists primarily to create, produce, publish and develop its own
              work rather than to operate as a conventional studio for hire. That distinction
              shapes everything else — what gets made, how long it takes, and what standard it
              has to meet before anyone hears it.
            </p>
            <p>
              Music is the creative heart of the studio. Alongside it we develop and publish a
              curated catalog of audiobooks and storytelling, chosen for warmth, craft and
              staying power rather than for whatever is currently in demand.
            </p>
            <p>
              The ambition is straightforward and long: that &ldquo;A Chouinard Studios
              Production&rdquo; eventually signals a recognisable standard of storytelling,
              performance, sound and care.
            </p>
          </div>

          <aside className="space-y-10">
            <div className="border border-ink-700 bg-ink-850/40 p-7">
              <h2 className="eyebrow">What we make</h2>
              <ul className="mt-5 space-y-3 text-sm text-ivory-300">
                <li>Original music and recordings</li>
                <li>A curated audiobook and storytelling catalog</li>
                <li>Studio production for our own work</li>
                <li>Creative and media projects that grow from both</li>
              </ul>
            </div>

            <div className="border border-ink-700 bg-ink-850/40 p-7">
              <h2 className="eyebrow">What we are not</h2>
              <ul className="mt-5 space-y-3 text-sm text-ivory-400">
                <li>An hourly rental studio</li>
                <li>A standardised production-services business</li>
                <li>A narration-for-hire service</li>
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-ivory-500">
                Selective outside collaborations are considered by inquiry.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <section className="border-t border-ink-700 bg-ink-950">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <h2 className="display-md">The people</h2>
          <p className="lede mx-auto mt-6 max-w-xl">
            Narration and character work, recording, editing, mastering and original music —
            done in-house, by the family that runs the studio.
          </p>
          <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-ivory-500">
            Fuller introductions will appear here once the Founder supplies them. We would
            rather leave this short than invent a biography.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/studio">Inside the studio</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}

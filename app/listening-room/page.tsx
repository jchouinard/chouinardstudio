import type { Metadata } from 'next'

import { CuratedCard } from '@/components/ui/Cards'
import { PageHeader, Section } from '@/components/ui/Section'
import { byFeature, curated, visible } from '@/content'

export const metadata: Metadata = {
  title: 'Listening Room',
  description:
    "Recordings, writing and craft from outside Chouinard Studios that shape how the studio's own work gets made.",
}

const categoryLabels: Record<string, string> = {
  listening: 'Listening',
  craft: 'Craft',
  storytelling: 'Storytelling',
  instrument: 'Instruments',
}

export default function ListeningRoomPage() {
  const items = byFeature(visible(curated))
  const categories = [...new Set(items.map((item) => item.category))]

  return (
    <>
      <PageHeader
        eyebrow="Listening room"
        title="What we are paying attention to"
        intro="A small, deliberately restrained collection of other people's work — recordings, writing and technique that shape how we make our own."
      />

      <Section>
        <p className="mb-12 max-w-2xl border-l-2 border-brass-700/60 pl-6 text-sm leading-relaxed text-ivory-400">
          Everything here links back to its original source. We add our own reason for pointing
          at it and nothing else — no reproduced articles, images or recordings.
        </p>

        {categories.map((category) => {
          const inCategory = items.filter((item) => item.category === category)

          return (
            <div key={category} className="mb-16 last:mb-0">
              <h2 className="eyebrow mb-8">{categoryLabels[category] ?? category}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {inCategory.map((item) => (
                  <CuratedCard key={item.slug} item={item} />
                ))}
              </div>
            </div>
          )
        })}
      </Section>
    </>
  )
}

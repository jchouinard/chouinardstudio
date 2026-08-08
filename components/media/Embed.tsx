import type { Embed as EmbedRecord } from '@/content/schema'

/**
 * Official third-party embed.
 *
 * Only the providers in the schema's `provider` union can reach this
 * component, so a content edit cannot inject an arbitrary iframe. Lazy-loaded
 * and sandboxed to what a media player actually needs.
 */
export function Embed({ embed }: { embed: EmbedRecord }) {
  return (
    <div className="border border-ink-600 bg-ink-850/60 p-1.5">
      <iframe
        src={embed.url}
        title={embed.title}
        height={embed.heightPx}
        loading="lazy"
        allow="encrypted-media; clipboard-write; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        className="w-full border-0"
      />
    </div>
  )
}

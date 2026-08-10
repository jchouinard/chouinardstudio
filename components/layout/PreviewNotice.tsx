import { site } from '@/content/site'

/**
 * Preview-state disclosure — V2.
 *
 * V1 ran a full-width banner above every page, which made a finished-looking
 * site feel permanently under construction. V2 splits the same disclosure into
 * two quieter, permanent placements:
 *
 *  - a small marker in the header, visible on every page
 *  - the full sentence in the footer
 *
 * Combined with the inline "Representative" label on every example record and
 * `noindex` while `isPreviewBuild` is true, the truth stays unmistakable. The
 * wording is not softened — only the volume.
 */

/** Header marker. Present on every page, sized like navigation metadata. */
export function PreviewChip() {
  if (!site.isPreviewBuild) return null

  return (
    <span
      className="inline-flex items-center gap-1.5 border border-brass-700/50 px-2 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-brass-400"
      title="Preview build — titles, music and studio updates shown are representative examples, not actual Chouinard Studios releases."
    >
      <span className="inline-block h-1 w-1 rounded-full bg-brass-500" aria-hidden="true" />
      Preview
      <span className="sr-only">
        build. Titles, music and studio updates shown on this site are representative
        examples, not actual {site.name} releases.
      </span>
    </span>
  )
}

/** Footer statement. The unabridged disclosure. */
export function PreviewFootnote() {
  if (!site.isPreviewBuild) return null

  return (
    <p className="text-xs leading-relaxed text-ivory-500">
      <span className="text-brass-400">Preview build.</span> Titles, music and studio
      updates shown here are representative examples used to design the site — not actual{' '}
      {site.name} releases. Individual entries are marked{' '}
      <span className="whitespace-nowrap">&ldquo;Representative&rdquo;</span>.
    </p>
  )
}

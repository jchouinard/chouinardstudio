import { site } from '@/content/site'

/**
 * Honesty strip.
 *
 * The implementation package requires clearly identified representative
 * content. Per-item "Example" badges do most of that work; this states it once
 * at the top of every page so nobody has to infer it. Remove by setting
 * `site.isPreviewBuild` to false once real releases are in place.
 */
export function PreviewNotice() {
  if (!site.isPreviewBuild) return null

  return (
    <div className="border-b border-ink-700 bg-ink-950">
      <p className="mx-auto max-w-7xl px-6 py-2.5 text-center text-[0.7rem] leading-relaxed tracking-wide text-ivory-400">
        <span className="text-brass-400">Preview build.</span> Titles, music and studio
        updates shown here are representative examples used to design the site — not actual{' '}
        {site.name} releases.
      </p>
    </div>
  )
}

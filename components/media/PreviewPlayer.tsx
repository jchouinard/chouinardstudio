'use client'

import { useRef, useState } from 'react'

import { track } from '@/lib/analytics'
import { formatDuration } from '@/lib/format'
import type { Preview } from '@/content/schema'

/**
 * On-site preview.
 *
 * JOURNEY-SPINE.md: do not force visitors off-site before they can understand
 * the work. When audio exists, it plays here. When it does not — which is the
 * case for all seeded content — the component explains itself rather than
 * rendering a broken control. Never autoplays.
 */
export function PreviewPlayer({
  preview,
  workType,
  slug,
  title,
}: {
  preview: Preview | undefined
  workType: 'story' | 'music'
  slug: string
  title: string
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  if (!preview?.src) {
    return (
      <div className="border border-ink-600 bg-ink-850/60 px-6 py-5">
        <p className="eyebrow">Preview</p>
        <p className="mt-3 text-sm leading-relaxed text-ivory-400">
          {preview?.note ?? 'A preview will be available once this production is finished.'}
        </p>
      </div>
    )
  }

  return (
    <div className="border border-ink-600 bg-ink-850/60 px-6 py-5">
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow">Preview</p>
        {preview.durationSeconds && (
          <p className="text-xs tabular-nums text-ivory-500">
            {formatDuration(preview.durationSeconds)}
          </p>
        )}
      </div>

      <audio
        ref={audioRef}
        src={preview.src}
        controls
        preload="none"
        aria-label={`Preview of ${title}`}
        className="mt-4 w-full"
        onPlay={() => {
          if (!hasPlayed) {
            setHasPlayed(true)
            track({ name: 'preview_play', workType, slug })
          }
        }}
        onEnded={() => track({ name: 'preview_complete', workType, slug })}
      />

      {preview.note && <p className="mt-3 text-xs text-ivory-500">{preview.note}</p>}
    </div>
  )
}

import Image from 'next/image'

import type { Media } from '@/content/schema'
import { hashString } from '@/lib/format'

/**
 * The single seam between "we have no imagery yet" and "we have photography".
 *
 * With a `src`, this renders an optimised responsive image. Without one it
 * renders a generated composition in the brand palette — deterministic per
 * slug, so a given title always looks the same. No stock photography, and
 * nothing that implies a finished physical room.
 *
 * When real artwork arrives, set `artwork.src` on the record. Nothing else
 * changes.
 */

const palettes = [
  { from: '#1f1a17', to: '#350d16', glow: '#7a1e32' },
  { from: '#12100e', to: '#241811', glow: '#a88243' },
  { from: '#171412', to: '#322218', glow: '#c2a063' },
  { from: '#0c0a09', to: '#4a121f', glow: '#93253c' },
  { from: '#1f1a17', to: '#452f21', glow: '#d4b87f' },
  { from: '#12100e', to: '#5f1727', glow: '#b03a52' },
]

export type ArtworkRatio = 'square' | 'wide' | 'portrait'

const ratioClass: Record<ArtworkRatio, string> = {
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
  portrait: 'aspect-[3/4]',
}

interface ArtworkProps {
  media?: Media | undefined
  seed: string
  title: string
  subtitle?: string | undefined
  ratio?: ArtworkRatio
  sizes?: string
  priority?: boolean
  className?: string
}

export function Artwork({
  media,
  seed,
  title,
  subtitle,
  ratio = 'square',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
  className = '',
}: ArtworkProps) {
  if (media?.src) {
    return (
      <figure className={`relative overflow-hidden bg-ink-800 ${ratioClass[ratio]} ${className}`}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {media.kind === 'concept' && (
          <figcaption className="absolute bottom-0 left-0 right-0 bg-ink-950/85 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.14em] text-ivory-400">
            Concept reference — not a photograph of the studio
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <GeneratedArtwork
      seed={seed}
      title={title}
      subtitle={subtitle}
      ratio={ratio}
      className={className}
    />
  )
}

export function GeneratedArtwork({
  seed,
  title,
  subtitle,
  ratio = 'square',
  className = '',
}: {
  seed: string
  title: string
  subtitle?: string | undefined
  ratio?: ArtworkRatio
  className?: string
}) {
  const hash = hashString(seed)
  const palette = palettes[hash % palettes.length]!
  const glowX = 18 + (hash % 5) * 16
  const glowY = 20 + ((hash >> 3) % 4) * 18
  const rotation = ((hash >> 5) % 7) - 3

  return (
    <div
      className={`relative overflow-hidden ${ratioClass[ratio]} ${className}`}
      style={{ background: `linear-gradient(155deg, ${palette.from} 0%, ${palette.to} 100%)` }}
      role="img"
      aria-label={`${title}${subtitle ? ` by ${subtitle}` : ''} — generated placeholder artwork`}
    >
      {/* Warm pool of light */}
      <div
        className="absolute h-[70%] w-[70%] rounded-full opacity-45 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${palette.glow} 0%, transparent 68%)`,
          left: `${glowX}%`,
          top: `${glowY}%`,
          transform: 'translate(-30%, -30%)',
        }}
      />

      {/* Wood-grain striations */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(94deg, rgba(226,205,164,0.5) 0px, transparent 2px, transparent 9px, rgba(69,47,33,0.7) 11px)',
          transform: `rotate(${rotation}deg) scale(1.15)`,
        }}
      />

      {/* Brass frame */}
      <div className="absolute inset-[7%] border border-brass-700/40" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[12%] text-center">
        <p className="font-display text-[clamp(0.95rem,2.4vw,1.5rem)] leading-tight text-ivory-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
          {title}
        </p>
        {subtitle && (
          <>
            <span className="my-3 block h-px w-8 bg-brass-600/70" />
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-ivory-400">{subtitle}</p>
          </>
        )}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 45%, transparent 40%, rgba(7,6,5,0.72) 100%)',
        }}
      />
    </div>
  )
}

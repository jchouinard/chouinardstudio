import type { StudioImageAsset } from '@/content/studio-imagery'

/**
 * Renders a studio concept derivative.
 *
 * Uses <picture> with a WebP source and a JPEG fallback rather than
 * next/image, deliberately: the derivatives are already generated at fixed
 * widths by scripts/derive-studio-images.ts, so the site stays fully static
 * with no runtime image-optimisation service in the request path. next/image
 * would either re-optimise every image through Vercel's service, or — with
 * `unoptimized` — drop the srcset entirely and lose responsive delivery.
 *
 * Intrinsic width/height are always emitted so the browser reserves the box
 * before the bytes land: no layout shift.
 */
export function StudioImage({
  asset,
  sizes,
  priority = false,
  className = '',
  imgClassName = 'h-full w-full object-cover',
}: {
  asset: StudioImageAsset
  /** Responsive sizes hint, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes: string
  /** Eager-load above-the-fold imagery. */
  priority?: boolean
  className?: string
  imgClassName?: string
}) {
  const srcSet = (extension: 'webp' | 'jpg') =>
    asset.widths.map((width) => `/images/studio/${asset.basename}-${width}.${extension} ${width}w`).join(', ')

  const largest = asset.widths[asset.widths.length - 1]

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/images/studio/${asset.basename}-${largest}.jpg`}
        srcSet={srcSet('jpg')}
        sizes={sizes}
        width={asset.width}
        height={asset.height}
        alt={asset.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className={imgClassName}
      />
    </picture>
  )
}

/**
 * A scrim for imagery that sits behind type.
 *
 * The concept renders are already low-key, but headline contrast cannot
 * depend on that — this guarantees a readable floor underneath the text.
 */
export function ImageScrim({ variant = 'bottom' }: { variant?: 'bottom' | 'left' | 'even' }) {
  const gradients = {
    bottom:
      'linear-gradient(180deg, rgba(7,6,5,0.55) 0%, rgba(7,6,5,0.30) 35%, rgba(7,6,5,0.88) 100%)',
    left: 'linear-gradient(90deg, rgba(7,6,5,0.94) 0%, rgba(7,6,5,0.70) 45%, rgba(7,6,5,0.35) 100%)',
    even: 'linear-gradient(180deg, rgba(7,6,5,0.62) 0%, rgba(7,6,5,0.62) 100%)',
  }

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: gradients[variant] }}
      aria-hidden="true"
    />
  )
}

/**
 * The single contextual line a page carries when it shows concept imagery.
 * Confident and factual — used once per page, never under every image.
 */
export function ConceptNote({ className = '' }: { className?: string }) {
  return (
    <p className={`meta text-ivory-500 ${className}`}>
      Studio vision — the room we are building toward
    </p>
  )
}

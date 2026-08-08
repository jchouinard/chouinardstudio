import { hashString } from '@/lib/format'

/**
 * A slow, low-amplitude waveform.
 *
 * Music is the flagship identity, and there is no photography yet — so the
 * hero's motion is sound made visible rather than a stock studio image.
 * Deterministic heights (no randomness) keep server and client markup
 * identical, and `prefers-reduced-motion` stops it entirely via globals.css.
 */
export function Waveform({ bars = 72 }: { bars?: number }) {
  return (
    <div
      className="pointer-events-none flex h-24 w-full items-end justify-center gap-[3px] sm:h-32"
      aria-hidden="true"
    >
      {Array.from({ length: bars }, (_, index) => {
        const seed = hashString(`bar-${index}`)
        // Envelope: taller in the middle, tapering at both ends.
        const position = index / (bars - 1)
        const envelope = Math.sin(position * Math.PI) ** 0.7
        const height = (16 + (seed % 68)) * envelope + 4
        const duration = 3.6 + (seed % 22) / 10
        const delay = (seed % 40) / 10

        return (
          <span
            key={index}
            className="w-[2px] rounded-full bg-gradient-to-t from-oxblood-700 via-brass-600 to-brass-300"
            style={{
              height: `${height}%`,
              opacity: 0.28 + envelope * 0.34,
              animation: `breathe ${duration}s ease-in-out ${delay}s infinite`,
              transformOrigin: 'bottom',
            }}
          />
        )
      })}
    </div>
  )
}

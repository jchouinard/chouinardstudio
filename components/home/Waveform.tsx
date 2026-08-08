import { hashString } from '@/lib/format'

/**
 * The Chouinard Studios waveform.
 *
 * STANDING PRODUCT LEAD DECISION (.team-chouinard/DESIGN-HISTORY.md):
 * this is a signature brand element. It communicates sound, motion, music and
 * the living studio. Evolve its scale, placement, amplitude, colour and
 * integration freely — do not remove it or swap it for generic decoration.
 *
 * V2 evolves it from a small isolated motif into a spatial anchor:
 *  - `anchor`   full-bleed hero form with a depth echo and floor reflection
 *  - `strip`    a compact sonic signature for music cards and rows
 *  - `rule`     a hairline-scale waveform used in place of a divider
 *
 * Bar heights are deterministic from `seed`, so a given track always looks
 * like itself, server and client markup match, and screenshots are stable.
 * All motion is surrendered under prefers-reduced-motion via globals.css.
 */

type Variant = 'anchor' | 'strip' | 'rule'

interface WaveformProps {
  variant?: Variant
  /** Different seeds produce different, stable shapes. */
  seed?: string
  bars?: number
  className?: string
}

const defaults: Record<Variant, { bars: number; minOpacity: number; span: number }> = {
  anchor: { bars: 96, minOpacity: 0.3, span: 0.44 },
  strip: { bars: 44, minOpacity: 0.35, span: 0.5 },
  rule: { bars: 120, minOpacity: 0.25, span: 0.4 },
}

/** Deterministic bar heights with a centre-weighted envelope. */
function bars(count: number, seed: string, envelopePower: number) {
  return Array.from({ length: count }, (_, index) => {
    const hash = hashString(`${seed}:${index}`)
    const position = count === 1 ? 0.5 : index / (count - 1)
    const envelope = Math.sin(position * Math.PI) ** envelopePower
    // Two overlapping periodics keep it musical rather than noisy.
    const swing =
      0.55 + 0.28 * Math.sin(index * 0.7 + (hash % 97) / 97) + 0.17 * Math.sin(index * 0.23)
    return {
      height: Math.max(4, Math.min(100, swing * envelope * 100)),
      envelope,
      duration: 3.4 + (hash % 26) / 10,
      delay: (hash % 42) / 10,
    }
  })
}

export function Waveform({
  variant = 'anchor',
  seed = 'chouinard-studios',
  bars: barCount,
  className = '',
}: WaveformProps) {
  const config = defaults[variant]
  const count = barCount ?? config.bars

  if (variant === 'anchor') {
    return <AnchorWaveform seed={seed} count={count} className={className} />
  }

  const shape = bars(count, seed, variant === 'rule' ? 0.35 : 0.6)
  const isRule = variant === 'rule'

  return (
    <div
      className={`pointer-events-none flex w-full items-end gap-[2px] ${
        isRule ? 'h-3' : 'h-9'
      } ${className}`}
      aria-hidden="true"
    >
      {shape.map((bar, index) => (
        <span
          key={index}
          className={`flex-1 rounded-full ${
            isRule
              ? 'bg-brass-700/70'
              : 'bg-gradient-to-t from-oxblood-700 via-brass-600 to-brass-300'
          }`}
          style={{
            height: `${bar.height}%`,
            opacity: config.minOpacity + bar.envelope * 0.45,
          }}
        />
      ))}
    </div>
  )
}

/**
 * Hero anchor.
 *
 * Three layers give the motif depth instead of leaving it a flat strip: a
 * large blurred echo behind, the crisp waveform itself, and a short inverted
 * reflection reading as the studio floor beneath it.
 */
function AnchorWaveform({
  seed,
  count,
  className,
}: {
  seed: string
  count: number
  className: string
}) {
  const shape = bars(count, seed, 0.5)

  return (
    <div className={`pointer-events-none relative w-full ${className}`} aria-hidden="true">
      {/* Depth echo — larger, blurred, slower. */}
      <div className="absolute inset-x-0 bottom-0 flex h-[130%] items-end gap-[3px] opacity-[0.22] blur-[7px]">
        {shape.map((bar, index) => (
          <span
            key={index}
            className="flex-1 rounded-full bg-gradient-to-t from-oxblood-800 via-oxblood-600 to-brass-600"
            style={{
              height: `${bar.height}%`,
              animation: `swell ${bar.duration * 1.45}s ease-in-out ${bar.delay * 1.3}s infinite`,
              transformOrigin: 'bottom',
            }}
          />
        ))}
      </div>

      {/* The waveform. */}
      <div className="relative flex h-[clamp(7rem,17vw,15rem)] items-end gap-[2px] sm:gap-[3px]">
        {shape.map((bar, index) => (
          <span
            key={index}
            className="flex-1 rounded-full bg-gradient-to-t from-oxblood-700 via-brass-600 to-brass-300"
            style={{
              height: `${bar.height}%`,
              opacity: 0.34 + bar.envelope * 0.5,
              animation: `swell ${bar.duration}s ease-in-out ${bar.delay}s infinite`,
              transformOrigin: 'bottom',
            }}
          />
        ))}
      </div>

      {/* Floor line the waveform stands on. */}
      <div className="hairline relative opacity-70" />

      {/* Reflection in the walnut. */}
      <div className="relative flex h-[clamp(1.75rem,4vw,3.25rem)] items-start gap-[2px] opacity-[0.16] sm:gap-[3px]">
        {shape.map((bar, index) => (
          <span
            key={index}
            className="flex-1 rounded-full bg-gradient-to-b from-brass-400 to-transparent"
            style={{
              height: `${bar.height}%`,
              animation: `swell ${bar.duration}s ease-in-out ${bar.delay}s infinite`,
              transformOrigin: 'top',
            }}
          />
        ))}
      </div>
    </div>
  )
}

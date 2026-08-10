/**
 * The studio room, built procedurally.
 *
 * BRAND-DIRECTION.md requires the site to inhabit the Chouinard Studios
 * environment, and equally requires that concept imagery never imply a
 * finished physical room. No photography exists, so V2 builds the room out of
 * material surfaces — slatted wood diffusion, acoustic panelling, a walnut
 * floor, warm practical light — which read as architecture without pretending
 * to be a photograph of anything.
 *
 * When real studio photography arrives it layers on top of these, or replaces
 * them per-surface. Nothing else in the site depends on how they are drawn.
 */

/** Slatted wood diffuser wall with warm light raking across it. */
export function SlatWall({
  className = '',
  intensity = 'normal',
}: {
  className?: string
  intensity?: 'subtle' | 'normal'
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="slat-wall absolute inset-0"
        style={{ opacity: intensity === 'subtle' ? 0.3 : 0.55 }}
      />
      {/* Raking light gives the slats depth rather than leaving them a pattern. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(7,6,5,0.94) 0%, rgba(7,6,5,0.35) 34%, rgba(194,160,99,0.10) 52%, rgba(7,6,5,0.55) 74%, rgba(7,6,5,0.95) 100%)',
        }}
      />
    </div>
  )
}

/** Acoustic clouds suspended overhead — the ceiling of the room. */
export function AcousticClouds({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-x-[-4%] top-[-5.5rem] flex gap-6">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="acoustic-grid h-32 flex-1 rounded-b-sm border-b border-walnut-700/50"
            style={{
              transform: `translateY(${index % 2 === 0 ? 0 : 14}px)`,
              opacity: 0.5 - index * 0.05,
              boxShadow: '0 18px 34px -18px rgba(0,0,0,0.9)',
            }}
          />
        ))}
      </div>
      <div className="edge-glow-top absolute inset-x-0 top-24 h-16 opacity-40" />
    </div>
  )
}

/** Walnut floor receding to a horizon. */
export function FloorPlane({ className = '', height = 'h-40' }: { className?: string; height?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${height} ${className}`}
      aria-hidden="true"
    >
      <div className="floor-plane absolute inset-0 opacity-70" />
      <div className="hairline absolute inset-x-0 top-0 opacity-40" />
    </div>
  )
}

/**
 * A complete room backdrop: ceiling treatment, slatted rear wall, walnut
 * floor, and pools of warm practical light. Used behind immersive bands.
 */
export function RoomBackdrop({
  className = '',
  clouds = true,
  floor = true,
}: {
  className?: string
  clouds?: boolean
  floor?: boolean
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <SlatWall />
      {clouds && <AcousticClouds />}
      {floor && <FloorPlane height="h-56" />}

      <div
        className="light-pool light-pool--practical h-72 w-72"
        style={{ left: '18%', top: '14%' }}
      />
      <div
        className="light-pool light-pool--oxblood h-80 w-80 opacity-60"
        style={{ right: '8%', top: '30%' }}
      />
      <div
        className="light-pool light-pool--walnut h-64 w-[28rem] opacity-50"
        style={{ left: '40%', bottom: '-6rem' }}
      />
    </div>
  )
}

/**
 * A material sample — walnut, brass, oxblood textile, leather.
 *
 * Communicates the physical palette honestly: these are the materials the
 * studio is being built from, presented as swatches rather than as a
 * photograph of a finished space.
 */
const materials = [
  { name: 'Walnut', className: 'walnut-panel' },
  { name: 'Brass', className: 'bg-gradient-to-br from-brass-300 via-brass-600 to-brass-700' },
  { name: 'Oxblood', className: 'textile bg-oxblood-800' },
  { name: 'Leather', className: 'bg-gradient-to-br from-leather-800 to-ink-950' },
  { name: 'Ivory', className: 'paper-grain bg-ivory-200' },
] as const

export function MaterialStrip({ className = '' }: { className?: string }) {
  return (
    <ul className={`grid grid-cols-5 gap-2 sm:gap-3 ${className}`}>
      {materials.map((material) => (
        <li key={material.name}>
          <div
            className={`h-14 border border-ink-600/80 sm:h-20 ${material.className}`}
            aria-hidden="true"
          />
          <p className="meta mt-2 text-[0.6rem]">{material.name}</p>
        </li>
      ))}
    </ul>
  )
}

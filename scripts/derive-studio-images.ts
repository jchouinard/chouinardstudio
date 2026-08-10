/**
 * Generates web-ready derivatives from the concept-image originals.
 *
 *   npm install --no-save sharp
 *   npx tsx scripts/derive-studio-images.ts
 *
 * `sharp` is intentionally NOT a dependency. It is a build-time image tool
 * needed only when the source references change, and adding it to
 * package.json would put a native binary download into every Vercel build.
 * The generated files are committed, so the site builds without it.
 *
 * Originals under .team-chouinard/design-references/studio/ are read-only and
 * never modified.
 *
 * Two of the six originals are annotated design boards: a room render sitting
 * above a floor plan and a specification panel. Only the render is suitable
 * for public use, so those are cropped here — the planning panels list room
 * features that are not built yet, and publishing them would imply a finished
 * space.
 */

import { mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)

/**
 * Minimal local typing for the bits of sharp this script uses.
 *
 * Deliberately does not reference the 'sharp' module's own types: sharp is not
 * a committed dependency, so `import type` would make `tsc --noEmit` and
 * `next build` fail on any machine — including Vercel — that has not run the
 * transient install.
 */
interface Region {
  left: number
  top: number
  width: number
  height: number
}

interface SharpPipeline {
  metadata(): Promise<{ width?: number; height?: number }>
  extract(region: Region): SharpPipeline
  resize(options: { width: number; withoutEnlargement?: boolean }): SharpPipeline
  webp(options: { quality: number; effort?: number }): SharpPipeline
  jpeg(options: { quality: number; mozjpeg?: boolean; progressive?: boolean }): SharpPipeline
  toFile(file: string): Promise<unknown>
}

type SharpFactory = (input: string) => SharpPipeline

interface Derivative {
  /** Source file under design-references/studio/. */
  source: string
  /** Output basename under public/images/studio/. */
  name: string
  /** Fractional crop of the source, applied before resizing. */
  crop?: { top: number; left: number; width: number; height: number }
  /** Rendered widths. Never upscaled beyond the cropped source width. */
  widths: number[]
  note: string
}

const DERIVATIVES: Derivative[] = [
  {
    source: 'studio-concept-01.jpeg',
    name: 'room-piano',
    // Keep only the room render: drop the title bar and the "STANDARD VIEW"
    // label above it, the floor plan and features panel below, and the
    // lettered placard at the right edge.
    // Also trims the right wall. The source lines up several near-identical
    // amplifier stacks there, which reads as a shop display rather than a
    // working room and is the clearest sign the render is synthetic. This
    // frame keeps the piano, desk and kit — the side with no repetition.
    crop: { top: 0.108, left: 0.0, width: 0.72, height: 0.38 },
    widths: [700, 1100],
    note: 'Wide room view — grand piano, control desk and drum kit',
  },
  {
    source: 'studio-concept-02.jpeg',
    name: 'room-ceiling',
    // Same: drop the "CEILING PRINCIPLES" panel overlaying the left, the
    // ceiling plan and materials panels below, and the right-edge placard.
    // Cropped hardest of the four: this one is shown bright and large, so the
    // duplicated amplifier row and the wall of guitars packed edge to edge
    // would be most obvious here. Keeps the ceiling — the reason to use it.
    crop: { top: 0.075, left: 0.14, width: 0.52, height: 0.42 },
    widths: [600, 799],
    note: 'Room view — acoustic ceiling treatment above the piano',
  },
  {
    source: 'studio-concept-03.jpeg',
    name: 'amp-detail',
    widths: [600, 900, 1206],
    note: 'Portrait detail — burgundy amplifier stack with a microphone in place',
  },
  {
    source: 'studio-concept-06.jpeg',
    name: 'corner-detail',
    // Trim a screenshot artifact at the top and a composite seam at the
    // bottom, and start below the upper amplifier head — its lettering is
    // rendered illegibly in the source and reads as an artifact at any size.
    crop: { top: 0.2, left: 0.0, width: 1.0, height: 0.6 },
    widths: [600, 706],
    note: 'Portrait detail — warm corner, candlelight, rug and outboard rack',
  },
]

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE_DIR = path.join(projectRoot, '.team-chouinard/design-references/studio')
const OUT_DIR = path.join(projectRoot, 'public/images/studio')

async function main() {
  let sharp: SharpFactory
  try {
    sharp = require('sharp') as SharpFactory
  } catch {
    console.error(
      'sharp is not installed. It is deliberately not a dependency:\n' +
        '  npm install --no-save sharp\n' +
        '  npx tsx scripts/derive-studio-images.ts',
    )
    process.exit(1)
  }

  await mkdir(OUT_DIR, { recursive: true })

  for (const derivative of DERIVATIVES) {
    const input = path.join(SOURCE_DIR, derivative.source)
    const base = sharp(input)
    const meta = await base.metadata()
    if (!meta.width || !meta.height) throw new Error(`Cannot read ${derivative.source}`)

    const region = derivative.crop
      ? {
          left: Math.round(derivative.crop.left * meta.width),
          top: Math.round(derivative.crop.top * meta.height),
          width: Math.round(derivative.crop.width * meta.width),
          height: Math.round(derivative.crop.height * meta.height),
        }
      : { left: 0, top: 0, width: meta.width, height: meta.height }

    console.log(
      `\n${derivative.source} ${meta.width}x${meta.height} -> ${derivative.name} ` +
        `(crop ${region.width}x${region.height})`,
    )

    for (const width of derivative.widths) {
      if (width > region.width) {
        console.log(`  skip ${width}w — would upscale beyond source`)
        continue
      }
      const height = Math.round((region.height / region.width) * width)

      for (const format of ['webp', 'jpeg'] as const) {
        const file = path.join(OUT_DIR, `${derivative.name}-${width}.${format === 'jpeg' ? 'jpg' : 'webp'}`)
        let pipeline = sharp(input).extract(region).resize({ width, withoutEnlargement: true })
        pipeline =
          format === 'webp'
            ? pipeline.webp({ quality: 72, effort: 6 })
            : pipeline.jpeg({ quality: 78, mozjpeg: true, progressive: true })
        await pipeline.toFile(file)
        const { size } = await stat(file)
        console.log(`  ${path.basename(file).padEnd(28)} ${width}x${height}  ${(size / 1024).toFixed(0)} KB`)
      }
    }
  }

  const files = (await readdir(OUT_DIR)).sort()
  let total = 0
  for (const file of files) total += (await stat(path.join(OUT_DIR, file))).size
  console.log(`\n${files.length} derivative files, ${(total / 1024).toFixed(0)} KB total`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

/**
 * Content validation.
 *
 * `next build` already fails on invalid content because parsing happens at
 * import time. This script gives the same guarantee a readable, standalone
 * report — useful when someone edits a record and wants a fast answer without
 * waiting for a full build.
 *
 *   npm run content:validate
 */

import {
  collections,
  curated,
  music,
  platforms,
  projects,
  stories,
  studioNotes,
  visible,
} from '../content/index.js'

const problems: string[] = []
const warnings: string[] = []

function check(condition: boolean, message: string): void {
  if (!condition) problems.push(message)
}

function warn(condition: boolean, message: string): void {
  if (!condition) warnings.push(message)
}

// Every visible story should be reachable from at least one collection, or it
// only ever appears in the flat catalog listing.
for (const story of visible(stories)) {
  warn(
    story.collections.length > 0,
    `Story "${story.slug}" is not in any collection — it will only appear in the full catalog.`,
  )
  warn(
    Boolean(story.preview),
    `Story "${story.slug}" has no preview record; the title page will show the fallback state.`,
  )
}

// A collection with nothing in it renders an empty state.
for (const collection of visible(collections)) {
  const count = visible(stories).filter((s) => s.collections.includes(collection.slug)).length
  warn(count > 0, `Collection "${collection.slug}" currently contains no visible titles.`)
}

// Available destinations must actually resolve somewhere.
for (const item of [...stories, ...music]) {
  for (const destination of item.destinations) {
    if (destination.status === 'available') {
      check(
        Boolean(destination.url?.startsWith('https://')),
        `"${item.slug}" → ${destination.platform}: available destinations must use https.`,
      )
    }
  }
}

// Curated items must credit a real external source.
for (const item of curated) {
  check(
    item.source.url.startsWith('https://'),
    `Curated item "${item.slug}" must link to an https source.`,
  )
}

const counts = {
  stories: stories.length,
  collections: collections.length,
  music: music.length,
  projects: projects.length,
  studioNotes: studioNotes.length,
  curated: curated.length,
  platforms: platforms.length,
}

const exampleCount = [...stories, ...collections, ...music, ...projects, ...studioNotes, ...curated]
  .filter((record) => record.origin === 'example').length

console.log('Chouinard Studios — content validation\n')
console.log('  Records:')
for (const [label, value] of Object.entries(counts)) {
  console.log(`    ${label.padEnd(14)} ${value}`)
}
console.log(`\n  ${exampleCount} record(s) marked as representative examples.`)

if (warnings.length > 0) {
  console.log('\n  Notes:')
  for (const warning of warnings) console.log(`    - ${warning}`)
}

if (problems.length > 0) {
  console.error('\n  Problems:')
  for (const problem of problems) console.error(`    ✗ ${problem}`)
  process.exit(1)
}

console.log('\n  All content valid.\n')

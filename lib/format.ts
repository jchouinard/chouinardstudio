/** Deterministic, locale-stable formatting so server and client output match. */

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

const dayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

function parseISODate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`)
}

export function formatMonth(iso: string): string {
  return monthFormatter.format(parseISODate(iso))
}

export function formatDay(iso: string): string {
  return dayFormatter.format(parseISODate(iso))
}

/** "8 hr 42 min" / "47 min" — for audiobook runtimes. */
export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (hours === 0) return `${rest} min`
  if (rest === 0) return `${hours} hr`
  return `${hours} hr ${rest} min`
}

/** "4:07" — for track and preview lengths. */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${String(secs).padStart(2, '0')}`
}

/** Stable non-cryptographic hash, used to pick generated artwork variants. */
export function hashString(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return Math.abs(hash)
}

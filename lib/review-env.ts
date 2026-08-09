import {
  productionHostnames,
  reviewVersions,
  thisVersionId,
  type ReviewVersion,
} from '@/content/review-versions'

/**
 * Review-environment detection.
 *
 * The switcher must never reach the public production experience, so this is a
 * real environment condition rather than CSS that merely hides the control.
 * Pure functions, unit tested, with production denial evaluated first and
 * unconditionally — no configuration or environment variable can override it.
 */

/** The public site. Always denied. */
export function isProductionHost(hostname: string): boolean {
  return productionHostnames.includes(hostname.trim().toLowerCase())
}

/**
 * Hosts where design review legitimately happens: the version subdomains,
 * Vercel deployment URLs, and local development.
 */
export function isReviewHost(hostname: string): boolean {
  const host = hostname.trim().toLowerCase()

  // Hard deny, evaluated first. Nothing below can re-enable it.
  if (isProductionHost(host)) return false

  if (/^v\d+\./.test(host)) return true
  if (host === 'localhost' || host === '127.0.0.1' || host === '[::1]') return true
  if (host.endsWith('.vercel.app')) return true

  return false
}

/**
 * Final decision.
 *
 * `override` comes from NEXT_PUBLIC_REVIEW_ENV and can force the control off
 * anywhere, or on for a host this module does not recognise — but never on a
 * production host.
 */
export function shouldShowSwitcher(hostname: string, override?: string | undefined): boolean {
  if (isProductionHost(hostname)) return false
  if (override === 'false') return false
  if (override === 'true') return true
  return isReviewHost(hostname)
}

/** Which version the visitor is currently looking at. */
export function resolveCurrentVersionId(hostname: string): string {
  const host = hostname.trim().toLowerCase()
  const matched = reviewVersions.find((version) => version.hostname === host)
  // Local and *.vercel.app hosts cannot be identified by name, so fall back to
  // the version this branch builds.
  return matched?.id ?? thisVersionId
}

export function getReviewVersions(): ReviewVersion[] {
  return reviewVersions
}

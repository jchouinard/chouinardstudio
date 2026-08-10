import { describe, expect, it } from 'vitest'

import {
  getReviewVersions,
  isProductionHost,
  isReviewHost,
  resolveCurrentVersionId,
  shouldShowSwitcher,
} from '@/lib/review-env'
import { productionHostnames, thisVersionId } from '@/content/review-versions'

describe('production denial', () => {
  it('never shows the switcher on a production host', () => {
    for (const host of productionHostnames) {
      expect(isProductionHost(host)).toBe(true)
      expect(isReviewHost(host)).toBe(false)
      expect(shouldShowSwitcher(host)).toBe(false)
    }
  })

  it('cannot be re-enabled on production by configuration', () => {
    // The override exists for unrecognised review hosts. It must not be a way
    // to put review infrastructure on the public site.
    for (const host of productionHostnames) {
      expect(shouldShowSwitcher(host, 'true')).toBe(false)
    }
  })

  it('is case and whitespace insensitive about production hosts', () => {
    expect(shouldShowSwitcher(' Chouinardstudio.COM ')).toBe(false)
    expect(shouldShowSwitcher('WWW.CHOUINARDSTUDIO.COM')).toBe(false)
  })

  it('does not treat a lookalike host as production-exempt or as review', () => {
    expect(shouldShowSwitcher('chouinardstudio.com.evil.example')).toBe(false)
    expect(shouldShowSwitcher('notchouinardstudio.com')).toBe(false)
  })
})

describe('review hosts', () => {
  it('enables on version subdomains', () => {
    for (const host of ['v1.chouinardstudio.com', 'v2.chouinardstudio.com', 'v9.chouinardstudio.com']) {
      expect(shouldShowSwitcher(host)).toBe(true)
    }
  })

  it('enables on Vercel deployment URLs and locally', () => {
    expect(shouldShowSwitcher('chouinardstudio-git-design-v2-x.vercel.app')).toBe(true)
    expect(shouldShowSwitcher('localhost')).toBe(true)
    expect(shouldShowSwitcher('127.0.0.1')).toBe(true)
  })

  it('stays off for unrecognised hosts unless explicitly enabled', () => {
    expect(shouldShowSwitcher('example.com')).toBe(false)
    expect(shouldShowSwitcher('example.com', 'true')).toBe(true)
  })

  it('can be forced off anywhere', () => {
    expect(shouldShowSwitcher('v2.chouinardstudio.com', 'false')).toBe(false)
    expect(shouldShowSwitcher('localhost', 'false')).toBe(false)
  })
})

describe('current version detection', () => {
  it('identifies the version from its own subdomain', () => {
    expect(resolveCurrentVersionId('v1.chouinardstudio.com')).toBe('v1')
    expect(resolveCurrentVersionId('v2.chouinardstudio.com')).toBe('v2')
    expect(resolveCurrentVersionId('chouinardstudio.com')).toBe('production')
  })

  it('falls back to the version this branch builds', () => {
    // Local and preview hosts cannot be identified by name.
    expect(resolveCurrentVersionId('localhost')).toBe(thisVersionId)
    expect(resolveCurrentVersionId('chouinardstudio-git-design-v2-x.vercel.app')).toBe(
      thisVersionId,
    )
  })
})

describe('version configuration', () => {
  const versions = getReviewVersions()

  it('defines production plus V1 through V4', () => {
    expect(versions.map((v) => v.id)).toEqual(['production', 'v1', 'v2', 'v3', 'v4'])
  })

  it('marks V3 and V4 unavailable until deployed', () => {
    expect(versions.find((v) => v.id === 'v3')?.available).toBe(false)
    expect(versions.find((v) => v.id === 'v4')?.available).toBe(false)
  })

  it('gives every version an https url matching its hostname', () => {
    for (const version of versions) {
      expect(version.url).toMatch(/^https:\/\//)
      expect(new URL(version.url).hostname).toBe(version.hostname)
      expect(version.label.length).toBeGreaterThan(0)
      expect(version.branch.length).toBeGreaterThan(0)
    }
  })

  it('has a current version that exists in the list', () => {
    expect(versions.some((v) => v.id === thisVersionId)).toBe(true)
  })
})

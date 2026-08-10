/**
 * Review environment configuration.
 *
 * The single place that knows which design versions exist and where they live.
 * Adding V3 is one entry edit here — no component changes anywhere.
 *
 * Each version is its own git branch deployed to its own subdomain, so the
 * versions never share a codebase and `main` stays the approved experience.
 */

export interface ReviewVersion {
  /** Stable identifier, also used to mark the current build. */
  id: string
  /** Short label shown in the switcher. */
  label: string
  /** Longer description for assistive technology and the title attribute. */
  description: string
  url: string
  /** Host this version is served from, used to detect the current version. */
  hostname: string
  /** False until the branch is deployed; renders disabled rather than linked. */
  available: boolean
  /** Documentation only — which branch feeds this destination. */
  branch: string
}

/**
 * The public production experience. The switcher is hard-denied on these
 * hosts and can never be enabled on them by configuration.
 */
export const productionHostnames = ['chouinardstudio.com', 'www.chouinardstudio.com']

export const reviewVersions: ReviewVersion[] = [
  {
    id: 'production',
    label: 'Production',
    description: 'The approved live experience',
    url: 'https://chouinardstudio.com',
    hostname: 'chouinardstudio.com',
    available: true,
    branch: 'main',
  },
  {
    id: 'v1',
    label: 'V1',
    description: 'Design V1 — frozen milestone',
    url: 'https://v1.chouinardstudio.com',
    hostname: 'v1.chouinardstudio.com',
    available: true,
    branch: 'archive/design-v1',
  },
  {
    id: 'v2',
    label: 'V2',
    description: 'Design V2 — refinement pass 1',
    url: 'https://v2.chouinardstudio.com',
    hostname: 'v2.chouinardstudio.com',
    available: true,
    branch: 'design/v2',
  },
  {
    id: 'v3',
    label: 'V3',
    description: 'Design V3 — not yet built',
    url: 'https://v3.chouinardstudio.com',
    hostname: 'v3.chouinardstudio.com',
    available: false,
    branch: 'design/v3',
  },
  {
    id: 'v4',
    label: 'V4',
    description: 'Design V4 — not yet built',
    url: 'https://v4.chouinardstudio.com',
    hostname: 'v4.chouinardstudio.com',
    available: false,
    branch: 'design/v4',
  },
]

/**
 * Which version this branch builds.
 *
 * Used to mark the current entry when the host does not identify it — running
 * locally, or on a `*.vercel.app` preview URL. Update this when branching a
 * new version.
 */
export const thisVersionId = 'v2'

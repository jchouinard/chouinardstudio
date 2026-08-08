/**
 * Vendor-neutral event abstraction.
 *
 * product-kb/ARCHITECTURE.md requires a lightweight, privacy-conscious event
 * layer that a future AI Support integration could consume WITHOUT this
 * application depending on AI Support code. So: a tiny typed surface with a
 * pluggable sink and no provider chosen.
 *
 * No provider is wired up, no network calls are made, no cookies are set and
 * no personal data is collected. Registering a sink is the only step needed
 * to start delivering events somewhere.
 */

export type StudioEvent =
  | { name: 'preview_play'; workType: 'story' | 'music'; slug: string }
  | { name: 'preview_complete'; workType: 'story' | 'music'; slug: string }
  | { name: 'destination_click'; workType: 'story' | 'music'; slug: string; platform: string }
  | { name: 'inquiry_started'; topic: string }
  | { name: 'curated_source_click'; slug: string }

export type EventSink = (event: StudioEvent, at: Date) => void

const sinks = new Set<EventSink>()

/** Register a delivery target. Returns an unsubscribe function. */
export function registerSink(sink: EventSink): () => void {
  sinks.add(sink)
  return () => {
    sinks.delete(sink)
  }
}

/** Record a behavioural signal. Never throws into calling UI code. */
export function track(event: StudioEvent): void {
  const at = new Date()

  for (const sink of sinks) {
    try {
      sink(event, at)
    } catch {
      // Analytics must never break the experience.
    }
  }

  if (process.env.NODE_ENV === 'development' && sinks.size === 0) {
    console.debug('[analytics]', event.name, event)
  }
}

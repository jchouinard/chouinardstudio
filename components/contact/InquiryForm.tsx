'use client'

import { useState } from 'react'

import { track } from '@/lib/analytics'
import { site } from '@/content/site'

/**
 * Inquiry composer.
 *
 * No backend, no third-party form service, no paid infrastructure — v1
 * explicitly avoids all three, and JOURNEY-SPINE.md only asks that a visitor
 * can submit a concise inquiry. This builds a well-structured email and hands
 * it to the visitor's mail client, so the path works on a fully static deploy.
 *
 * If volume later justifies a real endpoint, this component is the only thing
 * that changes.
 */

const topics = [
  'Collaboration',
  'Licensing',
  'Press',
  'Distribution',
  'Special project',
  'Something else',
] as const

const fieldClass =
  'w-full border border-ink-600 bg-ink-950 px-4 py-3 text-sm text-ivory-100 placeholder:text-ivory-500 focus:border-brass-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-brass-500'

const labelClass = 'block text-[0.68rem] uppercase tracking-[0.18em] text-ivory-400'

export function InquiryForm() {
  const [topic, setTopic] = useState<string>(topics[0])
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')

  const subject = `${topic} inquiry — ${site.name}`
  const body = [
    about.trim() || '[Describe your inquiry here]',
    '',
    '—',
    name.trim() ? `From: ${name.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  const mailto = `mailto:${site.inquiryEmail}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault()
        track({ name: 'inquiry_started', topic })
        window.location.href = mailto
      }}
    >
      <div>
        <label htmlFor="inquiry-topic" className={labelClass}>
          What is this about?
        </label>
        <select
          id="inquiry-topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          className={`${fieldClass} mt-3`}
        >
          {topics.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="inquiry-name" className={labelClass}>
          Your name
        </label>
        <input
          id="inquiry-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          className={`${fieldClass} mt-3`}
        />
      </div>

      <div>
        <label htmlFor="inquiry-about" className={labelClass}>
          A few lines about it
        </label>
        <textarea
          id="inquiry-about"
          rows={5}
          value={about}
          onChange={(event) => setAbout(event.target.value)}
          className={`${fieldClass} mt-3 resize-y`}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center border border-brass-600 bg-brass-600/10 px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-brass-300 transition-colors hover:border-brass-400 hover:bg-brass-500/20 hover:text-brass-200"
      >
        Compose this email
      </button>

      <p className="text-xs leading-relaxed text-ivory-500">
        This opens your own email application with the message prepared — nothing is submitted
        to this website. You can also write directly to{' '}
        <a
          href={`mailto:${site.inquiryEmail}`}
          className="border-b border-brass-700 text-brass-400 transition-colors hover:text-brass-300"
        >
          {site.inquiryEmail}
        </a>
        .
      </p>
    </form>
  )
}

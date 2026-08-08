import type { Metadata } from 'next'

import { InquiryForm } from '@/components/contact/InquiryForm'
import { PageHeader, Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Inquiries',
  description:
    'Collaborations, licensing, press and special projects with Chouinard Studios.',
}

/**
 * EXPERIENCE-CATALOG.md: a simple inquiry path that must not present service
 * packages, hourly rental or narrator-for-hire offerings. The "what we do not
 * offer" panel is there to set that expectation without sounding unwelcoming.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Inquiries"
        title="Tell us what you have in mind"
        intro="We are glad to hear from collaborators, authors, publishers, licensors, educators and press. Every inquiry is read by someone in the studio."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <h2 className="display-md">Get in touch</h2>
            <p className="lede mt-5 max-w-xl">
              A few sentences is plenty. The more specific you are about what you are hoping
              for, the faster we can tell you whether we are the right studio for it.
            </p>

            <div className="mt-10 max-w-xl">
              <InquiryForm />
            </div>
          </div>

          <aside className="space-y-8">
            <div className="border border-ink-700 bg-ink-850/40 p-7">
              <h2 className="eyebrow">Good reasons to write</h2>
              <ul className="mt-5 space-y-3 text-sm text-ivory-300">
                <li>Collaboration on music or storytelling work</li>
                <li>Licensing a Chouinard Studios recording</li>
                <li>Distribution and publishing conversations</li>
                <li>Press and interviews</li>
                <li>Selective outside production opportunities</li>
              </ul>
            </div>

            <div className="border border-ink-700 bg-ink-850/40 p-7">
              <h2 className="eyebrow">What we do not offer</h2>
              <ul className="mt-5 space-y-3 text-sm text-ivory-400">
                <li>Hourly studio rental</li>
                <li>Standardised production packages or a rate card</li>
                <li>Narration for hire</li>
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-ivory-500">
                Chouinard Studios is a production company that makes its own work. Outside
                opportunities are considered selectively rather than sold as a service.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}

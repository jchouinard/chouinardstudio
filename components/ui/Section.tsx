import Link from 'next/link'

export function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`relative mx-auto max-w-7xl px-6 py-20 sm:py-24 ${className}`}>
      {children}
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  link,
}: {
  eyebrow: string
  title: string
  intro?: string
  link?: { href: string; label: string }
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display-md mt-4">{title}</h2>
        {intro && <p className="lede mt-5">{intro}</p>}
      </div>

      {link && (
        <Link
          href={link.href}
          className="shrink-0 border-b border-brass-700 pb-1 text-[0.75rem] uppercase tracking-[0.18em] text-brass-400 transition-colors hover:border-brass-400 hover:text-brass-300"
        >
          {link.label}
        </Link>
      )}
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <header className="relative overflow-hidden border-b border-ink-700">
      <div
        className="light-pool light-pool--brass h-80 w-[32rem] opacity-50"
        style={{ right: '-10rem', top: '-14rem' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-lg mt-5 max-w-4xl">{title}</h1>
        {intro && <p className="lede mt-7 max-w-2xl">{intro}</p>}
      </div>
    </header>
  )
}

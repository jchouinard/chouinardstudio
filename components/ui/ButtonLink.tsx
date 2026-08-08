import Link from 'next/link'

type Variant = 'primary' | 'ghost'

const styles: Record<Variant, string> = {
  primary:
    'border-brass-600 bg-brass-600/10 text-brass-300 hover:border-brass-400 hover:bg-brass-500/20 hover:text-brass-200',
  ghost: 'border-ink-500 text-ivory-200 hover:border-ivory-400 hover:text-ivory-100',
}

const base =
  'inline-flex items-center justify-center border px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em] transition-colors duration-300'

export function ButtonLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
}) {
  return (
    <Link href={href} className={`${base} ${styles[variant]}`}>
      {children}
    </Link>
  )
}

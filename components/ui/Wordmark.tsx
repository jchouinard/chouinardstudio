import { site } from '@/content/site'

/**
 * Typographic wordmark. No logo asset exists yet; when one arrives it replaces
 * the contents of this single component.
 */
export function Wordmark({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const isLarge = size === 'lg'

  return (
    <span className="inline-flex flex-col leading-none">
      <span
        className={`font-display tracking-tight text-ivory-100 transition-colors duration-300 group-hover:text-brass-300 ${
          isLarge ? 'text-4xl sm:text-5xl' : 'text-xl sm:text-[1.375rem]'
        }`}
      >
        Chouinard
      </span>
      <span
        className={`font-sans uppercase text-brass-500 ${
          isLarge
            ? 'mt-2 text-sm tracking-[0.42em]'
            : 'mt-1 text-[0.55rem] tracking-[0.38em] sm:text-[0.6rem]'
        }`}
      >
        Studios
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  )
}

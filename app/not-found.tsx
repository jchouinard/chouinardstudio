import { ButtonLink } from '@/components/ui/ButtonLink'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="light-pool light-pool--oxblood h-[26rem] w-[26rem] opacity-60"
        style={{ left: '30%', top: '-10rem' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="eyebrow">404</p>
        <h1 className="display-lg mt-6">This one is not in the catalog</h1>
        <p className="lede mt-6">
          The page you were looking for does not exist, or has not been published yet.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/">Back to the studio</ButtonLink>
          <ButtonLink href="/stories" variant="ghost">
            Browse stories
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

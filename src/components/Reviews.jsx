import { reviews, brand } from '../data/restaurant'
import { Star, Quote, BadgeCheck } from 'lucide-react'

const rowA = reviews.filter((_, i) => i % 2 === 0)
const rowB = reviews.filter((_, i) => i % 2 === 1)

function Card({ r }) {
  return (
    <figure className="flex w-[300px] shrink-0 flex-col justify-between rounded-2xl border border-white/10 bg-coal p-6 transition-colors hover:border-ember/50 sm:w-[380px] sm:p-7">
      <div>
        <div className="flex items-center justify-between">
          <Quote className="text-ember" size={24} />
          {r.highlightDish && (
            <span className="rounded-full border border-ember/40 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-ember">
              {r.highlightDish}
            </span>
          )}
        </div>
        <blockquote className="mt-5 text-[15px] leading-relaxed text-white/90 sm:text-base">“{r.text}”</blockquote>
      </div>
      <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div className="min-w-0">
          <div className="truncate font-serif text-lg">{r.author}</div>
          <div className="mt-0.5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted">
            {r.badge && (
              <span className="inline-flex items-center gap-1 text-gold">
                <BadgeCheck size={11} /> {r.badge}
              </span>
            )}
            <span>{r.timeAgo}</span>
          </div>
        </div>
        <span className="flex shrink-0 text-gold" aria-label={`${r.rating} out of 5 stars`}>
          {Array.from({ length: r.rating }).map((_, i) => (
            <Star key={i} size={12} fill="currentColor" />
          ))}
        </span>
      </figcaption>
    </figure>
  )
}

function Row({ items, reverse = false, seconds }) {
  return (
    <div className="marquee group/row relative overflow-hidden py-2" data-lenis-prevent-wheel>
      <div
        className={`marquee-track flex w-max gap-5 ${reverse ? 'marquee-reverse' : ''}`}
        style={{ '--marquee-time': `${seconds}s` }}
      >
        {items.map((r) => (
          <Card key={r.id} r={r} />
        ))}
        {/* second copy makes the loop seamless; hidden from assistive tech */}
        {items.map((r) => (
          <div key={`dup-${r.id}`} aria-hidden="true" className="contents">
            <Card r={r} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-ink py-24 sm:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Verified on Google</p>
            <h2 className="mt-6 font-serif text-4xl font-medium sm:text-6xl">Said at the table.</h2>
          </div>
          <a
            href={brand.googleReviewHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-gold/30 bg-ash px-6 py-4 transition-colors hover:border-gold"
            aria-label={`${brand.rating} out of 5 on Google — read all reviews`}
          >
            <span className="font-mono text-5xl font-light text-gold">{brand.rating}</span>
            <div>
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">{brand.reviewCount} Google Reviews</p>
            </div>
          </a>
        </div>
      </div>

      <div className="marquee-mask mt-14 space-y-5 sm:mt-16">
        <Row items={rowA} seconds={70} />
        <Row items={rowB} reverse seconds={80} />
      </div>
    </section>
  )
}

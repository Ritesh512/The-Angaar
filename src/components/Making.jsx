import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { making } from '../data/restaurant'

export default function Making({ ready }) {
  const root = useRef(null)
  const video = useRef(null)

  // Only play while on screen — saves battery and data on phones.
  useEffect(() => {
    const el = video.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()),
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      gsap.from('.making-fact', {
        y: 30, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.making-facts', start: 'top 85%' },
      })
      gsap.from('.making-frame', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.making-frame', start: 'top 85%' },
      })
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section ref={root} id="making" className="relative bg-ink px-5 py-24 sm:px-10 sm:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">Behind the counter</p>
          <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] sm:text-6xl">
            Cooked fresh, <span className="italic text-ember">to order.</span>
          </h2>
          <ul className="making-facts mt-12 divide-y divide-white/10 border-y border-white/10">
            {making.facts.map(([big, small]) => (
              <li key={big} className="making-fact flex items-baseline justify-between gap-6 py-5">
                <span className="font-serif text-2xl sm:text-3xl">{big}</span>
                <span className="text-right text-sm text-muted">{small}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="making-frame mx-auto w-full max-w-[300px] overflow-hidden rounded-[2rem] border border-white/15 bg-coal shadow-[0_0_80px_-20px_rgba(255,87,34,.45)]">
          <video
            ref={video}
            src={making.video}
            poster={making.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="The Angaar kitchen at work"
            className="aspect-[9/16] w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

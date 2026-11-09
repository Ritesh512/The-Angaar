import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { promise, gallery } from '../data/restaurant'
import { Check } from 'lucide-react'

export default function Standards({ ready }) {
  const root = useRef(null)

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      gsap.from('.promise-item', {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.promise-list', start: 'top 85%' },
      })
      gsap.utils.toArray('.gallery-img').forEach((el) => {
        gsap.fromTo(
          el.querySelector('img'),
          { yPercent: -8 },
          { yPercent: 8, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section ref={root} id="promise" className="relative bg-ink px-5 py-24 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">What we eat, we serve</p>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-[1.1] sm:text-6xl">
          Real paneer. Real cheese. <span className="italic text-ember">No shortcuts.</span>
        </h2>

        <ul className="promise-list mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {promise.map((p) => (
            <li key={p.title} className="promise-item bg-coal p-6">
              <Check size={18} className="text-green-400" />
              <h3 className="mt-4 font-serif text-xl">{p.title}</h3>
              <p className="mt-1 text-sm text-muted">{p.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {gallery.map((g, i) => (
            <figure key={g.src} className={`gallery-img relative overflow-hidden rounded-2xl border border-white/10 ${i === 1 ? 'sm:mt-12' : ''}`}>
              <div className="aspect-[3/4] overflow-hidden">
                <img src={g.src} alt={g.alt} loading="lazy" className="h-[116%] w-full object-cover" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 font-mono text-[10px] uppercase tracking-widest text-white">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

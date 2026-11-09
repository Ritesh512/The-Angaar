import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { craftSteps } from '../data/restaurant'

export default function Craft({ ready }) {
  const root = useRef(null)
  const [open, setOpen] = useState(0)

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      gsap.from('.craft-line', {
        yPercent: 100,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.craft-head', start: 'top 80%' },
      })
      gsap.from('.craft-card', {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.craft-grid', start: 'top 85%' },
      })
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section ref={root} id="craft" className="relative bg-coal px-5 py-24 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">The Craft</p>
        <h2 className="craft-head mt-6 font-serif text-3xl font-medium leading-[1.15] sm:text-5xl lg:text-6xl">
          {[
            'Every marination starts the night before.',
            'Soya & fresh paneer rested in hung curd,',
            'yellow mustard, and Kashmiri deghi mirch —',
          ].map((l) => (
            <span key={l} className="block overflow-hidden">
              <span className="craft-line block">{l}</span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <span className="craft-line block italic text-ember">then kissed by live charcoal.</span>
          </span>
        </h2>

        <div className="craft-grid mt-16 grid gap-4 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4">
          {craftSteps.map((s, i) => {
            const active = open === i
            return (
              <button
                key={s.n}
                onClick={() => setOpen(i)}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                aria-pressed={active}
                className={`craft-card group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl border p-6 text-left transition-[border-color,background-color,box-shadow] duration-500 ${
                  active ? 'border-ember bg-ash shadow-[0_0_60px_-20px_#FF5722]' : 'border-white/10 bg-ink hover:border-white/30'
                }`}
              >
                <span className={`font-mono text-5xl font-light transition-colors ${active ? 'text-ember' : 'text-white/25'}`}>{s.n}</span>
                <div>
                  <h3 className="font-serif text-2xl font-bold">{s.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed text-muted transition-all duration-500 ${active ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 sm:max-h-40 sm:opacity-60'}`}>
                    {s.text}
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-gold">{s.detail}</p>
                </div>
                <span
                  className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-ember/30 blur-3xl transition-opacity duration-500"
                  style={{ opacity: active ? 1 : 0 }}
                />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

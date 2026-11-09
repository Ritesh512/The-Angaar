import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { signatures, garnish, brand, badges } from '../data/restaurant'
import Garnish from './Garnish'
import DeliveryButtons from './DeliveryButtons'
import { Star, ArrowDown } from 'lucide-react'

const N = signatures.length

export default function Showcase({ ready }) {
  const root = useRef(null)
  const stRef = useRef(null)
  const bar = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray('.dish-layer')
      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop: '(min-width: 768px)',
          mobile: '(max-width: 767px)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (c) => {
          const { desktop, reduce } = c.conditions
          const spread = desktop ? 1 : 0.55
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: () => `+=${window.innerHeight * (N - 1) * 1.1}`,
              pin: true,
              scrub: reduce ? true : 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                gsap.set(bar.current, { scaleX: self.progress })
                const i = Math.min(N - 1, Math.round(self.progress * (N - 1)))
                setActive((p) => (p === i ? p : i))
              },
            },
          })
          stRef.current = tl.scrollTrigger

          layers.forEach((layer, i) => {
            const word = layer.querySelector('.dish-word')
            const img = layer.querySelector('.dish-img')
            const text = layer.querySelector('.dish-text')
            const bits = layer.querySelectorAll('.bit')

            // Initial state: first layer is visible, others hidden.
            if (i !== 0) gsap.set(layer, { autoAlpha: 0 })

            // Enter (skipped for first layer — it's already on screen)
            if (i > 0) {
              const at = i - 0.5
              tl.fromTo(layer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, at)
                .fromTo(word, { yPercent: 40, scale: 0.9 }, { yPercent: 0, scale: 1, duration: 0.5 }, at)
                .fromTo(img, { scale: 0.6, rotate: -18, y: 80 }, { scale: 1, rotate: 0, y: 0, duration: 0.5 }, at)
                .fromTo(text, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, at + 0.1)
                .fromTo(
                  bits,
                  { x: 0, y: 0, opacity: 0, scale: 0.3 },
                  {
                    x: (k, el) => 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                  },
                  at,
                )
            }

            // Exit — garnish explodes outward in mid-air, everything fades.
            if (i < N - 1) {
              const at = i + 0.05
              tl.to(img, { scale: 1.12, rotate: 8, y: -40, duration: 0.45 }, at)
                .to(
                  bits,
                  {
                    x: (k, el) => parseFloat(el.dataset.x) * 9 * spread * parseFloat(el.dataset.depth),
                    y: (k, el) => parseFloat(el.dataset.y) * 9 * spread * parseFloat(el.dataset.depth),
                    rotate: (k, el) => parseFloat(el.dataset.rot) + 120,
                    scale: 1.3,
                    duration: 0.45,
                  },
                  at,
                )
                .to(word, { yPercent: -35, scale: 1.08, duration: 0.45 }, at)
                .to(text, { y: -30, opacity: 0, duration: 0.3 }, at)
                .to(layer, { autoAlpha: 0, duration: 0.3 }, at + 0.25)
            }
          })

          // Hold the final dish a little at the end.
          tl.to({}, { duration: 0.3 })

          // Subtle mouse parallax on desktop
          if (desktop && !reduce) {
            const onMove = (e) => {
              const nx = e.clientX / window.innerWidth - 0.5
              const ny = e.clientY / window.innerHeight - 0.5
              gsap.to('.parallax-wrap', { rotationY: nx * 8, rotationX: -ny * 6, duration: 0.8, ease: 'power3.out' })
            }
            root.current.addEventListener('pointermove', onMove)
            return () => root.current?.removeEventListener('pointermove', onMove)
          }
        },
      )
    }, root)

    return () => ctx.revert()
  }, [ready])

  // Touch swipe → jump to prev/next dish alongside normal scroll.
  useEffect(() => {
    const el = root.current
    if (!el) return
    let sx = 0, sy = 0
    const start = (e) => {
      sx = e.touches[0].clientX
      sy = e.touches[0].clientY
    }
    const end = (e) => {
      const st = stRef.current
      if (!st) return
      const dx = e.changedTouches[0].clientX - sx
      const dy = e.changedTouches[0].clientY - sy
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return
      const cur = Math.round(st.progress * (N - 1))
      const next = Math.max(0, Math.min(N - 1, cur + (dx < 0 ? 1 : -1)))
      if (next === cur) return
      const y = st.start + (st.end - st.start) * (next / (N - 1))
      if (window.__lenis) window.__lenis.scrollTo(y, { duration: 0.9 })
      else window.scrollTo({ top: y, behavior: 'smooth' })
    }
    el.addEventListener('touchstart', start, { passive: true })
    el.addEventListener('touchend', end, { passive: true })
    return () => {
      el.removeEventListener('touchstart', start)
      el.removeEventListener('touchend', end)
    }
  }, [])

  return (
    <section
      id="top"
      ref={root}
      className="relative h-screen w-full overflow-hidden bg-ink"
      style={{ height: '100svh', perspective: 1200 }}
      aria-label="Signature dishes"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_55%,rgba(255,87,34,.18),transparent_70%)]" />

      {/* top meta */}
      <div className="absolute inset-x-0 top-20 z-20 flex flex-col items-center gap-3 px-5 text-center sm:top-24">
        <p className="eyebrow">Charcoal · Tandoor · Pure Veg</p>
        <p className="font-serif text-sm italic text-muted sm:text-base">{brand.tagline}</p>
        <DeliveryButtons compact className="justify-center" />
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-muted">
          <span className="inline-flex items-center gap-1 text-gold">
            <Star size={12} fill="currentColor" /> {brand.rating} · {brand.reviewCount} Google Reviews
          </span>
          <span className="hidden sm:inline">{brand.priceRange}</span>
        </div>
      </div>

      {signatures.map((d, i) => (
        <article
          key={d.id}
          className={`dish-layer absolute inset-0 flex items-center justify-center ${i === 0 ? '' : 'invisible'}`}
          aria-hidden={active !== i}
        >
          {/* giant background word */}
          <div
            className="dish-word pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-serif text-[15vw] font-black leading-none outline-text md:text-[min(22vw,20rem)]"
          >
            {d.word}
          </div>

          <div className="parallax-wrap relative z-10 flex w-full max-w-7xl flex-col items-center gap-6 px-5 md:flex-row md:justify-between md:px-12" style={{ transformStyle: 'preserve-3d' }}>
            {/* text block */}
            <div className="dish-text order-2 text-center md:order-1 md:w-1/3 md:text-left">
              <div className="font-mono text-6xl font-light text-ember sm:text-8xl">{d.id}</div>
              <div className="eyebrow mt-2">{d.category}</div>
              <h2 className="mt-2 font-serif text-3xl font-bold leading-tight sm:text-5xl">{d.title}</h2>
              <div className="mt-3 font-mono text-2xl text-gold sm:text-3xl">₹{d.price}</div>
            </div>

            {/* centerpiece */}
            <div className="order-1 relative md:order-2 md:w-1/2">
              <div className="relative mx-auto aspect-square w-[min(62vw,44vh,460px)] md:w-[min(46vw,60vh,520px)]">
                {garnish.map((g, k) => (
                  <div
                    key={k}
                    className="bit absolute"
                    data-x={g.x}
                    data-y={g.y}
                    data-depth={g.depth}
                    data-rot={g.rot}
                    style={{
                      left: `${50 + g.x * 0.9}%`,
                      top: `${50 + g.y * 0.9}%`,
                      marginLeft: -g.size / 2,
                      marginTop: -g.size / 2,
                      rotate: `${g.rot}deg`,
                      zIndex: g.depth > 1.2 ? 30 : 5,
                    }}
                  >
                    <Garnish kind={g.kind} size={g.size * (window.innerWidth < 640 ? 0.6 : 1)} />
                  </div>
                ))}
                <div className="dish-img absolute inset-[8%] drift overflow-hidden rounded-full border border-ember/30 shadow-[0_0_120px_-10px_rgba(255,87,34,.55)]">
                  <img src={d.image} alt={d.title} style={{ objectPosition: d.focus || 'center' }} className="h-full w-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} draggable="false" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                </div>
              </div>
            </div>

            {/* spacer column for balance on desktop */}
            <div className="order-3 hidden md:block md:w-1/6" />
          </div>
        </article>
      ))}

      {/* badges */}
      <div className="absolute bottom-20 left-0 right-0 z-20 hidden flex-wrap justify-center gap-2 px-5 sm:flex">
        {badges.map((b) => (
          <span key={b.key} className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${b.key === 'veg' ? 'border-green-500/60 text-green-400' : 'border-white/15 text-muted'}`}>
            {b.key === 'veg' && <span className="mr-1.5 inline-block h-2 w-2 rounded-sm border border-green-500 bg-green-500/30 align-middle" />}
            {b.label}
          </span>
        ))}
      </div>

      {/* progress indicator */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-3 px-8">
        <div className="relative h-px w-full max-w-md bg-white/15">
          <div ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-ember to-gold" />
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          <span className="text-white">{String(active + 1).padStart(2, '0')}</span>/{String(N).padStart(2, '0')}
          <span className="mx-2">·</span>
          {active < N - 1 ? 'Scroll to serve the next dish' : 'Scroll on — the kitchen awaits'}
          <ArrowDown size={12} className="animate-bounce" />
        </div>
      </div>
    </section>
  )
}

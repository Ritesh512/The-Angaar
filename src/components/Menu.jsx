import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { menu, menuNotes, spiceLevels } from '../data/restaurant'
import { X, Flame as FlameIcon, AlertTriangle, UtensilsCrossed } from 'lucide-react'
import DeliveryButtons from './DeliveryButtons'

export default function Menu({ ready }) {
  const root = useRef(null)
  const preview = useRef(null)
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const [active, setActive] = useState(0)

  // Floating thumbnail that eases toward the cursor (fine pointers only).
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = preview.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e) => {
      xTo(e.clientX + 24)
      yTo(e.clientY - 110)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  useEffect(() => {
    if (!preview.current) return
    gsap.to(preview.current, {
      opacity: hovered ? 1 : 0,
      scale: hovered ? 1 : 0.85,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [hovered])

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.menu-cat').forEach((cat) => {
        gsap.from(cat.querySelectorAll('.menu-row'), {
          y: 30,
          opacity: 0,
          stagger: 0.06,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: cat, start: 'top 85%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [ready, active])

  // Modal: lock scroll + Esc to close.
  useEffect(() => {
    if (!selected) return
    window.__lenis?.stop()
    const onKey = (e) => e.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => {
      window.__lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [selected])

  return (
    <section ref={root} id="menu" className="relative bg-coal px-5 py-24 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow">The Whole Table</p>
        <h2 className="mt-6 font-serif text-4xl font-medium sm:text-6xl">The full ledger.</h2>
        <p className="mt-4 max-w-md text-sm text-muted">Everything is pure vegetarian. Tap a dish for allergens, heat and portion.</p>
        <DeliveryButtons compact className="mt-5" />

        {/* category tabs */}
        <div className="-mx-5 mt-12 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0" data-lenis-prevent-wheel>
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap" role="tablist" aria-label="Menu categories">
            {menu.map((c, i) => (
              <button
                key={c.category}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  active === i ? 'border-ember bg-ember text-ink' : 'border-white/15 text-muted hover:border-white/40 hover:text-white'
                }`}
              >
                {c.category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          {menu.map((cat, ci) =>
            ci !== active ? null : (
              <div key={cat.category} className="menu-cat" role="tabpanel">
                {cat.items.length > 0 && cat.items[0].prices.length > 1 && (
                  <div className="mb-2 flex justify-end gap-6 pr-1 font-mono text-[9px] uppercase tracking-widest text-muted">
                    {cat.items[0].prices.map(([l]) => (
                      <span key={l} className="w-14 text-right">{l}</span>
                    ))}
                  </div>
                )}
                <ul className="border-t border-white/10">
                  {cat.items.map((it, i) => (
                    <li key={it.name} className="menu-row border-b border-white/10">
                      <button
                        onClick={() => setSelected(it)}
                        onMouseEnter={() => setHovered(it)}
                        onMouseLeave={() => setHovered(null)}
                        className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-x-4 gap-y-1 py-4 text-left transition-colors hover:bg-white/[0.02] sm:py-5"
                      >
                        <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                        <span className="min-w-0">
                          <span className="block font-serif text-lg leading-snug transition-all duration-300 group-hover:translate-x-2 group-hover:text-ember sm:text-2xl">
                            {it.name}
                            {it.fav > 0 && (
                              <span className="ml-2 align-middle text-xs tracking-tighter text-gold" aria-label={`${it.fav} star favourite`}>
                                {'★'.repeat(it.fav)}
                              </span>
                            )}
                            {it.spice > 0 && (
                              <span className="ml-2 align-middle text-xs" aria-label={spiceLevels[it.spice]}>
                                {'🌶'.repeat(it.spice)}
                              </span>
                            )}
                          </span>
                          <span className="mt-1 block text-sm text-muted">{it.desc}</span>
                        </span>
                        <span className="flex gap-6 font-mono text-base text-gold sm:text-xl">
                          {it.prices.map(([l, v]) => (
                            <span key={l} className="w-14 text-right">₹{v}</span>
                          ))}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>

        <ul className="mt-12 space-y-1 font-mono text-[10px] uppercase tracking-widest text-muted">
          {menuNotes.map((n) => (
            <li key={n}>· {n}</li>
          ))}
        </ul>
      </div>

      {/* cursor-following preview (desktop) */}
      <div
        ref={preview}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-56 w-44 overflow-hidden rounded-xl border border-ember/40 opacity-0 shadow-2xl md:block"
      >
        {hovered && <img src={hovered.image} alt="" className="h-full w-full object-cover" />}
      </div>

      {/* detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.name}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative grid max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 bg-ash sm:rounded-3xl md:grid-cols-2"
            data-lenis-prevent
          >
            <button onClick={() => setSelected(null)} aria-label="Close" className="absolute right-4 top-4 z-10 rounded-full bg-ink/70 p-2 hover:bg-ember hover:text-ink">
              <X size={18} />
            </button>
            <img src={selected.image} alt={selected.name} className="h-56 w-full object-cover md:h-full" />
            <div className="p-6 sm:p-8">
              <p className="eyebrow">{selected.tags.join(' · ')}</p>
              <h3 className="mt-2 font-serif text-3xl font-bold">{selected.name}</h3>
              <p className="mt-1 flex flex-wrap gap-x-5 font-mono text-2xl text-gold">
                {selected.prices.map(([l, v]) => (
                  <span key={l}>{l && <span className="mr-1.5 text-xs uppercase tracking-widest text-muted">{l}</span>}₹{v}</span>
                ))}
              </p>
              <p className="mt-4 text-sm text-muted">{selected.desc}</p>

              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                    <FlameIcon size={12} /> Spice meter
                  </dt>
                  <dd>
                    <div className="flex gap-1.5" role="img" aria-label={`Spice level: ${spiceLevels[selected.spice]}`}>
                      {spiceLevels.map((l, i) => (
                        <span key={l} className={`h-1.5 flex-1 rounded-full ${i <= selected.spice ? 'bg-gradient-to-r from-saffron to-ember' : 'bg-white/10'}`} />
                      ))}
                    </div>
                    <span className="mt-1.5 block text-ember">{spiceLevels[selected.spice]}</span>
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                    <UtensilsCrossed size={12} /> Portion
                  </dt>
                  <dd>{selected.portion}</dd>
                </div>
                <div>
                  <dt className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                    <AlertTriangle size={12} /> Allergens
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {selected.allergens.length ? (
                      selected.allergens.map((a) => (
                        <span key={a} className="rounded-full bg-white/5 px-2.5 py-1 text-xs">{a}</span>
                      ))
                    ) : (
                      <span className="text-muted">None declared</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

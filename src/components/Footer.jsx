import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { brand, badges } from '../data/restaurant'
import { MessageCircle, Phone, MapPin, Banknote, Trees, CalendarCheck, Leaf } from 'lucide-react'
import { useIsOpen } from '../lib/useIsOpen'
import DeliveryButtons from './DeliveryButtons'

const badgeIcon = { veg: Leaf, cash: Banknote, reserve: CalendarCheck, outdoor: Trees }

export default function Footer({ ready }) {
  const root = useRef(null)
  const open = useIsOpen()

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      gsap.from('.foot-line', {
        yPercent: 110,
        stagger: 0.12,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
      })
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <footer ref={root} id="visit" className="relative overflow-hidden bg-coal px-5 pb-10 pt-24 sm:px-10 sm:pt-40">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_80%_at_50%_100%,rgba(255,87,34,.25),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="eyebrow">Reservations</p>
        <h2 className="mt-6 font-serif font-black leading-[0.95]" style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}>
          <span className="block overflow-hidden"><span className="foot-line block">Come smell</span></span>
          <span className="block overflow-hidden"><span className="foot-line block italic text-ember">the smoke.</span></span>
        </h2>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <a href={brand.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-ember">
            <MessageCircle size={16} /> Book via WhatsApp
          </a>
          <a href={brand.phoneHref} className="btn btn-ghost">
            <Phone size={16} /> Call: {brand.phoneDisplay}
          </a>
        </div>

        <div className="mt-10">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted">Can't make it? Get it delivered</p>
          <DeliveryButtons />
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <address className="rounded-2xl border border-white/10 bg-ink/70 p-7 not-italic backdrop-blur">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ember">
              <MapPin size={14} /> Find us
            </div>
            <p className="mt-4 font-serif text-xl leading-snug sm:text-2xl">{brand.address}</p>
            <p className="mt-4 font-mono text-xs text-muted">
              Party &amp; bulk orders: <a className="text-gold underline-offset-4 hover:underline" href={brand.phone2Href}>{brand.phone2Display}</a>
              {' · '}
              <a className="text-gold underline-offset-4 hover:underline" href={brand.instagramHref} target="_blank" rel="noreferrer">@{brand.instagramHandle}</a>
            </p>
            <a href={brand.mapsHref} target="_blank" rel="noreferrer" className="btn btn-ghost mt-6 !py-3">
              Open in Google Maps →
            </a>
          </address>

          <div className="rounded-2xl border border-white/10 bg-ink/70 p-7 backdrop-blur">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span className={`h-2 w-2 rounded-full ${open ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500'}`} />
              {open ? 'Open now · closes 11:30 PM' : 'Closed now · opens 11:00 AM'}
            </div>
            <ul className="mt-5 space-y-3">
              {badges.map((b) => {
                const Icon = badgeIcon[b.key]
                return (
                  <li key={b.key} className={`flex items-center gap-3 text-sm ${b.key === 'veg' ? 'text-green-400' : ''}`}>
                    <Icon size={16} className={b.key === 'veg' ? 'text-green-400' : 'text-gold'} /> {b.label}
                  </li>
                )
              })}
            </ul>
            <p className="mt-5 border-t border-white/10 pt-4 text-xs text-muted">We accept all payment modes — cash, cards and UPI.</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-widest text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} The Angaar · {brand.tagline}</span>
          <span>{brand.priceRange}</span>
        </div>
      </div>
    </footer>
  )
}

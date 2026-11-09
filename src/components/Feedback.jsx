import { useState } from 'react'
import { Star, MessageCircle } from 'lucide-react'
import { brand } from '../data/restaurant'

export default function Feedback() {
  const [state, setState] = useState('idle') // idle | opened
  const [type, setType] = useState('Suggestion')

  function onSubmit(e) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('botcheck')) return // honeypot
    const name = f.get('name') || 'Anonymous'
    const contact = f.get('contact') || '—'
    // The whole message is pre-filled in the chat; the visitor only has to tap Send.
    const text = `${type} for The Angaar\n\n${f.get('message')}\n\n— ${name} (${contact})`
    window.open(`https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    setState('opened')
    e.target.reset()
  }

  return (
    <section id="feedback" className="relative bg-coal px-5 py-24 sm:px-10 sm:py-40">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <p className="eyebrow">Tell us how we did</p>
          <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] sm:text-6xl">
            Loved it? <span className="italic text-ember">Or didn't?</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
            Public praise helps others find us — leave a review on Google. Something to fix or an idea for the menu?
            Message us privately on WhatsApp and it goes straight to the owners.
          </p>
          <a href={brand.googleReviewHref} target="_blank" rel="noreferrer" className="btn btn-ember mt-8">
            <Star size={16} fill="currentColor" /> Rate us on Google
          </a>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-ink p-6 sm:p-8">
          <div className="flex gap-2" role="radiogroup" aria-label="Type of message">
            {['Suggestion', 'Complaint', 'Compliment'].map((t) => (
              <button
                type="button"
                key={t}
                role="radio"
                aria-checked={type === t}
                onClick={() => setType(t)}
                className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  type === t ? 'border-ember bg-ember text-ink' : 'border-white/15 text-muted hover:border-white/40'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* honeypot: hidden from people, bots fill it */}
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Name (optional)</span>
              <input name="name" autoComplete="name" className="mt-2 w-full rounded-lg border border-white/15 bg-coal px-4 py-3 text-sm outline-none transition-colors focus:border-ember" />
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Phone or email (optional)</span>
              <input name="contact" autoComplete="off" className="mt-2 w-full rounded-lg border border-white/15 bg-coal px-4 py-3 text-sm outline-none transition-colors focus:border-ember" />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Your message</span>
            <textarea name="message" required minLength={5} rows={5} className="mt-2 w-full resize-none rounded-lg border border-white/15 bg-coal px-4 py-3 text-sm outline-none transition-colors focus:border-ember" />
          </label>

          <button type="submit" className="btn btn-ember mt-6 w-full">
            <MessageCircle size={16} /> Send on WhatsApp
          </button>
          <p className="mt-3 min-h-[1.25rem] text-xs text-muted" aria-live="polite">
            {state === 'opened' && 'WhatsApp opened with your message ready — just tap Send there. Nothing to re-type.'}
          </p>
        </form>
      </div>
    </section>
  )
}

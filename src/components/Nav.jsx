import { Phone, MessageCircle } from 'lucide-react'
import { brand } from '../data/restaurant'
import { useIsOpen } from '../lib/useIsOpen'

export default function Nav() {
  const open = useIsOpen()
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-10">
      <a href="#top" className="flex items-center gap-2" aria-label="The Angaar home">
        <img src={brand.logo} alt="The Angaar logo" className="h-11 w-11 rounded-full object-cover ring-1 ring-ember/40 sm:h-12 sm:w-12" />
        <span className="hidden font-serif text-xl font-bold tracking-tight sm:inline">The Angaar</span>
      </a>

      <div className="flex items-center gap-2 sm:gap-3">
        <span
          className="hidden items-center gap-2 rounded-full border border-white/15 bg-ink/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest backdrop-blur md:inline-flex"
          aria-live="polite"
        >
          <span className={`h-2 w-2 rounded-full ${open ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500'}`} />
          {open ? 'Open · Closes 11:30 PM' : 'Closed now'}
        </span>
        <a href={brand.phoneHref} className="btn btn-ghost !px-4 !py-2.5" aria-label="Call The Angaar">
          <Phone size={14} /> <span className="hidden sm:inline">Call</span>
        </a>
        <a href={brand.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-ember !px-4 !py-2.5">
          <MessageCircle size={14} /> <span className="hidden sm:inline">Reserve</span>
        </a>
      </div>
    </header>
  )
}

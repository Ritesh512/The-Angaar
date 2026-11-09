import { ExternalLink } from 'lucide-react'
import { delivery } from '../data/restaurant'

export default function DeliveryButtons({ className = '', compact = false }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {delivery.map((d) => (
        <a
          key={d.key}
          href={d.href}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-2 rounded-full border font-mono uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 ${
            compact ? 'px-3 py-1.5 text-[10px]' : 'px-6 py-3.5 text-xs'
          }`}
          style={{ borderColor: d.color, color: d.color }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = d.color
            e.currentTarget.style.color = '#0a0a0a'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = d.color
          }}
        >
          {d.label}
          {!compact && <ExternalLink size={14} />}
        </a>
      ))}
    </div>
  )
}

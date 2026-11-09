import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { brand } from '../data/restaurant'

export default function Preloader({ onDone }) {
  const root = useRef(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const counter = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        onDone?.()
      },
    })
    tl.to(counter, {
      v: 100,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: () => setPct(Math.round(counter.v)),
    })
      .to('.pre-content', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' })
      .to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.1')
      .set(root.current, { display: 'none' })

    return () => tl.kill()
  }, [onDone])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      role="status"
      aria-label={`Loading ${pct} percent`}
    >
      <div className="pre-content flex flex-col items-center gap-6">
        <img src={brand.logo} alt="" className="h-28 w-28 rounded-full object-cover ring-1 ring-ember/50 sm:h-36 sm:w-36" />
        <div className="font-mono text-6xl font-light tabular-nums tracking-tight sm:text-8xl">
          {String(pct).padStart(2, '0')}
          <span className="text-ember">%</span>
        </div>
        <div className="eyebrow">The Angaar · lighting the coals</div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-ember to-gold"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

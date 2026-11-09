import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/gsap'
import { useLenis } from './lib/useLenis'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Showcase from './components/Showcase'
import Craft from './components/Craft'
import Standards from './components/Standards'
import Making from './components/Making'
import Feedback from './components/Feedback'
import Menu from './components/Menu'
import Reviews from './components/Reviews'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  useLenis(true)

  // Hold scroll while the preloader runs.
  useEffect(() => {
    document.documentElement.style.overflow = ready ? '' : 'hidden'
  }, [ready])

  const onDone = useCallback(() => setReady(true), [])

  // Recalculate pin distances once images/fonts have settled.
  useEffect(() => {
    if (!ready) return
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    const t = setTimeout(refresh, 600)
    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(t)
    }
  }, [ready])

  return (
    <div className="grain">
      {!ready && <Preloader onDone={onDone} />}
      <Nav />
      <main>
        <Showcase ready={ready} />
        <Craft ready={ready} />
        <Standards ready={ready} />
        <Making ready={ready} />
        <Menu ready={ready} />
        <Reviews />
        <Feedback />
      </main>
      <Footer ready={ready} />
    </div>
  )
}

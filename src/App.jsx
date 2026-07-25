import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Preloader from './components/Preloader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import WhoAmI from './components/WhoAmI.jsx'
import TechStack from './components/TechStack.jsx'
import Certificates from './components/Certificates.jsx'
import Services from './components/Services.jsx'
import Changelog from './components/Changelog.jsx'
import Portfolio from './components/Portfolio.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import VqModal from './components/VqModal.jsx'

export default function App() {
  // Preloader nur beim ersten Laden der Sitzung zeigen
  const [booted, setBooted] = useState(
    () => sessionStorage.getItem('erniez28-booted') === '1'
  )

  // Smooth Inertia Scrolling (Lenis)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {!booted && <Preloader onDone={() => setBooted(true)} />}
      <Navbar />
      <Hero started={booted} />
      <main>
        <WhoAmI />
        <TechStack />
        <Certificates />
        <Services />
        <Changelog />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <VqModal />
    </>
  )
}

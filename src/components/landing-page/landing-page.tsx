"use client"

import { useState } from 'react'
import Header from './header'
import Hero from './hero'
import Features from './features'
import OnlinePresence from './online-presence'
import MarqueeSection from './marquee-section'
import Services from './services'
import Projects from './projects'
import FAQ from './faq'
import CallToAction from './call-to-action'
import Footer from './footer'

export  function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
      <div className="min-h-screen bg-white font-['Gothic_A1',sans-serif]">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Hero />
        <Features />
        <OnlinePresence />
        <MarqueeSection />
        <Services />
        <Projects />
        <FAQ />
        <CallToAction />
        <Footer />
      </div>
  )
}
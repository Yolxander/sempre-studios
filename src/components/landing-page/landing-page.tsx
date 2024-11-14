'use client'

import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Poppins } from "next/font/google"

// Dynamically import components
const Header = dynamic(() => import('./header'), { ssr: true })
const Hero = dynamic(() => import('./hero'), { ssr: true })
const Services = dynamic(() => import('./services'), { ssr: false })
const OnlinePresence = dynamic(() => import('./online-presence'), { ssr: false })
const MarqueeSection = dynamic(() => import('./marquee-section'), { ssr: false })
const Features = dynamic(() => import('./features'), { ssr: false })
const Projects = dynamic(() => import('./projects'), { ssr: false })
const FunAboutSection = dynamic(() => import('@/components/demo/fun-about-section'), { ssr: false })
const FAQ = dynamic(() => import('./faq'), { ssr: false })
const CallToAction = dynamic(() => import('./call-to-action'), { ssr: false })
const Footer = dynamic(() => import('./footer'), { ssr: true })

const poppins = Poppins({
    weight: ["400", "300"],
    subsets: ["latin"],
})

function LoadingFallback() {
    return <div className="w-full h-24 flex items-center justify-center">Loading...</div>
}

export function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className={`${poppins.className} min-h-screen font-['Gothic_A1',sans-serif] overflow-x-hidden scroll-smooth bg-gray-100`}>
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <section id="hero">
                <Hero />
            </section>
            <Suspense fallback={<LoadingFallback />}>
                <section id="services">
                    <Services />
                </section>
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
                <section id="online-presence">
                    <OnlinePresence />
                </section>
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
                <section id="marquee">
                    <MarqueeSection />
                </section>
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
                <section id="features">
                    <Features />
                </section>
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
                <section id="projects">
                    <Projects />
                </section>
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
                <section id="about">
                    <FunAboutSection />
                </section>
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
                <section id="faq">
                    <FAQ />
                </section>
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
                <section id="call-to-action">
                    <CallToAction />
                </section>
            </Suspense>
            <Footer />
        </div>
    )
}
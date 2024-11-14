"use client";

import { useState } from 'react';
import Header from './header';
import Hero from './hero';
import Features from './features';
import OnlinePresence from './online-presence';
import MarqueeSection from './marquee-section';
import Services from './services';
import Projects from './projects';
import FAQ from './faq';
import CallToAction from './call-to-action';
import Footer from './footer';
import { Poppins } from "@next/font/google";

const poppins = Poppins({
    weight: ["400", "300"],
    subsets: ["latin"],
});

export function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={`${poppins.className} min-h-screen font-['Gothic_A1',sans-serif] overflow-x-hidden scroll-smooth bg-gray-100`}>
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <section id="hero">
                <Hero />
            </section>
            <section id="services">
                <Services />
            </section>
            <section id="online-presence">
                <OnlinePresence />
            </section>
            <section id="marquee">
                <MarqueeSection />
            </section>
            <section id="features">
                <Features />
            </section>
            <section id="projects">
                <Projects />
            </section>
            <section id="faq">
                <FAQ />
            </section>
            <section id="call-to-action">
                <CallToAction />
            </section>
            <Footer />
        </div>
    );
}

"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, ReactNode } from "react"
import { Rocket, Palette, Zap } from 'lucide-react'

interface AnimatedCardProps {
    children: ReactNode
    className?: string
}

function AnimatedCard({ children, className }: AnimatedCardProps) {
    const cardRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])

    return (
        <motion.div
            ref={cardRef}
            style={{ y, opacity }}
            className={`${className} bg-white rounded-3xl shadow-md relative overflow-hidden h-full`}
        >
            {children}
        </motion.div>
    )
}

export default function Features() {

    return (
        <section className="bg-gray-100 py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Our Process</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatedCard>
                        <div className="p-8 h-full flex flex-col">
                            <div className="mb-6">
                                <Palette className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Custom Design</h3>
                            <p className="text-gray-600">We create a tailored demo site that perfectly aligns with your brand and business goals.</p>
                        </div>
                    </AnimatedCard>

                    <AnimatedCard>
                        <div className="p-8 h-full flex flex-col">
                            <div className="mb-6">
                                <Zap className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Instant Preview</h3>
                            <p className="text-gray-600">Experience your new website instantly with our rapid preview technology.</p>
                        </div>
                    </AnimatedCard>

                    <AnimatedCard>
                        <div className="p-8 h-full flex flex-col">
                            <div className="mb-6">
                                <Rocket className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Quick Launch</h3>
                            <p className="text-gray-600">Go live with your new site immediately and receive ongoing support to keep your online presence thriving.</p>
                        </div>
                    </AnimatedCard>
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to elevate your online presence?</h3>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className="text-gray-600 mb-8">Let's create a website that truly represents your brand and drives results.</p>
                    <button className="bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-primary/90 transition duration-300">
                        Get Started Today
                    </button>
                </div>
            </div>
        </section>
    )
}
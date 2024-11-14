'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerChildren } from './demo-access-catalog'

interface HeroSectionProps {
    audiowide: { className: string }
}

export default function HeroSectionComponent({ audiowide }: HeroSectionProps) {
    return (
        <motion.section
            className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 md:py-24 lg:py-32"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
        >
            <div className="container mx-auto px-4">
                <motion.h1
                    className={`${audiowide.className} text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-center`}
                    variants={fadeInUp}
                >
                    Welcome to Sempre Studios Demo Portal
                </motion.h1>
                <motion.p
                    className="text-lg sm:text-xl md:text-2xl text-center mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto"
                    variants={fadeInUp}
                >
                    Access your custom-built site or explore our demo catalog to see how we can transform your online presence
                </motion.p>
                <motion.div
                    className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                    variants={fadeInUp}
                >
                    <Button variant="secondary" size="lg" asChild className="bg-black text-white hover:bg-gray-800 rounded-full text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                        <Link href="#customer-access">Access Your Site</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="rounded-full bg-[#F3F2EF] border-[2px] shadow-md text-black text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                        <Link href="#demo-catalog">Explore Demos</Link>
                    </Button>
                </motion.div>
            </div>
        </motion.section>
    )
}
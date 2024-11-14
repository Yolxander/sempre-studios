"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerChildren } from './demo-access-catalog'

interface HeroSectionProps {
    audiowide: any // Replace 'any' with the actual type from the font import
}

export default function HeroSectionComponent({ audiowide }: HeroSectionProps) {
    return (
        <motion.section 
            className="bg-gradient-to-r from-primary to-primary-dark text-white py-32"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
        >
            <div className="container mx-auto px-4">
                <motion.h1 
                    className={`${audiowide.className} text-6xl font-bold mb-8 text-center`}
                    variants={fadeInUp}
                >
                    Welcome to Sempre Studios Demo Portal
                </motion.h1>
                <motion.p 
                    className="text-2xl text-center mb-16 max-w-3xl mx-auto"
                    variants={fadeInUp}
                >
                    Access your custom-built site or explore our demo catalog to see how we can transform your online presence
                </motion.p>
                <motion.div 
                    className="flex justify-center space-x-6"
                    variants={fadeInUp}
                >
                    <Button variant="secondary" size="lg" asChild className="bg-black text-white hover:bg-gray-800 rounded-full text-lg px-8 py-6">
                        <Link href="#customer-access">Access Your Site</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="rounded-full bg-[#F3F2EF] border-[2px] shadow-md text-black text-lg px-8 py-6">
                        <Link href="#demo-catalog">Explore Demos</Link>
                    </Button>
                </motion.div>
            </div>
        </motion.section>
    )
}
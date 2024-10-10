"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Audiowide } from "next/font/google"

const audiowide = Audiowide({
    weight: "400",
    subsets: ["latin"],
})

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <header className="md:px-12 px-4 py-6 bg-white min-w-screen">
            <div className="flex items-center justify-between">
                <Link href="/" className={`${audiowide.className} text-2xl font-bold`}>
                    Sempre Studios
                </Link>
                <nav className="hidden md:block bg-white rounded-full shadow-md px-6 py-2">
                    <ul className="flex space-x-6">
                        <li><Link href="#services" className="text-gray-600 hover:text-gray-900">Services</Link></li>
                        <li><Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link></li>
                        <li><Link href="#projects" className="text-gray-600 hover:text-gray-900">Projects</Link></li>
                        <li><Link href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
                        <li><Link href="#call-to-action" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                    </ul>
                </nav>
                <div className="hidden md:flex items-center space-x-6 mr-6">
                    <Link href="/cms" className="text-gray-600 hover:text-gray-900"></Link>
                    <Link href="https://calendly.com/hello-semprestudios/30min" passHref>
                        <Button variant="outline" className="rounded-full">Get Started</Button>
                    </Link>
                </div>
                <button className="md:hidden relative z-50" onClick={toggleMenu}>
                    <motion.div
                        className="h-1 w-6 bg-black rounded"
                        animate={{
                            rotate: isMenuOpen ? 45 : 0,
                            translateY: isMenuOpen ? 6 : 0
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.div
                        className="h-1 w-6 bg-black rounded my-1"
                        animate={{
                            opacity: isMenuOpen ? 0 : 1
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.div
                        className="h-1 w-6 bg-black rounded"
                        animate={{
                            rotate: isMenuOpen ? -45 : 0,
                            translateY: isMenuOpen ? -6 : 0
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </button>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center"
                    >
                        <ul className="flex flex-col space-y-4 text-lg">
                            <li><Link href="#services" className="text-gray-600 hover:text-gray-900 ml-6">Services</Link></li>
                            <li><Link href="#features" className="text-gray-600 hover:text-gray-900 ml-6">Features</Link></li>
                            <li><Link href="#projects" className="text-gray-600 hover:text-gray-900 ml-6">Projects</Link></li>
                            <li><Link href="#faq" className="text-gray-600 hover:text-gray-900 ml-6">FAQ</Link></li>
                            <li><Link href="#call-to-action" className="text-gray-600 hover:text-gray-900 ml-6">Contact</Link></li>
                            <li>
                                <Link href="https://calendly.com/hello-semprestudios/30min" passHref>
                                    <Button variant="outline" className="rounded-full w-full text-[20px] text-gray-600">Get Started</Button>
                                </Link>
                            </li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    )
}
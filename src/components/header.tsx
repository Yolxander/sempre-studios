"use client"

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

interface HeaderProps {
    isMenuOpen: boolean
    setIsMenuOpen: (isOpen: boolean) => void
    audiowide: any // Replace 'any' with the actual type from the font import
}

export default function HeaderComponent({ isMenuOpen, setIsMenuOpen, audiowide }: HeaderProps) {
    return (
        <motion.header 
            className="md:px-12 px-4 py-6 bg-[#F3F2EF] min-w-screen"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center justify-between">
                <Link href="/" className={`${audiowide.className} text-2xl font-bold`}>
                    Sempre Studios
                </Link>
                <nav className="hidden md:block bg-white rounded-full shadow-md px-6 py-2">
                    <ul className="flex space-x-6">
                        <li><Link href="#customer-access" className="text-gray-600 hover:text-gray-900">Access Your Site</Link></li>
                        <li><Link href="#demo-catalog" className="text-gray-600 hover:text-gray-900">Demo Catalog</Link></li>
                        <li><Link href="#request-callback" className="text-gray-600 hover:text-gray-900">Request a Call</Link></li>
                    </ul>
                </nav>
                <div className="hidden md:flex items-center space-x-6 mr-6">
                    <Link href="https://calendly.com/hello-semprestudios/30min" passHref>
                        <Button variant="outline" className="rounded-full bg-[#F3F2EF] border-[2px] shadow-md">Get Started</Button>
                    </Link>
                </div>
                <button className="md:hidden relative z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                            <li>
                                <Link href="#customer-access" className="text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Access Your Site</Link>
                            </li>
                            <li>
                                <Link href="#demo-catalog" className="text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Demo Catalog</Link>
                            </li>
                            <li>
                                <Link href="#request-callback" className="text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Request a Call</Link>
                            </li>
                            <li>
                                <Link href="https://calendly.com/hello-semprestudios/30min" passHref>
                                    <Button variant="outline" className="rounded-full w-full text-[20px] text-gray-600 shadow-md" onClick={() => setIsMenuOpen(false)}>
                                        Get Started
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
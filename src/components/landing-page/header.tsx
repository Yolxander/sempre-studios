"use client";

import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Audiowide } from "next/font/google";

// Define the prop types
interface HeaderProps {
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const audiowide = Audiowide({
    weight: "400",
    subsets: ["latin"],
});

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Close the menu when a link is clicked
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="md:px-12 px-4 py-6 bg-[#F3F2EF] min-w-screen">
            <div className="flex items-center justify-between">
                <Link href="/" className={`${audiowide.className} text-2xl font-bold`}>
                    Sempre Studios
                </Link>
                {/* Desktop Navigation */}
                <nav className="hidden md:block bg-white rounded-full shadow-md px-6 py-2">
                    <ul className="flex space-x-6">
                        <li><Link href="#services" className="text-gray-600 hover:text-gray-900">Services</Link></li>
                        <li><Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link></li>
                        <li><Link href="#projects" className="text-gray-600 hover:text-gray-900">Projects</Link></li>
                        <li><Link href="#about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                        <li><Link href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
                        <li><Link href="#call-to-action" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                    </ul>
                </nav>
                {/* Desktop Call-to-Action */}
                <div className="hidden md:flex items-center space-x-6 mr-6">
                    <Link href="/cms" className="text-gray-600 hover:text-gray-900"></Link>
                    <Link href="https://calendly.com/hello-semprestudios/30min" passHref>
                        <Button variant="outline" className="rounded-full">Get Started</Button>
                    </Link>
                </div>
                {/* Hamburger Menu Button */}
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
            {/* Mobile Menu */}
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
                                <Link href="#services" className="text-gray-600 hover:text-gray-900  ml-6" onClick={closeMenu}>Services</Link>
                            </li>
                            <li>
                                <Link href="#features" className="text-gray-600 hover:text-gray-900  ml-6" onClick={closeMenu}>Features</Link>
                            </li>
                            <li>
                                <Link href="#projects" className="text-gray-600 hover:text-gray-900  ml-6" onClick={closeMenu}>Projects</Link>
                            </li>
                            <li>
                                <Link href="#about" className="text-gray-600 hover:text-gray-900  ml-6" onClick={closeMenu}>About Us</Link>
                            </li>
                            <li>
                                <Link href="#faq" className="text-gray-600 hover:text-gray-900  ml-6" onClick={closeMenu}>FAQ</Link>
                            </li>
                            <li>
                                <Link href="#call-to-action" className="text-gray-600 hover:text-gray-900  ml-6" onClick={closeMenu}>Contact</Link>
                            </li>
                            <li>
                                <Link href="https://calendly.com/hello-semprestudios/30min" passHref>
                                    <Button variant="outline" className="rounded-full w-full text-[20px] text-gray-600 shadow-md" onClick={closeMenu}>
                                        Get Started
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}

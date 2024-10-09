import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { motion } from "framer-motion"
import { Audiowide } from "@next/font/google";
import { Dispatch, SetStateAction } from 'react';

const audiowide = Audiowide({
    weight: "400",
    subsets: ["latin"],
});

interface HeaderProps {
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
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
                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>
            {isMenuOpen && (
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden mt-4"
                >
                    <ul className="flex flex-col space-y-2">
                        <li><Link href="#services" className="text-gray-600 hover:text-gray-900">Services</Link></li>
                        <li><Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link></li>
                        <li><Link href="#projects" className="text-gray-600 hover:text-gray-900">Projects</Link></li>
                        <li><Link href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
                        <li><Link href="#call-to-action" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                        <li><Button variant="outline" className="rounded-full w-full">Get Started</Button></li>
                    </ul>
                </motion.nav>
            )}
        </header>
    )
}

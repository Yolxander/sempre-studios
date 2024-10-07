import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { motion } from "framer-motion"
import {Audiowide} from "@next/font/google";

const audiowide = Audiowide({
    weight: "400", // Audiowide only has a 400 weight
    subsets: ["latin"],
});
export default function Header({ isMenuOpen, setIsMenuOpen }) {
    return (
        <header className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
                <Link href="/" className={`${audiowide.className} text-2xl font-bold`}>
                    Sempre Studios
                </Link>
                <nav className="hidden md:block bg-white rounded-full shadow-md px-6 py-2">
                    <ul className="flex space-x-6">
                        <li><Link href="#" className="text-gray-600 hover:text-gray-900">Services</Link></li>
                        <li><Link href="#" className="text-gray-600 hover:text-gray-900">About</Link></li>
                        <li><Link href="#" className="text-gray-600 hover:text-gray-900">Projects</Link></li>
                        <li><Link href="#" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
                        <li><Link href="#" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                    </ul>
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="#" className="text-gray-600 hover:text-gray-900">Log in</Link>
                    <Button variant="outline" className="rounded-full">Get Started</Button>
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
                        <li><Link href="#" className="text-gray-600 hover:text-gray-900">Services</Link></li>
                        <li><Link href="#" className="text-gray-600 hover:text-gray-900">About</Link></li>
                        <li><Link href="#" className="text-gray-600 hover:text-gray-900">Projects</Link></li>
                        <li><Link href="#" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
                        <li><Link href="#" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                        <li><Link href="#" className="text-gray-600 hover:text-gray-900">Log in</Link></li>
                        <li><Button variant="outline" className="rounded-full w-full">Get Started</Button></li>
                    </ul>
                </motion.nav>
            )}
        </header>
    )
}
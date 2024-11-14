"use client"

import { useState, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import { Audiowide } from "next/font/google"
import { Button } from "@/components/ui/button"
import { Mail } from 'lucide-react'
import Header from '@/components/header'
import HeroSection from '@/components/demo/hero-section'
import CustomerAccessSection from '@/components/demo/customer-access-section'
import DemoCatalogSection from '@/components/demo/demo-catalog-section'
import RequestCallbackSection from '@/components/landing-page/request-callback-section'
import DemoDialog from '@/components/demo/demo-dialog'

const audiowide = Audiowide({
    weight: "400",
    subsets: ["latin"],
})

export interface ClientSite {
    name: string
    postalCode: string
    url: string
}

export interface DemoSite {
    id: string
    name: string
    description: string
    imageUrl: string
    demoUrl: string
    industry: string
}

const clientSites: ClientSite[] = [
    { name: "Bar Roma", postalCode: "M6J 2Z8", url: "https://barroma.netlify.app/" },
    { name: "COLLOSUS AUTO COLLISION", postalCode: "M6N 3A4", url: "https://collosus-auto.netlify.app/" },
]

const demoSites: DemoSite[] = [
    {
        id: "1",
        name: "Infinity Property Management",
        description: "Modern property management website",
        imageUrl: "/placeholder.svg?height=200&width=300",
        demoUrl: "https://infinitypm.netlify.app/",
        industry: "Real Estate"
    },
    {
        id: "2",
        name: "Packaging World",
        description: "Innovative packaging solutions website",
        imageUrl: "/placeholder.svg?height=200&width=300",
        demoUrl: "https://packaging-world.netlify.app/",
        industry: "Manufacturing"
    },
]

// Animation variants
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

export const staggerChildren: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

export default function DemoAccessCatalog() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredDemos, setFilteredDemos] = useState<DemoSite[]>(demoSites)
    const [selectedDemo, setSelectedDemo] = useState<DemoSite | null>(null)

    useEffect(() => {
        const filtered = demoSites.filter(demo =>
            demo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            demo.industry.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredDemos(filtered)
    }, [searchTerm])

    return (
        <div className="min-h-screen bg-[#F3F2EF]">
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} audiowide={audiowide} />
            <HeroSection audiowide={audiowide} />
            <CustomerAccessSection audiowide={audiowide} clientSites={clientSites} />
            <DemoCatalogSection
                audiowide={audiowide}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredDemos={filteredDemos}
                setSelectedDemo={setSelectedDemo}
            />
            <RequestCallbackSection audiowide={audiowide} />
            <DemoDialog selectedDemo={selectedDemo} setSelectedDemo={setSelectedDemo} />

            <section className="py-20 bg-[#F3F2EF]">
                <div className="container mx-auto px-4 text-center">
                    <motion.h2
                        className={`${audiowide.className} text-3xl font-bold mb-4`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Need Help?
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        If you're having trouble accessing your site or have any questions, please contact our support team.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <Button size="lg" onClick={() => window.location.href = 'mailto:support@semprestudios.com'} className="bg-black text-white hover:bg-gray-800 rounded-full">
                            Contact Support <Mail className="ml-2 h-5 w-5" />
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
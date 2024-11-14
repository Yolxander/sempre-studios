"use client"

import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Search } from 'lucide-react'
import { DemoSite, fadeInUp, staggerChildren } from './demo-access-catalog'

interface DemoCatalogSectionProps {
    audiowide: any // Replace 'any' with the actual type from the font import
    searchTerm: string
    setSearchTerm: (term: string) => void
    filteredDemos: DemoSite[]
    setSelectedDemo: (demo: DemoSite | null) => void
}

export default function DemoCatalogSectionComponent({ audiowide, searchTerm, setSearchTerm, filteredDemos, setSelectedDemo }: DemoCatalogSectionProps) {
    return (
        <section id="demo-catalog" className="py-20 bg-[#F3F2EF]">
            <div className="container mx-auto px-4">
                <motion.h2 
                    className={`${audiowide.className} text-3xl font-bold mb-8 text-center`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Explore Our Demo Catalog
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <Label htmlFor="search" className="sr-only">Search demos</Label>
                    <div className="relative max-w-md mx-auto">
                        <Input
                            id="search"
                            type="text"
                            placeholder="Search by name or industry"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </motion.div>
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={staggerChildren}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {filteredDemos.map((demo) => (
                        <motion.div key={demo.id} variants={fadeInUp}>
                            <Card className="flex flex-col h-full bg-white rounded-3xl shadow-md">
                                <CardHeader>
                                    <CardTitle>{demo.name}</CardTitle>
                                    <CardDescription>{demo.industry}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <img src={demo.imageUrl} alt={demo.name} className="w-full h-48 object-cover rounded-md mb-4" />
                                    <p className="text-sm text-gray-600">{demo.description}</p>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" onClick={() => setSelectedDemo(demo)} className="rounded-full bg-[#F3F2EF] border-[2px] shadow-md">
                                        View Details
                                    </Button>
                                    <Button onClick={() => window.open(demo.demoUrl, '_blank', 'noopener,noreferrer')} className="bg-black text-white hover:bg-gray-800 rounded-full">
                                        Open Demo <ExternalLink className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
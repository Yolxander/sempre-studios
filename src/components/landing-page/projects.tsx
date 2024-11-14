"use client"

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform} from "framer-motion"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from 'lucide-react'

interface Project {
    image: string
    title: string
    description: string
    link: string
}

const projects: Project[] = [
    {
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-11-12%20at%206.45.23%E2%80%AFPM-cxhdRCNNxuU98DU0KHEQFiH4fDyDsP.png",
        title: "HOTEL DALEESE",
        description: "Boutique hotel in the heart of Uvita, Costa Rica, offering eccentric charm, privacy, and ultimate comfort for discerning travelers.",
        link: "https://hoteldaleese.com"
    },
    {
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-07%20at%2011.33.38%E2%80%AFAM-voFeujlWtdkzG1xIJJsvLTMDGoOHd5.png",
        title: "NORTH SIMCOE PROPERTY MANAGEMENT",
        description: "Top property management company in Simcoe County, offering comprehensive services for property owners and tenants alike.",
        link: "https://northsimcoepm.com/"
    },
    {
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-07%20at%2011.33.59%E2%80%AFAM-zOW1CabXlg0isEWQGJF1ZJEpiA6Lff.png",
        title: "RMD Property Management",
        description: "Expert care for your paradise in Costa Rica, providing top-notch property management services for international property owners.",
        link: "https://costa-rica-site.webflow.io/"
    },
    {
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-07%20at%2011.34.19%E2%80%AFAM-03PDJETEaNLNmz9RtpE8gGCnMKXFJ1.png",
        title: "Premium Natural Wood Charcoal",
        description: "High-quality, sustainable wood charcoal products for grilling enthusiasts, restaurants, and industrial applications.",
        link: "https://charcoal.jonex.ca/"
    }
]

export default function Projects() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

    return (
        <motion.section
            ref={containerRef}
            style={{ opacity, y }}
            className="py-24 bg-white"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
                >
                    <div>
                        <motion.h2
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Our Projects
                        </motion.h2>
                        <motion.p
                            className="mt-4 text-lg text-gray-600 max-w-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Explore our portfolio of successful projects across hospitality and property management.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <Button
                            variant="outline"
                            size="lg"
                            className="group rounded-full border-2 border-black hover:bg-black hover:text-white transition-all duration-300"
                        >
                            View All
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <ProjectCard
                                project={project}
                                isHovered={hoveredIndex === index}
                                onHover={() => setHoveredIndex(index)}
                                onLeave={() => setHoveredIndex(null)}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    )
}

interface ProjectCardProps {
    project: Project
    isHovered: boolean
    onHover: () => void
    onLeave: () => void
}

function ProjectCard({ project, isHovered, onHover, onLeave }: ProjectCardProps) {
    return (
        <motion.div
            className="relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={onHover}
            onHoverEnd={onLeave}
            onClick={() => window.open(project.link, '_blank')}
        >
            <motion.div
                className="absolute inset-0 w-full h-full"
                initial={false}
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </motion.div>

            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
                initial={false}
                animate={{ opacity: isHovered ? 0.9 : 0.7 }}
                transition={{ duration: 0.3 }}
            />

            <motion.div
                className="absolute inset-0 p-8 flex flex-col justify-end"
                initial={false}
                animate={{ y: isHovered ? 0 : 8, opacity: isHovered ? 1 : 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <motion.h3
                    className="text-2xl md:text-3xl font-bold text-white mb-3"
                    initial={false}
                    animate={{ y: isHovered ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                >
                    {project.title}
                </motion.h3>
                <motion.p
                    className="text-gray-200 text-base md:text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    {project.description}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="mt-4"
                >
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-black border-white hover:bg-black hover:text-white transition-all duration-300 group"
                    >
                        Learn More
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
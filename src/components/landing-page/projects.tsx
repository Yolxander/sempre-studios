"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const projects = [
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
    },
    {
        image: "/placeholder.svg?height=600&width=400",
        title: "Learn More",
        description: "Discover more about our projects and how we can help your business succeed online.",
        link: "#"
    }
]

export default function Projects() {
    const [currentProject, setCurrentProject] = useState(0)
    const [direction, setDirection] = useState(0)

    const nextProject = () => {
        setDirection(1)
        setCurrentProject((prev) => (prev + 1) % projects.length)
    }

    const prevProject = () => {
        setDirection(-1)
        setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
    }

    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            }
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
            }
        }
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white py-24"
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                        Our Projects
                    </h2>
                    <div className="flex items-center">
                        <button
                            onClick={prevProject}
                            className="mr-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                            aria-label="Previous project"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextProject}
                            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                            aria-label="Next project"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <div className="relative overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentProject}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="w-full"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {projects.slice(currentProject, currentProject + 3).map((project, index) => (
                                    <ProjectCard key={index} project={project} />
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.section>
    )
}

function ProjectCard({ project }) {
    return (
        <motion.div
            className="relative overflow-hidden rounded-3xl aspect-[3/4] cursor-pointer shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => window.open(project.link, '_blank')}
        >
            {/* Image container fills the entire card */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill" // Ensures the image spans the full width/height of the parent
                    objectFit="cover" // Ensures the image maintains aspect ratio while covering the container
                    quality={100} // Increases the image quality
                    className="rounded-3xl"
                />
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
            {/* Project text content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-base text-white">{project.description}</p>
            </div>
        </motion.div>
    )
}

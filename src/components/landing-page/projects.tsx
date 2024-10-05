"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const projects = [
    {
        image: "/placeholder.svg",
        title: "NORTH SIMCOE PROPERTY MANAGEMENT",
        description: "Top property management company in Simcoe County, offering comprehensive services for property owners and tenants alike.",
        link: "https://northsimcoepm.com/"
    },
    {
        image: "/placeholder.svg",
        title: "RMD Property Management",
        description: "Expert care for your paradise in Costa Rica, providing top-notch property management services for international property owners.",
        link: "https://costa-rica-site.webflow.io/"
    },
    {
        image: "/placeholder.svg",
        title: "Premium Natural Wood Charcoal",
        description: "High-quality, sustainable wood charcoal products for grilling enthusiasts, restaurants, and industrial applications.",
        link: "https://charcoal.jonex.ca/"
    },
    {
        image: "/placeholder.svg",
        title: "Learn More",
        description: "Discover more about our projects and how we can help your business succeed online.",
        link: "#"
    }
]

export default function Projects() {
    const [currentProject, setCurrentProject] = useState(0)

    const nextProject = () => {
        setCurrentProject((prev) => (prev + 1) % projects.length)
    }

    const prevProject = () => {
        setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
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
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={currentProject}
                            className="w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
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
        <div
            className="relative overflow-hidden rounded-3xl aspect-[3/4] cursor-pointer shadow-lg transition-transform hover:scale-105"
            onClick={() => window.open(project.link, '_blank')}
        >
            <Image
                src={project.image}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-base">{project.description}</p>
            </div>
        </div>
    )
}
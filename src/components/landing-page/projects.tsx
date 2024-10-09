"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"
import Image from 'next/image'
import { Button } from "@/components/ui/button"

interface Project {
    image: string
    title: string
    description: string
    link: string
}

const projects: Project[] = [
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
    const [currentProject, setCurrentProject] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProject((prev) => (prev + 1) % projects.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.section
            ref={containerRef}
            style={{ opacity, scale }}
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
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full"
                        onClick={() => window.open("#projects", "_self")}
                    >
                        Read More
                    </Button>
                </div>
                <div className="relative overflow-hidden">
                    <motion.div
                        key={currentProject}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {projects.map((project, index) => (
                                <ProjectCard key={index} project={project} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}

interface ProjectCardProps {
    project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            className="relative overflow-hidden rounded-3xl aspect-[3/4] cursor-pointer shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => window.open(project.link, '_blank')}
        >
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="rounded-3xl"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-base text-white">{project.description}</p>
            </div>
        </motion.div>
    )
}
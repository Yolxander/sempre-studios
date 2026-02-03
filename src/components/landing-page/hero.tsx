"use client"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Poppins } from "next/font/google"
import Lottie from "@/components/landing-page/LottiePlayer"
import { useState, useEffect } from "react"
import Link from "next/link"
import ContactForm from "@/components/ContactForm"

const poppins = Poppins({
    weight: ["300", "400", "700"],
    subsets: ["latin"],
})

const BackgroundAnimation = () => {
    return (
        <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                        result="goo"
                    />
                </filter>
            </defs>
            <g filter="url(#goo)">
                {[...Array(20)].map((_, i) => (
                    <motion.circle
                        key={i}
                        cx={Math.random() * 100 + "%"}
                        cy={Math.random() * 100 + "%"}
                        r={Math.random() * 50 + 10}
                        fill={`rgba(0, 0, 0, ${Math.random() * 0.05 + 0.03})`}
                        initial={{ scale: 0 }}
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, Math.random() * 100 - 50, 0],
                            y: [0, Math.random() * 100 - 50, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </g>
        </svg>
    )
}

export default function Hero() {
    const [animationData, setAnimationData] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        fetch("https://lottie.host/ee339356-ffe2-41dd-a50c-14d91e742d44/HnRcLCVxaB.json")
            .then(response => response.json())
            .then(data => setAnimationData(data))
            .catch(error => console.error("Error loading Lottie animation:", error))
    }, [])

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <main className={`${poppins.className} container mx-auto px-4 py-20 text-center min-h-screen relative overflow-hidden bg-[#F3F2EF] min-w-full md:h-0 h-[110vh]`}>
            <BackgroundAnimation />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative z-10 md:pt-20 pt-5"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                >
                    Your Online Presence, Made Easy
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                >
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Building a professional website doesn’t have to be difficult or time-consuming. At Sempre Studios, we make it simple for businesses to establish and grow their online presence.                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                >
                    <Link className="md:w-fit w-full" href="/demo" passHref>
                        <Button size="lg" className="bg-black text-white hover:bg-gray-800 rounded-full md:w-full">Get Demo</Button>
                    </Link>

                    <Button variant="outline" size="lg" className="rounded-full bg-[#F3F2EF] border-[2px] shadow-md" onClick={handleModalToggle}>
                        Say Hi
                    </Button>
                </motion.div>
            </motion.div>

            {animationData && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1.3 }}
                    className="absolute flex items-center justify-center h-[300px] md:h-[420px] md:bottom-1 md:right-[30%] mt-12 bottom-0 right-[-30px]"
                >
                    <Lottie
                        animationData={animationData}
                        className="w-full h-full object-cover"
                        style={{ opacity: 1 }}
                    />
                </motion.div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ContactForm onClose={handleModalToggle} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
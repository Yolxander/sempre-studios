// src/components/Hero.tsx

"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Poppins } from "next/font/google"
import Lottie from "lottie-react"
import { useState, useEffect } from "react"
import Link from "next/link";
import ContactForm from "@/components/ContactForm"

const poppins = Poppins({
    weight: ["300", "400", "700"],
    subsets: ["latin"],
})

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
        <main className={`${poppins.className} container mx-auto px-4 py-20 text-center min-h-screen relative overflow-hidden bg-white min-w-full md:h-0 h-[110vh]`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
                className="relative z-10"
            >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    Your new website is ready<br />to launch
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    We create customized demo sites for businesses that need an updated or first-time web presence. See your future website today!
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link className="md:w-fi w-full" href="https://calendly.com/hello-semprestudios/30min" passHref>
                        <Button size="lg" className="bg-black text-white hover:bg-gray-800 rounded-full w-full">Get Demo</Button>
                    </Link>

                    {/* Contact Sales Button triggers modal */}
                    <Button variant="outline" size="lg" className="rounded-full" onClick={handleModalToggle}>
                        Contact Sales
                    </Button>
                </div>
            </motion.div>

            {animationData && (
                <div className="absolute flex items-center justify-center h-[300px] md:h-[420px] md:bottom-1 md:right-[30%] mt-12 bottom-0 right-[-30px]">
                    <Lottie
                        animationData={animationData}
                        className="w-full h-full object-cover"
                        style={{ opacity: 1 }}
                    />
                </div>
            )}

            {/* Modal for Contact Sales */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <ContactForm onClose={handleModalToggle} />
                </div>
            )}
        </main>
    )
}

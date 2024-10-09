"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Poppins } from "next/font/google"
import Lottie from "lottie-react"
import { useState, useEffect } from "react"

const poppins = Poppins({
    weight: ["300", "400", "700"],
    subsets: ["latin"],
})

export default function Hero() {
    const [animationData, setAnimationData] = useState(null)

    useEffect(() => {
        fetch("https://lottie.host/ee339356-ffe2-41dd-a50c-14d91e742d44/HnRcLCVxaB.json")
            .then(response => response.json())
            .then(data => setAnimationData(data))
            .catch(error => console.error("Error loading Lottie animation:", error))
    }, [])

    return (
        <main className={`${poppins.className} container mx-auto px-4 py-20 text-center min-h-screen relative overflow-hidden bg-white min-w-full`}>
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
                    <Button size="lg" className="bg-black text-white hover:bg-gray-800 rounded-full">View Demo</Button>
                    <Button variant="outline" size="lg" className="rounded-full">Contact Sales</Button>
                </div>
            </motion.div>
            {animationData && (
                <div className="absolute  flex items-center justify-center h-[420px] md:bottom-1 md:right-[30%] bottom-0 right-[-30px]">
                    <Lottie
                        animationData={animationData}
                        className="w-full h-full object-cover"
                        style={{ opacity: 1 }}
                    />
                </div>
            )}
        </main>
    )
}
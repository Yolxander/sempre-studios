"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Poppins } from "next/font/google"
import { Rocket, Globe, Zap } from "lucide-react"
import { useRef, ReactNode } from "react"

const poppins = Poppins({
    weight: ["400", "300"],
    subsets: ["latin"],
})

interface AnimatedCardProps {
    children: ReactNode
    className?: string
}

function AnimatedCard({ children, className }: AnimatedCardProps) {
    const cardRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    })

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])

    return (
        <motion.div
            ref={cardRef}
            style={{ scale, opacity }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default function Features() {
    const bgVariants = {
        initial: {
            backgroundPosition: "0% 50%",
        },
        animate: {
            backgroundPosition: "100% 50%",
            transition: {
                duration: 5,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
            },
        },
    }

    const outerBgVariants = {
        initial: {
            backgroundPosition: "0% 0%",
        },
        animate: {
            backgroundPosition: "100% 100%",
            transition: {
                duration: 10,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
            },
        },
    }

    return (
        <div className={`${poppins.className} bg-gray-100 py-12`}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-center mb-12"
                >
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-8xl mx-auto py-12">
                        Sempre Studios creates ready-to-launch websites for businesses across all industries. Get your professional online presence today.
                    </p>
                </motion.div>
                <div className="flex flex-col lg:flex-row gap-8 lg:h-[90vh]">
                    <div className="lg:w-1/2 flex flex-col gap-8 h-full">
                        <AnimatedCard className="bg-white p-8 rounded-3xl shadow-md flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-gray-500">Step 1</h3>
                            <h4 className="text-2xl md:text-3xl font-bold mb-4">Custom Demo Creation</h4>
                            <p className="text-gray-600">We proactively create a customized demo site tailored to your business needs, ready for your review.</p>
                        </AnimatedCard>
                        <AnimatedCard className="bg-white p-8 rounded-3xl shadow-md flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-gray-500">Step 2</h3>
                            <h4 className="text-2xl md:text-3xl font-bold mb-4">Instant Preview</h4>
                            <p className="text-gray-600">Receive your demo site directly via email, allowing you to see exactly what your new website could look like.</p>
                        </AnimatedCard>
                    </div>
                    <AnimatedCard className="lg:w-1/2 bg-white p-8 rounded-3xl shadow-md flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-500">Step 3</h3>
                            <h4 className="text-2xl md:text-3xl font-bold mb-4">Launch Your Site</h4>
                            <p className="text-gray-600">With a simple purchase, your new website can go live immediately. We offer ongoing support and management to keep your online presence thriving.</p>
                        </div>
                        <motion.div
                            className="mt-8 flex-grow"
                            variants={outerBgVariants}
                            initial="initial"
                            animate="animate"
                            style={{
                                backgroundImage: "radial-gradient(circle, #f3f4f6, #e5e7eb)",
                                backgroundSize: "200% 200%",
                            }}
                        >
                            <motion.div
                                className="w-full h-full bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center text-center"
                                variants={bgVariants}
                                initial="initial"
                                animate="animate"
                                style={{
                                    backgroundImage: "linear-gradient(45deg, #f3f4f6, #e5e7eb, #f3f4f6)",
                                    backgroundSize: "200% 200%",
                                }}
                            >
                                <Rocket className="w-16 h-16 text-primary mb-4" />
                                <h5 className="text-xl font-bold mb-2">Ready for Takeoff</h5>
                                <p className="text-gray-600 mb-4">Your website is set to launch and make an impact online.</p>
                                <div className="flex space-x-4">
                                    <div className="flex items-center">
                                        <Globe className="w-6 h-6 text-primary mr-2" />
                                        <span className="text-sm font-medium">Global Reach</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Zap className="w-6 h-6 text-primary mr-2" />
                                        <span className="text-sm font-medium">Fast Performance</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatedCard>
                </div>
            </div>
        </div>
    )
}

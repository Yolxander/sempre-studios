"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Poppins } from "next/font/google"
import { useRef, ReactNode } from "react"
import Image from 'next/image'

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
            className={`${className} min-h-[400px]`}
        >
            {children}
        </motion.div>
    )
}

export default function Features() {
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
                repeatType: "reverse" as const,
            },
        },
    };

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
                repeatType: "reverse" as const,
            },
        },
    };

    return (
        <div className={`${poppins.className} bg-gray-100 py-12`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 lg:min-h-[calc(100vh-8rem)]">
                    <div className="lg:w-1/2 flex flex-col gap-8 h-full">
                        <AnimatedCard className="bg-[#F7F8EE] p-8 rounded-3xl shadow-md flex-1 relative">
                            <h3 className="text-lg font-semibold mb-2 text-primary">Strategic Planning</h3>
                            <h4 className="text-2xl md:text-3xl font-bold mb-4">Custom Demo Creation</h4>
                            <p className="text-gray-600">We proactively create a customized demo site tailored to your business needs, ready for your review.</p>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-contain bg-no-repeat bg-right-bottom" style={{ backgroundImage: "url('/mission-control.png')" }}></div>
                        </AnimatedCard>
                        <AnimatedCard className="bg-[#F4F5F8] p-8 rounded-3xl shadow-md flex-1 relative">
                            <h3 className="text-lg font-semibold mb-2 text-primary">Quality Assurance</h3>
                            <h4 className="text-2xl md:text-3xl font-bold mb-4">Instant Preview</h4>
                            <p className="text-gray-600">Receive your demo site directly via email, allowing you to see exactly what your new website could look like.</p>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-contain bg-no-repeat bg-right-bottom" style={{ backgroundImage: "url('/orbit-check.png')" }}></div>
                        </AnimatedCard>
                    </div>
                    <AnimatedCard className="lg:w-1/2 bg-[#F2F2F2] p-8 rounded-3xl shadow-md flex flex-col justify-between lg:h-auto">
                        <div className="flex flex-col h-full">
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-primary">Deployment</h3>
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
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/rocket-launch.jpg"
                                            alt="Website Launch"
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-2xl"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </AnimatedCard>
                </div>
            </div>
        </div>
    )
}
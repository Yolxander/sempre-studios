"use client"

import { motion } from "framer-motion"
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function OnlinePresence() {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    }

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 }
        }
    }

    const floatingCardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                yoyo: Infinity,
                ease: "easeInOut"
            }
        }
    }

    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-gray-100 py-24"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center">
                    <motion.div className="lg:w-1/2 mb-8 lg:mb-0" variants={itemVariants}>
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Comprehensive Online Presence Packages</motion.h2>
                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 mb-8">
                            From website creation to ongoing management, we offer complete solutions to establish and maintain your digital presence.
                        </motion.p>
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Button size="lg" className="bg-black text-white hover:bg-gray-800 rounded-full">
                                View Packages
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full">
                                Learn More
                            </Button>
                        </motion.div>
                    </motion.div>
                    <motion.div className="lg:w-1/2 relative" variants={itemVariants}>
                        <motion.div variants={imageVariants}>
                            <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-08%20at%2010.49.28%E2%80%AFAM-iufg13rUeCVEcsqdpyUCbtJsy5ctHY.png"
                                width={600}
                                height={400}
                                alt="Online Presence Dashboard"
                                className="rounded-lg shadow-xl"
                            />
                        </motion.div>
                        <motion.div
                            variants={floatingCardVariants}
                            className="absolute -bottom-10 -left-10 bg-white rounded-lg shadow-md p-4 max-w-xs"
                        >
                            <div className="flex items-center space-x-4">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl"
                                >
                                    921
                                </motion.div>
                                <div>
                                    <h4 className="font-semibold">Website Analytics</h4>
                                    <p className="text-sm text-gray-600">Total sessions this month</p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl"
                                >
                                    25%
                                </motion.div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">Traffic Increase</p>
                                    <p className="text-xs text-gray-600">Compared to last month</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={floatingCardVariants}
                            className="absolute -bottom-4 right-10 bg-white rounded-lg shadow-md p-4 max-w-xs"
                        >
                            <div className="flex items-center space-x-4">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl"
                                >
                                    849
                                </motion.div>
                                <div>
                                    <p className="text-sm text-gray-600">SEO optimization complete for this week</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}
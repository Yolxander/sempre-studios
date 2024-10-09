"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"

export default function MarqueeSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

    return (
        <section className="bg-white py-12 overflow-hidden">
            <div
                className="relative">
                <motion.div
                    ref={containerRef}
                    style={{ opacity, scale }}
                    className="text-[50px] md:text-[100px] font-bold text-gray-100 whitespace-nowrap"
                    animate={{
                        x: [0, -1000],
                        transition: {
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 20,
                                ease: "linear",
                            },
                        },
                    }}
                >
                    your business online your business online your business
                    <span className="inline-block mx-4">
            <svg className="w-8 h-8 md:w-16 md:h-16 text-green-500 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </span>
                </motion.div>
            </div>
        </section>
    )
}
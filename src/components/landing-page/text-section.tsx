"use client"

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

export function TextSectionComponent() {
  const controls = useAnimation()
  const fullText = ", getting a high-quality website is straightforward. We design and deliver ready-to-launch sites for businesses of all kinds, making it easy to establish your online presence"
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const animateText = async () => {
      for (let i = 0; i <= fullText.length; i++) {
        await controls.start(index => ({
          color: index < i ? "#000000" : "#D1D5DB",
          transition: { duration: 0.05 }
        }))
        await new Promise(resolve => setTimeout(resolve, 30))
      }
      setAnimationComplete(true)
    }
    animateText()
  }, [controls, fullText])

  return (
    <div className="text-center mb-16 px-4 relative">
      <p className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight max-w-7xl mx-auto py-12">
        <span className="relative inline-flex items-center">
          <span className="mr-2 inline-flex items-center space-x-2 bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full shadow-sm transition-all duration-300 hover:bg-gray-200 hover:shadow-md">
            <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
            <span>how it works</span>
          </span>
          <span className="font-bold pb-[10px]">
            With Sempre Studios {" "}
          </span>
        </span>
        {fullText.split("").map((letter, index) => (
          <motion.span
            key={index}
            custom={index}
            animate={controls}
            style={{ color: "#D1D5DB" }}
            className={animationComplete ? "text-black" : ""}
          >
            {letter}
          </motion.span>
        ))}
      </p>
    </div>
  )
}
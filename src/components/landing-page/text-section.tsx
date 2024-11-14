"use client"

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

export function TextSectionComponent() {
  const controls = useAnimation()
  const fullText = ", getting a high-quality website is straightforward. We design and deliver ready-to-launch sites for businesses of all kinds, making it easy to establish your online presence"
  const [animationComplete, setAnimationComplete] = useState(false)
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

  useEffect(() => {
    const animateText = async () => {
      const animationSpeed = isMobile ? 15 : 30 // Faster animation on mobile
      for (let i = 0; i <= fullText.length; i++) {
        await controls.start(index => ({
          color: index < i ? "#000000" : "#D1D5DB",
          transition: { duration: 0.05 }
        }))
        await new Promise(resolve => setTimeout(resolve, animationSpeed))
      }
      setAnimationComplete(true)
    }
    animateText()
  }, [controls, fullText, isMobile])

  return (
      <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4 relative">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight max-w-7xl mx-auto py-6 sm:py-8 md:py-10 lg:py-12">
        <span className="relative inline-flex items-center flex-wrap justify-center">
          <span className="mr-2 inline-flex items-center space-x-2 bg-gray-100 text-gray-600 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full shadow-sm transition-all duration-300 hover:bg-gray-200 hover:shadow-md mb-2 sm:mb-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full animate-pulse"></span>
            <span>how it works</span>
          </span>
          <span className="font-bold pb-[5px] sm:pb-[10px]">
            With Sempre Studios {" "}
          </span>
        </span>
          {fullText.split("").map((letter, index) => (
              <motion.span
                  key={index}
                  custom={index}
                  animate={controls}
                  style={{ color: "#D1D5DB" }}
                  className={`${animationComplete ? "text-black" : ""} transition-colors duration-300`}
              >
                {letter}
              </motion.span>
          ))}
        </p>
      </div>
  )
}
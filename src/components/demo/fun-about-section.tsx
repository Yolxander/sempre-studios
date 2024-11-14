'use client'

import { motion } from "framer-motion"
import { Poppins } from "next/font/google"
import { useState } from "react"

const poppins = Poppins({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
})

export function FunAboutSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const funFacts = [
    "We've built websites for clients in 5 continents!",
    "Our team's favorite coding fuel: ☕ and 🍕",
    "We once debugged code while skydiving (just kidding, but we're that dedicated!)",
  ]

  return (
    <section className={`${poppins.className} bg-[#F3F2EF] py-24 relative overflow-hidden`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">About Us</h2>
          <div className="space-y-6 text-lg text-gray-600">
            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Sempre Studios is a Toronto-based digital agency on a mission to make having a powerful online presence accessible for all businesses. We believe that creating a professional website shouldn't be complicated or out of reach. With a focus on simplicity and results, we design, build, and deliver customized, ready-to-launch websites that help businesses across industries connect with their audience and grow online.
            </p>
            <p>
              Our team is composed of experts with experience across a range of industries and technology levels, from innovative startups to large-scale data-driven companies like Meta. We bring this diverse expertise together to create tailored solutions that fit the unique needs of each client, ensuring that every business can achieve a professional online presence with ease and confidence.
            </p>
          </div>
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {funFacts.map((fact, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <p className="text-sm font-medium text-gray-800">{fact}</p>
                {hoveredIndex === index && (
                  <motion.div
                    className="mt-2 text-xs text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Hover for more fun facts!
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      <BackgroundAnimation />
    </section>
  )
}

function BackgroundAnimation() {
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
        {[...Array(15)].map((_, i) => (
          <motion.circle
            key={i}
            cx={Math.random() * 100 + "%"}
            cy={Math.random() * 100 + "%"}
            r={Math.random() * 30 + 5}
            fill={`hsl(${Math.random() * 360}, 70%, 90%)`}
            initial={{ scale: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
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
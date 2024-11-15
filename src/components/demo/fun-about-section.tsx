'use client'

import { motion } from "framer-motion"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
})

export default function FunAboutSection() {

  return (
      <section className={`${poppins.className} bg-gray-100 py-[200px] relative overflow-hidden`}>
        <BackgroundAnimation />
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 relative z-10"
        >
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-[90vw] mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">About Us</h2>
            <div className="space-y-6 text-lg md:text-xl text-gray-600">
              <p>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Sempre Studios is a Toronto-based digital agency on a mission to make having a powerful online presence accessible for all businesses. We believe that creating a professional website shouldn't be complicated or out of reach. With a focus on simplicity and results, we design, build, and deliver customized, ready-to-launch websites that help businesses across industries connect with their audience and grow online.
              </p>
              <p>
                Our team is composed of experts with experience across a range of industries and technology levels, from innovative startups to large-scale data-driven companies like Meta. We bring this diverse expertise together to create tailored solutions that fit the unique needs of each client, ensuring that every business can achieve a professional online presence with ease and confidence.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
  )
}

function BackgroundAnimation() {
  return (
      <svg
          className="absolute inset-0 w-full h-full "
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
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
                    duration: Math.random() * 2 + 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
              />
          ))}
        </g>
      </svg>
  )
}
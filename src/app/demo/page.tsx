"use client"

import { useState, useRef, useEffect } from "react"
import FuturisticMenu from "@/components/demo/futuristic-menu";
import { Orbitron } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"

const orbitron = Orbitron({ subsets: ["latin"] })

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [titleWidth, setTitleWidth] = useState(0)
  const titleRef = useRef<HTMLHeadingElement | null>(null);


  useEffect(() => {
    if (titleRef.current) {
      setTitleWidth(titleRef.current.offsetWidth)
    }
  }, [])

  return (
    <main
      className={`min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden ${orbitron.className}`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-16"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <AnimatePresence>
          {!showForm && (
            <motion.h1
              ref={titleRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-8 inline-block w-[80%] max-w-3xl mx-auto"
            >
              Welcome to SempreStudios
            </motion.h1>
          )}
        </AnimatePresence>
        <FuturisticMenu
          onFormShow={() => setShowForm(true)}
          onFormHide={() => setShowForm(false)}
          titleWidth={titleWidth}
        />
      </div>
    </main>
  )
}


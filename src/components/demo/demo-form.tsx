"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion } from "framer-motion"

const DEMOS: Demo[] = [
  {
    name: "Bar Roma",
    url: "https://barroma.netlify.app",
  },
  {
    name: "Fallen Feather",
    url: "https://kzmingxcun0pbbdpf8eq.lite.vusercontent.net",
  },
  {
    name: "La Pizzeria",
    url: "https://example.com/la-pizzeria",
  },
  {
    name: "Sushi Express",
    url: "https://example.com/sushi-express",
  },
]

interface Demo {
  name: string
  url: string
}

export default function DemoForm({ onClose }: { onClose: () => void }) {
  const [restaurantName, setRestaurantName] = useState("")
  const [matchedDemo, setMatchedDemo] = useState<Demo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedName, setDebouncedName] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(restaurantName)
    }, 2000)

    return () => clearTimeout(timer)
  }, [restaurantName])

  const checkForMatch = (name: string) => {
    setIsLoading(true)
    setTimeout(() => {
      const match = DEMOS.find((demo) => demo.name.toLowerCase() === name.toLowerCase())
      setMatchedDemo(match || null)
      setIsLoading(false)
    }, 4000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRestaurantName(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (matchedDemo) {
      window.open(matchedDemo.url, "_blank")
    }
  }

  useEffect(() => {
    if (debouncedName) {
      checkForMatch(debouncedName)
    }
  }, [debouncedName])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-lg p-8 bg-black border border-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-16" />

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-white" />
        <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-white" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-white" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-white" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-white flex items-center justify-center">
            <span className="text-2xl mr-2">[</span>
            {matchedDemo ? "Site Found" : "Check Site Availability"}
            <span className="text-2xl ml-2">]</span>
          </h2>

          {!matchedDemo && !isLoading ? (
            <div className="space-y-2">
              <label className="block text-sm text-white">Restaurant Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={restaurantName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black border border-white focus:border-gray-300 outline-none transition-colors text-white text-center placeholder-white/50"
                  placeholder="Enter name"
                  required
                />
                <div className="absolute -top-px -left-px w-3 h-3 border-l border-t border-white" />
                <div className="absolute -top-px -right-px w-3 h-3 border-r border-t border-white" />
                <div className="absolute -bottom-px -left-px w-3 h-3 border-l border-b border-white" />
                <div className="absolute -bottom-px -right-px w-3 h-3 border-r border-b border-white" />
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center">
              <div className="w-12 h-12 border-t-2 border-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <motion.button
                type="submit"
                className="group relative w-full py-3 text-white font-bold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 border border-white">
                  <div className="absolute -top-px -left-px w-3 h-3 border-l border-t border-white" />
                  <div className="absolute -top-px -right-px w-3 h-3 border-r border-t border-white" />
                  <div className="absolute -bottom-px -left-px w-3 h-3 border-l border-b border-white" />
                  <div className="absolute -bottom-px -right-px w-3 h-3 border-r border-b border-white" />
                </div>
                <span className="relative z-10">Check it out</span>
              </motion.button>
            </div>
          )}
        </form>
      </div>
    </motion.div>
  )
}


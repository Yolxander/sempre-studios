"use client"

import { motion } from "framer-motion"

interface HowItWorksProps {
  onClose: () => void
}

export default function HowItWorks({ onClose }: HowItWorksProps) {
  return (
    <motion.div
      className="relative w-full max-w-3xl mx-auto bg-black text-white p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl mb-4">How It Works</h2>
      <ol className="list-decimal list-inside mb-6 space-y-2">
        <li>
          <strong>Check the Demo</strong>: Explore how everything looks and feels before committing.
        </li>
        <li>
          <strong>Book a 15-Minute Call</strong>: Let’s discuss your needs, answer questions, and finalize details.
        </li>
        <li>
          <strong>Publish Your Site in Less Than a Week</strong>: We’ll get you launched quickly so you can start enjoying the benefits.
        </li>
      </ol>
      <button
        onClick={onClose}
        className="group relative px-8 py-4 text-white font-bold overflow-hidden border border-white"
      >
        <span>Close</span>
      </button>
    </motion.div>
  )
}

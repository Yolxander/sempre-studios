"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ContactForm from "./contact-form"
import DemoForm from "./demo-form"
// Import your new component
import HowItWorks from "./how-it-works"

interface FuturisticMenuProps {
  onFormShow: () => void
  onFormHide: () => void
  titleWidth: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FuturisticMenu({ onFormShow, onFormHide, titleWidth }: FuturisticMenuProps) {
  const [showContact, setShowContact] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const [showHowItWorks, setShowHowItWorks] = useState(false)

  const handleShowContact = () => {
    setShowContact(true)
    onFormShow()
  }

  const handleShowDemo = () => {
    setShowDemo(true)
    onFormShow()
  }

  const handleShowHowItWorks = () => {
    setShowHowItWorks(true)
    onFormShow()
  }

  const handleCloseForm = () => {
    setShowContact(false)
    setShowDemo(false)
    setShowHowItWorks(false)
    onFormHide()
  }

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  }

  return (
    <AnimatePresence mode="wait">
      {/* If no form is being shown, render the 3-button menu */}
      {!showContact && !showDemo && !showHowItWorks ? (
        <motion.div
          className="flex flex-col gap-4 w-[80%] max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {/* See My Site Demo Button */}
          <motion.button
            className="group relative px-8 py-4 text-white font-bold overflow-hidden w-full"
            onClick={handleShowDemo}
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <div className="absolute inset-0 border border-white">
              {/* Corner cuts */}
              <div className="absolute -top-px -left-px w-4 h-4 border-l border-t border-white" />
              <div className="absolute -top-px -right-px w-4 h-4 border-r border-t border-white" />
              <div className="absolute -bottom-px -left-px w-4 h-4 border-l border-b border-white" />
              <div className="absolute -bottom-px -right-px w-4 h-4 border-r border-b border-white" />
              {/* Animated scanner effect */}
              <div className="absolute top-0 -left-full w-full h-[2px] bg-white/50 group-hover:animate-scanner" />
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <span className="absolute left-0 text-2xl">[</span>
              <span className="mx-auto">See My Site Demo</span>
              <span className="absolute right-0 text-2xl">]</span>
            </div>
          </motion.button>

          {/* Contact Us Button */}
          <motion.button
            className="group relative px-8 py-4 text-white font-bold overflow-hidden w-full"
            onClick={handleShowContact}
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <div className="absolute inset-0 border border-white">
              {/* Corner cuts */}
              <div className="absolute -top-px -left-px w-4 h-4 border-l border-t border-white" />
              <div className="absolute -top-px -right-px w-4 h-4 border-r border-t border-white" />
              <div className="absolute -bottom-px -left-px w-4 h-4 border-l border-b border-white" />
              <div className="absolute -bottom-px -right-px w-4 h-4 border-r border-b border-white" />
              {/* Animated scanner effect */}
              <div className="absolute top-0 -left-full w-full h-[2px] bg-white/50 group-hover:animate-scanner" />
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <span className="absolute left-0 text-2xl">[</span>
              <span className="mx-auto">Contact Us</span>
              <span className="absolute right-0 text-2xl">]</span>
            </div>
          </motion.button>

          {/* How It Works Button */}
          <motion.button
            className="group relative px-8 py-4 text-white font-bold overflow-hidden w-full"
            onClick={handleShowHowItWorks}
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <div className="absolute inset-0 border border-white">
              {/* Corner cuts */}
              <div className="absolute -top-px -left-px w-4 h-4 border-l border-t border-white" />
              <div className="absolute -top-px -right-px w-4 h-4 border-r border-t border-white" />
              <div className="absolute -bottom-px -left-px w-4 h-4 border-l border-b border-white" />
              <div className="absolute -bottom-px -right-px w-4 h-4 border-r border-b border-white" />
              {/* Animated scanner effect */}
              <div className="absolute top-0 -left-full w-full h-[2px] bg-white/50 group-hover:animate-scanner" />
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <span className="absolute left-0 text-2xl">[</span>
              <span className="mx-auto">How It Works</span>
              <span className="absolute right-0 text-2xl">]</span>
            </div>
          </motion.button>
        </motion.div>
      ) : showContact ? (
        <ContactForm onClose={handleCloseForm} />
      ) : showDemo ? (
        <DemoForm onClose={handleCloseForm} />
      ) : (
        <HowItWorks onClose={handleCloseForm} />
      )}
    </AnimatePresence>
  )
}

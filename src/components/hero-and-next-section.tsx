"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
}

const sections = ["Home", "About", "Services"]

export function HeroAndNextSectionComponent() {
  const [currentSection, setCurrentSection] = useState("Home")

  const navigateToSection = (section: string) => {
    setCurrentSection(section)
  }

  return (
    <div className="h-[95vh] flex bg-gradient-to-br from-gray-100 to-green-50 rounded-3xl m-4 overflow-hidden border-2 border-black">
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {currentSection === "Home" && (
            <motion.div
              key="hero"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col min-h-screen"
            >
              {/* Header Section */}
              <header className="w-full px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center relative">
                  <div className="text-xl font-semibold">Logo</div>
                  <div className="absolute left-20 right-20 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200" aria-hidden="true"></div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full px-4 py-2 text-sm font-medium bg-white hover:bg-gray-50 relative transition-transform duration-300 ease-in-out hover:scale-105"
                  >
                    New project
                  </Button>
                </div>
              </header>

              {/* Hero Content Section */}
              <section className="flex-grow flex flex-col items-center justify-center text-center px-4 relative">
                <div className="space-y-4 mb-12">
                  <h1 className="text-5xl font-bold tracking-tight pr-5 font-grillmaster">Digital agency</h1>
                  <h1 className="text-5xl font-bold tracking-tight pl-4 font-grillmaster">We change web</h1>
                  <h1 className="text-5xl font-bold tracking-tight pr-3 font-grillmaster">Try to start</h1>
                </div>

                <Button
                  className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6 text-lg font-semibold mb-16 transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  New project
                </Button>

                <div className="flex flex-col items-center">
                  <div
                    className="rounded-full border border-gray-300 p-2 mb-5 cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                    onClick={() => navigateToSection("About")}
                  >
                    <ChevronDown size={24} className="text-gray-400" />
                  </div>

                  <svg
                    className="w-60 h-16"
                    viewBox="0 0 1200 320"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1200 320C1200 143.269 1056.73 0 880 0C703.269 0 560 143.269 560 320"
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                    <path
                      d="M1040 320C1040 231.634 968.366 160 880 160C791.634 160 720 231.634 720 320"
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                    <path
                      d="M960 320C960 275.817 924.183 240 880 240C835.817 240 800 275.817 800 320"
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </section>
            </motion.div>
          )}

          {currentSection === "About" && (
            <motion.section
              key="about"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-grow flex flex-col items-center justify-center text-center px-4 relative min-h-screen"
            >
              <h2 className="text-4xl font-bold mb-8">About Us</h2>
              <div className="max-w-2xl mb-12">
                <p className="text-xl mb-6">
                  We are a cutting-edge digital agency dedicated to transforming the web landscape. With our innovative approach and expert team, we bring your digital visions to life.
                </p>
                <p className="text-xl mb-6">
                  Our mission is to create impactful digital experiences that drive growth and success for our clients. We combine creativity with technology to deliver solutions that stand out in the digital world.
                </p>
                <p className="text-xl">
                  From web design and development to digital marketing and branding, we offer comprehensive services to elevate your online presence. Let's embark on a journey to redefine your digital identity.
                </p>
              </div>
              <Button
                className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6 text-lg font-semibold mb-16 transition-transform duration-300 ease-in-out hover:scale-105"
              >
                Learn More
              </Button>
              <div
                className="rounded-full border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                onClick={() => navigateToSection("Services")}
              >
                <ChevronDown size={24} className="text-gray-400" />
              </div>
            </motion.section>
          )}

          {currentSection === "Services" && (
            <motion.section
              key="services"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-grow flex flex-col items-center justify-center text-center px-4 relative min-h-screen"
            >
              <h2 className="text-4xl font-bold mb-8">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mb-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Web Design</h3>
                  <p>Creating stunning, user-friendly websites that captivate and convert.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Web Development</h3>
                  <p>Building robust, scalable web applications with cutting-edge technologies.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Digital Marketing</h3>
                  <p>Driving growth through strategic online marketing campaigns.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Branding</h3>
                  <p>Crafting unique brand identities that resonate with your target audience.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">SEO Optimization</h3>
                  <p>Improving your online visibility and search engine rankings.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Content Creation</h3>
                  <p>Producing engaging, high-quality content that tells your story.</p>
                </div>
              </div>
              <Button
                className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6 text-lg font-semibold mb-16 transition-transform duration-300 ease-in-out hover:scale-105"
              >
                Get Started
              </Button>
              <div
                className="rounded-full border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                onClick={() => navigateToSection("Home")}
              >
                <ChevronUp size={24} className="text-gray-400" />
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Vertical Navbar */}
      <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col items-end space-y-4">
        {sections.map((section) => (
          <Button
            key={section}
            variant="ghost"
            className={`text-sm font-medium transition-colors duration-200 ${
              currentSection === section ? 'text-black' : 'text-gray-500 hover:text-black'
            }`}
            onClick={() => navigateToSection(section)}
          >
            {section}
          </Button>
        ))}
      </nav>
    </div>
  )
}
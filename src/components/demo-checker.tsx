'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Info, Mail, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const demos = [
  { name: "Bar Roma", url: "https://barroma.netlify.app/", postalCode: "M6J 2Z8" },
  { name: "COLLOSUS AUTO COLLISION", url: "https://collosus-auto.netlify.app/", postalCode: "M6N 3A4" }
]

export default function DemoCheckerPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [businessName, setBusinessName] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [demoUrl, setDemoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    if (businessName.length > 2) {
      const filteredSuggestions = demos
          .map(demo => demo.name)
          .filter(name => name.toLowerCase().includes(businessName.toLowerCase()))
      setSuggestions(filteredSuggestions)
    } else {
      setSuggestions([])
    }
  }, [businessName])

  const handleSuggestionClick = (suggestion: string) => {
    setBusinessName(suggestion)
    setSuggestions([])
  }

  const handleCheck = () => {
    const demo = demos.find(d => d.name.toLowerCase() === businessName.toLowerCase())
    if (demo) {
      if (demo.postalCode.toLowerCase() === postalCode.toLowerCase()) {
        setDemoUrl(demo.url)
        setError(null)
      } else {
        setError("Incorrect postal code. Please try again.")
        setDemoUrl(null)
      }
    } else {
      setError("Invalid business name. Please try again.")
      setDemoUrl(null)
    }
  }

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}
      >
        <motion.div
            className="absolute top-4 right-4 z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
          <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-xs bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}
          </Button>
        </motion.div>
        <div className="absolute top-4 left-4 z-10 flex space-x-2">
          <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHowItWorks(true)}
              className="text-xs bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Info className="w-4 h-4 mr-1" /> How It Works
          </Button>
          <Button
              variant="outline"
              size="sm"
              onClick={() => setShowContact(true)}
              className="text-xs bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Mail className="w-4 h-4 mr-1" /> Contact
          </Button>
        </div>
        <div className="grow flex items-center justify-center bg-[#dedede] dark:bg-[#05012a] transition-colors duration-300">
          <motion.div
              className="relative w-full max-w-md"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="bg-white dark:bg-[#05012a] rounded-[50px] shadow-[20px_20px_60px_#acacac,-20px_-20px_60px_#ffffff] dark:shadow-[50px_50px_100px_#020011,-50px_-50px_100px_#080243] p-8 transition-all duration-300">
              <h2 className="text-2xl font-bold text-center mb-6">Hi, there</h2>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleCheck(); }}>
                <div className="space-y-2 relative">
                  <Label htmlFor="businessName" className="text-gray-700 dark:text-gray-300 sr-only">
                    Business Name
                  </Label>
                  <Input
                      id="businessName"
                      placeholder="Business Name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="rounded-2xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  />
                  <AnimatePresence>
                    {suggestions.length > 0 && (
                        <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg"
                        >
                          {suggestions.map((suggestion, index) => (
                              <motion.li
                                  key={index}
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                  onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </motion.li>
                          ))}
                        </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-gray-700 dark:text-gray-300 sr-only">
                    Postal Code
                  </Label>
                  <Input
                      id="postalCode"
                      placeholder="Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="rounded-2xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="submit" className="w-full rounded-2xl bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700">
                    CHECK
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </form>
              <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                      <Alert className="mt-4 bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700">
                        <AlertTitle className="text-red-800 dark:text-red-200">Error</AlertTitle>
                        <AlertDescription className="text-red-600 dark:text-red-300">
                          {error}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                )}
                {demoUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                      <Alert className="mt-4 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                        <AlertTitle className="text-gray-800 dark:text-white">Demo Available</AlertTitle>
                        <AlertDescription className="text-gray-600 dark:text-gray-300">
                          Your demo is ready. Click the button below to open it in a new tab.
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="link"
                                className="mt-2 p-0 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                onClick={() => window.open(demoUrl, '_blank', 'noopener,noreferrer')}
                            >
                              Open Demo <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </motion.div>
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        {showHowItWorks && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-3xl max-h-[80vh] overflow-y-auto">
                <h3 className="text-3xl font-bold mb-6 text-center">How It Works</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">1. Enter Your Details</h4>
                      <p className="text-gray-600 dark:text-gray-300">Simply input your business name and postal code to view your personalized demo site.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">2. Review Your Demo</h4>
                      <p className="text-gray-600 dark:text-gray-300">Take a look at your custom-made demo site and imagine the possibilities for your business online presence.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">3. Choose Your Next Step</h4>
                      <p className="text-gray-600 dark:text-gray-300">After viewing, you can either:</p>
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Email us directly to discuss your project</li>
                        <li>Book a quick 10-minute consultation call</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">4. Customize Your Site</h4>
                      <p className="text-gray-600 dark:text-gray-300">During our chat, we'll discuss your needs and offer package options:</p>
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Basic: Launch your demo site as-is</li>
                        <li>Custom: Add extra features and pages</li>
                        <li>Ongoing Support: Get SEO, updates, and marketing help</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h4  className="text-xl font-semibold mb-2">5. Quick Turnaround</h4>
                      <p className="text-gray-600 dark:text-gray-300">We'll finalize your site within one week, keeping you updated throughout the process.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">6. Launch and Support</h4>
                      <p className="text-gray-600 dark:text-gray-300">Once you're happy, we'll launch your site and provide full access. We're here to support you even after your site goes live!</p>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-lg italic text-center text-gray-600 dark:text-gray-300">Our mission: Get your stunning site live fast, ensuring it perfectly fits your business needs!</p>
                <div className="mt-6 text-center">
                  <Button onClick={() => setShowHowItWorks(false)}>Close</Button>
                </div>
              </div>
            </div>
        )}
        {showContact && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md">
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <p className="mb-4">For any inquiries, please contact us at support@semprestudios.com</p>
                <Button onClick={() => setShowContact(false)}>Close</Button>
              </div>
            </div>
        )}
      </motion.div>
  )
}
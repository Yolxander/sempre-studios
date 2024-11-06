'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, HelpCircle, Mail } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
    weight: "400",
    subsets: ["latin"],
});
const demos = [
    { name: "Bar Roma", url: "https://barroma.netlify.app/", postalCode: "M6J 2Z8" },
    { name: "COLLOSUS AUTO COLLISION", url: "https://collosus-auto.netlify.app/", postalCode: "M6N 3A4" }
]

export default function DemoCheckerPage() {
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
            className="min-h-screen flex flex-col bg-[#dedede]"
        >
            <div className="grow flex items-center justify-center">
                <motion.div
                    className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    <div className="bg-white rounded-[50px] shadow-[20px_20px_60px_#acacac,-20px_-20px_60px_#ffffff] p-8 transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="md:text-3xl text-xl font-bold text-gray-800">Welcome to <span className={`${audiowide.className} md:text-3xl text-xl font-bold text-gray-800`}>Sempre Studios </span></h2>
                            <div className="flex space-x-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowHowItWorks(true)}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    <HelpCircle className="w-5 h-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowContact(true)}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    <Mail className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-lg text-gray-600 mb-6">To see your demo, please enter your business name and postal code:</p>
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleCheck(); }}>
                            <div className="space-y-2 relative">
                                <Label htmlFor="businessName" className="text-gray-700">
                                    Business Name
                                </Label>
                                <Input
                                    id="businessName"
                                    placeholder="Enter your business name"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    className="rounded-2xl border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <AnimatePresence>
                                    {suggestions.length > 0 && (
                                        <motion.ul
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg"
                                        >
                                            {suggestions.map((suggestion, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
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
                                <Label htmlFor="postalCode" className="text-gray-700">
                                    Postal Code
                                </Label>
                                <Input
                                    id="postalCode"
                                    placeholder="Enter your postal code"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="rounded-2xl border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button type="submit" className="w-full rounded-2xl bg-black text-white">
                                    Check
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
                                    <Alert className="mt-4 bg-red-100 border-red-300">
                                        <AlertTitle className="text-red-800">Error</AlertTitle>
                                        <AlertDescription className="text-red-600">
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
                                    <Alert className="mt-4 bg-green-100 border-green-300">
                                        <AlertTitle className="text-green-800">Demo Available</AlertTitle>
                                        <AlertDescription className="text-green-600">
                                            Your demo is ready. Click the button below to open it in a new tab.
                                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Button
                                                    variant="link"
                                                    className="mt-2 p-0 text-blue-600 hover:text-blue-800"
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
                    <div className="bg-white p-8 rounded-lg max-w-3xl max-h-[80vh] overflow-y-auto">
                        <h3 className="text-3xl font-bold mb-6 text-center text-gray-900">How It Works</h3>
                        {/* ... (rest of the How It Works modal content) ... */}
                        <div className="mt-6 text-center">
                            <Button onClick={() => setShowHowItWorks(false)}>Close</Button>
                        </div>
                    </div>
                </div>
            )}
            {showContact && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">Contact Us</h3>
                        <p className="mb-4 text-gray-600">For any inquiries, please contact us at support@semprestudios.com</p>
                        <Button onClick={() => setShowContact(false)} className="bg-blue-500 hover:bg-blue-600 text-white">Close</Button>
                    </div>
                </div>
            )}
        </motion.div>
    )
}
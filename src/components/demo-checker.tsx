"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {  ExternalLink, Mail, Search, Globe, Key, Phone } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

import { Audiowide } from "next/font/google"
import Link from 'next/link'

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
})

interface ClientSite {
  name: string
  postalCode: string
  url: string
}

interface DemoSite {
  id: string
  name: string
  description: string
  imageUrl: string
  demoUrl: string
  industry: string
}

const clientSites: ClientSite[] = [
  { name: "Bar Roma", postalCode: "M6J 2Z8", url: "https://barroma.netlify.app/" },
  { name: "COLLOSUS AUTO COLLISION", postalCode: "M6N 3A4", url: "https://collosus-auto.netlify.app/" },
]

const demoSites: DemoSite[] = [
  {
    id: "1",
    name: "Infinity Property Management",
    description: "Modern property management website",
    imageUrl: "/placeholder.svg?height=200&width=300",
    demoUrl: "https://infinitypm.netlify.app/",
    industry: "Real Estate"
  },
  {
    id: "2",
    name: "Packaging World",
    description: "Innovative packaging solutions website",
    imageUrl: "/placeholder.svg?height=200&width=300",
    demoUrl: "https://packaging-world.netlify.app/",
    industry: "Manufacturing"
  },
]

export default function DemoAccessCatalogPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [businessName, setBusinessName] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [clientSiteUrl, setClientSiteUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDemos, setFilteredDemos] = useState<DemoSite[]>(demoSites)
  const [selectedDemo, setSelectedDemo] = useState<DemoSite | null>(null)
  const [showCallbackForm, setShowCallbackForm] = useState(false)
  const [callbackName, setCallbackName] = useState('')
  const [callbackEmail, setCallbackEmail] = useState('')
  const [callbackMessage, setCallbackMessage] = useState('')

  useEffect(() => {
    const filtered = demoSites.filter(demo =>
        demo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demo.industry.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredDemos(filtered)
  }, [searchTerm])

  const handleClientSiteCheck = () => {
    const site = clientSites.find(
        s => s.name.toLowerCase() === businessName.toLowerCase() && s.postalCode === postalCode
    )
    if (site) {
      setClientSiteUrl(site.url)
      setError(null)
    } else {
      setError("We couldn't find a site matching the provided information. Please check your details or contact support.")
      setClientSiteUrl(null)
    }
  }

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("Callback request:", { callbackName, callbackEmail, callbackMessage })
    // Reset form and show confirmation
    setCallbackName('')
    setCallbackEmail('')
    setCallbackMessage('')
    setShowCallbackForm(false)
    // You might want to show a success message to the user here
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <motion.header
            className="md:px-12 px-4 py-6 bg-[#F3F2EF] min-w-screen"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className={`${audiowide.className} text-2xl font-bold`}>
              Sempre Studios
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:block bg-white rounded-full shadow-md px-6 py-2">
              <ul className="flex space-x-6">
                <li><Link href="#customer-access" className="text-gray-600 hover:text-gray-900">Access Your Site</Link></li>
                <li><Link href="#demo-catalog" className="text-gray-600 hover:text-gray-900">Demo Catalog</Link></li>
                <li><Link href="#request-callback" className="text-gray-600 hover:text-gray-900">Request a Call</Link></li>
              </ul>
            </nav>
            {/* Desktop Call-to-Action */}
            <div className="hidden md:flex items-center space-x-6 mr-6">
              <Link href="https://calendly.com/hello-semprestudios/30min" passHref>
                <Button variant="outline" className="rounded-full">Get Started</Button>
              </Link>
            </div>
            {/* Hamburger Menu Button */}
            <button className="md:hidden relative z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <motion.div
                  className="h-1 w-6 bg-black rounded"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    translateY: isMenuOpen ? 6 : 0
                  }}
                  transition={{ duration: 0.3 }}
              />
              <motion.div
                  className="h-1 w-6 bg-black rounded my-1"
                  animate={{
                    opacity: isMenuOpen ? 0 : 1
                  }}
                  transition={{ duration: 0.3 }}
              />
              <motion.div
                  className="h-1 w-6 bg-black rounded"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    translateY: isMenuOpen ? -6 : 0
                  }}
                  transition={{ duration: 0.3 }}
              />
            </button>
          </div>
          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
                <motion.nav
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center"
                >
                  <ul className="flex flex-col space-y-4 text-lg">
                    <li>
                      <Link href="#customer-access" className="text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Access Your Site</Link>
                    </li>
                    <li>
                      <Link href="#demo-catalog" className="text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Demo Catalog</Link>
                    </li>
                    <li>
                      <Link href="#request-callback" className="text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Request a Call</Link>
                    </li>
                    <li>
                      <Link href="https://calendly.com/hello-semprestudios/30min" passHref>
                        <Button variant="outline" className="rounded-full w-full text-[20px] text-gray-600 shadow-md" onClick={() => setIsMenuOpen(false)}>
                          Get Started
                        </Button>
                      </Link>
                    </li>
                  </ul>
                </motion.nav>
            )}
          </AnimatePresence>
        </motion.header>

        {/* Hero Section */}
        <motion.section
            className="bg-gradient-to-r from-primary to-primary-dark text-white py-20"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
        >
          <div className="container mx-auto px-4">
            <motion.h1
                className={`${audiowide.className} text-5xl font-bold mb-6 text-center`}
                variants={fadeInUp}
            >
              Welcome to Sempre Studios Demo Portal
            </motion.h1>
            <motion.p
                className="text-xl text-center mb-12"
                variants={fadeInUp}
            >
              Access your custom-built site or explore our demo catalog
            </motion.p>
            <motion.div
                className="flex justify-center space-x-4"
                variants={fadeInUp}
            >
              <Button variant="secondary" size="lg" asChild>
                <Link href="#customer-access">Access Your Site</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#demo-catalog">Explore Demos</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Customer Access Section */}
        <section id="customer-access" className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2
                className={`${audiowide.className} text-3xl font-bold mb-8 text-center`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
              Access Your Custom Site
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
            >
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Enter Your Details</CardTitle>
                  <CardDescription>Provide your business name and postal code to view your site</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => { e.preventDefault(); handleClientSiteCheck(); }} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            id="businessName"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="Enter your business name"
                            className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            id="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="Enter your postal code"
                            className="pl-10"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Access My Site</Button>
                  </form>
                </CardContent>
                <CardFooter>
                  {error && (
                      <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                  )}
                  {clientSiteUrl && (
                      <Alert>
                        <AlertTitle>Site Found</AlertTitle>
                        <AlertDescription>
                          Your site is ready. Click the button below to view it.
                          <Button
                              variant="link"
                              onClick={() => window.open(clientSiteUrl, '_blank', 'noopener,noreferrer')}
                          >
                            View My Site <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </AlertDescription>
                      </Alert>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Demo Catalog Section */}
        <section id="demo-catalog" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2
                className={`${audiowide.className} text-3xl font-bold mb-8 text-center`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
              Explore Our Demo Catalog
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
            >
              <Label htmlFor="search" className="sr-only">Search demos</Label>
              <div className="relative max-w-md mx-auto">
                <Input
                    id="search"
                    type="text"
                    placeholder="Search by name or industry"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </motion.div>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
              {filteredDemos.map((demo) => (
                  <motion.div key={demo.id} variants={fadeInUp}>
                    <Card className="flex flex-col h-full">
                      <CardHeader>
                        <CardTitle>{demo.name}</CardTitle>
                        <CardDescription>{demo.industry}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <img src={demo.imageUrl} alt={demo.name} className="w-full h-48 object-cover rounded-md mb-4" />
                        <p className="text-sm text-gray-600">{demo.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => setSelectedDemo(demo)}>
                          View Details
                        </Button>
                        <Button onClick={() => window.open(demo.demoUrl, '_blank', 'noopener,noreferrer')}>
                          Open Demo <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Request Callback Section */}
        <section id="request-callback" className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2
                className={`${audiowide.className} text-3xl font-bold mb-8 text-center`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
              Request a Call or Order a Site
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
            >
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>We'd love to hear from you about our web services or to help you order a site from our catalog.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCallbackSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="callbackName">Name</Label>
                      <Input
                          id="callbackName"
                          value={callbackName}
                          onChange={(e) => setCallbackName(e.target.value)}
                          placeholder="Your name"
                          required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="callbackEmail">Email</Label>
                      <Input
                          id="callbackEmail"
                          type="email"
                          value={callbackEmail}
                          onChange={(e) => setCallbackEmail(e.target.value)}
                          placeholder="Your email"
                          required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="callbackMessage">Message</Label>
                      <Textarea
                          id="callbackMessage"
                          value={callbackMessage}
                          onChange={(e) => setCallbackMessage(e.target.value)}
                          placeholder="Tell us about your project or which demo site you're interested in"
                          required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Request Callback <Phone className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <Dialog open={!!selectedDemo} onOpenChange={() => setSelectedDemo(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedDemo?.name}</DialogTitle>
              <DialogDescription>{selectedDemo?.industry}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <img src={selectedDemo?.imageUrl} alt={selectedDemo?.name} className="w-full h-64 object-cover rounded-md mb-4" />
              <p className="text-gray-600 mb-4">{selectedDemo?.description}</p>
              <Button className="w-full" onClick={() => window.open(selectedDemo?.demoUrl, '_blank', 'noopener,noreferrer')}>
                Open Full Demo <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Contact Support Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
                className={`${audiowide.className} text-3xl font-bold mb-4`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
              Need Help?
            </motion.h2>
            <motion.p
                className="text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
            >
              If you're having trouble accessing your site or have any questions, please contact our support team.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
            >
              <Button size="lg" onClick={() => window.location.href = 'mailto:support@semprestudios.com'}>
                Contact Support <Mail className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
  )
}
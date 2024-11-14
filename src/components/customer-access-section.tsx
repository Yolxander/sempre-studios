"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExternalLink, Globe, Key, ArrowRight } from 'lucide-react'
import { ClientSite } from './demo-access-catalog'

interface CustomerAccessSectionProps {
    audiowide: { className: string }// Replace 'any' with the actual type from the font import
    clientSites: ClientSite[]
}

export default function CustomerAccessSectionComponent({ audiowide, clientSites }: CustomerAccessSectionProps) {
    const [businessName, setBusinessName] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [clientSiteUrl, setClientSiteUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

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

    return (
        <section id="customer-access" className="py-20">
            <div className="container mx-auto px-4">
                <motion.h2 
                    className={`${audiowide.className} text-4xl font-bold mb-8 text-center`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Access Your Custom Site
                </motion.h2>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
                        <ol className="list-decimal list-inside space-y-4">
                            <li>Enter your business name and postal code in the form.</li>
                            <li>Our system will verify your information.</li>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <li>If a match is found, you'll get instant access to your custom site.</li>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <li>If not found, don't worry! We're here to help you get started.</li>
                        </ol>
                        <div className="mt-8">
                            <Button asChild className="bg-black text-white hover:bg-gray-800 rounded-full">
                                <Link href="#request-callback">
                                    Need Help? Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <Card className="bg-white rounded-3xl shadow-md">
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
                                    <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 rounded-full">Access My Site</Button>
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
            </div>
        </section>
    )
}
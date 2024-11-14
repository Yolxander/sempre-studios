"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Phone } from 'lucide-react'

interface RequestCallbackSectionProps {
    audiowide: { className: string }// Replace 'any' with the actual type from the font import
}

export default function RequestCallbackSectionComponent({ audiowide }: RequestCallbackSectionProps) {
    const [callbackName, setCallbackName] = useState('')
    const [callbackEmail, setCallbackEmail] = useState('')
    const [callbackMessage, setCallbackMessage] = useState('')

    const handleCallbackSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Callback request:", { callbackName, callbackEmail, callbackMessage })
        setCallbackName('')
        setCallbackEmail('')
        setCallbackMessage('')
        // You might want to show a success message to the user here
    }

    return (
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
                    <Card className="max-w-md mx-auto bg-white rounded-3xl shadow-md">
                        <CardHeader>
                            <CardTitle>Get in Touch</CardTitle>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
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
                                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 rounded-full">
                                    Request Callback <Phone className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
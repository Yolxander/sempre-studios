// src/components/ContactForm.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ContactForm({ onClose }: { onClose: () => void }) {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        setIsSubmitted(true)

        // Simulate form submission (here, you can handle actual submission logic, like sending data to a server)
        setTimeout(() => {
            onClose() // Close the modal after a delay
        }, 3000) // 3-second delay for thank you message
    }

    return (
        <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            {isSubmitted ? (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                    <p className="text-lg text-gray-700">Your message has been submitted successfully. We will get back to you soon.</p>
                </div>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-4">Contact Sales</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-left text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-left text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-left text-gray-700">Message</label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Your Message"
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" onClick={onClose} className="rounded-full">
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-black text-white hover:bg-gray-800 rounded-full">
                                Submit
                            </Button>
                        </div>
                    </form>
                </>
            )}
        </div>
    )
}

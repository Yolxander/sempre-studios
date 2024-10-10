// src/components/PackagesModal.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react";

export default function PackagesModal({ onClose }: { onClose: () => void }) {
    const packages = [
        {
            title: "Basic Package",
            description: "A custom-designed landing page with content creation tailored to your business.",
            features: [
                "Custom Design",
                "Content Creation",
            ],
        },
        {
            title: "Complete Business Package",
            description: "Includes everything from the Landing Page plus a booking system and brand support.",
            features: [
                "Landing Page",
                "Booking System",
                "Brand Support",
                "Multi page Website",
                "SEO",
                "Analytics",
                "Technical Support"
            ],
        },
        {
            title: "Premium Package",
            description: "The ultimate package with bookings, email marketing, and all previous features.",
            features: [
                "All features from Business Package",
                "Email Marketing Integration",
                "Social Media Management",
            ],
        },
    ]

    const [currentPackageIndex, setCurrentPackageIndex] = useState(0)

    const handlePackageChange = (index: number) => {
        setCurrentPackageIndex(index)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
            {/* Update to cover full screen */}
            <div className="bg-white p-6 rounded-lg w-full md:h-full h-[100vh] md:max-h-[90vh] overflow-y-auto relative">
                {/* Close button positioned in the top right */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                    <X className="h-6 w-6" /> {/* Close icon from Lucide */}
                </button>
                <h2 className="text-2xl font-bold mb-4">Our Packages</h2>
                <p className="text-gray-600 mb-4">These are general packages and can be customized based on your specific needs and business requirements.</p>

                {/* Display the current package */}
                <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                        <h3 className="text-xl font-semibold mb-2">{packages[currentPackageIndex].title}</h3>
                        <p className="text-gray-700 mb-2">{packages[currentPackageIndex].description}</p>
                        <ul className="list-disc pl-5 mb-2">
                            {packages[currentPackageIndex].features.map((feature, i) => (
                                <li key={i} className="text-gray-600">{feature}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Toggle buttons to switch between packages */}
                <div className="flex flex-col md:flex-row justify-around mt-6 space-y-2 md:space-y-0 md:space-x-4">
                    <Button
                        variant={currentPackageIndex === 0 ? "default" : "outline"}
                        onClick={() => handlePackageChange(0)}
                        className="rounded-full w-full md:w-auto"
                    >
                        Basic Package
                    </Button>
                    <Button
                        variant={currentPackageIndex === 1 ? "default" : "outline"}
                        onClick={() => handlePackageChange(1)}
                        className="rounded-full w-full md:w-auto"
                    >
                        Complete Business Package
                    </Button>
                    <Button
                        variant={currentPackageIndex === 2 ? "default" : "outline"}
                        onClick={() => handlePackageChange(2)}
                        className="rounded-full w-full md:w-auto"
                    >
                        Premium Package
                    </Button>
                </div>
            </div>
        </div>
    )
}

import { motion } from "framer-motion"
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function OnlinePresence() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-100 py-24"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 mb-8 lg:mb-0">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Comprehensive Online Presence Packages</h2>
                        <p className="text-lg md:text-xl text-gray-600 mb-8">
                            From website creation to ongoing management, we offer complete solutions to establish and maintain your digital presence.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Button size="lg" className="bg-black text-white hover:bg-gray-800 rounded-full">
                                View Packages
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <Image
                            src="/placeholder.svg"
                            width={600}
                            height={400}
                            alt="Online Presence Dashboard"
                            className="rounded-lg shadow-xl"
                        />
                        <div className="absolute -bottom-10 -left-10 bg-white rounded-lg shadow-md p-4 max-w-xs">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                                <div>
                                    <h4 className="font-semibold">Website Analytics</h4>
                                    <p className="text-sm text-gray-600">Your site traffic is up 25% this month!</p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    25%
                                </div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full">
                                    <div className="w-1/4 h-full bg-green-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-4 right-10 bg-white rounded-lg shadow-md p-4 max-w-xs">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                                <div>
                                    <p className="text-sm text-gray-600">SEO optimization complete for this week</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
    return (
        <main className="container mx-auto px-4 py-24 text-center h-[95vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    Your new website is ready<br />to launch
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    We create customized demo sites for businesses that need an updated or first-time web presence. See your future website today!
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button size="lg" className="bg-black text-white hover:bg-gray-800 rounded-full">View Demo</Button>
                    <Button variant="outline" size="lg" className="rounded-full">Contact Sales</Button>
                </div>
            </motion.div>
        </main>
    )
}
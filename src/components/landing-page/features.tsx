import { motion } from "framer-motion"
import {Poppins} from "@next/font/google";
const poppins = Poppins({
    weight: ["400", "300"], // Roboto Condensed has multiple weights
    subsets: ["latin"],
});
export default function Features() {
    return (
        <div className={`${poppins.className} bg-gray-100 py-12`}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-center mb-12"
                >
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-8xl mx-auto py-12">
                        Sempre Studios creates ready-to-launch websites for businesses across all industries. Get your professional online presence today.
                    </p>
                </motion.div>
                <div className="flex flex-col lg:flex-row gap-8 lg:h-[90vh]">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 flex flex-col gap-8 h-full"
                    >
                        <div className="bg-[#f8f7f4] p-8 rounded-3xl shadow-md flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-gray-500">Step 1</h3>
                            <h4 className="text-2xl md:text-3xl font-bold mb-4">Custom Demo Creation</h4>
                            <p className="text-gray-600">We proactively create a customized demo site tailored to your business needs, ready for your review.</p>
                        </div>
                        <div className="bg-[#f8f7f4] p-8 rounded-3xl shadow-md flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-gray-500">Step 2</h3>
                            <h4 className="text-2xl md:text-3xl font-bold mb-4">Instant Preview</h4>
                            <p className="text-gray-600">Receive your demo site directly via email, allowing you to see exactly what your new website could look like.</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-2/3 bg-[#f8f7f4] p-8 rounded-3xl shadow-md flex flex-col justify-between h-full"
                    >
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-500">Step 3</h3>
                            <h4 className="text-2xl md:text-3xl font-bold mb-4">Launch Your Site</h4>
                            <p className="text-gray-600">With a simple purchase, your new website can go live immediately. We offer ongoing support and management to keep your online presence thriving.</p>
                        </div>
                        <div className="mt-8 flex-grow">
                            <div className="w-full h-full bg-gray-300 rounded-xl"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from "next/link";
import {useState} from "react";
import ContactForm from "@/components/ContactForm"

export default function CallToAction() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black text-white py-24 relative overflow-hidden"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kaleidico-wnf_LJiJG0E-unsplash-IjCLpsqjc6X0rAeeSmRefQCsPjmvIw.jpg"
                    alt="Collaborative workspace"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-20"
                />
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                        Ready to launch your new website?
                    </h2>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                        <Link className="md:w-fit	w-full" href="https://calendly.com/hello-semprestudios/welcome" passHref>
                            <Button size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full px-8 w-full">
                                Get started
                            </Button>
                        </Link>
                        {/*<Button onClick={handleModalToggle} variant="outline" size="lg" className="text-black border-white hover:bg-white hover:text-black rounded-full px-8">*/}
                        {/*    Contact Sales*/}
                        {/*</Button>*/}
                    </div>
                </div>
            </div>
            <div className="absolute top-8 right-8 z-20 hidden">
                <Image
                    src="/placeholder.svg"
                    alt="QR Code"
                    width={100}
                    height={100}
                    className="bg-white p-2 rounded-lg"
                />
            </div>

            {/* Modal for Contact Sales */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <ContactForm onClose={handleModalToggle} />
                </div>
            )}
        </motion.section>
    )
}
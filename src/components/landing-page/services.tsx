"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { TextSectionComponent } from "@/components/landing-page/text-section"
import {Globe, Cog, PenTool, Users, CreditCard, Rocket} from 'lucide-react'

interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export default function Services() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-100 py-24"
        >
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-100 pt-15"
            >
                <div className="container mx-auto px-4">
                    <TextSectionComponent
                        title="Our Services"
                        subtitle="Empowering Your Digital Success"
                        description="We're dedicated to helping businesses of all sizes establish and grow their online presence. Our services are tailored to maximize your digital potential and drive real results for your business."
                    />
                    <div className="grid md:grid-cols-2 gap-8">
                        <ServiceCard
                            title="Rapid Website Development"
                            description="Transform your online presence in days. Our streamlined process delivers a professional, customized website that perfectly represents your brand and engages your audience effectively."
                            icon={<Globe className="w-6 h-6 text-white" />}
                        />
                        <ServiceCard
                            title="Cutting-Edge Technology Integration"
                            description="Stay ahead of the curve with our expert technology integration. We identify and implement the most effective tools and systems to enhance your operations and drive business growth."
                            icon={<Cog className="w-6 h-6 text-white" />}
                        />
                        <ServiceCard
                            title="Comprehensive Website Management"
                            description="Focus on your business while we handle the rest. Our team ensures your website remains up-to-date, secure, and optimized for search engines, keeping you at the forefront of your industry."
                            icon={<Rocket className="w-6 h-6 text-white" />}
                        />
                        <ServiceCard
                            title="Strategic Brand Development"
                            description="Elevate your brand with our targeted content strategies. From engaging social media campaigns to compelling newsletters and blog posts, we help you build a strong, consistent brand presence."
                            icon={<PenTool className="w-6 h-6 text-white" />}
                        />
                        <ServiceCard
                            title="Streamlined Customer Management"
                            description="Enhance your customer experience with tailored booking systems and quote generators. Our solutions streamline your operations, saving you time and improving client satisfaction."
                            icon={<Users className="w-6 h-6 text-white" />}
                        />
                        <ServiceCard
                            title="Flexible Solutions"
                            description="We understand that every business is unique. Our adaptable approach ensures you get the exact services you need to succeed, with solutions that grow and evolve with your business."
                            icon={<CreditCard className="w-6 h-6 text-white" />}
                        />
                    </div>
                </div>
            </motion.section>
        </motion.section>
    )
}

function ServiceCard({ title, description, icon }: ServiceCardProps) {
    const cardRef = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    })

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])

    const [inViewRef, inView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    })

    const setRefs = (node: HTMLDivElement | null) => {
        cardRef.current = node
        inViewRef(node)
    }

    const contentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { delay: 0.2, duration: 0.5 }
        }
    }

    return (
        <motion.div
            ref={setRefs}
            style={{
                scale,
                opacity,
            }}
            className="bg-white rounded-3xl shadow-md relative overflow-hidden h-full"
        >
            <motion.div
                className="w-16 h-16 bg-primary rounded-full absolute top-8 left-8 flex items-center justify-center"
                initial={{ scale: 1 }}
                animate={{ scale: inView ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
            >
                {icon}
            </motion.div>
            <motion.div
                variants={contentVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="p-8 pt-28"
            >
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </motion.div>
        </motion.div>
    )
}
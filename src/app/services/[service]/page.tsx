// ServiceDetail.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Audiowide } from "@next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DarkModeToggle } from "@/components/DarkModeToggle";

// Initialize Audiowide font
const audiowide = Audiowide({
    weight: "400",
    subsets: ["latin"],
});

// Section animation variants
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
};

// Define all services
const services = {
    "web-design": {
        title: "Web Design",
        description: "We create visually stunning and user-friendly websites that captivate your audience.",
        details: "Our web design services include everything from basic landing pages to full-blown e-commerce sites. We focus on creating responsive, engaging designs that convert visitors into customers.",
    },
    "web-development": {
        title: "Web Development",
        description: "Our expert developers build robust and scalable web applications tailored to your needs.",
        details: "We develop custom web applications, ensuring they are fast, scalable, and reliable.",
    },
    branding: {
        title: "Branding",
        description: "We craft unique brand identities that resonate with your target audience.",
        details: "Our branding services focus on creating logos, typography, and brand strategies.",
    },
    "website-maintenance": {
        title: "Website Maintenance",
        description: "Keep your website secure, fast, and up-to-date with our maintenance plans.",
        details: "We offer ongoing maintenance services, including security updates, backups, and performance optimizations.",
    },
    "content-creation": {
        title: "Content Creation",
        description: "Our creative team produces engaging and valuable content that tells your story effectively.",
        details: "We create written, visual, and video content that resonates with your audience.",
    },
    "lead-generation": {
        title: "Lead Generation",
        description: "We help you generate qualified leads through digital strategies and campaigns.",
        details: "Our lead generation services include email marketing, landing page optimization, and funnel design.",
    },
};

export default function ServiceDetail({ params }: { params: { service: string } }) {
    const serviceDetail = services[params.service];
    if (!serviceDetail) {
        notFound();
    }

    const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

    // Toggle dark mode state
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Handle mouse movement for dynamic background
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { clientX, clientY, currentTarget } = event;
        const rect = currentTarget.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        setGradientPosition({ x, y });
    };

    return (
        <div
            className={`md:h-[95vh] md:m-4 md:rounded-3xl h-[100vh] m-0 flex overflow-hidden border-[5px] transition-colors duration-500 overflow-y-hidden relative ${
                isDarkMode
                    ? "bg-gray-900 border-gray-800 text-white"
                    : "border-[#083d77] text-[#083d77]"
            }`}
            style={{
                background: isDarkMode
                    ? ""
                    : `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, 
                #DCE1F6 0%, #F6F7FC 50%, #DCE1F6 100%)`,
            }}
            onMouseMove={handleMouseMove}
        >
            <div className="flex-grow">
                <motion.div
                    key="service"
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col min-h-screen"
                >
                    <header className="w-full md:px-6 px-3 py-4">
                        <div className="max-w-8xl mx-auto flex justify-between items-center relative">
                            <div className="text-xl font-semibold">
                                <div className={`logo ${audiowide.className}`}>
                                    <div
                                        className={`icon ${audiowide.className} ${
                                            isDarkMode
                                                ? "bg-gray-800 text-white border-white"
                                                : "text-[#083d77]"
                                        }`}
                                    >
                                        S
                                    </div>
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={`rounded-full px-4 py-2 text-[20px] font-medium relative transition-transform duration-300 ease-in-out hover:scale-105 ${audiowide.className} ${
                                        isDarkMode
                                            ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                                            : "bg-white text-[#083d77] border-black"
                                    }`}
                                >
                                    <Link href="/services">Go Back</Link>
                                </Button>
                            </div>

                            {/* Dark Mode Toggle */}
                        </div>
                    </header>

                    {/* Service Detail Section */}
                    <section className="flex-grow flex flex-col items-center justify-center text-center px-4 relative">
                        <div className="space-y-4 mb-12">
                            <h1
                                className={`text-[40px] md:text-[80px] font-bold tracking-tight ${audiowide.className}`}
                            >
                                {serviceDetail.title}
                            </h1>
                            <h2
                                className={`text-[30px] md:text-[50px] font-bold tracking-tight font-light ${audiowide.className}`}
                            >
                                {serviceDetail.description}
                            </h2>
                        </div>

                        <p className="text-md max-w-3xl mb-6">{serviceDetail.details}</p>

                        <div className="mt-10">
                            <Link href="/services">
                                <Button
                                    className={`rounded-full px-8 py-6 text-lg font-semibold transition-transform duration-300 ease-in-out hover:scale-105 ${
                                        isDarkMode
                                            ? "bg-white text-black hover:bg-gray-100"
                                            : "bg-[#083d77] text-white hover:bg-gray-800"
                                    }`}
                                >
                                    Back to Services
                                </Button>
                            </Link>
                        </div>
                    </section>
                </motion.div>

                <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>
        </div>
    );
}

// src/app/services/[service]/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Audiowide } from "@next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { services } from "@/data/services"; // Import services

// Initialize Audiowide font
const audiowide = Audiowide({
    weight: "400",
    subsets: ["latin"],
});

// Section animation variants
const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
};

// Define the services type
type ServiceKey = keyof typeof services;

export default function ServiceDetail({ params }: { params: { service: string } }) {
    // Ensure the selected service is typed correctly using `ServiceKey`
    const [selectedService, setSelectedService] = useState<ServiceKey>(
        (params.service as ServiceKey) || "landing-page-creation"
    );
    const serviceDetail = services[selectedService];

    if (!serviceDetail) {
        notFound();
    }

    const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
    const [showMonthly, setShowMonthly] = useState(true); // Toggle state for pricing
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown toggle for mobile
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

    // Toggle dark mode state
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    // Toggle between one-time and monthly pricing
    const togglePricing = () => setShowMonthly(!showMonthly);
    // Toggle dropdown
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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
                isDarkMode ? "bg-gray-900 border-gray-800 text-white" : "border-[#083d77] text-[#083d77]"
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
                                <Link href="/">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className={`pointer rounded-full px-4 py-2 text-[20px] font-medium relative transition-transform duration-300 ease-in-out hover:scale-105 ${audiowide.className} ${
                                            isDarkMode
                                                ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                                                : "bg-white text-[#083d77] border-black"
                                        }`}
                                    >
                                        Go Back
                                    </Button>
                                </Link>
                            </div>

                            {/* Services Dropdown (Mobile/Tablet) */}
                            <div className="block lg:hidden relative w-full">
                                <Button
                                    variant="outline"
                                    className={`rounded-full w-full px-4 py-2 font-medium ${audiowide.className}`}
                                    onClick={toggleDropdown}
                                >
                                    {services[selectedService].title} ⬇
                                </Button>

                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10 mt-2"
                                    >
                                        {Object.keys(services).map((service) => (
                                            <Button
                                                key={service}
                                                variant="ghost"
                                                className={`w-full text-left px-4 py-2 ${audiowide.className} ${
                                                    selectedService === service
                                                        ? isDarkMode
                                                            ? "text-white"
                                                            : "text-[#083d77]"
                                                        : isDarkMode
                                                            ? "text-gray-500 hover:text-white"
                                                            : "text-gray-500 hover:text-[#083d77]"
                                                }`}
                                                onClick={() => {
                                                    setSelectedService(service as ServiceKey); // Fixed type error
                                                    setIsDropdownOpen(false);
                                                }}
                                            >
                                                {services[service as ServiceKey].title}
                                            </Button>
                                        ))}
                                    </motion.div>
                                )}
                            </div>

                            {/* Dark Mode Toggle */}
                        </div>
                    </header>

                    {/* Service Detail Section */}
                    <AnimatePresence mode="wait">
                        <motion.section
                            key={selectedService}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sectionVariants}
                            className="flex-grow flex flex-col items-center justify-center text-center px-4 relative md:mr-[100px]"
                        >
                            <div className="space-y-4 mb-2">
                                <h1 className={`text-[30px] md:text-[35px] font-bold tracking-tight md ${audiowide.className}`}>
                                    {serviceDetail.title}
                                </h1>
                                <p className={`text-[18px] md:text-[20px] font-bold tracking-tight font-light`}>
                                    {serviceDetail.description}
                                </p>
                            </div>

                            <p className="text-[18px] md:text-[20px] mb-6 md:max-w-[70vw]">
                                {serviceDetail.details}
                            </p>

                            {/* Pricing Section */}
                            <div className="w-full max-w-4xl mx-auto mt-2 px-4">
                                <h3 className={`text-[25px] font-semibold ${audiowide.className}`}>
                                    Pricing
                                </h3>

                                {/* Toggle Button */}
                                <div className="mt-4 flex justify-center">
                                    <Button
                                        onClick={togglePricing}
                                        className={`rounded-full px-8 py-4 text-lg font-semibold transition-transform duration-300 ease-in-out hover:scale-105 ${
                                            isDarkMode
                                                ? "bg-white text-black hover:bg-gray-100"
                                                : "bg-[#083d77] text-white hover:bg-gray-800"
                                        }`}
                                    >
                                        {showMonthly ? "Switch to One-Time Pricing" : "Switch to Monthly Pricing"}
                                    </Button>
                                </div>

                                {/* Pricing Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 h-[30vh] mb-6">
                                    {Object.entries(serviceDetail.pricing).map(([tier, price]) => (
                                        <div
                                            key={tier}
                                            className={`border rounded-lg p-6 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 ${
                                                isDarkMode
                                                    ? "bg-gray-800 border-gray-700 text-white"
                                                    : "bg-white border-gray-300"
                                            }`}
                                        >
                                            <h4 className={`text-[22px] font-bold ${audiowide.className}`}>
                                                {tier.charAt(0).toUpperCase() + tier.slice(1)}
                                            </h4>

                                            <p className="text-md mt-2">
                                                {price.description.length > 0
                                                    ? price.description
                                                    : "A comprehensive package designed to meet your business needs."}
                                            </p>

                                            <div className="mt-4">
                                                <p className="font-semibold">
                                                    {showMonthly ? `Monthly: ${price.monthly}` : `One-Time: ${price.oneTime}`}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>
                    </AnimatePresence>
                </motion.div>

                <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>

            {/* Services Vertical Navbar */}
            <motion.nav
                key="vertical-navbar"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="hidden lg:block"
            >
                <nav className="fixed inset-y-0 right-6 flex flex-col justify-center items-end space-y-4">
                    {Object.keys(services).map((service) => (
                        <Button
                            key={service}
                            variant="ghost"
                            className={`text-md font-medium transition-colors duration-200 ${
                                selectedService === service
                                    ? isDarkMode
                                        ? "text-white"
                                        : "text-[#083d77]"
                                    : isDarkMode
                                        ? "text-gray-500 hover:text-white"
                                        : "text-gray-500 hover:text-[#083d77]"
                            } ${audiowide.className}`}
                            onClick={() => setSelectedService(service as ServiceKey)} // Fixed type error
                        >
                            {services[service as ServiceKey].title}
                        </Button>
                    ))}
                </nav>
            </motion.nav>
        </div>
    );
}

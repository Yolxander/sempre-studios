"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Audiowide } from "@next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DarkModeToggle } from "@/components/landing-page/DarkModeToggle";
import { services } from "@/data/services"; // Import services
import { FaArrowRight } from "react-icons/fa"; // Import arrow icon

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

// Form animation variants
const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.5 } },
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
    const [isFormOpen, setIsFormOpen] = useState(false); // Toggle contact form
    const [formSubmitted, setFormSubmitted] = useState(false); // Thank you message state
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

    // Toggle dark mode state
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    // Toggle between one-time and monthly pricing
    const togglePricing = () => setShowMonthly(!showMonthly);
    // Toggle dropdown
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    // Toggle contact form
    const toggleForm = () => setIsFormOpen(!isFormOpen);
    // Handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setFormSubmitted(true);
        setIsFormOpen(false); // Close form after submission
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
            className={`md:h-[95vh] md:m-4 md:rounded-3xl h-[100vh] m-0 flex overflow-hidden border-[5px] transition-colors duration-500 relative ${
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
                                    <Link href="/">
                                        <div
                                            className={`icon ${audiowide.className} ${
                                                isDarkMode
                                                    ? "bg-gray-800 text-white border-white"
                                                    : "text-[#083d77]"
                                            }`}
                                        >
                                            S
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                {/* "Get Service" Button */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={`pointer rounded-full px-4 py-2 text-[20px] font-medium relative transition-transform duration-300 ease-in-out hover:scale-105 ${audiowide.className} ${
                                        isDarkMode
                                            ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                                            : "bg-white text-[#083d77] border-black"
                                    }`}
                                    onClick={toggleForm}
                                >
                                    Get Service
                                </Button>
                            </div>
                            {/* Services Dropdown (Mobile/Tablet) */}
                            <div className="block lg:hidden relative w-full">
                                <Button
                                    variant="outline"
                                    className={`rounded-full w-[95%] px-4 py-2 font-medium flex-row justify-around mr-6 ${audiowide.className} ${
                                        isDarkMode
                                            ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                                            : "bg-transparent text-[#083d77] border-black"
                                    }`}
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
                            className="flex-grow flex flex-col items-center md:justify-center justify-start text-center px-4 relative md:overflow-y-hidden overflow-y-auto fit-content  md:pb-[50px]"
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
                <nav className="fixed inset-y-0 right-8 flex flex-col justify-center items-end space-y-4">
                    {Object.keys(services).map((service) => (
                        <div key={service} className="relative group flex items-center">
                            {selectedService === service && (
                                <motion.div
                                    className="mr-2"
                                    initial={{ x: -10 }}
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    <FaArrowRight className={`text-md ${isDarkMode ? "text-white" : "text-[#083d77]"}`} />
                                </motion.div>
                            )}

                            <Button
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
                                onClick={() => setSelectedService(service as ServiceKey)}
                            >
                                {/* Icon for each service */}
                                {React.createElement(services[service as ServiceKey].icon, {
                                    className: `w-6 h-6 transition-colors duration-200 ${
                                        isDarkMode
                                            ? "text-red hover:text-[#083d77]"
                                            : "text-gray-500 hover:text-[#083d77]"
                                    }`
                                })}
                            </Button>

                            {/* Tooltip */}
                            <div
                                className="absolute right-10 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-sm px-4 py-2 rounded-md shadow-lg"
                            >
                                Go to {services[service as ServiceKey].title}
                            </div>
                        </div>
                    ))}

                    {/* Next Service Button */}
                    <Button
                        variant="ghost"
                        className={`text-md font-medium transition-colors duration-200 fixed md:bottom-12 bottom-7 md:right-6 right-1 ${
                            isDarkMode ? "text-white" : "text-[#083d77]"
                        } ${audiowide.className}`}
                        onClick={() => {
                            const currentIndex = Object.keys(services).indexOf(selectedService);
                            const nextService = Object.keys(services)[(currentIndex + 1) % Object.keys(services).length];
                            setSelectedService(nextService as ServiceKey);
                        }}
                    >
                        Next Service
                    </Button>
                </nav>
            </motion.nav>

            {/* Contact Form Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={formVariants}
                    >
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-lg relative">
                            {/* Close Button */}
                            <button
                                onClick={toggleForm}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            <h2 className="text-2xl font-bold mb-4 text-center text-[#083d77] dark:text-white">
                                Get in Touch
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Service
                                    </label>
                                    <select
                                        id="service"
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                        defaultValue={selectedService}
                                    >
                                        {Object.keys(services).map((service) => (
                                            <option key={service} value={service}>
                                                {services[service as ServiceKey].title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="callDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Preferred Call Date
                                    </label>
                                    <input
                                        type="date"
                                        id="callDate"
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className={`w-full mt-4 rounded-full px-8 py-4 text-lg font-semibold transition-transform duration-300 ease-in-out hover:scale-105 ${
                                        isDarkMode
                                            ? "bg-white text-black hover:bg-gray-100"
                                            : "bg-[#083d77] text-white hover:bg-gray-800"
                                    }`}
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Thank You Message */}
            <AnimatePresence>
                {formSubmitted && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={formVariants}
                    >
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-lg text-center relative">
                            <h2 className="text-2xl font-bold mb-4 text-[#083d77] dark:text-white">Thank You!</h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                We have received your inquiry and will get back to you soon.
                            </p>
                            <Button
                                onClick={() => setFormSubmitted(false)}
                                className={`mt-4 rounded-full px-8 py-4 text-lg font-semibold transition-transform duration-300 ease-in-out hover:scale-105 ${
                                    isDarkMode
                                        ? "bg-white text-black hover:bg-gray-100"
                                        : "bg-[#083d77] text-white hover:bg-gray-800"
                                }`}
                            >
                                Close
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

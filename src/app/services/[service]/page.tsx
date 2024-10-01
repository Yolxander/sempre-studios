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

// Define the services type
type ServiceKey = keyof typeof services;

// Define all services
const services = {
    "landing-page-creation": {
        title: "Landing Page Creation",
        description: "Customized landing pages that bring your business online quickly and affordably.",
        details: "At Sempre Studios, we specialize in creating customized landing pages for businesses. Our service includes building professional, responsive pages designed to increase visibility and conversions for businesses without a current web presence.",
        pricing: {
            basic: {
                description: "Basic one-page landing site with essential business info and contact form.",
                oneTime: "$500",
                monthly: "$50"
            },
            standard: {
                description: "Multi-section landing page with customized design and lead generation form.",
                oneTime: "$1000",
                monthly: "$100"
            },
            premium: {
                description: "Full-featured landing page with lead generation, integrations, and analytics.",
                oneTime: "$2000",
                monthly: "$150"
            }
        }
    },
    "web-design": {
        title: "Web Design",
        description: "We create visually stunning and user-friendly websites that captivate your audience.",
        details: "Our web design services include everything from basic landing pages to full-blown e-commerce sites. We focus on creating responsive, engaging designs that convert visitors into customers.",
        pricing: {
            basic: {
                description: "Single-page design with basic functionality.",
                oneTime: "$500",
                monthly: "$50"
            },
            standard: {
                description: "Multi-page website with standard features and responsive design.",
                oneTime: "$1500",
                monthly: "$100"
            },
            premium: {
                description: "Full-scale custom design with e-commerce or advanced functionalities.",
                oneTime: "$3000",
                monthly: "$200"
            }
        }
    },
    "web-development": {
        title: "Web Development",
        description: "Our expert developers build robust and scalable web applications tailored to your needs.",
        details: "We develop custom web applications, ensuring they are fast, scalable, and reliable.",
        pricing: {
            basic: {
                description: "Basic functionality with minimal customization.",
                oneTime: "$1000",
                monthly: "$100"
            },
            standard: {
                description: "Custom-built web applications with moderate features.",
                oneTime: "$2500",
                monthly: "$200"
            },
            premium: {
                description: "Enterprise-level web development with advanced integrations and features.",
                oneTime: "$5000",
                monthly: "$300"
            }
        }
    },
    branding: {
        title: "Branding",
        description: "We craft unique brand identities that resonate with your target audience.",
        details: "Our branding services focus on creating logos, typography, and brand strategies.",
        pricing: {
            basic: {
                description: "Logo design and color palette creation.",
                oneTime: "$500",
                monthly: "$50"
            },
            standard: {
                description: "Complete brand identity with logo, typography, and brand guidelines.",
                oneTime: "$1500",
                monthly: "$100"
            },
            premium: {
                description: "Full brand strategy including market research and brand assets.",
                oneTime: "$3000",
                monthly: "$200"
            }
        }
    },
    "website-maintenance": {
        title: "Website Maintenance",
        description: "Keep your website secure, fast, and up-to-date with our maintenance plans.",
        details: "We offer ongoing maintenance services, including security updates, backups, and performance optimizations.",
        pricing: {
            basic: {
                description: "Monthly backups and security updates.",
                oneTime: "$0",
                monthly: "$50"
            },
            standard: {
                description: "Performance optimizations and monthly updates.",
                oneTime: "$0",
                monthly: "$100"
            },
            premium: {
                description: "Full-service maintenance with priority support and quarterly updates.",
                oneTime: "$0",
                monthly: "$200"
            }
        }
    },
    "content-creation": {
        title: "Content Creation",
        description: "Engaging content creation that reflects your brand and connects with your audience.",
        details: "We provide content creation services ranging from website copy, blog articles, social media posts, and more. Our team ensures your brand’s voice is consistent and resonates with your target audience.",
        pricing: {
            basic: {
                description: "Written content such as blog posts or articles.",
                oneTime: "$200",
                monthly: "$100"
            },
            standard: {
                description: "Mixed media content including visuals or basic video.",
                oneTime: "$500",
                monthly: "$200"
            },
            premium: {
                description: "Full multimedia content strategy with advanced video production.",
                oneTime: "$1000",
                monthly: "$300"
            }
        }
    },
    "hosting-domain-services": {
        title: "Hosting and Domain Services",
        description: "Reliable hosting and domain services to keep your website online 24/7.",
        details: "Our hosting and domain management services ensure your website remains operational, secure, and fast. We handle all technical aspects, including uptime monitoring, SSL certificates, and backups.",
        pricing: {
            basic: {
                description: "Domain registration and basic hosting for small websites.",
                oneTime: "$100",
                monthly: "$50"
            },
            standard: {
                description: "Advanced hosting with SSL certificates, regular backups, and more.",
                oneTime: "$300",
                monthly: "$100"
            },
            premium: {
                description: "Premium hosting with priority support, enhanced security, and performance optimizations.",
                oneTime: "$500",
                monthly: "$150"
            }
        }
    },
    "lead-generation": {
        title: "Lead Generation",
        description: "We help you generate qualified leads through digital strategies and campaigns.",
        details: "Our lead generation services include email marketing, landing page optimization, and funnel design to help your business capture and convert leads effectively.",
        pricing: {
            basic: {
                description: "Single email marketing campaign or basic lead magnet setup.",
                oneTime: "$500",
                monthly: "$100"
            },
            standard: {
                description: "Multi-channel lead generation with landing page optimization.",
                oneTime: "$1500",
                monthly: "$200"
            },
            premium: {
                description: "Advanced lead funnels with ongoing optimization and A/B testing.",
                oneTime: "$3000",
                monthly: "$300"
            }
        }
    }
};

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
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

    // Toggle dark mode state
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    // Toggle between one-time and monthly pricing
    const togglePricing = () => setShowMonthly(!showMonthly);

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
                    className="flex flex-col min-h-screen "
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

                            {/* Dark Mode Toggle */}
                        </div>
                    </header>

                    {/* Service Detail Section */}
                    <section className="flex-grow flex flex-col items-center justify-center text-center px-4 relative mr-[100px]">
                        <div className="space-y-4 mb-2">
                            <h1
                                className={`text-[30px] md:text-[35px] font-bold tracking-tight md ${audiowide.className}`}
                            >
                                {serviceDetail.title}
                            </h1>
                            <p
                                className={`text-[18px] md:text-[20px] font-bold tracking-tight font-light`}
                            >
                                {serviceDetail.description}
                            </p>
                        </div>

                        <p className="text-[18px] md:text-[20px] mb-6 md:max-w-[70vw]">{serviceDetail.details}</p>

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
                                        <h4
                                            className={`text-[22px] font-bold ${audiowide.className}`}
                                        >
                                            {tier.charAt(0).toUpperCase() + tier.slice(1)}
                                        </h4>

                                        <p className="text-md mt-2">
                                            {price.description.length > 0
                                                ? price.description
                                                : "A comprehensive package designed to meet your business needs."}
                                        </p>

                                        <div className="mt-4">
                                            <p className="font-semibold">
                                                {showMonthly
                                                    ? `Monthly: ${price.monthly}`
                                                    : `One-Time: ${price.oneTime}`}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </section>
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
                            onClick={() => setSelectedService(service as ServiceKey)}
                        >
                            {services[service as ServiceKey].title}
                        </Button>
                    ))}
                </nav>
            </motion.nav>
        </div>
    );
}

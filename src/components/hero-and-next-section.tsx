"use client";

import React, { useState, useRef, RefObject, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight, X, Menu } from "lucide-react";
import { Audiowide } from "@next/font/google";
import { MobileMenu } from "@/components/MobileMenu";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import Link from "next/link";

// Modal animation variants
const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

// Section animation variants
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
};

// Initialize Audiowide font
const audiowide = Audiowide({
    weight: "400",
    subsets: ["latin"],
});

const sections = ["Home", "About", "Services", "Projects", "Contact"];

export function HeroAndNextSectionComponent() {
    const [copied, setCopied] = useState(false);
    const [currentSection, setCurrentSection] = useState("Home");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger menu state
    const sectionRefs = useRef<RefObject<HTMLDivElement>[]>(
        sections.map(() => React.createRef<HTMLDivElement>())
    );
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });
    const [scrolling, setScrolling] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null); // Track initial touch position
    const [submitted, setSubmitted] = useState(false);

    const navigateToSection = (section: string) => {
        setCurrentSection(section);
        setIsMenuOpen(false); // Close menu when section is selected
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000); // Hide the message after 4 seconds
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Toggle between light and dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Handle mouse movement for dynamic background
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { clientX, clientY, currentTarget } = event;
        const rect = currentTarget.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        setGradientPosition({ x, y });
    };

    // Scroll to the next section
    const scrollToNextSection = useCallback(() => {
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex < sections.length - 1) {
            const nextSection = sections[currentIndex + 1];
            setCurrentSection(nextSection);
            const nextSectionRef = sectionRefs.current[currentIndex + 1]?.current as HTMLDivElement | null;
            if (nextSectionRef) {
                nextSectionRef.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [currentSection, sectionRefs]);

    const scrollToPreviousSection = useCallback(() => {
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex > 0) {
            const previousSection = sections[currentIndex - 1];
            setCurrentSection(previousSection);
            const prevSectionRef = sectionRefs.current[currentIndex - 1]?.current as HTMLDivElement | null;
            if (prevSectionRef) {
                prevSectionRef.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [currentSection, sectionRefs]);

    // Add scroll event listener
    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            if (!scrolling) {
                setScrolling(true);
                if (event.deltaY > 0) {
                    scrollToNextSection();
                } else {
                    scrollToPreviousSection();
                }
                setTimeout(() => setScrolling(false), 1000); // Prevents multiple triggers
            }
        };

        const handleTouchStart = (event: TouchEvent) => {
            setTouchStart(event.touches[0].clientY);
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (!touchStart) return;

            const touchEnd = event.touches[0].clientY;
            const difference = touchStart - touchEnd;

            if (!scrolling && Math.abs(difference) > 50) { // Threshold for swipe
                setScrolling(true);
                if (difference > 0) {
                    scrollToNextSection();
                } else {
                    scrollToPreviousSection();
                }
                setTimeout(() => setScrolling(false), 1000); // Prevent multiple scroll triggers
            }
        };

        window.addEventListener("wheel", handleScroll); // Desktop scroll
        window.addEventListener("touchstart", handleTouchStart); // Mobile touchstart
        window.addEventListener("touchmove", handleTouchMove); // Mobile touchmove

        return () => {
            window.removeEventListener("wheel", handleScroll);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [scrolling, touchStart, scrollToNextSection, scrollToPreviousSection]);

    // Handle URL hash navigation with fallback scroll
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace("#", "");
            if (hash && sections.includes(hash)) {
                const sectionIndex = sections.indexOf(hash);
                const targetSectionRef = sectionRefs.current[sectionIndex]?.current;
                if (targetSectionRef) {
                    console.log(`Scrolling to section: ${hash}`);
                    targetSectionRef.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                    console.log(`Section ref not found for: ${hash}`);
                }
            }
        };

        const scrollToHash = () => {
            const hash = window.location.hash.replace("#", "");
            const sectionIndex = sections.indexOf(hash);
            const targetSection = sectionRefs.current[sectionIndex]?.current;
            if (targetSection) {
                console.log(`Hash found: ${hash}, scrolling to section.`);
                targetSection.scrollIntoView({ behavior: "smooth" });
            } else {
                console.log(`Hash ref not found for ${hash}, fallback`);
                // Fallback method - scrolling with positioning
                const yOffset = -80; // Adjust offset for sticky headers, if any
                const element = document.getElementById(hash); // Now using the id directly
                if (element) {
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                }
            }
        };

        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        window.addEventListener("load", scrollToHash); // Trigger on load

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
            window.removeEventListener("load", scrollToHash);
        };
    }, [sectionRefs]);

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
                <AnimatePresence mode="wait">
                    {/* Home Section */}
                    {currentSection === "Home" && (
                        <motion.div
                            id="home"
                            key="hero"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col min-h-screen"
                            ref={sectionRefs.current[0]}
                        >
                            {/* Header Section */}
                            <header className="w-full md:px-6 px-3 py-4">
                                <div className="max-w-8xl mx-auto flex justify-between items-center relative">
                                    <div className="text-xl font-semibold">
                                        <div className={`logo ${audiowide.className}`}>
                                            <div
                                                className={`icon ${audiowide.className} ${
                                                    isDarkMode
                                                        ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                                                        : "text-[#083d77]"
                                                }`}
                                            >
                                                S
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 ${
                                            isDarkMode ? "bg-gray-600" : "bg-gray-200"
                                        }`}
                                        aria-hidden="true"
                                    ></div>
                                    {/* Hamburger Menu for screens under 1000px */}
                                    <div className="block lg:hidden">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className={`rounded-full px-4 py-2 text-[20px] font-medium relative transition-transform duration-300 ease-in-out hover:scale-105 ${audiowide.className} ${
                                                isDarkMode
                                                    ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                                                    : "bg-white text-[#083d77] border-black"
                                            }`}
                                            onClick={toggleMenu}
                                        >
                                            <Menu />
                                        </Button>
                                    </div>
                                    {/* Say Hi Button for screens above 1000px */}
                                    <div className="hidden lg:block">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className={`rounded-full px-4 py-2 text-[20px] font-medium relative transition-transform duration-300 ease-in-out hover:scale-105 ${audiowide.className} ${
                                                isDarkMode
                                                    ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                                                    : "bg-white text-[#083d77] border-black"
                                            }`}
                                            onClick={openModal}
                                        >
                                            Say Hi
                                        </Button>
                                    </div>
                                </div>
                            </header>

                            {/* Hero Content Section */}
                            <section className="flex-grow flex flex-col items-center justify-center text-center px-4 relative">
                                <div className="space-y-4 mb-12">
                                    <h1
                                        className={`text-[40px] md:text-[80px] font-bold tracking-tight md:pr-[50px] ${audiowide.className}`}
                                    >
                                        Sempre Studios
                                    </h1>
                                    <h1
                                        className={`text-[30px] md:text-[50px] font-bold tracking-tight font-light ${audiowide.className}`}
                                    >
                                        Unlock your digital potential
                                    </h1>
                                </div>

                                <Button
                                    className={`rounded-full px-8 py-6 text-lg font-semibold mb-16 transition-transform duration-300 ease-in-out hover:scale-105 ${
                                        isDarkMode
                                            ? "bg-white text-black hover:bg-gray-100"
                                            : "bg-[#083d77] text-white hover:bg-gray-800"
                                    }`}
                                    onClick={() => navigateToSection("About")}
                                >
                                    Start
                                </Button>

                                <div className="flex flex-col items-center">
                                    <div
                                        className={`hidden md:block rounded-full border ${
                                            isDarkMode ? "border-gray-400 hover:bg-gray-700" : "border-[#083d77] hover:bg-gray-100"
                                        } p-2 mb-5 cursor-pointer transition-colors duration-300`}
                                        onClick={() => navigateToSection("About")}
                                    >
                                        <ChevronDown
                                            size={24}
                                            className={`${
                                                isDarkMode ? "text-gray-400" : "text-[#083d77]"
                                            }`}
                                        />
                                    </div>
                                </div>
                            </section>
                        </motion.div>
                    )}

                    {/* About Section */}
                    {currentSection === "About" && (
                        <motion.section
                            id="about"
                            key="about"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative flex-grow flex flex-col items-center justify-center text-center px-4 min-h-screen"
                            ref={sectionRefs.current[1]}
                        >
                            {/* Hamburger Menu for screens under 1000px, moved to the top right */}
                            <div className="block lg:hidden absolute top-4 right-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={`rounded-full px-4 py-2 text-[20px] font-medium relative transition-transform duration-300 ease-in-out hover:scale-105 ${audiowide.className} ${
                                        isDarkMode
                                            ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                                            : "bg-white text-[#083d77] border-black"
                                    }`}
                                    onClick={toggleMenu}
                                >
                                    <Menu />
                                </Button>
                            </div>
                            <h2 className={`text-xl font-bold mb-8 md:text-[30px] ${audiowide.className}`}>
                                About Us
                            </h2>
                            <div className="max-w-2xl mb-12">
                                <p className="text-[16px] md:text-[20px] mb-6">
                                    We are a cutting-edge digital agency dedicated to transforming the web landscape.
                                    With our innovative approach and expert team, we bring your digital visions to life.
                                </p>
                                <p className="text-[16px] md:text-[20px] mb-6">
                                    Our mission is to create impactful digital experiences that drive growth and success for
                                    our clients. We combine creativity with technology to deliver solutions that stand out in
                                    the digital world.
                                </p>
                                <p className="text-[16px] md:text-[20px]">
                                    From web design and development to digital marketing and branding, we offer comprehensive
                                    services to elevate your online presence.
                                </p>
                            </div>
                            <Button
                                className={`rounded-full px-8 py-6 text-lg font-semibold mb-16 transition-transform duration-300 ease-in-out hover:scale-105 ${
                                    isDarkMode
                                        ? "bg-white text-black hover:bg-gray-100"
                                        : "bg-[#083d77] text-white hover:bg-gray-800"
                                }`}
                                onClick={() => navigateToSection("Services")}
                            >
                                Learn More
                            </Button>
                            <div
                                className={`hidden md:block rounded-full border md:flex ${
                                    isDarkMode
                                        ? "border-gray-400 hover:bg-gray-700"
                                        : "border-gray-300 hover:bg-gray-100"
                                } p-2 cursor-pointer transition-colors duration-300 mt-2 mb-12`}
                                onClick={() => navigateToSection("Services")}
                            >
                                <ChevronDown size={24} className={`${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                            </div>
                        </motion.section>
                    )}

                    {/* Services Section */}
                    {currentSection === "Services" && (
                        <motion.section
                            id="services" // Assign the id here
                            key="services"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative flex-grow flex flex-col items-center justify-center px-4 min-h-screen"
                            ref={sectionRefs.current[2]} // Associate the ref here
                        >
                            {/* Hamburger Menu for screens under 1000px, moved to the top right */}
                            <div className="block lg:hidden absolute top-4 right-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={`rounded-full px-4 py-2 text-[20px] font-medium relative transition-transform duration-300 ease-in-out hover:scale-105 ${audiowide.className} ${
                                        isDarkMode
                                            ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                                            : "bg-white text-[#083d77] border-black"
                                    }`}
                                    onClick={toggleMenu}
                                >
                                    <Menu />
                                </Button>
                            </div>
                            <div className="max-w-[80%] w-full">
                                <div className="text-center md:mb-12 mb-6 mt-6">
                                    <h2 className={`text-xl font-bold md:text-[30px] ${audiowide.className}`}>
                                        Services
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-2 md:overflow-hidden overflow-y-auto md:max-h-[73vh] h-[92vh] pb-10 md:pb-0">
                                    {[
                                        {
                                            title: "Landing Page Creation",
                                            description:
                                                "We design customized landing pages that give businesses an online presence quickly and affordably, helping you stand out and convert visitors into leads.",
                                        },
                                        {
                                            title: "Web Design",
                                            description:
                                                "We create visually stunning and user-friendly websites that captivate your audience, tailored to reflect your brand and boost engagement.",
                                        },
                                        {
                                            title: "Web Development",
                                            description:
                                                "Our expert developers build robust and scalable web applications tailored to your specific needs, ensuring speed, security, and scalability.",
                                        },
                                        {
                                            title: "Branding",
                                            description:
                                                "We craft unique brand identities, including logos and brand strategies, that resonate with your target audience and differentiate your business.",
                                        },
                                        {
                                            title: "Website Maintenance",
                                            description:
                                                "Our maintenance services ensure your website stays updated, secure, and optimized for performance, allowing you to focus on your business.",
                                        },
                                        {
                                            title: "Content Creation",
                                            description:
                                                "Our creative team produces high-quality content, from blogs to videos, to help your business tell its story, engage customers, and grow your brand.",
                                        },
                                        {
                                            title: "Hosting and Domain Services",
                                            description:
                                                "We offer reliable hosting and domain services to ensure your website stays online, secure, and accessible to your customers 24/7.",
                                        },
                                        {
                                            title: "Lead Generation",
                                            description:
                                                "We implement powerful lead generation strategies, including email marketing and booking systems, to capture qualified leads and grow your business.",
                                        },

                                    ].map((service, index) => (
                                        <div
                                            key={index}
                                            className={`border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"} md:pt-6 pt-2 relative`}
                                        >
                                            <div className="md:mb-4">
                                                <h4
                                                    className={`text-[20px] md:text-[26px] font-semibold mb-2 ${audiowide.className}`}
                                                >
                                                    <Link href={`/services/${service.title.replace(/\s+/g, '-').toLowerCase()}`}>
                                                        {service.title}
                                                    </Link>
                                                </h4>
                                                <p className={`text-${isDarkMode ? "white" : "black"} text-[16px] md:text-[20px] mb-4`}>
                                                    {service.description}
                                                </p>
                                                <Link href={`/services/${service.title.replace(/\s+/g, '-').toLowerCase()}`}>
                                                    <Button
                                                        variant="link"
                                                        className={`p-0 h-auto font-semibold ${
                                                            isDarkMode ? "text-white" : "text-[#083d77]"
                                                        }`}
                                                    >
                                                        Read more <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div
                                className={`hidden md:block rounded-full border md:flex ${
                                    isDarkMode
                                        ? "border-gray-400 hover:bg-gray-700"
                                        : "border-gray-300 hover:bg-gray-100"
                                } p-2 cursor-pointer transition-colors duration-300 mt-2 mb-12`}
                                onClick={() => navigateToSection("Projects")}
                            >
                                <ChevronDown size={24} className={`${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                            </div>
                        </motion.section>
                    )}

                    {/* Projects Section */}
                    {currentSection === "Projects" && (
                        <motion.section
                            key="projects"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative flex-grow flex flex-col items-center justify-center px-4 min-h-screen snap-start"
                            id="Projects"
                            ref={sectionRefs.current[3]}
                        >
                            {/* Hamburger Menu for screens under 1000px, moved to the top right */}
                            <div className="block lg:hidden absolute top-4 right-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={`rounded-full px-4 py-2 text-[20px] font-medium relative transition-transform duration-300 ease-in-out hover:scale-105 ${audiowide.className} ${
                                        isDarkMode
                                            ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                                            : "bg-white text-[#083d77] border-black"
                                    }`}
                                    onClick={toggleMenu}
                                >
                                    <Menu />
                                </Button>
                            </div>
                            <div className="lg:max-w-[85%] w-full lg:px-8 max-w-[100%] md:px-1 px-4">
                                <div className="text-center mb-2 md:mb-3">
                                    <h2 className={`text-xl font-bold md:text-[30px] ${audiowide.className}`}>
                                        Our Projects
                                    </h2>
                                </div>
                                <div className="grid grid-cols-12 gap-4 h-[90vh] overflow-y-auto md:overflow-y-hidden md:px-0 px-3 md:h-[calc(100vh-200px)] pt-2 pb-10 md:pb-0">
                                    <div className="col-span-12 md:col-span-8 border-[0.5px] border-black rounded-2xl p-6 flex flex-col justify-between">
                                        <div>
                                            <h3 className={`text-xl font-bold mb-2 ${audiowide.className}`}>
                                                NORTH SIMCOE PROPERTY MANAGEMENT
                                            </h3>
                                            <p className="text-[16px] md:text-[20px] mb-4">
                                                Top property management company in Simcoe County, offering comprehensive
                                                services for property owners and tenants alike.
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-[#083d77] text-white hover:bg-gray-800 self-start text-[16px] py-1 px-3"
                                            onClick={() =>
                                                window.open("https://northsimcoepm.com/", "_blank")
                                            }
                                        >
                                            Visit <ArrowRight className="ml-1 h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="col-span-12 md:col-span-4 border-[0.5px] border-black rounded-2xl p-6 flex flex-col justify-between">
                                        <div>
                                            <h3 className={`text-xl font-bold mb-2 ${audiowide.className}`}>
                                                RMD Property Management
                                            </h3>
                                            <p className="text-[16px] md:text-[20px] mb-4">
                                                Expert care for your paradise in Costa Rica, providing top-notch property
                                                management services for international property owners.
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-[#083d77] text-white hover:bg-gray-800 self-start text-[16px] py-1 px-3"
                                            onClick={() =>
                                                window.open("https://costa-rica-site.webflow.io/", "_blank")
                                            }
                                        >
                                            Visit <ArrowRight className="ml-1 h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="col-span-12 md:col-span-4 border-[0.5px] border-black rounded-2xl p-6 flex flex-col justify-between">
                                        <div>
                                            <h3 className={`text-xl font-bold mb-2 ${audiowide.className}`}>
                                                Premium Natural Wood Charcoal
                                            </h3>
                                            <p className="text-[16px] md:text-[20px] mb-4">
                                                High-quality, sustainable wood charcoal products for grilling enthusiasts,
                                                restaurants, and industrial applications.
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-[#083d77] text-white hover:bg-gray-800 self-start text-[16px] py-1 px-3"
                                            onClick={() =>
                                                window.open("https://charcoal.jonex.ca/", "_blank")
                                            }
                                        >
                                            Visit <ArrowRight className="ml-1 h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="col-span-12 md:col-span-8 border-[0.5px] border-black rounded-2xl p-6 flex flex-col justify-between">
                                        <div>
                                            <h3 className={`text-xl font-bold mb-2 ${audiowide.className}`}>
                                                Learn More About Our Work
                                            </h3>
                                            <p className="text-[16px] md:text-[20px] mb-4">
                                                We specialize in creating tailored, innovative websites and applications that
                                                drive growth and enhance user experience.
                                            </p>
                                            <p className="text-[16px] mb-4">
                                                Ready to start your next project or have questions? We would love to hear from you!
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-[#083d77] text-white hover:bg-gray-800 self-start text-[16px] py-1 px-3"
                                            onClick={() => navigateToSection("Contact")}
                                        >
                                            Contact Us <ArrowRight className="ml-1 h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`hidden md:block rounded-full border md:flex ${
                                    isDarkMode
                                        ? "border-gray-400 hover:bg-gray-700"
                                        : "border-gray-300 hover:bg-gray-100"
                                } p-2 cursor-pointer transition-colors duration-300 mt-2 mb-12`}
                                onClick={() => navigateToSection("Contact")}
                            >
                                <ChevronDown size={24} className={`${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                            </div>
                        </motion.section>
                    )}

                    {/* Contact Section */}
                    {/* Contact Section */}
                    {currentSection === "Contact" && (
                        <motion.section
                            key="contact"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative flex-grow flex flex-col items-center justify-center px-4 min-h-screen"
                            ref={sectionRefs.current[4]}
                        >
                            {/* Hamburger Menu for screens under 1000px, moved to the top right */}
                            <div className="block lg:hidden absolute top-4 right-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={`rounded-full px-4 py-2 text-[20px] font-medium transition-transform duration-300 ease-in-out hover:scale-105 ${audiowide.className} ${
                                        isDarkMode
                                            ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                                            : "bg-white text-[#083d77] border-black"
                                    }`}
                                    onClick={toggleMenu}
                                >
                                    <Menu />
                                </Button>
                            </div>

                            <h2 className={`text-xl font-bold mb-4 md:text-[30px] ${audiowide.className}`}>Contact Us</h2>

                            <div className="max-w-2xl mb-8 text-center">
                                <p className="text-[16px] md:text-[20px] mb-4">
                                    Have questions or ready to start your next project? We'd love to hear from you!
                                </p>
                                <p className="text-[16px] md:text-[20px]">
                                    Fill out the form below, and we'll get back to you shortly.
                                </p>
                            </div>

                            {/* Conditional Rendering: Show form if not submitted, show thank-you message if submitted */}
                            {!submitted ? (
                                <form
                                    className="w-full max-w-lg space-y-4"
                                    onSubmit={handleSubmit}
                                >
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className={`mt-1 block w-full border ${isDarkMode ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300 text-black"} rounded-md focus:ring-[#083d77] focus:border-[#083d77] sm:text-sm p-2`}
                                            placeholder="Your Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className={`mt-1 block w-full border ${isDarkMode ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300 text-black"} rounded-md focus:ring-[#083d77] focus:border-[#083d77] sm:text-sm p-2`}
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            className={`mt-1 block w-full border ${isDarkMode ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300 text-black"} rounded-md focus:ring-[#083d77] focus:border-[#083d77] sm:text-sm p-2`}
                                            placeholder="Your Message"
                                            required
                                        />
                                    </div>
                                    <Button
                                        className={`rounded-full px-6 py-3 text-lg font-semibold w-full transition-transform duration-300 ease-in-out hover:scale-105 ${
                                            isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-[#083d77] text-white hover:bg-gray-800"
                                        }`}
                                        type="submit"
                                    >
                                        Send Message
                                    </Button>
                                </form>
                            ) : (
                                <div className={`mt-6 p-6 rounded-md text-center shadow-md transition-all ease-in-out duration-300 ${isDarkMode ? "bg-gray-800 text-white" : "bg-[#083d77] text-white"}`}>
                                    <h3 className={`text-xl font-semibold mb-4 ${audiowide.className}`}>Thank You!</h3>
                                    <p className="text-lg">
                                        Your message has been sent successfully. We will get back to you shortly.
                                    </p>
                                </div>
                            )}
                        </motion.section>
                    )}




                </AnimatePresence>

                {/* Modal for contact form */}
                {isModalOpen && (
                    <AnimatePresence>
                        <motion.div
                            className="relative fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {/* Close Button */}
                            <div className="absolute top-4 right-4">
                                <Button
                                    variant="ghost"
                                    onClick={closeModal}
                                    className={`text-${isDarkMode ? "white" : "black"}`}
                                >
                                    <X size={24} />
                                </Button>
                            </div>
                            <div
                                className={`bg-white rounded-lg p-6 w-[90%] max-w-lg ${
                                    isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                                }`}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className={`text-3xl font-bold ${audiowide.className}`}>Contact Us</h2>
                                    <button onClick={closeModal}>
                                        <X
                                            size={24}
                                            className={`${
                                                isDarkMode ? "text-gray-400" : "text-gray-500"
                                            } hover:text-gray-700 transition-colors`}
                                        />
                                    </button>
                                </div>

                                {/* Contact Form */}
                                <form className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className={`block text-sm font-medium ${
                                                isDarkMode ? "text-gray-300" : "text-gray-700"
                                            }`}
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className={`mt-1 block w-full border ${
                                                isDarkMode
                                                    ? "border-gray-600 bg-gray-700 text-white"
                                                    : "border-gray-300 text-black"
                                            } rounded-md shadow-sm focus:ring-[#083d77] focus:border-[#083d77] sm:text-sm p-2`}
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className={`block text-sm font-medium ${
                                                isDarkMode ? "text-gray-300" : "text-gray-700"
                                            }`}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className={`mt-1 block w-full border ${
                                                isDarkMode
                                                    ? "border-gray-600 bg-gray-700 text-white"
                                                    : "border-gray-300 text-black"
                                            } rounded-md shadow-sm focus:ring-[#083d77] focus:border-[#083d77] sm:text-sm p-2`}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className={`block text-sm font-medium ${
                                                isDarkMode ? "text-gray-300" : "text-gray-700"
                                            }`}
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            className={`mt-1 block w-full border ${
                                                isDarkMode
                                                    ? "border-gray-600 bg-gray-700 text-white"
                                                    : "border-gray-300 text-black"
                                            } rounded-md shadow-sm focus:ring-[#083d77] focus:border-[#083d77] sm:text-sm p-2`}
                                            placeholder="Your Message"
                                        />
                                    </div>
                                    <Button
                                        className={`rounded-full px-6 py-3 text-lg font-semibold w-full transition-transform duration-300 ease-in-out hover:scale-105 ${
                                            isDarkMode
                                                ? "bg-gray-200 text-black hover:bg-gray-300"
                                                : "bg-[#083d77] text-white hover:bg-gray-800"
                                        }`}
                                        type="submit"
                                    >
                                        Send Message
                                    </Button>
                                </form>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Mobile Menu */}
                <MobileMenu
                    sections={sections}
                    currentSection={currentSection}
                    isDarkMode={isDarkMode}
                    isMenuOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                    navigateToSection={navigateToSection}
                />
            </div>

            {/* Vertical Navbar for large screens */}
            <motion.nav
                key="vertical-navbar"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="hidden lg:block"
            >
                <nav className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-end space-y-4">
                    {sections.map((section) => (
                        <Button
                            key={section}
                            variant="ghost"
                            className={`text-xl font-medium transition-colors duration-200 ${
                                currentSection === section
                                    ? isDarkMode
                                        ? "text-white"
                                        : "text-[#083d77]"
                                    : isDarkMode
                                        ? "text-gray-500 hover:text-white"
                                        : "text-gray-500 hover:text-[#083d77]"
                            } ${audiowide.className}`}
                            onClick={() => navigateToSection(section)}
                        >
                            {section}
                        </Button>
                    ))}
                </nav>
            </motion.nav>

            {/* Dark Mode Toggle Button */}
            <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            {/* Email Link */}
            <div className="fixed md:bottom-12 bottom-7 md:right-12 right-4">
                <a
                    href="#"
                    className={`text-sm md:text-base text-[#083d77] dark:text-white ${
                        isDarkMode ? "text-white" : "text-[#083d77]"
                    }`}
                    onClick={(e) => {
                        e.preventDefault(); // Prevent the default link behavior
                        navigator.clipboard.writeText("hello@semprestudios.com"); // Copy email to clipboard
                        setCopied(true); // Show "Copied to clipboard" message
                        setTimeout(() => setCopied(false), 2000); // Hide message after 2 seconds
                    }}
                >
                    hello@semprestudios.com
                </a>

                {copied && (
                    <div className="absolute bottom-full right-0 mb-2 text-xs md:text-sm bg-gray-800 text-white px-3 py-1 rounded-md">
                        Copied to clipboard!
                    </div>
                )}
            </div>


        </div>
    );
}

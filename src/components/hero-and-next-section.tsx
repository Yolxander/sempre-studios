"use client"

import React, {useState, useRef, RefObject} from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ArrowRight, X, Sun, Moon } from "lucide-react"
import { Audiowide } from "@next/font/google"

// Modal animation variants
const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
}

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
}

// Initialize Audiowide font
const audiowide = Audiowide({
    weight: "400",
    subsets: ["latin"],
})

const sections = ["Home", "About", "Services", "Projects"]

export function HeroAndNextSectionComponent() {
    const [currentSection, setCurrentSection] = useState("Home")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false) // Dark mode state
    const sectionRefs = useRef<RefObject<HTMLElement>[]>(
        sections.map(() => React.createRef<HTMLElement>())
    )

    const navigateToSection = (section: string) => {
        setCurrentSection(section)
    }

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    // Toggle between light and dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    return (
        <div
            className={`h-[95vh] flex rounded-3xl m-4 overflow-hidden border-2 transition-colors duration-500 ${
                isDarkMode
                    ? "bg-gray-900 border-gray-800 text-white"
                    : "bg-gradient-to-br from-gray-100 to-gray-50 border-black text-black"
            }`}
        >
            <div className="flex-grow">
                <AnimatePresence mode="wait">
                    {currentSection === "Home" && (
                        <motion.div
                            key="hero"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col min-h-screen"
                        >
                            {/* Header Section */}
                            <header className="w-full px-6 py-4">
                                <div className="max-w-8xl mx-auto flex justify-between items-center relative">
                                    <div className="text-xl font-semibold">
                                        <div className={`logo ${audiowide.className}`}>
                                            <div   className={`icon ${
                                                audiowide.className
                                            } ${
                                                isDarkMode
                                                    ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                                                    : "text-black"
                                            }`}
                                            >S</div>
                                        </div>
                                    </div>
                                    <div
                                        className={`absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 ${
                                            isDarkMode ? "bg-gray-600" : "bg-gray-200"
                                        }`}
                                        aria-hidden="true"
                                    ></div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className={`rounded-full px-4 py-2 text-[20px] font-medium bg-white hover:bg-gray-50 relative transition-transform duration-300 ease-in-out hover:scale-105 ${
                                            audiowide.className
                                        } ${
                                            isDarkMode
                                                ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                                                : "text-black"
                                        }`}
                                        onClick={openModal}
                                    >
                                        Say Hi
                                    </Button>
                                </div>
                            </header>

                            {/* Hero Content Section */}
                            <section className="flex-grow flex flex-col items-center justify-center text-center px-4 relative">
                                <div className={`space-y-4 mb-12 ${audiowide.className}`}>
                                    <h1 className="text-6xl font-bold tracking-tight pr-[50px]">Sempre Studios</h1>
                                    <h1 className="text-6xl font-bold tracking-tight pl-[200px]">We change web</h1>
                                    <h1 className="text-6xl font-bold tracking-tight">Try to start</h1>
                                </div>

                                <Button
                                    className={`rounded-full px-8 py-6 text-lg font-semibold mb-16 transition-transform duration-300 ease-in-out hover:scale-105 ${
                                        isDarkMode
                                            ? "bg-white text-black hover:bg-gray-100"
                                            : "bg-black text-white hover:bg-gray-800"
                                    }`}
                                >
                                    Start
                                </Button>

                                <div className="flex flex-col items-center">
                                    <div
                                        className={`rounded-full border ${
                                            isDarkMode
                                                ? "border-gray-400 hover:bg-gray-700"
                                                : "border-black-300 hover:bg-gray-100"
                                        } p-2 mb-5 cursor-pointer transition-colors duration-300`}
                                        onClick={() => navigateToSection("About")}
                                    >
                                        <ChevronDown
                                            size={24}
                                            className={`${
                                                isDarkMode ? "text-gray-400" : "text-black-400"
                                            }`}
                                        />
                                    </div>

                                    {/*<svg*/}
                                    {/*    className="w-60 h-16"*/}
                                    {/*    viewBox="0 0 1200 320"*/}
                                    {/*    fill="none"*/}
                                    {/*    xmlns="http://www.w3.org/2000/svg"*/}
                                    {/*>*/}
                                    {/*    <path*/}
                                    {/*        d="M1200 320C1200 143.269 1056.73 0 880 0C703.269 0 560 143.269 560 320"*/}
                                    {/*        stroke={`${*/}
                                    {/*            isDarkMode ? "#4B5563" : "#E5E7EB"*/}
                                    {/*        }`}*/}
                                    {/*        strokeWidth="1"*/}
                                    {/*    />*/}
                                    {/*    <path*/}
                                    {/*        d="M1040 320C1040 231.634 968.366 160 880 160C791.634 160 720 231.634 720 320"*/}
                                    {/*        stroke={`${*/}
                                    {/*            isDarkMode ? "#4B5563" : "#E5E7EB"*/}
                                    {/*        }`}*/}
                                    {/*        strokeWidth="1"*/}
                                    {/*    />*/}
                                    {/*    <path*/}
                                    {/*        d="M960 320C960 275.817 924.183 240 880 240C835.817 240 800 275.817 800 320"*/}
                                    {/*        stroke={`${*/}
                                    {/*            isDarkMode ? "#4B5563" : "#E5E7EB"*/}
                                    {/*        }`}*/}
                                    {/*        strokeWidth="1"*/}
                                    {/*    />*/}
                                    {/*</svg>*/}
                                </div>
                            </section>
                        </motion.div>
                    )}

                    {currentSection === "About" && (
                        <motion.section
                            key="about"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex-grow flex flex-col items-center justify-center text-center px-4 relative min-h-screen"
                        >
                            <h2
                                className={`text-4xl font-bold mb-8 ${audiowide.className}`}
                            >
                                About Us
                            </h2>
                            <div className="max-w-2xl mb-12">
                                <p className="text-[20px] mb-6">
                                    We are a cutting-edge digital agency dedicated
                                    to transforming the web landscape. With our
                                    innovative approach and expert team, we bring
                                    your digital visions to life.
                                </p>
                                <p className="text-[20px] mb-6">
                                    Our mission is to create impactful digital
                                    experiences that drive growth and success for
                                    our clients. We combine creativity with
                                    technology to deliver solutions that stand out
                                    in the digital world.
                                </p>
                                <p className="text-[20px]">
                                    From web design and development to digital
                                    marketing and branding, we offer comprehensive
                                    services to elevate your online presence.
                                </p>
                            </div>
                            <Button
                                className={`rounded-full px-8 py-6 text-lg font-semibold mb-16 transition-transform duration-300 ease-in-out hover:scale-105 ${
                                    isDarkMode
                                        ? "bg-white text-black hover:bg-gray-100"
                                        : "bg-black text-white hover:bg-gray-800"
                                }`}
                            >
                                Learn More
                            </Button>
                            <div
                                className={`rounded-full border ${
                                    isDarkMode
                                        ? "border-gray-400 hover:bg-gray-700"
                                        : "border-gray-300 hover:bg-gray-100"
                                } p-2 cursor-pointer transition-colors duration-300`}
                                onClick={() => navigateToSection("Services")}
                            >
                                <ChevronDown
                                    size={24}
                                    className={`${
                                        isDarkMode ? "text-gray-400" : "text-gray-400"
                                    }`}
                                />
                            </div>
                        </motion.section>
                    )}

                    {currentSection === "Services" && (
                        <motion.section
                            key="services"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex-grow flex flex-col items-center justify-center px-4 relative min-h-screen"
                        >
                            <div className="max-w-[80%] w-full">
                                <div className="text-center mb-12">
                                    <h2
                                        className={`text-5xl font-bold font-audiowide ${audiowide.className}`}
                                    >
                                        Services
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {[
                                        {
                                            title: "Web Design",
                                            description:
                                                "We create visually stunning and user-friendly websites that captivate your audience.",
                                        },
                                        {
                                            title: "Web Development",
                                            description:
                                                "Our expert developers build robust and scalable web applications tailored to your needs.",
                                        },
                                        {
                                            title: "Branding",
                                            description:
                                                "We craft unique brand identities that resonate with your target audience and set you apart.",
                                        },
                                        {
                                            title: "Website Maintenance",
                                            description:
                                                "We ensure your website stays up-to-date, secure, and performs optimally at all times.",
                                        },
                                        {
                                            title: "Content Creating",
                                            description:
                                                "Our creative team produces engaging and valuable content that tells your story effectively.",
                                        },
                                        {
                                            title: "Lead Generation",
                                            description:
                                                "We implement strategies to generate quality leads through email and booking systems.",
                                        },
                                    ].map((service, index) => (
                                        <div
                                            key={index}
                                            className={`border-t ${
                                                isDarkMode
                                                    ? "border-gray-700"
                                                    : "border-gray-200"
                                            } pt-6 relative`}
                                        >
                                            <div className="mb-4">
                                                <h4
                                                    className={`text-[26px] font-semibold mb-2 font-audiowide ${audiowide.className}`}
                                                >
                                                    {service.title}
                                                </h4>
                                                <p className="text-white-200 text-[20px] mb-4">
                                                    {service.description}
                                                </p>
                                                <Button
                                                    variant="link"
                                                    className={`p-0 h-auto font-semibold ${
                                                        isDarkMode
                                                            ? "text-white"
                                                            : "text-black"
                                                    }`}
                                                >
                                                    Read more{" "}
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div
                                className={`rounded-full border ${
                                    isDarkMode
                                        ? "border-gray-400 hover:bg-gray-700"
                                        : "border-gray-300 hover:bg-gray-100"
                                } p-2 cursor-pointer transition-colors duration-300 mt-16`}
                                onClick={() => navigateToSection("Projects")}
                            >
                                <ChevronDown
                                    size={24}
                                    className={`${
                                        isDarkMode ? "text-gray-400" : "text-gray-400"
                                    }`}
                                />
                            </div>
                        </motion.section>
                    )}

                    {currentSection === "Projects" && (
                        <motion.section
                            key="projects"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex-grow flex flex-col items-center justify-center px-4 relative min-h-screen snap-start"
                            id="Projects"
                            ref={sectionRefs.current[3]}
                        >
                            <div className="max-w-[85%] w-full px-8">
                                <div className="text-center mb-6">
                                    <h2
                                        className={`text-4xl font-bold ${audiowide.className}`}
                                    >
                                        Our Projects
                                    </h2>
                                </div>
                                <div className="grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
                                    <div className="col-span-12 md:col-span-8 border-[0.5px]  border-black rounded-2xl p-6 flex flex-col justify-between">
                                        <div>
                                            <h3
                                                className={`text-2xl font-bold mb-2 ${audiowide.className}`}
                                            >
                                                NORTH SIMCOE PROPERTY MANAGEMENT
                                            </h3>
                                            <p className="text-[20px] mb-4">
                                                Top property management company in
                                                Simcoe County, offering comprehensive
                                                services for property owners and tenants
                                                alike.
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-black text-white hover:bg-gray-800 self-start text-[20px] py-1 px-3"
                                            onClick={() =>
                                                window.open(
                                                    "https://northsimcoepm.com/",
                                                    "_blank"
                                                )
                                            }
                                        >
                                            Visit{" "}
                                            <ArrowRight className="ml-1 h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="col-span-12 md:col-span-4 border-[0.5px]  border-black rounded-2xl p-6 flex flex-col justify-between">
                                        <div>
                                            <h3
                                                className={`text-2xl font-bold mb-2 ${audiowide.className}`}
                                            >
                                                RMD Property Management
                                            </h3>
                                            <p className="text-[20px] mb-4">
                                                Expert care for your paradise in Costa
                                                Rica, providing top-notch property
                                                management services for international
                                                property owners.
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-black text-white hover:bg-gray-800 self-start text-[20px] py-1 px-3"
                                            onClick={() =>
                                                window.open(
                                                    "https://costa-rica-site.webflow.io/",
                                                    "_blank"
                                                )
                                            }
                                        >
                                            Visit{" "}
                                            <ArrowRight className="ml-1 h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="col-span-12 md:col-span-4 border-[0.5px]  border-black rounded-2xl p-6 flex flex-col justify-between">
                                        <div>
                                            <h3
                                                className={`text-2xl font-bold mb-2 ${audiowide.className}`}
                                            >
                                                Premium Natural Wood Charcoal
                                            </h3>
                                            <p className="text-[20px] mb-4">
                                                High-quality, sustainable wood charcoal
                                                products for grilling enthusiasts,
                                                restaurants, and industrial applications.
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-black text-white hover:bg-gray-800 self-start text-[20px] py-1 px-3"
                                            onClick={() =>
                                                window.open(
                                                    "https://charcoal.jonex.ca/",
                                                    "_blank"
                                                )
                                            }
                                        >
                                            Visit{" "}
                                            <ArrowRight className="ml-1 h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="col-span-12 md:col-span-8 border-[0.5px]  border-black rounded-2xl p-6 flex flex-col justify-between">
                                        <div>
                                            <h3
                                                className={`text-2xl font-bold mb-2 ${audiowide.className}`}
                                            >
                                                Learn More About Our Work
                                            </h3>
                                            <p className="text-[20px] mb-4">
                                                We specialize in creating tailored,
                                                innovative websites and applications that
                                                drive growth and enhance user experience.
                                            </p>
                                            <p className="text-[20px] mb-4">
                                                Ready to start your next project or have
                                                questions? We would love to hear from you!
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-black text-white hover:bg-gray-800 self-start text-[20px] py-1 px-3"
                                            onClick={() => navigateToSection("Contact")}
                                        >
                                            Contact Us{" "}
                                            <ArrowRight className="ml-1 h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="rounded-full border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 transition-colors duration-300 my-9"
                                onClick={() => navigateToSection("Home")}
                            >
                                <ChevronUp size={24} className="text-gray-400" />
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* Modal for contact form */}
                {isModalOpen && (
                    <AnimatePresence>
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div
                                className={`bg-white rounded-lg p-6 w-[90%] max-w-lg ${
                                    isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                                }`}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2
                                        className={`text-3xl font-bold ${audiowide.className}`}
                                    >
                                        Contact Us
                                    </h2>
                                    <button onClick={closeModal}>
                                        <X
                                            size={24}
                                            className={`${
                                                isDarkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
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
                                                isDarkMode
                                                    ? "text-gray-300"
                                                    : "text-gray-700"
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
                                                    : "border-black text-black"
                                            } rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2`}
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className={`block text-sm font-medium ${
                                                isDarkMode
                                                    ? "text-gray-300"
                                                    : "text-gray-700"
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
                                                    : "border-black text-black"
                                            } rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2`}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className={`block text-sm font-medium ${
                                                isDarkMode
                                                    ? "text-gray-300"
                                                    : "text-gray-700"
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
                                                    : "border-black text-black"
                                            } rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2`}
                                            placeholder="Your Message"
                                        />
                                    </div>
                                    <Button
                                        className={`rounded-full px-6 py-3 text-lg font-semibold w-full transition-transform duration-300 ease-in-out hover:scale-105 ${
                                            isDarkMode
                                                ? "bg-white text-black hover:bg-gray-200"
                                                : "bg-black text-white hover:bg-gray-800"
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
            </div>

            {/* Vertical Navbar */}
            <motion.section
                key="projects"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <nav className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-end space-y-4">
                    {sections.map((section) => (
                        <Button
                            key={section}
                            variant="ghost"
                            className={`text-xl font-medium transition-colors duration-200 ${
                                currentSection === section
                                    ? `${isDarkMode ? "text-white" : "text-black"}`
                                    : `${
                                        isDarkMode
                                            ? "text-gray-500 hover:text-white"
                                            : "text-gray-500 hover:text-black"
                                    }`
                            } font-audiowide ${audiowide.className}`}
                            onClick={() => navigateToSection(section)}
                        >
                            {section}
                        </Button>
                    ))}
                </nav>
            </motion.section>

            {/* Dark Mode Toggle Button */}
            <div className="fixed bottom-6 left-6">
                <Button
                    variant="ghost"
                    className="p-2 rounded-full text-xl hover:bg-gray-200 transition-colors"
                    onClick={toggleDarkMode}
                >
                    {isDarkMode ? <Sun size={28} /> : <Moon size={28} />}
                </Button>
            </div>
        </div>
    )
}

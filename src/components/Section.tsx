import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
};

export function Section({ sectionName, isActive, navigateToSection, isDarkMode }) {
    const renderSectionContent = () => {
        switch (sectionName) {
            case "Home":
                return (
                    <div className="flex-grow flex flex-col items-center justify-center text-center px-4 relative">
                        <div className={`space-y-4 mb-12`}>
                            <h1 className="text-6xl font-bold tracking-tight pr-[50px]">Sempre Studios</h1>
                            <h1 className="text-6xl font-bold tracking-tight pl-[200px]">We change web</h1>
                            <h1 className="text-6xl font-bold tracking-tight">Try to start</h1>
                        </div>
                        <Button
                            className={`rounded-full px-8 py-6 text-lg font-semibold mb-16 transition-transform duration-300 ease-in-out hover:scale-105 ${
                                isDarkMode ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                            }`}
                        >
                            Start
                        </Button>
                        <div className="flex flex-col items-center">
                            <div
                                className={`rounded-full border ${isDarkMode ? "border-gray-400 hover:bg-gray-700" : "border-black-300 hover:bg-gray-100"} p-2 mb-5 cursor-pointer transition-colors duration-300`}
                                onClick={() => navigateToSection("About")}
                            >
                                <ChevronDown size={24} className={`${isDarkMode ? "text-gray-400" : "text-black-400"}`} />
                            </div>
                        </div>
                    </div>
                );
            case "About":
                return (
                    <div className="flex-grow flex flex-col items-center justify-center text-center px-4 relative min-h-screen">
                        <h2 className={`text-4xl font-bold mb-8`}>About Us</h2>
                        <div className="max-w-2xl mb-12">
                            <p className="text-[20px] mb-6">
                                We are a cutting-edge digital agency dedicated to transforming the web landscape. With our innovative approach and expert team, we bring your digital visions to life.
                            </p>
                            <p className="text-[20px] mb-6">
                                Our mission is to create impactful digital experiences that drive growth and success for our clients. We combine creativity with technology to deliver solutions that stand out in the digital world.
                            </p>
                            <p className="text-[20px]">
                                From web design and development to digital marketing and branding, we offer comprehensive services to elevate your online presence.
                            </p>
                        </div>
                        <Button
                            className={`rounded-full px-8 py-6 text-lg font-semibold mb-16 transition-transform duration-300 ease-in-out hover:scale-105 ${
                                isDarkMode ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                            }`}
                        >
                            Learn More
                        </Button>
                        <div
                            className={`rounded-full border ${isDarkMode ? "border-gray-400 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"} p-2 cursor-pointer transition-colors duration-300`}
                            onClick={() => navigateToSection("Services")}
                        >
                            <ChevronDown size={24} className={`${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                        </div>
                    </div>
                );
            case "Services":
                return (
                    <div className="flex-grow flex flex-col items-center justify-center px-4 relative min-h-screen">
                        <div className="max-w-[80%] w-full">
                            <div className="text-center mb-12">
                                <h2 className={`text-5xl font-bold`}>Services</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[
                                    {
                                        title: "Web Design",
                                        description: "We create visually stunning and user-friendly websites that captivate your audience.",
                                    },
                                    {
                                        title: "Web Development",
                                        description: "Our expert developers build robust and scalable web applications tailored to your needs.",
                                    },
                                    {
                                        title: "Branding",
                                        description: "We craft unique brand identities that resonate with your target audience and set you apart.",
                                    },
                                    {
                                        title: "Website Maintenance",
                                        description: "We ensure your website stays up-to-date, secure, and performs optimally at all times.",
                                    },
                                    {
                                        title: "Content Creation",
                                        description: "Our creative team produces engaging and valuable content that tells your story effectively.",
                                    },
                                    {
                                        title: "Lead Generation",
                                        description: "We implement strategies to generate quality leads through email and booking systems.",
                                    },
                                ].map((service, index) => (
                                    <div key={index} className={`border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"} pt-6 relative`}>
                                        <div className="mb-4">
                                            <h4 className={`text-[26px] font-semibold mb-2`}>{service.title}</h4>
                                            <p className="text-white-200 text-[20px] mb-4">{service.description}</p>
                                            <Button variant="link" className={`p-0 h-auto font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                                                Read more
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            className={`rounded-full border ${isDarkMode ? "border-gray-400 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"} p-2 cursor-pointer transition-colors duration-300 mt-16`}
                            onClick={() => navigateToSection("Projects")}
                        >
                            <ChevronDown size={24} className={`${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                        </div>
                    </div>
                );
            case "Projects":
                return (
                    <div className="flex-grow flex flex-col items-center justify-center px-4 relative min-h-screen snap-start">
                        <div className="max-w-[85%] w-full px-8">
                            <div className="text-center mb-6">
                                <h2 className={`text-4xl font-bold`}>Our Projects</h2>
                            </div>
                            <div className="grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
                                <div className="col-span-12 md:col-span-8 border-[0.5px] border-black rounded-2xl p-6 flex flex-col justify-between">
                                    <div>
                                        <h3 className={`text-2xl font-bold mb-2`}>NORTH SIMCOE PROPERTY MANAGEMENT</h3>
                                        <p className="text-[20px] mb-4">
                                            Top property management company in Simcoe County, offering comprehensive services for property owners and tenants alike.
                                        </p>
                                    </div>
                                    <Button
                                        className="bg-black text-white hover:bg-gray-800 self-start text-[20px] py-1 px-3"
                                        onClick={() => window.open("https://northsimcoepm.com/", "_blank")}
                                    >
                                        Visit
                                    </Button>
                                </div>
                                {/* Additional projects can go here */}
                            </div>
                        </div>
                        <div
                            className="rounded-full border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 transition-colors duration-300 my-9"
                            onClick={() => navigateToSection("Home")}
                        >
                            <ChevronUp size={24} className="text-gray-400" />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        isActive && (
            <motion.div key={sectionName} variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
                {renderSectionContent()}
            </motion.div>
        )
    );
}

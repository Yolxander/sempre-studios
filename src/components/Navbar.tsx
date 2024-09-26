import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function Navbar({ sections, currentSection, navigateToSection, isDarkMode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <motion.section
            key="projects"
            className="fixed right-6 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col items-end space-y-4"
        >
            {sections.map((section) => (
                <Button
                    key={section}
                    variant="ghost"
                    className={`text-xl font-medium transition-colors duration-200 ${
                        currentSection === section ? `${isDarkMode ? "text-white" : "text-black"}` : `${isDarkMode ? "text-gray-500 hover:text-white" : "text-gray-500 hover:text-black"}`
                    }`}
                    onClick={() => navigateToSection(section)}
                >
                    {section}
                </Button>
            ))}
        </motion.section>
    );
}

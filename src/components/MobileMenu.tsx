"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Audiowide } from "@next/font/google";

// Modal animation variants
const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

// Initialize Audiowide font
const audiowide = Audiowide({
    weight: "400",
    subsets: ["latin"],
});

interface MobileMenuProps {
    sections: string[];
    currentSection: string;
    isDarkMode: boolean;
    isMenuOpen: boolean;
    toggleMenu: () => void;
    navigateToSection: (section: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
                                                          sections,
                                                          currentSection,
                                                          isDarkMode,
                                                          isMenuOpen,
                                                          toggleMenu,
                                                          navigateToSection,
                                                      }) => {
    return (
        <AnimatePresence>
            {isMenuOpen && (
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
                            <h2 className={`text-3xl font-bold ${audiowide.className}`}>Menu</h2>
                            <button onClick={toggleMenu}>
                                <X
                                    size={24}
                                    className={`${
                                        isDarkMode ? "text-gray-400" : "text-gray-500"
                                    } hover:text-gray-700 transition-colors`}
                                />
                            </button>
                        </div>

                        <nav className="space-y-4 text-center">
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
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

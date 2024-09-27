"use client";

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react"; // Import X icon from lucide-react

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
        <motion.div
            className={`fixed inset-0 z-50 ${
                isMenuOpen ? "block" : "hidden"
            } bg-black bg-opacity-80`} // Covers the entire screen
            initial={{ opacity: 0 }}
            animate={{ opacity: isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Close button at the top-right corner */}
            <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 p-2 rounded-full text-xl hover:bg-opacity-50 transition-colors"
            >
                <X size={32} className={`${isDarkMode ? "text-white" : "text-black"}`} />
            </button>

            {/* Menu content */}
            <div
                className={`flex flex-col justify-center items-end h-full pr-10 space-y-6 ${
                    isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
                }`}
            >
                <ul className="text-right space-y-4">
                    {sections.map((section) => (
                        <li key={section} className="py-2">
                            <button
                                className={`text-3xl transition-transform hover:scale-105 ${
                                    currentSection === section ? "font-bold" : "font-normal"
                                }`}
                                onClick={() => {
                                    navigateToSection(section);
                                    toggleMenu(); // Close the menu after navigation
                                }}
                            >
                                {section}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

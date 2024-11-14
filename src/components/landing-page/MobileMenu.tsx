"use client";

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Audiowide } from "next/font/google"; // Import Audiowide font

interface MobileMenuProps {
    sections: string[];
    currentSection: string;
    isDarkMode: boolean;
    isMenuOpen: boolean;
    toggleMenu: () => void;
    navigateToSection: (section: string) => void;
}

const audiowide = Audiowide({
    weight: "400",
    subsets: ["latin"],
});

export const MobileMenu: React.FC<MobileMenuProps> = ({
                                                          sections,
                                                          isDarkMode,
                                                          isMenuOpen,
                                                          toggleMenu,
                                                          navigateToSection,
                                                      }) => {
    return (
        <motion.div
            className={`fixed inset-0 z-50 ${
                isMenuOpen ? "block" : "hidden"
            } transition-opacity duration-300 ${
                isDarkMode ? "bg-gray-900" : "bg-white"
            } bg-opacity-90`} // Dark mode support with smooth transitions
            initial={{ opacity: 0 }}
            animate={{ opacity: isMenuOpen ? 1 : 0 }}
            exit={{ opacity: 0 }}
        >
            {/* Close button */}
            <button
                onClick={toggleMenu}
                className={`absolute top-4 right-4 p-2 rounded-full text-xl transition-colors ${
                    isDarkMode ? "text-white hover:bg-gray-800" : "text-[#083d77] hover:bg-gray-100"
                }`}
            >
                <X size={32} className={`${isDarkMode ? "text-white" : "text-[#083d77]"}`} />
            </button>

            {/* Menu content */}
            <div
                className={`flex flex-col justify-center items-center h-full space-y-6 ${
                    isDarkMode ? "text-white" : "text-[#083d77]"
                }`}
                style={{
                    background: isDarkMode
                        ? ""
                        : "radial-gradient(circle at center, #DCE1F6 0%, #F6F7FC 50%, #DCE1F6 100%)", // Add radial gradient for light mode
                }}
            >
                <ul className="text-center space-y-6">
                    {sections.map((section) => (
                        <li key={section} className="py-2">
                            <button
                                className={`text-3xl font-bold transition-transform hover:scale-105 ${
                                    audiowide.className
                                } ${
                                    isDarkMode
                                        ? "text-white hover:text-gray-400"
                                        : "text-[#083d77] hover:text-gray-600"
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

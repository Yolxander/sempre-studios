import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface MobileMenuProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    isDarkMode: boolean;
    sections: string[];
    currentSection: string;
    navigateToSection: (section: string) => void;
}

const mobileMenuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { duration: 0.5 } },
    exit: { x: '100%', transition: { duration: 0.5 } },
};

export const MobileMenu = ({
                               isMenuOpen,
                               toggleMenu,
                               isDarkMode,
                               sections,
                               currentSection,
                               navigateToSection,
                           }: MobileMenuProps) => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50"
            variants={mobileMenuVariants}
            initial="hidden"
            animate={isMenuOpen ? 'visible' : 'hidden'}
            exit="exit"
        >
            <motion.div
                className={`w-[80%] max-w-md h-full bg-white ${
                    isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
                } p-6`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold">Menu</h2>
                    <button onClick={toggleMenu}>
                        <X
                            size={24}
                            className={`${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
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
                                    ? `${isDarkMode ? 'text-white' : 'text-black'}`
                                    : `${
                                        isDarkMode
                                            ? 'text-gray-500 hover:text-white'
                                            : 'text-gray-500 hover:text-black'
                                    }`
                            }`}
                            onClick={() => {
                                navigateToSection(section);
                                toggleMenu();
                            }}
                        >
                            {section}
                        </Button>
                    ))}
                </nav>
            </motion.div>
        </motion.div>
    );
};

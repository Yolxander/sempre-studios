"use client";

import React, { useState, useRef, RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Sun, Moon } from 'lucide-react';
import { Audiowide } from '@next/font/google';
import { MobileMenu } from '@/components/MobileMenu'; // Importing the new Mobile Menu component
import { HamburgerButton } from '@/components/HamburgerButton'; // Importing Hamburger Button component
import { Header } from '@/components/Header';
import { SideNavBar } from '@/components/SideNavBar';
import { Modal } from '@/components/Modal'; // Assuming you already created the Modal component

// Initialize Audiowide font
const audiowide = Audiowide({
    weight: '400',
    subsets: ['latin'],
});

const sections = ['Home', 'About', 'Services', 'Projects'];

export function HeroAndNextSectionComponent() {
    const [currentSection, setCurrentSection] = useState('Home');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger menu state


    const navigateToSection = (section: string) => {
        setCurrentSection(section);
        setIsMenuOpen(false); // Close menu when section is selected
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Toggle between light and dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div
            className={`md:h-[95vh]  md:m-4 md:rounded-3xl h-[100vh] m-0  flex  overflow-hidden border-2 transition-colors duration-500  overflow-y-hidden ${
                isDarkMode
                    ? 'bg-gray-900 border-gray-800 text-white'
                    : 'bg-gradient-to-br from-gray-100 to-gray-50 border-black text-black'
            }`}
        >
            <div className="flex-grow">
                <AnimatePresence mode="wait">
                    {currentSection === 'Home' && (
                        <motion.div
                            key="hero"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col min-h-screen"
                        >
                            {/* Header Section */}
                            <Header
                                isDarkMode={isDarkMode}
                                audiowide={audiowide}
                                toggleMenu={toggleMenu}
                                openModal={openModal}
                            />
                            {/* Hero Content Section */}
                            <section className="flex-grow flex flex-col items-center justify-center text-center px-4 relative">
                                <div className={`space-y-4 mb-12 ${audiowide.className}`}>
                                    <h1 className="text-[50px] md:text-[80px] font-bold tracking-tight md:pr-[50px]">
                                        Sempre Studios
                                    </h1>
                                    <h1 className="text-[50px] md:text-[80px] font-bold tracking-tight md:pl-[200px]">
                                        We change web
                                    </h1>
                                    <h1 className="text-[50px] md:text-[80px] font-bold tracking-tight">Try to start</h1>
                                </div>
                                <Button
                                    className={`rounded-full px-8 py-6 text-lg font-semibold mb-16 transition-transform duration-300 ease-in-out hover:scale-105 ${
                                        isDarkMode
                                            ? 'bg-white text-black hover:bg-gray-100'
                                            : 'bg-black text-white hover:bg-gray-800'
                                    }`}
                                >
                                    Start
                                </Button>
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`hidden md:block rounded-full border ${
                                            isDarkMode
                                                ? 'border-gray-400 hover:bg-gray-700'
                                                : 'border-black-300 hover:bg-gray-100'
                                        } p-2 mb-5 cursor-pointer transition-colors duration-300`}
                                        onClick={() => navigateToSection('About')}
                                    >
                                        <ChevronDown
                                            size={24}
                                            className={`${
                                                isDarkMode ? 'text-gray-400' : 'text-black-400'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </section>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <MobileMenu
                    isMenuOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                    isDarkMode={isDarkMode}
                    sections={sections}
                    currentSection={currentSection}
                    navigateToSection={navigateToSection}
                />

                {/* Modal for contact form */}
                {isModalOpen && (
                    <Modal
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                        isDarkMode={isDarkMode}
                    />
                )}

                {/* Side Navbar for larger screens */}
                <SideNavBar
                    sections={sections}
                    currentSection={currentSection}
                    navigateToSection={navigateToSection}
                    isDarkMode={isDarkMode}
                    audiowide={audiowide}
                />
            </div>

            {/* Dark Mode Toggle Button */}
            <div className="fixed md:bottom-7 bottom-7 md:left-6 left-1 ">
                <Button
                    variant="ghost"
                    className="p-4 rounded-full text-xl hover:bg-gray-200 transition-colors "
                    onClick={toggleDarkMode}
                >
                    {isDarkMode ? <Sun size={28} /> : <Moon size={28} />}
                </Button>
            </div>
        </div>
    );
}

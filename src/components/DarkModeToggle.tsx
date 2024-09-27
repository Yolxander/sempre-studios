"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface DarkModeToggleProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
                                                                  isDarkMode,
                                                                  toggleDarkMode,
                                                              }) => {
    return (
        <div className="fixed md:bottom-7 bottom-7 md:left-6 left-1">
            <Button
                variant="ghost"
                className="p-4 rounded-full text-xl hover:bg-gray-200 transition-colors"
                onClick={toggleDarkMode}
            >
                {isDarkMode ? <Sun size={28} /> : <Moon size={28} />}
            </Button>
        </div>
    );
};

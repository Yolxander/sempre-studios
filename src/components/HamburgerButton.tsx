import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface HamburgerButtonProps {
    toggleMenu: () => void;
    isDarkMode: boolean;
    audiowideClassName: string;
}

export const HamburgerButton = ({
                                    toggleMenu,
                                    isDarkMode,
                                    audiowideClassName,
                                }: HamburgerButtonProps) => {
    return (
        <Button
            variant="outline"
            size="sm"
            className={`rounded-full px-4 py-2 text-[20px] font-medium bg-white hover:bg-gray-50 relative transition-transform duration-300 ease-in-out hover:scale-105 ${audiowideClassName} ${
                isDarkMode
                    ? 'bg-gray-800 text-white border-white hover:bg-gray-700'
                    : 'text-black'
            }`}
            onClick={toggleMenu}
        >
            <Menu />
        </Button>
    );
};

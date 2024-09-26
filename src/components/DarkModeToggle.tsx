import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function DarkModeToggle({ toggleDarkMode, isDarkMode }) {
    return (
        <div className="fixed bottom-6 left-6">
            <Button variant="ghost" className="p-2 rounded-full" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun size={28} /> : <Moon size={28} />}
            </Button>
        </div>
    );
}

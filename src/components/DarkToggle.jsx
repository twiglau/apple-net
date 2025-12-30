import { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function DarkToggle() {
    const [isDark, setIsDark ] = useState(false)
    const toggleDark = () => {
        setIsDark((prev) => {
            const newDarkMode = !prev;
            const root = document.documentElement;
            if(newDarkMode) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
            return newDarkMode;
        })
    }
    
    return (
        <button className="p-1 bg-gray-200 rounded-full
        dark:bg-grey-600 hover:bg-gray-300
        dark:hover:bg-gray-400 transition-all duration-75
        hover:rotate-12
        "
        onClick={toggleDark}
        >
            { isDark ? (
                <FiMoon size={24} className="text-gray-800 dark:text-gray-200 animate-pulse" />
            ) : (
                <FiSun size={24} className="text-yellow-400 animate-pulse" />
            )}
        </button>
    )
}
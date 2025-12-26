import { FiSun } from "react-icons/fi";

export default function DarkToggle() {
    const toggleDark = () => {
        document.documentElement.classList.toggle("dark");
    }
    return (
        <button className="p-1 bg-gray-200 rounded-full
        dark:bg-grey-600 hover:bg-gray-300
        dark:hover:bg-gray-400 transition-all duration-75
        hover:rotate-12
        "
        onClick={toggleDark}
        >
            <FiSun size={24} className="text-yellow-400 animate-pulse" />
        </button>
    )
}
import { act, useRef } from "react";
import { ulid } from "ulid";
import { motion } from "framer-motion";
import { useTabStore, type TabItem } from "../../store/context-store";


interface TabListProps {
    tabs: TabItem[];
}
export const TabList = ({ tabs }: TabListProps) => {
  const layoutId = useRef(ulid());
  const activeTabId = useTabStore((state) => state.activeTabId);
  const setActiveTabId = useTabStore((state) => state.setActiveTabId);


  return (
     <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
            <button
                key={tab.id}
                className={`relative px-4 py-2 text-sm font-medium transition-colors 
                    ${
                        activeTabId === tab.id ? 
                        "bg-blue-500 text-white hover:bg-blue-500" 
                        : "bg-gray-300 text-gray-700"
                    }
                    hover:bg-gray-500`}
                onClick={() => setActiveTabId(tab.id)}
            >
                {activeTabId === tab.id && (
                    <motion.div
                        className="absolute h-0.5 bottom-0 left-0 right-0 bg-blue-500 rounded-md"
                        layoutId={layoutId.current}
                        transition={{type: 'spring', stiffness: 300, damping: 30}}
                    />
                )}
                {tab.label}
            </button>
        ))}
     </div>  
  );
}
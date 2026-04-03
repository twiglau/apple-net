import { AnimatePresence, motion } from "framer-motion";
import  { type TabItem, useTabStore } from "../../store/context-store";

interface TabPanelsProps {
    tabs: TabItem[];
}
export const TabPanels = ({ tabs }: TabPanelsProps) => {

    const activeTabId = useTabStore((state) => state.activeTabId);
    const activeTab = tabs.find(tab => tab.id === activeTabId);
  return (
    <div className="mt-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTabId}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
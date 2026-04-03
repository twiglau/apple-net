
import { TabList } from "./tab-list"
import { TabPanels } from "./tab-panels"
import { TabStoreProvider, type TabItem } from "../../store/context-store"

interface TabsProps {
    tabs: TabItem[];
    defaultTabId?:string;
}

export {type TabItem} from "../../store/context-store";
export const Tabs = ({ tabs, defaultTabId }: TabsProps) => {

    // 如果没有默认选项，则使用第一个选项的id作为默认选项
    const defaultId = defaultTabId || tabs[0]?.id || '';

    if(!tabs || tabs.length === 0) {
        return null;
    }

    return (
        <TabStoreProvider initialTabId={defaultId}>
            <TabList tabs={tabs} />
            <TabPanels tabs={tabs} />
        </TabStoreProvider>
    );
}
import { Tabs, type TabItem } from './tabs';

// 准备一些示例数据
const tabData: TabItem[] = [
  {
    id: 'react',
    label: 'React',
    content: (
      <div className="p-4 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-semibold">React</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          一个用于构建用户界面的 JavaScript 库。它允许你用称为“组件”的一小块、独立的代码片段来构成复杂的 UI
        </p>
      </div>
    ),
  },
  {
    id: 'vue',
    label: 'Vue',
    content: (
      <div className="p-4 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-semibold">Vue</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          一套用于构建用户界面的渐进式框架。与其它大型框架不同的是,Vue 被设计为可以自底向上逐层应用
        </p>
      </div>
    ),
  },
  {
    id: 'svelte',
    label: 'Svelte',
    content: (
      <div className="p-4 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-semibold">Svelte</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          一个激进的构建用户界面的新方法。它是一个编译器,将你的声明式组件转换成高效的 JavaScript 代码来操作 DOM
        </p>
      </div>
    ),
  },
];


// 准备一些示例数据
const tabData1: TabItem[] = [
  {
    id: 'react',
    label: 'React',
    content: (
      <div className="p-4 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-semibold">React</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          一个用于构建用户界面的 JavaScript 库。它允许你用称为“组件”的一小块、独立的代码片段来构成复杂的 UI
        </p>
      </div>
    ),
  },
  {
    id: 'vue',
    label: 'Vue',
    content: (
      <div className="p-4 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-semibold">Vue</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          一套用于构建用户界面的渐进式框架。与其它大型框架不同的是,Vue 被设计为可以自底向上逐层应用
        </p>
      </div>
    ),
  },
  {
    id: 'svelte',
    label: 'Svelte',
    content: (
      <div className="p-4 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-semibold">Svelte</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          一个激进的构建用户界面的新方法。它是一个编译器,将你的声明式组件转换成高效的 JavaScript 代码来操作 DOM
        </p>
      </div>
    ),
  },
];
function App() {
  return (
    <div className="p-4 flex flex-col gap-8">
      <Tabs tabs={tabData} />
      <Tabs tabs={tabData1} />
    </div>
  );
}

export default App;
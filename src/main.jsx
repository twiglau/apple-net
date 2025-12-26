//主程序
import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css"; // 引入 CSS 文件
import MainLayout from "@/layouts/MainLayout";
import Home from '@/pages/Home'
import Header from '@components/Header'
import Footer from '@components/Footer'

export function App() {

  //单根节点原则
  return (
    <div>
      <MainLayout 
      header={<Header />}
      content={<Home />}
      footer={<Footer />}
      />
    </div>
  );
}

// JSX 是 JavaScript 的语法扩展，它让我们可以在 JavaScript 里直接写出类似 HTML 的结构
// JSX = HTML 的语法 + JavaScript 的能力
const root = document.getElementById("root"); // 获取 id 为 root 的 DOM 元素
const rootElement = ReactDOM.createRoot(root); // 创建一个 React 根元素
rootElement.render(
  <React.StrictMode>
    {/* 严格模式，帮助我们发现潜在问题 */}
    {/* React.StrictMode 是一个工具，用于帮助我们发现潜在的问题 */}
    {/* 它不会渲染任何 UI，只会激活额外的检查和警告 */}
    {/* 它可以帮助我们发现不安全的生命周期方法、过时的 API 等问题 */}
    {/* 在开发模式下，它会额外渲染一次组件，以帮助我们发现副作用 */}
    {/* 在生产模式下，它不会额外渲染一次组件 */}
    {/* 它不会影响生产模式下的性能 */}
    {/* 它不会影响组件的行为 */}
    {/* 它不会影响组件的性能 */}
    {/* 它不会影响组件的生命周期 */}
    {/* 它不会影响组件的状态 */}
    {/* 它不会影响组件的属性 */}
    {/* 它不会影响组件的事件 */}
    {/* 它不会影响组件的上下文 */}
    <App />
  </React.StrictMode>
); // 渲染 App 组件到根元素

// 不推荐！！！
// React 版本（17 及以前）
// ReactDOM.render(<App />, document.getElementById("root"));

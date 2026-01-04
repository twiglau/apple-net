import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./i18n/config"; // 引入 i18n 配置文件, i18n 的配置会自动执行

const root = document.getElementById("root")!;
const rootElement = ReactDOM.createRoot(root);
rootElement.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

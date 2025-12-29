import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";

const root = document.getElementById("root")!;
const rootElement = ReactDOM.createRoot(root);
rootElement.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

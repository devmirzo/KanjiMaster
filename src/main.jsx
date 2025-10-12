// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { KanjiProvider } from "./context/KanjiContext";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KanjiProvider>
      <App />
    </KanjiProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";  // Use the new import
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';  // or './tailwind.css' if you use a different name


// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

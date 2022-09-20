import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PersonsContextProvider } from "./context/PersonContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PersonsContextProvider>
      <App />
    </PersonsContextProvider>
  </React.StrictMode>
);

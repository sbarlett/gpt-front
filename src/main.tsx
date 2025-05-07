import React from "react";
import { createRoot } from "react-dom/client";
import { ReactGPT } from "./ReactGPT";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactGPT />
  </React.StrictMode>
);

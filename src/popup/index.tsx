import React from "react";
import ReactDOM from "react-dom/client";
import { Popup } from "./Popup";
import "../Resets.css";

const popupRoot = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
popupRoot.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);

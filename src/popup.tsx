import React from "react";
import ReactDOM from "react-dom/client";

const popupRoot = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
popupRoot.render(
  <React.StrictMode>
    <div>Hello World this is popup</div>
  </React.StrictMode>
);

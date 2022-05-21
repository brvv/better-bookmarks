import React from "react";
import ReactDOM from "react-dom";
import "./BookmarkEditor.css";

export const BookmarkEditor: React.FC = () => {
  return ReactDOM.createPortal(
    <div>
      <div className="modal-background"></div>
      <div className="modal-content">
        <p>This modal is about editing the background</p>
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};

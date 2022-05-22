import React from "react";
import ReactDOM from "react-dom";
import "./BookmarkEditor.css";

export const BookmarkEditor: React.FC = () => {
  return ReactDOM.createPortal(
    <div>
      <div className="modal-background"></div>
      <div className="modal-content">
        <p>Edit title:</p>
        <input></input>
        <p>edit link</p>
        <input></input>
        <button>submit</button>
        <button>cancel</button>
        <button>delete</button>
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};

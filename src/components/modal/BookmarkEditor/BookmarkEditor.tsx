import React from "react";
import ReactDOM from "react-dom";
import "./BookmarkEditor.css";

type Props = {
  title?: string;
  url?: string;
  id?: string;
};

export const BookmarkEditor: React.FC<Props> = ({ title, url, id }) => {
  return ReactDOM.createPortal(
    <div>
      <div className="modal-background"></div>
      <div className="modal-content">
        <p>Edit Title: Bookmark id: {id}</p>
        <input className="edit-title" value={title}></input>
        <p>Edit Link:</p>
        <input className="edit-url" value={url}></input>
        <div className="button-container">
          <button>submit</button>
          <button>cancel</button>
          <button>delete</button>
        </div>
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};

import React from "react";
import ReactDOM from "react-dom";
import "./BookmarkEditor.css";

type Props = {
  title?: string;
  url?: string;
  id?: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BookmarkEditor: React.FC<Props> = ({
  title,
  url,
  id,
  setIsModalOpen,
}) => {
  return ReactDOM.createPortal(
    <div>
      <div
        className="modal-background"
        onClick={() => {
          setIsModalOpen(false);
        }}
      ></div>
      <div className="modal-content">
        <p>Edit Title: Bookmark id: {id}</p>
        <input className="edit-title" value={title}></input>
        <p>Edit Link:</p>
        <input className="edit-url" value={url}></input>
        <div className="button-container">
          <button>submit</button>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            cancel
          </button>
          <button>delete</button>
        </div>
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};

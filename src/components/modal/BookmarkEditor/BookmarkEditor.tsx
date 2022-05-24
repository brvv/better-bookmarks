import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./BookmarkEditor.css";

type Props = {
  bookmark: Bookmark;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange?: (bookmark: Bookmark) => void;
  handleRemove?: (bookmark: Bookmark) => void;
};

export const BookmarkEditor: React.FC<Props> = ({
  bookmark,
  setIsModalOpen,
  handleChange,
  handleRemove,
}) => {
  const [titleInput, setTitleInput] = useState(bookmark.title);
  const [urlInput, setUrlInput] = useState(bookmark.url ? bookmark.url : "");

  return ReactDOM.createPortal(
    <div>
      <div
        className="modal-background"
        onClick={() => {
          setIsModalOpen(false);
        }}
      ></div>
      <div className="modal-content">
        <p>Edit Title: Bookmark id: {bookmark.id}</p>
        <input
          className="edit-title"
          value={titleInput}
          onInput={(e) => setTitleInput((e.target as HTMLInputElement).value)}
        ></input>
        <p>Edit Link:</p>
        <input
          className="edit-url"
          value={urlInput}
          onInput={(e) => setUrlInput((e.target as HTMLInputElement).value)}
        ></input>
        <div className="button-container">
          <button
            onClick={() => {
              if (handleChange && urlInput && titleInput) {
                const newBookmark: Bookmark = {
                  id: bookmark.id,
                  title: titleInput,
                  url: urlInput,
                };
                handleChange(newBookmark);
                setIsModalOpen(false);
              }
            }}
          >
            change
          </button>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            cancel
          </button>
          <button
            onClick={() => {
              if (handleRemove) {
                handleRemove(bookmark);
                setIsModalOpen(false);
              }
            }}
          >
            delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};

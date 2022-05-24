import React, { useState } from "react";
import { BookmarkEditor } from "../../modal/BookmarkEditor/BookmarkEditor";
import "./Bookmark.css";

type Props = {
  bookmark: Bookmark;
  change?: (bookmark: Bookmark) => void;
};

export const Bookmark: React.FC<Props> = ({ bookmark, change }) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <div>
      <a
        href={bookmark.url ? bookmark.url : ""}
        className="bookmark"
        target="_blank"
        rel="noreferrer"
      >
        <div className="info-container">
          <p className="title">{bookmark.title}</p>
          <p className="url">{bookmark.url ? bookmark.url : ""}</p>
        </div>
        <div className="button-container">
          <button
            className="settings-button"
            onClick={(e) => {
              e.preventDefault();
              setIsEditorOpen(true);
            }}
          ></button>
        </div>
      </a>

      {isEditorOpen && (
        <BookmarkEditor
          bookmark={bookmark}
          setIsModalOpen={setIsEditorOpen}
          change={change}
        />
      )}
    </div>
  );
};

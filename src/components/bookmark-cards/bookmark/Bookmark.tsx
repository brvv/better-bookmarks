import React, { useState } from "react";
import { BookmarkEditor } from "../../modal/BookmarkEditor/BookmarkEditor";
import "./Bookmark.css";

type Props = {
  title: string;
  url: string;
  id: string;
};

export const Bookmark: React.FC<Props> = ({ title, url, id }) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <div>
      <a href={url} className="bookmark" target="_blank" rel="noreferrer">
        <div className="info-container">
          <p className="title">{title}</p>
          <p className="url">{url}</p>
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

      {isEditorOpen && <BookmarkEditor title={title} url={url} id={id} />}
    </div>
  );
};

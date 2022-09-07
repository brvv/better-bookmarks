import React from "react";
import { CollapsableOptionsMenu } from "../../tools/CollapsableOptionsMenu/CollapsableOptionsMenu";
import "./Bookmark.css";

type Props = {
  bookmark: Bookmark;
  handleEdit: (bookmark: Bookmark) => void;
  handleDelete: (bookmark: Bookmark) => void;
};

export const Bookmark: React.FC<Props> = ({
  bookmark,
  handleEdit,
  handleDelete,
}) => {

  return (
    <div className="bookmark-parent">
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

      </a>

        <CollapsableOptionsMenu
          bookmark={bookmark}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
    </div>
  );
};

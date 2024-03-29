import React from "react";
import "./BookmarkContainer.css";
import { Bookmark } from "../bookmark/Bookmark";

type Props = {
  bookmarks: Bookmark[];
};

export const BookmarkContainer: React.FC<Props> = ({ bookmarks }) => {
  return (
    <div className="bookmark-container">
      {bookmarks.map((bookmarkInfo) => (
        <Bookmark key={bookmarkInfo.id} bookmark={bookmarkInfo} />
      ))}
    </div>
  );
};

import React from "react";
import { Bookmark } from "../components";

type Props = {
  bookmarks: Bookmark[];
};

export const PopupBookmarkContainer: React.FC<Props> = ({ bookmarks }) => {
  return (
    <div className="popup-bookmark-container">
      {bookmarks.map((bookmarkInfo) => (
        <Bookmark key={bookmarkInfo.id} bookmark={bookmarkInfo} />
      ))}
    </div>
  );
};

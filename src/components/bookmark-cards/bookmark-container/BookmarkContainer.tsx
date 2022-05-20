import React from "react";
import "./BookmarkContainer.css";
import { Bookmark } from "../bookmark/Bookmark";

type Props = {
  parentId: string;
};

export const BookmarkContainer: React.FC<Props> = ({ parentId }) => {
  return (
    <div className="bookmark-container">
      {parentId}
      <Bookmark
        title="bookmark1"
        url="https://ants.example.com/advice.aspx#arm"
      />
      <Bookmark title="bookmark2" url="https://beds.example.net/bed.php" />
      <Bookmark title="bookmark3" url="http://example.com/afternoon.aspx" />
    </div>
  );
};

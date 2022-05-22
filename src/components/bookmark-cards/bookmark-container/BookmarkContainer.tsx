import React, { useEffect, useState } from "react";
import "./BookmarkContainer.css";
import { Bookmark } from "../bookmark/Bookmark";
import { getBookmarksFromParent } from "../../../api";

type Props = {
  parentId: string;
};

export const BookmarkContainer: React.FC<Props> = ({ parentId }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarksFinishedLoading, setBookmarksFinishedLoading] =
    useState(false);

  //Bookmarks
  useEffect(() => {
    getBookmarksFromParent(parentId).then((bookmarks) => {
      setBookmarks(bookmarks);
      setBookmarksFinishedLoading(true);
      console.log(bookmarks);
    });
  }, [parentId]);

  return (
    <div className="bookmark-container">
      {bookmarksFinishedLoading ? (
        bookmarks.map((bookmark) => (
          <Bookmark
            title={bookmark.title}
            url={bookmark.url ? bookmark.url : ""}
            id={bookmark.id}
          />
        ))
      ) : (
        <p>Loading!</p>
      )}
    </div>
  );
};

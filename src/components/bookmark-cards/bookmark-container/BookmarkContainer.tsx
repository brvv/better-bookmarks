import React, { useEffect, useState } from "react";
import "./BookmarkContainer.css";
import { Bookmark } from "../bookmark/Bookmark";
import { getBookmarksFromParent, updateBookmark } from "../../../api";

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

  const changeBookmarkInfo = async (newBookmark: Bookmark) => {
    const updatedBookmark = await updateBookmark(newBookmark);
    const bookmarkIndex = bookmarks.findIndex(
      (bookmark) => bookmark.id === newBookmark.id
    );
    const newBookmarks = [...bookmarks];
    newBookmarks[bookmarkIndex] = updatedBookmark;
    setBookmarks(newBookmarks);
  };

  return (
    <div className="bookmark-container">
      {bookmarksFinishedLoading ? (
        bookmarks.map((bookmark) => (
          <Bookmark bookmark={bookmark} change={changeBookmarkInfo} />
        ))
      ) : (
        <p>Loading!</p>
      )}
    </div>
  );
};

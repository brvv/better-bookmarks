import React, { useEffect, useState } from "react";
import "./BookmarkContainer.css";
import { Bookmark } from "../bookmark/Bookmark";
import {
  getBookmarksFromParent,
  updateBookmark,
  removeBookmark,
  moveUpBookmark,
  getRootId,
} from "../../../api";

type Props = {
  parentId: string;
};

export const BookmarkContainer: React.FC<Props> = ({ parentId }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarksFinishedLoading, setBookmarksFinishedLoading] =
    useState(false);
  const [isInRootFolder, setIsInRootFolder] = useState(false)

  //Check if we are in the root folder of the program
  useEffect(() => {
    getRootId().then((id) => {
      setIsInRootFolder(parentId === id);
    })
  })

  //Bookmarks
  useEffect(() => {
    getBookmarksFromParent(parentId).then((bookmarks) => {
      setBookmarks(bookmarks);
      setBookmarksFinishedLoading(true);
      console.log(bookmarks);
    });
    
  }, [parentId]);

  const handleEditBookmark = async (newBookmark: Bookmark) => {
    const updatedBookmark = await updateBookmark(newBookmark);
    const bookmarkIndex = bookmarks.findIndex(
      (bookmark) => bookmark.id === newBookmark.id
    );
    const newBookmarks = [...bookmarks];
    newBookmarks[bookmarkIndex] = updatedBookmark;
    setBookmarks(newBookmarks);
  };

  const handleDeleteBookmark = async (target: Bookmark) => {
    const newBookmarks = [...bookmarks];
    const bookmarkIndex = bookmarks.findIndex(
      (bookmark) => bookmark.id === target.id
    );
    newBookmarks.splice(bookmarkIndex, 1);
    await removeBookmark(target);
    setBookmarks(newBookmarks);
  };

  const handleMoveUpBookmark = async (target: Bookmark) => {
    const rootId = await getRootId();
    const newBookmarks = [...bookmarks];
    const bookmarkIndex = bookmarks.findIndex(
      (bookmark) => bookmark.id === target.id
    );
    newBookmarks.splice(bookmarkIndex, 1);
    if (target.parentId && target.parentId != rootId) {
      await moveUpBookmark(target);
    }
    setBookmarks(newBookmarks);
  }

  return (
    <div className="bookmark-container">
      {bookmarksFinishedLoading ? (
        bookmarks.map((bookmark) => (
          <Bookmark
            bookmark={bookmark}
            handleEdit={handleEditBookmark}
            handleDelete={handleDeleteBookmark}
            handleMoveUpBookmark={isInRootFolder ? undefined : handleMoveUpBookmark}
          />
        ))
      ) : (
        <p>Loading!</p>
      )}
    </div>
  );
};

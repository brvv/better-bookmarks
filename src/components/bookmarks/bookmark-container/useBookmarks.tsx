import React, { useState, useEffect } from "react";

import {
  updateBookmark,
  removeBookmark,
  moveUpBookmark,
  getRootId,
  createNewBookmark,
} from "../../../api";

type Props = {
  parentId: string;
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
};

export const useBookmarks = ({ parentId, bookmarks, setBookmarks }: Props) => {
  const [isInRootFolder, setIsInRootFolder] = useState(false);

  useEffect(() => {
    getRootId().then((id) => {
      setIsInRootFolder(parentId === id);
    });
  }, [parentId]);

  const handleEditBookmark = async (newBookmark: Bookmark): Promise<void> => {
    const updatedBookmark = await updateBookmark(newBookmark);
    const bookmarkIndex = bookmarks.findIndex(
      (bookmark) => bookmark.id === newBookmark.id
    );
    const newBookmarks = [...bookmarks];
    newBookmarks[bookmarkIndex] = updatedBookmark;
    setBookmarks(newBookmarks);
  };

  const handleDeleteBookmark = async (target: Bookmark) => {
    await removeBookmark(target);
    const newBookmarks = [...bookmarks];
    const bookmarkIndex = newBookmarks.findIndex(
      (bookmark) => bookmark.id === target.id
    );
    newBookmarks.splice(bookmarkIndex, 1);
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
  };

  const handleCreateBookmark = async (newBookmark: NewBookmark) => {
    const result = await createNewBookmark(newBookmark);
    setBookmarks([...bookmarks, result]);
  };

  return {
    isInRootFolder,
    handleEditBookmark,
    handleDeleteBookmark,
    handleMoveUpBookmark,
    handleCreateBookmark,
  };
};

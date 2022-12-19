import React from "react";
import {
  updateBookmark,
  removeBookmark,
  moveBookmarkUpOneLevel,
  createBookmark,
} from "../../api/Bookmarks";
import { getRootId } from "../../api/Storage/storage";

type Props = {
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
};

export const useBookmarkActions = ({ bookmarks, setBookmarks }: Props) => {
  const handleEdit = async (newBookmark: Bookmark): Promise<void> => {
    const updatedBookmark = await updateBookmark(newBookmark);
    const bookmarkIndex = bookmarks.findIndex(
      (bookmark) => bookmark.id === newBookmark.id
    );
    const newBookmarks = [...bookmarks];
    newBookmarks[bookmarkIndex] = updatedBookmark;
    setBookmarks(newBookmarks);
  };

  const handleDelete = async (target: Bookmark) => {
    await removeBookmark(target);
    const newBookmarks = [...bookmarks];
    const bookmarkIndex = newBookmarks.findIndex(
      (bookmark) => bookmark.id === target.id
    );
    newBookmarks.splice(bookmarkIndex, 1);
    setBookmarks(newBookmarks);
  };

  const handleMoveUp = async (target: Bookmark) => {
    const rootId = await getRootId();
    const newBookmarks = [...bookmarks];
    const bookmarkIndex = bookmarks.findIndex(
      (bookmark) => bookmark.id === target.id
    );
    newBookmarks.splice(bookmarkIndex, 1);
    if (target.parentId && target.parentId != rootId) {
      await moveBookmarkUpOneLevel(target);
    }
    setBookmarks(newBookmarks);
  };

  const handleCreate = async (newBookmark: NewBookmark) => {
    const result = await createBookmark(newBookmark);
    setBookmarks([...bookmarks, result]);
  };

  return {
    handleEdit,
    handleDelete,
    handleMoveUp,
    handleCreate,
  };
};

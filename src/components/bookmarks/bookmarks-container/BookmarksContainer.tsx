import React, { useEffect, useState } from "react";
import "./BookmarksContainer.css";
import { Bookmark } from "../bookmark/Bookmark";
import { NewBookmarkButton } from "../new-bookmark-button/NewBookmarkButton";
import {
  updateBookmark,
  removeBookmark,
  moveUpBookmark,
  getRootId,
  createNewBookmark,
} from "../../../api";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

type Props = {
  parentId: string;
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
  getMouseOffset: { x: number; y: number };
  isBookmarkOverFolder?: boolean;
};

export const BookmarksContainer: React.FC<Props> = ({
  parentId,
  bookmarks,
  setBookmarks,
  getMouseOffset,
  isBookmarkOverFolder,
}) => {
  const [isInRootFolder, setIsInRootFolder] = useState(false);

  //Check if we are in the root folder of the program
  useEffect(() => {
    getRootId().then((id) => {
      setIsInRootFolder(parentId === id);
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

  return (
    <div className="bookmark-container">
      <SortableContext
        items={bookmarks.map((bookmark) => bookmark.id)}
        strategy={rectSortingStrategy}
      >
        {bookmarks.map((bookmark) => (
          <Bookmark
            key={bookmark.id}
            bookmark={bookmark}
            handleEdit={handleEditBookmark}
            handleDelete={handleDeleteBookmark}
            handleMoveUpBookmark={
              isInRootFolder ? undefined : handleMoveUpBookmark
            }
            dragTransform={getMouseOffset}
            isBookmarkOverFolder={isBookmarkOverFolder}
          />
        ))}
      </SortableContext>
      <NewBookmarkButton
        parentId={parentId}
        handleCreateNewBookmark={handleCreateBookmark}
      />
    </div>
  );
};

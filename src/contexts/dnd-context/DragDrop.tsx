import React, { useContext, useState } from "react";
import { useDragDrop } from "./useDragDrop";
import { DndContext } from "@dnd-kit/core";

type MouseOffsetType = {
  x: number;
  y: number;
};

type BookmarkOverFolderType = {
  isBookmarkOverFolder: boolean;
  overFolderId: string;
};

type Props = {
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  children: React.ReactNode;
};

const MouseOffsetContext = React.createContext<MouseOffsetType | null>(null);
const BookmarkOverFolderContext =
  React.createContext<BookmarkOverFolderType | null>(null);

export const useMouseOffset = () => {
  return useContext(MouseOffsetContext);
};

export const useBookmarkOverFolder = () => {
  return useContext(BookmarkOverFolderContext);
};

export const DragDropProvider = ({
  bookmarks,
  setBookmarks,
  folders,
  setFolders,
  children,
}: Props) => {
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseCoord({ x: e.pageX, y: e.pageY });
  };

  const {
    isBookmarkOverFolder,
    overFolderId,
    mouseOffset,
    sensors,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    customCollisionDetectionAlgorithm,
  } = useDragDrop({
    bookmarks,
    setBookmarks,
    folders,
    setFolders,
    mouseCoord,
  });

  return (
    <div onMouseMove={handleMouseMove}>
      <MouseOffsetContext.Provider value={mouseOffset}>
        <DndContext
          sensors={sensors}
          collisionDetection={customCollisionDetectionAlgorithm}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
        >
          <BookmarkOverFolderContext.Provider
            value={{ isBookmarkOverFolder, overFolderId }}
          >
            {children}
          </BookmarkOverFolderContext.Provider>
        </DndContext>
      </MouseOffsetContext.Provider>
    </div>
  );
};

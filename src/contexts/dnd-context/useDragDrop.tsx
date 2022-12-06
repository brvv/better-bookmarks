import React, { useState } from "react";

import {
  closestCenter,
  pointerWithin,
  Collision,
  MouseSensor,
  useSensor,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  changeBookmarkIndex,
  changeFolderIndex,
  moveBookmark,
  TOOLBAR_ID,
} from "../../api";
import { arrayMove } from "@dnd-kit/sortable";

type Props = {
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  mouseCoord: { x: number; y: number };
};

export const useDragDrop = ({
  bookmarks,
  setBookmarks,
  folders,
  setFolders,
  mouseCoord,
}: Props) => {
  const [isBookmarkOverFolder, setIsBookmarkOverFolder] = useState(false);
  const [overFolderId, setOverFolderId] = useState("");
  const [dragStartCoord, setDragStartCoord] = useState({ x: 0, y: 0 });

  const sensors = [
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  ];

  const getIdCategory = (id: string): "Bookmark" | "Folder" | void => {
    if (bookmarks.findIndex((bookmark) => bookmark.id === id) !== -1) {
      return "Bookmark";
    } else if (
      folders.findIndex((folder) => folder.id === id) !== -1 ||
      id === TOOLBAR_ID + "droppable"
    ) {
      return "Folder";
    }
    return;
  };

  const handleBookmarkOnBookmarkCollision = async ({
    active,
    over,
  }: DragEndEvent) => {
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const newBookmarks = [...bookmarks];
      const oldIndex = newBookmarks.findIndex(
        (bookmark) => bookmark.id === active.id
      );
      const newIndex = newBookmarks.findIndex(
        (bookmark) => bookmark.id === over.id
      );

      changeBookmarkIndex(bookmarks[oldIndex], newIndex);
      const reorderedBookmarks = arrayMove(newBookmarks, oldIndex, newIndex);
      setBookmarks(reorderedBookmarks);
    }
  };

  const handleFolderOnFolderCollision = async ({
    active,
    over,
  }: DragEndEvent) => {
    if (!over) {
      return;
    }
    if (
      active.id === TOOLBAR_ID + "droppable" ||
      over.id === TOOLBAR_ID + "droppable"
    ) {
      return;
    }

    if (active.id !== over.id) {
      const newFolders = [...folders];
      const oldIndex = newFolders.findIndex(
        (folder) => folder.id === active.id
      );
      const newIndex = newFolders.findIndex((folder) => folder.id === over.id);

      changeFolderIndex(folders[oldIndex], newIndex);
      const reorderedFolders = arrayMove(newFolders, oldIndex, newIndex);
      setFolders(reorderedFolders);
    }
  };

  const handleBookmarkOnFolderCollision = async ({
    active,
    over,
  }: DragEndEvent) => {
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const newBookmarks = [...bookmarks];
      const bookmarkIndex = newBookmarks.findIndex(
        (bookmark) => bookmark.id === active.id
      );
      const targetBookmark = newBookmarks[bookmarkIndex];
      let targetFolderId = over.id as string;
      if (targetFolderId === TOOLBAR_ID + "droppable") {
        targetFolderId = TOOLBAR_ID;
      }
      moveBookmark(targetBookmark, targetFolderId);
      newBookmarks.splice(bookmarkIndex, 1);
      setBookmarks(newBookmarks);
    }
  };

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!active || !over) {
      return;
    }

    const activeCategory = getIdCategory(active.id as string);
    const overCategory = getIdCategory(over.id as string);

    if (activeCategory === "Bookmark" && overCategory === "Bookmark") {
      handleBookmarkOnBookmarkCollision({ active, over } as DragEndEvent);
    } else if (activeCategory === "Folder" && overCategory === "Folder") {
      handleFolderOnFolderCollision({ active, over } as DragEndEvent);
    } else if (activeCategory === "Bookmark" && overCategory === "Folder") {
      handleBookmarkOnFolderCollision({ active, over } as DragEndEvent);
    }
    setOverFolderId("");
    setIsBookmarkOverFolder(false);
  };

  const customCollisionDetectionAlgorithm = (args: any): Collision[] => {
    // First, let's see if there are any collisions with the pointer
    const activeCategory = getIdCategory(args.active.id as string);
    const activeId = args.active.id as string;
    const pointerCollisions = pointerWithin(args);

    // Collision detection algorithms return an array of collisions
    if (pointerCollisions.length > 0) {
      const pointerCollisionId = pointerCollisions[0].id as string;
      const pointerCollisionCategory = getIdCategory(pointerCollisionId);

      if (
        activeCategory === "Bookmark" &&
        pointerCollisionCategory === "Folder"
      ) {
        return pointerCollisions;
      }
    }

    const centerCollisions = closestCenter(args);
    const trueCollisions: Collision[] = [];

    for (const element of centerCollisions) {
      const elementCategory = getIdCategory(element.id as string);
      const elementId = element.id as string;
      if (
        elementCategory === activeCategory &&
        !(
          elementId === TOOLBAR_ID + "droppable" ||
          activeId === TOOLBAR_ID + "droppable"
        )
      ) {
        trueCollisions.push(element);
      }
    }

    return trueCollisions;
  };

  const handleDragOver = async (event: DragOverEvent) => {
    if (!event.over) {
      return;
    }

    const activeCategory = getIdCategory(event.active.id as string);
    const overCategory = getIdCategory(event.over.id as string);

    if (activeCategory === "Bookmark" && overCategory === "Folder") {
      setOverFolderId(event.over.id as string);
      setIsBookmarkOverFolder(true);
    } else {
      setOverFolderId("");
      setIsBookmarkOverFolder(false);
    }
  };

  const handleDragStart = async (event?: DragStartEvent) => {
    if (event) {
      setDragStartCoord(mouseCoord);
    }
  };

  return {
    isBookmarkOverFolder,
    overFolderId,
    mouseOffset: {
      x: mouseCoord.x - dragStartCoord.x,
      y: mouseCoord.y - dragStartCoord.y,
    },
    sensors,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    customCollisionDetectionAlgorithm,
  };
};

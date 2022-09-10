import React, { useEffect, useState } from "react";
import { BookmarkContainer, CardContainer } from "../components";
import { getRootId, getBookmarksFromParent, getFoldersFromParent, changeBookmarkIndex, changeFolderIndex, moveBookmark } from "../api";
import { useParams } from "react-router-dom";
import { pointerWithin, DndContext, MouseSensor, useSensor, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export const MainPage: React.FC = () => {
  const params = useParams();
  const [rootId, setRootId] = useState("");

  const sensors = [useSensor(MouseSensor, {
    activationConstraint : {
      distance : 10
    },
  })];

  useEffect(() => {
    if (params.folderId) {
      setRootId(params.folderId);
    } else {
      getRootId().then((id) => {
        setRootId(id);
      });
    }
  }, [params]);

  //Bookmarks
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarksFinishedLoading, setBookmarksFinishedLoading] = useState(false);
  
  
  useEffect(() => {
  getBookmarksFromParent(rootId).then((bookmarks) => {
    setBookmarks(bookmarks);
    setBookmarksFinishedLoading(true);
  });
    
  }, [rootId]);

  //Folders
  const [folders, setFolders] = useState<BookmarkFolder[]>([]);
  const [foldersFinishedLoading, setFoldersFinishedLoading] = useState(false);


  
  useEffect(() => {
    getFoldersFromParent(rootId).then((folders) => {
      setFolders(folders);
      setFoldersFinishedLoading(true);
    });
  }, [rootId]);

  const getIdCategory = (id : string) : "Bookmark" | "Folder" | void => {
    if (bookmarks.findIndex((bookmark) => bookmark.id === id) !== -1) {return "Bookmark"}
    else if (folders.findIndex((folder) => folder.id === id)  !== -1) {return "Folder"}
    return;
  }

  const handleBookmarkOnBookmarkCollision = async ({active, over} : DragEndEvent) => {
    if (! over) {return;}

    if (active.id !== over.id) {
      let newBookmarks = [...bookmarks];
      const oldIndex = newBookmarks.findIndex(bookmark => bookmark.id === active.id);
      const newIndex = newBookmarks.findIndex(bookmark => bookmark.id === over.id);
      
      changeBookmarkIndex(bookmarks[oldIndex], newIndex);
      const reorderedBookmarks = arrayMove(newBookmarks, oldIndex, newIndex);
      setBookmarks(reorderedBookmarks);
    }
  }

  const handleFolderOnFolderCollision = async ({active, over} : DragEndEvent) => {
    if (! over) {return;}

    if (active.id !== over.id) {
      let newFolders = [...folders];
      const oldIndex = newFolders.findIndex(folder => folder.id === active.id);
      const newIndex = newFolders.findIndex(folder => folder.id === over.id);
      
      changeFolderIndex(folders[oldIndex], newIndex);
      const reorderedFolders = arrayMove(newFolders, oldIndex, newIndex);
      setFolders(reorderedFolders);
      
    }
  }

  const handleBookmarkOnFolderCollision = async ({active, over} : DragEndEvent) => {
    if (! over) {return;}

    if (active.id !== over.id) {
      let newBookmarks = [...bookmarks];
      const bookmarkIndex = newBookmarks.findIndex(bookmark => bookmark.id === active.id);
      await moveBookmark(newBookmarks[bookmarkIndex], over.id as string);
      newBookmarks.splice(bookmarkIndex, 1);

      setBookmarks(newBookmarks);
    }
  }

  const handleDragEnd = async ({active, over} : DragEndEvent) => {
    if (!active || !over) {return;}

    const activeCategory = getIdCategory(active.id as string);
    const overCategory = getIdCategory(over.id as string);

    if (activeCategory == "Bookmark" && overCategory === "Bookmark") {
      handleBookmarkOnBookmarkCollision({active, over} as DragEndEvent);
    } else if (activeCategory == "Folder" && overCategory === "Folder") {
      handleFolderOnFolderCollision({active, over} as DragEndEvent);
    } else if (activeCategory == "Bookmark" && overCategory === "Folder") {
      handleBookmarkOnFolderCollision({active, over} as DragEndEvent);
    }

  }

  return (
    <div className="App">
      <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>   
        {rootId && bookmarksFinishedLoading ? <BookmarkContainer parentId={rootId} bookmarks={bookmarks} setBookmarks={setBookmarks} /> : <p>Loading!</p>}
        {rootId && foldersFinishedLoading ? <CardContainer parentId={rootId} folders={folders} setFolders={setFolders} /> : <p>Loading!</p>}
      </DndContext>
    </div>
  );
};

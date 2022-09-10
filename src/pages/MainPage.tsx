import React, { useEffect, useState } from "react";
import { BookmarkContainer, CardContainer } from "../components";
import { getRootId, getBookmarksFromParent, getFoldersFromParent } from "../api";
import { useParams } from "react-router-dom";
import { closestCenter, DndContext, MouseSensor, useSensor/* , DragEndEvent */ } from '@dnd-kit/core';

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




  /*   const handleDragEnd = async ({active, over} : DragEndEvent) => {
    if (! over) {return}

    if (active.id !== over.id) {
      let newBookmarks = [...bookmarks];
      const oldIndex = newBookmarks.findIndex(bookmark => bookmark.id === active.id);
      const newIndex = newBookmarks.findIndex(bookmark => bookmark.id === over.id);
      
      changeBookmarkIndex(bookmarks[oldIndex], newIndex);
      const reorderedBookmarks = arrayMove(newBookmarks, oldIndex, newIndex);
      setBookmarks(reorderedBookmarks);
      
    }
  } */

  return (
    <div className="App">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => {console.log("drag ended", e)}}>   
        {rootId && bookmarksFinishedLoading ? <BookmarkContainer parentId={rootId} bookmarks={bookmarks} setBookmarks={setBookmarks} /> : <p>Loading!</p>}
        {rootId && foldersFinishedLoading ? <CardContainer parentId={rootId} folders={folders} setFolders={setFolders} /> : <p>Loading!</p>}
      </DndContext>
    </div>
  );
};

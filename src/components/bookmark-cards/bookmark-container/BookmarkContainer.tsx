import React, { useEffect, useState } from "react";
import "./BookmarkContainer.css";
import { Bookmark } from "../bookmark/Bookmark";
import { NewBookmarkButton} from "../new-bookmark-button/NewBookmarkButton"
import {
  getBookmarksFromParent,
  updateBookmark,
  removeBookmark,
  moveUpBookmark,
  getRootId,
  createNewBookmark,
  changeBookmarkIndex,
} from "../../../api";
import { closestCenter, DndContext, MouseSensor, useSensor, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

type Props = {
  parentId: string;
};

export const BookmarkContainer: React.FC<Props> = ({ parentId }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarksFinishedLoading, setBookmarksFinishedLoading] =
    useState(false);
  const [isInRootFolder, setIsInRootFolder] = useState(false);

  const sensors = [useSensor(MouseSensor, {
    activationConstraint : {
      distance : 10
    },
  })];

  //Check if we are in the root folder of the program
  useEffect(() => {
    getRootId().then((id) => {
      setIsInRootFolder(parentId === id);
    })
  }, [])

  //Bookmarks
  useEffect(() => {
    getBookmarksFromParent(parentId).then((bookmarks) => {
      setBookmarks(bookmarks);
      setBookmarksFinishedLoading(true);
    });
    
  }, [parentId]);

  useEffect(() => {console.log("trying to change boomarks", bookmarks)}, [bookmarks])

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
    console.log(newBookmarks);
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

  const handleCreateBookmark = async (newBookmark : NewBookmark) => {
    const result = await createNewBookmark(newBookmark);
    setBookmarks([...bookmarks, result]);}


  const handleDragEnd = async ({active, over} : DragEndEvent) => {
    if (! over) {return}

    if (active.id !== over.id) {
      let newBookmarks = [...bookmarks];
      const oldIndex = newBookmarks.findIndex(bookmark => bookmark.id === active.id);
      const newIndex = newBookmarks.findIndex(bookmark => bookmark.id === over.id);
      
      changeBookmarkIndex(bookmarks[oldIndex], newIndex);
      const reorderedBookmarks = arrayMove(newBookmarks, oldIndex, newIndex);
      setBookmarks(reorderedBookmarks);
      
    }
  }

  return (
    <div className="bookmark-container" onClick={() => console.log(bookmarks)} >
      {bookmarksFinishedLoading ? (
        
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>        
          <SortableContext items={bookmarks.map(bookmark => bookmark.id)} strategy={verticalListSortingStrategy}>
            {
              bookmarks.map((bookmark) => (
                <Bookmark
                  key={bookmark.id}
                  bookmark={bookmark}
                  handleEdit={handleEditBookmark}
                  handleDelete={handleDeleteBookmark}
                  handleMoveUpBookmark={isInRootFolder ? undefined : handleMoveUpBookmark}
                />
              ))
            }
          </SortableContext>
        </DndContext>

      ) : (
        <p>Loading!</p>
      )}
      <NewBookmarkButton parentId= {parentId} handleCreateNewBookmark={handleCreateBookmark} />
    </div>
  );
};

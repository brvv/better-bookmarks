import React from "react";
import {
  BookmarkSortableContainer,
  FolderSortableContainer,
} from "../../components";
import { useParams } from "react-router-dom";
import { DragDropContext } from "../../utils/SortableDND";
import { useDragEvents } from "./useDragEvents";
import { useRouterFolderId } from "../../hooks/useRouterFolderId";
import { InteractableItem } from "../../api/enums";
import { useBookmarks } from "../../hooks/Bookmarks/useBookmarks";
import { useFolders } from "../../hooks/Folders/useFolders";

export const Main: React.FC = () => {
  const params = useParams();
  const { folderId, isValid } = useRouterFolderId(params.folderId);
  const { bookmarks, setBookmarks } = useBookmarks({
    folderId,
  });
  const { folders, setFolders } = useFolders({
    folderId,
  });

  const { onDragStart, onDragOver, onDragEnd } = useDragEvents({
    sortableContainers: [
      {
        type: InteractableItem.Bookmark,
        items: bookmarks,
        setItems: setBookmarks,
      },
      {
        type: InteractableItem.Folder,
        items: folders,
        setItems: setFolders,
      },
    ],
  });

  return (
    <div className="App">
      {!isValid ? (
        <div>This is a wrong page, idk why u are here</div>
      ) : (
        <div>
          <DragDropContext
            customDragStartAction={onDragStart}
            customDragOverAction={onDragOver}
            customDragEndAction={onDragEnd}
          >
            {folderId && bookmarks ? (
              <BookmarkSortableContainer
                parentId={folderId}
                bookmarks={bookmarks}
                setBookmarks={setBookmarks}
              />
            ) : (
              <p>Loading!</p>
            )}
            {folderId && folders ? (
              <FolderSortableContainer
                parentId={folderId}
                folders={folders}
                setFolders={setFolders}
              />
            ) : (
              <p>Loading!</p>
            )}
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

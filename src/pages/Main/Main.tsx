import React from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "../../utils/SortableDND";
import { useDragEvents } from "./useDragEvents";
import { useRouterFolderId } from "../../hooks/useRouterFolderId";
import { InteractableItem } from "../../api/enums";
import { useBookmarks } from "../../hooks";
import { useFolders } from "../../hooks";
import { TOOLBAR_ID } from "../../api";
import {
  DroppableToolbarContainer,
  SortableFolderContainer,
} from "../../components/folders";
import { SortableBookmarkContainer } from "../../components/bookmarks/bookmark-container";
import { DroppableNavBar } from "../../components/tools/NavigationBar/DroppableNavBar";

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
            {folderId && <DroppableNavBar parentId={folderId} />}
            {folderId && bookmarks ? (
              <SortableBookmarkContainer
                parentId={folderId}
                bookmarks={bookmarks}
                setBookmarks={setBookmarks}
                options={{ enableMoveUp: false }}
              />
            ) : (
              <p>Loading!</p>
            )}
            {folderId !== TOOLBAR_ID && (
              <DroppableToolbarContainer
                toolbarId={TOOLBAR_ID}
                name="TOOLBAR"
              />
            )}

            {folderId && folders ? (
              <SortableFolderContainer
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

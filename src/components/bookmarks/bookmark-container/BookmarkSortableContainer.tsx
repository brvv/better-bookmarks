import React from "react";
import "./BookmarkContainer.css";
import { EditableBookmark } from "../bookmark/EditableBookmark";
import { Bookmark } from "../bookmark/Bookmark";
import { NewBookmarkButton } from "../new-bookmark-button/NewBookmarkButton";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../../../utils/SortableDND";
import { generateItemId } from "../../../utils/SortableDND";
import { InteractableItem } from "../../../api/enums";
import { useBookmarkActions } from "../../../hooks/Bookmarks/useBookmarkActions";

type Props = {
  parentId: string;
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
  options?: ContainerOptions;
};

type ContainerOptions = {
  disableEditing?: boolean;
  disableMoveUp?: boolean;
  disableNewBookmarkButton?: boolean;
};

export const BookmarkSortableContainer: React.FC<Props> = ({
  parentId,
  bookmarks,
  setBookmarks,
  options = {
    disableEditing: false,
    disableMoveUp: false,
    disableNewBookmarkButton: false,
  },
}) => {
  const { handleCreate, handleDelete, handleEdit, handleMoveUp } =
    useBookmarkActions({ bookmarks, setBookmarks });

  return (
    <div className="bookmark-container">
      <SortableContext
        items={bookmarks.map((bookmark) =>
          generateItemId(bookmark.id, InteractableItem.Bookmark)
        )}
        strategy={rectSortingStrategy}
      >
        {bookmarks.map((bookmarkInfo) => (
          <SortableItem
            item={{
              uniqueSortableId: generateItemId(
                bookmarkInfo.id,
                InteractableItem.Bookmark
              ),
              backendId: bookmarkInfo.id,
              type: InteractableItem.Bookmark,
              accepts: [InteractableItem.Bookmark],
            }}
            key={generateItemId(bookmarkInfo.id, InteractableItem.Bookmark)}
          >
            {options.disableEditing ? (
              <Bookmark bookmark={bookmarkInfo} />
            ) : (
              <EditableBookmark
                bookmark={bookmarkInfo}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleMoveUpBookmark={
                  !parentId || options.disableMoveUp ? undefined : handleMoveUp
                }
              />
            )}
          </SortableItem>
        ))}
      </SortableContext>
      {!options.disableNewBookmarkButton && (
        <NewBookmarkButton
          parentId={parentId}
          handleCreateNewBookmark={handleCreate}
        />
      )}
    </div>
  );
};

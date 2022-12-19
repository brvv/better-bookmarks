import React, { useState } from "react";
import "./BookmarkContainer.css";
import { NewBookmarkButton } from "../new-bookmark-button/NewBookmarkButton";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { generateItemId } from "../../../utils/SortableDND";
import { InteractableItem } from "../../../api/enums";
import { useBookmarkActions } from "../../../hooks/Bookmarks/useBookmarkActions";
import { SortableBookmark } from "../bookmark/SortableBookmark";

type Props = {
  parentId: string;
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
  options?: ContainerOptions;
};

type ContainerOptions = {
  enableEditing?: boolean;
  enableMoveUp?: boolean;
  enableNewBookmarkButton?: boolean;
};

const defaultOptions = {
  enableEditing: true,
  enableMoveUp: true,
  enableNewBookmarkButton: true,
};

export const BookmarkSortableContainer: React.FC<Props> = ({
  parentId,
  bookmarks,
  setBookmarks,
  options,
}) => {
  const { handleCreate, handleDelete, handleEdit, handleMoveUp } =
    useBookmarkActions({ bookmarks, setBookmarks });

  const [combinedOptions] = useState(
    Object.assign({}, defaultOptions, options)
  );

  return (
    <div className="bookmark-container">
      <SortableContext
        items={bookmarks.map((bookmark) =>
          generateItemId(bookmark.id, InteractableItem.Bookmark)
        )}
        strategy={rectSortingStrategy}
      >
        {bookmarks.map((bookmarkInfo) => (
          <SortableBookmark
            key={generateItemId(bookmarkInfo.id, InteractableItem.Bookmark)}
            editable={combinedOptions.enableEditing}
            bookmark={bookmarkInfo}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleMoveUp={
              combinedOptions.enableMoveUp ? handleMoveUp : undefined
            }
          />
        ))}
      </SortableContext>
      {combinedOptions.enableNewBookmarkButton && (
        <NewBookmarkButton
          parentId={parentId}
          handleCreateNewBookmark={handleCreate}
        />
      )}
    </div>
  );
};

import React from "react";
import "./BookmarkContainer.css";
import { EditableBookmark } from "../bookmark/EditableBookmark";
import { Bookmark } from "../bookmark/Bookmark";
import { SortableBookmark } from "../bookmark/tools/SortableBookmark";
import { NewBookmarkButton } from "../new-bookmark-button/NewBookmarkButton";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useBookmarks } from "./useBookmarks";

type Props = {
  parentId: string;
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
  options?: ContainerOptions;
};

type ContainerOptions = {
  disableEditing?: boolean;
  disableMoveUp?: boolean;
  includeNewBookmarkButton?: boolean;
};

export const BookmarkSortableContainer: React.FC<Props> = ({
  parentId,
  bookmarks,
  setBookmarks,
  options = { disableEditing: false, disableMoveUp: false },
}) => {
  //Check if we are in the root folder of the program

  const {
    isInRootFolder,
    handleEditBookmark,
    handleDeleteBookmark,
    handleMoveUpBookmark,
    handleCreateBookmark,
  } = useBookmarks({ parentId, bookmarks, setBookmarks });

  return (
    <div className="bookmark-container">
      <SortableContext
        items={bookmarks.map((bookmark) => bookmark.id)}
        strategy={rectSortingStrategy}
      >
        {bookmarks.map((bookmarkInfo) => (
          <SortableBookmark bookmark={bookmarkInfo} key={bookmarkInfo.id}>
            {options.disableEditing ? (
              <Bookmark bookmark={bookmarkInfo} />
            ) : (
              <EditableBookmark
                bookmark={bookmarkInfo}
                handleEdit={handleEditBookmark}
                handleDelete={handleDeleteBookmark}
                handleMoveUpBookmark={
                  isInRootFolder && !options.disableMoveUp
                    ? undefined
                    : handleMoveUpBookmark
                }
              />
            )}
          </SortableBookmark>
        ))}
      </SortableContext>
      {options.includeNewBookmarkButton && (
        <NewBookmarkButton
          parentId={parentId}
          handleCreateNewBookmark={handleCreateBookmark}
        />
      )}
    </div>
  );
};

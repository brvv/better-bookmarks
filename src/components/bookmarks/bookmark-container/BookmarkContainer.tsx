import React from "react";
import "./BookmarkContainer.css";
import { EditableBookmark } from "../bookmark/EditableBookmark";
import { Bookmark } from "../bookmark/Bookmark";
import { NewBookmarkButton } from "../new-bookmark-button/NewBookmarkButton";
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

export const BookmarkContainer: React.FC<Props> = ({
  parentId,
  bookmarks,
  setBookmarks,
  options = {
    disableEditing: false,
    disableMoveUp: false,
    includeNewBookmarkButton: true,
  },
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
      {bookmarks.map((bookmarkInfo) =>
        options.disableEditing ? (
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
        )
      )}
      {options.includeNewBookmarkButton && (
        <NewBookmarkButton
          parentId={parentId}
          handleCreateNewBookmark={handleCreateBookmark}
        />
      )}
    </div>
  );
};

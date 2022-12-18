import React from "react";
import "./BookmarkContainer.css";
import { EditableBookmark } from "../bookmark/EditableBookmark";
import { Bookmark } from "../bookmark/Bookmark";
import { NewBookmarkButton } from "../new-bookmark-button/NewBookmarkButton";
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

export const BookmarkContainer: React.FC<Props> = ({
  parentId,
  bookmarks,
  setBookmarks,
  options = {
    disableEditing: false,
    disableMoveUp: false,
    disableNewBookmarkButton: false,
  },
}) => {
  //Check if we are in the root folder of the program

  const { handleCreate, handleDelete, handleEdit, handleMoveUp } =
    useBookmarkActions({ bookmarks, setBookmarks });

  return (
    <div className="bookmark-container">
      {bookmarks.map((bookmarkInfo) => (
        <div key={bookmarkInfo.id}>
          options.disableEditing ? (
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
          )
        </div>
      ))}
      {!options.disableNewBookmarkButton && (
        <NewBookmarkButton
          parentId={parentId}
          handleCreateNewBookmark={handleCreate}
        />
      )}
    </div>
  );
};

import React from "react";
import { SortableItem } from "../../../utils/SortableDND";
import { generateItemId } from "../../../utils/SortableDND";
import { InteractableItem } from "../../../api/enums";
import { Bookmark } from "./Bookmark";
import { EditableBookmark } from "./EditableBookmark";

type SortableEditableBookmarkProps = {
  editable: true;
  bookmark: Bookmark;
  handleEdit: (bookmark: Bookmark) => void;
  handleDelete: (bookmark: Bookmark) => void;
  handleMoveUp?: (bookmark: Bookmark) => void;
};

type SortableBookmarkProps = {
  editable: false;
  bookmark: Bookmark;
  handleEdit?: (bookmark: Bookmark) => void;
  handleDelete?: (bookmark: Bookmark) => void;
  handleMoveUp?: (bookmark: Bookmark) => void;
};

export const SortableBookmark = ({
  editable,
  bookmark,
  handleEdit,
  handleDelete,
  handleMoveUp,
}: SortableEditableBookmarkProps | SortableBookmarkProps) => {
  return (
    <SortableItem
      item={{
        uniqueSortableId: generateItemId(
          bookmark.id,
          InteractableItem.Bookmark
        ),
        backendId: bookmark.id,
        type: InteractableItem.Bookmark,
        accepts: [InteractableItem.Bookmark],
      }}
    >
      {editable ? (
        <EditableBookmark
          bookmark={bookmark}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleMoveUpBookmark={handleMoveUp ? handleMoveUp : undefined}
        />
      ) : (
        <Bookmark bookmark={bookmark} />
      )}
    </SortableItem>
  );
};

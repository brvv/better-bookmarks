import React from "react";
import { generateItemId } from "../../../utils/SortableDND";
import { InteractableItem } from "../../../api/enums";
import { SortableItem } from "../../../utils/SortableDND";
import { EditableFolder } from "./EditableFolder";
import { Folder } from "./Folder";

type SortableEditableFolderProps = {
  editable: true;
  folder: Folder;
  handleEdit: (bookmark: Folder) => void;
  handleDelete: (bookmark: Folder) => void;
};

type SortableFolderProps = {
  editable: false;
  folder: Folder;
  handleEdit?: (bookmark: Folder) => void;
  handleDelete?: (bookmark: Folder) => void;
};

export const SortableFolder = ({
  editable,
  folder,
  handleEdit,
  handleDelete,
}: SortableEditableFolderProps | SortableFolderProps) => {
  return (
    <SortableItem
      item={{
        uniqueSortableId: generateItemId(folder.id, InteractableItem.Folder),
        backendId: folder.id,
        type: InteractableItem.Folder,
        accepts: [InteractableItem.Folder, InteractableItem.Bookmark],
      }}
    >
      {editable ? (
        <EditableFolder
          folder={folder}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <Folder folder={folder} />
      )}
    </SortableItem>
  );
};

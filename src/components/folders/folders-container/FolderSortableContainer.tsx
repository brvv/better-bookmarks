import React from "react";
import "./FolderContainer.css";
import { NewFolderButton } from "../new-folder-button/NewFolderButton";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { generateItemId } from "../../../utils/SortableDND";
import { InteractableItem } from "../../../api/enums";
import { useFolderActions } from "../../../hooks/Folders/useFolderActions";
import { SortableFolder } from "../folder/SortableFolder";

type Props = {
  parentId: string;
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  options?: ContainerOptions;
};

type ContainerOptions = {
  enableEditing?: boolean;
  enableNewFolderButton?: boolean;
};

export const FolderSortableContainer: React.FC<Props> = ({
  parentId,
  folders,
  setFolders,
  options = { enableEditing: true, enableNewFolderButton: true },
}) => {
  const { handleCreate, handleDelete, handleEdit } = useFolderActions({
    folders,
    setFolders,
  });

  return (
    <div>
      <SortableContext
        items={folders.map((folderInfo) =>
          generateItemId(folderInfo.id, InteractableItem.Folder)
        )}
        strategy={rectSortingStrategy}
      >
        <div className="card-container">
          {folders.map((folderInfo) => (
            <SortableFolder
              editable={!!options.enableEditing}
              folder={folderInfo}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              key={generateItemId(folderInfo.id, InteractableItem.Folder)}
            />
          ))}
          {options.enableNewFolderButton && (
            <NewFolderButton
              handleCreateNewFolder={handleCreate}
              parentId={parentId}
            />
          )}
        </div>
      </SortableContext>
    </div>
  );
};

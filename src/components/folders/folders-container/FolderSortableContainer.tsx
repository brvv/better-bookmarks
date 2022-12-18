import React from "react";
import "./FolderContainer.css";
import { EditableFolder } from "../folder/EditableFolder";
import { Folder } from "../folder/Folder";
import { NewFolderButton } from "../new-folder-button/NewFolderButton";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../../../utils/SortableDND";
import { generateItemId } from "../../../utils/SortableDND";
import { InteractableItem } from "../../../api/enums";
import { useFolderActions } from "../../../hooks/Folders/useFolderActions";

type Props = {
  parentId: string;
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  options?: ContainerOptions;
};

type ContainerOptions = {
  disableEditing?: boolean;
  disableNewFolderButton?: boolean;
};

export const FolderSortableContainer: React.FC<Props> = ({
  parentId,
  folders,
  setFolders,
  options = { disableEditing: false, includeNewFolderButton: true },
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
            <SortableItem
              item={{
                uniqueSortableId: generateItemId(
                  folderInfo.id,
                  InteractableItem.Folder
                ),
                backendId: folderInfo.id,
                type: InteractableItem.Folder,
                accepts: [InteractableItem.Folder, InteractableItem.Bookmark],
              }}
              key={generateItemId(folderInfo.id, InteractableItem.Folder)}
            >
              {options.disableEditing ? (
                <Folder folder={folderInfo} />
              ) : (
                <EditableFolder
                  folder={folderInfo}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </SortableItem>
          ))}
          {!options.disableNewFolderButton && (
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

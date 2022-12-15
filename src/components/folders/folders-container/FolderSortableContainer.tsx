import React from "react";
import "./FolderContainer.css";
import { EditableFolder } from "../folder/EditableFolder";
import { Folder } from "../folder/Folder";
import { NewFolderButton } from "../new-folder-button/NewFolderButton";
import { useFolders } from "./useFolders";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../../../utils/SortableDND";
import { generateItemId } from "../../../utils/SortableDND";
import { InteractableItem } from "../../../api/enums";

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
  const { handleCreateNewFolder, handleDeleteFolder, handleEditFolder } =
    useFolders({ parentId, folders, setFolders });

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
                  handleEdit={handleEditFolder}
                  handleDelete={handleDeleteFolder}
                />
              )}
            </SortableItem>
          ))}
          {!options.disableNewFolderButton && (
            <NewFolderButton handleCreateNewFolder={handleCreateNewFolder} />
          )}
        </div>
      </SortableContext>
    </div>
  );
};

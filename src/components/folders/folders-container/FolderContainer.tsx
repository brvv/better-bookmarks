import React from "react";
import "./FolderContainer.css";
import { EditableFolder } from "../folder/EditableFolder";
import { Folder } from "../folder/Folder";
import { NewFolderButton } from "../new-folder-button/NewFolderButton";
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

export const FolderContainer: React.FC<Props> = ({
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
      <div className="card-container">
        {folders.map((folderInfo) => (
          <div key={folderInfo.id}>
            {options.disableEditing ? (
              <Folder folder={folderInfo} />
            ) : (
              <EditableFolder
                folder={folderInfo}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        ))}
        {!options.disableNewFolderButton && (
          <NewFolderButton
            handleCreateNewFolder={handleCreate}
            parentId={parentId}
          />
        )}
      </div>
    </div>
  );
};

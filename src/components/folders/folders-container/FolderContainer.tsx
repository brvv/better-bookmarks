import React from "react";
import "./FolderContainer.css";
import { EditableFolder } from "../folder/EditableFolder";
import { Folder } from "../folder/Folder";
import { NewFolderButton } from "../new-folder-button/NewFolderButton";
import { useFolders } from "./useFolders";

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
  const {
    renderToolbar,
    handleCreateNewFolder,
    handleDeleteFolder,
    handleEditFolder,
  } = useFolders({ parentId, folders, setFolders });

  return (
    <div>
      <div className="toolbar-container">{renderToolbar}</div>

      <div className="card-container">
        {folders.map((folderInfo) => (
          <div key={folderInfo.id}>
            {options.disableEditing ? (
              <Folder folder={folderInfo} />
            ) : (
              <EditableFolder
                folder={folderInfo}
                handleEdit={handleEditFolder}
                handleDelete={handleDeleteFolder}
              />
            )}
          </div>
        ))}
        {!options.disableNewFolderButton && (
          <NewFolderButton handleCreateNewFolder={handleCreateNewFolder} />
        )}
      </div>
    </div>
  );
};

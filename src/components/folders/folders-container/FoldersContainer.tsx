import React, { useEffect, useState } from "react";
import "./FoldersContainer.css";
import { Folder } from "../folder/Folder";
import { ToolbarFolder } from "../toolbar-folder/ToolbarFolder";
import { NewFolderButton } from "../new-folder-button/NewFolderButton";
import {
  TOOLBAR_ID,
  createNewFolder,
  isFolderEmpty,
  removeFolder,
  updateFolder,
} from "../../../api";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

type Props = {
  parentId: string;
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  bookmarkOverFolderId?: string;
};

export const FoldersContainer: React.FC<Props> = ({
  parentId,
  folders,
  setFolders,
  bookmarkOverFolderId,
}) => {
  const [renderToolbar, setRenderToolbar] = useState(true);

  useEffect(() => {
    setRenderToolbar(() => {
      if (parentId === TOOLBAR_ID) {
        return false;
      } else {
        return true;
      }
    });
  }, [parentId]);

  const handleCreateNewFolder = async (title: string) => {
    const newFolder = await createNewFolder(title, parentId);
    setFolders([...folders, newFolder]);
  };

  const handleDeleteFolder = async (target: Folder) => {
    const isEmpty = await isFolderEmpty(target);
    if (isEmpty) {
      await removeFolder(target);
      const newFolders = [...folders];
      const folderIndex = newFolders.findIndex(
        (folder) => folder.id === target.id
      );
      newFolders.splice(folderIndex, 1);
      setFolders(newFolders);
    }
  };

  const handleEditFolder = async (newFolder: Folder) => {
    const updatedFolder = await updateFolder(newFolder);
    const folderIndex = folders.findIndex(
      (folder) => folder.id === newFolder.id
    );
    const newFolders = [...folders];
    newFolders[folderIndex] = updatedFolder;
    setFolders(newFolders);
  };

  return (
    <div>
      <div className="toolbar-container">
        {renderToolbar && (
          <SortableContext
            items={[TOOLBAR_ID + "droppable"]}
            strategy={undefined}
          >
            {
              <ToolbarFolder
                key={TOOLBAR_ID}
                name="toolbar"
                bookmarkOverFolder={
                  bookmarkOverFolderId &&
                  bookmarkOverFolderId === TOOLBAR_ID + "droppable"
                    ? true
                    : undefined
                }
              />
            }
          </SortableContext>
        )}
      </div>

      <div className="card-container">
        <SortableContext
          items={folders.map((folder) => folder.id)}
          strategy={rectSortingStrategy}
        >
          {folders.map((folder) => (
            <Folder
              key={folder.id}
              folder={folder}
              handleDelete={handleDeleteFolder}
              handleEdit={handleEditFolder}
              bookmarkOverFolder={
                bookmarkOverFolderId && bookmarkOverFolderId === folder.id
                  ? true
                  : undefined
              }
            />
          ))}
        </SortableContext>
        <NewFolderButton handleCreateNewFolder={handleCreateNewFolder} />
      </div>
    </div>
  );
};
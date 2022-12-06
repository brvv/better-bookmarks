import React, { useEffect, useState } from "react";
import {
  TOOLBAR_ID,
  createNewFolder,
  isFolderEmpty,
  removeFolder,
  updateFolder,
} from "../../../api";

type Props = {
  parentId: string;
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
};

export const useFolders = ({ parentId, folders, setFolders }: Props) => {
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

  return {
    renderToolbar,
    handleCreateNewFolder,
    handleDeleteFolder,
    handleEditFolder,
  };
};

import React from "react";
import {
  createFolder,
  isFolderEmpty,
  removeFolder,
  updateFolder,
} from "../../api/Bookmarks";

type Props = {
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
};

export const useFolderActions = ({ folders, setFolders }: Props) => {
  const handleCreate = async (folder: NewFolder) => {
    const newFolder = await createFolder(folder);
    setFolders([...folders, newFolder]);
  };

  const handleDelete = async (target: Folder) => {
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

  const handleEdit = async (newFolder: Folder) => {
    const updatedFolder = await updateFolder(newFolder);
    const folderIndex = folders.findIndex(
      (folder) => folder.id === newFolder.id
    );
    const newFolders = [...folders];
    newFolders[folderIndex] = updatedFolder;
    setFolders(newFolders);
  };

  return {
    handleCreate,
    handleDelete,
    handleEdit,
  };
};

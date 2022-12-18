import { useFetchFolders } from "./useFetchFolders";
import { useFolderActions } from "./useFolderActions";

type Props = {
  folderId: string | null;
};

export const useFolders = ({ folderId }: Props) => {
  const { folders, setFolders, finishedLoading } = useFetchFolders({
    rootId: folderId,
  });
  const { handleCreate, handleDelete, handleEdit } = useFolderActions({
    folders,
    setFolders,
  });

  return {
    folders,
    setFolders,
    finishedLoading,
    handleCreate,
    handleDelete,
    handleEdit,
  };
};

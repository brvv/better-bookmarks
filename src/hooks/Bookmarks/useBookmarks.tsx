import { useFetchBookmarks } from "./useFetchBookmarks";
import { useBookmarkActions } from "./useBookmarkActions";

type Props = {
  folderId: string | null;
};

export const useBookmarks = ({ folderId }: Props) => {
  const { bookmarks, setBookmarks, finishedLoading } = useFetchBookmarks({
    rootId: folderId,
  });
  const { handleCreate, handleDelete, handleEdit, handleMoveUp } =
    useBookmarkActions({ bookmarks, setBookmarks });

  return {
    bookmarks,
    setBookmarks,
    finishedLoading,
    handleCreate,
    handleDelete,
    handleEdit,
    handleMoveUp,
  };
};

import { useState, useEffect } from "react";
import { getChildFolderNodes } from "../../api/Bookmarks";

type Props = {
  rootId: string | null;
};
export const useFetchFolders = ({ rootId }: Props) => {
  //Folders
  const [folders, setFolders] = useState<Folder[]>([]);
  const [finishedLoading, setFinishedLoading] = useState(false);

  useEffect(() => {
    if (rootId === null) {
      setFinishedLoading(true);
      return;
    }
    getChildFolderNodes(rootId)
      .then((newFolders) => {
        setFolders(newFolders);
        setFinishedLoading(true);
      })
      .catch(() => {
        setFinishedLoading(false);
      });
  }, [rootId]);

  return { folders, setFolders, finishedLoading };
};

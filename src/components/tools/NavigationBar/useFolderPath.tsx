import { useState, useEffect } from "react";
import { getFolderPath } from "../../../api/Bookmarks";

export const useFolderPath = (parentId: string) => {
  const [folderPath, setFolderPath] = useState<{ title: string; id: string }[]>(
    []
  );

  useEffect(() => {
    getFolderPath(parentId).then((path) => {
      if (path) {
        setFolderPath(path);
      }
    });
  }, [parentId]);

  return { folderPath };
};

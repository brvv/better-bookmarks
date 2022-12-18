import { useState, useEffect } from "react";
import { getFolderPath } from "../../../api/Bookmarks";

export const useFolderPath = (parentId: string) => {
  const [folderPath, setFolderPath] = useState([{ title: "root", id: "" }]);

  useEffect(() => {
    getFolderPath(parentId).then((path) => {
      if (
        !(path.length === 1 && path[0].title === "root" && path[0].id === "")
      ) {
        setFolderPath([...[{ title: "root", id: "" }], ...path]);
      } else {
        setFolderPath([{ title: "root", id: "" }]);
      }
    });
  }, [parentId]);

  return { folderPath };
};

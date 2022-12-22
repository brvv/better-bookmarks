import { useState, useEffect } from "react";
import { searchFolders } from "../../api/Bookmarks";

type Props = {
  query: string;
};

export const useSearchFolders = ({ query }: Props) => {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    searchFolders(query)
      .then((res) => {
        setFolders(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  return { folders };
};

import { useState, useEffect } from "react";
import { searchFolders } from "../../api/Bookmarks";
import { useDebounce } from "../useDebounce";

type Props = {
  query: string;
};

export const useSearchFolders = ({ query }: Props) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    searchFolders(debouncedQuery).then((res) => {
      setFolders(res);
    });
  }, [query]);

  return { folders };
};

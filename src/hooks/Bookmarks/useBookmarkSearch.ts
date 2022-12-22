import { useState, useEffect } from "react";
import { searchBookmarks } from "../../api/Bookmarks";
import { useDebounce } from "../useDebounce";

type Props = {
  query: string;
};

export const useSearchBookmarks = ({ query }: Props) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    searchBookmarks(debouncedQuery).then((res) => {
      setBookmarks(res);
    });
  }, [query]);

  return { bookmarks };
};

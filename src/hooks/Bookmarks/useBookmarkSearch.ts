import { useState, useEffect } from "react";
import { searchBookmarks } from "../../api/Bookmarks";

type Props = {
  query: string;
};

export const useSearchBookmarks = ({ query }: Props) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    searchBookmarks(query)
      .then((res) => {
        setBookmarks(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  return { bookmarks };
};

import { useState, useEffect } from "react";
import { getChildBookmarkNodes } from "../../api/Bookmarks";

type Props = {
  rootId: string | null;
};

export const useFetchBookmarks = ({ rootId }: Props) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [finishedLoading, setFinishedLoading] = useState(false);

  useEffect(() => {
    if (rootId === null) {
      setFinishedLoading(true);
      return;
    }
    getChildBookmarkNodes(rootId)
      .then((newBookmarks) => {
        setBookmarks(newBookmarks);
        setFinishedLoading(true);
      })
      .catch(() => {
        setFinishedLoading(false);
      });
  }, [rootId]);

  return { bookmarks, setBookmarks, finishedLoading };
};

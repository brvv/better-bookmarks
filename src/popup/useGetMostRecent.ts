import { useEffect, useState } from "react";
import { getMostRecent } from "../api/Bookmarks";

type Props = {
  count: number;
};

export const useMostRecent = ({ count }: Props) => {
  const [mostRecent, setMostRecent] = useState<{
    bookmarks: Bookmark[];
  }>({ bookmarks: [] });

  useEffect(() => {
    if (count) {
      getMostRecent(count).then((res) => {
        console.log(res);
        setMostRecent(res);
      });
    }
  }, [count]);
  return mostRecent;
};

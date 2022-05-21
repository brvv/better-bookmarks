import React, { useEffect, useState } from "react";
import { BookmarkContainer, CardContainer } from "../components";
import { getRootId } from "../api";

type Props = {
  parentId?: string;
};

export const MainPage: React.FC<Props> = ({ parentId = "" }) => {
  const [rootId, setRootId] = useState("");

  useEffect(() => {
    if (parentId) {
      setRootId(parentId);
    } else {
      getRootId().then((id) => {
        setRootId(id);
      });
    }
  }, [parentId]);

  return (
    <div className="App">
      {rootId ? <BookmarkContainer parentId={rootId} /> : <p>Loading!</p>}
      {rootId ? <CardContainer parentId={rootId} /> : <p>Loading!</p>}
    </div>
  );
};

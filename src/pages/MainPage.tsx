import React, { useEffect, useState } from "react";
import { BookmarkContainer, CardContainer } from "../components";
import { getRootId } from "../api";
import { useParams } from "react-router-dom";

export const MainPage: React.FC = () => {
  const params = useParams();
  const [rootId, setRootId] = useState("");

  useEffect(() => {
    if (params.folderId) {
      setRootId(params.folderId);
    } else {
      getRootId().then((id) => {
        setRootId(id);
      });
    }
  }, [params]);

  return (
    <div className="App">
      {rootId ? <BookmarkContainer parentId={rootId} /> : <p>Loading!</p>}
      {rootId ? <CardContainer parentId={rootId} /> : <p>Loading!</p>}
    </div>
  );
};

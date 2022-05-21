import React, { useEffect, useState } from "react";
import { BookmarkContainer, CardContainer } from "../components";
import { getRootId } from "../api";
import { useParams } from "react-router-dom";

type Props = {
  parentId?: string;
};

export const MainPage: React.FC<Props> = ({ parentId = "" }) => {
  const params = useParams();
  const [rootId, setRootId] = useState("");

  useEffect(() => {
    console.log("Params are:");
    console.log(params);
    if (parentId) {
      setRootId(parentId);
    } else if (params.folderId) {
      setRootId(params.folderId);
    } else {
      getRootId().then((id) => {
        setRootId(id);
      });
    }
  }, [parentId, params]);

  return (
    <div className="App">
      {rootId ? <BookmarkContainer parentId={rootId} /> : <p>Loading!</p>}
      {rootId ? <CardContainer parentId={rootId} /> : <p>Loading!</p>}
    </div>
  );
};

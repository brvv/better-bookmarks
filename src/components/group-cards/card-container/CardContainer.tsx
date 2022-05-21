import React from "react";
import { useState, useEffect } from "react";
import "./CardContainer.css";
import { GroupCard } from "../group-card/GroupCard";
import { ToolbarCard } from "../toolbar-card/ToolbarCard";
import { getFoldersFromParent, TOOLBAR_ID } from "../../../api";

type Props = {
  parentId: string;
};

export const CardContainer: React.FC<Props> = ({ parentId }) => {
  const [folders, setFolders] = useState<BookmarkFolder[]>([]);
  const [foldersFinishedLoading, setFoldersFinishedLoading] = useState(false);

  //Folders
  useEffect(() => {
    getFoldersFromParent(parentId).then((folders) => {
      setFolders(folders);
      setFoldersFinishedLoading(true);
      console.log(folders);
    });
  }, [parentId]);

  return (
    <div className="card-container">
      {parentId !== TOOLBAR_ID && <ToolbarCard name="toolbar" />}

      {foldersFinishedLoading ? (
        folders.map((folder) => (
          <GroupCard name={folder.title} id={folder.id} />
        ))
      ) : (
        <p>Loading!</p>
      )}
    </div>
  );
};

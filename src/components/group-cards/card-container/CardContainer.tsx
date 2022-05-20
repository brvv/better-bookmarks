import React from "react";
import { useState, useEffect } from "react";
import "./CardContainer.css";
import { GroupCard } from "../group-card/GroupCard";
import { ToolbarCard } from "../toolbar-card/ToolbarCard";
import { getFoldersFromParent } from "../../../api";

export const CardContainer: React.FC = () => {
  const [folders, setFolders] = useState<BookmarkFolder[]>([]);
  const [finishedLoading, setFinishedLoading] = useState(false);

  useEffect(() => {
    getFoldersFromParent("HhBOW9coNYRD").then((folders) => {
      setFolders(folders);
      setFinishedLoading(true);
      console.log(folders);
    });
  }, []);
  return (
    <div className="card-container">
      <ToolbarCard name="toolbar" />

      {finishedLoading ? (
        folders.map((folder) => <GroupCard name={folder.title} />)
      ) : (
        <p>Loading!</p>
      )}
    </div>
  );
};

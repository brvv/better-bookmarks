import React from "react";
import { Folder } from "../components";

type Props = {
  folders: Folder[];
};

export const PopupFolderContainer: React.FC<Props> = ({ folders }) => {
  return (
    <div className="popup-folder-container">
      {folders.map((folderInfo) => (
        <Folder key={folderInfo.id} folder={folderInfo} />
      ))}
    </div>
  );
};

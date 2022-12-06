import React, { Dispatch, SetStateAction } from "react";
import "../Folder.css";

type Props = {
  folder: Folder;
  setTitle: Dispatch<SetStateAction<string>>;
};

export const FolderEditor: React.FC<Props> = ({ folder, setTitle }) => {
  return (
    <div className="group-card">
      <div className="info-container">
        <input
          className="input-title"
          value={folder.title}
          style={{ textAlign: "center" }}
          onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
        ></input>
      </div>
    </div>
  );
};

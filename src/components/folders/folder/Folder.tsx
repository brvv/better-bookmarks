import React from "react";
import "./Folder.css";

type Props = {
  folder: Folder;
};

export const Folder: React.FC<Props> = ({ folder }) => {
  // dnd-kit bugs when Link is used in place of a button, so have to use a button for now
  return (
    <button
      className="group-card"
      onClick={() => {
        window.open("#/folder/" + folder.id, "_self");
      }}
    >
      {folder.title}
    </button>
  );
};

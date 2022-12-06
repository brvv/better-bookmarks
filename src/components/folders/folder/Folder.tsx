import React from "react";
//import { Link } from "react-router-dom";
import "./Folder.css";

type Props = {
  folder: Folder;
};

export const Folder: React.FC<Props> = ({ folder }) => {
  // dnd-kit bugs when Link is used in place of a button, so I use a button for now
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

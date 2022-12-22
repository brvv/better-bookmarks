import React from "react";
import "./Folder.css";

type Props = {
  folder: Folder;
  target?: string;
  urlBase?: string;
};

export const Folder: React.FC<Props> = ({
  folder,
  target = "_self",
  urlBase = "",
}) => {
  // dnd-kit bugs when Link is used in place of a button, so have to use a button for now
  return (
    <button
      className="group-card"
      onClick={() => {
        window.open(urlBase + "#/folder/" + folder.id, target);
      }}
    >
      {folder.title}
    </button>
  );
};

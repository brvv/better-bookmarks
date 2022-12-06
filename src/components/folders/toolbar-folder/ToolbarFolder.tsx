import React from "react";
import "./ToolbarFolder.css";
import { TOOLBAR_ID } from "../../../api";

type Props = {
  name?: string;
};

export const ToolbarFolder: React.FC<Props> = ({ name }: Props) => {
  const id = TOOLBAR_ID;

  return (
    <button
      className="toolbar-card"
      onClick={() => {
        window.open("#/folder/" + id, "_self");
      }}
    >
      {name}
    </button>
  );
};

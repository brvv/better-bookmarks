import React from "react";
import "./ToolbarFolder.css";

type Props = {
  id: string;
  name?: string;
};

export const ToolbarFolder: React.FC<Props> = ({ id, name }: Props) => {
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

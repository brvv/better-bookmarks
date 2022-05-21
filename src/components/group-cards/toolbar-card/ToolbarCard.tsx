import React from "react";
import "./ToolbarCard.css";
import { Link } from "react-router-dom";
import { TOOLBAR_ID } from "../../../api";

type Props = {
  name?: string;
};

export const ToolbarCard: React.FC<Props> = ({ name }: Props) => {
  const id = TOOLBAR_ID;

  return (
    <Link to={"/folder/" + id} className="toolbar-card">
      {name}
    </Link>
  );
};

import React from "react";
import "./ToolbarCard.css";

type Props = {
  name?: string;
};

export const ToolbarCard: React.FC<Props> = ({ name }: Props) => {
  return <div className="toolbar-card">{name}</div>;
};

import React from "react";
import "./CardContainer.css";
import { GroupCard } from "../group-card/GroupCard";
import { ToolbarCard } from "../toolbar-card/ToolbarCard";

export const CardContainer: React.FC = () => {
  return (
    <div className="card-container">
      <ToolbarCard name="toolbar" />
      <GroupCard name="1" />
      <GroupCard name="asdfasdf" />
      <GroupCard name="hello?" />
      <GroupCard name="4" />
      <GroupCard name="why bother" />
    </div>
  );
};

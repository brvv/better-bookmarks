import React from "react";
import "./GroupCard.css";

type Props = {
  name?: string;
};

export const GroupCard: React.FC<Props> = ({ name }: Props) => {
  return <div className="group-card">{name}</div>;
};

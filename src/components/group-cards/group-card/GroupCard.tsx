import React from "react";
import { Link } from "react-router-dom";
import "./GroupCard.css";

type Props = {
  name?: string;
  id?: string;
};

export const GroupCard: React.FC<Props> = ({ name, id = "" }: Props) => {
  return (
    <Link to={"/folder/" + id} className="group-card">
      {name}
    </Link>
  );
};

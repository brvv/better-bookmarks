import React from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  id: string;
};

export const NavBarFolder: React.FC<Props> = ({ title, id }) => {
  const folderTitle = () => (title === "Bookmarks Toolbar" ? "toolbar" : title);
  const folderPath = () => (id ? "/folder/" : "/") + id;

  return (
    <Link to={folderPath()} className="navigation-item">
      <div>{folderTitle()}</div>
    </Link>
  );
};

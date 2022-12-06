import React from "react";
import { useFolderPath } from "./useFolderPath";
import "./NavBar.css";
import { NavBarFolder } from "./NavBarFolder";

type Props = {
  parentId: string;
};

export const NavBar: React.FC<Props> = ({ parentId }) => {
  const { folderPath } = useFolderPath(parentId);

  return (
    <div className="navigation-container">
      {folderPath.map((path) => (
        <div key={path.id}>
          <NavBarFolder title={path.title} id={path.id} />
        </div>
      ))}
    </div>
  );
};

import React from "react";
import { useFolderPath } from "./useFolderPath";
import "./NavBar.css";
import { NavBarFolder } from "./NavBarFolder";
import { Separator } from "./Separator";

type Props = {
  parentId: string;
};

export const NavBar: React.FC<Props> = ({ parentId }) => {
  const { folderPath } = useFolderPath(parentId);

  return (
    <div className="navigation-container">
      {folderPath.map((path) => (
        <div key={path.id} className="navigation-subcontainer">
          <NavBarFolder title={path.title} id={path.id} />
          <Separator />
        </div>
      ))}
    </div>
  );
};

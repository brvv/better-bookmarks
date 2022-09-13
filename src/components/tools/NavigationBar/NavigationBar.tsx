import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFolderPath } from "../../../api";
import "./NavigationBar.css";

type Props = {
  parentId: string;
};

export const NavigationBar: React.FC<Props> = ({ parentId }) => {
  const [currentPath, setCurrentPath] = useState([{ title: "root", id: "" }]);

  useEffect(() => {
    getFolderPath(parentId).then((path) => {
      if (
        !(path.length === 1 && path[0].title === "root" && path[0].id === "")
      ) {
        setCurrentPath([...[{ title: "root", id: "" }], ...path]);
      } else {
        setCurrentPath([{ title: "root", id: "" }]);
      }
    });
  }, [parentId]);

  return (
    <div className="navigation-container">
      {currentPath.map((path) => (
        <div className="navigation-subcontainer">
          <Link
            to={(path.id ? "/folder/" : "/") + path.id}
            className="navigation-item"
          >
            <div>
              {path.title === "Bookmarks Toolbar" ? "toolbar" : path.title}
            </div>
          </Link>
          <div className="navigation-separator">/</div>
        </div>
      ))}
    </div>
  );
};

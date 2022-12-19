import React from "react";
import { useFolderPath } from "./useFolderPath";
import "./NavBar.css";
import { DroppableNavBarFolder } from "./DroppableNavBarFolder";
import { SortableContext } from "@dnd-kit/sortable";
import { generateItemId } from "../../../utils/SortableDND";
import { InteractableItem } from "../../../api/enums";
import { Separator } from "./Separator";

type Props = {
  parentId: string;
};

export const DroppableNavBar: React.FC<Props> = ({ parentId }) => {
  const { folderPath } = useFolderPath(parentId);

  return (
    <SortableContext
      items={folderPath.map((pathItem) =>
        generateItemId(pathItem.id, InteractableItem.NavigationBarItem)
      )}
      strategy={undefined}
    >
      <div className="navigation-container">
        {folderPath.map((path) => (
          <div key={path.id} className="navigation-subcontainer">
            <DroppableNavBarFolder title={path.title} id={path.id} />
            <Separator />
          </div>
        ))}
      </div>
    </SortableContext>
  );
};

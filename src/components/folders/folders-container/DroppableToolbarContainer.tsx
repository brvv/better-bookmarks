import React from "react";
import "./FolderContainer.css";
import { SortableContext } from "@dnd-kit/sortable";
import { generateItemId } from "../../../utils/SortableDND";
import { InteractableItem } from "../../../api/enums";
import { DroppableToolbar } from "../toolbar-folder/DroppableToolbar";

type Props = {
  toolbarId: string;
  name?: string;
};

export const DroppableToolbarContainer: React.FC<Props> = ({
  toolbarId,
  name,
}) => {
  return (
    <SortableContext
      items={[generateItemId(toolbarId, InteractableItem.Toolbar)]}
      strategy={undefined}
    >
      <div className="toolbar-container">
        <DroppableToolbar id={toolbarId} name={name} />
      </div>
    </SortableContext>
  );
};

import React from "react";
import "./FolderContainer.css";
import { ToolbarFolder } from "../toolbar-folder/ToolbarFolder";
import { SortableContext } from "@dnd-kit/sortable";
import { generateItemId, SortableItem } from "../../../utils/SortableDND";
import { InteractableItem } from "../../../api/enums";

type Props = {
  toolbarId: string;
  name?: string;
};

export const DroppableToolbarContainer: React.FC<Props> = ({
  toolbarId,
  name,
}) => {
  return (
    <div>
      <SortableContext
        items={[generateItemId(toolbarId, InteractableItem.Toolbar)]}
        strategy={undefined}
      >
        <div className="toolbar-container">
          <SortableItem
            item={{
              uniqueSortableId: generateItemId(
                toolbarId,
                InteractableItem.Toolbar
              ),
              backendId: toolbarId,
              type: InteractableItem.Toolbar,
              accepts: [InteractableItem.Bookmark],
            }}
            key={generateItemId(toolbarId, InteractableItem.Toolbar)}
          >
            <ToolbarFolder id={toolbarId} name={name} />
          </SortableItem>
        </div>
      </SortableContext>
    </div>
  );
};

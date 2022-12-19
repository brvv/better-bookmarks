import React from "react";
import { ToolbarFolder } from "../toolbar-folder/ToolbarFolder";
import { generateItemId, SortableItem } from "../../../utils/SortableDND";
import { InteractableItem } from "../../../api/enums";

type Props = {
  id: string;
  name?: string;
};

export const DroppableToolbar: React.FC<Props> = ({ id, name }) => {
  return (
    <SortableItem
      item={{
        uniqueSortableId: generateItemId(id, InteractableItem.Toolbar),
        backendId: id,
        type: InteractableItem.Toolbar,
        accepts: [InteractableItem.Bookmark],
      }}
      key={generateItemId(id, InteractableItem.Toolbar)}
      disableDragging={true}
    >
      <ToolbarFolder id={id} name={name} />
    </SortableItem>
  );
};

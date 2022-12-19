import React from "react";
import { generateItemId, SortableItem } from "../../../utils/SortableDND";
import { NavBarFolder } from "./NavBarFolder";
import { InteractableItem } from "../../../api/enums";

type Props = {
  title: string;
  id: string;
};

export const DroppableNavBarFolder: React.FC<Props> = ({ title, id }) => {
  return (
    <SortableItem
      item={{
        uniqueSortableId: generateItemId(
          id,
          InteractableItem.NavigationBarItem
        ),
        backendId: id,
        type: InteractableItem.NavigationBarItem,
        accepts: [InteractableItem.Bookmark],
      }}
      key={generateItemId(id, InteractableItem.NavigationBarItem)}
      disableDragging={true}
    >
      <NavBarFolder title={title} id={id} />
    </SortableItem>
  );
};

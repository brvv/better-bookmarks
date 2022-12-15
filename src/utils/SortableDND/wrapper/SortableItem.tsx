import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { useStyle } from "./useStyle";
import { SortableItemData } from "../types";

type Props = {
  item: SortableItemData;
  children: React.ReactNode;
};

export const SortableItem: React.FC<Props> = ({ item, children }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: item.uniqueSortableId,
    data: { type: item.type, accepts: item.accepts, backendId: item.backendId },
  });

  const { mainStyle, scaleDownStyle } = useStyle(item, {
    transition,
    transform,
    isDragging,
  });

  return (
    <div
      className="bookmark-parent"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={mainStyle}
    >
      <div style={scaleDownStyle}>{children}</div>
    </div>
  );
};

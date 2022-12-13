import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { useStyle } from "./useStyle";
import { ItemInfo } from "../types";

type Props = {
  item: ItemInfo;
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
    data: { type: item.type, accepts: item.accepts },
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

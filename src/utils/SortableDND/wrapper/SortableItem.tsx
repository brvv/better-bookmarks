import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";

import { useDraggedOverItem, useMouseOffset } from "../context/DragDropContext";
import { GeneratedId } from "../utils";

type Props = {
  item: ItemInfo;
  children: React.ReactNode;
};

type ItemInfo = {
  uniqueSortableId: GeneratedId;
  type: InteractableItem;
  accepts: InteractableItem[];
};

type TransformInfo = {
  transition: string | undefined;
  transform: Transform | null;
  isDragging: boolean;
};

const useStyle = (
  item: ItemInfo,
  { transform, transition, isDragging }: TransformInfo
) => {
  const draggedOverItem = useDraggedOverItem();
  const mouseOffset = useMouseOffset();

  const BookmarkMoveStyle = {
    transition,
    transform:
      isDragging && mouseOffset
        ? CSS.Transform.toString({
            x: mouseOffset.x,
            y: mouseOffset.y,
            scaleX: 1,
            scaleY: 1,
          })
        : CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const FolderMoveStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    backgroundColor:
      draggedOverItem && draggedOverItem.id === item.uniqueSortableId
        ? "rgba(128, 128, 128, 0.162)"
        : "transparent",
  };

  const BookmarkScaleDownStyle = {
    transition: "transform 200ms ease-in-out",
    transform: CSS.Transform.toString({
      x: 0,
      y: 0,
      scaleX: isDragging && draggedOverItem ? 0.8 : 1,
      scaleY: isDragging && draggedOverItem ? 0.8 : 1,
    }),
  };

  const FolderScaleDownStyle = {};

  return {
    mainStyle: item.type === "Bookmark" ? BookmarkMoveStyle : FolderMoveStyle,
    scaleDownStyle:
      item.type === "Bookmark" ? BookmarkScaleDownStyle : FolderScaleDownStyle,
  };
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

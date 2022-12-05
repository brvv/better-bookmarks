import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  bookmark: Bookmark;
  dragTransform?: { x: number; y: number };
  isBookmarkOverFolder?: boolean;
  children: React.ReactNode;
};

export const SortableBookmark: React.FC<Props> = ({
  bookmark,
  dragTransform,
  isBookmarkOverFolder,
  children,
}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: bookmark.id });

  const style = {
    transition,
    transform:
      isDragging && dragTransform
        ? CSS.Transform.toString({
            x: dragTransform.x,
            y: dragTransform.y,
            scaleX: 1,
            scaleY: 1,
          })
        : CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const scaleDownStyle = {
    transition: "transform 200ms ease-in-out",
    transform: CSS.Transform.toString({
      x: 0,
      y: 0,
      scaleX: isBookmarkOverFolder && isDragging ? 0.8 : 1,
      scaleY: isBookmarkOverFolder && isDragging ? 0.8 : 1,
    }),
  };

  return (
    <div
      className="bookmark-parent"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div style={scaleDownStyle}>{children}</div>
    </div>
  );
};

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  useBookmarkOverFolder,
  useMouseOffset,
} from "../../../../contexts/dnd-context";

type Props = {
  bookmark: Bookmark;
  children: React.ReactNode;
};

export const SortableBookmark: React.FC<Props> = ({ bookmark, children }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: bookmark.id });

  const bookmarkOverFolder = useBookmarkOverFolder();
  const mouseOffset = useMouseOffset();

  const style = {
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

  const scaleDownStyle = {
    transition: "transform 200ms ease-in-out",
    transform: CSS.Transform.toString({
      x: 0,
      y: 0,
      scaleX:
        isDragging &&
        bookmarkOverFolder &&
        bookmarkOverFolder.isBookmarkOverFolder
          ? 0.8
          : 1,
      scaleY:
        isDragging &&
        bookmarkOverFolder &&
        bookmarkOverFolder.isBookmarkOverFolder
          ? 0.8
          : 1,
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

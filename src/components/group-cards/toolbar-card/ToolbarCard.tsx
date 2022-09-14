import React, { useEffect } from "react";
import "./ToolbarCard.css";
import { TOOLBAR_ID } from "../../../api";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  name?: string;
  bookmarkOverFolder?: boolean;
};

export const ToolbarCard: React.FC<Props> = ({
  name,
  bookmarkOverFolder,
}: Props) => {
  const id = TOOLBAR_ID;

  useEffect(() => {
    console.log(bookmarkOverFolder);
  }, [bookmarkOverFolder]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: TOOLBAR_ID + "droppable" });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: bookmarkOverFolder
      ? "rgba(128, 128, 128, 0.162)"
      : "transparent",
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <button
        className="toolbar-card"
        onClick={() => {
          window.open("#/folder/" + id, "_self");
        }}
      >
        {name}
      </button>
    </div>
  );
};

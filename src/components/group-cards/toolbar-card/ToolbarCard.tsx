import React from "react";
import "./ToolbarCard.css";
import { TOOLBAR_ID } from "../../../api";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  name?: string;
};

export const ToolbarCard: React.FC<Props> = ({ name }: Props) => {
  const id = TOOLBAR_ID;

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

import React from "react";
//import { Link } from "react-router-dom";
import "./GroupCard.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  folder : BookmarkFolder;
};

export const GroupCard: React.FC<Props> = ({folder}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
    } = useSortable({ id: folder.id })


    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
      opacity: isDragging ? 0.5 : 1,
    }

  // dnd-kit bugs when Link is used in place of a button, so I use a button for now
  return (
    <div  ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <button className="group-card" onClick={() => {window.open("#/folder/" + folder.id, "_self")}}>
        {folder.title + " " + folder.id}
      </button>

    </div>
  );
};

import React from "react";
//import { Link } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBookmarkOverFolder } from "../../../../contexts/dnd-context";

type Props = {
  folder: Folder;
  children: React.ReactNode;
};

export const SortableFolder: React.FC<Props> = ({ folder, children }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: folder.id });

  const bookmarkOverFolder = useBookmarkOverFolder();

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    backgroundColor:
      bookmarkOverFolder &&
      bookmarkOverFolder.isBookmarkOverFolder &&
      bookmarkOverFolder.overFolderId === folder.id
        ? "rgba(128, 128, 128, 0.162)"
        : "transparent",
  };

  // dnd-kit bugs when Link is used in place of a button, so I use a button for now
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {children}
    </div>
  );
};

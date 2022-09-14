import React, { useState, useEffect, useRef } from "react";
//import { Link } from "react-router-dom";
import "./GroupCard.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CollapsableOptionsMenu } from "../../tools/CollapsableOptionsMenu/CollapsableOptionsMenu";
import { isFolderEmpty } from "../../../api";

type Props = {
  folder: BookmarkFolder;
  handleEdit: (bookmark: BookmarkFolder) => void;
  handleDelete: (bookmark: BookmarkFolder) => void;
  bookmarkOverFolder?: boolean;
};

export const GroupCard: React.FC<Props> = ({
  folder,
  handleDelete,
  handleEdit,
  bookmarkOverFolder,
}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: folder.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: bookmarkOverFolder
      ? "rgba(128, 128, 128, 0.162)"
      : "transparent",
  };

  const [isEditingActive, setIsEditingActive] = useState(false);
  const folderContainerRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(folder.title);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    isFolderEmpty(folder).then((res) => {
      setIsEmpty(res);
    });
  }, []);

  useEffect(() => {
    if (!isEditingActive) {
      const newFolder: Bookmark = { ...folder, title: title };

      if (newFolder.title) {
        handleEdit(newFolder);
      }
    }
  }, [isEditingActive]);

  const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
    if (event instanceof KeyboardEvent) {
      if (event.key === "Enter") {
        setIsEditingActive(false);
      }
      return;
    }

    if (
      folderContainerRef &&
      folderContainerRef.current &&
      !folderContainerRef.current.contains(event.target as Node)
    ) {
      setIsEditingActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keypress", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keypress", handleClickOutside);
    };
  }, []);

  const handleToggleEditor = async () => {
    setIsEditingActive(!isEditingActive);
  };

  // dnd-kit bugs when Link is used in place of a button, so I use a button for now
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div ref={folderContainerRef} className="group-card-container">
        {isEditingActive ? (
          <div className="group-card">
            <div className="info-container">
              <input
                className="input-title"
                value={title}
                style={{ textAlign: "center" }}
                onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
              ></input>
            </div>
          </div>
        ) : (
          <button
            className="group-card"
            onClick={() => {
              window.open("#/folder/" + folder.id, "_self");
            }}
          >
            {title}
          </button>
        )}

        <CollapsableOptionsMenu
          bookmark={folder}
          handleToggleEditor={handleToggleEditor}
          handleDelete={isEmpty ? handleDelete : undefined}
        />
      </div>
    </div>
  );
};

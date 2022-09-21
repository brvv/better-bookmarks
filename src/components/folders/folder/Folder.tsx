import React, { useState, useEffect, useRef } from "react";
//import { Link } from "react-router-dom";
import "./Folder.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CollapsableOptionsMenu } from "../../tools/CollapsableOptionsMenu/CollapsableOptionsMenu";
import { isFolderEmpty } from "../../../api";
import { useClickOutsideToggler } from "../../../hooks";

type Props = {
  folder: Folder;
  handleEdit: (bookmark: Folder) => void;
  handleDelete: (bookmark: Folder) => void;
  bookmarkOverFolder?: boolean;
};

export const Folder: React.FC<Props> = ({
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

  const clickOutsideTrigger = useClickOutsideToggler(folderContainerRef);

  useEffect(() => {
    isFolderEmpty(folder).then((res) => {
      setIsEmpty(res);
    });
  }, []);

  useEffect(() => {
    setIsEditingActive(false);
  }, [clickOutsideTrigger]);

  useEffect(() => {
    if (!isEditingActive) {
      const newFolder: Bookmark = { ...folder, title: title };

      if (newFolder.title) {
        handleEdit(newFolder);
      }
    }
  }, [isEditingActive]);

  const handleToggleEditor = async () => {
    setIsEditingActive((current) => !current);
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

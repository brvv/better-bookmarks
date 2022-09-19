import React, { useState, useRef, useEffect } from "react";
import "./NewFolderButton.css";
import { useClickOutsideToggler } from "../../../hooks";

type Props = {
  handleCreateNewFolder: (folderTitle: string) => void;
};

export const NewFolderButton: React.FC<Props> = ({ handleCreateNewFolder }) => {
  const defaultTitleValue = "";

  const [title, setTitle] = useState("");
  const [isEditingActive, setIsEditingActive] = useState(false);
  const newButtonContainerRef = useRef<HTMLDivElement>(null);
  const clickOutsideTrigger = useClickOutsideToggler(newButtonContainerRef);

  useEffect(() => {
    setIsEditingActive(false);
  }, [clickOutsideTrigger]);

  useEffect(() => {
    if (!isEditingActive) {
      if (title && handleCreateNewFolder) {
        handleCreateNewFolder(title);
        setTitle(defaultTitleValue);
      }
    }
  }, [isEditingActive]);

  const enableEditor = async () => {
    setIsEditingActive(() => true);
  };

  // dnd-kit bugs when Link is used in place of a button, so I use a button for now
  return (
    <div className="" onClick={enableEditor} ref={newButtonContainerRef}>
      {isEditingActive ? (
        <div className="group-card">
          <div className="info-container">
            <input
              className="input-title input-title-new-folder"
              value={title}
              onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
            ></input>
          </div>
        </div>
      ) : (
        <div className="new-folder-button">+ New Folder</div>
      )}
    </div>
  );
};

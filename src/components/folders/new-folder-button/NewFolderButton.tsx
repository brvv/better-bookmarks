import React, { useState, useRef, useEffect } from "react";
import "./NewFolderButton.css";
import { useClickOutsideToggler } from "../../../hooks";

type Props = {
  parentId: string;
  handleCreateNewFolder: (folderTitle: NewFolder) => void;
};

export const NewFolderButton: React.FC<Props> = ({
  parentId,
  handleCreateNewFolder,
}) => {
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
        handleCreateNewFolder({ parentId, title });
        setTitle(defaultTitleValue);
      }
    }
  }, [isEditingActive]);

  const enableEditor = async () => {
    setIsEditingActive(() => true);
  };

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

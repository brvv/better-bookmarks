import React, { useState, useRef, useEffect } from "react";
import "./NewFolderButton.css";

type Props = {
  handleCreateNewFolder: (folderTitle: string) => void;
};

export const NewFolderButton: React.FC<Props> = ({ handleCreateNewFolder }) => {
  const defaultTitleValue = "";

  const [title, setTitle] = useState("");
  const [isEditingActive, setIsEditingActive] = useState(false);
  const newButtonContainerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
    if (event instanceof KeyboardEvent) {
      if (event.key === "Enter") {
        setIsEditingActive(false);
      }
      return;
    }

    if (
      newButtonContainerRef &&
      newButtonContainerRef.current &&
      !newButtonContainerRef.current.contains(event.target as Node)
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
              className="input-title"
              value={title}
              onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
            ></input>
          </div>
        </div>
      ) : (
        <div className="group-card">+</div>
      )}
    </div>
  );
};

import React, { useState, useEffect, useRef } from "react";
import "./Folder.css";
import { CollapsableOptionsMenu } from "../../tools/CollapsableOptionsMenu/CollapsableOptionsMenu";
import { isFolderEmpty } from "../../../api";
import { useClickOutsideToggler } from "../../../hooks";
import { FolderEditor } from "./tools/FolderEditor";
import { Folder } from "./Folder";

type Props = {
  folder: Folder;
  handleEdit: (bookmark: Folder) => void;
  handleDelete: (bookmark: Folder) => void;
};

export const EditableFolder: React.FC<Props> = ({
  folder,
  handleDelete,
  handleEdit,
}) => {
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [title, setTitle] = useState(folder.title);
  const folderContainerRef = useRef<HTMLDivElement>(null);
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

  return (
    <div>
      <div ref={folderContainerRef} className="group-card-container">
        {isEditingActive ? (
          <FolderEditor folder={folder} setTitle={setTitle} />
        ) : (
          <Folder folder={folder} />
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

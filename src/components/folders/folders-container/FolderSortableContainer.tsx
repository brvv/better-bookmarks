import React from "react";
import "./FolderContainer.css";
import { EditableFolder } from "../folder/EditableFolder";
import { Folder } from "../folder/Folder";
import { ToolbarFolder } from "../toolbar-folder/ToolbarFolder";
import { NewFolderButton } from "../new-folder-button/NewFolderButton";
import { useFolders } from "./useFolders";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { SortableFolder } from "../folder/tools/SortableFolder";
import { TOOLBAR_ID, TOOLBAR_TITLE } from "../../../api";

type Props = {
  parentId: string;
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  options?: ContainerOptions;
};

type ContainerOptions = {
  disableEditing?: boolean;
  disableNewFolderButton?: boolean;
};

export const FolderSortableContainer: React.FC<Props> = ({
  parentId,
  folders,
  setFolders,
  options = { disableEditing: false, includeNewFolderButton: true },
}) => {
  const {
    renderToolbar,
    handleCreateNewFolder,
    handleDeleteFolder,
    handleEditFolder,
  } = useFolders({ parentId, folders, setFolders });

  return (
    <div>
      <div className="toolbar-container">
        {renderToolbar && (
          <SortableContext
            items={[TOOLBAR_ID + "droppable"]}
            strategy={undefined}
          >
            <SortableFolder
              key={TOOLBAR_ID + "droppable"}
              folder={{ id: TOOLBAR_ID + "droppable", title: TOOLBAR_TITLE }}
            >
              <ToolbarFolder name="toolbar" />
            </SortableFolder>
          </SortableContext>
        )}
      </div>

      <SortableContext
        items={folders.map((folderInfo) => folderInfo.id)}
        strategy={rectSortingStrategy}
      >
        <div className="card-container">
          {folders.map((folderInfo) => (
            <SortableFolder folder={folderInfo} key={folderInfo.id}>
              {options.disableEditing ? (
                <Folder folder={folderInfo} />
              ) : (
                <EditableFolder
                  folder={folderInfo}
                  handleEdit={handleEditFolder}
                  handleDelete={handleDeleteFolder}
                />
              )}
            </SortableFolder>
          ))}
          {!options.disableNewFolderButton && (
            <NewFolderButton handleCreateNewFolder={handleCreateNewFolder} />
          )}
        </div>
      </SortableContext>
    </div>
  );
};

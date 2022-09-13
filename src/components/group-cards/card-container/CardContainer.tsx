import React, {useEffect, useState } from "react";
import "./CardContainer.css";
import { GroupCard } from "../group-card/GroupCard";
import { ToolbarCard } from "../toolbar-card/ToolbarCard";
import { NewFolderButton } from "../new-folder-button/NewFolderButton";
import { TOOLBAR_ID, createNewFolder, isFolderEmpty, removeFolder, updateFolder } from "../../../api";
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

type Props = {
  parentId: string;
  folders: BookmarkFolder[];
  setFolders: React.Dispatch<React.SetStateAction<BookmarkFolder[]>>;
};


export const CardContainer: React.FC<Props> = ({ parentId, folders, setFolders }) => {
  const [renderToolbar, setRenderToolbar] = useState(true);

  useEffect(() => {
    setRenderToolbar(() => {
      if (parentId === TOOLBAR_ID) {return false;} else {return true;}
    })
  }, [parentId]);

  const handleCreateNewFolder = async (title : string) => {
    const newFolder = await createNewFolder(title, parentId);
    setFolders([...folders, newFolder]);
  }

  const handleDeleteFolder = async (target : BookmarkFolder) => {
    const isEmpty = await isFolderEmpty(target);
    if (isEmpty) {
      await removeFolder(target);
      const newFolders = [...folders];
      const folderIndex = newFolders.findIndex(
        (folder) => folder.id === target.id
      );
      newFolders.splice(folderIndex, 1);
      setFolders(newFolders);
    }
  }

  const handleEditFolder = async (newFolder : BookmarkFolder) => {
    const updatedFolder = await updateFolder(newFolder);
    const folderIndex = folders.findIndex(
      (folder) => folder.id === newFolder.id
    );
    const newFolders = [...folders];
    newFolders[folderIndex] = updatedFolder;
    setFolders(newFolders);
  }

  return (
    <div className="card-container">
      {renderToolbar &&           
          <SortableContext items={[TOOLBAR_ID+"droppable"]} strategy={undefined}>
            {<ToolbarCard key={TOOLBAR_ID} name="toolbar" />}
          </SortableContext>}

          <SortableContext items={folders.map(folders => folders.id)} strategy={ rectSortingStrategy }>
          {
                        folders.map((folder) => (
                          <GroupCard key={folder.id} folder={folder} handleDelete={handleDeleteFolder} handleEdit={handleEditFolder}/>
                        ))
          }
          </SortableContext>
          <NewFolderButton handleCreateNewFolder={handleCreateNewFolder}/>
    </div>
  );
};

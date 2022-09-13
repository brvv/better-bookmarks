//@ts-nocheck 
import React, {useEffect, useState } from "react";
import "./CardContainer.css";
import { GroupCard } from "../group-card/GroupCard";
import { ToolbarCard } from "../toolbar-card/ToolbarCard";
import { NewFolderButton } from "../new-folder-button/NewFolderButton";
import { TOOLBAR_ID, getIcon, createNewFolder } from "../../../api";
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

  return (
    <div className="card-container">
      {renderToolbar &&           
          <SortableContext items={[TOOLBAR_ID+"droppable"]} strategy={undefined}>
            {<ToolbarCard key={TOOLBAR_ID} name="toolbar" />}
          </SortableContext>}

          <SortableContext items={folders.map(folders => folders.id)} strategy={ rectSortingStrategy }>
          {

                        folders.map((folder) => (
                          <GroupCard key={folder.id} folder={folder} />
                        ))
          }
          </SortableContext>
          <NewFolderButton handleCreateNewFolder={handleCreateNewFolder}/>
    </div>
  );
};

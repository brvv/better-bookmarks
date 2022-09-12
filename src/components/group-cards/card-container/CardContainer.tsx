//@ts-nocheck 
import React, {useEffect, useState } from "react";
import "./CardContainer.css";
import { GroupCard } from "../group-card/GroupCard";
import { ToolbarCard } from "../toolbar-card/ToolbarCard";
import { TOOLBAR_ID, getIcon } from "../../../api";
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

type Props = {
  parentId: string;
  folders: BookmarkFolder[];
  setFolders: React.Dispatch<React.SetStateAction<BookmarkFolder[]>>;
};


export const CardContainer: React.FC<Props> = ({ parentId, folders }) => {
  const [renderToolbar, setRenderToolbar] = useState(true);

  useEffect(() => {
    setRenderToolbar(() => {
      if (parentId === TOOLBAR_ID) {return false;} else {return true;}
    })
  }, [parentId]);

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
    </div>
  );
};

import React from "react";
import "./CardContainer.css";
import { GroupCard } from "../group-card/GroupCard";
import { ToolbarCard } from "../toolbar-card/ToolbarCard";
import { TOOLBAR_ID } from "../../../api";
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

type Props = {
  parentId: string;
  folders: BookmarkFolder[];
  setFolders: React.Dispatch<React.SetStateAction<BookmarkFolder[]>>;
};

export const CardContainer: React.FC<Props> = ({ parentId, folders }) => {
  return (
    <div className="card-container">
      {parentId !== TOOLBAR_ID && <ToolbarCard name="toolbar" />}
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

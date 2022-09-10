import React from "react";
import { useState, useEffect } from "react";
import "./CardContainer.css";
import { GroupCard } from "../group-card/GroupCard";
import { ToolbarCard } from "../toolbar-card/ToolbarCard";
import { getFoldersFromParent, TOOLBAR_ID, changeFolderIndex } from "../../../api";
import { closestCenter, DndContext, MouseSensor, useSensor, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable';

type Props = {
  parentId: string;
};

export const CardContainer: React.FC<Props> = ({ parentId }) => {
  const [folders, setFolders] = useState<BookmarkFolder[]>([]);
  const [foldersFinishedLoading, setFoldersFinishedLoading] = useState(false);

  const sensors = [useSensor(MouseSensor, {
    activationConstraint : {
      distance : 10
    },
  })];

  //Folders
  useEffect(() => {
    getFoldersFromParent(parentId).then((folders) => {
      setFolders(folders);
      setFoldersFinishedLoading(true);
      console.log(folders);
    });
  }, [parentId]);

  const handleDragEnd = async ({active, over} : DragEndEvent) => {
    if (! over) {return}

    if (active.id !== over.id) {
      let newFolders = [...folders];
      const oldIndex = newFolders.findIndex(folder => folder.id === active.id);
      const newIndex = newFolders.findIndex(folder => folder.id === over.id);
      
      changeFolderIndex(folders[oldIndex], newIndex);
      console.log(folders);
      const reorderedFolders = arrayMove(newFolders, oldIndex, newIndex);
      setFolders(reorderedFolders);
      
    }
  }

  return (
    <div className="card-container">
      {parentId !== TOOLBAR_ID && <ToolbarCard name="toolbar" />}

      {foldersFinishedLoading ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>   
          <SortableContext items={folders.map(folders => folders.id)} strategy={rectSortingStrategy}>
            {
                        folders.map((folder) => (
                          <GroupCard key={folder.id} folder={folder} />
                        ))
            }
          </SortableContext>
        </DndContext>

      ) : (
        <p>Loading!</p>
      )}
    </div>
  );
};

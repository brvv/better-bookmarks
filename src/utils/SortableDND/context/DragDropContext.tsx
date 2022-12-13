import React, { useContext, useState } from "react";
import { useDragDrop, DraggedOverItem } from "./useDragDrop";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";

type MouseOffsetType = {
  x: number;
  y: number;
};

type Props = {
  children: React.ReactNode;
  onDragStart(event: DragStartEvent): undefined;
  onDragOver(event: DragOverEvent): undefined;
  onDragEnd(event: DragEndEvent): undefined;
};

const MouseOffsetContext = React.createContext<MouseOffsetType | null>(null);
const DraggedOverItemContext = React.createContext<DraggedOverItem | null>(
  null
);

export const useMouseOffset = () => {
  return useContext(MouseOffsetContext);
};

export const useDraggedOverItem = () => {
  return useContext(DraggedOverItemContext);
};

export const DragDropContext = ({
  children,
  onDragStart,
  onDragOver,
  onDragEnd,
}: Props) => {
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseCoord({ x: e.pageX, y: e.pageY });
  };

  const {
    draggedOverItem,
    mouseOffset,
    sensors,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    compoundCollisionDetection,
  } = useDragDrop({
    mouseCoord,
    onDragStart,
    onDragOver,
    onDragEnd,
  });

  return (
    <div onMouseMove={handleMouseMove}>
      <MouseOffsetContext.Provider value={mouseOffset}>
        <DndContext
          sensors={sensors}
          collisionDetection={compoundCollisionDetection}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
        >
          <DraggedOverItemContext.Provider value={draggedOverItem}>
            {children}
          </DraggedOverItemContext.Provider>
        </DndContext>
      </MouseOffsetContext.Provider>
    </div>
  );
};

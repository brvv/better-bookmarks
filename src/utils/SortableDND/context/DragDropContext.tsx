import React, { useContext, useState } from "react";
import { useDragDrop } from "./useDragDrop";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { MouseOffset, DraggedOverItem } from "../types";

type Props = {
  children: React.ReactNode;
  customDragStartAction(event: DragStartEvent): undefined;
  customDragOverAction(event: DragOverEvent): undefined;
  customDragEndAction(event: DragEndEvent): undefined;
};

const MouseOffsetContext = React.createContext<MouseOffset | null>(null);
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
  customDragStartAction,
  customDragOverAction,
  customDragEndAction,
}: Props) => {
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseCoord({ x: e.pageX, y: e.pageY });
  };

  const {
    draggedOverItem,
    mouseOffset,
    sensors,
    handleDragOver,
    handleDragStart,
    compoundCollisionDetection,
  } = useDragDrop({
    mouseCoord,
    customDragStartAction,
    customDragOverAction,
    customDragEndAction,
  });

  return (
    <div onMouseMove={handleMouseMove}>
      <MouseOffsetContext.Provider value={mouseOffset}>
        <DndContext
          sensors={sensors}
          collisionDetection={compoundCollisionDetection}
          onDragEnd={customDragEndAction}
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

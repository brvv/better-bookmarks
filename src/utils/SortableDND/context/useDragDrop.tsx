import { useState } from "react";

import {
  pointerWithin,
  Collision,
  MouseSensor,
  useSensor,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  rectIntersection,
} from "@dnd-kit/core";

import { DraggedOverItem } from "../types";

type Props = {
  mouseCoord: { x: number; y: number };
  customDragStartAction?(event: DragStartEvent): undefined;
  customDragOverAction?(event: DragOverEvent): undefined;
  customDragEndAction?(event: DragEndEvent): undefined;
};

export const useDragDrop = ({
  mouseCoord,
  customDragStartAction,
  customDragOverAction,
  customDragEndAction,
}: Props) => {
  const [draggedOverItem, setDraggedOverItem] =
    useState<DraggedOverItem | null>(null);
  const [dragStartCoord, setDragStartCoord] = useState({ x: 0, y: 0 });

  const sensors = [
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  ];

  const compoundCollisionDetection = (args: any): Collision[] => {
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }
    const rectCollisions = rectIntersection(args);
    return rectCollisions;
  };

  const handleDragStart = async (event: DragStartEvent) => {
    if (event) {
      setDragStartCoord(mouseCoord);
    }
    if (customDragStartAction) {
      customDragStartAction(event);
    }
  };

  const handleDragOver = async (event: DragOverEvent) => {
    if (!event.over) {
      setDraggedOverItem(null);
      return;
    }

    const { active } = event;
    setDraggedOverItem({ id: active.id, data: active.data.current });

    if (customDragOverAction) {
      customDragOverAction(event);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    console.log("Drag ended");
    console.log("Event: ", event);
    const { active, over } = event;
    if (!active || !over || active.id === over.id) {
      console.log("Exited here!");
      setDraggedOverItem(null);
      return;
    }

    setDraggedOverItem(null);
    if (customDragEndAction) {
      console.log("Here!");
      customDragEndAction(event);
      console.log(customDragEndAction, event);
    }
  };

  return {
    draggedOverItem,
    mouseOffset: {
      x: mouseCoord.x - dragStartCoord.x,
      y: mouseCoord.y - dragStartCoord.y,
    },
    sensors,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    compoundCollisionDetection,
  };
};

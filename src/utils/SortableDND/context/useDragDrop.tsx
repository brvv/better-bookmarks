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
  Active,
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

  const isValidRectCollision = (
    active: Active,
    collision: Collision
  ): boolean => {
    const activeType = active.data?.current?.type;
    if (activeType) {
      const collisionType =
        collision.data?.droppableContainer?.data?.current?.type;
      if (collisionType && collisionType !== activeType) {
        return false;
      }
    }
    return true;
  };

  const compoundCollisionDetection = (args: any): Collision[] => {
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }
    const rectCollisions = rectIntersection(args);
    if (args.active) {
      return rectCollisions.filter((collision) =>
        isValidRectCollision(args.active, collision)
      );
    }
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

    const { over } = event;
    setDraggedOverItem({ id: over.id, data: over.data.current });

    if (customDragOverAction) {
      customDragOverAction(event);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) {
      setDraggedOverItem(null);
      return;
    }

    setDraggedOverItem(null);
    if (customDragEndAction) {
      customDragEndAction(event);
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

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
  UniqueIdentifier,
} from "@dnd-kit/core";

type Props = {
  mouseCoord: { x: number; y: number };
  onDragStart?(event: DragStartEvent): undefined;
  onDragOver?(event: DragOverEvent): undefined;
  onDragEnd?(event: DragEndEvent): undefined;
};

export type DraggedOverItem = {
  id: UniqueIdentifier;
  data: any;
};

export const useDragDrop = ({
  mouseCoord,
  onDragStart,
  onDragOver,
  onDragEnd,
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
    if (onDragStart) {
      onDragStart(event);
    }
  };

  const handleDragOver = async (event: DragOverEvent) => {
    if (!event.over) {
      setDraggedOverItem(null);
      return;
    }

    const { active } = event;
    setDraggedOverItem({ id: active.id, data: active.data.current });

    if (onDragOver) {
      onDragOver(event);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) {
      return;
    }

    setDraggedOverItem(null);
    if (onDragEnd) {
      onDragEnd(event);
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

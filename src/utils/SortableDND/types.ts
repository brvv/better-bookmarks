import { UniqueIdentifier } from "@dnd-kit/core";
import { Transform } from "@dnd-kit/utilities";

export type ItemInfo = {
  uniqueSortableId: GeneratedId;
  type: InteractableItem;
  accepts: InteractableItem[];
};

export type TransformInfo = {
  transition: string | undefined;
  transform: Transform | null;
  isDragging: boolean;
};

export type DraggedOverItem = {
  id: UniqueIdentifier;
  data: any;
};

export type MouseOffset = {
  x: number;
  y: number;
};

export type GeneratedId = string;

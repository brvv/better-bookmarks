import { UniqueIdentifier } from "@dnd-kit/core";
import { Transform } from "@dnd-kit/utilities";
import { InteractableItem } from "../../api/enums";

export type SortableItemData = {
  uniqueSortableId: GeneratedId;
  backendId: string | number;
  type: InteractableItem;
  accepts: InteractableItem[];
};

export type SortableTransformData = {
  transition: string | undefined;
  transform: Transform | null;
  isDragging: boolean;
};

//TODO: data should be ItemData?
export type DraggedOverItem = {
  id: UniqueIdentifier;
  data: any;
};

export type MouseOffset = {
  x: number;
  y: number;
};

export type GeneratedId = string;

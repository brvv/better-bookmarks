import { SortableItemData } from "../../utils/SortableDND/types";
import { SortableArray } from "./useDragEvents";

export const canMove = (
  activeData: SortableItemData,
  overData: SortableItemData
) => {
  return activeData.type === overData.type;
};

export const canCombine = (
  activeData: SortableItemData,
  overData: SortableItemData
) => {
  return (
    activeData.type !== overData.type &&
    overData.accepts.includes(activeData.type)
  );
};

export const findContainerFromItem = (
  item: SortableItemData,
  sortableContainers: SortableArray[]
): SortableArray => {
  const index = sortableContainers.findIndex(
    (container) => container.type === item.type
  );
  return sortableContainers[index];
};

export const findItemIndex = (
  target: SortableItemData,
  container: SortableArray
) => {
  return container.items.findIndex((item) => item.id === target.backendId);
};

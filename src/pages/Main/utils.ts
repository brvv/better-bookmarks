import { SortableItemData } from "../../utils/SortableDND/types";
import { SortableArray } from "./useDragEvents";

export const areItemsMovable = (
  activeData: SortableItemData,
  overData: SortableItemData
) => {
  return activeData.type === overData.type;
};

export const areItemsCombinable = (
  activeData: SortableItemData,
  overData: SortableItemData
) => {
  return (
    activeData.type !== overData.type &&
    overData.accepts.includes(activeData.type)
  );
};

export const getContainerByItem = (
  item: SortableItemData,
  sortableContainers: SortableArray[]
): SortableArray => {
  const index = sortableContainers.findIndex(
    (container) => container.type === item.type
  );
  return sortableContainers[index];
};

export const getItemIndexInContainer = (
  target: SortableItemData,
  container: SortableArray
) => {
  return container.items.findIndex((item) => item.id === target.backendId);
};

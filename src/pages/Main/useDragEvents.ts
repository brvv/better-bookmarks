import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import React from "react";
import { getSortableItemData } from "../../utils/SortableDND/utils";
import { InteractableItem } from "../../api/enums";
import { SortableItemData } from "../../utils/SortableDND/types";
import { arrayMove } from "@dnd-kit/sortable";
import {
  areItemsMovable,
  getContainerByItem,
  getItemIndexInContainer,
  areItemsCombinable,
} from "./utils";

//TODO: come up with generic type for items that has a mandatory id: Bookmark and Folder will extend it
type Props = {
  sortableContainers: SortableArray[];
};

export type SortableArray = {
  type: InteractableItem;
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
};

export const useDragEvents = ({ sortableContainers }: Props) => {
  //TODO: Add api call integration
  const handleItemMove = (
    activeData: SortableItemData,
    overData: SortableItemData
  ) => {
    if (!areItemsMovable(activeData, overData)) {
      return;
    }
    const container = getContainerByItem(activeData, sortableContainers);
    const activeIndex = getItemIndexInContainer(activeData, container);
    const overIndex = getItemIndexInContainer(overData, container);
    const newItems = [...container.items];
    const reorderedItems = arrayMove(newItems, activeIndex, overIndex);
    container.setItems(reorderedItems);
  };

  //TODO: Add api call integration
  const handleItemCombine = (
    activeData: SortableItemData,
    overData: SortableItemData
  ) => {
    if (!areItemsCombinable(activeData, overData)) {
      return;
    }

    const container = getContainerByItem(activeData, sortableContainers);
    const activeIndex = getItemIndexInContainer(activeData, container);
    const newItems = [...container.items];
    newItems.splice(activeIndex, 1);
    container.setItems(newItems);
  };

  const handleDragEnd = (
    activeData: SortableItemData,
    overData: SortableItemData
  ) => {
    if (areItemsMovable(activeData, overData)) {
      handleItemMove(activeData, overData);
    } else if (areItemsCombinable(activeData, overData)) {
      handleItemCombine(activeData, overData);
    }
  };

  const onDragStart = (event: DragStartEvent): undefined => {
    if (event) {
      return;
    }
  };

  const onDragOver = (event: DragOverEvent): undefined => {
    if (event) {
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent): undefined => {
    const { active, over } = event;
    const activeData = getSortableItemData(active);
    const overData = getSortableItemData(over);

    if (!activeData || !overData) {
      return;
    }

    handleDragEnd(activeData, overData);
    return;
  };

  return { onDragStart, onDragOver, onDragEnd };
};

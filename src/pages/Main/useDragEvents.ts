import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import React from "react";
import { getSortableItemData } from "../../utils/SortableDND/utils";
import { InteractableItem } from "../../api/enums";
import { SortableItemData } from "../../utils/SortableDND/types";
import { arrayMove } from "@dnd-kit/sortable";
import {
  canMove,
  findContainerFromItem,
  findItemIndex,
  canCombine,
} from "./utils";
import {
  moveItems as backendMoveItems,
  combineItems as backendCombineItems,
} from "../../api/Bookmarks";

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
  const moveItems = (
    activeData: SortableItemData,
    overData: SortableItemData
  ) => {
    if (!canMove(activeData, overData)) {
      return;
    }
    const container = findContainerFromItem(activeData, sortableContainers);
    const activeIndex = findItemIndex(activeData, container);
    const overIndex = findItemIndex(overData, container);
    const itemsCopy = [...container.items];
    const reorderedItems = arrayMove(itemsCopy, activeIndex, overIndex);
    container.setItems(reorderedItems);
    backendMoveItems(activeData, overIndex);
  };

  //TODO: Add api call integration
  const combineItems = (
    activeData: SortableItemData,
    overData: SortableItemData
  ) => {
    if (!canCombine(activeData, overData)) {
      return;
    }

    const container = findContainerFromItem(activeData, sortableContainers);
    const activeIndex = findItemIndex(activeData, container);
    const itemsCopy = [...container.items];
    itemsCopy.splice(activeIndex, 1);
    container.setItems(itemsCopy);
    backendCombineItems(activeData, overData);
  };

  const handleDragEnd = (
    activeData: SortableItemData,
    overData: SortableItemData
  ) => {
    if (canMove(activeData, overData)) {
      moveItems(activeData, overData);
    } else if (canCombine(activeData, overData)) {
      combineItems(activeData, overData);
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

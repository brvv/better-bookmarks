import { SortableItemData } from "../../utils/SortableDND/types";
import { InteractableItem } from "../enums";
import { move, changeIndex as changeBookmarkIndex } from "./bookmarks";
import { changeIndex as changeFolderIndex } from "./folders";

export const combineItems = (
  item1: SortableItemData,
  item2: SortableItemData
) => {
  if (
    item1.type === InteractableItem.Bookmark &&
    (item2.type === InteractableItem.Folder ||
      item2.type === InteractableItem.Toolbar)
  ) {
    move({ id: String(item1.backendId), title: "" }, String(item2.backendId));
  }
};

export const moveItems = (item: SortableItemData, newIndex: number) => {
  if (item.type === InteractableItem.Bookmark) {
    changeBookmarkIndex({ id: String(item.backendId), title: "" }, newIndex);
  } else if (item.type === InteractableItem.Folder) {
    changeFolderIndex({ id: String(item.backendId), title: "" }, newIndex);
  }
};

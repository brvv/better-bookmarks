import { SortableItemData } from "../../utils/SortableDND/types";
import { InteractableItem } from "../enums";
import { getUncategorizedId } from "../Storage";
import { move, changeIndex as changeBookmarkIndex } from "./bookmarks";
import { changeIndex as changeFolderIndex } from "./folders";
import { parseBookmarkNode, parseFolderNode } from "./helpers";

export const combineItems = async (
  item1: SortableItemData,
  item2: SortableItemData
): Promise<boolean> => {
  if (
    item1.type === InteractableItem.Bookmark &&
    (item2.type === InteractableItem.Folder ||
      item2.type === InteractableItem.Toolbar ||
      item2.type === InteractableItem.NavigationBarItem)
  ) {
    const uncategorizedId = await getUncategorizedId();
    const item2Id = item2.backendId === "" ? uncategorizedId : item2.backendId;
    const item1Node = await browser.bookmarks.get(String(item1.backendId));
    const item2Node = await browser.bookmarks.get(String(item2Id));
    const item1Parsed = parseBookmarkNode(item1Node[0]);
    const item2Parsed = parseFolderNode(item2Node[0]);

    if (item1Parsed.parentId && item1Parsed.parentId !== item2Parsed.id) {
      move({ id: item1Parsed.id, title: "" }, item2Parsed.id);
      return true;
    }
  }
  return false;
};

export const moveItems = async (
  item: SortableItemData,
  newIndex: number
): Promise<boolean> => {
  if (item.type === InteractableItem.Bookmark) {
    changeBookmarkIndex({ id: String(item.backendId), title: "" }, newIndex);
  } else if (item.type === InteractableItem.Folder) {
    changeFolderIndex({ id: String(item.backendId), title: "" }, newIndex);
  }
  return true;
};

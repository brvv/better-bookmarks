import { getUncategorizedId, getRootId } from "../Storage/storage";
import {
  IN_APP_TOOLBAR_MODIFIER,
  TOOLBAR_ID,
  BrowserNodeType,
} from "../constants";
import { parseBookmarkNode, findMoveUpDestination } from "./helpers";

export const getChildBookmarkNodes = async (
  parentId: string
): Promise<Bookmark[]> => {
  const rootId = await getRootId();
  const uncategorizedId = await getUncategorizedId();
  const bookmarkSourceFolder = parentId === rootId ? uncategorizedId : parentId;
  const tree = (await browser.bookmarks.getSubTree(bookmarkSourceFolder))[0];
  const bookmarks: Bookmark[] = [];
  if (!tree.children) {
    return bookmarks;
  }

  // use filter
  tree.children.forEach((child) => {
    if (child.type === BrowserNodeType.Bookmark) {
      const parsedChild = parseBookmarkNode(child);
      bookmarks.push(parsedChild);
    }
  });
  return bookmarks;
};

export const update = async (bookmark: Bookmark): Promise<Bookmark> => {
  const newUrl = bookmark.url ? bookmark.url : "";
  const updatedBookmark = await browser.bookmarks.update(bookmark.id, {
    title: bookmark.title,
    url: newUrl,
  });
  return parseBookmarkNode(updatedBookmark);
};

export const remove = async (bookmark: Bookmark): Promise<void> => {
  await browser.bookmarks.remove(bookmark.id);
  return;
};

export const moveUpOneLevel = async (bookmark: Bookmark): Promise<void> => {
  if (!bookmark.parentId) {
    return;
  }

  const targetId = await findMoveUpDestination(bookmark);
  if (targetId) {
    const rootId = await getRootId();
    const uncategorizedId = await getUncategorizedId();

    if (
      targetId === rootId ||
      bookmark.parentId == rootId ||
      bookmark.parentId === TOOLBAR_ID
    ) {
      await browser.bookmarks.move(bookmark.id, { parentId: uncategorizedId });
    } else {
      await browser.bookmarks.move(bookmark.id, { parentId: targetId });
    }
  }

  return;
};

export const create = async (newBookmark: NewBookmark): Promise<Bookmark> => {
  let targetBookmark = { ...newBookmark };
  const rootId = await getRootId();
  const originalTitle = targetBookmark.title
    ? targetBookmark.title
    : "no title";

  if (targetBookmark.parentId === TOOLBAR_ID) {
    targetBookmark.title =
      targetBookmark.title + IN_APP_TOOLBAR_MODIFIER + rootId;
  }

  const newBookmarkNode = await browser.bookmarks.create({
    parentId: targetBookmark.parentId,
    title: targetBookmark.title,
    url: targetBookmark.url,
  });
  const resultingBookmark = parseBookmarkNode(newBookmarkNode);
  return { ...resultingBookmark, title: originalTitle };
};

export const changeIndex = async (
  bookmark: Bookmark,
  newIndex: number
): Promise<void> => {
  if (!bookmark.parentId) {
    return;
  }

  await browser.bookmarks.move(bookmark.id, { index: newIndex });
};

export const move = async (bookmark: Bookmark, targetId: string) => {
  const rootId = await getRootId();
  const uncategorizedId = await getUncategorizedId();
  console.log("Moving bookmark", bookmark.title, "to", targetId);

  if (targetId === rootId || bookmark.parentId == rootId) {
    await browser.bookmarks.move(bookmark.id, { parentId: uncategorizedId });
  } else {
    await browser.bookmarks.move(bookmark.id, { parentId: targetId });
  }
  return;
};
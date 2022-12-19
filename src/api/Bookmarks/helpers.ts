import { NodeId } from "./types";

export const parseFolderNode = (
  node: browser.bookmarks.BookmarkTreeNode
): Folder => {
  const folder: Folder = {
    id: node.id,
    title: node.title,
  };

  if (node.dateAdded) {
    folder.dateAdded = new Date(node.dateAdded);
  }
  if (node.dateGroupModified) {
    folder.dateGroupModified = new Date(node.dateGroupModified);
  }
  if (node.parentId) {
    folder.parentId = node.parentId;
  }
  return folder;
};

export const parseBookmarkNode = (
  node: browser.bookmarks.BookmarkTreeNode
): Bookmark => {
  const bookmark: Bookmark = {
    id: node.id,
    title: node.title,
  };

  if (node.url) {
    bookmark.url = node.url;
  }
  if (node.dateAdded) {
    bookmark.dateAdded = new Date(node.dateAdded);
  }
  if (node.dateGroupModified) {
    bookmark.dateGroupModified = new Date(node.dateGroupModified);
  }
  if (node.parentId) {
    bookmark.parentId = node.parentId;
  }
  return bookmark;
};

export const findMoveUpDestination = async (
  bookmark: Bookmark
): Promise<NodeId | undefined> => {
  if (!bookmark.parentId) {
    return;
  }

  const parentNode = await browser.bookmarks.get(bookmark.parentId);
  const parent = await parseFolderNode(parentNode[0]);
  if (!parent.parentId) {
    return;
  }
  const parentOfParent = parent.parentId;
  return parentOfParent;
};

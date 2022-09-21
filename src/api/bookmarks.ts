import { getUncategorizedId, getRootId } from "./storage";
import {
  INVALID_ROUTER_PAGES,
  IN_APP_TOOLBAR_MODIFIER,
  TOOLBAR_ID,
} from "./constants";

const parseFolderNode = (node: browser.bookmarks.BookmarkTreeNode): Folder => {
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

const parseBookmarkNode = (
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

export const getFoldersFromParent = async (id: string): Promise<Folder[]> => {
  const tree = (await browser.bookmarks.getSubTree(id))[0];
  const uncategorizedId = await getUncategorizedId();
  const folders: Folder[] = [];
  if (!tree.children) {
    return folders;
  }
  tree.children.forEach((child) => {
    if (child.type === "folder" && child.id !== uncategorizedId) {
      const convertedChild = parseFolderNode(child);
      folders.push(convertedChild);
    }
  });
  return folders;
};

export const getBookmarksFromParent = async (
  id: string
): Promise<Bookmark[]> => {
  const rootId = await getRootId();
  const uncategorizedId = await getUncategorizedId();
  const bookmarkSourceFolder = id === rootId ? uncategorizedId : id;
  const tree = (await browser.bookmarks.getSubTree(bookmarkSourceFolder))[0];
  const bookmarks: Bookmark[] = [];
  if (!tree.children) {
    return bookmarks;
  }
  tree.children.forEach((child) => {
    if (child.type === "bookmark") {
      const convertedChild = parseBookmarkNode(child);
      bookmarks.push(convertedChild);
    }
  });
  return bookmarks;
};

export const updateBookmark = async (bookmark: Bookmark): Promise<Bookmark> => {
  const newUrl = bookmark.url ? bookmark.url : "";
  const updatedBookmark = await browser.bookmarks.update(bookmark.id, {
    title: bookmark.title,
    url: newUrl,
  });
  return parseBookmarkNode(updatedBookmark);
};

export const removeBookmark = async (bookmark: Bookmark): Promise<void> => {
  await browser.bookmarks.remove(bookmark.id);
  return;
};

const getParentOfParentId = async (
  bookmark: Bookmark
): Promise<string | undefined> => {
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

export const moveUpBookmark = async (bookmark: Bookmark): Promise<void> => {
  if (!bookmark.parentId) {
    return;
  }

  const targetId = await getParentOfParentId(bookmark);

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

export const createNewBookmark = async (
  newBookmark: NewBookmark
): Promise<Bookmark> => {
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

export const createNewFolder = async (
  title: string,
  parentId: string
): Promise<Folder> => {
  const rootId = await getRootId();
  const originalTitle = title ? title : "no title";
  let newTitle = title;

  if (parentId === TOOLBAR_ID) {
    newTitle = newTitle + IN_APP_TOOLBAR_MODIFIER + rootId;
  }

  const newFolderNode = await browser.bookmarks.create({
    parentId: parentId,
    title: newTitle,
  });
  const resultingFolder = parseFolderNode(newFolderNode);
  return { ...resultingFolder, title: originalTitle };
};

export const changeBookmarkIndex = async (
  bookmark: Bookmark,
  newIndex: number
): Promise<void> => {
  if (!bookmark.parentId) {
    return;
  }

  await browser.bookmarks.move(bookmark.id, { index: newIndex });
};

export const changeFolderIndex = async (
  folder: Folder,
  newIndex: number
): Promise<void> => {
  const rootId = await getRootId();
  if (folder.parentId === rootId) {
    newIndex += 1;
  }
  await changeBookmarkIndex(
    { title: folder.title, parentId: folder.parentId, id: folder.id },
    newIndex
  );
};

export const moveBookmark = async (bookmark: Bookmark, targetId: string) => {
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

export const isFolderEmpty = async (folder: Folder): Promise<boolean> => {
  const folderNode = (await browser.bookmarks.getSubTree(folder.id))[0];
  if (folderNode.children && folderNode.children?.length > 0) {
    return false;
  }
  return true;
};

export const removeFolder = async (folder: Folder): Promise<void> => {
  const res = await isFolderEmpty(folder);
  if (res) {
    await browser.bookmarks.remove(folder.id);
  }
  return;
};

export const updateFolder = async (folder: Folder): Promise<Folder> => {
  const updatedFolder = await browser.bookmarks.update(folder.id, {
    title: folder.title,
  });
  return parseFolderNode(updatedFolder);
};

export const getFolderPath = async (
  parentId: string
): Promise<{ title: string; id: string }[]> => {
  if (parentId === TOOLBAR_ID) {
    return [{ title: "toolbar", id: TOOLBAR_ID }];
  }

  const rootId = await getRootId();

  if (parentId === rootId) {
    return [{ title: "root", id: "" }];
  }

  let path: { title: string; id: string }[] = [];
  let currentParentId: string | undefined = parentId;

  while (
    currentParentId &&
    currentParentId !== rootId &&
    !INVALID_ROUTER_PAGES.includes(currentParentId)
  ) {
    const newParent: browser.bookmarks.BookmarkTreeNode = (
      await browser.bookmarks.get(currentParentId)
    )[0];
    const currentFolder = { title: newParent.title, id: newParent.id };
    path.push(currentFolder);
    currentParentId = newParent.parentId;
  }

  return path.reverse();
};

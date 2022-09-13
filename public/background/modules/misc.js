import { STORAGE_UNCATEGORIZED_KEY, STORAGE_ROOT_KEY } from "./constants.js";

export const getAllBookmarks = (bookmarkTree, currentPath = "/") => {
  let bookmarks = [];
  bookmarkTree.children.forEach((child) => {
    if (child.type === "folder") {
      bookmarks = bookmarks.concat(
        getAllBookmarks(child, currentPath + `${child.title}/`)
      );
    } else {
      bookmarks.push(child);
    }
  });
  return bookmarks;
};

export const getRootId = async () => {
  const rootInfo = await browser.storage.local.get(STORAGE_ROOT_KEY);
  return rootInfo[STORAGE_ROOT_KEY].id;
};

export const getUncategorizedId = async () => {
  const uncategorizedInfo = await browser.storage.local.get(
    STORAGE_UNCATEGORIZED_KEY
  );
  return uncategorizedInfo[STORAGE_UNCATEGORIZED_KEY].id;
};

export const isBookmarkInExtensionFolders = async (bookmarkNode) => {
  const extensionRootId = await getRootId();
  if (bookmarkNode.parentId === extensionRootId) {
    return false;
  }

  let currentLevel = (await browser.bookmarks.get(bookmarkNode.parentId))[0];

  while (Object.hasOwn(currentLevel, "parentId") && currentLevel.parentId) {
    if (currentLevel.parentId === extensionRootId) {
      return true;
    } else {
      currentLevel = (await browser.bookmarks.get(currentLevel.parentId))[0];
    }
  }
  return false;
};

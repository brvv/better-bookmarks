import {
  STORAGE_UNCATEGORIZED_KEY,
  STORAGE_ROOT_KEY,
  TOOLBAR_ID,
  ROOT_ID,
} from "./constants.js";

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

export const isBookmarkInExtensionRoot = async (bookmarkNode) => {
  const extensionRootId = await getRootId();
  if (bookmarkNode.parentId === extensionRootId) {
    return true;
  }
  return false;
};

export const isBookmarkInUncategorized = async (bookmarkNode) => {
  const uncategorizedId = await getUncategorizedId();
  if (bookmarkNode.parentId === uncategorizedId) {
    return true;
  }
  return false;
};

export const isBookmarkInExtensionFolders = async (bookmarkNode) => {
  const extensionRootId = await getRootId();
  if (bookmarkNode.parentId === extensionRootId) {
    return true;
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

export const isBookmarkinToolbar = async (bookmarkInfo) => {
  let currentParentId = bookmarkInfo.parentId;

  while (currentParentId && currentParentId !== ROOT_ID) {
    if (currentParentId === TOOLBAR_ID) {
      return true;
    } else {
      const parentNode = (await browser.bookmarks.get(currentParentId))[0];
      currentParentId = parentNode.parentId;
    }
  }
  return false;
};

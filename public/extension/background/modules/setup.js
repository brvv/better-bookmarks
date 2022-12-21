import {
  MENU_ID,
  UNCATEGORIZED_NAME_BASE,
  ROOT_ID,
  TOOLBAR_ID,
} from "./constants.js";
import { getUncategorizedId } from "./misc.js";

let isFirstInstall = true;

const createMainFolders = async () => {
  const extRoot = await browser.bookmarks.create({
    title: "Better Bookmarks Root",
    parentId: MENU_ID,
    type: "folder",
  });
  const uncategorizedFolder = await browser.bookmarks.create({
    title: UNCATEGORIZED_NAME_BASE + extRoot.id,
    parentId: extRoot.id,
    type: "folder",
  });
  return extRoot;
};

const findRootNode = async () => {
  const menuNode = (await browser.bookmarks.getSubTree(MENU_ID))[0];
  for (let i = 0; i < menuNode.children.length; i++) {
    const child = menuNode.children[i];
    if (child.title === "Better Bookmarks Root") {
      return child;
    }
  }
  return;
};

const findUncategorizedNode = async (rootNode) => {
  const rootId = rootNode.id;
  const rootTree = (await browser.bookmarks.getSubTree(rootId))[0];
  for (let i = 0; i < rootTree.children.length; i++) {
    const child = rootTree.children[i];
    if (child.title === UNCATEGORIZED_NAME_BASE + rootId) {
      console.log("Found uncategorized");
      return child;
    }
  }
  return;
};

const findMainFolders = async () => {
  const rootNode = await findRootNode();

  if (rootNode) {
    console.log("Found root");
    const uncategorizedNode = await findUncategorizedNode(rootNode);
    return [rootNode, uncategorizedNode];
  }
  console.log("Did not find root");
  return [null, null];
};

const setUpFolders = async () => {
  const extensionRoot = await findRootNode();
  if (!extensionRoot) {
    console.log("Creating a new root");
    const newExtensionRoot = await createMainFolders();
    return newExtensionRoot;
  } else {
    console.log("Returning existing root");
    isFirstInstall = false;
    return extensionRoot;
  }
};

const saveMainFolderIds = async (root, uncategorized) => {
  const rootInfo = { id: root.id, title: root.title };
  const uncategorizedInfo = {
    id: uncategorized.id,
    title: uncategorized.title,
  };

  return browser.storage.local.set({ rootInfo, uncategorizedInfo });
};

const isBookmarkinToolbar = async (bookmark) => {
  let currentParentId = bookmark.parentId;

  while (currentParentId !== ROOT_ID) {
    if (currentParentId === TOOLBAR_ID) {
      return true;
    } else {
      const newParent = (await browser.bookmarks.get(currentParentId))[0];
      currentParentId = newParent.parentId;
    }
  }
  return false;
};

const getAllBookmarks = async () => {
  let bookmarks = [];
  let folders = [];
  folders.push(ROOT_ID);

  while (folders.length > 0) {
    const currentId = folders.pop();
    const currentFolderChildren = await browser.bookmarks.getChildren(
      currentId
    );

    for (const child of currentFolderChildren) {
      if (child.type && child.type === "folder") {
        folders.push(child.id);
      } else if (child.type && child.type === "bookmark") {
        bookmarks.push(child);
      }
    }
  }
  return bookmarks;
};

const moveBookmarksToExtensionRoot = async () => {
  const allBookmarks = await getAllBookmarks();
  const uncategorizedId = await getUncategorizedId();

  for (const bookmark of allBookmarks) {
    const isInToolbar = await isBookmarkinToolbar(bookmark);
    if (!isInToolbar) {
      browser.bookmarks.move(bookmark.id, { parentId: uncategorizedId });
    }
  }
};

export const setupExtension = async () => {
  const root = await setUpFolders();
  if (isFirstInstall) {
    console.log("First install of the extension");
  } else {
    console.log("Extension updated/refreshed");
  }
  const uncategorized = await findUncategorizedNode(root);
  console.log("Finished setting up the folders!");
  const saveStatus = await saveMainFolderIds(root, uncategorized);
  console.log("Saved the id info to storage!");
  if (isFirstInstall) {
    await moveBookmarksToExtensionRoot();
  }
};

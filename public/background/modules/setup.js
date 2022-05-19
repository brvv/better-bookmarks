import { MENU_ID, UNCATEGORIZED_NAME_BASE } from "./constants.js";

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

const moveBookmarksToRoot = async () => {};

export const setupExtension = async () => {
  const root = await setUpFolders();
  const uncategorized = await findUncategorizedNode(root);
  console.log("Finished setting up the folders!");
  const saveStatus = await saveMainFolderIds(root, uncategorized);
  console.log("Saved the id info to storage!");
};

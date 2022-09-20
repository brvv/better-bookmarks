import { setupExtension } from "./modules/setup.js";
import {
  getRootId,
  getUncategorizedId,
  isBookmarkInExtensionFolders,
  isBookmarkinToolbar,
  isBookmarkInExtensionRoot,
  isBookmarkInUncategorized,
} from "./modules/misc.js";

const IN_APP_TOOLBAR_MODIFIER = "BOOKMARK_CREATED_IN_APP";

const handleInstalled = (details) => {
  console.log(details.reason);

  setupExtension().then((node) => {
    console.log("setup complete!");
    getRootId().then((id) => {
      console.log(id);
    });

    getUncategorizedId().then((id) => {
      console.log(id);
    });
  });
};

const isItemInBadFolder = async (id) => {
  const item = (await browser.bookmarks.get(id))[0];

  const isInExtFolders = await isBookmarkInExtensionFolders(item);
  const isInToolbar = await isBookmarkinToolbar(item);
  const isInRoot = await isBookmarkInExtensionRoot(item);
  const isInUncategorized = await isBookmarkInUncategorized(item);

  return (
    (!isInExtFolders && !isInToolbar) ||
    (item.type === "bookmark" && isInRoot) ||
    (item.type === "folder" && isInUncategorized)
  );
};

const moveItemToDefaultFolder = async (id) => {
  const item = (await browser.bookmarks.get(id))[0];
  const uncategorizedId = await getUncategorizedId();
  const rootId = await getRootId();

  const newParentId = item.type === "bookmark" ? uncategorizedId : rootId;

  await browser.bookmarks.move(id, {
    parentId: newParentId,
  });
};

const handleNewToolbarBookmark = async (id, bookmarkInfo) => {
  const rootId = await getRootId();
  let newTitle = bookmarkInfo.title.slice(
    0,
    -(IN_APP_TOOLBAR_MODIFIER + rootId).length
  );
  await browser.bookmarks.update(bookmarkInfo.id, { title: newTitle });
};

const handleCreateBookmark = async (id, bookmarkInfo) => {
  const rootId = await getRootId();
  console.log("New bookmark or folder created");

  if (bookmarkInfo.title.includes(IN_APP_TOOLBAR_MODIFIER + rootId)) {
    console.log("Bookmark/Folder created in app in toolbar");
    handleNewToolbarBookmark(id, bookmarkInfo);
    return;
  }

  const isInBadFolder = await isItemInBadFolder(id);

  if (isInBadFolder) {
    console.log("The item was created in a bad folder. Move to default");
    moveItemToDefaultFolder(id);
  }
};

const handleMoveBookmark = async (id, moveInfo) => {
  console.log("Bookmark or Folder moved");
  const isInBadFolder = await isItemInBadFolder(id);

  if (isInBadFolder) {
    console.log("The move destination is invalid. Move to default.");
    moveItemToDefaultFolder(id);
  }
};

browser.bookmarks.onCreated.addListener(handleCreateBookmark);
browser.bookmarks.onMoved.addListener(handleMoveBookmark);
browser.runtime.onInstalled.addListener(handleInstalled);

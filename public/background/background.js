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

const handleCreateBookmark = async (id, bookmarkInfo) => {
  const rootId = await getRootId();

  if (bookmarkInfo.title.includes(IN_APP_TOOLBAR_MODIFIER + rootId)) {
    console.log("Bookmark/Folder created in app in toolbar");
    let newTitle = bookmarkInfo.title.slice(
      0,
      -(IN_APP_TOOLBAR_MODIFIER + rootId).length
    );
    await browser.bookmarks.update(bookmarkInfo.id, { title: newTitle });
    return;
  }

  if (bookmarkInfo.type === "folder") {
    return;
  }

  const uncategorizedId = await getUncategorizedId();
  console.log("New bookmark created ", bookmarkInfo);
  const isInExtFolders = await isBookmarkInExtensionFolders(bookmarkInfo);
  const isInToolbar = await isBookmarkinToolbar(bookmarkInfo);

  if (!isInExtFolders && !isInToolbar) {
    await browser.bookmarks.move(bookmarkInfo.id, {
      parentId: uncategorizedId,
    });
    console.log("Moved bookmark to uncategorized ");
  }
};

const handleMoveBookmark = async (id, moveInfo) => {
  console.log("Bookmark moved");
  console.log(moveInfo);
  const isInExtFolders = await isBookmarkInExtensionFolders(moveInfo);
  const isInToolbar = await isBookmarkinToolbar(moveInfo);
  const isInRoot = await isBookmarkInExtensionRoot(moveInfo);
  const isInUncategorized = await isBookmarkInUncategorized(moveInfo);
  const bookmark = (await browser.bookmarks.get(id))[0];
  console.log("Move destination is toolbar: ", isInToolbar);
  console.log("Move destination is ext folders", isInExtFolders);
  console.log("Is in root", isInRoot);
  console.log(bookmark);

  if (
    (!isInExtFolders && !isInToolbar) ||
    (bookmark.type === "bookmark" && isInRoot) ||
    (bookmark.type === "folder" && isInUncategorized)
  ) {
    const uncategorizedId = await getUncategorizedId();
    const rootId = await getRootId();

    const newParentId = bookmark.type === "bookmark" ? uncategorizedId : rootId;

    await browser.bookmarks.move(id, {
      parentId: newParentId,
    });
    console.log("Moved bookmark to uncategorized ");
  }
};

browser.bookmarks.onCreated.addListener(handleCreateBookmark);
browser.bookmarks.onMoved.addListener(handleMoveBookmark);
browser.runtime.onInstalled.addListener(handleInstalled);

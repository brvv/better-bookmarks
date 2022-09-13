import { setupExtension } from "./modules/setup.js";
import { getRootId, getUncategorizedId, isBookmarkInExtensionFolders } from "./modules/misc.js";

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
    let newTitle = bookmarkInfo.title.slice(0, -((IN_APP_TOOLBAR_MODIFIER + rootId).length) );
    await browser.bookmarks.update(bookmarkInfo.id, {title: newTitle});
    return;
  }

  if (bookmarkInfo.type === "folder") {
    return;
  }

  const uncategorizedId = await getUncategorizedId();
  console.log("New bookmark created ", bookmarkInfo);
  const result = await isBookmarkInExtensionFolders(bookmarkInfo);

  if (! result) {
    await browser.bookmarks.move(bookmarkInfo.id, { parentId: uncategorizedId })
    console.log("Moved bookmark to uncategorized ");
  }

};

browser.bookmarks.onCreated.addListener(handleCreateBookmark);
browser.runtime.onInstalled.addListener(handleInstalled);

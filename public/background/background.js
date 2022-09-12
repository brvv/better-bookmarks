import { setupExtension } from "./modules/setup.js";
import { getRootId, getUncategorizedId, isBookmarkInExtensionFolders } from "./modules/misc.js";

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
  if (bookmarkInfo.type === "folder") {
    return;
  }

  const uncategorizedId = await getUncategorizedId();
  console.log("New bookmark created ", bookmarkInfo.title, " ", bookmarkInfo.url);
  const result = await isBookmarkInExtensionFolders(bookmarkInfo);

  if (! result) {
    await browser.bookmarks.move(bookmarkInfo.id, { parentId: uncategorizedId })
    console.log("Moved bookmark to uncategorized ");
  }

};

browser.bookmarks.onCreated.addListener(handleCreateBookmark);
browser.runtime.onInstalled.addListener(handleInstalled);

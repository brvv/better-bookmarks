import { setupExtension } from "./modules/setup.js";
import { getRootId, getUncategorizedId } from "./modules/misc.js";

const handleInstalled = (details) => {
  console.log(details.reason);

  setupExtension().then((node) => {
    console.log("setup complete!");
  });

  getRootId().then((id) => {
    console.log(id);
  });

  getUncategorizedId().then((id) => {
    console.log(id);
  });
};

browser.bookmarks.getTree().then((tree) => {
  console.log(tree[0]);
});

const handleCreateBookmark = async (id, bookmarkInfo) => {
  if (bookmarkInfo.type === "folder") {
    return;
  }

  const uncategorizedId = await getUncategorizedId();
  console.log("Here!");
  console.log(`To: ${uncategorizedId}  Target: ${bookmarkInfo.id}`);

  browser.bookmarks
    .move(bookmarkInfo.id, { parentId: uncategorizedId })
    .then((res) => {
      console.log(res);
    });
};

browser.bookmarks.onCreated.addListener(handleCreateBookmark);
browser.runtime.onInstalled.addListener(handleInstalled);

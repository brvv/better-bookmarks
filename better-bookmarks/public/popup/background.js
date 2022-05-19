function handleCreated(id, bookmarkInfo) {
  console.log(`New bookmark ID: ${id}`);
  console.log(`New bookmark URL: ${bookmarkInfo.url}`);
}
console.log("Background script loaded");
browser.bookmarks.getTree().then((tree) => {
  console.log(tree);
});

browser.bookmarks.onCreated.addListener(handleCreated);

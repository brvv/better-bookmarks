const TOOLBAR_ID = "toolbar_____";
const MENU_ID = "menu________";

const getAllBookmarks = (bookmarkTree, currentPath = "/") => {
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

const printBookmarks = (bookmarks) => {
  bookmarks.forEach((bookmark) => {
    const date = new Date(bookmark.dateAdded);
    console.log(`${bookmark.title} added on ${date.getDate()}`);
  });
};

const createRootFolder = async () => {
  return await browser.bookmarks.create({
    title: "Better Bookmarks Root",
    parentId: MENU_ID,
    type: "folder",
  });
};

//Create a root folder for the extension

const setupExtension = async (event) => {
  createRootFolder().then((node) => {
    console.log("Create root folder for bookmarks!");
  });
};

setupExtension().then(() => {
  console.log("Successful setup!");
});

/*
console.log("hello?");

browser.bookmarks.getTree().then((tree) => {
  const root = tree[0];
  console.log("here");
  console.log(root);
  const bookmarks = getAllBookmarks(root);
  printBookmarks(bookmarks);
});
*/

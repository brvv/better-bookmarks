const callback = (event) => {
  console.log("Hello?");
};

browser.bookmarks.onCreated.addListener(callback);

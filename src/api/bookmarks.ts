const convertToBookmarkFolder = (
  node: browser.bookmarks.BookmarkTreeNode
): BookmarkFolder => {
  const folder: BookmarkFolder = {
    id: node.id,
    title: node.title,
  };

  if (node.dateAdded) {
    folder.dateAdded = new Date(node.dateAdded);
  }
  if (node.dateGroupModified) {
    folder.dateGroupModified = new Date(node.dateGroupModified);
  }
  if (node.parentId) {
    folder.parentId = node.parentId;
  }
  return folder;
};

export const getFoldersFromParent = async (
  id: string
): Promise<BookmarkFolder[]> => {
  const tree = (await browser.bookmarks.getSubTree(id))[0];
  const bookmarks: BookmarkFolder[] = [];
  if (!tree.children) {
    return bookmarks;
  }
  tree.children.forEach((child) => {
    if (child.type == "folder") {
      const convertedChild = convertToBookmarkFolder(child);
      bookmarks.push(convertedChild);
    }
  });
  return bookmarks;
};

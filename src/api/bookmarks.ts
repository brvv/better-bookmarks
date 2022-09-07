import { getUncategorizedId, getRootId } from "./storage";
import { TOOLBAR_ID } from "./constants";

const parseFolderNode = (
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

const parseBookmarkNode = (
  node: browser.bookmarks.BookmarkTreeNode
): Bookmark => {
  const bookmark: Bookmark = {
    id: node.id,
    title: node.title,
  };

  if (node.url) {
    bookmark.url = node.url;
  }
  if (node.dateAdded) {
    bookmark.dateAdded = new Date(node.dateAdded);
  }
  if (node.dateGroupModified) {
    bookmark.dateGroupModified = new Date(node.dateGroupModified);
  }
  if (node.parentId) {
    bookmark.parentId = node.parentId;
  }
  return bookmark;
};

export const getFoldersFromParent = async (
  id: string
): Promise<BookmarkFolder[]> => {
  const tree = (await browser.bookmarks.getSubTree(id))[0];
  const uncategorizedId = await getUncategorizedId();
  const folders: BookmarkFolder[] = [];
  if (!tree.children) {
    return folders;
  }
  tree.children.forEach((child) => {
    if (child.type === "folder" && child.id !== uncategorizedId) {
      const convertedChild = parseFolderNode(child);
      folders.push(convertedChild);
    }
  });
  return folders;
};

export const getBookmarksFromParent = async (
  id: string
): Promise<Bookmark[]> => {
  const rootId = await getRootId();
  const uncategorizedId = await getUncategorizedId();
  const bookmarkSourceFolder = id === rootId ? uncategorizedId : id;
  const tree = (await browser.bookmarks.getSubTree(bookmarkSourceFolder))[0];
  const bookmarks: Bookmark[] = [];
  if (!tree.children) {
    return bookmarks;
  }
  tree.children.forEach((child) => {
    if (child.type === "bookmark") {
      const convertedChild = parseBookmarkNode(child);
      bookmarks.push(convertedChild);
    }
  });
  return bookmarks;
};

export const updateBookmark = async (bookmark: Bookmark): Promise<Bookmark> => {
  const newUrl = bookmark.url ? bookmark.url : "";
  const updatedBookmark = await browser.bookmarks.update(bookmark.id, {
    title: bookmark.title,
    url: newUrl,
  });
  return parseBookmarkNode(updatedBookmark);
};

export const removeBookmark = async (bookmark: Bookmark): Promise<void> => {
  await browser.bookmarks.remove(bookmark.id);
  return;
};

const getParentOfParentId = async (bookmark: Bookmark): Promise<string | undefined> => {
  if (! bookmark.parentId) {
    return;
  }

  const parentNode = await browser.bookmarks.get(bookmark.parentId);
  const parent = await parseFolderNode(parentNode[0]);
  if (!parent.parentId) {
    return;
  }
  const parentOfParent = parent.parentId;
  return parentOfParent;

}

export const moveUpBookmark = async (bookmark: Bookmark): Promise<void> => {
  if (! bookmark.parentId) {
    return;
  }

  const targetId = await getParentOfParentId(bookmark);

  if (targetId) {
    const rootId = await getRootId();
    const uncategorizedId = await getUncategorizedId();

    if (targetId === rootId || bookmark.parentId == rootId || bookmark.parentId === TOOLBAR_ID) {
      await browser.bookmarks.move(bookmark.id, {parentId : uncategorizedId})
    }
    else {
      await browser.bookmarks.move(bookmark.id, {parentId : targetId})
    }
  }

  return;
};
import { getUncategorizedId, getRootId } from "../Storage/storage";
import {
  INVALID_ROUTER_PAGES,
  IN_APP_TOOLBAR_MODIFIER,
  TOOLBAR_ID,
  BrowserNodeType,
} from "../constants";
import { parseFolderNode } from "./helpers";

export const getChildFolderNodes = async (
  parentId: string
): Promise<Folder[]> => {
  const tree = (await browser.bookmarks.getSubTree(parentId))[0];
  const uncategorizedId = await getUncategorizedId();
  const folders: Folder[] = [];
  if (!tree.children) {
    return folders;
  }
  tree.children.forEach((child) => {
    if (child.type === BrowserNodeType.Folder && child.id !== uncategorizedId) {
      const parsedChild = parseFolderNode(child);
      folders.push(parsedChild);
    }
  });
  return folders;
};

export const create = async (folder: NewFolder): Promise<Folder> => {
  const { title, parentId } = folder;
  const rootId = await getRootId();
  const originalTitle = title ? title : "no title";
  let newTitle = title;

  if (parentId === TOOLBAR_ID) {
    newTitle = newTitle + IN_APP_TOOLBAR_MODIFIER + rootId;
  }

  const newFolderNode = await browser.bookmarks.create({
    parentId: parentId,
    title: newTitle,
  });
  const resultingFolder = parseFolderNode(newFolderNode);
  return { ...resultingFolder, title: originalTitle };
};

export const isEmpty = async (folder: Folder): Promise<boolean> => {
  const folderNode = (await browser.bookmarks.getSubTree(folder.id))[0];
  if (folderNode.children && folderNode.children?.length > 0) {
    return false;
  }
  return true;
};

export const remove = async (folder: Folder): Promise<void> => {
  const res = await isEmpty(folder);
  if (res) {
    await browser.bookmarks.remove(folder.id);
  }
  return;
};

export const update = async (folder: Folder): Promise<Folder> => {
  const updatedFolder = await browser.bookmarks.update(folder.id, {
    title: folder.title,
  });
  return parseFolderNode(updatedFolder);
};

export const getPath = async (
  parentId: string
): Promise<{ title: string; id: string }[]> => {
  if (parentId === TOOLBAR_ID) {
    return [{ title: "toolbar", id: TOOLBAR_ID }];
  }

  const rootId = await getRootId();

  if (parentId === rootId) {
    return [{ title: "root", id: "" }];
  }

  let path: { title: string; id: string }[] = [];
  let currentParentId: string | undefined = parentId;

  while (
    currentParentId &&
    currentParentId !== rootId &&
    !INVALID_ROUTER_PAGES.includes(currentParentId)
  ) {
    const newParent: browser.bookmarks.BookmarkTreeNode = (
      await browser.bookmarks.get(currentParentId)
    )[0];
    const currentFolder = { title: newParent.title, id: newParent.id };
    path.push(currentFolder);
    currentParentId = newParent.parentId;
  }

  return path.reverse();
};

export const changeIndex = async (
  folder: Folder,
  newIndex: number
): Promise<void> => {
  if (!folder.parentId) {
    return;
  }
  const rootId = await getRootId();
  if (folder.parentId === rootId) {
    newIndex += 1;
  }
  await browser.bookmarks.move(folder.id, { index: newIndex });
};
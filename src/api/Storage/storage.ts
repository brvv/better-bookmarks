import { STORAGE_UNCATEGORIZED_KEY, STORAGE_ROOT_KEY } from "../constants";

export const getRootId = async (): Promise<string> => {
  const rootInfo = await browser.storage.local.get(STORAGE_ROOT_KEY);
  return rootInfo[STORAGE_ROOT_KEY].id;
};

export const getUncategorizedId = async (): Promise<string> => {
  const uncategorizedInfo = await browser.storage.local.get(
    STORAGE_UNCATEGORIZED_KEY
  );
  return uncategorizedInfo[STORAGE_UNCATEGORIZED_KEY].id;
};

import { useEffect, useState } from "react";
import { getRootId } from "../api/Storage";

import { INVALID_ROUTER_PAGES } from "../api/constants";

const isValidRouterFolderId = (targetId: string) => {
  if (INVALID_ROUTER_PAGES.includes(targetId)) {
    return false;
  }
  return true;
};

export const useRouterFolderId = (paramsFolderId: string | undefined) => {
  const [folderId, setFolderId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isRoot, setIsRoot] = useState(false);

  useEffect(() => {
    if (paramsFolderId) {
      if (isValidRouterFolderId(paramsFolderId)) {
        setFolderId(paramsFolderId);
        setIsValid(true);
        setIsLoaded(true);
      } else {
        setIsValid(false);
      }
    } else {
      getRootId().then((id) => {
        setFolderId(id);
        setIsRoot(true);
        setIsValid(true);
        setIsLoaded(true);
      });
    }
  }, [paramsFolderId]);

  return { folderId, isLoaded, isValid, isRoot };
};

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

  useEffect(() => {
    if (paramsFolderId) {
      console.log("on some other page", paramsFolderId);
      if (isValidRouterFolderId(paramsFolderId)) {
        setFolderId(paramsFolderId);
        setIsValid(true);
        setIsLoaded(true);
      } else {
        setIsValid(false);
      }
    } else {
      console.log("in root", paramsFolderId);
      getRootId().then((id) => {
        console.log("root id is", id);
        setFolderId(id);
        setIsValid(true);
        setIsLoaded(true);
      });
    }
  }, [paramsFolderId]);

  return { folderId, isLoaded, isValid };
};

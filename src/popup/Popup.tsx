import React, { useState } from "react";
import { PopupBookmarkContainer } from "./PopupBookmarkContainer";
import { PopupFolderContainer } from "./PopupFolderContainer";
import { useSearchBookmarks } from "../hooks/Bookmarks/useBookmarkSearch";
import { useSearchFolders } from "../hooks/Folders/useSearchFolders";
import { Searchbar } from "../components/tools";

export const Popup = () => {
  const [query, setQuery] = useState<string>("");

  const { bookmarks } = useSearchBookmarks({ query });
  const { folders } = useSearchFolders({ query });

  return (
    <>
      <Searchbar query={query} setQuery={setQuery} />
      <PopupBookmarkContainer bookmarks={bookmarks} />
      <PopupFolderContainer folders={folders} />
    </>
  );
};

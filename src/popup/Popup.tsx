import React, { useState } from "react";
import { PopupBookmarkContainer } from "./PopupBookmarkContainer";
import { PopupFolderContainer } from "./PopupFolderContainer";
import { useSearchBookmarks } from "../hooks/Bookmarks/useBookmarkSearch";
import { useSearchFolders } from "../hooks/Folders/useSearchFolders";
import { Searchbar } from "../components/tools";
import { useDebounce } from "../hooks/useDebounce";
import "../index.css";
import "./Popup.css";

export const Popup = () => {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 50);

  const { bookmarks } = useSearchBookmarks({ query: debouncedQuery });
  const { folders } = useSearchFolders({ query: debouncedQuery });

  return (
    <>
      <div className="popup-body">
        <Searchbar query={query} setQuery={setQuery} />
        <PopupBookmarkContainer bookmarks={bookmarks} />
        <PopupFolderContainer folders={folders} />
      </div>
    </>
  );
};

import React, { useState, useRef } from "react";
import { PopupBookmarkContainer } from "./PopupBookmarkContainer";
import { PopupFolderContainer } from "./PopupFolderContainer";
import { useSearchBookmarks } from "../hooks/Bookmarks/useBookmarkSearch";
import { useSearchFolders } from "../hooks/Folders/useSearchFolders";
import { Searchbar } from "../components/tools";
import { useDebounce } from "../hooks/useDebounce";
import "../index.css";
import "./Popup.css";
import { useAutoFocus } from "./useAutoFocus";
import { DashboardNavigator } from "./DashboardNavigator";
import { useMostRecent } from "./useGetMostRecent";

export const Popup = () => {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 50);
  const inputRef = useRef<HTMLInputElement>(null);

  const { bookmarks } = useSearchBookmarks({ query: debouncedQuery });
  const { folders } = useSearchFolders({ query: debouncedQuery });

  const mostRecent = useMostRecent({ count: 30 });

  useAutoFocus({ ref: inputRef });

  return (
    <>
      <div className="popup-body">
        <Searchbar
          query={query}
          setQuery={setQuery}
          inputRef={inputRef}
          rest={{ placeholder: "type to search..." }}
        />
        <PopupBookmarkContainer
          bookmarks={query === "" ? mostRecent.bookmarks : bookmarks}
        />
        <PopupFolderContainer folders={query === "" ? [] : folders} />
      </div>
      <DashboardNavigator />
    </>
  );
};

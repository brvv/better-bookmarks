import React, { useEffect, useState } from "react";
import {
  BookmarkSortableContainer,
  FolderSortableContainer,
} from "../../components";
import {
  getRootId,
  getBookmarksFromParent,
  getFoldersFromParent,
} from "../../api";
import { useParams } from "react-router-dom";
import { INVALID_ROUTER_PAGES } from "../../api/constants";
import { NavigationBar } from "../../components/tools/NavigationBar/NavigationBar";
import { DragDropProvider } from "../../contexts/dnd-context";

export const Main: React.FC = () => {
  const params = useParams();
  const [rootId, setRootId] = useState("");
  const [isRootIdLoaded, setIsRootIdLoaded] = useState(false);

  const [isInvalidPage, setIsInvalidPage] = useState(false);

  useEffect(() => {
    if (params.folderId) {
      setRootId(params.folderId);
      setIsRootIdLoaded(true);
    } else {
      getRootId().then((id) => {
        setRootId(id);
        setIsRootIdLoaded(true);
      });
    }
  }, [params]);

  //Bookmarks
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarksFinishedLoading, setBookmarksFinishedLoading] =
    useState(false);

  useEffect(() => {
    if (INVALID_ROUTER_PAGES.includes(rootId)) {
      setIsInvalidPage(true);
      return;
    }
    if (isRootIdLoaded) {
      getBookmarksFromParent(rootId)
        .then((newBookmarks) => {
          setBookmarks(newBookmarks);
          setBookmarksFinishedLoading(true);
        })
        .catch((error) => {
          console.log(error);
          setIsInvalidPage(true);
        });
    }
  }, [rootId]);

  //Folders
  const [folders, setFolders] = useState<Folder[]>([]);
  const [foldersFinishedLoading, setFoldersFinishedLoading] = useState(false);

  useEffect(() => {
    if (isRootIdLoaded) {
      getFoldersFromParent(rootId).then((newFolders) => {
        setFolders(newFolders);
        setFoldersFinishedLoading(true);
      });
    }
  }, [rootId]);

  return (
    <div className="App">
      {isInvalidPage ? (
        <div>This is a wrong page, idk why u are here</div>
      ) : (
        <div>
          {rootId && isRootIdLoaded && (
            <NavigationBar parentId={rootId}></NavigationBar>
          )}
          <DragDropProvider
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
            folders={folders}
            setFolders={setFolders}
          >
            {rootId && bookmarksFinishedLoading ? (
              <BookmarkSortableContainer
                parentId={rootId}
                bookmarks={bookmarks}
                setBookmarks={setBookmarks}
              />
            ) : (
              <p>Loading!</p>
            )}
            {rootId && foldersFinishedLoading ? (
              <FolderSortableContainer
                parentId={rootId}
                folders={folders}
                setFolders={setFolders}
              />
            ) : (
              <p>Loading!</p>
            )}
          </DragDropProvider>
        </div>
      )}
    </div>
  );
};

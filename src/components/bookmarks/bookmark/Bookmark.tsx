import React, { useEffect, useState, useRef } from "react";
import { CollapsableOptionsMenu } from "../../tools/CollapsableOptionsMenu/CollapsableOptionsMenu";
import "./Bookmark.css";
import { getIcon } from "../../../api";
import { useClickOutsideToggler } from "../../../hooks";

type Props = {
  bookmark: Bookmark;
  handleEdit: (bookmark: Bookmark) => void;
  handleDelete: (bookmark: Bookmark) => void;
  handleMoveUpBookmark?: (bookmark: Bookmark) => void;
  dragTransform?: { x: number; y: number };
  isBookmarkOverFolder?: boolean;
};

export const Bookmark: React.FC<Props> = ({
  bookmark,
  handleEdit,
  handleDelete,
  handleMoveUpBookmark,
}) => {
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [title, setTitle] = useState(bookmark.title);
  const [url, setUrl] = useState(bookmark.url ? bookmark.url : "");
  const bookmarkContainerRef = useRef<HTMLDivElement>(null);

  const [favicon, setFavicon] = useState("");
  const [isFaviconLoaded, setIsFaviconLoaded] = useState(false);

  const clickOutsideTrigger = useClickOutsideToggler(bookmarkContainerRef);

  useEffect(() => {
    setIsEditingActive(false);
  }, [clickOutsideTrigger]);

  useEffect(() => {
    getIcon(url).then((iconUrl) => {
      setFavicon(iconUrl);
      setIsFaviconLoaded(true);
    });
  }, [url]);

  useEffect(() => {
    if (!isEditingActive) {
      const newBookmark: Bookmark = {
        id: bookmark.id,
        title: title,
        url: url,
      };

      if (newBookmark.url) {
        try {
          new URL(newBookmark.url);
          handleEdit(newBookmark);
        } catch (error) {
          return;
        }
      }
    }
  }, [isEditingActive]);

  const handleToggleEditor = async () => {
    setIsEditingActive(!isEditingActive);
  };

  return (
    <div ref={bookmarkContainerRef}>
      {!isEditingActive ? (
        <button
          className="bookmark"
          onClick={() => {
            window.open(url, "_blank");
          }}
        >
          <div className="info-container">
            <p className="title">
              {isFaviconLoaded && (
                <img src={favicon} className="bookmark-favicon"></img>
              )}
              {title.length >= 130 ? title.substring(0, 120) + "..." : title}
            </p>
            <p className="url">
              {url.length >= 130 ? url.substring(0, 120) + "..." : url}
            </p>
          </div>
        </button>
      ) : (
        <div className="bookmark">
          <div className="info-container">
            <input
              className="input-title"
              value={title}
              onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
            ></input>
            <input
              className="input-url"
              value={url}
              onChange={(e) => setUrl((e.target as HTMLInputElement).value)}
            ></input>
          </div>
        </div>
      )}

      <CollapsableOptionsMenu
        bookmark={bookmark}
        handleToggleEditor={handleToggleEditor}
        handleDelete={handleDelete}
        handleMoveUp={handleMoveUpBookmark}
      />
    </div>
  );
};

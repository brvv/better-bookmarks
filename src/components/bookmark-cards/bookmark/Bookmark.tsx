import React, { useEffect, useState, useRef } from "react";
import { CollapsableOptionsMenu } from "../../tools/CollapsableOptionsMenu/CollapsableOptionsMenu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  dragTransform,
  isBookmarkOverFolder,
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

  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: bookmark.id });

  const style = {
    transition,
    transform:
      isDragging && dragTransform
        ? CSS.Transform.toString({
            x: dragTransform.x,
            y: dragTransform.y,
            scaleX: 1,
            scaleY: 1,
          })
        : CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const scaleDownStyle = {
    transition: "transform 200ms ease-in-out",
    transform: CSS.Transform.toString({
      x: 0,
      y: 0,
      scaleX: isBookmarkOverFolder && isDragging ? 0.8 : 1,
      scaleY: isBookmarkOverFolder && isDragging ? 0.8 : 1,
    }),
  };

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
    <div
      className="bookmark-parent"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div ref={bookmarkContainerRef} style={scaleDownStyle}>
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
    </div>
  );
};

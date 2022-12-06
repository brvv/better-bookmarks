import React, { useEffect, useState, useRef } from "react";
import { CollapsableOptionsMenu } from "../../tools/CollapsableOptionsMenu/CollapsableOptionsMenu";
import "./Bookmark.css";
import { useClickOutsideToggler } from "../../../hooks";
import { Bookmark } from "./Bookmark";
import { BookmarkEditor } from "./tools/BookmarkEditor";

type Props = {
  bookmark: Bookmark;
  handleEdit: (bookmark: Bookmark) => void;
  handleDelete: (bookmark: Bookmark) => void;
  handleMoveUpBookmark?: (bookmark: Bookmark) => void;
};

export const EditableBookmark: React.FC<Props> = ({
  bookmark,
  handleEdit,
  handleDelete,
  handleMoveUpBookmark,
}) => {
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [title, setTitle] = useState(bookmark.title);
  const [url, setUrl] = useState(bookmark.url ? bookmark.url : "");

  const bookmarkContainerRef = useRef<HTMLDivElement>(null);
  const clickOutsideTrigger = useClickOutsideToggler(bookmarkContainerRef);

  useEffect(() => {
    setIsEditingActive(false);
  }, [clickOutsideTrigger]);

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
    setIsEditingActive((prev) => !prev);
  };

  return (
    <div ref={bookmarkContainerRef}>
      {!isEditingActive ? (
        <Bookmark bookmark={bookmark} />
      ) : (
        <BookmarkEditor
          bookmark={{ id: bookmark.id, title: title, url: url }}
          setTitle={setTitle}
          setUrl={setUrl}
        />
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

import React, { useEffect, useState, useRef } from "react";

type Props = {
  parentId: string;
  handleCreateNewBookmark: (bookmark: NewBookmark) => void;
};

const defaultTitleValue = "Title";
const defaultUrlValue = "https://";

export const NewBookmarkButton: React.FC<Props> = ({
  parentId,
  handleCreateNewBookmark,
}) => {
  const newButtonContainerRef = useRef<HTMLDivElement>(null);
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [title, setTitle] = useState(defaultTitleValue);
  const [url, setUrl] = useState(defaultUrlValue);

  const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
    if (event instanceof KeyboardEvent) {
      if (event.key === "Enter") {
        setIsEditingActive(false);
      }
      return;
    }

    if (
      newButtonContainerRef &&
      newButtonContainerRef.current &&
      !newButtonContainerRef.current.contains(event.target as Node)
    ) {
      setIsEditingActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keypress", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keypress", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isEditingActive) {
      if (title && url) {
        const details: NewBookmark = {
          parentId: parentId,
          title: title,
          url: url,
        };

        if (details.url) {
          try {
            new URL(details.url);
            handleCreateNewBookmark(details);
            setTitle(defaultTitleValue);
            setUrl(defaultUrlValue);
          } catch (error) {
            return;
          }
        }
      }
    }
  }, [isEditingActive]);

  const enableEditor = async () => {
    setIsEditingActive(() => true);
  };

  return (
    <div
      className="bookmark-parent"
      onClick={enableEditor}
      ref={newButtonContainerRef}
    >
      {!isEditingActive ? (
        <div className="bookmark">
          <div className="info-container">+</div>
        </div>
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
    </div>
  );
};

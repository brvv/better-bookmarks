import React, { useEffect, useState } from "react";
import "./Bookmark.css";
import { getIcon } from "../../../api";

type Props = {
  bookmark: Bookmark;
  enableFavicon?: boolean;
};

export const Bookmark: React.FC<Props> = ({
  bookmark,
  enableFavicon = true,
}) => {
  const [favicon, setFavicon] = useState<string>("");
  const [isFaviconLoaded, setIsFaviconLoaded] = useState(false);

  useEffect(() => {
    if (!bookmark.url || !enableFavicon) {
      return;
    }
    getIcon(bookmark.url).then((iconUrl) => {
      if (iconUrl) {
        setFavicon(iconUrl);
        setIsFaviconLoaded(true);
      }
    });
  }, [bookmark.url]);

  return (
    <button
      className="bookmark"
      onClick={() => {
        window.open(bookmark.url, "_blank");
      }}
    >
      <div className="info-container">
        <p className="title">
          {isFaviconLoaded && (
            <img src={favicon} className="bookmark-favicon"></img>
          )}
          {bookmark.title}
        </p>
        <p className="url">{bookmark.url}</p>
      </div>
    </button>
  );
};

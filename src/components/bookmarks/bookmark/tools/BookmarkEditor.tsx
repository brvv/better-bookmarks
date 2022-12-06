import React, { Dispatch, SetStateAction } from "react";

type Props = {
  bookmark: Bookmark;
  setUrl: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
};

export const BookmarkEditor: React.FC<Props> = ({
  bookmark,
  setUrl,
  setTitle,
}: Props) => {
  return (
    <div className="bookmark">
      <div className="info-container">
        <input
          className="input-title"
          value={bookmark.title}
          onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
        ></input>
        <input
          className="input-url"
          value={bookmark.url}
          onChange={(e) => setUrl((e.target as HTMLInputElement).value)}
        ></input>
      </div>
    </div>
  );
};

import React, { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
};

export const BookmarkEditor: React.FC<Props> = ({
  title,
  url,
  setUrl,
  setTitle,
}: Props) => {
  return (
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
  );
};

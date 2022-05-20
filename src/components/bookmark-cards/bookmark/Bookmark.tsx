import React from "react";
import "./Bookmark.css";

type Props = {
  title: string;
  url: string;
};

export const Bookmark: React.FC<Props> = ({ title, url }) => {
  return (
    <a href="google.com" className="bookmark">
      <p className="title">{title}</p>
      <p className="url">{url}</p>
    </a>
  );
};

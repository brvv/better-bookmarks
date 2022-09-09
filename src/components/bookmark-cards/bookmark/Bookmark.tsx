import React, { useEffect, useState, useRef } from "react";
import { CollapsableOptionsMenu } from "../../tools/CollapsableOptionsMenu/CollapsableOptionsMenu";
import "./Bookmark.css";

type Props = {
  bookmark: Bookmark;
  handleEdit: (bookmark: Bookmark) => void;
  handleDelete: (bookmark: Bookmark) => void;
  handleMoveUpBookmark?: (bookmark: Bookmark) => void;
};


export const Bookmark: React.FC<Props> = ({
  bookmark,
  handleEdit,
  handleDelete,
  handleMoveUpBookmark,
}) => {

  const bookmarkContainerRef = useRef<HTMLDivElement>(null);

  const [isEditingActive, setIsEditingActive] = useState(false);
  const [title, setTitle] = useState(bookmark.title);
  const [url, setUrl] = useState(bookmark.url ? bookmark.url : "");

  useEffect(() => {
    //since this useeffect only calls on changes, not true to true or false to false
    //isEditingActive is false means that it was true before useEffect is called, meaning
    //the editor was closed
    if (! isEditingActive) {
      const newBookmark : Bookmark = {
        id: bookmark.id,
        title: title,
        url: url
      }
      handleEdit(newBookmark);
    }
  },[isEditingActive])

  const handleClickOutside = (click : MouseEvent) => {
    if (bookmarkContainerRef && bookmarkContainerRef.current && ! bookmarkContainerRef.current.contains(click.target as Node)) {
      setIsEditingActive(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [])

  const handleToggleEditor = async () => {
    setIsEditingActive(!isEditingActive);
  }
  
  

  return (
    <div className="bookmark-parent" ref={bookmarkContainerRef}>
      {! isEditingActive ?       
      <a
        href={url}
        className="bookmark"
        target="_blank"
        rel="noreferrer"
      >
        <div className="info-container">
          <p className="title">{title}</p>
          <p className="url">{url}</p>
        </div>

      </a> : 
      
      <div className="bookmark">
        <div className="info-container">
          <input 
                className="input-title" 
                value={title} 
                onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
                >
                
          </input>
          <input 
                className="input-url" 
                value={url} 
                onChange={(e) => setUrl((e.target as HTMLInputElement).value)}
                >
          
          </input>
        </div>
      </div>
      
      
      }


        <CollapsableOptionsMenu
          bookmark={bookmark}
          handleToggleEditor={handleToggleEditor}
          handleDelete={handleDelete}
          handleMoveUp={handleMoveUpBookmark}
        />
    </div>
  );
};

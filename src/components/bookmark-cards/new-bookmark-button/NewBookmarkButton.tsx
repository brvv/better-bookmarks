import React, { useEffect, useState, useRef } from "react";

type Props = {
  parentId : string;
  handleCreateNewBookmark: (bookmark: NewBookmark) => void;
};

const defaultTitleValue = "Title"
const defaultUrlValue = "https://";


export const NewBookmarkButton: React.FC<Props> = ({
  parentId,
  handleCreateNewBookmark,
}) => {

  const newButtonContainerRef = useRef<HTMLDivElement>(null);
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [title, setTitle] = useState(defaultTitleValue);
  const [url, setUrl] = useState(defaultUrlValue);

  const handleClickOutside = (click : MouseEvent) => {
    if (newButtonContainerRef && newButtonContainerRef.current && ! newButtonContainerRef.current.contains(click.target as Node)) {
      setIsEditingActive(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [])

  useEffect(() => {
    if (! isEditingActive) {
      if (title && url) {
        const details : NewBookmark= {
            parentId : parentId,
            title : title,
            url : url,
        }
        handleCreateNewBookmark(details);
        setTitle(defaultTitleValue);
        setUrl(defaultUrlValue);
      }
    }

  },[isEditingActive]);

  const enableEditor = async () => {
    setIsEditingActive(() => true);
  }

  

  return (
    <div className="bookmark-parent" onClick={enableEditor} ref={newButtonContainerRef}>
      {! isEditingActive ?       
        <div className="bookmark" >
            <div className="info-container">
              +
            </div>
        </div> 
        
        : 
      
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
    </div>
  );
};

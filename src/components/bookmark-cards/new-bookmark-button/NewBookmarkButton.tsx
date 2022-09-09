import React, { useEffect, useState } from "react";

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


  const [isEditingActive, setIsEditingActive] = useState(false);
  const [title, setTitle] = useState(defaultTitleValue);
  const [url, setUrl] = useState(defaultUrlValue);

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

  const toggleEditor = async () => {
    setIsEditingActive(() => !isEditingActive);
  }

  

  return (
    <div className="bookmark-parent" onClick={toggleEditor}>
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

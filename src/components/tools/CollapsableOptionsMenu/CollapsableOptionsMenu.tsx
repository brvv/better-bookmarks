import React from "react";
import "./CollapsableOptionsMenu.css"

type Props = {
    bookmark: Bookmark | BookmarkFolder;
    handleToggleEditor: () => void;
    handleDelete?: (bookmark: Bookmark | BookmarkFolder) => void;
    handleMoveUp?: (bookmark: Bookmark | BookmarkFolder) => void;
  };

export const CollapsableOptionsMenu: React.FC<Props> = ({
    bookmark,
    handleToggleEditor,
    handleDelete,
    handleMoveUp
}) => {
    return (
        <div className="collapsable-options-menu">
            {
                handleMoveUp &&
                <button className="invisible" onClick={() => {
                    handleMoveUp(bookmark)
                }}><img src={require("../../../assets/arrow-up-icon.png")} alt="Move up" /></button>
                
            }
            
            {
                handleDelete &&
                <button className="delete-button invisible"
                onClick={() => {
                    handleDelete(bookmark)
                }}><img src={require("../../../assets/trash-icon.png")} alt="Move up" />
                </button>
            }


            <button className="edit-button visible"
            onClick={() => {
                handleToggleEditor()
            }}><img src={require("../../../assets/pencil-edit-icon.png")} alt="Move up" />
            </button>

            

        </div>
    )
}
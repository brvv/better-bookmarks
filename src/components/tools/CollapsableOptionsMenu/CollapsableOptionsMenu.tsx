import React from "react";
import "./CollapsableOptionsMenu.css"

type Props = {
    bookmark: Bookmark;
    handleEdit: (bookmark: Bookmark) => void;
    handleDelete: (bookmark: Bookmark) => void;
    handleMoveUp?: (bookmark: Bookmark) => void;
  };

export const CollapsableOptionsMenu: React.FC<Props> = ({
    bookmark,
    handleEdit,
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
            

            <button className="delete-button invisible"
            onClick={() => {
                handleDelete(bookmark)
            }}><img src={require("../../../assets/trash-icon.png")} alt="Move up" />
            </button>

            <button className="edit-button visible"
            onClick={() => {
                handleEdit(bookmark)
            }}><img src={require("../../../assets/pencil-edit-icon.png")} alt="Move up" />
            </button>

            

        </div>
    )
}
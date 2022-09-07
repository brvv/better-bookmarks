import React from "react";
import "./CollapsableOptionsMenu.css"

type Props = {
    bookmark: Bookmark;
    handleEditClick: (bookmark: Bookmark) => void;
    handleDeleteClick: (bookmark: Bookmark) => void;
  };

export const CollapsableOptionsMenu: React.FC<Props> = ({
    bookmark,
    handleEditClick,
    handleDeleteClick,
}) => {
    return (
        <div className="collapsable-options-menu">
            <button className="invisible"><img src={require("../../../assets/arrow-up-icon.png")} alt="Move up" /></button>

            <button className="delete-button invisible"
            onClick={() => {
                handleDeleteClick(bookmark)
            }}><img src={require("../../../assets/trash-icon.png")} alt="Move up" />
            </button>

            <button className="edit-button visible"
            onClick={() => {
                handleEditClick(bookmark)
            }}><img src={require("../../../assets/pencil-edit-icon.png")} alt="Move up" />
            </button>

            

        </div>
    )
}
import React from "react";
import "./CollapsableOptionsMenu.css";

type Props = {
  bookmark: Bookmark | Folder;
  handleToggleEditor: () => void;
  handleDelete?: (bookmark: Bookmark | Folder) => void;
  handleMoveUp?: (bookmark: Bookmark | Folder) => void;
};

export const CollapsableOptionsMenu: React.FC<Props> = ({
  bookmark,
  handleToggleEditor,
  handleDelete,
  handleMoveUp,
}) => {
  return (
    <div className="collapsable-options-menu">
      {handleMoveUp && (
        <button
          className="invisible"
          title="move up one level"
          onClick={() => {
            handleMoveUp(bookmark);
          }}
        >
          <img
            src={require("../../../assets/arrow-up-icon.png")}
            alt="Move up"
          />
        </button>
      )}

      {handleDelete && (
        <button
          className="delete-button invisible"
          title="delete"
          onClick={() => {
            handleDelete(bookmark);
          }}
        >
          <img src={require("../../../assets/trash-icon.png")} alt="Move up" />
        </button>
      )}

      <button
        className="edit-button visible"
        title="edit"
        onClick={() => {
          handleToggleEditor();
        }}
      >
        <img
          src={require("../../../assets/pencil-edit-icon.png")}
          alt="Move up"
        />
      </button>
    </div>
  );
};

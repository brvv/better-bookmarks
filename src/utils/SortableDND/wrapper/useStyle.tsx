import { CSS } from "@dnd-kit/utilities";
import { useDraggedOverItem, useMouseOffset } from "../context/DragDropContext";
import { SortableItemData, SortableTransformData } from "../types";
import { InteractableItem } from "../../../api/enums";

export const useStyle = (
  item: SortableItemData,
  { transform, transition, isDragging }: SortableTransformData
) => {
  const draggedOverItem = useDraggedOverItem();
  const mouseOffset = useMouseOffset();

  const BookmarkMoveStyle = {
    transition,
    transform:
      isDragging && mouseOffset
        ? CSS.Transform.toString({
            x: mouseOffset.x,
            y: mouseOffset.y,
            scaleX: 1,
            scaleY: 1,
          })
        : CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const BookmarkScaleDownStyle = {
    transition: "transform 200ms ease-in-out",
    transform: CSS.Transform.toString({
      x: 0,
      y: 0,
      scaleX:
        isDragging &&
        draggedOverItem &&
        draggedOverItem.data.accepts &&
        draggedOverItem.data.accepts.includes(item.type) &&
        draggedOverItem.data.type !== item.type
          ? 0.8
          : 1,
      scaleY:
        isDragging &&
        draggedOverItem &&
        draggedOverItem.data.accepts &&
        draggedOverItem.data.accepts.includes(item.type) &&
        draggedOverItem.data.type !== item.type
          ? 0.8
          : 1,
    }),
  };

  const FolderMoveStyle = {
    transition,
    transform:
      isDragging && mouseOffset
        ? CSS.Transform.toString({
            x: mouseOffset.x,
            y: mouseOffset.y,
            scaleX: 1,
            scaleY: 1,
          })
        : CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    backgroundColor:
      draggedOverItem && draggedOverItem.id === item.uniqueSortableId
        ? "rgba(128, 128, 128, 0.162)"
        : "transparent",
  };

  const FolderScaleDownStyle = {};

  const DefaultMoveStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const DefaultScaleDownStyle = {};

  const MoveStyleSelector = (type: InteractableItem) => {
    switch (type) {
      case InteractableItem.Bookmark: {
        return BookmarkMoveStyle;
      }
      case InteractableItem.Folder: {
        return FolderMoveStyle;
      }
      case InteractableItem.NavigationBarItem: {
        return FolderMoveStyle;
      }
      case InteractableItem.Toolbar: {
        return FolderMoveStyle;
      }
      default: {
        return DefaultMoveStyle;
      }
    }
  };

  const ScaleDownStyleSelector = (type: InteractableItem) => {
    switch (type) {
      case InteractableItem.Bookmark: {
        return BookmarkScaleDownStyle;
      }
      case InteractableItem.Folder: {
        return FolderScaleDownStyle;
      }
      default: {
        return DefaultScaleDownStyle;
      }
    }
  };

  return {
    mainStyle: MoveStyleSelector(item.type),
    scaleDownStyle: ScaleDownStyleSelector(item.type),
  };
};

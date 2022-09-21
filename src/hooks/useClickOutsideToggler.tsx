import React, { useState, useEffect } from "react";

export const useClickOutsideToggler = (
  ref: React.RefObject<HTMLElement>
): boolean => {
  const [toggleOnOutsideClick, setToggleOnOutsideClick] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keypress", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keypress", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
    if (event instanceof KeyboardEvent) {
      if (event.key === "Enter") {
        setToggleOnOutsideClick(
          (toggleOnOutsideClick) => !toggleOnOutsideClick
        );
      }
      return;
    }

    if (ref && ref.current && !ref.current.contains(event.target as Node)) {
      setToggleOnOutsideClick((toggleOnOutsideClick) => !toggleOnOutsideClick);
    }
  };

  return toggleOnOutsideClick;
};

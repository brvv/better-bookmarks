import React, { useState, useEffect } from "react";

export const useClickOutsideToggler = (
  ref: React.RefObject<HTMLElement>
): boolean => {
  const [toggleOnOutsideClick, setToggleOnOutsideClick] = useState(false);

  const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
    if (event instanceof KeyboardEvent) {
      if (event.key === "Enter") {
        setToggleOnOutsideClick((current) => !current);
      }
      return;
    }

    if (ref && ref.current && !ref.current.contains(event.target as Node)) {
      setToggleOnOutsideClick((current) => !current);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keypress", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keypress", handleClickOutside);
    };
  }, []);

  return toggleOnOutsideClick;
};

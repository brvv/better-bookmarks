import { useEffect } from "react";

type Props = {
  ref: React.RefObject<HTMLInputElement>;
};

export const useAutoFocus = ({ ref }: Props) => {
  useEffect(() => {
    if (ref) {
      ref.current?.focus();
    }
  }, []);
};

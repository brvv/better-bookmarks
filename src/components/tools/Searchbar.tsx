import React, { Dispatch, SetStateAction } from "react";

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  rest?: React.HTMLAttributes<HTMLInputElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
};

export const Searchbar = ({ query, setQuery, rest, inputRef }: Props) => {
  return (
    <input
      {...rest}
      style={{ width: "100%" }}
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputRef}
    />
  );
};

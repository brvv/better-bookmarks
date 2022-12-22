import React, { Dispatch, SetStateAction } from "react";

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  rest?: React.HTMLAttributes<HTMLInputElement>;
};

export const Searchbar = ({ query, setQuery, rest }: Props) => {
  return (
    <input
      {...rest}
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
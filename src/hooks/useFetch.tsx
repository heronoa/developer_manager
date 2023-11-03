import { useContext } from "react";

import { FetchContext } from "../context/FetchContext";

export const useFetch = () => {
  const context = useContext(FetchContext);

  return context;
};

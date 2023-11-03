import { createContext, ReactNode, useEffect, useState } from "react";
import useSWR from "swr";

import { ISWR } from "../@types";
import { fetcher, SWRCacheKeyGetters } from "../services/swr";

interface IFetchProvider {
  children: ReactNode;
}

interface FetchContextProps {
  exampleData: any;
  isLoadingExampleData: boolean;
  errorExampleData: any;
}

export const FetchContext = createContext({} as FetchContextProps);

export const FetchProvider = ({ children }: IFetchProvider) => {
  const {
    data: exampleData,
    isLoading: isLoadingExampleData,
    error: errorExampleData,
  }: ISWR = useSWR(SWRCacheKeyGetters.getExampleData(), fetcher);

  return (
    <FetchContext.Provider
      value={{
        exampleData,
        isLoadingExampleData,
        errorExampleData,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

import axios from "axios";
import { mutate } from "swr";

import { exampleUrl } from "../../utils/constants";

export class SWRCacheKeyGetters {
  static getExampleData = () => {
    return `${exampleUrl}/todos/1`;
  };
}

export const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const SWRTimedCacheOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
  dedupingInterval: Number(process.env.swrTimedCacheExpiration),
};

export const mutateApiData = async (
  key: any,
  fetcher: (url: string) => Promise<any>,
) => {
  const data = await fetcher(key);
  mutate(key, data);
  return false;
};

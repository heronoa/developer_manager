type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export interface ISWR {
  data: any;
  error: any;
  isValidating: boolean;
  isLoading: boolean;
}

interface INavData {
  displayName: string;
  path?: string;
  subpaths?: Omit<INavData, "subpaths">[];
}

export type INavLinks = RequireOnlyOne<INavData, "path" | "subpaths">[];

export interface IImageHiperlink {
  id: string;
  path: string;
  src: string;
  alt: string;
}

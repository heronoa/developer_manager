import { RegisterOptions } from "react-hook-form";

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
export interface IUserType {
  email: string | null;
  uid: string | null;
}

export interface ILoginType {
  email: string;
  password: string;
}

export interface SignupType extends ILoginType {
  password_confirm: string;
}

export type IFormRegisterType = Partial<{
  [key: string]: string;
}> & ILoginType & SignupType;

export type IFormFieldOptions = RegisterOptions & {
  fieldType: string;
  fieldLabel?: string;
  labelClassName?: string;
  errorClassName?: string;
  inputClassName?: string;
};

export interface IFormFieldType {
  [formName: string]: IFormFieldOptions;
}

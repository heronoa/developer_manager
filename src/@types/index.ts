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

type ObtainKeys<Obj, Type> = {
  [Prop in keyof Obj]: Obj[Prop] extends Type ? Prop : never;
}[keyof Obj];

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

export interface IRestrictedDataType {
  uid: string;
  workType: string;
  phone: string;
  rg: string;
  cpf: string;
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
}> &
  ILoginType &
  SignupType;

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
export interface IComments {
  date: Date;
  text: string;
  user_id: string;
}
export interface IDateObj {
  seconds: number;
  nanoseconds: number;
}
export interface IProjectDataType {
  id: string;
  name: string;
  deadline: IDateObj;
  description: string;
  stack: string[];
  teamUids: string[];
  comments: IComments[];
  startDate: IDateObj;
}

export type IUserDataType = IUserType & {
  permissionLevel: string;
  occupation: string[];
  projects: string[];
  name: string;
  birthday: IDateObj;
  uid: string;
};

type IFilterKeys =
  | ObtainKeys<Omit<IProjectDataType, "id">, string | IDateObj | Array<string>>
  | ObtainKeys<
      Omit<IUserDataType, "uid">,
      string | IDateObj | Array<string> | null
    >;

export type IFilterKeyOption = IFilterKeys;

export type IFilterOptions = {
  [key in IFilterKeyOption]?: string | { ASC: boolean };
};

type IDataItems = IProjectDataType & IUserDataType;

type ItemsUniqueType = {
  [K in keyof IDataItems]: IDataItems[K];
}[keyof IDataItems];

export type IFormatItem = ItemsUniqueType;

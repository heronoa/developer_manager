import { createContext, ReactNode, useEffect, useState } from "react";

import { db } from "@/config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { IRestrictedDataType, IUserDataType } from "@/@types";

interface IUsersProvider {
  children: ReactNode;
}

interface UsersContextProps {
  allUsers: IUserDataType[];
}

export const UsersContext = createContext({} as UsersContextProps);

export const UsersProvider = ({ children }: IUsersProvider) => {
  const { user, activeUserData } = useAuth();
  const [allUsers, setAllUsers] = useState<IUserDataType[]>([]);
  const [allRestrictedData, setAllRestrictedData] = useState<
    IRestrictedDataType[]
  >([]);

  const getAllUsers = async () => {
    const usersArray: IUserDataType[] = [];
    const querySnapshot = await getDocs(collection(db, "usuários"));
    querySnapshot.forEach(doc => {
      usersArray.push(doc.data() as IUserDataType);
    });
    return usersArray;
  };
  const getAllRestrictedData = async () => {
    const restrictedArray: IRestrictedDataType[] = [];
    const querySnapshot = await getDocs(collection(db, "dados-restritos"));
    querySnapshot.forEach(doc => {
      restrictedArray.push(doc.data() as IRestrictedDataType);
    });
    return restrictedArray;
  };

  useEffect(() => {
    if (user && activeUserData) {
      const fetcher = async () => {
        setAllUsers((await getAllUsers()) as IUserDataType[]);
        if (+activeUserData.permissionLevel > 1) {
          setAllRestrictedData(
            (await getAllRestrictedData()) as IRestrictedDataType[],
          );
        }
      };
      if (activeUserData) {
        fetcher();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, activeUserData]);

  return (
    <UsersContext.Provider value={{ allUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

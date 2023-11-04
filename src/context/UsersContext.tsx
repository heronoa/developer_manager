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
  loading: boolean;
  error: any | undefined;
}

export const UsersContext = createContext({} as UsersContextProps);

export const UsersProvider = ({ children }: IUsersProvider) => {
  const { user, activeUserData } = useAuth();
  const [allUsers, setAllUsers] = useState<IUserDataType[]>([]);
  const [error, setError] = useState<any | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [allRestrictedData, setAllRestrictedData] = useState<
    IRestrictedDataType[]
  >([]);

  const getAllUsers = async () => {
    try {
      const usersArray: IUserDataType[] = [];
      const querySnapshot = await getDocs(collection(db, "usuários"));
      querySnapshot.forEach(doc => {
        usersArray.push(doc.data() as IUserDataType);
      });
      return usersArray;
    } catch (error) {
      setError(error);
    }
  };
  const getAllRestrictedData = async () => {
    try {
      const restrictedArray: IRestrictedDataType[] = [];
      const querySnapshot = await getDocs(collection(db, "dados-restritos"));
      querySnapshot.forEach(doc => {
        restrictedArray.push(doc.data() as IRestrictedDataType);
      });
      return restrictedArray;
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    setLoading(true);
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
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, activeUserData]);

  return (
    <UsersContext.Provider value={{ allUsers, loading, error }}>
      {children}
    </UsersContext.Provider>
  );
};

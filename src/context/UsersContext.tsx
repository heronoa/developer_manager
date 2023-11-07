import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { db } from "@/config/firebase";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { IProjectDataType, IRestrictedDataType, IUserDataType } from "@/@types";

interface IUsersProvider {
  children: ReactNode;
}

interface UsersContextProps {
  allUsers: IUserDataType[];
  loading: boolean;
  error: any | undefined;
  updateUsersProjects: (newProject: IProjectDataType) => Promise<void>;
  removingUsersProjects: (oldProject: IProjectDataType) => Promise<void>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  findUser: (uid: string) => IUserDataType | undefined;
}

export const UsersContext = createContext({} as UsersContextProps);

export const UsersProvider = ({ children }: IUsersProvider) => {
  const { user, activeUserData } = useAuth();
  const [allUsers, setAllUsers] = useState<IUserDataType[]>([]);
  const [error, setError] = useState<any | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [update, setUpdate] = useState<boolean>(true);
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

  const findUser = (uid: string) => {
    return allUsers.find(e => e.uid === uid);
  };

  const updateUsersProjects = async (newProject: IProjectDataType) => {
    // TODO: Atualizar usuarios adicionados no projeto novo
    try {
      for (let i = 0; i < newProject.teamUids.length; i++) {
        const q = query(
          collection(db, "usuários"),
          where("uid", "==", newProject.teamUids[i]),
        );
        const querySnapshot = await getDocs(q);
        const docId: string[] = [];
        querySnapshot.forEach(e => docId.push(e.id));
        const userRef = doc(db, "usuários", docId[0]);
        const userData = allUsers.find(e => e.uid === newProject.teamUids[i]);
        if (userData) {
          const projectsCopy = JSON.parse(JSON.stringify(userData.projects));
          if (!projectsCopy.includes(newProject.id)) {
            projectsCopy.push(newProject.id);
          }
          await updateDoc(userRef, {
            projects: projectsCopy,
          });
        }
      }
      setUpdate(e => !e);
    } catch (error) {
      console.error(error);
    }
  };

  const removingUsersProjects = async (oldProject: IProjectDataType) => {
    // TODO: Atualizar usuarios adicionados no projeto novo
    try {
      for (let i = 0; i < oldProject.teamUids.length; i++) {
        const q = query(
          collection(db, "usuários"),
          where("uid", "==", oldProject.teamUids[i]),
        );
        const querySnapshot = await getDocs(q);
        const docId: string[] = [];
        querySnapshot.forEach(e => docId.push(e.id));
        const userRef = doc(db, "usuários", docId[0]);
        const userData = allUsers.find(e => e.uid === oldProject.teamUids[i]);
        if (userData) {
          const projectsCopy = JSON.parse(JSON.stringify(userData.projects));
          if (projectsCopy.includes(oldProject.id)) {
            projectsCopy.splice(projectsCopy.indexOf(oldProject.id), 1);
          }
          await updateDoc(userRef, {
            projects: projectsCopy,
          });
        }
      }
      setUpdate(e => !e);
    } catch (error) {
      console.error(error);
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
  }, [user, activeUserData, update]);

  return (
    <UsersContext.Provider
      value={{
        allUsers,
        loading,
        error,
        updateUsersProjects,
        removingUsersProjects,
        setUpdate,
        findUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

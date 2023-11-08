import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { db, firebaseConfig } from "@/config/firebase";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  where,
  query,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import {
  ILoginType,
  IProjectDataType,
  IRestrictedDataType,
  ISignupType,
  IUserDataType,
} from "@/@types";
import firebase from "firebase/compat/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";

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
  getRestrictedData: (uid: string) => Promise<IRestrictedDataType | undefined>;
  createUser: (
    user: IUserDataType & ISignupType & IRestrictedDataType,
  ) => Promise<void>;
  deleteUser: (uid: string) => Promise<void>
}

export const UsersContext = createContext({} as UsersContextProps);

export const UsersProvider = ({ children }: IUsersProvider) => {
  const { user, activeUserData } = useAuth();
  const [allUsers, setAllUsers] = useState<IUserDataType[]>([]);
  const [error, setError] = useState<any | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [update, setUpdate] = useState<boolean>(true);

  const createUser = async (
    user: IUserDataType & ISignupType & IRestrictedDataType,
  ) => {
    const secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");

    createUserWithEmailAndPassword(
      getAuth(secondaryApp),
      user.email as string,
      user.password as string,
    )
      .then(async firebaseUser => {
        console.log(
          "User " + firebaseUser.user?.uid + " created successfully!",
        );
        try {
          if (firebaseUser.user?.uid) {
            user.uid = firebaseUser.user?.uid;
            user.permissionLevel = user.occupation.includes("gerente")
              ? "2"
              : "1";
            user.projects = [];
            const { workType, telefone, rg, cpf } = user;
            const {
              permissionLevel,
              occupation,
              projects,
              name,
              birthday,
              email,
            } = user;

            await addDoc(collection(db, "usuários"), {
              uid: user.uid,
              permissionLevel,
              occupation,
              projects,
              name,
              birthday,
              email,
            });
            await addDoc(collection(db, "dados-restritos"), {
              uid: user.uid,
              workType,
              telefone,
              rg,
              cpf,
            });
          }
        } catch (error) {
          console.error(error);
          setError(error);
        }
        signOut(getAuth(secondaryApp));
      })
      .finally(() => {
        setUpdate(prevState => !prevState);
      });
  };

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
  const getRestrictedData = async (uid: string) => {
    if (parseInt(activeUserData?.permissionLevel || "0") > 1) {
      try {
        const restrictedArray: IRestrictedDataType[] = [];
        const q = query(
          collection(db, "dados-restritos"),
          where("uid", "==", uid),
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          restrictedArray.push(doc.data() as IRestrictedDataType);
        });
        return restrictedArray[0];
      } catch (error) {
        setError(error);
      }
    }
  };

  const findUser = (uid: string) => {
    return allUsers.find(e => e.uid === uid);
  };

  const updateUsersProjects = async (newProject: IProjectDataType) => {
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

  const deleteUser = async (uid: string) => {
    const q = query(collection(db, "usuários"), where("id", "==", uid));
    const docId: any[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => docId.push(doc.id));
    await deleteDoc(doc(db, "usuários", docId[0]));
    setUpdate(e => !e);

  };

  useEffect(() => {
    setLoading(true);
    if (user && activeUserData) {
      const fetcher = async () => {
        setAllUsers((await getAllUsers()) as IUserDataType[]);
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
        getRestrictedData,
        createUser,
        deleteUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

import {
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { IUserDataType, IUserType } from "@/@types";
import { collection, getDocs, query, where } from "firebase/firestore";

interface IAuthProvider {
  children: ReactNode;
}

interface AuthContextProps {
  user: IUserType;
  activeUserData: IUserDataType | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  changeUserPassword: (newPassword: string) => Promise<void>;
  changeUserEmail: (newEmail: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUserType>({ email: null, uid: null });
  const [activeUserData, setActiveUserData] = useState<IUserDataType | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
  };

  const changeUserPassword = async (newPassword: string) => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        await updatePassword(currentUser, newPassword);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeUserEmail = async (newEmail: string) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await updateEmail(currentUser, newEmail);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const getActiveUserData = async () => {
    try {
      let userData = null;
      const q = query(collection(db, "usuários"), where("uid", "==", user.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        userData = doc.data();
      });
      return userData;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetcher = async () => {
      setActiveUserData((await getActiveUserData()) as IUserDataType | null);
    };
    if (user) {
      fetcher();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        activeUserData,
        loading,
        signUp,
        logIn,
        logOut,
        changeUserPassword,
        changeUserEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

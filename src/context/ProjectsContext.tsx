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
  addDoc,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { IProjectDataType } from "@/@types";

interface IProjectsProvider {
  children: ReactNode;
}

interface ProjectsContextProps {
  allProjects: IProjectDataType[];
  loading: boolean;
  error: any | undefined;
  sendNewProject: (newProject: IProjectDataType) => Promise<void>;
  updateProjects: (projectPart: Partial<IProjectDataType>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
}

export const ProjectsContext = createContext({} as ProjectsContextProps);

export const ProjectsProvider = ({ children }: IProjectsProvider) => {
  const { user, activeUserData } = useAuth();
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [error, setError] = useState<any | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [update, setUpdate] = useState<boolean>(false);

  const updateProjects = async (projectPart: Partial<IProjectDataType>) => {
    if (parseInt(activeUserData?.permissionLevel || "0") > 1) {
      try {
        const q = query(
          collection(db, "projects"),
          where("id", "==", projectPart.id),
        );
        const querySnapshot = await getDocs(q);
        const docId: string[] = [];
        querySnapshot.forEach(e => docId.push(e.id));
        const projectRef = doc(db, "projects", docId[0]);
        await updateDoc(projectRef, projectPart);
        setUpdate(e => !e);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteProject = async (id: string) => {
    const q = query(collection(db, "projects"), where("id", "==", id));
    const docId: any[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => docId.push(doc.id));
    // await deleteDoc(doc(db, "cities", "DC"));
    await deleteDoc(doc(db, "projects", docId[0]));
    setUpdate(e => !e);

  };

  const sendNewProject = async (newProject: IProjectDataType) => {
    setLoading(true);
    try {
      await addDoc(collection(db, "projects"), newProject);
      setUpdate(prevState => !prevState);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };

  const getAllProjects = async () => {
    try {
      const projectArray: IProjectDataType[] = [];
      const querySnapshot = await getDocs(collection(db, "projects"));
      querySnapshot.forEach(doc => {
        projectArray.push(doc.data() as IProjectDataType);
      });
      return projectArray;
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  useEffect(() => {
    setLoading(true);

    if (user) {
      const fetcher = async () => {
        setAllProjects((await getAllProjects()) as IProjectDataType[]);
      };
      if (user) {
        fetcher();
      }
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, update]);
  return (
    <ProjectsContext.Provider
      value={{
        allProjects,
        error,
        loading,
        sendNewProject,
        setUpdate,
        updateProjects,
        deleteProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

import { createContext, ReactNode, useEffect, useState } from "react";

import { fetcher, SWRCacheKeyGetters } from "../services/swr";
import { db } from "@/config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { IProjectDataType } from "@/@types";

interface IProjectsProvider {
  children: ReactNode;
}

interface ProjectsContextProps {
  allProjects: IProjectDataType[];
}

export const ProjectsContext = createContext({} as ProjectsContextProps);

export const ProjectsProvider = ({ children }: IProjectsProvider) => {
  const { user } = useAuth();
  const [allProjects, setAllProjects] = useState<any[]>([]);

  const getAllProjects = async () => {
    const projectArray: IProjectDataType[] = [];
    const querySnapshot = await getDocs(collection(db, "projects"));
    querySnapshot.forEach(doc => {
      projectArray.push(doc.data() as IProjectDataType);
    });

    return projectArray;
  };

  useEffect(() => {
    if (user) {
      const fetcher = async () => {
        setAllProjects((await getAllProjects()) as IProjectDataType[]);
      };
      if (user) {
        fetcher();
      }

      getAllProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <ProjectsContext.Provider value={{ allProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

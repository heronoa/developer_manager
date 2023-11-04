import { useContext } from "react";

import { ProjectsContext } from "../context/ProjectsContext";

export const useProjects = () => {
  const context = useContext(ProjectsContext);

  return context;
};

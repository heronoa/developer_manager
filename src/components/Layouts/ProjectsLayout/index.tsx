import { useProjects } from "@/hooks/useProjects";

const ProjectsLayout = () => {
  const { allProjects } = useProjects();

  console.log({ allProjects });

  return <div></div>;
};

export default ProjectsLayout;

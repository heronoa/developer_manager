import { IProjectDataType } from "@/@types";
import ProjectDetailsHeaderFrame from "@/components/Frames/Project/ProjectDetailsHeaderFrame";
import BackButton from "@/components/UI/BackButton";
import ProjectListsFrame from "@/components/Frames/Project/ProjectListsFrame";
import ProjectCommentsFrame from "../../Frames/Project/ProjectCommentsFrame";

interface Props {
  project?: IProjectDataType;
}

const ProjectDetailsLayout = ({ project }: Props) => {
  if (!project) {
    return <div className="dark:text-white">Projeto não encontrado</div>;
  }
  return (
    <section className="flex relative justify-start gap-4 items-center flex-col px-12 shadow-lg min-h-[75vh] dark:text-white">
      <BackButton path={"/projects"} />
      <ProjectDetailsHeaderFrame project={project} />
      <ProjectListsFrame project={project} />
      <ProjectCommentsFrame project={project} />
    </section>
  );
};

export default ProjectDetailsLayout;

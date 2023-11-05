import Loading from "@/components/UI/Loading";
import { Meta } from "@/layout/meta";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LazyProjects = dynamic(
    () => import("@/components/Layouts/ProjectsLayout"),
    { suspense: true },
  );

const Projects = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Meta
        title={"Gerenciamento Dev - Projetos"}
        description={"Veja todos os projetos da empresa aqui"}
      />
      <LazyProjects />
    </Suspense>
  );
};

export default Projects

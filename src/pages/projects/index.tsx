import Loading from "@/components/UI/Loading";
import { Meta } from "@/layout/meta";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LazyColaborators = dynamic(
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
      <LazyColaborators />
    </Suspense>
  );
};

export default Projects

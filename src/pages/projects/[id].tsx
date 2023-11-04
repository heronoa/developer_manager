import Loading from "@/components/UI/Loading";
import { Meta } from "@/layout/meta";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LazyProjectDetailsLayout = dynamic(
    () => import("@/components/Layouts/ProjectDetailsLayout"),
    { suspense: true },
  );

const Colaborators = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Meta
        title={"Gerenciamento Dev - ${nome}"}
        description={"Perfil do colaborador ${nome}"}
      />
      <LazyProjectDetailsLayout />
    </Suspense>
  );
};

export default Colaborators

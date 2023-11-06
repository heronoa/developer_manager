import Loading from "@/components/UI/Loading";
import { Meta } from "@/layout/meta";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LazyColaboratorDetails = dynamic(
    () => import("@/components/Layouts/ColaboratorDetailsLayout"),
    { suspense: true },
  );

const ColaboratorDetails = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Meta
        title={"Gerenciamento Dev - ${nome}"}
        description={"Perfil do colaborador ${nome}"}
      />
      <LazyColaboratorDetails />
    </Suspense>
  );
};

export default ColaboratorDetails

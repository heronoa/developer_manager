import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Loading from "@/components/UI/Loading";
import { Meta } from "@/layout/meta";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LazyDashboard = dynamic(
  () => import("@/components/Layouts/DashboardLayout"),
  { suspense: true },
);

const DashboardPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Meta
        title={"Gerenciamento Dev - Dashboard"}
        description={
          "Aqui você pode ter uma noção geral de todo nosso trabalho"
        }
      />
      <LazyDashboard />
    </Suspense>
  );
};

export default DashboardPage;

import ColaboratorsChartsFrame from "@/components/Frames/Dashboard/ColaboratorsChartFrame";
import MainNumbersFrame from "@/components/Frames/Dashboard/MainNumbersFrame";

const DashboardLayout = () => {

  return (
    <section className="flex items-center flex-col dark:text-white shadow-2xl min-h-[80vh] m-4">
      <h3>Painel</h3>
      <div className="w-full flex flex-col gap-4 justify-center mt-12">
        <MainNumbersFrame />
        <ColaboratorsChartsFrame />
      </div>
    </section>
  );
};

export default DashboardLayout;

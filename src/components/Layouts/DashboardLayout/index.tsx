import MainNumbersFrame from "@/components/Frames/MainNumbersFrame";

const DashboardLayout = () => {

  return (
    <section className="flex items-center flex-col dark:text-white shadow-2xl min-h-[80vh] m-4">
      <h3>Painel</h3>
      <div className="w-full flex flex-col justify-center mt-12">
        <MainNumbersFrame />
      </div>
    </section>
  );
};

export default DashboardLayout;

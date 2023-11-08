import ColaboratorsChartsFrame from "@/components/Frames/Dashboard/ColaboratorsChartFrame";
import MainNumbersFrame from "@/components/Frames/Dashboard/MainNumbersFrame";
import ProjectsChartsFrame from "@/components/Frames/Dashboard/ProjectsChartFrame";
import FadeIn from "@/components/UI/Animations/FadeIn";
import { Transition } from "@headlessui/react";
import { useState, useEffect } from "react";

const DashboardLayout = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  return (
    <section className="flex items-center flex-col dark:text-white shadow-2xl min-h-[80vh] m-4">
      <h3>Painel</h3>
      <div className="w-full flex flex-col gap-4 justify-center mt-12">
        <Transition.Root show={mounted}>
          <FadeIn delay="delay-[300ms]">
            <MainNumbersFrame />
          </FadeIn>
          <FadeIn delay="delay-[600ms]">
            <ColaboratorsChartsFrame />
          </FadeIn>
          <FadeIn delay="delay-[900ms]">
            <ProjectsChartsFrame />
          </FadeIn>
        </Transition.Root>
      </div>
    </section>
  );
};

export default DashboardLayout;

import { IFilterOptions } from "@/@types";
import FilterOptionsPanel from "@/components/UI/FilterOptionsPanel";
import RenderItems from "@/components/UI/RenderItems";
import { useProjects } from "@/hooks/useProjects";
import { useState } from "react";

const ProjectsLayout = () => {
  const { allProjects, error, loading } = useProjects();


  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
    name: "",
    deadline: { ASC: null },
    stack: "",
    startDate: { ASC: null },
    teamUids: { ASC: null },
  });

  return (
    <section className="flex items-center flex-col dark:text-white shadow-2xl min-h-[80vh] m-4">
      <h3>Projetos</h3>
      <div className="w-full flex flex-col justify-center mt-12">
        <div className="">
          <FilterOptionsPanel
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </div>
        <div className="w-full flex flex-col justify-center">
          <RenderItems
            arrayItems={allProjects}
            error={error}
            loading={loading}
            filterOptions={filterOptions}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectsLayout;

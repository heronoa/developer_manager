import { useUsers } from "@/hooks/useUsers";
import UserDataItem from "@/components/Items/UserDataItem";
import { IFilterOptions } from "@/@types";
import { useState } from "react";
import FilterOptionsPanel from "@/components/UI/FilterOptionsPanel";
import RenderItems from "@/components/UI/RenderItems";

const ColaboratorsLayout = () => {
  const { allUsers, loading, error } = useUsers();

  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
    name: "",
    age: { ASC: null },
    email: "",
    occupation: "",
    projects: { ASC: null },
    permissionLevel: { ASC: null },
  });

  return (
    <section className="flex items-center flex-col dark:text-white shadow-2xl min-h-[80vh] m-4">
      <h3>Colaboradores</h3>
      <div className="w-full flex flex-col justify-center mt-12">
        <div className="">
          <FilterOptionsPanel filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
        </div>
        <div className="w-full flex flex-col justify-center">
          <RenderItems
            type="users"
            arrayItems={allUsers}
            error={error}
            loading={loading}
            filterOptions={filterOptions}
          />
        </div>
      </div>
    </section>
  );
};

export default ColaboratorsLayout;

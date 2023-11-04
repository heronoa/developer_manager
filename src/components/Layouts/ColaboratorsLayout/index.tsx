import { useUsers } from "@/hooks/useUsers";
import { renderItems } from "@/services/renderFunctions";
import UserDataItem from "@/components/Items/UserDataItem";
import { IFilterOptions } from "@/@types";
import { useState } from "react";
import FilterOptionsPanel from "@/components/UI/FilterOptionsPanel";
import RenderItems from "@/components/UI/RenderItems";

const ColaboratorsLayout = () => {
  const { allUsers, loading, error } = useUsers();

  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
    name: "",
  });

  return (
    <section className="flex items-center flex-col dark:text-white shadow-2xl min-h-[80vh] m-4">
      <h3>Colaboradores</h3>
      <div>
        <FilterOptionsPanel />
      </div>
      <div className="w-full mt-24 flex flex-col justify-center">
        <RenderItems
          type="users"
          arrayItems={allUsers}
          error={error}
          loading={loading}
        />
      </div>
    </section>
  );
};

export default ColaboratorsLayout;

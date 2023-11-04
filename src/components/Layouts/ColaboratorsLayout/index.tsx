import { useUsers } from "@/hooks/useUsers";
import { renderItems } from "@/services/renderFunctions";
import UserDataItem from "@/components/Items/UserDataItem";

const ColaboratorsLayout = () => {
  const { allUsers, loading, error } = useUsers();

  return (
    <section className="flex items-center flex-col">
      <h3>Colaboradores</h3>
      <div id="data-header"></div>
      <div className="w-full mt-24">
        {renderItems({
          type: "users",
          arrayItems: allUsers,
          error,
          loading,
        })}
      </div>
    </section>
  );
};

export default ColaboratorsLayout;

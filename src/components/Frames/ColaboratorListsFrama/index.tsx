import { IProjectDataType, IUserDataType } from "@/@types";
import TinyItem from "@/components/UI/Items/TinyItem";
import { useProjects } from "@/hooks/useProjects";
import { translateItemKeys } from "@/services/format";

interface Props {
  user: IUserDataType;
}

const ColaboratorListsFrame = ({ user }: Props) => {
  const { allProjects } = useProjects();

  const findProject = (id: String) => {
    return allProjects.find(e => e.id === id);
  };

  return (
    <div className="frame-container">
      <div className="grid md:grid-cols-2 grid-cols-1 justify-evenly gap-4 w-full">
        {Object.entries({
          projects: user.projects,
          occupation: user.occupation,
        }).map(([objKey, objValue], index) => {
          return (
            <div key={index}>
              <span className="font-semibold mr-2">
                {translateItemKeys(objKey as any)}:
              </span>
              <div
                className={`${
                  objKey === "projects" ? "flex-col" : ""
                }  flex flex-wrap`}
              >
                {(objValue as string[]).map((e, index) => {
                  let value: string | IProjectDataType = e;
                  if (objKey === "projects") {
                    value = findProject(e) || e;
                  }
                  if (typeof value === "string") {
                    return <TinyItem key={index} value={value} />;
                  }
                  return <div key={index}>{value?.name}</div>;
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-end mt-4 border-t-gray-300 border-t pt-4">
        <button className="btn !max-w-[200px] text-white !bg-red-600 hover:!bg-red-800">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ColaboratorListsFrame;

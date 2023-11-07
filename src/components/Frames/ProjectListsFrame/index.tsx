import { IDateObj, IProjectDataType } from "@/@types";
import EdittableListItems from "@/components/UI/Items/EdittableListItems";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";

interface Props {
  project: IProjectDataType;
}

const ProjectListsFrame = ({ project }: Props) => {
  const { activeUserData } = useAuth();

  const { updateProjects } = useProjects();

  const [stack, setStack] = useState<string[]>();
  const [teamUids, setTeamUids] = useState<string[]>();

  const [edittables, setEdittables] = useState({ stack, teamUids });

  const submitEdittable = async (key: keyof IProjectDataType) => {
    const obj: any = { id: project.id };
    obj[key] = edittables[key as "stack" | "teamUids"];
    console.log(obj);
    // await updateProjects(obj);
    // handleChangeEdittables(key, undefined);
  };

  return (
    <div className="frame-container">
      <div className="grid md:grid-cols-2 grid-cols-1 justify-evenly gap-4 w-full">
        {Object.entries({
          teamUids: project.teamUids,
          stack: project.stack,
        }).map((objEntries, index) => {
          if (objEntries[0] === "stack")
            return (
              <EdittableListItems
                key={index}
                state={stack}
                setState={setStack}
                objEntries={objEntries}
              />
            );
          return (
            <EdittableListItems
              key={index}
              state={teamUids}
              setState={setTeamUids}
              objEntries={objEntries}
            />
          );
        })}
      </div>
      {parseInt(activeUserData?.permissionLevel || "0") > 1 && (
        <div className="flex w-full justify-end mt-4 border-t-gray-300 border-t pt-4">
          <button className="btn !max-w-[200px] text-white !bg-red-600 hover:!bg-red-800">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectListsFrame;

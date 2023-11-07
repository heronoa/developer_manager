import { IDateObj, IProjectDataType, IUserDataType } from "@/@types";
import EdittableListItems from "@/components/UI/Items/EdittableListItems";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { useUsers } from "@/hooks/useUsers";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  project: IProjectDataType;
}

const ProjectListsFrame = ({ project }: Props) => {
  const { activeUserData } = useAuth();
  const router = useRouter();

  const { updateProjects, deleteProject } = useProjects();
  const { removingUsersProjects, updateUsersProjects } = useUsers();

  const stack = useState<string[]>();
  const teamUids = useState<string[]>();

  const edittables = { stack, teamUids };

  const onDeleteProject = async () => {
    await removingUsersProjects(project);
    await deleteProject(project.id);
    router.push("/projects");
  };

  const submitEdittable = (key: keyof IProjectDataType) => async () => {
    const oldObj = JSON.parse(JSON.stringify(project));
    const obj: any = { id: project.id };
    obj[key] = edittables[key as "stack" | "teamUids"][0]?.map(
      (e: any) => e?.uid || e,
    );
    await updateProjects(obj);
    if (key === "teamUids") {
      oldObj.teamUids = oldObj.teamUids.filter(
        (e: any) => !obj[key].includes(e),
      );
      // colaboradores removidos
      obj.teamUids = obj.teamUids.filter(
        (e: any) => !oldObj.teamUids.includes(e),
      );
      // colaboradores adicionados
      await removingUsersProjects(oldObj);
      await updateUsersProjects(obj);
    }
    edittables[key as "stack" | "teamUids"][1](undefined);
  };

  return (
    <div className="frame-container">
      <div className="grid md:grid-cols-2 grid-cols-1 justify-evenly gap-4 w-full">
        {Object.entries({
          teamUids: project.teamUids,
          stack: project.stack,
        }).map((objEntries, index) => {
          return (
            <EdittableListItems
              key={index}
              state={edittables[objEntries[0] as "stack" | "teamUids"][0]}
              setState={edittables[objEntries[0] as "stack" | "teamUids"][1]}
              objEntries={objEntries}
              submit={submitEdittable(objEntries[0] as "stack" | "teamUids")}
            />
          );
        })}
      </div>
      {parseInt(activeUserData?.permissionLevel || "0") > 1 && (
        <div
          onClick={onDeleteProject}
          className="flex w-full justify-end mt-4 border-t-gray-300 border-t pt-4"
        >
          <button className="btn !max-w-[200px] text-white !bg-red-600 hover:!bg-red-800">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectListsFrame;

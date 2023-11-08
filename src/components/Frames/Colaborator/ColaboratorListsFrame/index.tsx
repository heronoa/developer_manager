import { IProjectDataType, IUserDataType } from "@/@types";
import TinyItem from "@/components/UI/Items/TinyItem";
import { useProjects } from "@/hooks/useProjects";
import { useUsers } from "@/hooks/useUsers";
import { translateItemKeys } from "@/services/format";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  user: IUserDataType;
}

const ColaboratorListsFrame = ({ user }: Props) => {
  const { allProjects, removingUserFromProjects, addUsersToProjects } = useProjects();
  const { deleteUser, updateUser } = useUsers();
  const router = useRouter();

  const onDeleteColaborator = async () => {
    await removingUserFromProjects(user);
    await deleteUser(user.uid);
    router.push("/projects");
  };

  const findProject = (id: String) => {
    return allProjects.find(e => e.id === id);
  };
  const projects = useState<string[]>();
  const occupation = useState<string[]>();

  const edittables = { projects, occupation };

  const submitEdittable = (key: keyof IUserDataType) => async () => {
    const oldObj = JSON.parse(JSON.stringify(user));
    const obj: any = { id: user.uid };

    obj[key] = edittables[key as "projects" | "occupation"][0]?.map(
      (e: any) => e?.uid || e,
    );
    await updateUser(obj);
    if (key === "projects") {
      oldObj.teamUids = oldObj.teamUids.filter(
        (e: any) => !obj[key].includes(e),
      );
      // colaboradores removidos
      obj.teamUids = obj.teamUids.filter(
        (e: any) => !oldObj.teamUids.includes(e),
      );
      // colaboradores adicionados
      await removingUserFromProjects(oldObj);
      await addUsersToProjects(obj);
    }
    edittables[key as "projects" | "occupation"][1](undefined);
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
        <button
          onClick={onDeleteColaborator}
          className="btn !max-w-[200px] text-white !bg-red-600 hover:!bg-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ColaboratorListsFrame;

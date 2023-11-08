import { IProjectDataType, IUserDataType } from "@/@types";
import DeleteButton from "@/components/Auth/DeleteButton";
import EdittableListItems from "@/components/UI/Items/EdittableListItems";
import TinyItem from "@/components/UI/Items/TinyItem";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { useUsers } from "@/hooks/useUsers";
import { translateItemKeys } from "@/services/format";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  user: IUserDataType;
}

const ColaboratorListsFrame = ({ user }: Props) => {
  const { removingUserFromProjects, addUsersToProjects } = useProjects();
  const { deleteUser, updateUser } = useUsers();
  const { activeUserData } = useAuth();
  const router = useRouter();

  const onDeleteColaborator = async () => {
    await removingUserFromProjects(user);
    await deleteUser(user.uid);
    router.push("/projects");
  };

  const projects = useState<IProjectDataType[]>();
  const occupation = useState<string[]>();

  const edittables = { projects, occupation };

  const submitEdittable = (key: keyof IUserDataType) => async () => {
    const oldObj = JSON.parse(JSON.stringify(user));
    const obj: any = { uid: user.uid };

    obj[key] = edittables[key as "projects" | "occupation"][0]?.map(
      (e: any) => e?.id || e,
    );
    await updateUser(obj);
    if (key === "projects") {
      oldObj.projects = oldObj.projects.filter(
        (e: any) => !obj[key].includes(e),
      );
      // projetos removidos
      obj.projects = obj.projects.filter(
        (e: any) => !oldObj.projects.includes(e),
      );
      // projetos adicionados
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
        }).map((objEntries, index) => {
          return (
            <EdittableListItems
              key={index}
              state={edittables[objEntries[0] as "projects" | "occupation"][0]}
              setState={
                edittables[objEntries[0] as "projects" | "occupation"][1]
              }
              objEntries={objEntries}
              submit={submitEdittable(
                objEntries[0] as "projects" | "occupation",
              )}
            />
          );
        })}
      </div>
      <DeleteButton userPermission={user.permissionLevel} fn={onDeleteColaborator} />
    </div>
  );
};

export default ColaboratorListsFrame;

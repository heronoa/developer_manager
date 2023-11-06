import { IComments, IProjectDataType } from "@/@types";
import TinyItem from "@/components/UI/Items/TinyItem";
import { useProjects } from "@/hooks/useProjects";
import { useUsers } from "@/hooks/useUsers";
import { formatItem, translateItemKeys } from "@/services/format";
import { useState } from "react";
import { AiOutlineProject, AiOutlineSearch } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

interface Props {
  project?: IProjectDataType;
}

const ProjectDetailsLayout = ({ project }: Props) => {
  const { allUsers } = useUsers();
  const [text, setText] = useState<string>("");

  const findUser = (uid: String) => {
    return allUsers.find(e => e.uid === uid);
  };

  if (!project) {
    return <div className="dark:text-white">Projeto não encontrado</div>;
  }
  return (
    <section className="flex justify-start gap-4 items-center flex-col px-12 shadow-lg min-h-[75vh] dark:text-white">
      <div className="mx-12 shadow-lg p-12 rounded-lg flex justify-center items-center gap-4 w-[80%]">
        <div>
          <AiOutlineProject className="h-24 w-24" />
        </div>
        <div>
          <h3>{project?.name}</h3>
          <div>{project?.description}</div>
        </div>
      </div>
      <div className="mx-12 shadow-lg p-12 rounded-lg flex flex-col justify-center items-center gap-4 w-[80%]">
        <div className="grid grid-cols-2 justify-evenly gap-4">
          {Object.entries(project).map(([objKey, objValue], index) => {
            if (["name", "description", "comments", "id"].includes(objKey))
              return null;
            if (["stack", "teamUids"].includes(objKey)) {
              return (
                <div key={index}>
                  <span className="font-semibold mr-2">
                    {translateItemKeys(objKey as any)}:
                  </span>
                  <div className="flex flex-wrap">
                    {(objValue as string[]).map((e, index) => {
                      let value = e;
                      if (objKey === "teamUids") {
                        value = findUser(e)?.name || e;
                      }

                      return <TinyItem key={index} value={value} />;
                    })}
                  </div>
                </div>
              );
            }
            return (
              <div key={index}>
                <span className="font-semibold mr-2">
                  {translateItemKeys(objKey as any)}:
                </span>

                {formatItem(objValue, objKey as any)}
              </div>
            );
          })}
        </div>
        <div className="flex w-full justify-end mt-4 border-t-gray-300 border-t pt-4">
          <button className="btn !w-[200px] text-white !bg-red-600 hover:!bg-red-800">
            Delete
          </button>
        </div>
      </div>
      <div className="mx-12 shadow-lg p-12 rounded-lg flex flex-col justify-center items-center gap-4 w-[80%]">
        {project.comments.map((e: IComments, index) => (
          <div className="flex w-full gap-4" key={index}>
            <div>
              <FaUserAlt className="w-12 h-12" />
            </div>
            <div>
              <div className="tiny">
                {formatItem(e.date as any, "comments")}
              </div>
              <div>{e.text}</div>
            </div>
          </div>
        ))}
        <div className="w-full relative mt-12">
          <input
            value={text}
            onChange={evt => setText(evt.target.value)}
            className="w-full h-[32px] text-[20px] bg-transparent border-b border-b-blue-900 dark:border-b-white focus:outline-none"
            placeholder="Deixe seu comentário"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsLayout;

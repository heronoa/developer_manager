import { IComments, IProjectDataType, IUserDataType } from "@/@types";
import TinyItem from "@/components/UI/Items/TinyItem";
import { useProjects } from "@/hooks/useProjects";
import { useUsers } from "@/hooks/useUsers";
import { formatItem, translateItemKeys } from "@/services/format";
import { useState } from "react";
import { AiOutlineProject } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
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

  const sendComment = (txt: string) => {
    console.log(text);
  };

  if (!project) {
    return <div className="dark:text-white">Projeto não encontrado</div>;
  }
  return (
    <section className="flex justify-start gap-4 items-center flex-col px-12 shadow-lg min-h-[75vh] dark:text-white">
      <div className="mx-12 shadow-lg p-12 rounded-lg flex flex-col md:flex-row justify-center items-center gap-4 w-full md:w-[80%]">
        <div>
          <AiOutlineProject className="h-24 w-24" />
        </div>
        <div className="w-[80%]">
          <h3>{project?.name}</h3>
          <div>{project?.description}</div>
          <div className="flex flex-col md:flex-row gap-4 border-t-gray-300 border-t mt-4">
            {Object.entries({
              startDate: project.startDate,
              deadline: project.deadline,
            }).map(([objKey, objValue], index) => {
              if (["startDate", "deadline"].includes(objKey))
                return (
                  <div key={index}>
                    <span className="font-semibold mr-2">
                      {translateItemKeys(objKey as any)}:
                    </span>

                    {objKey === "birthday"
                      ? formatItem(objValue, objKey as any)
                      : JSON.stringify(objValue)}
                  </div>
                );
            })}
          </div>
        </div>
      </div>
      <div className="mx-12 shadow-lg p-12 rounded-lg flex flex-col justify-center items-center gap-4 w-full md:w-[80%]">
        <div className="grid md:grid-cols-2 grid-cols-1 justify-evenly gap-4 w-full">
          {Object.entries({
            teamUids: project.teamUids,
            stack: project.stack,
          }).map(([objKey, objValue], index) => {
            return (
              <div key={index}>
                <span className="font-semibold mr-2">
                  {translateItemKeys(objKey as any)}:
                </span>
                <div className="flex flex-wrap">
                  {(objValue as string[]).map((e, index) => {
                    let value: string | IUserDataType = e;
                    if (objKey === "teamUids") {
                      value = findUser(e) || e;
                    }
                    if (typeof value === "string") {
                      return <TinyItem key={index} value={value} />;
                    }
                    return (
                      <div key={index}>
                        {value?.name}
                        {value?.occupation.map((e, index2) => {
                          return <TinyItem key={index2} value={e} />;
                        })}
                      </div>
                    );
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
      <div className="mx-12 shadow-lg p-12 rounded-lg flex flex-col justify-center items-center gap-4 w-full md:w-[80%]">
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
          <IoMdSend
            className="absolute top-[0%] cursor-pointer right-3 w-8 h-8 text-blue-900"
            onClick={() => sendComment(text)}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsLayout;

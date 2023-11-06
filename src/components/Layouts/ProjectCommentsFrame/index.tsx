import { IComments, IProjectDataType } from "@/@types";
import { formatItem } from "@/services/format";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

interface Props {
  project: IProjectDataType;
}

const ProjectCommentsFrame = ({ project }: Props) => {
  const [text, setText] = useState<string>("");

  const sendComment = (txt: string) => {
    console.log(text);
  };

  return (
    <div className="frame-container">
      {project.comments.map((e: IComments, index: number) => (
        <div className="flex w-full gap-4" key={index}>
          <div>
            <FaUserAlt className="w-12 h-12" />
          </div>
          <div>
            <div className="tiny">{formatItem(e.date as any, "comments")}</div>
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
  );
};

export default ProjectCommentsFrame;

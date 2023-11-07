import { IFilterKeyOption, IProjectDataType } from "@/@types";
import EditButton from "@/components/Auth/EditButton";
import { useProjects } from "@/hooks/useProjects";
import { formatItem, translateItemKeys } from "@/services/format";
import { useState } from "react";
import { AiOutlineProject } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { GiConfirmed } from "react-icons/gi";

interface Props {
  project: IProjectDataType;
}

const ProjectDetailsHeaderFrame = ({ project }: Props) => {
  const { updateProjects } = useProjects();

  const [edit, setEdit] = useState<IFilterKeyOption | null>(null);

  const [edittables, setEdittables] = useState<Partial<IProjectDataType>>({});

  return (
    <div className="frame-container">
      <div className="w-[80%]">
        <div className="flex justify-start items-center">
          <AiOutlineProject className="h-24 w-24" />
          {!edittables?.name && (
            <h3 className="font-bold text-[26px] relative">
              {edittables?.name || project?.name}{" "}
              <div className="absolute top-1 -right-8">
                <EditButton fn={() => setEdittables({ name: project.name })} />
              </div>
            </h3>
          )}
          {edittables?.name && (
            <div className="relative">
              <input
                className="font-bold text-[26px]"
                type="text"
                value={edittables?.name || project.name}
                onChange={evt => setEdittables({ name: evt.target.value })}
              />
              <div className="absolute flex top-1 gap-2 -right-20 ">
                <GiConfirmed className="w-8 h-8" />
                <ImCancelCircle
                  className="w-8 h-8"
                  onClick={() => setEdittables({ name: undefined })}
                />
              </div>
            </div>
          )}
        </div>

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

                  {formatItem(objValue, objKey as any)}
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsHeaderFrame;

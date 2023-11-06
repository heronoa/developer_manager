import { IProjectDataType } from "@/@types";
import { formatItem, translateItemKeys } from "@/services/format";
import { AiOutlineProject } from "react-icons/ai";

interface Props {
    project: IProjectDataType;
}

const ProjectDetailsHeaderFrame = ({project}: Props) => {
  return (
    <div className="frame-container">
      
      <div className="w-[80%]">
      <div className="flex">
        <AiOutlineProject className="h-24 w-24" />
        <h3>{project?.name}</h3>
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
import { IProjectDataType, IUserDataType } from "@/@types";
import TinyItem from "@/components/UI/Items/TinyItem";
import { useUsers } from "@/hooks/useUsers";
import { translateItemKeys } from "@/services/format";

interface Props {
  project: IProjectDataType;
}

const ProjectListsFrame = ({ project }: Props) => {
  const { allUsers } = useUsers();
  const findUser = (uid: String) => {
    return allUsers.find(e => e.uid === uid);
  };
  return (
    <div className="frame-container">
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
  );
};

export default ProjectListsFrame;

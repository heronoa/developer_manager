import { IUserDataType } from "@/@types";
import TinyItem from "@/components/UI/Items/TinyItem";
import { translateItemKeys, formatItem } from "@/services/format";
import { FaUserAlt } from "react-icons/fa";

interface Props {
  user: IUserDataType;
}

const ColaboratorDetailsHeaderFrame = ({ user }: Props) => {
  return (
    <div className="frame-container">
      <div className="w-full">
        <div className="flex">
          <FaUserAlt className="h-24 w-24" />
          <h3>{user?.name}</h3>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 justify-evenly gap-4 w-full border-t-gray-300 border-t mt-4">
          {Object.entries(user).map(([objKey, objValue], index) => {
            if (["uid", "projects", "occupation"].includes(objKey)) return null;

            return (
              <div key={index}>
                <span className="font-semibold mr-2">
                  {translateItemKeys(objKey as any)}:
                </span>
                <div className="flex flex-wrap">
                  {objKey === "occupation"
                    ? objValue.map((e: any, index: any) => {
                        return <TinyItem key={index} value={e} />;
                      })
                    : formatItem(objValue, objKey as any)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColaboratorDetailsHeaderFrame;
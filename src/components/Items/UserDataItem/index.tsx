import { IFilterKeyOption, IUserDataType } from "@/@types";
import { formatItem, translateItemKeys } from "@/services/format";

interface Props {
  data: IUserDataType;
}

const UserDataItem = ({ data }: Props) => {
  // const { name, occupation, projects, permissionLevel, email } = data;

  return (
    <>
      <div className="flex w-[90%] shadow-2xl border border-grey-200 rounded-[15px] flex-col md:flex-row justify-between text-lg mx-auto border-b border-b-gray-300 hover:dark:bg-gray-900 hover:bg-gray-200 even:bg-gray-100">
        {Object.entries(data).map(([objKey, objValue]) => {
          if (["id", "uid"].includes(objKey)) {
            return null;
          }
          return (
            <>
              <div
                key={`${data.uid}-${objKey}`}
                className=" border-r-gray-400 md:border-none md:border-r min-w-[150px] last:border-0 flex gap-2 justify-center items-center md:first:justify-start first:min-w-[300px] p-4 overflow-x-auto w-full"
              >
                <span className="font-semibold">
                  {translateItemKeys(
                    (objKey === "birthday" ? "age" : objKey) as
                      | IFilterKeyOption
                      | "age",
                  )}
                  :
                </span>
                {Array.isArray(objValue)
                  ? objValue.map(e => e)
                  : formatItem(
                      objValue,
                      (objKey === "birthday" ? "age" : objKey) as
                        | IFilterKeyOption
                        | "age"
                        | undefined,
                    )}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default UserDataItem;

import { IFilterKeyOption, IFormatItem, IUserDataType } from "@/@types";
import { formatItem, sortItemsData, translateItemKeys } from "@/services/format";

interface Props {
  data: IUserDataType;
}

const UserDataItem = ({ data }: Props) => {
  // const { name, occupation, projects, permissionLevel, email } = data;

  const sortedData = sortItemsData(data);

  return (
    <div className="flex w-[90%] shadow-2xl md:shadow-none md:border-t-0 md:border-x-0 md:rounded-none border border-grey-200 md:!border-b md:!border-b-gray-300 rounded-[15px] flex-col md:flex-row justify-between text-lg mx-auto md:hover:dark:bg-[#333333] md:hover:bg-gray-200 even:bg-gray-100">
      {sortedData
        .map(([objKey, objValue]) => {
          if (["id", "uid"].includes(objKey)) {
            return null;
          }
          return (
            <>
              <div
                key={`${data.uid}-${objKey}`}
                className=" border-r-gray-400 md:border-none md:border-r min-w-[150px] last:border-0 flex gap-2 justify-center items-center md:first:justify-start first:min-w-[200px] p-4 overflow-x-hidden overflow-ellipsis w-full"
              >
                <span className="font-semibold md:hidden">
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
                      objValue as IFormatItem,
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
  );
};

export default UserDataItem;

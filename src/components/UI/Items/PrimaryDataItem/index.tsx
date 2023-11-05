import {
  IFilterKeyOption,
  IFormatItem,
  IProjectDataType,
  IUserDataType,
} from "@/@types";
import {
  formatItem,
  sortItemsData,
  translateItemKeys,
} from "@/services/format";
import TinyItem from "../TinyItem";

interface Props {
  data: IUserDataType & IProjectDataType;
}

const PrimaryDataItem = ({ data }: Props) => {
  const sortedData = sortItemsData(data);

  const renderValue = (
    objKey: IFilterKeyOption | "age" | undefined,
    objValue: IFormatItem,
  ) => {
    if (!Array.isArray(objValue) || ["projects"].includes(objKey as string)) {
      return formatItem(objValue, objKey === "birthday" ? "age" : objKey);
    }

    if (Array.isArray(objValue)) {
      return (
        <div className="grid grid-rows-2 grid-flow-col gap-2">
          {objValue.map((value, index) => (
            <div key={index} className="w-full">
              <TinyItem value={value as string} />
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex w-[90%] shadow-2xl md:shadow-none md:border-t-0 md:border-x-0 md:rounded-none border border-grey-200 md:!border-b md:!border-b-gray-300 rounded-[15px] flex-col md:flex-row justify-between text-lg mx-auto md:hover:dark:bg-[#333333] md:hover:bg-gray-200 even:bg-gray-100 dark:even:bg-[#333333] ">
      {sortedData.map(([objKey, objValue], index) => {
        if (
          ["id", "uid", "comments", "description", "teamUids"].includes(objKey)
        ) {
          return null;
        }
        return (
          <div
            key={`${data?.uid || data?.id}-${objKey}-${index}`}
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
            {renderValue(
              objKey as IFilterKeyOption | "age" | undefined,
              objValue as IFormatItem,
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PrimaryDataItem;

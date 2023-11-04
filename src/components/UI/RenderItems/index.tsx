import { IFilterOptions, IUserDataType } from "@/@types";
import UserDataItem from "@/components/Items/UserDataItem";
import Loading from "@/components/UI/Loading";

interface Props {
  type: string;
  arrayItems: any[];
  filterOptions?: IFilterOptions;
  loading?: boolean;
  error?: any | undefined;
}

const RenderItems = ({
  type,
  arrayItems,
  filterOptions,
  loading,
  error,
}: Props) => {
  let filteredData;
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="dark:text-white">
        Sorry We have a Issues! Try Again Later
      </div>
    );
  }
  if (filterOptions) {
    Object.entries(filterOptions).forEach(([filterKey, filterValue]) => {
      if (typeof filterValue === "string" && filterValue !== "") {
        console.log({filterKey, filterValue})
        filteredData = arrayItems.filter(e => {
          return e?.[filterKey]?.toLowerCase()?.startsWith(filterValue.toLowerCase());
        });
      }
      if ((filterValue as { ASC: boolean })?.ASC) {
        arrayItems.sort((a, b) => +a?.[filterKey] - +b?.[filterKey]);
      }
    });
  }

  if (arrayItems.length > 0) {
    return (filteredData || arrayItems).map((itemData) => (
      <>
      {type === "users" && <UserDataItem key={(itemData as IUserDataType).uid} data={(itemData as IUserDataType)} />}
      </>
    ));
  }
};

export default RenderItems;

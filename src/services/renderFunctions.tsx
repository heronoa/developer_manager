import { IProjectDataType, IUserDataType, IFilterOptions } from "@/@types";
import UserDataItem from "@/components/Items/UserDataItem";
import Loading from "@/components/UI/Loading";

interface Props {
  type: string;
  arrayItems: any[];
  filterOptions?: IFilterOptions;
  loading?: boolean;
  error?: any | undefined;
}

export const renderItems = ({
  type,
  arrayItems,
  filterOptions,
  loading,
  error,
}: Props) => {
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
      if (typeof filterValue === "string") {
        arrayItems.filter(e => {
          return e?.[filterKey]?.startsWith(filterValue);
        });
      }
      if ((filterValue as { ASC: boolean })?.ASC) {
        arrayItems.sort((a, b) => +a?.[filterKey] - +b?.[filterKey]);
      }
    });
  }

  if (arrayItems.length > 0) {
    return arrayItems.map((itemData, index) => (
      <>{type === "users" && <UserDataItem key={index} data={itemData} />}</>
    ));
  }
};

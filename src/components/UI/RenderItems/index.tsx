import { IFilterOptions, IProjectDataType, IUserDataType } from "@/@types";
import PrimaryDataItem from "@/components/UI/PrimaryDataItem";
import Loading from "@/components/UI/Loading";

interface Props {
  arrayItems: any[];
  filterOptions?: IFilterOptions;
  loading?: boolean;
  error?: any | undefined;
}

const RenderItems = ({
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
        filteredData = arrayItems.filter(e => {
          return e?.[filterKey]
            ?.toLowerCase()
            ?.startsWith(filterValue.toLowerCase());
        });
      }
      if ((filterValue as { ASC: boolean })?.ASC) {
        arrayItems.sort((a, b) => +a?.[filterKey] - +b?.[filterKey]);
      }
    });
  }

  if (arrayItems.length > 0) {
    return (filteredData || arrayItems).map(itemData => (
      <PrimaryDataItem
        key={(itemData as any)?.uid || (itemData as any)?.id}
        data={itemData as any}
      />
    ));
  }
};

export default RenderItems;

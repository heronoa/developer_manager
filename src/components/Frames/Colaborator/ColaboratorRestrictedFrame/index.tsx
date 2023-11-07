import { IRestrictedDataType, IUserDataType } from "@/@types";
import TinyItem from "@/components/UI/Items/TinyItem";
import { useUsers } from "@/hooks/useUsers";
import { translateItemKeys, formatItem } from "@/services/format";
import { useEffect, useState } from "react";

interface Props {
  user: IUserDataType;
}

const ColaboratorRestrictedFrame = ({ user }: Props) => {
  const { getRestrictedData } = useUsers();
  const [data, setData] = useState<IRestrictedDataType>();

  useEffect(() => {
    const fetcher = async () => {
      const data = await getRestrictedData(user.uid);
      console.log({ data });
      setData(data);
    };
    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="frame-container">
      <div className="grid md:grid-cols-2 grid-cols-1 justify-evenly gap-4 w-full mt-4">
        {data &&
          Object.entries(data).map(([objKey, objValue], index) => {
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
  );
};

export default ColaboratorRestrictedFrame;

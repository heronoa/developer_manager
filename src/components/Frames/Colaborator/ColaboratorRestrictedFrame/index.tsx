import { IRestrictedDataType, IUserDataType } from "@/@types";
import EditButton from "@/components/Auth/EditButton";
import EdittableListItems from "@/components/UI/Items/EdittableListItems";
import TinyItem from "@/components/UI/Items/TinyItem";
import { useUsers } from "@/hooks/useUsers";
import { formErrorsHandler } from "@/services/errorHandler";
import { translateItemKeys, formatItem } from "@/services/format";
import { useEffect, useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";

interface Props {
  user: IUserDataType;
}

const ColaboratorRestrictedFrame = ({ user }: Props) => {
  const { getRestrictedData, verifyUniqueField } = useUsers();
  const [data, setData] = useState<IRestrictedDataType>();
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const fetcher = async () => {
      const data = await getRestrictedData(user.uid);
      console.log({ data });
      setData(data);
    };
    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { updateUser } = useUsers();

  const [workType, setWorkType] = useState<string | undefined>();
  const [edittables, setEdittables] = useState<
    Partial<IUserDataType & IRestrictedDataType>
  >({});

  const handleChangeEdittables = (
    key: keyof (IUserDataType & IRestrictedDataType),
    value: string | undefined,
  ) => {
    setEdittables(prevState => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState[key] = value;
      return newState;
    });
  };

  const submitEdittable =
    (key: keyof (IUserDataType & IRestrictedDataType)) => async () => {
      const obj: any = { uid: user.uid };
      obj[key] = edittables[key as keyof (IUserDataType & IRestrictedDataType)];
      setError(formErrorsHandler(obj));
      if (["cpf", "rg"].includes(key)) {
        setError(
          (await verifyUniqueField(obj[key], key as "cpf" | "rg"))
            ? `${key.toUpperCase()} já cadastrado`
            : null,
        );
      }
      if (error) return;
      // await updateUser(obj, true);
      // handleChangeEdittables(key, undefined);
    };

  return (
    <div className="frame-container">
      {error && <div className="form-error">{error}</div>}
      <div className="grid md:grid-cols-2 grid-cols-1 justify-evenly gap-4 w-full mt-4">
        {data &&
          Object.entries({
            telefone: data.telefone,
            cpf: data.cpf,
            rg: data.rg,
            workType: data.workType,
          }).map(([objKey, objValue], index) => {
            const typeKey: keyof Partial<IUserDataType & IRestrictedDataType> =
              objKey as keyof Partial<IUserDataType & IRestrictedDataType>;

            if (objKey === "workType") {
              return (
                <EdittableListItems
                  key={index}
                  state={workType}
                  setState={setWorkType}
                  objEntries={[objKey, [objValue]]}
                  submit={submitEdittable(objKey)}
                />
              );
            }

            return (
              <div
                key={`${user.uid.slice(0, 12)}-${objKey}-${objValue}-${index}`}
              >
                <span className="text-[21px] font-semibold mr-2">
                  {translateItemKeys(objKey as any)}:
                </span>

                {!edittables?.[typeKey] && (
                  <div className="text-[21px] w-[40%] relative">
                    <div className="flex flex-wrap">
                      {formatItem(objValue, objKey as any)}
                    </div>
                    <div className="absolute top-1 -right-8">
                      <EditButton
                        fn={() =>
                          handleChangeEdittables(typeKey, objValue ?? undefined)
                        }
                      />
                    </div>
                  </div>
                )}
                {edittables?.[typeKey] && (
                  <div className="relative w-[60%]">
                    <input
                      className="text-[21px] w-full bg-transparent"
                      type={
                        { birthday: "date", cpf: "number", rg: "number" }?.[
                          typeKey as "birthday" | "cpf" | "rg"
                        ] || "text"
                      }
                      value={
                        typeKey === "birthday"
                          ? (formatItem(objValue, "birthday")
                              ?.split("/")
                              ?.reverse()
                              ?.join("-") as string) ?? ""
                          : edittables?.[typeKey] ||
                            ((user?.[typeKey as keyof IUserDataType] ??
                              "") as string)
                      }
                      onChange={evt =>
                        handleChangeEdittables(typeKey, evt.target.value)
                      }
                    />
                    <div className="absolute flex top-1 gap-2 -right-20 ">
                      <GiConfirmed
                        className="w-8 h-8 cursor-pointer"
                        onClick={() => submitEdittable(typeKey)()}
                      />
                      <ImCancelCircle
                        className="w-8 h-8 cursor-pointer"
                        onClick={() =>
                          handleChangeEdittables(typeKey, undefined)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ColaboratorRestrictedFrame;

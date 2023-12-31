import { IDateObj, IUserDataType } from "@/@types";
import EditButton from "@/components/Auth/EditButton";
import TinyItem from "@/components/UI/Items/TinyItem";
import { useUsers } from "@/hooks/useUsers";
import { translateItemKeys, formatItem } from "@/services/format";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";

interface Props {
  user: IUserDataType;
}

const ColaboratorDetailsHeaderFrame = ({ user }: Props) => {
  const { updateUser } = useUsers();

  const [edittables, setEdittables] = useState<Partial<IUserDataType>>({});

  const handleChangeEdittables = (
    key: keyof IUserDataType,
    value: string | IDateObj | undefined,
  ) => {
    setEdittables(prevState => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState[key] = value;
      return newState;
    });
  };

  const submitEdittable = async (key: keyof IUserDataType) => {
    const obj: any = { uid: user.uid };
    obj[key] = edittables[key];
    await updateUser(obj);
    handleChangeEdittables(key, undefined);
  };

  return (
    <div className="frame-container">
      <div className="w-full">
        <div className="flex items-center">
          <FaUserAlt className="h-24 w-24" />
          {!edittables?.name && (
            <h3 className="font-bold text-[32px] w-[60%] relative">
              {edittables?.name || user?.name}{" "}
              <div className="absolute top-1 -right-8">
                <EditButton fn={() => setEdittables({ name: user.name })} />
              </div>
            </h3>
          )}
          {edittables?.name && (
            <div className="relative w-[60%]">
              <input
                className="font-bold text-[32px] w-full bg-transparent"
                type="text"
                value={edittables?.name || user.name}
                onChange={evt => setEdittables({ name: evt.target.value })}
              />
              <div className="absolute flex top-1 gap-2 -right-20 ">
                <GiConfirmed
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => submitEdittable("name")}
                />
                <ImCancelCircle
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => setEdittables({ name: undefined })}
                />
              </div>
            </div>
          )}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 justify-evenly gap-4 w-full border-t-gray-300 border-t mt-4">
          {Object.entries({
            email: user.email,
            age: user.birthday,
            birthday: user.birthday,
          }).map(([objKey, objValue], index) => {
            const typeKey: keyof Partial<IUserDataType> =
              objKey as keyof Partial<IUserDataType>;

            if (objKey === "age" || objKey === "email") {
              return (
                <div
                  key={`${user.uid.slice(
                    0,
                    12,
                  )}-${objKey}-${objValue}-${index}`}
                >
                  <span className="text-[21px] font-semibold mr-2">
                    {translateItemKeys(objKey as any)}:
                  </span>
                  <div
                    key={`${user.uid.slice(
                      0,
                      12,
                    )}-${objKey}-${objValue}-${index}`}
                    className="text-[21px] w-[40%] relative"
                  >
                    <div className="">
                      {formatItem(objValue, objKey as any)}
                    </div>
                  </div>
                </div>
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
                      type={typeKey === "birthday" ? "date" : typeKey}
                      value={
                        typeKey === "birthday"
                          ? (formatItem(objValue, "birthday")
                              ?.split("/")
                              ?.reverse()
                              ?.join("-") as string) ?? ""
                          : edittables?.[typeKey] || (user?.[typeKey] ?? "")
                      }
                      onChange={evt =>
                        handleChangeEdittables(typeKey, evt.target.value)
                      }
                    />
                    <div className="absolute flex top-1 gap-2 -right-20 ">
                      <GiConfirmed
                        className="w-8 h-8 cursor-pointer"
                        onClick={() => submitEdittable(typeKey)}
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
    </div>
  );
};

export default ColaboratorDetailsHeaderFrame;

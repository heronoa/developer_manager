import { IUserDataType } from "@/@types";

interface Props {
  data: IUserDataType;
}

const UserDataItem = ({ data }: Props) => {
  const { name, occupation, projects, permissionLevel } = data;

  return (
    <div className="flex w-[90%] justify-between">
      <div>{name}</div>
      <div>{occupation.map(e => e)}</div>
      <div>{projects}</div>
      <div>{permissionLevel}</div>
    </div>
  );
};

export default UserDataItem;

import { IUserDataType } from "@/@types";

interface Props {
  user: IUserDataType;
}

const ColaboratorRestrictedFrame = ({ user }: Props) => {
  return (
    <div className="frame-container">
      <div className="grid md:grid-cols-2 grid-cols-1 justify-evenly gap-4 w-full">
        dados restritos
      </div>
    </div>
  );
};

export default ColaboratorRestrictedFrame;

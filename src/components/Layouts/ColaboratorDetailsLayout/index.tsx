import { IUserDataType } from "@/@types";
import ColaboratorDetailsHeaderFrame from "@/components/Frames/ColaboratorDetailsHeaderFrame";
import ColaboratorListsFrame from "@/components/Frames/ColaboratorListsFrama";
import ColaboratorRestrictedFrame from "@/components/Frames/ColaboratorRestrictedFrame";
import BackButton from "@/components/UI/BackButton";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  user: IUserDataType;
}

const ColaboratorDetailsLayout = ({ user }: Props) => {
  const { activeUserData } = useAuth();

  if (!user) {
    return (
      <div className="dark:text-white justify-center items-center h-full w-full">
        Projeto não encontrado
      </div>
    );
  }
  return (
    <section className="flex relative justify-start gap-4 items-center flex-col px-12 shadow-lg min-h-[75vh] dark:text-white">
      <BackButton path={"/colaborators"} />
      <ColaboratorDetailsHeaderFrame user={user} />

      {parseInt(activeUserData?.permissionLevel || "0") > 1 && (
        <ColaboratorRestrictedFrame user={user} />
      )}
      <ColaboratorListsFrame user={user} />
    </section>
  );
};

export default ColaboratorDetailsLayout;

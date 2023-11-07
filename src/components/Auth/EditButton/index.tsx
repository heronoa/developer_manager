import { useAuth } from "@/hooks/useAuth";
import { AiFillEdit } from "react-icons/ai";

interface Props {
  fn: () => void | Promise<void>;
}

const EditButton = ({ fn }: Props) => {
  const { activeUserData } = useAuth();
  if (parseInt(activeUserData?.permissionLevel || "0") > 1) {
    return <AiFillEdit className="w-8 h-8 cursor-pointer" onClick={fn} />;
  }

  return null;
};

export default EditButton

import { useAuth } from "@/hooks/useAuth";
import { IoMdAddCircle } from "react-icons/io";

interface Props {
  fn: () => void | Promise<void>;
}

const AddButton = ({ fn }: Props) => {
  const { activeUserData } = useAuth();
  if (parseInt(activeUserData?.permissionLevel || "0") > 1) {
    return <IoMdAddCircle className="w-12 h-12 cursor-pointer text-blue-900" onClick={fn} />;
  }

  return null;
};

export default AddButton

import { useAuth } from "@/hooks/useAuth";

interface Props {
  userPermission?: string;
  fn: () => Promise<void>;
}

const DeleteButton = ({ userPermission = "0", fn }: Props) => {
  const { activeUserData } = useAuth();

  if (
    userPermission !== "3" &&
    parseInt(activeUserData?.permissionLevel || "0") > 1
  )
    return (
      <div className="flex w-full justify-end mt-4 border-t-gray-300 border-t pt-4">
        <button
          onClick={fn}
          className="btn !max-w-[200px] text-white !bg-red-600 hover:!bg-red-800"
        >
          Delete
        </button>
      </div>
    );
};

export default DeleteButton;

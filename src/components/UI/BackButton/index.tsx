import Link from "next/link";
import { BiSolidLeftArrow } from "react-icons/bi";

interface Props {
  path: string;
}

const BackButton = ({ path }: Props) => {
  return (
    <div className="text-black z-10 dark:text-white dark:bg-[#333333] bg-white w-16 h-16 flex justify-center items-center shadow-lg rounded-full p-4 absolute left-9">
      <Link href={ path }>
        <BiSolidLeftArrow className="h-8 w-8" />
      </Link>
    </div>
  );
};

export default BackButton;

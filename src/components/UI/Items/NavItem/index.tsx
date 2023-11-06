import { INavLinksItem } from "@/@types";
import Link from "next/link";
import router from "next/router";

interface Props {
  item: INavLinksItem;
}

const NavItem = ({ item }: Props) => {
  return (
    <span
      className={`${
        router.asPath.includes(item?.path as string)
          ? "bg-blue-800 text-white hover:!text-white p-2 pl-8 "
          : " "
      }   rounded-[15px] w-[80%] p-2 pl-8 ml-4 my-1 lg:my-0 items-center mr-4 lg:inline-block block`}
    >
      <Link
        href={item?.path as string}
        className={
          router.asPath !== item.path ? "underline-animation-event" : ""
        }
      >
        {item?.displayName}
      </Link>
    </span>
  );
};

export default NavItem

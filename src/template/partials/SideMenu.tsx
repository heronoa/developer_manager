import Link from "next/link";
import { navigationLinks } from "./data";
import { useRouter } from "next/router";
import CompanyLogo from "@/components/UI/CompanyLogo";
import { ThemeSwitch } from "@/components/UI/ThemeSwitch";

const SideMenu = () => {
  const router = useRouter();

  return (
    <div
      id="main-side-menu"
      className="bg-white h-screen w-full block mt-[100px] md:mt-0"
    >
      <CompanyLogo />
      <nav className={``}>
        <ul className="text-lg inline-block">
          <>
            {navigationLinks.map((item, index) => (
              <li
                key={index}
                className="my-3 md:my-0 items-center mr-4 md:inline-block block w-full "
              >
                {item.path ? (
                  <Link
                    href={item?.path}
                    className="text-blue-800 hover:text-blue-900 transition"
                  >
                    {item?.displayName}
                  </Link>
                ) : (
                  <div className="flex flex-col ml-4 ">
                    <span className="font-semibold text-gray-500 uppercase">
                      {item.displayName}
                    </span>
                    {item.subpaths?.map((item, index) => (
                      <li
                        key={index}
                        className={`${
                          router.asPath === item.path
                            ? "bg-blue-800 text-white hover:!text-white p-2 pl-8 "
                            : " "
                        }   rounded-[15px] w-[80%] p-2 pl-8 ml-4 my-1 md:my-0 items-center mr-4 md:inline-block block`}
                      >
                        <Link
                          href={item?.path as string}
                          className="underline-animation-event"
                        >
                          {item?.displayName}
                        </Link>
                      </li>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </>
        </ul>
      </nav>
      <div className="block md:hidden ml-4">
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default SideMenu;

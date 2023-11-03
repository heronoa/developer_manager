import Link from "next/link";
import { navigationLinks } from "./data";
import Image from "next/image";
import { useRouter } from "next/router";

const SideMenu = () => {
  const router = useRouter();

  return (
    <div id="main-side-menu" className="bg-white h-screen w-full">
      <div className="flex gap-4 items-center text-blue-900 hover:text-blue-800 cursor-pointer transition duration-150 mx-2 mt-6 mb-6 ">
        <Image
          className=""
          src={"/imgs/logo.png"}
          alt={"Logo da Encibra SA"}
          width={90}
          height={56}
        />
        <h1 className="text-base h-[70px] flex flex-col justify-end dark:text-white">
          Encibra SA<br/>
          <small className="tiny">Estudos e Projetos de Engenharia</small>
        </h1>
      </div>
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
                        className={`${router.asPath === item.path ? "bg-blue-800 text-white hover:!text-white p-2 pl-8 " : "" }  hover:bg-blue-800 rounded-[15px] w-[80%]  hover:!text-white p-2 pl-8 ml-4 my-1 md:my-0 items-center mr-4 md:inline-block block`}
                      >
                        <Link href={item?.path as string} >
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
    </div>
  );
};

export default SideMenu;

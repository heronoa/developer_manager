import { SiPhpmyadmin } from "react-icons/si";

interface Props {
  className?: string;
  label?: boolean;
}

const CompanyLogo = ({ className = "", label = true }: Props) => {
  return (
    <div
      className={`${className} dark:text-white flex gap-4 items-center text-blue-900 hover:text-blue-800 cursor-pointer transition duration-150 mx-2 mt-6 mb-6 `}
    >
      <SiPhpmyadmin className="w-[90px] h-[56px]" alt={"Company Logo"} />
      {label && (
        <h1 className="text-base h-[70px] flex flex-col justify-end dark:text-white">
          Dev Manager
          <br />
          <small className="tiny">Manage as a captain</small>
        </h1>
      )}
    </div>
  );
};

export default CompanyLogo;

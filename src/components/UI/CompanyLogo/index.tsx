import Image from "next/image";

interface Props {
  className?: string;
  label?:boolean;
}

const CompanyLogo = ({ className = "", label=true }: Props) => {
  return (
    <div className={`${className} flex gap-4 items-center text-blue-900 hover:text-blue-800 cursor-pointer transition duration-150 mx-2 mt-6 mb-6 `}>
      <Image
        className=""
        src={"/imgs/logo.png"}
        alt={"Logo da Encibra SA"}
        width={90}
        height={56}
      />
      {label && <h1 className="text-base h-[70px] flex flex-col justify-end dark:text-white">
        Encibra SA
        <br />
        <small className="tiny">Estudos e Projetos de Engenharia</small>
      </h1>}
    </div>
  );
};

export default CompanyLogo;

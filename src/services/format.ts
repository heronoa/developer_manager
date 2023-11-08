import { IDateObj, IFilterKeyOption, IFormatItem } from "@/@types";

export const capitalize = (str: string) => {
  if (str === "") return "";

  const strCapitalize = str?.charAt(0)?.toUpperCase() + str?.slice(1);
  return strCapitalize;
};

export const getAge = (strDate: string): string | number => {
  return (
    parseInt(new Date(Date.now()).toISOString().split("T")[0].split("-")[0]) -
    +strDate.split("/")[2]
  );
};

export const formatItem = (
  value: IFormatItem,
  key?: IFilterKeyOption | "age",
): string | null => {
  if (key) {
    if (
      key === "birthday" ||
      key === "deadline" ||
      key === "startDate" ||
      key === "comments"
    ) {
      return (
        new Date((value as IDateObj)?.seconds * 1000)
          ?.toISOString()
          ?.split("T")[0]
          ?.split("-")
          ?.reverse()
          ?.join("/") || ""
      );
    }
    if (key === "age") {
      return getAge(
        new Date((value as IDateObj)?.seconds * 1000)
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("/"),
      ).toString();
    }
    if (key === "projects" || key === "teamUids") {
      return (value as string[])?.length.toString();
    }
    if (key === "cpf") {
      return formatCPF(value as string);
    }
  }

  if (typeof value === "string") {
    return value;
  }

  return null;
};

export const parseCamelCase = (camelStr: string): string => {
  return capitalize(camelStr.split(/(?=[A-Z])/).join(" "));
};

export const translateItemKeys = (
  itemKey: IFilterKeyOption | "age",
): string | undefined => {
  return (
    {
      email: "Email",
      name: "Nome",
      deadline: "Prazo",
      description: "Descrição",
      stack: "Tecnologias",
      teamUids: "Time",
      startDate: "Data de Inicio",
      permissionLevel: "Nivel de Permissões",
      occupation: "Área de Atuação",
      projects: "Projetos",
      birthday: "Data de Nascimento",
      age: "Idade",
      comments: "Comentarios",
      workType: "Regime de Trabalho",
      cpf: "CPF",
      rg: "RG",
      telefone: "Contato",
    }?.[itemKey] || itemKey
  );
};

export const sortItemsData = (data: any) => {
  const dataCopy = JSON.parse(JSON.stringify(data));
  const dataEntries = Object.entries(dataCopy);

  const name = dataEntries.filter(e => e[0] === "name");
  const others = dataEntries.filter(e => e[0] !== "name");

  others.sort();

  return [...name, ...others];
};

const formatCPF = (cpf: string): string => {
  cpf = cpf.replace(/[^\d]/g, "");

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

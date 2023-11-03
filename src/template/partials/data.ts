import { INavLinks } from "@/@types";

export const navigationLinks: INavLinks = [
  {
    displayName: "Resumo",
    subpaths: [{ displayName: "Dashboard", path: "/dashboard" }],
  },
  {
    displayName: "Detalhes",
    subpaths: [
        { displayName: "Colaboradores", path: "/colaborators" },
        { displayName: "Projetos", path: "/projects" },
],
  },
  {
    displayName: "Gerenciamento",
    subpaths: [
        { displayName: "Adicionar Colaborador", path: "/addcolaborators" },
        { displayName: "Criar Projeto", path: "/createprojects" },
],
  },

];

import { INavLinks } from "@/@types";

const navigationLinks: INavLinks = [
  {
    displayName: "Overview",
    subpaths: [{ displayName: "Dashboard", path: "/dashboard" }],
  },
  {
    displayName: "Details",
    subpaths: [
        { displayName: "Colaboradores", path: "/colaborators" },
        { displayName: "Projetos", path: "/projects" },
],
  },
];

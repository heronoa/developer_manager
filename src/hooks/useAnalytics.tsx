import { useUsers } from "./useUsers";
import { useProjects } from "./useProjects";
import { possibleOccupations, possiblesStacks } from "@/utils/constants";

export const useAnalytics = () => {
  const { allUsers } = useUsers();
  const { allProjects } = useProjects();

  const getUsersByProjects = () => {
    const data: any[] = [];
    const mappedValues = allUsers.map(user => user.projects.length);
    const iterableArray = new Array(Math.max(...mappedValues, 0) + 1);

    iterableArray
      .fill("value")
      .forEach((item, index) =>
        data.push([
          `${mappedValues.filter(e => e === index).length} Colaboradores`,
          index,
          "gold",
          null,
        ]),
      );
    return data;
  };

  const getUsersByOccupation = (): any[] => {
    const data: any[] = [];
    Object.keys(possibleOccupations).forEach(occ => {
      const filteredUsers = allUsers.filter(e => e.occupation.includes(occ));
      data.push([occ, filteredUsers.length]);
    });
    return data;
  };
  const getProjectsByUsers = () => {
    const data: any[] = [];
    const mappedValues = allProjects.map(project => project.teamUids.length);
    const iterableArray = new Array(Math.max(...mappedValues, 0) + 1);

    iterableArray
      .fill("value")
      .forEach((item, index) =>
        data.push([
          `${mappedValues.filter(e => e === index).length} Projetos`,
          index,
          "gold",
          null,
        ]),
      );
    return data;
  };
  const getProjectsByStack = (): any[] => {
    const data: any[] = [];
    Object.keys(possiblesStacks).forEach(stack => {
      const filteredProjects = allProjects.filter(e => e.stack.includes(stack));
      data.push([stack, filteredProjects.length]);
    });
    return data;
  };

  return { getUsersByProjects, getUsersByOccupation, getProjectsByStack, getProjectsByUsers };
};

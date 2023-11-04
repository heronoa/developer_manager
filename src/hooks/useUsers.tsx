import { useContext } from "react";

import { UsersContext } from "../context/UsersContext";

export const useUsers = () => {
  const context = useContext(UsersContext);

  return context;
};

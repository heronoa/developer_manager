import { useContext } from "react";

import { ModalContext } from "../context/ModalsContext";

export const useModals = () => {
  const context = useContext(ModalContext);

  return context;
};

import { useContext } from "react";

import { ModalContext } from "../context/ModalContext";

export const useModals = () => {
  const context = useContext(ModalContext);

  return context;
};

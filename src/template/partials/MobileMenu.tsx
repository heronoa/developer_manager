import { Transition } from "@headlessui/react";
import SideMenu from "./SideMenu";
import { Dispatch, Fragment, SetStateAction } from "react";
import BackgroundLayer from "@/components/UI/Animations/BackgroundLayer";
import SlideOverLayer from "@/components/UI/Animations/SlideOverLayer";

interface Props2 {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileMenu = ({ isOpen, setIsOpen }: Props2) => {
  return (
    <Transition.Root show={isOpen}>
      <BackgroundLayer />
      <SlideOverLayer>
        <SideMenu />
      </SlideOverLayer>
    </Transition.Root>
  );
};

export default MobileMenu;

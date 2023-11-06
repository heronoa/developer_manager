import { Transition } from "@headlessui/react";
import SideMenu from "./SideMenu";
import { Dispatch, SetStateAction } from "react";
import BackgroundLayer from "@/components/UI/Animations/BackgroundLayer";
import SlideOverLayer from "@/components/UI/Animations/SlideOverLayer";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileMenu = ({ isOpen }: Props) => {
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

import { Transition } from "@headlessui/react";

interface Props {
  onClick?: () => void;
}

const BackgroundLayer = ({ onClick = () => {return;} }: Props) => (
  <Transition.Child
    enter="transition-opacity ease-in-out duration-500"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity ease-in-out duration-500"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="fixed inset-0 bg-gray-500 opacity-75" onClick={onClick} />
  </Transition.Child>
);

export default BackgroundLayer;

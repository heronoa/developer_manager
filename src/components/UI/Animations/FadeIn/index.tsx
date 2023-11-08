import { Transition } from "@headlessui/react";

interface Props {
  delay: string;
  children: React.ReactNode;
}

const FadeIn = ({ delay, children }: Props) => {
  return (
    <Transition.Child
      enter={`transition-all ease-in-out duration-700 ${delay}`}
      enterFrom="opacity-0 translate-y-6"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all ease-in-out duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition.Child>
  );
};

export default FadeIn;

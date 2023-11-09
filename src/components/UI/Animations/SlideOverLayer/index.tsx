import { Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Props {
  children: React.ReactNode;
  slideDirection?: "left" | "right" | "top" | "bottom";
}

const SlideOverLayer = ({ children, slideDirection = "left" }: Props) => {
  const direction = {
    left: {
      enterFrom: "-translate-x-full",
      enterTo: "translate-x-0",
      leaveFrom: "translate-x-0",
      leaveTo: "-translate-x-full",
      className: "left-0",
    },
    right: {
      enterFrom: "translate-x-full",
      enterTo: "translate-x-0",
      leaveFrom: "translate-x-0",
      leaveTo: "translate-x-full",
      className: "right-0",
    },
    top: {
      enterFrom: "translate-y-full",
      enterTo: "translate-y-0",
      leaveFrom: "translate-y-0",
      leaveTo: "translate-y-full",
      className: "top-0",
    },
    bottom: {
      enterFrom: "-translate-y-full",
      enterTo: "translate-y-0",
      leaveFrom: "translate-y-0",
      leaveTo: "-translate-y-full",
      className: "bottom-0",
    },
  };
  return (
    <Transition.Child
      as={Fragment}
      enter="transform transition ease-in-out duration-500"
      enterFrom={direction[slideDirection].enterFrom}
      enterTo={direction[slideDirection].enterTo}
      leave="transform transition ease-in-out duration-500 delay-100"
      leaveFrom={direction[slideDirection].leaveFrom}
      leaveTo={direction[slideDirection].leaveTo}
    >
      <div className="fixed inset-0 overflow-hidden z-20">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`${direction[slideDirection].className} pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10`}
          >
            <div className="pointer-events-auto w-screen max-w-2xl">
              <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-[#333333] py-6 shadow-xl">
                <div className="px-4 sm:px-6">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition.Child>
  );
};

export default SlideOverLayer;

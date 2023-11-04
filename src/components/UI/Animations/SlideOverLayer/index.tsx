import { Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Props {
  children: React.ReactNode;
}

const SlideOverLayer = ({ children }: Props) => (
  <Transition.Child
    as={Fragment}
    enter="transform transition ease-in-out duration-500"
    enterFrom="-translate-x-full"
    enterTo="translate-x-0"
    leave="transform transition ease-in-out duration-500 delay-100"
    leaveFrom="translate-x-0"
    leaveTo="-translate-x-full"
  >
    <div className="fixed inset-0 overflow-hidden z-[1]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
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

export default SlideOverLayer;

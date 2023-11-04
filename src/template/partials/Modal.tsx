import { Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { SetStateAction, Dispatch, ReactElement } from "react";
import BackgroundLayer from "@/components/UI/Animations/BackgroundLayer";
import { useModals } from "@/hooks/useModal";

interface ModalProps {
  children?: ReactElement;
  scroll?: boolean;
}

const Modal = ({ children, scroll = false }: ModalProps) => {
  const { modalIsOpen, setModalIsOpen } = useModals();

  return (
    <Transition.Root show={modalIsOpen}>
      <Dialog open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div
          className="fixed inset-0 z-[350] bg-[#0f0f0f] opacity-80 blur-3xl"
          aria-hidden="true"
        />
        <BackgroundLayer />

        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <Dialog.Panel className="fixed z-[201] md:min-w-[500px]">
            <div
              className={`dark:bg-[#201E28] bg-white relative mt-8 flex h-full w-[350px] flex-col justify-center rounded-[20px] border-[2px] border-black/75 p-5 md:w-[100%] md:p-8 ${
                scroll ? "!h-[90vh] overflow-y-auto" : ""
              } `}
            >
              <button
                onClick={() => setModalIsOpen(false)}
                className="absolute right-2 top-2 text-3xl "
              >
                <AiOutlineClose color="#fff" />
              </button>
              {children}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

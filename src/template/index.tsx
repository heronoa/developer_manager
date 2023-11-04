import { ReactNode, SetStateAction, useEffect, useState } from "react";

import Header from "./partials/Header";
import SideMenu from "./partials/SideMenu";

interface Props {
  children: ReactNode;
}

import { Inter } from "next/font/google";
import PrivatePage from "@/components/Auth/PrivatePage";
import { useRouter } from "next/router";
import { publicRoutes } from "@/utils/constants";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import Modal from "./partials/Modal";
import { useModals } from "@/hooks/useModal";

const inter = Inter({ subsets: ["latin"] });

export const MainTemplate = ({ children }: Props) => {
  const router = useRouter();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { modalContent } = useModals();

  if (publicRoutes.includes(router.pathname)) {
    return (
      <div
        className={
          theme + " flex min-h-screen flex-col justify-center items-center"
        }
      >
        <div className={inter.className}>{children}</div>
      </div>
    );
  }
  return (
    <PrivatePage>
      <div className={theme + " lg:grid lg:grid-rows-1 lg:grid-cols-12"}>
        <div className="lg:col-start-1 lg:col-end-3 hidden lg:flex flex-col">
          <SideMenu />
        </div>
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)] col-start-0 lg:col-start-3 col-end-13">
          <Header />
          <div className="w-full items-center pt-12 flex min-h-[calc(100vh-100px)] flex-col">
            <div className={inter.className + " w-full"}>{children}</div>
          </div>
        </div>
      </div>
      {modalContent && (
        <Modal>
          {modalContent()}
        </Modal>
      )}
    </PrivatePage>
  );
};

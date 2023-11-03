import { ReactNode, useEffect, useState } from "react";

import Header from "./partials/Header";
import SideMenu from "./partials/SideMenu";
import SettingsMenu from "./partials/SettingsMenu";

interface Props {
  children: ReactNode;
}

import { Inter } from "next/font/google";
import PrivatePage from "@/components/Auth/PrivatePage";
import { useRouter } from "next/router";
import { publicRoutes } from "@/utils/constants";
import { useAuth } from "@/hooks/useAuth";

const inter = Inter({ subsets: ["latin"] });

export const MainTemplate = ({ children }: Props) => {
  const router = useRouter();
  const { user } = useAuth();

  if (publicRoutes.includes(router.pathname)) {
    return (
      <div className=" flex min-h-screen flex-col justify-center items-center">
        <div className={inter.className}>{children}</div>
      </div>
    );
  }
  return (
    <PrivatePage>
      <Header />
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
        <SideMenu />
        <div className=" flex min-h-screen flex-col">
          <div className={inter.className}>{children}</div>
        </div>
        <SettingsMenu />
      </div>
    </PrivatePage>
  );
};

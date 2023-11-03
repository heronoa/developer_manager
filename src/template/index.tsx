import { ReactNode, useEffect, useState } from "react";

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
import {useTheme} from "@/hooks/useTheme";

const inter = Inter({ subsets: ["latin"] });

export const MainTemplate = ({ children }: Props) => {
  const router = useRouter();
  const { user } = useAuth();
  const {theme, setTheme} = useTheme();

  if (publicRoutes.includes(router.pathname)) {
    return (
      <div className={theme + " flex min-h-screen flex-col justify-center items-center"}>
        <div className={inter.className}>{children}</div>
      </div>
    );
  }
  return (
    <PrivatePage>
      <div className={theme + " md:grid md:grid-rows-1 md:grid-cols-12"}>
        <div className="md:col-start-1 md:col-end-3 hidden md:flex flex-col">
          <SideMenu />
        </div>
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)] col-start-0 md:col-start-3 col-end-13">
          <Header />
          <div className=" flex min-h-screen flex-col">
            <div className={inter.className}>{children}</div>
          </div>
        </div>
      </div>
    </PrivatePage>
  );
};

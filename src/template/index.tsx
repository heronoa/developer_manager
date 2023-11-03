import { ReactNode, useEffect, useState } from "react";

import Header from "./partials/Header";
import SideMenu from "./partials/SideMenu";
import SettingsMenu from "./partials/SettingsMenu";

interface Props {
  children: ReactNode;
}

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const MainTemplate = ({ children }: Props) => {
  return (
      <div>
        <Header />
        <div className="flex">
          <SideMenu />
          <div className=" flex min-h-screen flex-col">
            <div
              className={
                inter.className + "mt-[100px] min-h-[calc(100vh - 100px)]"
              }
            >
              {children}
            </div>
          </div>
          <SettingsMenu />
        </div>
      </div>
  );
};

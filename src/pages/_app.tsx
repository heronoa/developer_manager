import "../styles/globals.css";
import "../styles/typography.css";
import "../styles/errors.css";
import "../styles/toggleSwitchStyles.css";

import "regenerator-runtime/runtime.js";

import { MainTemplate } from "../template";
import { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ProjectsProvider } from "@/context/ProjectsContext";
import { UsersProvider } from "@/context/UsersContext";
import { ModalProvider } from "@/context/ModalsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UsersProvider>
        <ProjectsProvider>
            <ThemeProvider>
              <ModalProvider>
                <MainTemplate>
                  <Component {...pageProps} />
                </MainTemplate>
              </ModalProvider>
            </ThemeProvider>
        </ProjectsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default MyApp;

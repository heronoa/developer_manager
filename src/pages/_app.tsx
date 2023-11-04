import "../styles/globals.css";
import "../styles/typography.css";
import "../styles/errors.css";
import "../styles/toggleSwitchStyles.css";

import "regenerator-runtime/runtime.js";

import { FetchProvider } from "@/context/FetchContext";
import { MainTemplate } from "../template";
import { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ProjectsProvider } from "@/context/ProjectsContext";
import { UsersProvider } from "@/context/UsersContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UsersProvider>
        <ProjectsProvider>
          <FetchProvider>
            <ThemeProvider>
              <MainTemplate>
                <Component {...pageProps} />
              </MainTemplate>
            </ThemeProvider>
          </FetchProvider>
        </ProjectsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default MyApp;

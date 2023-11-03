import "../styles/globals.css";
import "../styles/typography.css";
import "../styles/errors.css"
import "../styles/toggleSwitchStyles.css"

import "regenerator-runtime/runtime.js";

import { FetchProvider } from "@/context/FetchContext";
import { MainTemplate } from "../template";
import { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <FetchProvider>
        <ThemeProvider>
          <MainTemplate>
            <Component {...pageProps} />
          </MainTemplate>
        </ThemeProvider>
      </FetchProvider>
    </AuthProvider>
  );
}

export default MyApp;

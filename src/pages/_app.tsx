import "../styles/globals.css";
import "../styles/typography.css";
import "../styles/errors.css"
import "regenerator-runtime/runtime.js";

import { FetchProvider } from "@/context/FetchContext";
import { MainTemplate } from "../template";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <FetchProvider>
        <ThemeProvider attribute="class">
          <MainTemplate>
            <Component {...pageProps} />
          </MainTemplate>
        </ThemeProvider>
      </FetchProvider>
    </AuthProvider>
  );
}

export default MyApp;

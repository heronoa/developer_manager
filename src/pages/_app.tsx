import "../styles/globals.css";
import "../styles/typography.css";
import "regenerator-runtime/runtime.js";

import { FetchProvider } from "@/context/FetchContext";
import { MainTemplate } from "../template";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FetchProvider>
      <ThemeProvider attribute="class">
        <MainTemplate>
          <Component {...pageProps} />
        </MainTemplate>
      </ThemeProvider>
    </FetchProvider>
  );
}

export default MyApp;

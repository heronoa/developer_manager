import {
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface IThemeProvider {
  children: ReactNode;
}

interface ThemeContextProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<"dark" | "light">>;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: IThemeProvider) => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

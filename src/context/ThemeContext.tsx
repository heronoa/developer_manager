import { ReactNode, Dispatch, SetStateAction, createContext, useState } from "react";

interface IAuthProvider {
  children: ReactNode;
}

interface AuthContextProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<"dark" | "light">>;
}

export const ThemeContext = createContext({} as AuthContextProps);

export const ThemeProvider = ({ children }: IAuthProvider) => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme}} >
      {children}
    </ThemeContext.Provider>
  );
};

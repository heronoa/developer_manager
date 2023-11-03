import { ThemeSwitch } from "@/components/UI/ThemeSwitch";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";

const Header = () => {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null
  return (
    <header id="main-header" className="flex flex-wrap container h-[100px] mx-auto max-w-full items-center p-6 justify-between bg-primary shadow-md top-0 z-50">
      <div>
      <ThemeSwitch />
      </div>
      <div>Olá, {user.email}</div>
    </header>
  );
};

export default Header;

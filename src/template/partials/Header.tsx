import { ThemeSwitch } from "@/components/UI/ThemeSwitch";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import CompanyLogo from "@/components/UI/CompanyLogo";

const Header = () => {
  const { user, logOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <header
        id="main-header"
        className="flex flex-wrap container h-[100px] mx-auto max-w-full items-center p-6 justify-between bg-primary shadow-md top-0 z-50"
      >
        <div>
          <div className="hidden md:block">
            <ThemeSwitch />
          </div>
          <div className="block md:hidden" onClick={(() => setMobileMenuIsOpen(prevState => !prevState))}>
            <button className="flex items-center text-primary p-3">
              <svg
                className="block h-6 w-6 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          Olá, {user.email},{" "}
          <span
            className="underline-animation-event inline-block cursor-pointer"
            onClick={handleLogout}
          >
            sair
          </span>
        </div>
      </header>
      <MobileMenu isOpen={mobileMenuIsOpen} setIsOpen={setMobileMenuIsOpen} />
    </>
  );
};

export default Header;

// import Button from "./Button";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Menu from "./Menu";
import vite from "/vite.png";
import { LogOutIcon } from "lucide-react";

import { useAuth } from "@/contexts/useAuth";

import { NavigationMenu } from "@/components/ui/navigation-menu";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  useEffect(() => {}, [user]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="px-15a flex h-15 items-center justify-between border-b border-white/20 bg-white/30 px-14 py-5 shadow-sm backdrop-blur-xl lg:px-40">
        <div className="logo text-primary flex items-center gap-2 text-lg font-bold">
          <img src={vite} alt="logo" className="md:mr-17a h-6 w-6 lg:mr-0" />
          <div className="hidden lg:block">NBKR Societies</div>
        </div>
        <NavigationMenu className="hidden md:flex" viewport={false}>
          <Menu className="gap-15" />
        </NavigationMenu>
        {user ? (
          <div className="flex cursor-pointer items-center gap-5">
            <Link to={"/profile"}>
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white">
                <h4>{user.name.charAt(0).toUpperCase()}</h4>
              </div>
            </Link>
            <div
              onClick={logout}
              className="hover:bg-accent text-muted-foreground hover:text-primary flex h-10 w-10 items-center justify-center rounded-full p-2 transition-colors duration-200 ease-in-out"
            >
              <LogOutIcon />
            </div>
          </div>
        ) : (
          <div className="flex gap-2.5">
            <Link to="/auth?mode=login">
              <Button variant="outline" size="sm" className="mr-2">
                Sign In
              </Button>
            </Link>
            <Link to="/auth?mode=register">
              <Button variant="default" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
        <div className="mobile-menu-icon md:hidden" onClick={toggleMenu}>
          <Bars3Icon className="text-primary h-6 w-6" />
        </div>
      </nav>
      <div
        className={`mobile-menu fixed top-17 left-[10px] z-50 min-w-[calc(100vw-20px)] rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <NavigationMenu className="p-5">
          <Menu className="flex flex-col items-start gap-10" />
        </NavigationMenu>
      </div>
    </>
  );
};

export default NavBar;

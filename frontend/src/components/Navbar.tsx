import Button from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Menu from "./Menu";
import vite from "../../public/vite.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="px-15a flex h-15 items-center justify-between bg-gray-200 px-14 py-5 backdrop-blur-md lg:px-50">
        <div className="logo text-primary flex items-center gap-2 text-xl font-bold">
          <img src={vite} alt="logo" className="h-8 w-8" />
          <div className="hidden lg:block">NBKR Societies</div>
        </div>

        <div className="menu hidden md:flex">
          <Menu />
        </div>
        <div className="buttons flex gap-2.5">
          <Link reloadDocument={true} to="/login">
            <Button variant="primary" size="small">
              Log in
            </Button>
          </Link>
          <Link reloadDocument={true} to="/signup">
            <Button variant="outline" size="small">
              Sign up
            </Button>
          </Link>
        </div>
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
        <Menu className="flex-col" />
      </div>
    </>
  );
};

export default Navbar;

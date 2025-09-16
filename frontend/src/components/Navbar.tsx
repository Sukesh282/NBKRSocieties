import Button from "./Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Menu from "./Menu";
import vite from "/vite.png";
import { useLogin } from "../contexts/useLogin";
import { BASE_URL } from "../hooks/env";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [firstLetter, setFirstLetter] = useState("A");
  const { isLoggedIn, setIsLoggedIn } = useLogin();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const checkUserLogin = async () => {
    const response = await fetch(`${BASE_URL}/api/users/getUser`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const user = await response.json();
      setFirstLetter(user.name.charAt(0).toUpperCase());
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkUserLogin();
  });

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
        {isLoggedIn ? (
          <div className="bg-accent mb-0 flex h-5 w-5 items-center justify-center rounded-full p-5">
            <h4 className="font-bold text-white">{firstLetter}</h4>
          </div>
        ) : (
          <div className={`buttons flex gap-2.5`}>
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
        <Menu className="flex-col" />
      </div>
    </>
  );
};

export default Navbar;

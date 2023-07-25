import { useContext } from "react";
import authContext from "@/context/authContext";
import Link from "next/link";
import SearchBar from "./Searchbar";

const NavBar = () => {
  const ctx = useContext(authContext);
  const authHandler = () => {
    if (ctx.user) {
      ctx.signOut();
    } else {
      ctx.signIn();
    }
  };
  return (
    <nav id="header" className="w-full z-30 top-10 py-1 bg-yellow-200">
      <div className="w-full flex items-center justify-between mt-0 px-6 py-1">
        <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>

        <div
          className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
          id="menu"
        >
          <nav>
            <ul className="md:flex items-center justify-between text-base pt-4 md:pt-0">
              <i className="fas fa-utensils mr-2"></i>
              <li>
                <Link
                  className="font-bold inline-block no-underline hover:text-black text-lg py-2 px-4 lg:-ml-2"
                  href="/"
                >
                  Tastebudz
                </Link>
              </li>
              <li>
                <Link
                  className="inline-block no-underline hover:text-black py-2 px-4 lg:-ml-2"
                  href="/recipes"
                >
                  Recipes
                </Link>
              </li>
              <li>
                <SearchBar />
              </li>
              {/* <li>
                <Link
                  className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                  href="#"
                >
                  Shell
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>

        <div
          className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4"
          id="nav-content"
        >
          <div className="auth flex items-center w-full md:w-full">
            <button
              className="bg-transparent p-1 border-black hover:border-b-2"
              onClick={authHandler}
            >
              {ctx.user ? "Sign out" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

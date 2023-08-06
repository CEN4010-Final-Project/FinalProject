import { useContext, useEffect, useState } from "react";
import authContext from "@/context/authContext";
import Link from "next/link";
import SearchBar from "./Searchbar";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const ctx = useContext(authContext);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuCollapse, setMenuCollapse] = useState(true);
  const authHandler = () => {
    if (ctx.user) {
      ctx.signOut();
    } else {
      ctx.signIn();
    }
  };
  useEffect(() => {
    if (router.pathname == "/search" && router.query.s)
      setSearchTerm(router.query.s);
  }, [router.query]);
  const searchHandler = () => {
    router.push(`/search?s=${searchTerm}`);
  };
  return (
    <nav
      id="header"
      className="sticky top-0 w-full z-30 pt-3 pb-2 bg-yellow-200 flex flex-col md:flex-row justify-between mt-0 px-6"
    >
      <div className="flex">
        <Link
          className="font-bold inline-block no-underline hover:text-black text-lg py-1.5 px-3"
          href="/"
        >
          Tastebudz
        </Link>
        <div className="md:hidden ml-auto">
            <FontAwesomeIcon className="text-xl mt-2 cursor-pointer" icon={faBars} onClick={() => setMenuCollapse(m => !m)}/>
        </div>
      </div>

      <div className={`${menuCollapse ? "hidden" : ""} w-full md:flex`} id="menu">
        <div className="flex w-full flex-col md:flex-row text-base">
          <Link
            className="inline-block no-underline hover:text-black py-2 px-3 border-black hover:border-b-2 hover:pb-1.5"
            href="/recipes"
          >
            Recipes
          </Link>
          <Link
            className="inline-block no-underline hover:text-black py-2 px-3 border-black hover:border-b-2 hover:pb-1.5"
            href="/favorites"
          >
            Favorites
          </Link>
          <SearchBar
            value={searchTerm}
            setValue={setSearchTerm}
            onSearch={searchHandler}
            className="ps-2"
          />
           <button
            className="text-left inline-block md:ml-auto bg-transparent py-2 px-3 border-black hover:border-b-2 hover:pb-1.5"
            onClick={authHandler}
          >
            {ctx.user ? "Sign out" : "Sign in"}
          </button>
        </div>
       

      </div>
    </nav>
  );
};

export default Navbar;

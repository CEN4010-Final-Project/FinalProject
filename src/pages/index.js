import { useContext } from "react";
import authContext from "@/context/authContext";
import Link from "next/link";

const LandingPage = () => {
  const ctx = useContext(authContext);
  return (
    <div>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
              Welcome {ctx.user ? ctx.user.displayName : ""} to TasteBudz
            </h1>
            <p className="mt-6 text-lg leading-8 text-black ">
              TasteBudz is a premium recipe application that revolutionizes how
              you discover, cook, save favorite dishes. Powered by spoonacular's
              extensive recipe library, we enable cooking enthusiasts to spark
              creativity in the kitchen and turn every meal into a delightful
              culinary adventure.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                className="transition rounded-md bg-slate-800 text-white px-4 py-3
                font-semibold hover:bg-yellow-200 hover:text-black"
                type="button"
                onClick={ctx.signIn}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const ctx = useContext(authContext);
  return (
    <div>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-nowrap justify-between mx-auto max-w-2xl">
            <h1 className=" font-bold tracking-tight mt-1 text-black sm:text-4xl">
              Welcome back, {ctx.user.displayName}.
            </h1>
            <div className="flex items-center justify-center pb-5 gap-x-6">
              <Link
                href="/recipes"
                className="transition rounded-md bg-slate-800 text-white px-4 py-2.5
                font-semibold hover:bg-yellow-200 hover:text-black"
              >
                Recipes
              </Link>
              <Link
                href="/favorites"
                className="transition rounded-md bg-slate-800 text-white px-4 py-2.5
                font-semibold hover:bg-yellow-200 hover:text-black"
              >
                Favorites <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const index = () => {
  const ctx = useContext(authContext);

  if (ctx.loading) {
    return <>Loading...</>;
  }

  if (ctx.user) {
    return <HomePage />;
  }
  return <LandingPage />;
};

export default index;

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
              TasteBudz is a top of the line recipe application that
              revolutionizes how you discover, cook, save favorite dishes. With
              our extensive recipe library we aim to spark creativity in your
              kitchen and turn every meal into a delightful culinary adventure.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {ctx.user ? (
                <>
                  <Link
                    href="/recipes"
                    className="rounded-md bg-[rgb(254,240,138)] px-3.5 py-2.5 text-sm
                  font-semibold text-black shadow-sm hover:bg-indigo-500
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Recipes
                  </Link>
                  <Link
                    href="/favorites"
                    className="rounded-md bg-[rgb(254,240,138)] px-3.5 py-2.5 text-sm
                  font-semibold text-black shadow-sm hover:bg-indigo-500
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Favorites <span aria-hidden="true">→</span>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    className="rounded-md bg-[rgb(254,240,138)] px-3.5 py-2.5 text-sm
                  font-semibold text-black shadow-sm hover:bg-indigo-500
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="button"
                    onClick={ctx.signIn}
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const HomePage = () => {
//   const ctx = useContext(authContext);
//   return <>Welcome {ctx.user.displayName}</>;
// };

const index = () => {
  const ctx = useContext(authContext);

  if (ctx.loading) {
    return <>Loading...</>;
  }

  return <LandingPage />;
};

export default index;

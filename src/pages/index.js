import { useContext } from "react";
import authContext from "@/context/authContext";
import Link from "next/link";
import LastViewedRecipe from "@/components/LastViewedRecipe";
import RecipeOfTheDay from "@/components/RecipeOfTheDay";

const LandingPage = () => {
  const ctx = useContext(authContext);
  return (
    <div className="py-16 py-sm:24 mx-auto px-6 lg:px-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
        Welcome {ctx.user ? ctx.user.displayName : ""} to TasteBudz
      </h1>
      <p className="mt-6 text-lg leading-8 text-black ">
        TasteBudz is a premium recipe application that revolutionizes how you
        discover, cook, save favorite dishes. Powered by spoonacular's extensive
        recipe library, we enable cooking enthusiasts to spark creativity in the
        kitchen and turn every meal into a delightful culinary adventure.
      </p>
      <div className="mt-6 flex items-center justify-center gap-x-6">
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
  );
};

const HomePage = () => {
  const ctx = useContext(authContext);
  return (
    <>
      <div className="flex flex-wrap gap-y-5 justify-between mx-auto max-w-5xl border-4 bg-slate-50 border-slate-300 p-10 pb-5 my-10 rounded-3xl">
        <h1 className="font-bold tracking-tight mt-1 text-black text-3xl md:text-4xl -mb-0">
          Welcome back, {ctx.user.displayName}.
        </h1>
        <div className="flex items-center justify-center pb-5 gap-x-6">
          <Link
            href="/recipes"
            className="transition rounded-md bg-slate-800 text-white px-4 py-2.5
            font-semibold hover:bg-yellow-200 hover:text-black max-sm:text-sm md:text-base"
          >
            Recipes
          </Link>
          <Link
            href="/favorites"
            className="flex-nowrap transition rounded-md bg-slate-800 text-white px-4 py-2.5
            font-semibold hover:bg-yellow-200 hover:text-black max-sm:text-sm md:text-base"
          >
            Favorites
          </Link>
        </div>
      </div>
      <div className="mx-auto flex flex-col gap-y-4 max-w-3xl pt-4">
        <LastViewedRecipe />
        <RecipeOfTheDay />
      </div>
    </>
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

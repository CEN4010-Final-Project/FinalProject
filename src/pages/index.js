import { useContext, useEffect } from "react";
import authContext from "@/context/authContext";
import Link from "next/link";
import axios from "axios";
import Recipe from "@/components/Recipe";

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
  // let recipe;
  // useEffect(() => {
  //   const getLastViewed = async () => {
  //     if (!ctx.loading) {
  //       let lastView;
  //       try {
  //         const lastViewed = await axios.get("../api/lastViewed", {
  //           headers: {
  //             Authorization: ctx.user.uid,
  //           },
  //         });
  //         if (lastViewed.status === 200) {
  //           lastView = lastViewed.data[0];
  //         }
  //         console.log(lastView);
  //       } catch (err) {
  //         if (err?.response?.status === 404) {
  //           userFavorites = [];
  //         } else {
  //           console.log(err);
  //         }
  //       }

  //       try {
  //         // console.log(lastView);
  //         const result = await axios.get(
  //           `../api/recipesbyid?s=${lastView.recipe_id}`,
  //           {
  //             headers: {
  //               Authorization: ctx.user.uid,
  //             },
  //           }
  //         );
  //         recipe = result.data[0];
  //         console.log(result.data[0].title);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   };

  //   const timeout = setTimeout(getLastViewed, 100);

  //   return () => clearTimeout(timeout);
  // }, [ctx.loading]);

  return (
    <div>
      <div className="py-24 sm:py-32">
        <div className="flex flex-wrap gap-y-5 justify-between mx-auto max-w-2xl">
          <h1 className="font-bold tracking-tight mt-1 text-black text-3xl md:text-4xl">
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
            {/* <Recipe
              key={recipe.id}
              recipe={recipe}
              onToggleFavorite={onToggleFavorite}
              page={page}
            /> */}
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

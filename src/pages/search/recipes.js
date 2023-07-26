import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import authContext from "@/context/authContext";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const Recipes = () => {
  const ctx = useContext(authContext);
  const [recipes, setRecipes] = useState(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const [searchTerm, setSearchTerm] = useState(search ? search : '');
  const router = useRouter();

  useEffect(() => {
    const searchTermHandler = () => {
      setSearchTerm(router.query.s);
    };
    router.events.on("routeChangeComplete", searchTermHandler);
    return () => {
      router.events.off("routeChangeComplete", searchTermHandler);
    };
  }, [router.query]);
  useEffect(() => {
    const getData = async () => {
      if (!searchTerm) {
        setRecipes([]);
        return;
      }
      if (!ctx.loading) {
        //get user's favorites
        let userFavorites;
        try {
          const favoritesResponse = await axios.get(
            "../api/favorites?action=list",
            {
              headers: {
                Authorization: ctx.user.uid,
              },
            }
          );
          if (favoritesResponse.status === 200) {
            userFavorites = favoritesResponse.data;
          }
        } catch (err) {
          if (err?.response?.status === 404) {
            userFavorites = [];
          } else {
            console.log(err);
          }
        }

        // get recipes by search term
        const result = await axios.get(`../api/recipes/name?s=${search}`);
        result.data.results = result.data.results.map((recipe) => ({
          ...recipe,
          loading: false,
          favorite:
            userFavorites.find((f) => f.recipe_id == recipe.id) !== undefined,
        }));
        setRecipes(result.data.results);
      }
    };
    const timeout = setTimeout(getData, 100);

    return () => clearTimeout(timeout);
  }, [ctx.loading, searchTerm]);

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);

  const toggleFavoriteHandler = (recipe) => {
    if (recipe.favorite) {
      deleteFavoriteHandler(recipe);
    } else {
      addFavoriteHandler(recipe);
    }
  };

  const addFavoriteHandler = async (recipe) => {
    const index = recipes.indexOf(recipe);
    try {
      recipe.loading = true;
      setRecipes((prevRecipes) => {
        prevRecipes[index] = recipe;
        return prevRecipes;
      });
      const response = await axios.post(
        "/api/favorites",
        { recipe_id: recipe.id },
        { headers: { Authorization: ctx.user.uid } }
      );
      if (response.status == 200) {
        recipe.loading = false;
        recipe.favorite = true;
        setRecipes((prevRecipes) => {
          const recipes = prevRecipes.slice();
          recipes[index] = recipe;
          return recipes;
        });
      }

      // You can display a success message or perform any other actions upon successful addition.
    } catch (error) {
      console.error("Error adding to favorites:", error);
      // Handle errors here or display an error message to the user.
    }
  };

  const deleteFavoriteHandler = async (recipe) => {
    const index = recipes.indexOf(recipe);
    try {
      recipe.loading = true;
      setRecipes((prevRecipes) => {
        prevRecipes[index] = recipe;
        return prevRecipes;
      });
      const response = await axios.delete(
        `/api/favorites?recipe_id=${recipe.id}`,
        {
          headers: { Authorization: ctx.user.uid },
        }
      );
      if (response.status == 200) {
        recipe.loading = false;
        recipe.favorite = false;
        setRecipes((prevRecipes) => {
          const recipes = prevRecipes.slice();
          recipes[index] = recipe;
          return recipes;
        });
      }

      // You can display a success message or perform any other actions upon successful addition.
    } catch (error) {
      console.error("Error adding to favorites:", error);
      // Handle errors here or display an error message to the user.
    }
  };

  return (
    <>
      <Head>
        <title>TasteBudz</title>
        <meta name="description" content="Online recipe service" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold pt-3">Results for '{searchTerm}'</h1>
        {recipes ? (
          recipes.length ? (
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="flex gap-x-6 mt-3 p-4 bg-slate-100 rounded-lg"
              >
                <div className="flex-grow">
                  <h2 className="text-lg">
                    {recipe.title}
                    {recipe.vegetarian && (
                      <>
                        &nbsp;
                        <span className="bg-green-100 text-gre en-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                          Vegetarian
                        </span>
                      </>
                    )}
                  </h2>
                  <hr className="h-px my-2 bg-slate-300"></hr>
                  <p className="text-sm">
                    Preparation time:{" "}
                    {recipe.preparationMinutes != -1
                      ? `${recipe.preparationMinutes} minute${
                          recipe.preparationMinutes > 1 ? "s" : ""
                        }`
                      : "Unlisted"}
                  </p>
                  <button
                    className={`mt-1 ${
                      recipe.favorite
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white font-bold py-2 px-4 rounded`}
                    disabled={recipe.loading ? "disabled" : ""}
                    onClick={() => toggleFavoriteHandler(recipe)}
                  >
                    {recipe.favorite
                      ? "Remove from favorites"
                      : "Add to favorites"}
                  </button>
                </div>
                <div className="flex-grow-0">
                  {recipe.image ? (
                    <img
                      className="h-32 w-48  rounded-md object-cover drop-shadow-lg"
                      src={recipe.image}
                    ></img>
                  ) : (
                    <div className=" h-32 w-48 rounded-md bg-slate-200 flex flex-col justify-center text-center text-xs">
                      No image available.
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            searchTerm == '' ? (
              <p className="pt-4">No search term entered. Please try again.</p>
            ) : (
              <p className="pt-4">No recipes found. Check your search term and try again.</p>
            )
          )
        ) : (
          <p className="mt-3 italic text-slate-500">Loading...</p>
        )}
      </div>
    </>
  );
};

export default Recipes;
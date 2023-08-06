import { useContext, useEffect, useState } from "react";
import authContext from "@/context/authContext";
import axios from "axios";
import RecipeList from "@/components/RecipeList";
import Error from "@/components/UI/Error";
import { toggleFavorite } from "@/helpers/favoriteAPI";

const Recipes = () => {
  const ctx = useContext(authContext);
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (!ctx.loading) {
        //get user's favorites
        let userFavorites;
        try {
          const favoritesResponse = await axios.get(
            "../api/favorites?action=list",
            {
              headers: {
                Authorization: ctx?.user?.uid,
              },
            }
          );
          if (favoritesResponse.status === 200) {
            userFavorites = favoritesResponse.data;
          }
        } catch (err) {
          userFavorites = [];

          if (err?.response?.status === 404 || err?.response?.status === 401) {
            userFavorites = [];
          } else {
            setError(err);
          }
        }
        // get random recipes
        try {
          const result = await axios.get("../api/randomrecipes");
          result.data = result.data.map((recipe) => ({
            ...recipe,
            loading: false,
            favorite:
              userFavorites.find((f) => f && f.recipe_id == recipe.id) !== undefined,
          }));
          setRecipes(result.data);
        } catch (err) {
          setError(err);
        }
      }
    };
    const timeout = setTimeout(getData, 100);

    return () => clearTimeout(timeout);
  }, [ctx.loading]);

  return (
    <>
      <h1 className="text-3xl font-bold pt-3">Recipes</h1>
      {error ? (
        <Error error={error} />
      ) : recipes ? (
        recipes.length ? (
          <RecipeList
            recipes={recipes}
            onToggleFavorite={(r) => toggleFavorite(r, setRecipes, setError, ctx.user)}
          />
        ) : (
          <p className="pt-4">No recipes found. Please try again.</p>
        )
      ) : (
        <p className="mt-3 italic text-slate-500">Loading...</p>
      )}
    </>
  );
};

export default Recipes;

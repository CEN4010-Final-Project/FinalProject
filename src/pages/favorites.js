import { useContext, useEffect, useState } from "react";
import authContext from "@/context/authContext";
import axios from "axios";
import RecipeList from "@/components/RecipeList";
import Error from "@/components/UI/Error";
import { toggleFavorite } from "@/helpers/favoriteAPI";

const Favorites = () => {
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

        //get favorite recipe data
        try {
          const result = await axios.get(
            `../api/recipesbyid?s=${userFavorites.join(",")}`,
            {
              headers: {
                Authorization: ctx.user.uid,
              },
            }
          );
          result.data = result.data.map((recipe) => ({
            ...recipe,
            loading: false,
            favorite:
              userFavorites.find((f) => f && f.recipe_id == recipe.id) !== undefined,
          }));
          result.data = result.data.map((recipe) => ({
            ...recipe,
            loading: false,
            favorite: true,
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
      <h1 className="text-3xl font-bold pt-3">Favorites</h1>
      {error ? (
        <Error error={error} />
      ) : recipes ? (
        recipes.length ? (
          <RecipeList
            recipes={recipes}
            onToggleFavorite={(r) => toggleFavorite(r, setRecipes, setError, ctx.user)}
          ></RecipeList>
        ) : (
          <p className="pt-4">
            No favorites found. If you should have favorites, please try again.
          </p>
        )
      ) : (
        <p className="mt-3 italic text-slate-500">Loading...</p>
      )}
    </>
  );
};

export default Favorites;

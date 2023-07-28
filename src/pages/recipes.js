import { useContext, useEffect, useState } from "react";
import authContext from "@/context/authContext";
import axios from "axios";
import RecipeList from "@/components/RecipeList";

const Recipes = () => {
  const ctx = useContext(authContext);
  const [recipes, setRecipes] = useState(null);

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

        const result = await axios.get("../api/randomrecipes");
        result.data.recipes = result.data.recipes.map((recipe) => ({
          ...recipe,
          loading: false,
          favorite:
            userFavorites.find((f) => f.recipe_id == recipe.id) !== undefined,
        }));
        setRecipes(result.data.recipes);
      }
    };
    const timeout = setTimeout(getData, 100);

    return () => clearTimeout(timeout);
  }, [ctx.loading]);
  
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
      <div className="container max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold pt-3">Recipes</h1>
        {recipes ? (
          recipes.length ? (
            <RecipeList recipes={recipes} onToggleFavorite={toggleFavoriteHandler}/>
          ) : (
            <p className="pt-4">No recipes found. Please try again.</p>
          )
        ) : (
          <p className="mt-3 italic text-slate-500">Loading...</p>
        )}
      </div>
    </>
  );
};

export default Recipes;

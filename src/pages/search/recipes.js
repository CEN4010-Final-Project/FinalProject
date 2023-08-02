import { useContext, useEffect, useState } from "react";
import authContext from "@/context/authContext";
import axios from "axios";
import { useRouter } from "next/router";
import RecipeList from "@/components/RecipeList";
import Filters from "../../components/RecipeNameFilters";
import Error from "@/components/UI/Error";
import { toggleFavorite } from "@/helpers/favoriteAPI";

const Recipes = () => {
  const ctx = useContext(authContext);
  const router = useRouter();

  const [recipes, setRecipes] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: [],
    intolerances: [],
    cuisines: [],
    diets: []
  });

  useEffect(() => {
    const searchTermHandler = () => {
      setSearchTerm(router.query.s);
    };
    searchTermHandler();
    router.events.on("routeChangeComplete", searchTermHandler);
    return () => {
      router.events.off("routeChangeComplete", searchTermHandler);
    };
  }, [ctx.loading, router.query]);

  useEffect(() => {
    const getData = async () => {
      setRecipes(null);

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
        try { 
          let requestURL = `../api/recipes/name?s=${searchTerm}`;
          Object.keys(filters).forEach(filter => {
           requestURL += `&${filter}=${filters[filter].join(",")}`
          })
          const result = await axios.get(requestURL);

          result.data = result.data.map((recipe) => ({
            ...recipe,
            loading: false,
            favorite:
              userFavorites.find((f) => f && f == recipe.id) !== undefined,
          }));         
          setRecipes(result.data)
        } catch (err) {
          setError(err);
        }
      }
    };
    getData();
  }, [ctx.loading, searchTerm, filters]);

  return (
    <>
      <h1 className="text-3xl font-bold pt-3">Results for '{searchTerm}'</h1>
      {error ? <Error error={error} /> : 
        <>
          <Filters onChange={(f) => setFilters(f)} />
        {recipes ? (
          recipes.length ? (
            <RecipeList recipes={recipes} onToggleFavorite={(r) => toggleFavorite(r, setRecipes, setError, ctx.user)}></RecipeList>
          ) : (
            <p className="pt-4">No recipes found. Please check your search query and try again.</p>
          )
        ) : (
          <p className="mt-3 italic text-slate-500">Loading...</p>
        )}
      </>}
    </>
  );
};

export default Recipes;

import axios from "axios";
export const toggleFavorite = async(recipe, setRecipes, setError, user) => {
  recipe.loading = true;
  updateRecipes(recipe, setRecipes);
  try {
    let response;
    if (recipe.favorite) {
      response = await axios.delete(`/api/favorites?recipe_id=${recipe.id}`, 
        { headers: { Authorization: user.uid } } 
      );
     
    } else {
      response = await axios.post(
        "/api/favorites",
        { recipe_id: recipe.id },
        { headers: { Authorization: user.uid } }
      );
    }

    if (response.status == 200) {
      recipe = { ...recipe, favorite: !recipe.favorite, loading: false }
      updateRecipes(recipe, setRecipes);
    }
  } catch (err) {
    if (setError) setError(err);
    recipe.loading = false;
    updateRecipes(recipe, setRecipes);
  }
};

const updateRecipes = (recipe, setRecipes) => {
  setRecipes(prevRecipes => { 
    let recipes = prevRecipes.slice();
    const index = recipes.findIndex(r => r.id == recipe.id);
    recipes[index] = recipe;
    return recipes; 
  });
}
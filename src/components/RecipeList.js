import Recipe from "./Recipe";

const RecipeList = ({ recipes, onToggleFavorite, page}) => {
  return (
    recipes.map((recipe) => (
      <Recipe key={recipe.id} recipe={recipe} onToggleFavorite={onToggleFavorite} page={page} />
    ))
  )
}

export default RecipeList;
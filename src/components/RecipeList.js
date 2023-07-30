import Recipe from "./Recipe";

const RecipeList = ({ recipes, onToggleFavorite, page }) => {
  return <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
    {recipes.map((recipe) =>
      <Recipe
        key={recipe.id}
        recipe={recipe}
        onToggleFavorite={onToggleFavorite}
        page={page}
      />
    )}
  </div>
}
export default RecipeList;

import RecipeStep from "./RecipeStep";

const ViewRecipe = ({ recipe, colors }) => {
  return (
    <div className="h-full">
      {Object.values(recipe.analyzedInstructions[0].steps).map((instruction, index) => (
        <RecipeStep key={instruction.number} instruction={instruction} color={colors[index % 6]} />
      ))}
    </div>
  );
};

export default ViewRecipe;

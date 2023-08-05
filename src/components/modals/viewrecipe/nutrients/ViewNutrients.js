import NutrientTable from "./NutrientTable";

const ViewNutrients = ({ recipe, colors }) => {
  return (
    <div className="min-h-full">
      <p className="mb-5">
        This recipe is{" "}
        <strong>
          {Math.round(
            recipe.nutrition.nutrients.find((n) => n.name == "Calories").amount
          )}
        </strong>{" "}
        calories, which consists of{" "}
          <strong>{recipe.nutrition.caloricBreakdown.percentCarbs}%</strong> carbohydrates,{" "}
          <strong>{recipe.nutrition.caloricBreakdown.percentFat}%</strong> fat, and{" "}
          <strong>{recipe.nutrition.caloricBreakdown.percentProtein}%</strong> protein.   
      </p>
      <h1 className="text-xl font-semibold mb-1">Advanced</h1>
      <p className="tracking-tight mb-5">
        Click on a nutrient to see how each ingredient contributes to it.
      </p>
      <NutrientTable recipe={recipe} colors={colors} />
    </div>
  );
};

export default ViewNutrients;

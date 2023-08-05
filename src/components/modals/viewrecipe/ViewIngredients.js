import { formattedColor } from "@/helpers/RGBtoHSL";
import { capitalize } from "@/helpers/capitalize";

const ViewIngredients = ({ recipe, colors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recipe.nutrition.ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="px-4 py-4 border-2 rounded-xl"
          style={{
            backgroundColor: formattedColor(colors[index % 6], 95),
            borderColor: formattedColor(colors[index % 6], 85),
          }}
        >
          <h3
            className="text-xl font-semibold tracking-tight"
            style={{ color: formattedColor(colors[index % 6], 20) }}
          >
            {capitalize(ingredient.name)}
          </h3>
          <p style={{ color: formattedColor(colors[index % 6], 30) }}>
            {ingredient.amount} {ingredient.unit}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ViewIngredients;

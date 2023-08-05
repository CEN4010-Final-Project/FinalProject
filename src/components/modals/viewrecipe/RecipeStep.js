import { formattedColor } from "@/helpers/RGBtoHSL";

const RecipeStep = ({ instruction, color }) => {
  return (
    <div
      className="mb-5 px-4 py-4 border-2 rounded-xl"
      style={{
        backgroundColor: formattedColor(color, 95),
        borderColor: formattedColor(color, 85),
      }}
    >
      <h2 className="text-2xl font-bold tracking-tight mb-4" style={{color: formattedColor(color, 20)}}>
        Step {instruction.number}
      </h2>
      <div className="mb-3">{instruction.step}</div>
      {instruction.ingredients.length + instruction.equipment.length > 0 && (
        <hr
          className="mb-2 h-0.5"
          style={{ backgroundColor: formattedColor(color, 85) }}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {instruction.ingredients.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-2">
              Ingredients
            </h3>
            <ul className="pl-4">
              {instruction.ingredients.map((ingredient) => (
                <li key={ingredient.name} className="list-disc">{ingredient.name}</li>
              ))}
            </ul>
          </div>
        )}
        {instruction.equipment.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-2">
              Equipment
            </h3>
            <ul className="pl-4">
              {instruction.equipment.map((equipment) => (
                <li key={equipment.name} className="list-disc">{equipment.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeStep;

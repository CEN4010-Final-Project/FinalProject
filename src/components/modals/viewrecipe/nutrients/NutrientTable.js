import { useEffect, useState } from "react";
import NutrientInformation from "./NutrientInformation";

const NutrientTable = ({ recipe, colors }) => {
  const [barGraphWidths, setBarGraphWidths] = useState(null);
  const [toggleBarGraphs, setToggleBarGraphs] = useState(
    Array(recipe.nutrition.nutrients.length).fill(false)
  );

  useEffect(() => {
    recipe.nutrition.ingredients.forEach(
      (ingredient, index) => (ingredient.color = index % 6)
    );
    setBarGraphWidths(() => {
      let newBarGraphs = [];
      recipe.nutrition.nutrients.forEach((nutrient) => {
        let newBarGraph = [],
          otherPercentAmount = 0;
        recipe.nutrition.ingredients.forEach((ingredient, index) => {
          const amountOfNutrient = nutrient.amount;
          const amountOfNutrientInIngredient = recipe.nutrition.ingredients
            .find((n) => n.name == ingredient.name)
            .nutrients.find((n) => n.name == nutrient.name)?.amount;
          if (amountOfNutrientInIngredient) {
            const percentAmount =
              Math.round(
                (amountOfNutrientInIngredient / amountOfNutrient) * 10000
              ) / 100;
            if (percentAmount > 3)
              newBarGraph.push({
                name: ingredient.name,
                color: colors[index % 6],
                amount: percentAmount,
              });
            else otherPercentAmount += percentAmount;
          }
        });
        if (newBarGraph.length) {
          if (otherPercentAmount > 3)
            newBarGraph.push({
              name: "other",
              color: colors[5],
              amount: otherPercentAmount,
            });
          else newBarGraph[newBarGraph.length - 1].amount += otherPercentAmount;
        }
        newBarGraphs.push({
          nutrient: nutrient,
          widths: newBarGraph
            .map((width) => ({
              ...width,
              amount: width.amount,
            }))
            .sort((a, b) => b.amount - a.amount),
        });
      });
      return newBarGraphs;
    });
  }, []);

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left">
          <th className="font-normal italic px-4">Name</th>
          <th className="font-normal italic px-4">Amount</th>
          <th className="font-normal italic px-4">
            <span className="whitespace-nowrap">% Daily</span> Needs
          </th>
        </tr>
      </thead>
      <tbody>
        {recipe.nutrition.nutrients.map((nutrient, index) => (
          <NutrientInformation
            key={nutrient.name}
            nutrient={nutrient}
            index={index}
            barGraphWidths={barGraphWidths}
            toggleBarGraphs={toggleBarGraphs}
            setToggleBarGraphs={setToggleBarGraphs}
          />
        ))}
      </tbody>
    </table>
  );
};

export default NutrientTable;

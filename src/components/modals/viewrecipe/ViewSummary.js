import SummaryBlock from "./SummaryBlock";
import {
  faClock,
  faUserGroup,
  faSquarePlus,
  faEarthAmericas,
  faDollarSign,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { capitalize } from "@/helpers/capitalize";
const ViewSummary = ({ recipe, colors }) => {
  return (
    <div className="min-h-full flex flex-col gap-5 text-lg ">
      <div className="grid grid-cols-2 gap-5">
        <SummaryBlock icon={faClock} color={colors[0]}>
          {recipe?.readyInMinutes
            ? `Ready in ${recipe.readyInMinutes} minute${
                recipe.readyInMinutes == 1 ? "" : "s"
              }`
            : "Unknown preparation time"}
        </SummaryBlock>
        <SummaryBlock icon={faUserGroup} color={colors[1]}>
          {recipe?.servings
            ? `Recipe makes ${recipe.servings} serving ${
                recipe?.servings == 1 ? "" : "s"
              }`
            : "No servings listed"}
        </SummaryBlock>
      </div>
      <div className="flex-grow grid grid-cols-3 gap-5">
        <SummaryBlock icon={faSquarePlus} color={colors[2]}>
          {recipe?.diets?.length
            ? recipe.diets.map((diet) => <div>{capitalize(diet)}</div>)
            : "No diets listed"}
        </SummaryBlock>
        <SummaryBlock icon={faCircleDot} color={colors[3]}>
          {recipe?.dishTypes?.length
            ? recipe.dishTypes.map((dish) => <div>{capitalize(dish)}</div>)
            : "No dishes listed"}
        </SummaryBlock>
        <SummaryBlock icon={faEarthAmericas} color={colors[4]}>
          {recipe?.cuisines?.length
            ? recipe.cuisines.map((cuisine) => <div>{capitalize(cuisine)}</div>)
            : "No cuisines listed"}
        </SummaryBlock>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <SummaryBlock icon={faDollarSign} color={colors[4]}>
          {recipe?.pricePerServing
            ? `Costs $${Math.round(recipe.pricePerServing) / 100} per serving`
            : "No price listed"}
        </SummaryBlock>
        <SummaryBlock icon={faGlobe} color={colors[0]}>
          {recipe?.source
            ? `Sourced from ${recipe.source}`
            : "No source listed"}
        </SummaryBlock>
      </div>
    </div>
  );
};

export default ViewSummary;

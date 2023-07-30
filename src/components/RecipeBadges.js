import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faFire,
  faDollarSign,
  faClock,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";

const RecipeBadges = ({ className, recipe }) => {
  return (
    <div className={`${className} flex flex-wrap gap-3 mt-2`}>
      {recipe.vegetarian && (
        <span className="bg-green-200 text-green-900 tracking-tight font-medium text-sm px-2.5 py-0.5 rounded">
          <FontAwesomeIcon icon={faLeaf} className="text-xs" />{" "}
          {recipe.vegan ? "Vegan" : "Vegetarian"}
        </span>
      )}
      {recipe.veryPopular && (
        <span className="bg-red-600 text-white tracking-tight font-medium text-sm px-2.5 py-0.5 rounded">
          <FontAwesomeIcon icon={faFire} className="mr-0.5 text-xs" /> Hot
        </span>
      )}

      {recipe.cheap && (
        <span className="bg-yellow-300 text-yellow-950 tracking-tight font-medium text-sm px-2.5 py-0.5 rounded">
          <FontAwesomeIcon icon={faDollarSign} className="mr-0.5 text-xs" />{" "}
          Cheap
        </span>
      )}
      <span className="bg-slate-300 text-gray-900 tracking-tight font-medium text-sm px-2.5 py-0.5 rounded">
        <FontAwesomeIcon icon={faClock} className="mr-1 text-xs" />{" "}
        {recipe.readyInMinutes && recipe.readyInMinutes > 0
          ? `${recipe.readyInMinutes} ${
              recipe.readyInMinutes == 1 ? "min" : "mins"
            }`
          : "Unlisted"}
      </span>

      <span className="bg-purple-300 text-purple-950 tracking-tight font-medium text-sm px-2.5 py-0.5 rounded">
        <FontAwesomeIcon icon={faUserGroup} className="mr-1 text-xs" />{" "}
        {recipe.servings && recipe.servings > 0
          ? `${recipe.servings} ${
              recipe.servings == 1 ? "serving" : "servings"
            }`
          : "Unlisted"}
      </span>
    </div>
  );
};

export default RecipeBadges;

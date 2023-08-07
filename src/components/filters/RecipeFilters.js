import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeneralFilter from "./GeneralFilter";
import IngredientFilters from "./IngredientFilters";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
const RecipeFilters = ({ options, applyFilters }) => {
  const filterNames = ["type", "intolerances", "cuisines", "diet"];
  const applyFiltersHandler = (filterType, newFilters) => {
    let filtersAreEqual = newFilters.length == options[filterType].length;

    if (filtersAreEqual) {
      for (let i=0; i<newFilters.length; i++) {
        if (newFilters[i] != options[filterType][i]) {
          filtersAreEqual = false;
          break;
        }
      }
    }
    if (!filtersAreEqual) {
      applyFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: newFilters,
      }));
    }
  };

  return (
    <div className="py-3 bg-slate-100 p-3 rounded-lg mb-4 text-sm">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>
      <div className="grid max-sm:grid-cols-1 grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-3">
      <IngredientFilters onApplyFilters={(filters) => applyFiltersHandler("ingredients", filters)} />
        <button className="bg-white hover:bg-slate-50 rounded-md w-full p-2 text-sm">
          <div className="flex justify-between">
            <span>Nutrients</span>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </button>
        {filterNames.map((filterName) => (
          <GeneralFilter
            key={filterName}
            filterName={filterName}
            onApplyFilters={(filters) => applyFiltersHandler(filterName, filters)}
          />
        ))}

       
      </div>
    </div>
  );
};

export default RecipeFilters;

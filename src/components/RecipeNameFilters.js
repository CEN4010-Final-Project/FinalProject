import { useEffect, useState } from "react";
import MultiSelect from "./UI/MultiSelect";
import filters from "../assets/recipeNameFilterOptions.json";

const RecipeNameFilters = ({ onChange }) => {
  const [options, setOptions] = useState({});
  useEffect(() => {
    let formattedFilters = {};
    Object.keys(filters).forEach((filter) => {
      formattedFilters[filter] = filters[filter].map((f) => ({
        name: f,
        selected: false,
      }));
    });
    setOptions(formattedFilters);
  }, []);
  const selectHandler = (title, name) => {
    setOptions((prevSelectedOptions) => {
      let newSelectedOptions = { ...prevSelectedOptions };
      let optionToChange = newSelectedOptions[title].find(
        (option) => option.name == name
      );
      optionToChange.selected = !optionToChange.selected;

      return newSelectedOptions;
    });
  };

  const propagateFilters = () => {
    //send selected options to page to send to API
    let formattedOptions = {};
    Object.keys(options).forEach((option) => {
      formattedOptions[option] = options[option]
        .filter((o) => o.selected)
        .map((o) => o.name);
    });
    onChange(formattedOptions);
  };
  return (
    <div className="py-3">
      <div className="flex items-center justify-between pb-2">
        <span className="text-lg">Filters</span>
        <button
          className="transition text-sm rounded-md font-semibold bg-slate-800 text-white px-3 py-2
           hover:bg-yellow-200 hover:text-black"
          type="button"
          onClick={propagateFilters}
        >Apply</button>
      </div>
      <div className="flex gap-4">
        {Object.keys(options).map((option) => (
          <MultiSelect
            key={option}
            title={option}
            options={options[option]}
            onChange={selectHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeNameFilters;
